const express = require('express');
const router = express.Router();
const { ImageUpload } = require('../models/imageUpload.js');

// Get all uploaded images
router.get('/', async (req, res) => {
    try {
        const imageUploadList = await ImageUpload.find();

        if (!imageUploadList) {
            return res.status(500).json({ success: false });
        }

        return res.status(200).json(imageUploadList);
    } catch (error) {
        console.error('Error fetching images:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Delete all uploaded images
router.delete('/deleteAllImages', async (req, res) => {
    try {
        const images = await ImageUpload.find();

        if (images.length === 0) {
            return res.status(404).json({ success: false, message: 'No images found to delete' });
        }

        let deletedImages = [];
        for (const image of images) {
            const deletedImage = await ImageUpload.findByIdAndDelete(image.id);
            deletedImages.push(deletedImage);
        }

        return res.status(200).json({ success: true, deletedImages });
    } catch (error) {
        console.error('Error deleting images:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;

