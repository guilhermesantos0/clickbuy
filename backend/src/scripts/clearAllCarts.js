const mongoose = require('mongoose');
const User = require('../models/User');

const clearAllCarts = async () => {
    await mongoose.connect('mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    try {
        const result = await User.updateMany({}, { $set: { cart: [] } });
        console.log(`🧼 Carrinho limpo de ${result.modifiedCount} usuários.`);
    
        mongoose.disconnect()
    } catch (error) {
        console.error("❌ Erro:", err);
    }
}

clearAllCarts();