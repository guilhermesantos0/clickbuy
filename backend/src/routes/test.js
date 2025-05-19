const express = require('express');
const router = express.Router();
const Product = require("../models/Product");

const upload = require('../middleware/cloudUpload');
const cloudinary = require('../config/cloudinary');

// router.post('/', (req, res) => {
    // console.log(req)
    // // console.log("AAAAAAAAAAAAAAAAAAAAA")

    
    // const _p = Product.findById('cc4bbff9-cf6a-4dd9-9dd4-291dec4b40f6')


    // const updateObject = {};
    // updateObject.category = "Eletrônicos"

    // const product = Product.findByIdAndUpdate('cc4bbff9-cf6a-4dd9-9dd4-291dec4b40f6', updateObject, { new: true });
    // res.json(_p)

    // res.status(200).json({ message: "OK", product})
    // // const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    // // res.status(200).json({ message: 'Upload bem-sucedido!', files: filePaths });
// });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'testes' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            ).end(req.file.buffer);
        });

        res.json({ url: result.secure_url });
    } catch (err) {
        console.error('Erro ao enviar para Cloudinary:', err);
        res.status(500).json({ error: 'Falha no upload' });
    }
});


module.exports = router;