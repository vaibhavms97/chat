require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('../routes/user')
const groupRoutes = require('../routes/group')
const messageRoutes = require('../routes/message')

function initialization() {
  setupCors()
  setupDatabase()
  setupRoutes()
}

initialization()

function setupCors() {
  app.use(cors({origin: true, credentials: true}))
  app.use(express.json())
}

function setupDatabase() {
  mongoose.connect(process.env.DB_STRING, {dbName: 'chat'})
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => {
    console.log(err)
  })
}

function setupRoutes() {
  app.use('/user', userRoutes);
  app.use('/group', groupRoutes);
  app.use('/messages', messageRoutes);
}

module.exports = app