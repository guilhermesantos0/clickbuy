const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { Product } = require('../models/Product');

router.post('/add', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user.cart.includes(productId)) {
            user.cart.push(productId);
            await user.save();
        }
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ error: "Erro ao adicionar ao carrinho" });
    }
});

router.post('/remove', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        user.cart = user.cart.filter(id => id !== productId);
        await user.save();

        res.status(200).json({ message: 'Produto removido do carrinho', cart: user.cart });
    } catch (error) {
        console.error('Erro ao remover do carrinho:', error);
        res.status(500).json({ error: 'Erro interno ao remover do carrinho' });
    }
});

module.exports = router;
