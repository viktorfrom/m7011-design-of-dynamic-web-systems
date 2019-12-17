const mongoose = require('mongoose');

const RegionSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now() },
    name: String,
    maxWindSpeed: Number, 
    minWindSpeed: Number,
    currentWindSpeed: Number,
    maxTemp: Number,
    currentTemp: Number
});


module.exports = mongoose.model('Region', RegionSchema);