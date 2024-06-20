const express = require('express');
const { userLogin, userSignUp } = require('../controller/user.controller');
const router = express.Router();

router.post('/login', userLogin)

router.post('/signUp', userSignUp)

module.exports = router;