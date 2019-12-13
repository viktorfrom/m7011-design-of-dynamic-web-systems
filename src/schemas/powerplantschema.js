const mongoose = require('mongoose');


const PowerPlantSchema = mongoose.Schema({
    name: {
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
    batteryId: {
        type: Number,
        required: true
    },
    maxProduction: {
        type: Number,
        default: 30
    },
    minProduction: {
        type: Number,
        default: 0
    },
    currentProduction: {
        type: Number,
        default: 0
    },
    conversionRate: {
        type: Number,
        default: 0.7
    },
    acceleration: {
        type: Number,
        default: 1.5
    },
    statusMessage: {
        type: String,
        default: "FULLY OPERATIONAL"
    },
    startUp: {
        type: Boolean,
        default: true
    },
    powerOutage: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('PowerPlant', PowerPlantSchema);