const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); 
const router = express.Router();
const app = express();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token:', token); // Debugging: Log the token
    
    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log('Decoded:', decoded); // Debugging: Log the decoded token
        req.userId = decoded.userId; // Adding userId to the request object for further use
        next();
    } catch (error) {
        console.error('JWT Error:', error); // Debugging: Log the error
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Endpoint for user registration
router.post('/register', async (req, res) => {
    const { username, email, password, age } = req.body;

    // Field validation
    if (!username || !email || !password || !age) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            age,
        });

        await newUser.save(); // Save new user to the database
        res.status(201).json(newUser); // Send newly created user in response
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle server errors
    }
});

// Endpoint for user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token); // Debugging: Log the generated token
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to get information about the current user
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // Find user by userId from JWT token
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user); // Send user information in response
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle server errors
    }
});

// Endpoint for user logout
router.post('/logout', authMiddleware, async (req, res) => {
    // In this example, simply return a success message as the token is not stored on the server
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
