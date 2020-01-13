const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now()
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    type: String
  }
});

const User = module.exports = mongoose.model('User', UserSchema);