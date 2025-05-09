const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userId: { type: String, required: true }
})

module.exports = mongoose.model('Favourite', FavouriteSchema)