const mongoose = require('mongoose');
const Order = require('../models/order');
const Stock = require('../models/stock');


exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select()
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                data: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.orders_create_order = async (req, res, next) => {

   

    const session = await mongoose.startSession()
    session.startTransaction()
    try {
       
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            stockId: req.body.stockId,
            customer: req.body.customer,
            item: req.body.item,
            lotNo: req.body.lotNo,
            billNo: req.body.billNo,
            exp: req.body.exp,
            vendor: req.body.vendor,
            quantity: req.body.quantity,
            rate: req.body.rate,
            gst: req.body.gst,
            purchaseRate: req.body.purchaseRate,
            receivedate: req.body.receivedate,
            billDate: req.body.billDate,
            uom: req.body.uom
        });
        global.stockQuantity
        await Stock.findById(req.body.stockId)
             .select('quantity')
             .exec()
             .then(res=> {global.stockQuantity = res.quantity - req.body.quantity})
             .catch(err=>console.log(err))

        await Stock.updateOne(
            { _id: req.body.stockId },
            { 
                $set: {
                    quantity: global.stockQuantity,
                }
            },
            { session }
        );
        await order.save({ session })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Order Added Successfully!',
                    createdProduct: {
                        data: result
                    }
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
        await session.commitTransaction()
        session.endSession()
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        throw err
    }
// Removing stock items with 0 quantity
   await Stock.deleteMany({"quantity": 0})
}


exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            statement: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
}