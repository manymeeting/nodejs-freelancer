var express = require('express');
var router = express.Router();
var api_users = require('../api/api_users');
var api_projects = require('../api/api_projects');
var api_bids = require('../api/api_bids');

router.post('/api_auth_user', api_users.validateUser);
router.put('/api_add_user', api_users.addUser);

router.get('/api_get_all_open_proj', api_projects.getAllOpenProjects);
router.get('/api_get_project_details', api_projects.getProjectDetails);
router.get('/api_get_all_proj_bidded_by_user', api_projects.getAllProjBiddedByUser);
router.get('/api_get_all_proj_published_by_user', api_projects.getAllProjPublishedByUser);

router.get('/api_get_all_bids_on_proj', api_bids.getAllBidsOnProject);
router.get('/api_get_ave_bid_price_on_proj', api_bids.getAveBidPriceOnProject);


module.exports = router;
