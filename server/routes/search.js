const express = require('express');
const router = express.Router();
const Product = require('../models/products'); // Import the Product model

// Search for products
router.get('/', async (req, res) => {
    try {
        const query = req.query.q;
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;

        if (!query) {
            console.error('Query parameter is required');
            return res.status(400).json({ success: false, message: 'Query parameter is required' });
        }

        const searchCriteria = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { brand: { $regex: query, $options: 'i' } },
                { catName: { $regex: query, $options: 'i' } },
            ],
        };

        const totalPosts = await Product.countDocuments(searchCriteria);
        const totalPages = Math.ceil(totalPosts / perPage);

        const products = await Product.find(searchCriteria)
            .populate('category') // Populate category details
            .skip((page - 1) * perPage)
            .limit(perPage);

        if (!products || products.length === 0) {
            console.error('No products found for the search query');
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        res.status(200).json({
            success: true,
            products,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;