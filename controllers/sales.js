
const Sales = require('../models/sales')
const Stock = require('../models/stock');
const mongoose = require('mongoose');
const { ToWords } = require('to-words');

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  }
});

exports.sales_create_sales = async (req, res, next) => {


  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    let totalRate = 0;
    let totalGst = 0;
    req.body.orderData.map(data => {
      totalRate = parseFloat(totalRate + (data.sellingRate * data.checkout))
      totalGst = parseFloat(totalGst + data.sellingRate * (data.gst / 100) * data.checkout)
    })
    global.count;
    await Sales.find().count().exec().then(res => { global.count = ++res });

    const sales = new Sales({

      _id: new mongoose.Types.ObjectId(),
      orderData: req.body.orderData,
      customer: req.body.customer,
      date: req.body.date,
      totalRate: totalRate.toFixed(2),
      totalGst: totalGst.toFixed(2),
      grandTotal: parseFloat(totalRate + totalGst).toFixed(2),
      customerName: req.body.customer.name,
      invoiceNo: global.count < 10 ?
        'SS/20-21/00' + global.count
        : global.count >= 10 && global.count <= 99 ?
          'SS/20-21/0' + global.count
          : 'SS/20-21/' + global.count,
      challanNo: req.body.challanNo,
      challanDate: req.body.challanDate,
      modeOfPayment: req.body.modeOfPayment,
      orderNumber: req.body.orderNumber,
      dispatchThrough: req.body.dispatchThrough,
      destination: req.body.destination,
      termsOfDelivery: req.body.termsOfDelivery,
      interState: req.body.interState,
      grandTotalInWords: toWords.convert(totalRate + totalGst)
    });
    global.stockQuantity
    const data = req.body.orderData
    for (var i = 0; i < data.length; i++) {
      await Stock.findById(data[i]._id)
        .select('quantity')
        .exec()
        .then(res => {
          if (res.quantity >= data[i].checkout) {
            global.stockQuantity = res.quantity - data[i].checkout
          }
          else {
            res.status(500).json({ error: "CheckOut Quantity exceeds Stock Quantity" });
            session.abortTransaction()
            session.endSession()
          }
        })
        .catch(err => {
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
            customer: result.customer,
            _id: result._id,
            date: result.date,
            challanNo: result.challanNo,
            challanDate: result.challanDate,
            modeOfPayment: result.modeOfPayment,
            orderNumber: result.orderNumber,
            invoiceNo: result.invoiceNo,
            dispatchThrough: result.dispatchThrough,
            destination: result.destination,
            termsOfDelivery: result.termsOfDelivery,
            interState: result.interState,
            grandTotalInWords: result.grandTotalInWords
          }
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
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
  await Stock.deleteMany({ "quantity": 0 })
}

exports.sales_get_sales = (req, res, next) => {
  Sales.find()
    //.select()
    .exec()
    .then(response => {
      // const response = {
      //     count: docs.length,
      //     sales: docs.map(doc => {
      //         return {
      //              doc
      //         }
      //     })
      // }
      res.status(200).json(response)

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })

    })
}


exports.sales_get_sales_filter_gst = (req, res, next) => {
  var arr = new Array();
  global.result = arr
  global.array = new Array();
  Sales.find()
    .exec()
    .then(sales => {
      // res.status(200).json(sales)
      sales.map(sale => {
        const result = sale.orderData.filter(data => data.gst == req.params.gst_percent)
        if (result.length != 0) {
          global.result.push(result)
        }
      })

      for (var i = 0; i < global.result.length; i++) {
        for (var j = 0; j < global.result[i].length; j++) {
          global.array.push(global.result[j])
        }
      }

      res.status(200).json(global.array)
    })
}


exports.sales_get_sales_filter_date = (req, res, next) => {
  Sales.find({
    "date": { $gte: "2020-07-20", $lte: "2020-07-24" }
  })
    //.select()
    .exec()
    .then(docs => {

      res.status(200).json(docs)

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })

    })
}

exports.sales_get_recent_sale = (req, res, next) => {
  Sales.find().sort({ _id: -1 }).limit(1)
    .exec()
    .then(sale => {
      res.status(200).json(sale)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })

    })

}

exports.sales_get_total_sale_amount = (req, res, next) => {
  Sales.find()
    .sort({ date: -1 })
      .exec()
      .then(docs => {
        // var totalPrice = 0,
        //     totalRate = 0,
        //     totalGst = 0
        // for(var i=0; i< docs.length;i++) {
        //    totalRate= totalRate + docs[i].purchaseRate*docs[i].quantity;
        //    totalGst= totalGst + docs[i].purchaseRate*(docs[i].gst/100)*docs[i].quantity;
        //    totalPrice = totalGst + totalRate
        //    console.log(docs[i].purchaseRate)
        // }
        // //console.log(parseFloat(totalPrice))
        // const response = {
        //     count: docs.length,
        //     rate: totalRate,
        //     gst: totalGst,
        //     total: totalPrice,
        // }
        const doc = {
          doc: docs.map(doc => {
            return {
              date: doc.date
            }

          })
        }
        res.status(200).json(doc)

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })

      })
}

