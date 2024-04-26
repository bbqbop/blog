const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { generatePassword, verifyPassword } = require("../lib/passwordUtils");


exports.signUp = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ error: "Username already exists!" });
    } 
    const hash = await generatePassword(password)
    const newUser = new User({
        username, 
        password: hash,
    })
    await newUser.save()
    res.json({
        message: "User Created!", 
        newUser
    })
    
})

exports.login = asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({ error: "Authentication failed. User not found." });
    } 
    const match = await verifyPassword(req.body.password, user.password)
    if (!match) {
        return res.status(401).json({ error: "Authentication failed. Password incorrect."})
    }
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
        message: "Authentication Successful",
        token
    },)
})
