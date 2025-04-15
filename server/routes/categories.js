const Category = require('../models/categories'); // Correct import
const express = require('express');
const router = express.Router();

const async = require('async'); // Replace p-limit with async
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();

        if (!categories) {
            console.error('No categories found');
            return res.status(500).json({ success: false, message: 'No categories found' });
        }

        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Error fetching categories' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const categoryId = await Category.findById(req.params.id);
        if (!categoryId) {
            console.error('Category not found');
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Send the found category as a response
        res.status(200).json({ success: true, category: categoryId });
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching category' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            console.error('Category not found for deletion');
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, message: 'Error deleting category' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                images: req.body.images, // Use req.body.images directly
                description: req.body.description,
                color: req.body.color,
            },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            console.error('Category not found for update');
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ success: false, message: 'Error updating category' });
    }
});

router.post('/create', async (req, res) => {
    const imagesToUpload = req.body.images;

    async.mapLimit(
        imagesToUpload,
        2, // Limit concurrency to 2
        async (image) => {
            const uploadResult = await cloudinary.uploader.upload(image);
            return uploadResult.secure_url;
        },
        async (err, imageUrls) => {
            if (err) {
                console.error('Error uploading images:', err);
                return res.status(500).json({ message: 'Error uploading images', success: false });
            }

            try {
                let category = new Category({
                    name: req.body.name,
                    images: imageUrls,
                    description: req.body.description,
                    color: req.body.color,
                });

                category = await category.save();
                console.log('Category saved successfully:', category); // Log the saved category
                res.status(201).json({ success: true, category });
            } catch (error) {
                console.error('Error saving category:', error);
                res.status(500).json({ message: 'Error saving category', success: false });
            }
        }
    );
});

module.exports = router;