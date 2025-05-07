const express = require('express');
const router = express.Router();
const Product = require('../models/products'); // Import the Product model
const Category = require('../models/category'); // Import the Category model (for reference population)

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category'); // Populate category details

        if (!products || products.length === 0) {
            console.error('No products found');
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Error fetching products' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('category'); // Populate category details

        if (!product) {
            console.error('Product not found');
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching product' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const product = new Product({
            item_id: req.body.item_id,
            name: req.body.name,
            category: req.body.category, // Should be a valid category ID
            price: req.body.price,
            old_price: req.body.old_price,
            sellable_online: req.body.sellable_online,
            link: req.body.link,
            other_colors: req.body.other_colors,
            short_description: req.body.short_description,
            designer: req.body.designer,
            dimensions: req.body.dimensions,
        });

        const savedProduct = await product.save();
        console.log('Product saved successfully:', savedProduct);
        res.status(201).json({ success: true, product: savedProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: 'Error creating product' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                item_id: req.body.item_id,
                name: req.body.name,
                category: req.body.category, // Should be a valid category ID
                price: req.body.price,
                old_price: req.body.old_price,
                sellable_online: req.body.sellable_online,
                link: req.body.link,
                other_colors: req.body.other_colors,
                short_description: req.body.short_description,
                designer: req.body.designer,
                dimensions: req.body.dimensions,
            },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            console.error('Product not found for update');
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Error updating product' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            console.error('Product not found for deletion');
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Error deleting product' });
    }
});

module.exports = router;