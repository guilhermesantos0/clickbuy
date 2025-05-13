const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require("../middleware/upload");
const Category = require('../models/Category');
const path = require('path');
const fs = require('fs');

router.get('/', async (req, res) => {

    try {
      if(req.query.category) {
  
        const products = await Product.find({ category: req.query.category });
        res.status(200).json({ products })

      }else {
        const products = await Product.find();
        res.status(200).json(products);
      }
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar produtos', err })
    }
})

router.post('/', upload.array('images', 10), async (req, res) => {
  
    try {
      const  filePaths = req.files.map(file => `/upload/${file.filename}`);
      const { name, price, location, categoryId, announcer, used, condition, mainImageIndex, description } = req.body;

      const category = await Category.findOne({ _id: Number(categoryId)})
      console.log(category.name)

      const mainImage = filePaths[Number(mainImageIndex)] || filePaths [0];

      const newProduct = new Product({ name, price, location, category: category.name, description, announcer, condition: { used: used === "true", quality: condition }, images: filePaths, mainImage });
      await newProduct.save();

      res.status(201).json(newProduct);

    } catch (err) {
      console.error('Erro ao criar o produto', err);
      res.status(500).json({ message: 'Erro ao criar o produto' })
    }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

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
    console.log(req.params.id)
    const product = await Product.findById(req.params.id);
    // console.log(product)
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    // console.log(product.images)
    
    product.images.forEach(img => {
      // console.log(img)
      const imgPath = path.join(__dirname, '..', img); 
      console.log(imgPath, fs.existsSync(imgPath))
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Produto e imagens deletados com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir produto', error: err.message });
  }
});

router.delete('/', async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).json({ message: "Produto deletada ocom sucesso! "});
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar produto", error: err.message })
    }
})


module.exports = router;