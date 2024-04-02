const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema(
    {
        _id: ObjectId,
        files_id: ObjectId,
        n: Number,
        data: Buffer
    }
)

module.exports = mongoose.model('images', imagesSchema);