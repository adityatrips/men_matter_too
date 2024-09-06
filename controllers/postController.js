const Post = require('../models/Post');

const addPost = async (req, res) => {
    try {
        const {
            title,
            content,
            uploadedBy,
            image = null,
            tags = [],
        } = req.body;

        if (!title || !content || !uploadedBy) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const post = new Post({
            title,
            content,
            uploadedBy,
            image,
            tags
        });

        await post.save();

        return res.status(201).json(post);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            content,
            tags = [],
        } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const post = await Post.findByIdAndUpdate(id, {
            title,
            content,
            tags
        });

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json({
            posts
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        return res.status(204).send({
            delete: true
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

module.exports = { addPost, updatePost, getAllPosts, getPost, deletePost };