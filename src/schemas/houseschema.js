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
        required: true
    },
    minHouseConsumption: {
        type: Number,
        required: true
    },
    houseConsumption: {
        type: Number,
        required: true
    },
    netProduction: {
        type: Number,
        required: true
    },
    statusMessage: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('House', HouseSchema);