const mercadopago = require('mercadopago');
const dotenv = require('dotenv');
dotenv.config();

const teste = mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
});

module.exports = teste;
