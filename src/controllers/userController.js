const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const mongoose =require("mongoose")

const createUser = async function (req, res) {
  let data = req.body;
  let savedData = await userModel.create(data);
  res.send({ 'msg': savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      'status': false,
      'msg': "username or the password is not corerct",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
    }, '678910');
    
  res.setHeader("x-auth-token", token);
  res.send({ 'status': true, 'data': token });
};

const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  res.send({ 'status': true, 'data': userDetails });
};

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ 'status': true, 'data': updatedUser });
};


const deleteUser = async function(req,res) {
  let userId = req.params.userId;
  let userRes = await userModel.findByIdAndUpdate( {_id:userId}, {isDeleted : true}, { new : true});
  res.send({ 'status' : true, 'data' :userRes });

}
  
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
