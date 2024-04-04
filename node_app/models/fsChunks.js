const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const fsChunksSchema = new mongoose.Schema(
    {
        _id: ObjectId,
        files_id: ObjectId,
        n: Number,
        data: Buffer
    }
)

module.exports = mongoose.model('fs.chunks', fsChunksSchema);
