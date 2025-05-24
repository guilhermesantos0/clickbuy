const mongoose = require('mongoose');
const Product = require('../models/Product');
const Payment = require('../models/Payment');

const resetPayments = async () => {
    await mongoose.connect("mongodb+srv://guilhermesantosdev:cewdLg7RWbCMyWRp@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('🔌 Conectado ao MongoDB');
    
    const products = await Product.find();

    for (const product of products) {
        product.sold = false;
        await product.save();

        console.log(`✅ ${product.name} Atualizado!`)
    }
    
    await Payment.deleteMany();
    console.log(`✅ Pagamentos deletados!`)

}

resetPayments();