const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model

// Get all users
router.get('/', async (req, res) => {
    try {
        const userList = await User.find();

        if (!userList || userList.length === 0) {
            console.error('No users found');
            return res.status(404).json({ success: false, message: 'No users found' });
        }

        res.status(200).json({ success: true, users: userList });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            console.error('User not found');
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ success: false, message: 'Error fetching user' });
    }
});

// Create a new user (Sign Up)
router.post('/signup', async (req, res) => {
    const { name, email, phone, password, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            isAdmin,
        });

        const savedUser = await newUser.save();
        res.status(201).json({ success: true, user: savedUser });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ success: false, message: 'Error signing up user' });
    }
});

// User login (Sign In)
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
            expiresIn: '1h',
        });

        res.status(200).json({ success: true, user, token });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ success: false, message: 'Error signing in user' });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                phone,
                ...(hashedPassword && { password: hashedPassword }),
            },
            { new: true }
        );

        if (!updatedUser) {
            console.error('User not found for update');
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Error updating user' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            console.error('User not found for deletion');
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
});

// Get total user count
router.get('/get/count', async (req, res) => {
    try {
        const userCount = await User.countDocuments();

        res.status(200).json({ success: true, count: userCount });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ success: false, message: 'Error fetching user count' });
    }
});

module.exports = router;