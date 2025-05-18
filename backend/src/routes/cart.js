const express = require('express');
const router = new express.Router();
const Cart = require('../models/Cart');

router.get('/:id', async (req, res) => {
    const userCart = await Cart.findById(req.params.id);
    res.status(200).json(userCart)
})

router.post('/:id', async (req, res) => {
    const { productId } = req.body;

    const userCartExsits = await Cart.exists({ _id: req.params.id });
    
    if(userCartExsits) {
        const userCart = await Cart.findById(req.params.id);
        const newCart = await Cart.findByIdAndUpdate(req.params.id, { _id: req.params.id, cart: [...userCart.cart, productId] })
        
        res.status(200).json(newCart)
    } else {
        const newCart = new Cart({ _id: req.params.id, cart: [productId] });
        await newCart.save();

        res.status(200).json(newCart)
    }
})

router.delete('/:id', async(req, res) => {
    await Cart.findByIdAndDelete(req.params.id)
})

module.exports = router;