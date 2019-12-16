const mongoose = require('mongoose');

const PowerPlantSchema = mongoose.Schema({
    timestamp: { type: Date, default: Date.now() },
    name: String,
    region: String,
    marketPrice: Object,
    battery: Object,
    // mathExpression: Object,
    maxProduction: Number,
    minProduction: Number,
    currentProduction: Number,
    // conversionRate: Number,
    // acceleration: Number,
    statusMessage: String,
    // startUp: Boolean,
    // powerOutage: Boolean
});


module.exports = mongoose.model('PowerPlant', PowerPlantSchema);