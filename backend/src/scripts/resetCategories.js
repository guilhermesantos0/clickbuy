const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('../models/Category');
const Counter = require('../models/Counter');

async function resetCategories() {
  try {
    await mongoose.connect("mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('🔌 Conectado ao MongoDB');

    await Category.deleteMany({});
    console.log('🗑️ Todas as categorias foram deletadas.');

    await Counter.findOneAndUpdate(
      { _id: 'Category' },
      { $set: { sequence_value: 0 } },
      { upsert: true }
    );
    console.log('🔁 Contador de categorias resetado.');

    process.exit();
  } catch (error) {
    console.error('❌ Erro ao resetar categorias:', error.message);
    process.exit(1);
  }
}

resetCategories();
