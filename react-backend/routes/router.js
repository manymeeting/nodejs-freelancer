var express = require('express');
var router = express.Router();
var api_users = require('../api/api_users');

router.get('/api_getuser', api_users.getUser);
router.post('/api_auth_user', api_users.validateUser);
router.put('/api_add_user', api_users.addUser);


module.exports = router;
