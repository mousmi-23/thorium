const jwt = require("jsonwebtoken");

const auth = function(req, res, next) {
    try {
    const userId = req.params.userId;
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(400).send({
            'status': false,
            'msg': 'token must be present'
        });
    }
    const decodedToken = jwt.verify(token, 'functionup-thorium');
    if (!decodedToken){
        return res.status(400).send({
            status: false,
            msg: ' token invalid'
        });
    }
    else{
        if(decodedToken.userId != userId){
            return res.status(403).send({
                status: false,
                msg: "User not authorized !"
            });
        }
     }
   }  catch(error) {
      return res.status(400).send({status : false, msg : error.message})
  }
    next();
}

 module.exports.auth = auth;


// const authenticate = function (req, res, next) {
//     const userId = req.params.userId
//     const token = req.headers["x-auth-token"];
  
//     if (!token) {
//       return res.send({'status':false, 'msg': "A token is required for authentication"});
//     } 
//       try {
//         const decodedToken = jwt.verify(token, 'functionup-thorium');
       
//       } catch(err){
//         console.log(err)
//         return res.send({'status': false, 'msg': "Invalid Token"});
//       }
      
//     next();
//   };
  
  
//   const authorise = function(req, res, next) {
//     const userId = req.params.userId
//     const token = req.headers["x-auth-token"];
//     const decodedToken = jwt.verify(token, 'functionup-thorium');
//     let userLoggedIn = decodedToken.userId
//     let userToBeModified = userId
//     if(userToBeModified != userLoggedIn) {
//        return res.send({status: false, msg: "User logged is not allowed to modify the requested users data"});
//     }
//     next();
//   };
  
//   module.exports.authenticate = authenticate;
//   module.exports.authorise = authorise