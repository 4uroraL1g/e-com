const express = require('express');
const router = express.Router();
const Banner = require('../models/banners'); // Import the Banner model
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Get all banners
router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();

        if (!banners || banners.length === 0) {
            console.error('No banners found');
            return res.status(404).json({ success: false, message: 'No banners found' });
        }

        res.status(200).json({ success: true, banners });
    } catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ success: false, message: 'Error fetching banners' });
    }
});

// Get a single banner by ID
router.get('/:id', async (req, res) => {
    try {
        const bannerId = req.params.id;
        const banner = await Banner.findById(bannerId);

        if (!banner) {
            console.error('Banner not found');
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }

        res.status(200).json({ success: true, banner });
    } catch (error) {
        console.error('Error fetching banner by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching banner' });
    }
});

// Create a new banner
router.post('/create', async (req, res) => {
    try {
        const banner = new Banner({
            images: req.body.images,
            catId: req.body.catId,
            catName: req.body.catName,
            subCatId: req.body.subCatId,
            subCatName: req.body.subCatName,
        });

        const savedBanner = await banner.save();
        console.log('Banner saved successfully:', savedBanner);
        res.status(201).json({ success: true, banner: savedBanner });
    } catch (error) {
        console.error('Error creating banner:', error);
        res.status(500).json({ success: false, message: 'Error creating banner' });
    }
});

// Update a banner by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(
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
            console.error('Banner not found for update');
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }

        res.status(200).json({ success: true, message: 'Banner updated successfully', banner: updatedBanner });
    } catch (error) {
        console.error('Error updating banner:', error);
        res.status(500).json({ success: false, message: 'Error updating banner' });
    }
});

// Delete a banner by ID
router.delete('/:id', async (req, res) => {
    try {
        const bannerId = req.params.id;
        const deletedBanner = await Banner.findByIdAndDelete(bannerId);

        if (!deletedBanner) {
            console.error('Banner not found for deletion');
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }

        res.status(200).json({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(500).json({ success: false, message: 'Error deleting banner' });
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