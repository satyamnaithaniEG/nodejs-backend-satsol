// const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;

// const Order= require('../models/order');
// const Stock = require('../models/stock');

// const client = new MongoClient( "mongodb+srv://satsol:' + process.env.MONGO_ATLAS_PW + '@cluster0-wmljt.mongodb.net/test?retryWrites=true&w=majority");
// //   await client.connect();


// exports.orders_get_all =  (req, res, next) => {
//     Order.find()
//     .select()
//     .exec()
//     .then(docs => {
//         res.status(200).json({
//             count: docs.length,
//             orders: docs.map(doc => {
//                 return {
//                     data: doc
//                 }
//             })
           
//         });
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         })
//     });
// }

// exports.orders_create_order =  (req, res, next) => {

//     async function commitWithRetry(session) {
//         try {
//           await session.commitTransaction();
//           console.log('Transaction committed.');
//         } catch (error) {
//           if (error.hasErrorLabel('UnknownTransactionCommitResult')) {
//             console.log('UnknownTransactionCommitResult, retrying commit operation ...');
//             await commitWithRetry(session);
//           } else {
//             console.log('Error during commit ...');
//             throw error;
//           }
//         }
//       }
      
//       async function runTransactionWithRetry(txnFunc, session) {
//         try {
//           await txnFunc(session);
//         } catch (error) {
//           console.log('Transaction aborted. Caught exception during transaction.');
      
//           // If transient error, retry the whole transaction
//           if (error.hasErrorLabel('TransientTransactionError')) {
//             console.log('TransientTransactionError, retrying transaction ...');
//             await runTransactionWithRetry(txnFunc,session);
//           } else {
//             throw error;
//           }
//         }
//       }
      
//       async function updateEmployeeInfo(session) {
//         session.startTransaction({
//           readConcern: { level: 'snapshot' },
//           writeConcern: { w: 'majority' },
//           readPreference: 'primary'
//         });
      
//         const stock = Stock;
//         const order = new Order({
//             _id: mongoose.Types.ObjectId(),
//             stockId: req.body.stockId,
//             item: req.body.item,
//             lotNo: req.body.lotNo,
//             billNo: req.body.billNo,
//             exp: req.body.exp,
//             vendor: req.body.vendor,
//             quantity:req.body.quantity,
//             rate: req.body.rate,
//             gst: req.body.gst,
//             purchaseRate: req.body.purchaseRate,
//             receivedate: req.body.receivedate,
//             billDate: req.body.billDate,
//             uom: req.body.uom
//         });

//         await stock.update(
//             {_id: id}, 
//             { $set: { 
//                 item: req.body.item,
//                 lotNo: req.body.lotNo,
//                 billNo: req.body.billNo,
//                 exp: req.body.exp,
//                 vendor: req.body.vendor,
//                 quantity:req.body.prevQuantity - req.body.quantity,
//                 rate: req.body.rate,
//                 gst: req.body.gst,
//                 purchaseRate: req.body.purchaseRate,
//                 receivedate: req.body.receivedate,
//                 billDate: req.body.billDate,
//                 uom: req.body.uom
//             } },
//             { session }
//         );
//         await order.save({ session });
      
//         try {
//           await commitWithRetry(session);
//         } catch (error) {
//           await session.abortTransaction();
//           throw error;
//         }
//       }
      
//       return client.withSession(session =>
//         runTransactionWithRetry(updateEmployeeInfo, session)
//       );
// }

const mongoose = require('mongoose');

const Order= require('../models/order');
const Product = require('../models/product');


exports.orders_get_all =  (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id

                    }
                }
            })
           
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.orders_create_order =  (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {

        if(!product){
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order Stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity  
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
    
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
            message: 'Product not found',
            error: err
        })
    })
  
   
}

exports.orders_get_order =  (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }
 
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
 }

 exports.orders_delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/orders',
                body: { productId: 'ID', quantity: 'Number'}
            }
        })
    })
    .catch();
 }