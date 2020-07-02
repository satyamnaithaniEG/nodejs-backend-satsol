const mongoose = require('mongoose');

const Purchase = require('../models/purchase');


exports.purchase_get_all_item = (req, res, next) => {
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
                error: err
            })

        })
}


exports.purchase_create_purchase = (req, res, next) => {

    const purchase = new Purchase({
        _id: new mongoose.Types.ObjectId(),
        item: req.body.item,
        lotNo: req.body.lotNo,
        billNo: req.body.billNo,
        exp: req.body.exp,
        vendor: req.body.vendor,
        quantity: req.body.quantity,
        rate: req.body.rate,
        gst: req.body.gst,
        purchaseRate: req.body.purchaseRate,
        receiveDate: req.body.receiveDate,
        billDate: req.body.billDate,
        uom: req.body.uom,
        hsn: req.body.hsn,
        itemCode: req.body.itemCode
    });
    purchase.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Product Successfully!',
                createdProduct: {
                    result
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}