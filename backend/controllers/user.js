const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { generatePassword, verifyPassword } = require("../lib/passwordUtils");


exports.signUp = asyncHandler(async (req, res) => {
    const { username, password, firstname, lastname } = req.body
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ error: "Username already exists!" });
    } 
    const hash = await generatePassword(password)
    const isAdmin = username == 'admin' ? true : false
    const newUser = new User({
        username, 
        password: hash,
        firstname, 
        lastname, 
        isAdmin
    })
    const user = await newUser.save()
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
        message: "User Created!", 
        token,
        user: {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username 
        }
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
        token,
        user: {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            id: user._id, 
            isAdmin: user.isAdmin
        }
    },)
})
