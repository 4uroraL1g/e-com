const express = require('express');
const router = express.Router();
const ProductRams = require('../models/productRAMS'); // Import the ProductRams model

// Get all product RAMs
router.get('/', async (req, res) => {
    try {
        const productRAMSList = await ProductRams.find(req.query);

        if (!productRAMSList || productRAMSList.length === 0) {
            console.error('No product RAMs found');
            return res.status(404).json({ success: false, message: 'No product RAMs found' });
        }

        res.status(200).json({ success: true, productRAMSList });
    } catch (error) {
        console.error('Error fetching product RAMs:', error);
        res.status(500).json({ success: false, message: 'Error fetching product RAMs' });
    }
});

// Get a single product RAM by ID
router.get('/:id', async (req, res) => {
    try {
        const item = await ProductRams.findById(req.params.id);

        if (!item) {
            console.error('Product RAM not found');
            return res.status(404).json({ success: false, message: 'Product RAM not found' });
        }

        res.status(200).json({ success: true, item });
    } catch (error) {
        console.error('Error fetching product RAM by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching product RAM' });
    }
});

// Create a new product RAM
router.post('/create', async (req, res) => {
    try {
        const productRAMS = new ProductRams({
            productRam: req.body.productRam,
        });

        const savedProductRAMS = await productRAMS.save();
        res.status(201).json({ success: true, productRAMS: savedProductRAMS });
    } catch (error) {
        console.error('Error creating product RAM:', error);
        res.status(500).json({ success: false, message: 'Error creating product RAM' });
    }
});

// Update a product RAM by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await ProductRams.findByIdAndUpdate(
            req.params.id,
            {
                productRam: req.body.productRam,
            },
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            console.error('Product RAM not found for update');
            return res.status(404).json({ success: false, message: 'Product RAM not found' });
        }

        res.status(200).json({ success: true, productRAMS: updatedItem });
    } catch (error) {
        console.error('Error updating product RAM:', error);
        res.status(500).json({ success: false, message: 'Error updating product RAM' });
    }
});

// Delete a product RAM by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await ProductRams.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            console.error('Product RAM not found for deletion');
            return res.status(404).json({ success: false, message: 'Product RAM not found' });
        }

        res.status(200).json({ success: true, message: 'Product RAM deleted successfully' });
    } catch (error) {
        console.error('Error deleting product RAM:', error);
        res.status(500).json({ success: false, message: 'Error deleting product RAM' });
    }
});

module.exports = router;