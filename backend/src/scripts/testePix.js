const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const main = async () => {
    try {
        const idempotencyKey = uuidv4();

        const body = {
            transaction_amount: 2000,
            description: "Descrição Teste",
            payment_method_id: "pix",
            payer: {
                email: "teste@teste.com",
                first_name: "Cliente",
                identification: {
                    type: "CPF",
                    number: "11111111111"
                }
            }
        };

        const response = await axios.post(
            "https://api.mercadopago.com/v1/payments",
            body,
            {
                headers: {
                    Authorization: "Bearer TEST-1412485303201874-052016-e44957b799ac9408bfcb642069d1ce0c-2447398073",
                    "Content-Type": "application/json",
                    "X-Idempotency-Key": idempotencyKey
                }
            }
        );

        console.log("✅ Pagamento criado com sucesso!");
        console.log("🔢 ID do pagamento:", response.data.id);
        console.log("📲 QR Code (texto):", response.data.point_of_interaction.transaction_data.qr_code);
        console.log("🖼 QR Code (base64):", response.data.point_of_interaction.transaction_data.qr_code_base64);
    } catch (error) {
        if (error.response) {
            console.error("❌ Erro da API Mercado Pago:", error.response.data);
        } else {
            console.error("❌ Erro inesperado:", error.message);
        }
    }
};

main();
