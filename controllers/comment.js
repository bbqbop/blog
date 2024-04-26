const asyncHandler = require("express-async-handler");

const Comment = require("../models/comment");

exports.create = asyncHandler(async (req, res) => {
    const newComment = new Comment({
        message: req.body.message,
        author: req.user._id,
        post: req.params.id
    }) 
    await newComment.save();
    res.json({ 
        message: "Comment created",
        newComment
    });
} )