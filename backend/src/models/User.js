const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4()
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: ""
  },
  cart: [{ type: String, ref: 'Product'}],
  personalData: {
    name: { 
        type: String, 
        required: true 
    },
    bornDate: { 
        type: String, 
        required: true 
    },
    cpf: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    address: {
      road: { 
        type: String, 
        required: true 
    },
      number: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      complement: { type: String },
      neighborhood: { type: String, required: true }
    }
  }
});

module.exports = mongoose.model('User', userSchema);

// module.exports = mongoose.model('User', userSchema);
