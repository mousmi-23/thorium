const userModel= require("../models/userModel")
const orderModel = require("../models/orderModel");

const createUser= async function(req, res) {
    let data= req.body
    let savedData = await userModel.create(data)
    res.send({msg: savedData})
}

const updateStatus = async function(req, res) {
    const data = req.body; 
    const header = req.headers.isFreeAppUser; 
    const userRes = await userModel.findByIdAndUpdate(data.userId, {
        isFreeAppUser: header
    }, {
        new: true
    }); 
    const orderRes = await orderModel.findByIdAndUpdate(data.orderId, {
        isFreeAppUser: header
    }, {
        new: true
    });
    res.send({
        'msg': [userRes, orderRes]
    }); 
}


module.exports.createUser= createUser; 
module.exports.updateStatus = updateStatus; 