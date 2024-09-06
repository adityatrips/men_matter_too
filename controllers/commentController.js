const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

const addComment = async (req, res) => {
    try {
        const { postId, userId } = req.params;
        const { comment } = req.body;

        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }


        const newComment = new Comment({
            post: postId,
            comment,
            commentedBy: userId,
        });
        post.comments.push(newComment._id);

        await newComment.save();
        await post.save();

        return res.status(201).json({
            done: true,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error });
    }
}

const likeComment = async (req, res) => {
    try {
        const { postId, userId } = req.params;

        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        post.likes.push(user._id);
        await post.save();

        return res.status(201).json({
            done: true,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { postId, userId } = req.params;

        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        const comment = await Comment.findOne({ post: postId, commentedBy: userId });


        if (!comment) {
            return res.status(404).json({
                error: 'Comment not found'
            });
        }
        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }
        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        await Comment.findByIdAndDelete(comment._id);
        post.comments = post.comments.filter(commentId => commentId.toString() !== comment._id.toString());

        await post.save();

        return res.status(201).json({
            done: true,
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error });
    }
}

module.exports = {
    addComment,
    likeComment,
    deleteComment
}