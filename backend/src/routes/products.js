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

router.get('/:id', async (req, res) => {
  
  
  try {
    const product = await Product.findOne({ name: req.params.id });

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: err.message });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.deleteOne({ name: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Produto não encontrado para exclusão' });
    }

    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir produto', error: err.message });
  }
});

module.exports = router;