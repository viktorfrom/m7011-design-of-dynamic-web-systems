const mongoose = require('mongoose');

const HouseSchema = mongoose.Schema({
        timestamp: { type: Date, default: Date.now() },
        owner: String,
        region: String,
        powerPlant: String,
        marketPrice: Object,
        battery: Object,
        windTurbine: Object,
        maxHouseConsumption: Number,
        minHouseConsumption: Number,
        houseConsumption: Number,
        statusMessage: String 
});


module.exports = mongoose.model('House', HouseSchema);