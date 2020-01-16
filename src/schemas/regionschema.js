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
        min: 0,
        required: true
    },
    minWindSpeed: {
        type: Number,
        min: 0,
        required: true
    },
    currentWindSpeed: {
        type: Number,
        min: 0,
        required: true
    },
    maxTemp: {
        type: Number,
        max: 0,
        required: true
    },
    currentTemp: {
        type: Number,
        max: 0,
        required: true
    }
});


module.exports = mongoose.model('Region', RegionSchema);