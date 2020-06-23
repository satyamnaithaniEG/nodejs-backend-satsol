
const Sales = require('../models/sales')
const Stock = require('../models/stock');
const mongoose = require('mongoose');


exports.sales_create_sales =  async (req, res, next) => {

 
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const sales = new Sales({
      _id: new mongoose.Types.ObjectId(),
      orderData: req.body.orderData,
      customer: req.body.customer
  });
    global.stockQuantity
    const data = req.body.orderData
    for(var i=0; i< data.length; i++)
    {
      //console.log('hi')
      await Stock.findById(data[i]._id)
             .select('quantity')
             .exec()
             .then(res=> {
               if(res.quantity >= data[i].checkout){
               global.stockQuantity = res.quantity - data[i].checkout
               }
               else{
                res.status(500).json({error: "CheckOut Quantity exceeds Stock Quantity" });
                session.abortTransaction()
                session.endSession()
               }
              })
             .catch(err=>{
               res.status(500).json(err);
               session.abortTransaction()
               session.endSession()
             })
      await Stock.updateOne(
              { _id: data[i]._id },
              { 
                  $set: {
                      quantity: global.stockQuantity,
                  }
              },
              { session }
          );
    }
    await sales.save({ session })
          .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Product Successfully!',
                createdProduct: {
                    orderData: result.orderData,
                    customer:result.customer,
                    _id: result._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
        await session.commitTransaction()
        session.endSession()
  }
  catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw err
}
// Removing stock items with 0 quantity
await Stock.deleteMany({"quantity": 0})
}