const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { HomeBottomBanner } = require('../models/homeBottomBanner');
const { ImageUpload } = require('../models/imageUpload');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

let imagesArr = [];

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Upload images
router.post('/upload', upload.array('images'), async (req, res) => {
    imagesArr = [];
    try {
        for (const file of req.files) {
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: false,
            };

            const result = await cloudinary.uploader.upload(file.path, options);
            imagesArr.push(result.secure_url);
            fs.unlinkSync(file.path);
        }

        const imagesUploaded = new ImageUpload({ images: imagesArr });
        await imagesUploaded.save();

        return res.status(200).json(imagesArr);
    } catch (error) {
        console.error('Error uploading images:', error);
        return res.status(500).json({ success: false, message: 'Image upload failed' });
    }
});

// Get all banners
router.get('/', async (req, res) => {
    try {
        const bannerList = await HomeBottomBanner.find();
        if (!bannerList) {
            return res.status(404).json({ success: false, message: 'No banners found' });
        }
        return res.status(200).json(bannerList);
    } catch (error) {
        console.error('Error fetching banners:', error);
        return res.status(500).json({ success: false, message: 'Error fetching banners' });
    }
});

// Get a banner by ID
router.get('/:id', async (req, res) => {
    try {
        const banner = await HomeBottomBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }
        return res.status(200).json(banner);
    } catch (error) {
        console.error('Error fetching banner:', error);
        return res.status(500).json({ success: false, message: 'Error fetching banner' });
    }
});

// Create a new banner
router.post('/create', async (req, res) => {
    try {
        const newBanner = new HomeBottomBanner({
            images: imagesArr,
            catId: req.body.catId,
            catName: req.body.catName,
            subCatId: req.body.subCatId,
            subCatName: req.body.subCatName,
        });

        const savedBanner = await newBanner.save();
        imagesArr = [];
        return res.status(201).json(savedBanner);
    } catch (error) {
        console.error('Error creating banner:', error);
        return res.status(500).json({ success: false, message: 'Error creating banner' });
    }
});

// Delete an image
router.delete('/deleteImage', async (req, res) => {
    try {
        const imgUrl = req.query.img;
        const imageName = imgUrl.split('/').pop().split('.')[0];

        const response = await cloudinary.uploader.destroy(imageName);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error deleting image:', error);
        return res.status(500).json({ success: false, message: 'Error deleting image' });
    }
});

// Delete a banner by ID
router.delete('/:id', async (req, res) => {
    try {
        const banner = await HomeBottomBanner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ success: false, message: 'Banner not found' });
        }

        for (const img of banner.images) {
            const imageName = img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imageName);
        }

        await HomeBottomBanner.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        return res.status(500).json({ success: false, message: 'Error deleting banner' });
    }
});

// Update a banner by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBanner = await HomeBottomBanner.findByIdAndUpdate(
            req.params.id,
            {
                images: req.body.images,
                catId: req.body.catId,
                catName: req.body.catName,
                subCatId: req.body.subCatId,
                subCatName: req.body.subCatName,
            },
            { new: true }
        );

        if (!updatedBanner) {
            return res.status(500).json({ success: false, message: 'Error updating banner' });
        }

        imagesArr = [];
        return res.status(200).json(updatedBanner);
    } catch (error) {
        console.error('Error updating banner:', error);
        return res.status(500).json({ success: false, message: 'Error updating banner' });
    }
});

module.exports = router;