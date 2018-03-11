var express = require('express');
var router = express.Router();
var api_users = require('../api/api_users');
var api_projects = require('../api/api_projects');

router.get('/api_getuser', api_users.getUser);
router.post('/api_auth_user', api_users.validateUser);
router.put('/api_add_user', api_users.addUser);

router.get('/api_get_all_open_proj', api_projects.getAllOpenProjects);
module.exports = router;
