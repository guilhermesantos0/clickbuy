const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        res.status(200).json({
            message: "Login realizado com sucesso!",
            user
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro no login', error: error.message });
    }
})

module.exports = router;