const mongoose = require('mongoose');

const HouseSchema = mongoose.Schema({
        timestamp: { type: Date, default: Date.now() },
        owner: String,
        location: String,
        powerPlant: String,
        // marketPrice: Object,
        battery: Object,
        windTurbine: Object,
        // mathExpression: Object,
        maxHouseConsumption: Number,
        minConsumption: Number,
        houseConsumption: Number,
        statusMessage: String 
});


module.exports = mongoose.model('House', HouseSchema);