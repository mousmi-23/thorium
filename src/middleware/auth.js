const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  const userId = req.params.userId
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.send({'status':false, 'msg': "A token is required for authentication"});
  }
    const decodedToken = jwt.verify(token, '678910');
    if(!decodedToken)
    return res.send({'status': false, 'msg': "Invalid Token"});
  next();
};

module.exports.auth = auth;
