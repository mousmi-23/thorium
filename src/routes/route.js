const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post('/createAuthors', authorController.createAuthor)
router.post('/login', authorController.login)

router.post('/createBlogs',middleware.authenticate, blogController.createBlog)
router.get('/getBlogs',middleware.authenticate, blogController.getBlog)
router.put('/updateBlogs/:blogId',middleware.authenticate, middleware.authorisation, blogController.updateBlog)
router.delete('/deleteBlogs/:blogId',middleware.authenticate, middleware.authorisation, blogController.deleteId)
router.delete('/deletedBlogs',middleware.authenticate, blogController.deletedBlogs)


module.exports= router;