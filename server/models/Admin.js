// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('Admin', userSchema);

module.exports = User;
