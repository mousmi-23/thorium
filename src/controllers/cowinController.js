let axios = require("axios");
const { response } = require("express");


let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getDistrictId = async function(req, res) {
    try {
        let district = req.query.district_id
        let date = req.query.date
        console.log(`body is: ${district}` )
        var options = {
            method : "get",
            url : `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({msg : result.data})
    }
    catch(err) {
        console.log(err)
        res.status(500).send({msg : err.message})
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getMemes = async function(req, res) {
    try {
        let memes = req.params.template_id
         console.log(memes)
        //console.log(`body is : ${memes}`)
        var options = {
            method: "get",
            url : `https://api.imgflip.com/get_memes`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({msg : data})
    }
    catch(err) {
        console.log(err)
        res.status(500).send({msg : err.message })
    }
}

let getMemesId = async function(req, res) {
    try {
        let memes_id = req.params.memes_id
        let Template_id = req.body.template_id
        console.log(Template_id)
        console.log(memes_id)
        //console.log(`body is : ${memes_id} ${template_id}`)
        var options = {
            method: "post",
            url : `https://api.imgflip.com/caption_image`
        }
        let result = await axios(options);
        console.log(result.data)
        res.status(200).send({msg : result.data})
    }
    catch(err) {
        console.log(err)
        res.status(500).send({msg : err.message })
    }
}



module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getDistrictId =getDistrictId
module.exports.getOtp = getOtp