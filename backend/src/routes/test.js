const express = require('express');
const router = express.Router();
const upload = require("../middleware/upload");

router.post('/', upload.array('images', 10), (req, res) => {
    console.log(req)
    console.log("AAAAAAAAAAAAAAAAAAAAA")

    const filePaths = req.files.map(file => `/uploads/${file.filename}`);
    res.status(200).json({ message: 'Upload bem-sucedido!', files: filePaths });
});

module.exports = router;