const mongoose = require('mongoose');


const WindTurbineSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    maxPower: {
        type: Number,
        default: 1.5
    },
    minPower: {
        type: Number,
        default: 0
    },
    excessPower: {
        type: Number,
        default: 0
    },
    conversionRate: {
        type: Number,
        default: 4.2
    },
    broken: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('WindTurbine', WindTurbineSchema);