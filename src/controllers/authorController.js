const authorModel = require("../models/authorModel")

const createAuthor = async (request, response) => {
    const data = request.body;
    const dataRes = await authorModel.create(data);
    response.send({
        'msg': dataRes
    });
}

module.exports.createAuthor = createAuthor







