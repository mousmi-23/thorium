const productModel = require('../models/productModel'); 

const createProduct = async function(req, res){
    const data = req.body; 
    const dataProduct = await productModel.create(data); 
    res.send({
        'msg': dataProduct
    }); 
}

module.exports.createProduct = createProduct; 