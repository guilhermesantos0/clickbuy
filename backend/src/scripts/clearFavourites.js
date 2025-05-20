const mongoose = require('mongoose');
const Favourited = require('../models/Favourited'); // ajuste o path conforme necessário
const Product = require('../models/Product');     // ajuste o path conforme necessário

const limparFavoritosOrfaos = async () => {
    try {
        await mongoose.connect("mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        

        await Favourited.deleteMany({ productId: '6b742940-edc5-4f85-a204-dcdc11c00c83' })

        console.log('Verificação concluída.');
        mongoose.disconnect();
    } catch (error) {
        console.error('Erro ao limpar favoritos:', error);
    }
};

limparFavoritosOrfaos();
