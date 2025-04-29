const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
})

router.post('/', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
})

router.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuário deletado com sucesso! "});
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar usuário", error: err.message })
  }
})

module.exports = router;