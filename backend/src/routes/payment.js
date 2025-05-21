const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');


router.post('/pix', async (req, res) => {
    const { amount, checkoutInfo } = req.body;
    const idempotencyKey = uuidv4();
    
    try {
        const body = {
            transaction_amount: amount,
            description: checkoutInfo.description,
            payment_method_id: 'pix',
            payer: {
                email: checkoutInfo.email,
                first_name: checkoutInfo.name,
                identification: {
                    type: 'CPF',
                    number: checkoutInfo.cpf
                }
            }
        }

        const response = await axios.post(
            "https://api.mercadopago.com/v1/payments",
            body,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                    "X-Idempotency-Key": idempotencyKey
                }
            }
        )

        res.status(200).json({
            qrCodeCode: response.data.point_of_interaction.transaction_data.qr_code,
            qrCodeBase64: response.data.point_of_interaction.transaction_data.qr_code_base64 
        })

    } catch (error) {
        console.error('Erro ao gerar QR Code PIX:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro ao gerar QR Code PIX', error });
    }
});

router.post('/webhook', (req, res) => {
    console.log('📩 Recebido webhook do Mercado Pago:', req.body);

    res.sendStatus(200);
});

module.exports = router;