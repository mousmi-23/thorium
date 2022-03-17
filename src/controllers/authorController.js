const authorModel = require("../models/authorModel")
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const validator = require("email-validator")

const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        if (!data) {
            return res.status(400).send({ status: false, output: "Please provide valid emailId" })
        } else {
            let dataRes = await authorModel.create(data);
            return res.status(201).send({ status: true, msg: dataRes });
        }
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

const login = async function (req, res) {
    try {
        email = req.body.email
        password = req.body.password

        let authorDetails = await authorModel.findOne({ email: email, password: password, isDeleted: false })
        if (authorDetails) {
            const generatedToken = jwt.sign({ authorId: authorDetails._id, email: email }, "appleShine")

            return res.status(200).send({ status: true, data: email._id, token: generatedToken })
        } else {
            return res.status(400).send({ status: false, message: 'Invalid credentials' })
        }
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.createAuthor = createAuthor
module.exports.login = login