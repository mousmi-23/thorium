const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    headQuarter: String

}, { timestamps: true });

module.exports = mongoose.model('newPublisher', publisherSchema); 
