const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const { email } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: 'Email já cadastrado' });
        }

        res.status(200)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
    }
})

module.exports = router;