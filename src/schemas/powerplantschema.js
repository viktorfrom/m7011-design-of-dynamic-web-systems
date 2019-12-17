const mongoose = require('mongoose');

const PowerPlantSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now() },
    name: String,
    region: String,
    marketPrice: Object,
    battery: Object,
    maxProduction: Number,
    minProduction: Number,
    currentProduction: Number,
    statusMessage: String,
});


module.exports = mongoose.model('PowerPlant', PowerPlantSchema);