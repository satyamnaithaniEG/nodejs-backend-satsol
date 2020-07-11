const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: { type: String },
    lotNo: { type: String },
    billNo: { type: String },
    exp: { type: Date },
    vendor: { type: String },
    quantity: { type: Number},
    rate: { type: Number },
    gst: { type: Number },
    purchaseRate: { type: Number },
    receiveDate: { type: Date },
    billDate: {type: Date},
    uom: {type: String},
    hsn: {type: String},
    itemCode: {type: String},
    addedBy: {type: String}
});

module.exports = mongoose.model('Purchase', purchaseSchema);