const authorSchema = require('../models/authorModel'); 
const bookSchema = require('../models/bookModel'); 

const createAuthor = async (request, response)=>{
    const data = request.body; 
    const dataRes = await authorSchema.create(data); 
    response.send({
        'msg': dataRes
    });
}

const getBookList = async (request, response)=>{
    const author_name = "Chetan Bhagat"; 
    const dataRes = await authorSchema.find({
        'author_name': author_name
    }).select({
        'author_id': 1
    }); 
    const author_id = dataRes[0].author_id; 
    const bookRes = await bookSchema.find({
        'author_id': author_id
    }).select({
        'name': 1,
        '_id': 0
    }); 
    response.send({
        'msg': bookRes
    }); 
}

const updatePrice = async (request, respone)=>{
    const name = "Two states"; 
    const dataRes = await bookSchema.findOneAndUpdate(
        {
            name: name
        },
        {
            $set:{
                price: 100
            }
        },
        {
            new: true
        }
    ); 
    const author_id = dataRes.author_id; 
    const updatedPrice = dataRes.price; 
    const authorRes = await authorSchema.find({
        author_id: author_id
    }).select({
        author_name: 1,
        _id: 0
    }); 
    authorRes.push({
        'updatedPrice': updatedPrice
    }); 
    respone.send({
        'msg': authorRes
    });
}

module.exports.createAuthor = createAuthor,
module.exports.getBookList = getBookList,
module.exports.updatePrice = updatePrice
