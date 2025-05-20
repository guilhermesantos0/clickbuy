// scripts/fixUserCarts.js
const mongoose = require('mongoose');
const { User } = require('../models/User');
const { Product } = require('../models/Product');

mongoose.connect('mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fixUserCarts = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const cleanedCart = [];

      for (const item of user.cart) {
        if (typeof item === 'string') {
          // já é um ID
          cleanedCart.push(item);
        } else if (item && item._id) {
          // é um objeto de produto
          cleanedCart.push(item._id);
        }
      }

      user.cart = cleanedCart;
      await user.save();
      console.log(`🛒 Carrinho do usuário ${user.email} corrigido com ${cleanedCart.length} itens.`);
    }

    console.log('✅ Todos os carrinhos foram corrigidos.');
  } catch (error) {
    console.error('❌ Erro ao corrigir os carrinhos:', error);
  } finally {
    mongoose.disconnect();
  }
};

fixUserCarts();
