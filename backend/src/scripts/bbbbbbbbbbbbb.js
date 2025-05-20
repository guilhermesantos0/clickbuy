// scripts/fixProductAnnouncers.js
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

mongoose.connect('mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fixProductAnnouncers = async () => {
  try {
    const products = await Product.find();

    for (const product of products) {
      if (typeof product.announcer === 'string') {
        // já é um ID, nada a fazer
        continue;
      }

      if (product.announcer && product.announcer._id) {
        const announcerId = product.announcer._id;
        product.announcer = announcerId;
        product.markModified('announcer');
        await product.save();
        console.log(`📦 Produto ${product.name} corrigido com anunciante ${announcerId}.`);
      }
    }

    console.log('✅ Todos os anunciantes foram corrigidos.');
  } catch (error) {
    console.error('❌ Erro ao corrigir os anunciantes:', error);
  } finally {
    mongoose.disconnect();
  }
};

fixProductAnnouncers();
