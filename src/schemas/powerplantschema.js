const mongoose = require('mongoose');

const PowerPlantSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    marketPrice: {
        type: Object,
        required: true
    },
    battery: {
        type: Object,
        required: true
    },
    maxProduction: {
        type: Number,
        required: true
    },
    minProduction: {
        type: Number,
        required: true
    },
    currentProduction: {
        type: Number,
        required: true
    },
    statusMessage: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('PowerPlant', PowerPlantSchema);