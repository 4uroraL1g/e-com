const express = require('express');
const router = express.Router();
const HomeBanner = require('../models/homeBanner'); // Import the HomeBanner model
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Get all home banners
router.get('/', async (req, res) => {
    try {
        const banners = await HomeBanner.find();

        if (!banners || banners.length === 0) {
            console.error('No home banners found');
            return res.status(404).json({ success: false, message: 'No home banners found' });
        }

        res.status(200).json({ success: true, banners });
    } catch (error) {
        console.error('Error fetching home banners:', error);
        res.status(500).json({ success: false, message: 'Error fetching home banners' });
    }
});

// Get a single home banner by ID
router.get('/:id', async (req, res) => {
    try {
        const banner = await HomeBanner.findById(req.params.id);

        if (!banner) {
            console.error('Home banner not found');
            return res.status(404).json({ success: false, message: 'Home banner not found' });
        }

        res.status(200).json({ success: true, banner });
    } catch (error) {
        console.error('Error fetching home banner by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching home banner' });
    }
});

// Create a new home banner
router.post('/create', async (req, res) => {
    try {
        const banner = new HomeBanner({
            images: req.body.images,
        });

        const savedBanner = await banner.save();
        console.log('Home banner saved successfully:', savedBanner);
        res.status(201).json({ success: true, banner: savedBanner });
    } catch (error) {
        console.error('Error creating home banner:', error);
        res.status(500).json({ success: false, message: 'Error creating home banner' });
    }
});

// Update a home banner by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBanner = await HomeBanner.findByIdAndUpdate(
            req.params.id,
            {
                images: req.body.images,
            },
            { new: true } // Return the updated document
        );

        if (!updatedBanner) {
            console.error('Home banner not found for update');
            return res.status(404).json({ success: false, message: 'Home banner not found' });
        }

        res.status(200).json({ success: true, banner: updatedBanner });
    } catch (error) {
        console.error('Error updating home banner:', error);
        res.status(500).json({ success: false, message: 'Error updating home banner' });
    }
});

// Delete a home banner by ID
router.delete('/:id', async (req, res) => {
    try {
        const banner = await HomeBanner.findById(req.params.id);

        if (!banner) {
            console.error('Home banner not found for deletion');
            return res.status(404).json({ success: false, message: 'Home banner not found' });
        }

        // Delete images from Cloudinary
        for (const img of banner.images) {
            const urlArr = img.split('/');
            const image = urlArr[urlArr.length - 1];
            const imageName = image.split('.')[0];

            await cloudinary.uploader.destroy(imageName);
        }

        const deletedBanner = await HomeBanner.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Home banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting home banner:', error);
        res.status(500).json({ success: false, message: 'Error deleting home banner' });
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