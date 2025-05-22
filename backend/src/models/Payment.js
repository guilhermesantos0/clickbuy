const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true, ref: 'User' },
    products: [{ type: String, ref: 'Product' }]
})

module.exports = mongoose.model('Payment', paymentSchema);