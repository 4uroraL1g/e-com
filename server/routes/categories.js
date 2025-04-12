const Category = require('../models/categories'); // Correct import
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await Category.find();

    if (!categories) {
        return res.status(500).json({ success: false });
    }
    res.send(categories);
});

router.post('/create', async (req, res) => {
    const limit = pLimit(2); // Limit concurrency to 2

    const imagesToUpload = req.body.images.map((image) => {
        return limit( async () => {
            const imageUrl = await cloudinary.uploader.upload(image);
            return imageUrl;
        }); // Use the limit function to control concurrency
    });

    const uploadStatus = await Promise.all(imagesToUpload);

        const imageUrls = uploadStatus.map((item) => 
           { return image.secure_url});

        if (!uploadStatus) {
            return res.status(500).json({ 
                message: 'Error uploading images',
                success: false
            });
        }

        let category = new Category({
            name: req.body.name,
            images: imageUrls,
            description: req.body.description,
            color: req.body.color,
        });

        if (!category) {
            return res.status(500).json({ success: false });
        }

        category = await category.save();
        res.status(201).json({ success: true, category });
    });
module.exports = router;