const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    stockId: {type: String},
    customer: {type: String},
    item: { type: String },
    lotNo: { type: String },
    billNo: { type: String },
    exp: { type: String },
    vendor: { type: String },
    quantity: { type: Number, default: 1 },
    rate: { type: Number },
    gst: { type: Number },
    purchaseRate: { type: Number },
    receiveDate: { type: String },
    billDate: {type: String},
    uom: {type: String}, 
});

module.exports = mongoose.model('Order', orderSchema);