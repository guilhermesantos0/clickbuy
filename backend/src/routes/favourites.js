const express = require('express');
const router = express.Router();
const Favourited = require('../models/Favourited');
const User = require('../models/User');
const { Product } = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const favourites = await Favourited.find();

        const enrichedFavourites = await Promise.all(
            favourites.map(async (fav) => {
                const user = await User.findOne({ _id: fav.userId });
                const product = await Product.findOne({ _id: fav.productId });

                return {
                    _id: fav._id,
                    user: user,
                    product: product
                };
            })
        );

        res.json(enrichedFavourites);
    } catch (err) {
        console.error('Erro ao buscar favoritos:', err);
        res.status(500).json({ error: 'Erro ao carregar favoritos' });
    }
});

router.get('/teste', async(req, res) => {
    const fav = await Favourited.find();
    res.json(fav)
})

router.get('/:type/:id', async (req, res) => {
    const { type, id } = req.params

    if(type && id) {
        if(type === "user") {
            const favourites = []
            const rawFavourites = await Favourited.find({ userId: id });
            rawFavourites.forEach(fav => favourites.push(fav.productId))


            res.status(200).json(favourites)
        } else if(type == "product") {
            const favourited = await Favourited.find({ productId: id })

            res.status(200).json(favourited)
        } else if(type === "products"){
            const favourites = await Favourited.find({ userId: id });
            const favouriteProducts = await Promise.all(
                favourites.map(async (fav) => {
                    console.log(fav)
                    const product = await Product.findOne({ _id: fav.productId })
        
                    return product
                })
            )

            res.status(200).json(favouriteProducts)
        }
    } else {
        res.status(500).json({ message: 'Preencha todos os campos' })
    }
})

router.post('/', async (req, res) => {
    console.log('aaaaaa')
    try {

        console.log('bbbbb')

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
        const { userId, productId } = req.body;

        await Favourited.findOneAndDelete({ userId, productId });
        res.status(200)
    } catch (err) {
        res.status(500).json({ message: 'Ocorreu um erro', err })
    }
})

module.exports = router;