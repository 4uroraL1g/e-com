const express = require('express');
const router = express.Router();
const SubCategory = require('../models/subCat'); // Import the SubCategory model

// Get all subcategories with pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const totalPosts = await SubCategory.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return res.status(404).json({ success: false, message: 'No data found!' });
        }

        const subCategoryList = await SubCategory.find()
            .populate('category') // Populate category details
            .skip((page - 1) * perPage)
            .limit(perPage);

        if (!subCategoryList || subCategoryList.length === 0) {
            console.error('No subcategories found');
            return res.status(404).json({ success: false, message: 'No subcategories found' });
        }

        res.status(200).json({
            success: true,
            subCategoryList,
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ success: false, message: 'Error fetching subcategories' });
    }
});

// Get the total count of subcategories
router.get('/get/count', async (req, res) => {
    try {
        const subCatCount = await SubCategory.countDocuments();
        res.status(200).json({ success: true, count: subCatCount });
    } catch (error) {
        console.error('Error fetching subcategory count:', error);
        res.status(500).json({ success: false, message: 'Error fetching subcategory count' });
    }
});

// Get a single subcategory by ID
router.get('/:id', async (req, res) => {
    try {
        const subCat = await SubCategory.findById(req.params.id).populate('category');

        if (!subCat) {
            console.error('Subcategory not found');
            return res.status(404).json({ success: false, message: 'Subcategory not found' });
        }

        res.status(200).json({ success: true, subCat });
    } catch (error) {
        console.error('Error fetching subcategory by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching subcategory' });
    }
});

// Create a new subcategory
router.post('/create', async (req, res) => {
    try {
        const subCat = new SubCategory({
            category: req.body.category,
            subCat: req.body.subCat,
        });

        const savedSubCat = await subCat.save();
        res.status(201).json({ success: true, subCat: savedSubCat });
    } catch (error) {
        console.error('Error creating subcategory:', error);
        res.status(500).json({ success: false, message: 'Error creating subcategory' });
    }
});

// Update a subcategory by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedSubCat = await SubCategory.findByIdAndUpdate(
            req.params.id,
            {
                category: req.body.category,
                subCat: req.body.subCat,
            },
            { new: true } // Return the updated document
        );

        if (!updatedSubCat) {
            console.error('Subcategory not found for update');
            return res.status(404).json({ success: false, message: 'Subcategory not found' });
        }

        res.status(200).json({ success: true, subCat: updatedSubCat });
    } catch (error) {
        console.error('Error updating subcategory:', error);
        res.status(500).json({ success: false, message: 'Error updating subcategory' });
    }
});

// Delete a subcategory by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedSubCat = await SubCategory.findByIdAndDelete(req.params.id);

        if (!deletedSubCat) {
            console.error('Subcategory not found for deletion');
            return res.status(404).json({ success: false, message: 'Subcategory not found' });
        }

        res.status(200).json({ success: true, message: 'Subcategory deleted successfully' });
    } catch (error) {
        console.error('Error deleting subcategory:', error);
        res.status(500).json({ success: false, message: 'Error deleting subcategory' });
    }
});

module.exports = router;