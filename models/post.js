const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    date: { type: Date, default: new Date() },
    isPublic: { type: Boolean, default: true },
});

module.exports = mongoose.model("Post", postSchema);
