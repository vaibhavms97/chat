const mongoose = require('mongoose')

const User = new mongoose.Schema({
  name: {type: String, trim: true},
  password: String,
  email: {type: String, trim: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
})

module.exports = mongoose.model('user', User)