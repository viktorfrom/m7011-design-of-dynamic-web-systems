const mongoose = require('mongoose');


const MarketPriceSchema = mongoose.Schema({
        timestamp: { type: Date, default: Date.now() },
        name: String,
        maxTotalProduction: Number, 
        minTotalProduction: Number,
        currentTotalProduction: Number,
        electricityPrice: Number,
        currentPrice: Number
});


module.exports = mongoose.model('MarketPrice', MarketPriceSchema);