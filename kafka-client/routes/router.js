var express = require('express');
var router = express.Router();

router.get('/api_get_user', api_users.getUser);
router.get('/api_get_profile', api_users.getProfile);


module.exports = router;
