const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    message: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema)