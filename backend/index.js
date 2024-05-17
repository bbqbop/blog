const express = require("express");
const mongoose = require("mongoose");
const passport = require("./config/passport");
const createError = require('http-errors');
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes");

const app = express();

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());

app.use("/users", routes.user);
app.use("/posts", routes.post); 

app.get("/", (req, res) => res.redirect("/posts"));

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
app.listen(port, (err)=>{
    if (err) console.log("Error in server Setup")
    console.log(`Server listening on Port ${port}`)
})