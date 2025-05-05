const express = require('express');
const router = express.Router();
const ProductReviews = require('../models/productReviews'); // Import the ProductReviews model

// Get all product reviews or reviews for a specific product
router.get('/', async (req, res) => {
    try {
        let reviews = [];

        if (req.query.productId) {
            reviews = await ProductReviews.find({ productId: req.query.productId });
        } else {
            reviews = await ProductReviews.find();
        }

        if (!reviews || reviews.length === 0) {
            console.error('No reviews found');
            return res.status(404).json({ success: false, message: 'No reviews found' });
        }

        res.status(200).json({ success: true, reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ success: false, message: 'Error fetching reviews' });
    }
});

// Get the total count of product reviews
router.get('/get/count', async (req, res) => {
    try {
        const reviewCount = await ProductReviews.countDocuments();

        res.status(200).json({ success: true, count: reviewCount });
    } catch (error) {
        console.error('Error fetching review count:', error);
        res.status(500).json({ success: false, message: 'Error fetching review count' });
    }
});

// Get a single product review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await ProductReviews.findById(req.params.id);

        if (!review) {
            console.error('Review not found');
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.status(200).json({ success: true, review });
    } catch (error) {
        console.error('Error fetching review by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching review' });
    }
});

// Add a new product review
router.post('/add', async (req, res) => {
    try {
        const review = new ProductReviews({
            customerId: req.body.customerId,
            customerName: req.body.customerName,
            review: req.body.review,
            customerRating: req.body.customerRating,
            productId: req.body.productId,
        });

        const savedReview = await review.save();
        res.status(201).json({ success: true, review: savedReview });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ success: false, message: 'Error adding review' });
    }
});

// Update a product review by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedReview = await ProductReviews.findByIdAndUpdate(
            req.params.id,
            {
                customerId: req.body.customerId,
                customerName: req.body.customerName,
                review: req.body.review,
                customerRating: req.body.customerRating,
                productId: req.body.productId,
            },
            { new: true } // Return the updated document
        );

        if (!updatedReview) {
            console.error('Review not found for update');
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.status(200).json({ success: true, review: updatedReview });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ success: false, message: 'Error updating review' });
    }
});

// Delete a product review by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedReview = await ProductReviews.findByIdAndDelete(req.params.id);

        if (!deletedReview) {
            console.error('Review not found for deletion');
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ success: false, message: 'Error deleting review' });
    }
});

module.exports = router;