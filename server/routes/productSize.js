const express = require('express');
const router = express.Router();
const ProductSize = require('../models/productSize'); // Import the ProductSize model

// Get all product sizes
router.get('/', async (req, res) => {
    try {
        const productSizeList = await ProductSize.find(req.query);

        if (!productSizeList || productSizeList.length === 0) {
            console.error('No product sizes found');
            return res.status(404).json({ success: false, message: 'No product sizes found' });
        }

        res.status(200).json({ success: true, productSizeList });
    } catch (error) {
        console.error('Error fetching product sizes:', error);
        res.status(500).json({ success: false, message: 'Error fetching product sizes' });
    }
});

// Get a single product size by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await ProductSize.findById(req.params.id);

        if (!item) {
            console.error('Product size not found');
            return res.status(404).json({ success: false, message: 'Product size not found' });
        }

        res.status(200).json({ success: true, item });
    } catch (error) {
        console.error('Error fetching product size by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching product size' });
    }
});

// Create a new product size
router.post('/create', async (req, res) => {
    try {
        const productSize = new ProductSize({
            size: req.body.size,
        });

        const savedProductSize = await productSize.save();
        res.status(201).json({ success: true, productSize: savedProductSize });
    } catch (error) {
        console.error('Error creating product size:', error);
        res.status(500).json({ success: false, message: 'Error creating product size' });
    }
});

// Update a product size by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await ProductSize.findByIdAndUpdate(
            req.params.id,
            {
                size: req.body.size,
            },
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            console.error('Product size not found for update');
            return res.status(404).json({ success: false, message: 'Product size not found' });
        }

        res.status(200).json({ success: true, productSize: updatedItem });
    } catch (error) {
        console.error('Error updating product size:', error);
        res.status(500).json({ success: false, message: 'Error updating product size' });
    }
});

// Delete a product size by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await ProductSize.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            console.error('Product size not found for deletion');
            return res.status(404).json({ success: false, message: 'Product size not found' });
        }

        res.status(200).json({ success: true, message: 'Product size deleted successfully' });
    } catch (error) {
        console.error('Error deleting product size:', error);
        res.status(500).json({ success: false, message: 'Error deleting product size' });
    }
});

module.exports = router;