const express = require('express');
const Comment = require('../models/commit'); 
const router = express.Router();

// Route to create a new comment
router.post('/commits', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: 'Error creating comment', error: err.message });
  }
});

module.exports = router;

