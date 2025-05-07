const express = require('express');
const router = express.Router();
const MyList = require('../models/myList'); // Import the MyList model

// Get all items in My List
router.get('/', async (req, res) => {
    try {
        const myList = await MyList.find(req.query);

        if (!myList || myList.length === 0) {
            console.error('No items found in My List');
            return res.status(404).json({ success: false, message: 'No items found in My List' });
        }

        res.status(200).json({ success: true, myList });
    } catch (error) {
        console.error('Error fetching My List items:', error);
        res.status(500).json({ success: false, message: 'Error fetching My List items' });
    }
});

// Get a single item in My List by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await MyList.findById(req.params.id);

        if (!item) {
            console.error('Item not found in My List');
            return res.status(404).json({ success: false, message: 'Item not found in My List' });
        }

        res.status(200).json({ success: true, item });
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching item by ID' });
    }
});

// Add a new item to My List
router.post('/add', async (req, res) => {
    try {
        const existingItem = await MyList.findOne({ productId: req.body.productId, userId: req.body.userId });

        if (existingItem) {
            return res.status(400).json({ success: false, message: 'Product already added to My List' });
        }

        const listItem = new MyList({
            productTitle: req.body.productTitle,
            image: req.body.image,
            rating: req.body.rating,
            price: req.body.price,
            productId: req.body.productId,
            userId: req.body.userId,
        });

        const savedItem = await listItem.save();
        res.status(201).json({ success: true, item: savedItem });
    } catch (error) {
        console.error('Error adding item to My List:', error);
        res.status(500).json({ success: false, message: 'Error adding item to My List' });
    }
});

// Update an item in My List by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await MyList.findByIdAndUpdate(
            req.params.id,
            {
                productTitle: req.body.productTitle,
                image: req.body.image,
                rating: req.body.rating,
                price: req.body.price,
                productId: req.body.productId,
                userId: req.body.userId,
            },
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            console.error('Item not found for update');
            return res.status(404).json({ success: false, message: 'Item not found in My List' });
        }

        res.status(200).json({ success: true, item: updatedItem });
    } catch (error) {
        console.error('Error updating item in My List:', error);
        res.status(500).json({ success: false, message: 'Error updating item in My List' });
    }
});

// Delete an item from My List by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await MyList.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            console.error('Item not found for deletion');
            return res.status(404).json({ success: false, message: 'Item not found in My List' });
        }

        res.status(200).json({ success: true, message: 'Item deleted successfully from My List' });
    } catch (error) {
        console.error('Error deleting item from My List:', error);
        res.status(500).json({ success: false, message: 'Error deleting item from My List' });
    }
});

module.exports = router;