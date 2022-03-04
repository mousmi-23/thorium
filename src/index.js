const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Mousmi23:dUdaV8w8MnmYpHwY@cluster0.mkiuo.mongodb.net/Middleware?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

const midGlb = function(req, res, next) {
    const time = new Date().toISOString().replace(/T/,' ').replace(/\..+/,'')
    const type = req.originalUrl
    const ip = req.ip
    console.log(time,type,ip);
    next();
}
app.use(midGlb)

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
