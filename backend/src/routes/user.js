const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const { name, email, password, personalData } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    const newUser = new User({ name, email, password, personalData });
    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
});

router.get('/', async(req, res) => {
    const users = await User.find();
    res.json(users);
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuário deletado com sucesso! "});
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar usuário", error: err.message })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

module.exports = router;