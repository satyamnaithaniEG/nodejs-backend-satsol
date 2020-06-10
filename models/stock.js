const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
    item: { type: String },
    lotNo: { type: String },
    billNo: { type: String },
    exp: { type: String },
    vendor: { type: String },
    initialQuantity: { type: Number, default: 1},
    quantity: { type: Number},
    rate: { type: Number },
    gst: { type: Number },
    purchaseRate: { type: Number },
    receiveDate: { type: String },
    billDate: {type: String},
    uom: {type: String},
});

module.exports = mongoose.model('Stock', stockSchema);