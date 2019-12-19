const mongoose = require('mongoose');

const RegionSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    maxWindSpeed: {
        type: Number,
        required: true
    },
    minWindSpeed: {
        type: Number,
        required: true
    },
    currentWindSpeed: {
        type: Number,
        required: true
    },
    maxTemp: {
        type: Number,
        required: true
    },
    currentTemp: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Region', RegionSchema);