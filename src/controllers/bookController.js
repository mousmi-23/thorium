const _ = require('lodash'); 
const bookSchema = require('../models/bookModel'); 
const authorSchema = require('../models/authorModel'); 

const createBook = async (request, response)=>{
    const data = request.body; 
    const dataRes = await authorSchema.find({
        "author_id": data.author_id
    });
    if(dataRes.length){
        const insertRes = await bookSchema.create(data); 
        response.send({
            'msg': insertRes
        });
    }
    else{
        response.send({
            'msg': 'Author Id Not Found !'
        }); 
    }  
}

const checkAuthorByRange = async (request, response)=>{
    const dataRes = await bookSchema.find({
        price: {
            $gte: 50,
            $lte: 100
        }
    }); 
    const allId = _.uniq(dataRes.map(data => data.author_id));
    const authorNameArr = []; 
    for(let i = 0; i < allId.length; i++){
        const outputData = await authorSchema.find({
            author_id: allId[i]
        }).select({
            author_name: 1,
            _id: 0
        }); 
        authorNameArr.push(outputData); 
    }
    response.send({
        'msg': authorNameArr.flat()
    }); 
}

module.exports.createBook = createBook,
module.exports.checkAuthorByRange = checkAuthorByRange