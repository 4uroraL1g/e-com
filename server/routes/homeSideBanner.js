const express = require('express');
const router = express.Router();
const HomeSideBanners = require('../models/homeSideBanner'); // Import the HomeSideBanners model
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Get all home side banners
router.get('/', async (req, res) => {
    try {
        const banners = await HomeSideBanners.find();

        if (!banners || banners.length === 0) {
            console.error('No home side banners found');
            return res.status(404).json({ success: false, message: 'No home side banners found' });
        }

        res.status(200).json({ success: true, banners });
    } catch (error) {
        console.error('Error fetching home side banners:', error);
        res.status(500).json({ success: false, message: 'Error fetching home side banners' });
    }
});

// Get a single home side banner by ID
router.get('/:id', async (req, res) => {
    try {
        const banner = await HomeSideBanners.findById(req.params.id);

        if (!banner) {
            console.error('Home side banner not found');
            return res.status(404).json({ success: false, message: 'Home side banner not found' });
        }

        res.status(200).json({ success: true, banner });
    } catch (error) {
        console.error('Error fetching home side banner by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching home side banner' });
    }
});

// Create a new home side banner
router.post('/create', async (req, res) => {
    try {
        const banner = new HomeSideBanners({
            images: req.body.images,
            catId: req.body.catId,
            catName: req.body.catName,
            subCatId: req.body.subCatId,
            subCatName: req.body.subCatName,
        });

        const savedBanner = await banner.save();
        console.log('Home side banner saved successfully:', savedBanner);
        res.status(201).json({ success: true, banner: savedBanner });
    } catch (error) {
        console.error('Error creating home side banner:', error);
        res.status(500).json({ success: false, message: 'Error creating home side banner' });
    }
});

// Update a home side banner by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBanner = await HomeSideBanners.findByIdAndUpdate(
            req.params.id,
            {
                images: req.body.images,
                catId: req.body.catId,
                catName: req.body.catName,
                subCatId: req.body.subCatId,
                subCatName: req.body.subCatName,
            },
            { new: true } // Return the updated document
        );

        if (!updatedBanner) {
            console.error('Home side banner not found for update');
            return res.status(404).json({ success: false, message: 'Home side banner not found' });
        }

        res.status(200).json({ success: true, banner: updatedBanner });
    } catch (error) {
        console.error('Error updating home side banner:', error);
        res.status(500).json({ success: false, message: 'Error updating home side banner' });
    }
});

// Delete a home side banner by ID
router.delete('/:id', async (req, res) => {
    try {
        const banner = await HomeSideBanners.findById(req.params.id);

        if (!banner) {
            console.error('Home side banner not found for deletion');
            return res.status(404).json({ success: false, message: 'Home side banner not found' });
        }

        // Delete images from Cloudinary
        for (const img of banner.images) {
            const urlArr = img.split('/');
            const image = urlArr[urlArr.length - 1];
            const imageName = image.split('.')[0];

            await cloudinary.uploader.destroy(imageName);
        }

        const deletedBanner = await HomeSideBanners.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Home side banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting home side banner:', error);
        res.status(500).json({ success: false, message: 'Error deleting home side banner' });
    }
});

// Delete a specific image from Cloudinary
router.delete('/deleteImage', async (req, res) => {
    try {
        const imgUrl = req.query.img;
        const urlArr = imgUrl.split('/');
        const image = urlArr[urlArr.length - 1];
        const imageName = image.split('.')[0];

        const response = await cloudinary.uploader.destroy(imageName);

        if (!response) {
            console.error('Error deleting image from Cloudinary');
            return res.status(500).json({ success: false, message: 'Error deleting image' });
        }

        res.status(200).json({ success: true, message: 'Image deleted successfully', response });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ success: false, message: 'Error deleting image' });
    }
});

module.exports = router;