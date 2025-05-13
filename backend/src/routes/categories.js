const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const upload = require("../middleware/upload");

router.post('/', upload.single('icon'), async (req, res) => {
    try {     
        const { name } = req.body;
        const iconPath = req.file ? `/upload/${req.file.filename}` : null;
        
        const newCategory = new Category({ name, icon: iconPath });
        await newCategory.save();
        
        res.status(200).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: 'Erro ao criar categoria: ', error: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ _id: 1 });
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar categoria', error: err.message })
    }
})

router.delete('/', async (req, res) => {
    try {
        await Category.findOneAndDelete();
        res.status(200).json({ message: "Categoria deletada ocom sucesso! "});
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar categoria", error: err.message })
    }
})

router.put("/:id", async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Erro ao atualizar categoria:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

module.exports = router;