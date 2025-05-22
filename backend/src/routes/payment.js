const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const Payment = require('../models/Payment');

router.post('/pix', async (req, res) => {
    const { amount, checkoutInfo, products } = req.body;
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

/* 
    {
        amount: 2000,
        checkoutInfo: {
            "token": "??",
            "decription": "Descrição Teste",
            "installments": 3,
            "method": "VIsa",
            "email": "email@teste.com",
            "cpf": "11111111111"
        }
    }
*/

const getPaymentMethod = async (bin) => {
    try {
        const response = await axios.get(`https://api.mercadopago.com/v1/payment_methods/search?bin=${bin}`, {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        const method = response.data.results.find((m) => m.payment_type_id === 'credit_card');
        console.log(method)
        // const method = response.data.results[0];
        
        return method.id;
    } catch (err) {
        console.error("Erro ao buscar método de pagamento:", err);
        throw err;
    }
}

router.post('/card', async (req, res) => {
    const { amount, checkoutInfo, products } = req.body;

    const methodId = await getPaymentMethod(checkoutInfo.bin)
    console.log(methodId)

    const body = {
        token: checkoutInfo.token,
        transaction_amount: Number(amount),
        description: checkoutInfo.description,
        installments: Number(checkoutInfo.installments),
        payment_method_id: methodId,
        payer: {
            email: checkoutInfo.email,
            identification: {
                type: 'CPF',
                number: checkoutInfo.cpf
            }
        }
    }

    try {
        const response = await axios.post(
            "https://api.mercadopago.com/v1/payments",
            body,
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                    'X-Idempotency-Key': Date.now().toString() 
                }
            }
        )

        console.log('💳 Pagamento com cartão enviado:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Erro ao pagar com cartão:', error.response?.data || error.message);
        res.status(500).json({
            message: 'Erro ao processar pagamento com cartão',
            error: error.response?.data || error.message
        });
    }
})

router.post('/webhook', async (req, res) => {
    console.log('📩 Recebido webhook do Mercado Pago:', req.body);

    const { type, data, action } = req.body;

    if (type === "payment" && action === "payment.updated") {
        const paymentId = data.id;

        try {
            const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            })

            const payment = response.data;

            console.log('💰 Pagamento atualizado:', {
                id: payment.id,
                status: payment.status,
                status_detail: payment.status_detail,
                transaction_amount: payment.transaction_amount,
                payment_type_id: payment.payment_type_id,
                email: payment.payer.email
            });

            res.sendStatus(200);
        } catch (err) {
            console.error('❌ Erro ao buscar pagamento:', err.response?.data || err.message);
            res.sendStatus(500);
        }
    } 

});

router.get('/status/:id', async (req, res) => {

})

module.exports = router;