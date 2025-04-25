const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const { email } = req.query;

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ able: false });
        }

        res.status(200).json({ able: true })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao consultar email', error: err.message });
    }
})

module.exports = router;