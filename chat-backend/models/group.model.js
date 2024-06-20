const mongoose = require('mongoose')

const Group = new mongoose.Schema({
  name: {type: String, trim: true},
  created_by: mongoose.Schema.Types.ObjectId,
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
  created_at: {type: Date, default: Date.now},
})

module.exports = mongoose.model('group', Group)