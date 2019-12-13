const mongoose = require('mongoose');

const HouseSchema = mongoose.Schema({
        timestamp: { type: Date, default: Date.now() },
        powerPlant: Object,
        marketPrice: Object,
        location: Object,
        owner: Object,
        battery: Object,
        windTurbine: Object,
        mathExpression: Object,
        maxHouseConsumption: Number,
        minConsumption: Number,
        houseConsumption: Number,
        statusMessage: String 
});


module.exports = mongoose.model('House', HouseSchema);