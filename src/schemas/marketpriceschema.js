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
        min: 0,
        required: true
    },
    minTotalProduction: {
        type: Number,
        min: 0,
        required: true
    },
    currentProduction: {
        type: Number,
        min: 0,
        required: true
    },
    electricityPrice: {
        type: Number,
        min: 0,
        required: true
    },
    currentPrice: {
        type: Number,
        min: 0,
        required: true
    }
});


module.exports = mongoose.model('MarketPrice', MarketPriceSchema);