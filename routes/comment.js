const express = require('express');
const router = express.Router();
const { addComment, deleteComment, likeComment } = require('../controllers/commentController');

router.post("/:postId/:userId", addComment)
router.delete("/:postId/:userId", deleteComment)
router.post("/:postId/:userId/like", likeComment)

module.exports = router;