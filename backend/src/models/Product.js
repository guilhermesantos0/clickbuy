const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => uuidv4()
    },
    name: String,
    image: String,
    price: Number,
    location: String
});

module.exports = mongoose.model('Product', productSchema)