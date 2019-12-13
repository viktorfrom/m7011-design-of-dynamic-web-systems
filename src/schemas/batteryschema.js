const mongoose = require('mongoose');


const BatterySchema = mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    maxCapacity: {
        type: Number,
        default: 5
    },
    minCapacity: {
        type: Number,
        default: 0
    },
    currentCapacity: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Battery', BatterySchema);