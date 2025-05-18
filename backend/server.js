const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/upload', express.static('src/upload'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.clear()
        console.log('Conectado ao MongoDB Atlas!');
        app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
    })
    .catch(err => console.error('Erro de conexão:', err));


app.use('/products', require('./src/routes/products'));
app.use('/user', require('./src/routes/user'));
app.use('/checkEmail', require('./src/routes/checkEmail'));
app.use('/login', require('./src/routes/login'));
app.use('/categories', require('./src/routes/categories'));
app.use('/favourites', require('./src/routes/favourites'))
app.use('/cart', require('./src/routes/cart'));

app.use('/test', require('./src/routes/test'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`) )