const mongoose = require('mongoose');
const { GROUP_CREATED_SUCCESSFUL, GROUP_ALREADY_EXISTS, GROUP_NOT_CREATED, GROUP_JOINED_SUCCESSFUL } = require('../constants/constants');
const Group = require('../models/group.model')

exports.createGroup = async (req, res) => {
  try {
    const data = req.body;
    Group.findOne({name: data.name})
    .exec()
    .then(async (result) => {
      if(result === null) {
        const newGroup = new Group({
          name: data.name,
          created_by: data.id,
          created_at: new Date(),
          users: [data.id],
          messages: []
        })
        newGroup.save()
        .then((data) => {
          return res.status(200).json({
            message: GROUP_CREATED_SUCCESSFUL,
            id: data._id,
          })
        })
      } else {
        return res.status(400).json({
          message: GROUP_ALREADY_EXISTS
        })
      }
    })
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
}

exports.fetchGroups = async (req,res) => {
  try {
    const userId = req.query.id
    Group.find({users: new mongoose.Types.ObjectId(userId)})
    .exec()
    .then((result) => {
      if(result.length) {
        res.status(200).json({groups: result})
      } else {
        res.status(400).json({
          message: GROUP_NOT_CREATED
        })
      }
    })
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
}

exports.joinGroup = async (req, res) => {
  try {
    const data = req.body
    Group.findOneAndUpdate({name: req.body.name.toLowerCase()},{$push: {users: req.body.id}})
    .exec()
    .then((result) => {
      if(result) {
        res.status(200).json({
          message: GROUP_JOINED_SUCCESSFUL,
        })
      }
    })
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
}