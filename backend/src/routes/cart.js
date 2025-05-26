const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
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

router.delete('/', async (req, res) => {
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

router.post('/remove/product', async (req, res) => {
    const { productId } = req.body; 

    try {
        await User.updateMany(
            { cart: productId },
            { $pull: { cart: productId } }
        )

        res.status(200).json({ message: 'Produto Removido do carrinho de todos os usuários.' });
    } catch (error) {
        console.error('Erro ao remover produto do carrinho: ', error);
        res.status(500).json({ message: 'Erro interno do servidor ' })
    }
})

module.exports = router;
