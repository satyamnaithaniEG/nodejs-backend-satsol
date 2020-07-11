
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
    await Sales.find().countDocuments().exec().then(res => { global.count = ++res });

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
      grandTotalInWords: toWords.convert(totalRate + totalGst),
      addedBy: req.body.addedBy
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
  global.count
  Sales.count().exec().then(response=>global.count=response).catch(error=> res.status(500).json(error))
  Sales.find()
  .sort({_id: -1})
  .skip(parseInt(req.params.skip))
  .limit(parseInt(req.params.limit))
    //.select()
    .exec()
    .then(response => {
      const result = {
          count: global.count,
          sales: response
      }
      res.status(200).json(result)

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
    "date": { $gte: req.params.startDate, $lte: req.params.endDate }
  })
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

exports.sales_get_monthly_sale_details = (req, res, next) => {
  var date = new Date()
  var dateOnMonthStart = date.toISOString().split('-')[0] +'-'+ date.toISOString().split('-')[1]+'-'+ '01' +'T'+ '00:00:00.000Z'
  console.log(date)
  console.log(dateOnMonthStart)
  Sales.find({
   "date": { $gte: dateOnMonthStart, $lte: date }
  })
      .exec()
      .then(docs => {
        var totalPrice = 0,
            totalRate = 0,
            totalGst = 0
        for(var i=0; i< docs.length;i++) {
           totalRate= totalRate + docs[i].totalRate;
           totalGst= totalGst + docs[i].totalGst;
           totalPrice = totalGst + totalRate
        }
        const response = {
            count: docs.length,
            rate: parseFloat(totalRate.toFixed(2)),
            gst: parseFloat(totalGst.toFixed(2)),
            total: parseFloat(totalPrice.toFixed(2)),
            grandTotalInWords: toWords.convert(totalPrice.toFixed(2))
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

