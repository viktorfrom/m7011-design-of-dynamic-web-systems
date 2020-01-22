const mongoose = require('mongoose');

const HouseSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    owner: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    battery: {
        type: Object,
        required: true
    },
    windTurbine: {
        type: Object,
        required: true
    },
    powerPlant: {
        type: String,
        required: true
    },
    marketPrice: {
        type: Object,
        required: true
    },
    maxHouseConsumption: {
        type: Number,
        min: 0,
        required: true
    },
    minHouseConsumption: {
        type: Number,
        min: 0,
        required: true
    },
    houseConsumption: {
        type: Number,
        min: 0,
        required: true
    },
    netProduction: {
        type: Number,
        required: true
    },
    batteryRatio: {
        type: Number,
        min: 0.0,
        max: 1.0,
        required: true
    },
    statusMessage: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('House', HouseSchema);