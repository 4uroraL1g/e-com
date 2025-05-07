const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Import the Cart model

// Get all cart items
router.get('/', async (req, res) => {
    try {
        const cartList = await Cart.find(req.query);

        if (!cartList || cartList.length === 0) {
            console.error('No cart items found');
            return res.status(404).json({ success: false, message: 'No cart items found' });
        }

        res.status(200).json({ success: true, cartList });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ success: false, message: 'Error fetching cart items' });
    }
});

// Get a single cart item by ID
router.get('/:id', async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);

        if (!cartItem) {
            console.error('Cart item not found');
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        res.status(200).json({ success: true, cartItem });
    } catch (error) {
        console.error('Error fetching cart item by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching cart item' });
    }
});

// Add a new cart item
router.post('/add', async (req, res) => {
    try {
        const existingCartItem = await Cart.findOne({ productId: req.body.productId, userId: req.body.userId });

        if (existingCartItem) {
            return res.status(400).json({ success: false, message: 'Product already added to the cart' });
        }

        const cartItem = new Cart({
            productTitle: req.body.productTitle,
            image: req.body.image,
            rating: req.body.rating,
            price: req.body.price,
            quantity: req.body.quantity,
            subTotal: req.body.subTotal,
            productId: req.body.productId,
            userId: req.body.userId,
            countInStock: req.body.countInStock,
        });

        const savedCartItem = await cartItem.save();
        res.status(201).json({ success: true, cartItem: savedCartItem });
    } catch (error) {
        console.error('Error adding cart item:', error);
        res.status(500).json({ success: false, message: 'Error adding cart item' });
    }
});

// Update a cart item by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                productTitle: req.body.productTitle,
                image: req.body.image,
                rating: req.body.rating,
                price: req.body.price,
                quantity: req.body.quantity,
                subTotal: req.body.subTotal,
                productId: req.body.productId,
                userId: req.body.userId,
            },
            { new: true } // Return the updated document
        );

        if (!updatedCartItem) {
            console.error('Cart item not found for update');
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        res.status(200).json({ success: true, cartItem: updatedCartItem });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ success: false, message: 'Error updating cart item' });
    }
});

// Delete a cart item by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);

        if (!deletedCartItem) {
            console.error('Cart item not found for deletion');
            return res.status(404).json({ success: false, message: 'Cart item not found' });
        }

        res.status(200).json({ success: true, message: 'Cart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        res.status(500).json({ success: false, message: 'Error deleting cart item' });
    }
});

module.exports = router;