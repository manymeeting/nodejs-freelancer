var express = require('express');
var router = express.Router();
var messenger_user = require('../messengers/messenger_user');

router.get('/api_get_user', messenger_user.msg_get_user);

module.exports = router;
