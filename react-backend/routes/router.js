var express = require('express');
var router = express.Router();
var api_users = require('../api/api_users');
var api_projects = require('../api/api_projects');

router.get('/api_getuser', api_users.getUser);
router.post('/api_auth_user', api_users.validateUser);
router.put('/api_add_user', api_users.addUser);

router.get('/api_get_all_open_proj', api_projects.getAllOpenProjects);
router.get('/api_get_project_details', api_projects.getProjectDetails);
router.get('/api_get_all_bids_on_proj', api_projects.getAllBidsOnProject);
router.get('/api_get_ave_bid_price_on_proj', api_projects.getAveBidPriceOnProject);
module.exports = router;
