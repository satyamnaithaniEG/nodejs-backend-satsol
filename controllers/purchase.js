const mongoose = require('mongoose');

const Purchase = require('../models/purchase');


exports.purchase_get_all_item = (req, res, next) => {
    Purchase.find()
        .exec()
        .then(purchase => {
            const response = {
                count: purchase.length,
                purchase: purchase.map(doc => {
                    return {
                        doc
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

// creating purchase is auotomatically done when entering stock details. method invoked in stock.js post file.
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
        itemCode: req.body.itemCode,
        addedBy: req.body.addedBy
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

exports.purchase_get_total_purchase_amount = (req, res, next) => {
    var date = new Date()
  var quarterly_month = date.toISOString().split('-')[1] <= 9 ? '0' + (date.toISOString().split('-')[1] - 4) : date.toISOString().split('-')[1] - 3
  var quarterlyDate = new Date(date.toISOString().split('-')[0] + '-' + quarterly_month + '-' + '01' + 'T' + '00:00:00.000Z')
    Purchase.find({
        "billDate": { $gte: quarterlyDate, $lte: date }
      })
        .exec()
        .then(docs => {
            var totalPrice = 0,
                totalRate = 0,
                totalGst = 0
            for(var i=0; i< docs.length;i++) {
               totalRate += (docs[i].rate*docs[i].quantity);
               totalGst += docs[i].rate*(docs[i].gst/100)*docs[i].quantity;
            }
            totalPrice = totalGst + totalRate

            const response = {
                count: docs.length,
                rate: totalRate.toFixed(2),
                gst: totalGst.toFixed(2),
                total: totalPrice.toFixed(2),
                quarterlyMonthStartDate: quarterlyDate.toDateString()
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