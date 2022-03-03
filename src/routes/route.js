const express = require('express');
const router = express.Router();
const bookSchema = require('../controllers/bookController'); 
const authorSchema = require('../controllers/authorController'); 


router.post('/createAuthor', authorSchema.createAuthor); 

router.post('/createBook', bookSchema.createBook); 

router.get('/getBookList', authorSchema.getBookList); 

router.put('/updatePrice', authorSchema.updatePrice); 

router.get('/checkAuthorByRange', bookSchema.checkAuthorByRange); 

module.exports = router;