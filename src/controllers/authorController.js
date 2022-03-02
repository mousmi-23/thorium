const { count } = require("console")
const AuthorModel= require("../models/authorModel")
const BookModel= require("../models/authorModel")
const bookModel= require("../models/bookModel")

const authorData = async function (req, res) {
    let data= req.body;
    let savedData= await AuthorModel.create(data);
    res.send({msg: savedData});
}

const getAuthorBook= async function (req, res) {
    let authorBookName = await AuthorModel.find( {author_name : "Chetan Bhagat" } )
    let constId = authorBookName[0].author_id;
    let bookList = await BookModel.find( {author_id : constId } ).select( {bookName : 1});
    res.send({msg : bookList});
} 

const updatedPrice= async function (req, res) {
    let updateBookPrice= await BookModel.findOneAndUpdate({
        bookName:"Two states"
    },
    {$set:{
        "price.indianPrice":100
    }},
    {new:true},
    {upsert:true} )
    const author_id=updateBookPrice.author_id;
    const updatedPriceprices=updateBookPrice.price.indianPrice
    const resUpdate= await AuthorModel.find({ author_id:author_id}).select( { author_name:1, _id:0 } );
    resUpdate.push({
        updatedPriceprices:updatedPriceprices
    })
    res.send({msg:resUpdate})
}

module.exports.authorData = authorData
module.exports.getAuthorBook = getAuthorBook
module.exports.updatedPrice=updatedPrice