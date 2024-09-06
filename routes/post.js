const express = require('express')
const router = express.Router();
const { addPost, updatePost, getAllPosts, getPost, deletePost } = require('../controllers/postController');

router.get("/posts", getAllPosts);

router.post('/post', addPost);

router.get("/post/:id", getPost);
router.patch('/post/:id', updatePost);
router.delete("/post/:id", deletePost);

module.exports = router;