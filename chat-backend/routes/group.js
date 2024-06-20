const express = require('express');
const { createGroup, fetchGroups, joinGroup } = require('../controller/group.controller');
const router = express.Router();

router.post('/createGroup', createGroup)

router.get('/groupList', fetchGroups)

router.post('/joinGroup', joinGroup)

module.exports = router;