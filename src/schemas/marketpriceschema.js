const mongoose = require('mongoose');


const MarketPriceSchema = mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    maxTotalProduction: {
        type: Number,
        required: true
    },
    minTotalProduction: {
        type: Number,
        required: true
    },
    currentProduction: {
        type: Number,
        required: true
    },
    electricityPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('MarketPrice', MarketPriceSchema);