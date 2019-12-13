const mongoose = require('mongoose');


const LocationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxWindSpeed: {
        type: Number,
        default: 15
    },
    minWindSpeed: {
        type: Number,
        default: 0
    },
    currentWindSpeed: {
        type: Number,
        default: 5.2
    },
    maxTemp: {
        type: Number,
        default: 0
    },
    currentTemp: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Location', LocationSchema);