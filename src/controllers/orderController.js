const orderModel = require('../models/orderModel'); 
const userModel = require('../models/userModel'); 
const productModel = require('../models/productModel'); 

const createOrder = async function (req, res){
    const data = req.body; 
    const isFreeAppUser = req.headers.isfreeappuser; 

    const userData = await userModel.findById(data.userId); 
    if(userData == null){
        return res.send({
            'msg': 'User does not exist !'
        }); 
    }
    const productData = await productModel.findById(data.productId); 
    if(productData == null){
        return res.send({
            'msg': 'Product does not exist !'
        }); 
    }
    if(isFreeAppUser == "true"){
       data.amount = 0; 
       data.isFreeAppUser = true

       const dataRes = await orderModel.create(data); 
       return res.send({
           'msg': dataRes
       }); 
    }
    else{
       const realDataPrice = await productModel.findById(data.productId); 
       const userBalance = await userModel.findById(data.userId); 

       if(userBalance.balance >= realDataPrice.price){
          const reducePrice = await userModel.findByIdAndUpdate(data.userId, {
              $inc:{
                  balance: -realDataPrice.price
              }
          }, 
          {
              new: true
          }); 
          data.amount = realDataPrice.price; 
          data.isFreeAppUser = false; 
          const finalOrder = await orderModel.create(data); 
          return res.send({
              'msg': reducePrice
          }); 
       }
       else{
           return res.send({
               'msg': 'Do not have much balance'
           })
       } 

    }
    
}

module.exports.createOrder = createOrder;

