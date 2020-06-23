const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    orderData: {type: Array},
    customer: {type: Object}
});

module.exports = mongoose.model('Sales', salesSchema);