const mongoose = require('mongoose');


const HouseSchema = mongoose.Schema({
    powerPlant: {
        type: String,
        required: true
    },
    marketPrice: {
        type: Number,
        default: 0
    },
    location: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    batteryId: {
        type: Number,
        required: true
    },
    windTurbineId: {
        type: Number,
        required: true
    },
    maxHouseConsumption: {
        type: Number,
        default: 1.35
    },
    minHouseConsumption: {
        type: Number,
        default: 0
    },
    houseConsumption: {
        type: Number,
        default: 914/744
    },
    statusMessage: {
        type: String,
        default: "FULLY OPERATIONAL"
    }
});


module.exports = mongoose.model('House', HouseSchema);