const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: String,
    amount: Number,
    category: String,
    date: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
