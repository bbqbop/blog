const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const createError = require('http-errors');
require("dotenv").config();

const routes = require("./routes");

const app = express();

mongoose.connect(process.env.MONGODB_URI)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());

app.use("/blog", routes.blog);
app.use("/users", routes.user);
app.use("/posts", routes.post); 

app.get("/", (req, res) => res.redirect("/blog"));

// catch 404 
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json( { error: err.message })
})

const port = process.env.PORT || 4000
app.listen(port)