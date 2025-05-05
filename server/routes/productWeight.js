const express = require('express');
const router = express.Router();
const ProductWeight = require('../models/productWeight'); // Import the ProductWeight model

// Get all product weights
router.get('/', async (req, res) => {
    try {
        const productWeightList = await ProductWeight.find(req.query);

        if (!productWeightList || productWeightList.length === 0) {
            console.error('No product weights found');
            return res.status(404).json({ success: false, message: 'No product weights found' });
        }

        res.status(200).json({ success: true, productWeightList });
    } catch (error) {
        console.error('Error fetching product weights:', error);
        res.status(500).json({ success: false, message: 'Error fetching product weights' });
    }
});

// Get a single product weight by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await ProductWeight.findById(req.params.id);

        if (!item) {
            console.error('Product weight not found');
            return res.status(404).json({ success: false, message: 'Product weight not found' });
        }

        res.status(200).json({ success: true, item });
    } catch (error) {
        console.error('Error fetching product weight by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching product weight' });
    }
});

// Create a new product weight
router.post('/create', async (req, res) => {
    try {
        const productWeight = new ProductWeight({
            productWeight: req.body.productWeight,
        });

        const savedProductWeight = await productWeight.save();
        res.status(201).json({ success: true, productWeight: savedProductWeight });
    } catch (error) {
        console.error('Error creating product weight:', error);
        res.status(500).json({ success: false, message: 'Error creating product weight' });
    }
});

// Update a product weight by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await ProductWeight.findByIdAndUpdate(
            req.params.id,
            {
                productWeight: req.body.productWeight,
            },
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            console.error('Product weight not found for update');
            return res.status(404).json({ success: false, message: 'Product weight not found' });
        }

        res.status(200).json({ success: true, productWeight: updatedItem });
    } catch (error) {
        console.error('Error updating product weight:', error);
        res.status(500).json({ success: false, message: 'Error updating product weight' });
    }
});

// Delete a product weight by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await ProductWeight.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            console.error('Product weight not found for deletion');
            return res.status(404).json({ success: false, message: 'Product weight not found' });
        }

        res.status(200).json({ success: true, message: 'Product weight deleted successfully' });
    } catch (error) {
        console.error('Error deleting product weight:', error);
        res.status(500).json({ success: false, message: 'Error deleting product weight' });
    }
});

module.exports = router;