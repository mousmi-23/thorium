const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get("/dream", function (req, res) {
    res.send("I am Cool")
})

router.get("/left", function (req, res) {
    res.send("Falana something")
})

module.exports = router;