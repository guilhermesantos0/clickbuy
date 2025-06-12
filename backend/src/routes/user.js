const express = require('express');
const router = express.Router();
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const upload = require("../middleware/upload");
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const Product = require('../models/Product');

router.post('/', async (req, res) => {
    try {
        const { name, email, password, personalData } = req.body;

        const exists = await User.findOne({ email });
        if (exists) {
        return res.status(409).json({ message: 'Email já cadastrado' });
        }

        const newUser = new User({ name, email, password, personalData });
        await newUser.save();

        res.status(200).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
    }
});

router.post('/recovery', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if(user) {
            const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '5m' });
            // const url = `http://localhost:3000/redefinir-senha?token=${token}`;
            const url = `http://http://clickbuy-pii.s3-website-sa-east-1.amazonaws.com/redefinir-senha?token=${token}`;

            console.log(url)

            res.status(200).json({ message: 'Email enviado com sucesso', token });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' })
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar email', error })
    }
})

router.get('/', async(req, res) => {
    const users = await User.find();
    res.json(users);
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
    }
});

router.get('/:id/cart', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({
                path: 'cart',
                populate: {
                    path: 'announcer',
                    model: 'User'
                }
            });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar carrinho', error });
    }
});

router.get('/:id/products', async (req, res) => {
    try {
        const userProducts = await Product.find({ announcer: req.params.id });
        res.status(200).json(userProducts);
    } catch (error) {
        console.error(error)
        res.status(500).json({ messaget: 'Erro ao buscar produtos do usuário', error });
    }
})

router.get('/:id/favourites', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('favourites');

        if(!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(user.favourites);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar favoritos', error });
    }
})

router.get('/:id/purchased', async (req, res) => {
    try {
        const products = await Product.find({ buyer: req.params.id }).populate('announcer');

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar meus pedidos', error });
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

router.put('/:id', upload.single('profilePic'), async (req, res) => {
    try {
        const userId = req.params.id;
        const parsedData = JSON.parse(req.body.data);

        if (req.file) {

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'profilePics',
            });

            parsedData.profilePic = result.secure_url;

            fs.unlinkSync(req.file.path);
        }

        if (!parsedData.password) {
            delete parsedData.password;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, parsedData, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

router.put("/2/:id", async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        console.error("Erro ao atualizar usuário:", err);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

router.patch("/reset-password", async (req, res) => {
    const decoded = jwt.verify(req.body.token, 'secretKey')
    
    try {
        const userId = decoded.userId;
        const updated = await User.findByIdAndUpdate(userId, { password: req.body.newPassword }, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        console.error("Erro ao redefinir senha:", err);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
    console.log(req.body.newPassword)
})


module.exports = router;