const express = require('express');
const router = express.Router();
const Favourited = require('../models/Favourited');

router.get('/', async(req, res) => {
    const favourites = await Favourited.find();
    res.status(200).json(favourites)
})

router.get('/:type/:id', async (req, res) => {
    const { type, id } = req.params

    if(type && id) {
        if(type === "user") {
            const favourites = await Favourited.find({ userId: id });

            res.status(200).json(favourites)
        } else if(type == "product") {
            const favourited = await Favourited.find({ productId: id })

            res.status(200).json(favourited)
        }
    } else {
        res.status(500).json({ message: 'Preencha todos os campos' })
    }
})

router.post('/', async (req, res) => {
    try {
        const { userId, productId } = req.body

        const newFavourite = new Favourited({ userId, productId });
        await newFavourite.save();

        res.status(200).json(newFavourite)
    } catch (err) {
        res.status(500).json({ message: 'Ocorreu um erro', err })
    }
})

router.delete('/', async(req, res) => {
    try {
        const { userId, productId } = req.body.data;

        await Favourited.findOneAndDelete({ userId, productId });
        res.status(200)
    } catch (err) {
        res.status(500).json({ message: 'Ocorreu um erro', err })
    }
})

module.exports = router;