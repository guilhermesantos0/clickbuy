const express = require('express');
const router = express.Router();
const Product = require("../models/Product");

router.post('/', (req, res) => {
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
});

module.exports = router;