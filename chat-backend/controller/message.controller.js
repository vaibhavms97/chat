const { NO_CONVERSATION, INVALID_DATA, MESSAGE_SUCCESSFUL } = require('../constants/constants')
const Message = require('../models/message.model')
const mongoose = require('mongoose')

exports.getAllMessages = async(req, res) => {
  try {
    Message.find({groupId: new mongoose.Types.ObjectId(req.query.groupId)})
    .populate('userId', 'name email')
    .populate('groupId')
    .exec()
    .then((result) => {
      if(result.length) {
        res.status(200).json({messages: result})
      } else {
        res.status(200).json({message: NO_CONVERSATION, messages: []})
      }
    })
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
}

exports.sendMessage = async (req, res) => {
  try {
    const data = req.body
    if(!data.message || !data.groupId) {
      res.status(400).json({message: INVALID_DATA})
    } else {
      const message = new Message({
        message: data.message,
        groupId: data.groupId,
        userId: data.userId
      })
      message
      .save()
      .then((result) => {
        if(result) {
          result
          .populate('userId', 'name email')
          .then((groupRes) => {
            groupRes
            .populate('groupId')
            .then((finalResult) => {
              res.status(200).json({message: MESSAGE_SUCCESSFUL, result: finalResult})
            })
          })
        }
      })
    }
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
}