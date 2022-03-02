const publisherModel = require('../models/publisherModel');

const createPublisher = async (request, response) => {
    const data = request.body;
    const dataRes = await publisherModel.create(data);
    response.send({
        'msg': dataRes
    });
}

module.exports.createPublisher = createPublisher