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

router.patch('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const { field, value } = req.body;

    if (!field || typeof value === "undefind" ) {
      return res.status(400).json({ message: 'É obrigatório alterar algo!'});
    }

    const updateObject = {};
    updateObject[field] = value;

    const user = await User.findByIdAndUpdate(id, updateObject, { new: true });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso!", user });
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualiar usuário.", error: err.message });
  }

})

router.delete('/:id', async(req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuário deletado com sucesso! "});
  } catch (err) {
    res.status(500).json({ message: "Erro ao deletar usuário", error: err.message })
  }
})

module.exports = router;