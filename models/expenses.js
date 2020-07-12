const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String},
    amount: {type: Number},
    date: {type: Date},
    description: {type: String},
    addedBy: { type: String }
});

module.exports = mongoose.model('Expenses', expenseSchema)


