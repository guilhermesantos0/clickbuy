const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    cart: { type: Array, required: true }
})

module.exports = mongoose.model('Cart', cartSchema)