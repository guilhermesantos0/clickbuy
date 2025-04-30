const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

router.post('/', async (req, res) => {
    try {
        const category = req.body;

        const newCategory = new Category({ name: category.name, image: category.image });
        await newCategory.save();

        res.status(200)
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar categoria: ', err })
    }
})