const express = require('express');
const Post = require('../models/post'); 
const router = express.Router();

// Route to create a new post
router.post('/posts', async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: 'Error creating post', error: err.message });
  }
});

module.exports = router;
