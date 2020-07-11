const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    code: { type: String },
    address: { type: String},
    city: { type: String},
    state: { type: String},
    zip: { type: String},
    gst: { type: String},
    dl: { type: String},
    contact: { type: String},
    person: { type: String},
    addedBy: {type: String}
});

module.exports = mongoose.model('Customer', customerSchema)


