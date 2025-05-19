const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');

mongoose.connect('mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const setUserCarts = async () => {
    try {
        const users = await User.find();
        const products = await Product.find();

        const productIds = products.map((product) => product._id);

        for (const user of users) {
            const shuffled = [...productIds].sort(() => 0.5 - Math.random());
            const selectedProducts = shuffled.slice(0, Math.floor(Math.random() * 3) + 1);

            user.cart = selectedProducts;
            await user.save();
            console.log(`Usuário ${user.email} recebeu ${selectedProducts.length} produtos no carrinho.`);
        }

        console.log('Carts atualizados com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar os carrinhos:', error);
    } finally {
        mongoose.connection.close();
    }
};

setUserCarts();
