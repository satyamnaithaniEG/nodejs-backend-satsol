const mongoose = require('mongoose');


const Item = require('../models/item');
const Vendor = require('../models/vendor');
const Stock = require('../models/stock');
const PurchaseController = require('../controllers/purchase')


exports._stock_get_all_item = (req, res, next) => {
    Stock.find()
    .exec()
    .then(docs => {
      const response = {
          count: docs.length,
          items: docs.map(doc => {
              return {
                data: doc
              }
          })
      }
      res.status(200).json(response)
  
  })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
  
    })
}



exports.stock_add_item =  async (req, res, next) => {

    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      await Vendor.find({name: req.body.vendor})
          .then(data => {
              const validVendor = true;
              if(req.body.vendor != data[0].name){
                  validVendor = false;
              }   
              if(validVendor){
                  Item.find({name: req.body.item})
                  .then(data => {
                      if(req.body.item != data[0].name){
                          return res.status(404).json({
                              message: 'Item not found'
                          });
                      }
                      PurchaseController.purchase_create_purchase(req);
                      const stock = new Stock({
                          _id: mongoose.Types.ObjectId(),
                          item: req.body.item,
                          lotNo: req.body.lotNo,
                          billNo: req.body.billNo,
                          exp: req.body.exp,
                          vendor: req.body.vendor,
                          quantity:req.body.quantity,
                          initialQuantity: req.body.quantity,
                          rate: req.body.rate,
                          gst: req.body.gst,
                          purchaseRate: req.body.purchaseRate,
                          receiveDate: req.body.receiveDate,
                          billDate: req.body.billDate,
                          uom: req.body.uom,
                          hsn: req.body.hsn,
                          itemCode: req.body.itemCode,
                          addedBy: req.body.addedBy
                      });
                      return stock.save()
                      .then(result => {
                          console.log(result);
                          res.status(201).json({
                              message: 'Item Added to Stock',
                              createdOrder: {
                                  _id: result._id,
                                  item: result.item,
                                  quantity: result.quantity  
                              },
                          });
                      })
                      .catch(err => {
                          console.log(err);
                          res.status(500).json({
                              error:err
                          })
                      })
                  })
                  .catch(err => {
                      res.status(500).json({
                          message: 'Item not found',
                          error: err
                      })
                  })
              
  
              }
              else {
                  return res.status(404).json({
                      message: 'Vendor not found'
                  });
              }
          })
          .catch(err => {
              res.status(500).json({
                  message: 'Vendor not found',
                  error: err
              })
          })
          await session.commitTransaction()
          session.endSession()
    }
    catch (err) {
      await session.abortTransaction()
      session.endSession()
      throw err
  }


}
