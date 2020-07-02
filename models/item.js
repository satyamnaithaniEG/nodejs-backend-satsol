const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    catogory: { type: String },
    name: { type: String },
    hsn: { type: String },
    gst: {type: String},
    uom: {type: String},
    itemCode: {type: String}
});

module.exports = mongoose.model('Item', itemSchema)


