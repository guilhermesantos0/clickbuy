const mongoose = require('mongoose');
const User = require('../models/User');

const resetPayments = async () => {
    await mongoose.connect("mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('🔌 Conectado ao MongoDB');
    
    await User.updateMany({}, { $set: { favourites: [] } })

    console.log('✅ Favoritos resetados para todos os usuários!');
}

resetPayments();