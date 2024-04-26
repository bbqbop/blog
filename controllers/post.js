const asyncHandler = require("express-async-handler");

const Post = require("../models/post");
const Comment = require("../models/comment");


exports.readAll = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate({
        path: 'author',
        select: 'username'
    })
    res.json({
        message: "All posts found.",
        posts
    })
})

exports.create = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({
        title, content, author: req.user._id
    })
    await newPost.save();
    res.json({ 
        message: "Post created.", 
        newPost,
    })
})

exports.read = async (req, res) => {
    try {
        const [ post, comments ] = await Promise.all([
            Post
                .findById(req.params.id)
                .populate({
                    path: 'author',
                    select: 'username'
                }),
            Comment
                .find({post: req.params.id})
                .populate({
                    path: 'author',
                    select: 'username'
                })
        ])
        res.json({ 
            message: "Post found",
            post,
            comments
        })
    } catch {
        res.status(404).json( { error: "Post not found."})
    }
}

exports.update = asyncHandler(async (req, res) => {
    const updatedPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id,
        _id: req.params.id       
    })
    await Post.findByIdAndUpdate(req.params.id, updatedPost);
    res.json({
        message: "Post updated.",
        updatedPost
    });
});

exports.delete = asyncHandler(async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id)
    res.json({
        message: "Post deleted.",
        post
    })
})










