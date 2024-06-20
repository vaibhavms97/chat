const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    message: {type: String, trim: true},
    groupId: {type: mongoose.Schema.Types.ObjectId, ref: 'group'},
    timestamp: {type: Date, default: Date.now},
})

module.exports = mongoose.model('message', Message)