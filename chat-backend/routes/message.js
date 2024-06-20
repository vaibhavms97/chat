const express = require('express');
const { sendMessage, getAllMessages } = require('../controller/message.controller');
const router = express.Router();

router.post('/sendMessage', sendMessage)

router.get('/getMessages', getAllMessages)

module.exports = router;