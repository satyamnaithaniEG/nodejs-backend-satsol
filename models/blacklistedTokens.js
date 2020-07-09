const mongoose = require('mongoose');

const blacklistedTokenSchema = mongoose.Schema({
    token: {type: String, required: true, unique: true},
    time: {type: Date}
});

module.exports = mongoose.model('BlackListedTokens', blacklistedTokenSchema)


