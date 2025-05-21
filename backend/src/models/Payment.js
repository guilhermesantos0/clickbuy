const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    payment: {
        status: { type: String, default: 'Pending' },
        status_detail: String,
        type_id: String,
        amount: Number
    },
    payer: {
        email: String,
        name: String,
        cpf: String
    },
    products: [{ type: String, ref: 'Product' }]
})

module.exports = mongoose.model('Payment', paymentSchema);