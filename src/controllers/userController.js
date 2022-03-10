const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await userModel.create(data);
    res.status(201).send({ status: true, 'msg': savedData });
  } catch (error) {
    console.log("This is the error:", error)
    res.status(500).send({ status: false, msg: error.message });
  }
};

const loginUser = async function (req, res) {
   try {
     let userName = req.body.emailId;
     let password = req.body.password;

     let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user)
      return res.send({
         status: false,
         msg: "username or the password is not corerct",
       });
    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "thorium",
        organisation: "FUnctionUp",
      },
      "functionup-thorium"
      );
     res.setHeader("x-auth-token", token);
     res.status(201).send({ status: true, data: token });
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message })
     }
};

const getUserData = async function (req, res) {
   try {
     let userId = req.params.userId;
     let userDetails = await userModel.findById(userId);
     res.status(200).send({ status: true, data: userDetails });
   } catch (error) {
     return res.status(500).send({ status: false, msg: error.message })
   }
};

const updateUser = async function (req, res) {
   try {
     let userId = req.params.userId;
     let userData = req.body;
     let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
     res.status(200).send({ status: true, data: updatedUser });
   } catch (error) {
     res.status(500).send({ status: false, msg: error.message })
   }
};

const deleteUser = async function (req, res) {
  try {
     let userId = req.params.userId;
     let userRes = await userModel.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
     res.status(200).send({ 'status': true, 'data': userRes });
   } catch (error) {
     res.status(500).send({ status: false, msg: error.message })
   }
};

const postMessage = async function (req, res) {
  try {
     let userId = req.params.userId
     let message = req.body.message

     let user = await userModel.findById(req.params.userId)
     if (!user) return res.send({ 'status': false, 'msg': 'No such user exists' })

    let updatedPosts = user.posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { posts: updatedPosts }, { new: true })
    return res.status(200).send({ 'status': true, 'data': updatedUser })
    } catch (error) {
     res.status(500).send({ status: false, msg: error.message })
    }
};

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage