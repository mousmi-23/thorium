const express = require('express');
const router = express.Router();

const ProductController= require("../controllers/productController")
const UserController= require("../controllers/userController")
const OrderController= require("../controllers/orderController")
const Middleware = require('../middleware/middleware');


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createProduct", ProductController.createProduct)

router.post("/createUser", Middleware.midHeader, UserController.createUser)

router.post("/createOrder", Middleware.midHeader, OrderController.createOrder)

router.put("/updateStatus", Middleware.updateHeader, UserController.updateStatus)

module.exports = router;