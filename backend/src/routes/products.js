const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require("../middleware/upload");
const Category = require('../models/Category');
const path = require('path');
const fs = require('fs');
const Favourited = require('../models/Favourited');

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

router.get('/user/:id', async (req, res) => {
    try {
        const products = await Product.find({ announcer: req.params.id });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        
        product.images.forEach(img => {
            const imgPath = path.join(__dirname, '..', img); 
            console.log(imgPath, fs.existsSync(imgPath))
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        });

        const favourited = await Favourited.find({ productId: product });
        if(favourited.length > 0) Favourited.deleteMany({ productId: product })
            
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Produto e imagens deletados com sucesso' });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao excluir produto', error: err.message });
    }
});

// router.delete('/', async (req, res) => {
//     try {
//         await Product.deleteMany();
//         res.status(200).json({ message: "Produto deletada ocom sucesso! "});
//     } catch (err) {
//         res.status(500).json({ message: "Erro ao deletar produto", error: err.message })
//     }
// })

router.put('/:id', upload.array('images', 10), async (req, res) => {
    try {
        const productId = req.params.id;
        const parsedData = JSON.parse(req.body.data);
        const files = req.files;

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        let updatedImages = [...existingProduct.images];

        if (Array.isArray(parsedData.imagesToRemove)) {
            parsedData.imagesToRemove.forEach((imgPath) => {
                const filePath = path.join(__dirname, '..', imgPath);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                updatedImages = updatedImages.filter((img) => img !== imgPath);
            });
        }

        const newImagePaths = files.map(file => `/upload/${file.filename}`);
        updatedImages.push(...newImagePaths);

        const mainImageIndex = parsedData.mainImageIndex ?? 0;
        const mainImage = updatedImages[mainImageIndex] || updatedImages[0];

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                ...parsedData,
                images: updatedImages,
                mainImage
            },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ error: 'Erro interno ao atualizar produto' });
    }
});

module.exports = router;