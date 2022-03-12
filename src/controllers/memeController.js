let axios = require("axios");
const { response } = require("express");

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

module.exports.getMemes = getMemes
module.exports.getMemesId = getMemesId
