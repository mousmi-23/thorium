const midHeader = function(req, res, next) {
    if(req.headers.isfreeappuser != undefined){
        next();
    } 
    else{
        res.send({
            'msg': 'The request is missing a mandatory header !'
        }); 
    } 
}

const updateHeader = function (req, res, next) {
    let header = req.headers.isfreeappuser
    header = true 
    next(); 
}

module.exports.midHeader = midHeader; 
module.exports.updateHeader = updateHeader; 