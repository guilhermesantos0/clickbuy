const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conectado ao MongoDB Atlas!');
    app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
})
.catch(err => console.error('Erro de conexão:', err));

app.use('/products', require('./src/routes/products'));
app.use('/user', require('./src/routes/user'));
app.use('/checkEmail', require('./src/routes/checkEmail'));

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log(`Servidor iniciado na porta ${PORT}`) )