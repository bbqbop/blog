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
        newComment, 
    });
} )

exports.delete = asyncHandler(async (req, res) => {
    let comment = await Comment.findById(req.params.commentId);
    if (!comment) {
        return res.status(404).json({ error: "Comment not found."})
    }
    if (req.user._id != comment.author.toString() && !req.user.isAdmin) {
        return res.status(401).json({ error: "User is not authorized to delete comment."})
    }
    comment = await Comment.findByIdAndDelete(req.params.commentId);
    res.json({
        message: "Comment deleted.",
        comment
    })
})