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
router.get('/posts/search', async (req, res) => {
  const searchTerm = req.query.title;
  try {
    const posts = await Post.find({ title: { $regex: searchTerm, $options: 'i' } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
