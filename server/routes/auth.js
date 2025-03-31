const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
    try {
        const { phone, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({
            phone,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                phone: user.phone,
                email: user.email
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Find user by phone
        const user = await User.findOne({ phone });
        
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                phone: user.phone,
                email: user.email,
                balance: user.balance
            });
        } else {
            res.status(401).json({ message: 'Invalid phone or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 