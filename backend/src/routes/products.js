const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const upload = require("../middleware/upload");
const Category = require('../models/Category');
const path = require('path');
const fs = require('fs');
const cloudinary = require("../config/cloudinary");

router.get('/', async (req, res) => {
    try {
        if(req.query.category) {

            const products = await Product.find({ category: req.query.category, sold: { $ne: true } });
            res.status(200).json({ products })

        } else if(req.query.name) {

            const regex = new RegExp(req.query.name, "i");

            const products = await Product.find({
                $or: [
                    { name: { $regex: regex } },
                    { description: { $regex: regex } },
                    { category: { $regex: regex } }
                ]
            });

            res.status(200).json(products);

        } else {

            const products = await Product.find({ sold: { $ne: true } });
            res.status(200).json(products);

        }
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar produtos', err })
    }
})

router.get('/all', async(req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})

router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        const { name, price, location, categoryId, announcer, used, condition, mainImageIndex, description } = req.body;

        const uploadedImageUrls = [];

        for (const file of req.files) {

            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'produtos',
            });

            // const result = await new Promise((resolve, reject) => {
            //     cloudinary.uploader.upload_stream({ folder: 'produtos' }, (err, result) => {
            //         if (err) { console.log(err); return reject(err); }
            //         console.log(result)
            //         resolve(result);
            //     }).end(file.buffer);
            // });

            uploadedImageUrls.push(result.secure_url);
            fs.unlinkSync(file.path);
        }

        const category = await Category.findOne({ _id: Number(categoryId) });

        const mainImage = uploadedImageUrls[Number(mainImageIndex)] || uploadedImageUrls[0];

        const newProduct = new Product({
            name,
            price,
            location,
            category: category.name,
            description,
            announcer,
            condition: {
                used: used === 'true',
                quality: condition
            },
            images: uploadedImageUrls,
            mainImage
        });

        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (err) {
        console.error('Erro ao criar o produto:', err);
        res.status(500).json({ message: 'Erro ao criar o produto' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('announcer');

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        if(product.sold) {
            await product.populate('buyer');
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
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        });

        await User.updateMany(
            { favourites: { $in: [req.params.id] } },
            { $pull: { favourites: { $in: [req.params.id] } } }
        )        

        // const favourited = await Favourited.find({ productId: product });
        // if(favourited.length > 0) Favourited.deleteMany({ productId: product })
            
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Produto e imagens deletados com sucesso' });
    } catch (err) {
        console.log(err)
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
            for (const imgPath of parsedData.imagesToRemove) {
                const publicId = imgPath.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`upload/${publicId}`);

                updatedImages = updatedImages.filter((img) => img !== imgPath);
            }
        }

        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'produtos',
            });
            updatedImages.push(result.secure_url);

            fs.unlinkSync(file.path);
        }

        const mainImageIndex = parsedData.mainImageIndex ?? 0;
        const mainImage = updatedImages[mainImageIndex] || updatedImages[0];

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                ...parsedData,
                images: updatedImages,
                mainImage,
            },
            { new: true }
        );

        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ error: 'Erro interno ao atualizar produto' });
    }
});

router.put("/2/:id", async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        console.error("Erro ao atualizar produto:", err);
        res.status(500).json({ error: "Erro interno no produto" });
    }
});

module.exports = router;