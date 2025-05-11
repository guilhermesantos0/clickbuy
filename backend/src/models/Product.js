const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4()
  },
  name: { type: String, required: true },
  images: { type: [String], required: true }, 
  mainImage: { type: String, required: true }, 
  price: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  announcer: { type: String, required: true },
  condition: {
    quality: { type: String, required: true },
    used: { type: Boolean, required: true }
  },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
