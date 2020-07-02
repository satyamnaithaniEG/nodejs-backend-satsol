const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    orderData: {type: Array},
    customer: {type: Object},
    customerName: {type: String},
    date: {type: Date},
    totalRate: {type: Number},
    totalGst: {type: Number},
    grandTotal: {type: Number},
    invoiceNo: {type: String},
    challanNo: {type: String},
    challanDate: {type: Date},
    modeOfPayment: {type: String},
    orderNumber: {type: String},
    dispatchThrough: {type: String},
    destination: {type: String},
    termsOfDelivery: {type: String},
    interState: {type: Boolean},
    grandTotalInWords:{type: String} 
});

module.exports = mongoose.model('Sales', salesSchema);