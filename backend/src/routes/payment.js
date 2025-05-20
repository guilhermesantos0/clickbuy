const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');
const axios = require('axios');

router.post('/pix', async (req, res) => {
    const { amount, checkoutInfo } = req.body;

    try {
        const body = {
            transaction_amount: Number(amount),
            description: checkoutInfo.description,
            payment_method_id: 'pix',
            payer: {
                email: checkoutInfo.email
            }
        }

        const resp = axios.post(
            "https://api.mercadopago.com/v1/payments",
            body,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        )

        // const { id, point_of_interaction } = response.data;

        resp.json(res.data)

        // return res.status(200).json({
        //     qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
        //     qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64
        // });
    } catch (error) {
        console.error('Erro ao gerar QR Code PIX:', error);
        res.status(500).json({ error: 'Erro ao gerar QR Code PIX' });
    }
});

module.exports = router;