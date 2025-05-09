const mongoose = require('mongoose');
const Product = require('../models/Product'); 
const dotenv = require('dotenv');
dotenv.config();

async function atualizarCreatedAt() {
  try {
    await mongoose.connect("mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('🔌 Conectado ao MongoDB');

    const products = await Product.find({ createdAt: { $exists: false } });;

    for (const product of products) {
      const randomDate = new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000));
      product.createdAt = randomDate;
      await product.save();
    }

    console.log(`✅ Atualizados ${products.length} produtos com createdAt aleatório.`);
  } catch (error) {
    console.error('❌ Erro ao atualizar createdAt:', error);
  } 
}

atualizarCreatedAt();
