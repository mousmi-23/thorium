const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body;
    let savedData= await BookModel.create(data);
    res.send({msg: savedData})
}

const bookList = async function (req, res) {
    let allBooks = await BookModel.find().select( { bookName: 1, authorName: 1, _id: 0} );
    res.send({msg: allBooks})
}

const getBooksInYear = async function(req, res) {
    let year = req.body.year;
    let publishedData = await BookModel.find( { "year" : year} ).select( {bookName: 1, isPublished : true,  _id:0} );
    res.send({msg : publishedData})
}

const getParticularBooks = async function(req, res) {
    let data = req.body;
    let allData = await BookModel.find(data).select( {bookName : "Polity" , "year" : 2018} );
    res.send({msg : allData})
}

const getXINRBooks = async function(req, res) {
    let priceINR = await BookModel.find({ 
        $or: [{ "prices.indianPrice" : "100INR" },
              { "prices.indianPrice" : "200INR" },
              { "prices.indianPrice" : "500INR" } ]
    });
    res.send({msg : priceINR})
}

const getRandomBooks = async function(req, res) {
    let resultStock = await BookModel.find( { totalPages : {$gt : 500}, stockAvailable : "true" });
    res.send({msg : resultStock})
}

module.exports.createBook= createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear 
module.exports.getParticularBooks = getParticularBooks 
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks