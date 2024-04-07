const { ObjectId, Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
);

const accidentsSchema = new mongoose.Schema(
    {
        _id: ObjectId,
        Severity: Number,
        Start_Time: Date,
        End_Time: Date,
        Start_Lat: Decimal128,
        Start_Lng: Decimal128,
        Description: String,
        Street: String,
        City: String,
        County: String,
        State: String,
        Zipcode: String,
        Country: String,
        Timezone: String,
        Weather_Timestamp: Date,
        Weather_Condition: String,
        Comments: Array,
        location: {
            type: pointSchema,
            index: '2dsphere',
            required: true
        }
    }
);

module.exports = mongoose.model('accidents', accidentsSchema);