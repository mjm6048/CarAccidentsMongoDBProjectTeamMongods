const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        _id: ObjectId,
        Username: String,
        Password: String
    }
)

module.exports = mongoose.model('users', usersSchema);