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

module.exports.auth = auth
