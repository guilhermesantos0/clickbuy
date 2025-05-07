const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require("../middleware/upload");

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
})

router.post('/', upload.array('images', 10), async (req, res) => {
  
    try {
      console.log(req.body)
      console.log(req.files)
      const  filePaths = req.files.map(file => `/upload/${file.filename}`);
      const { name, price, location, category, announcer, used, condition, mainImageIndex } = req.body;
      
      const mainImage = filePaths[Number(mainImageIndex)] || filePaths [0];

      const newProduct = new Product({ name, price, location, category, announcer, condition: { used: used === "true", quality: condition }, images: filePaths, mainImage });
      await newProduct.save();

      res.status(201).json(newProduct);

    } catch (err) {
      console.error('Erro ao criar o produto', err);
      res.status(500).json({ message: 'Erro ao criar o produto' })
    }
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
    const result = await Product.findByIdAndDelete(req.params.id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Produto não encontrado para exclusão' });
    }

    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir produto', error: err.message });
  }
});

module.exports = router;