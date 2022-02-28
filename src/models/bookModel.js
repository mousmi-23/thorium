const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String, 
    authorName: String, 
    tags: [String],
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year : Number,
    totalPages : Number,
    stockAvailable : Boolean,
    
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

