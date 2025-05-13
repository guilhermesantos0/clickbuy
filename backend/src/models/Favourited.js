const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
    productId: { type: String, required: true, ref: 'User' },
    userId: { type: String, required: true, ref: 'Product' }
}, { timestamps: true })

FavouriteSchema.index({ userId: 1, productId: 1}, { unique: true })
module.exports = mongoose.model('Favourite', FavouriteSchema)