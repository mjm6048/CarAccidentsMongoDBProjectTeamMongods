const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const fsFilesSchema = new mongoose.Schema(
    {
        _id: ObjectId,
       	length: Number,
        chunkSize: Number,
	    uploadedDate: Date,
	    filename: String,
        metadata: Object
    }
)

module.exports = mongoose.model('fs.files', fsFilesSchema);
