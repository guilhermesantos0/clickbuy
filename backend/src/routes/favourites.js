const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user.favourites.includes(productId)) {
            user.favourites.push(productId);
            await user.save();
        }
        res.json(user.favourites);
    } catch (err) {
        res.status(500).json({ error: "Erro ao adicionar aos favoritos" });
    }
});

router.delete('/', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        user.favourites = user.favourites.filter(id => id !== productId);
        await user.save();

        res.status(200).json({ message: 'Produto removido dos favoritos', favourites: user.favourites });
    } catch (error) {
        console.error('Erro ao remover dos favoritos:', error);
        res.status(500).json({ error: 'Erro interno ao remover dos favoritos' });
    }
});

module.exports = router;