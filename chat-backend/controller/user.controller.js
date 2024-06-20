const { USER_ALREADY_EXISTS, USER_CREATED_SUCCESSFUL, USER_LOGGED_SUCCESSFUL, BAD_CREDENTIALS } = require('../constants/constants');
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.userSignUp = async(req, res) => {
  try {
    const data = req.body;
    User.findOne({email: data.email})
    .exec()
    .then(async (result) => {
      if(result === null) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({
          name: data.name,
          password: hashedPassword,
          email: data.email,
          created_on: new Date()
        })
        newUser.save()
        .then((data) => {
          return res.status(200).json({
            message: USER_CREATED_SUCCESSFUL,
            id: data._id,
          })
        })
      } else {
        return res.status(400).json({
          message: USER_ALREADY_EXISTS
        })
      }
    })
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
}

exports.userLogin = async(req, res) => {
  try {
    const data = req.body
    User.findOne({email: data.email})
    .exec()
    .then(async (result) => {
      if(result !== null) {
        const userDetails = result
        const isValidPassword = await bcrypt.compare(data.password, userDetails.password)
        if(isValidPassword) {
          return res.status(200).json({
            message: USER_LOGGED_SUCCESSFUL,
            id: userDetails._id
          })
        } else {
          res.status(400).json({
            message: BAD_CREDENTIALS
          })
        }
      } else {
        res.status(401).json({
          message: BAD_CREDENTIALS
        })
      }
    })
  } catch(err) {
    return res.status(500).json({
      error: err
    })
  }
}

