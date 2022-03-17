const jwt = require("jsonwebtoken");

const authenticate= function(req,res,next){
    try {
    let token = req.headers["x-auth-token"];
    if(!token) return res.status(404).send({status:false, msg:"token must be present"});
    
    let decodedtoken= jwt.verify(token,"appleShine");
    if(!decodedtoken) return res.status(400).send({status:false,msg:"invalid token"})
    req.authorId = decodedtoken.authorId 
    next()
    }
    catch(err) {
        res.status(500).send({status: false, error : err.message})
    }
}


const authorisation = function(req,res,next) { 
    try {
    let authortobemodified = req.params.authorid

    let token = req.headers["x-auth-token"];
    if(!token) { 
        return res.status(404).send({status:false, msg:"token must be present"});
    }
    let decodedtoken= jwt.verify(token,"appleShine");
    if(!decodedtoken){ 
        return res.status(400).send({status:false, msg:"invalid token"})
    }
    let authorloggedin = decodedtoken.authorid

    if(authortobemodified!= authorloggedin ) {
        return res.send({status:false, msg:"loggedin person is not allow to access the request"})
    }
    next()
    }
    catch(err) {
        res.status(500).send({status: false, error: err.message})
    }
}

module.exports.authenticate = authenticate
module.exports.authorisation = authorisation