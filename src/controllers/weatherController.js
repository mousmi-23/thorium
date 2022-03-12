const { count } = require("console")
let axios = require("axios");
const { response } = require("express");
let obj2 = []



//let obj2 = {}
let getWeather = async function(req, res) {
    try {
        //let obj2 = []
        let cityTemp =[]
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let q = req.query.q
        let appid = req.query.appid
        console.log(q, appid)
        var options = {
            method: "get",
            url : `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
        }
        let result = await axios(options)
        console.log(result.data.main.temp)
        //for (let i=0; i<3; i++){
         obj2.push({city : q , temp : result.data.main.temp})
        //}
        //(obj)
        res.status(200).send({status : true, msg : {city : q , temp : result.data.main.temp, obj2}})
    }
    catch(err) {
        console.log(err.message)
        res.status(500).send({msg : err.message})
    }
}

let allCity = function(req, res) {
    res.send({msg : obj2})
}

module.exports.getWeather = getWeather
module.exports.allCity=allCity
