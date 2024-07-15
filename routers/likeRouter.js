const express = require('express');
const Like = require('../models/like');  // Путь к вашему файлу с моделью Like
const router = express.Router();

// Route to add a new like
router.post('/likes', async (req, res) => {
    try {
        const { user_id, post_id } = req.body;

        // Create a new like instance
        const newLike = new Like({
            user_id,
            post_id
        });

        // Save the new like instance to the database
        const savedLike = await newLike.save();

        res.status(201).json(savedLike);
    } catch (err) {
        res.status(400).json({ message: 'Error creating like', error: err.message });
    }
});
// Route to like a post
router.post('/posts/:id/like', async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.user_id;
  
    try {
      const like = new Like({ post_id: postId, user_id: userId });
      await like.save();
  
      res.status(201).json({ message: 'Post liked successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error liking post', error: err.message });
    }
  });
  
  // Route to unlike a post
  router.delete('/posts/:id/like', async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.user_id;
  
    try {
      const like = await Like.findOneAndDelete({ post_id: postId, user_id: userId });
  
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
  
      res.status(200).json({ message: 'Like removed successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error unliking post', error: err.message });
    }
  });
  
module.exports = router;
