var express = require('express');
var path = require('path');
var router = express.Router();
var api_users = require('../api/api_users');
var api_projects = require('../api/api_projects');
var api_bids = require('../api/api_bids');

var api_m_users = require('../api_mongo/api_users_mongo');
var api_m_projects = require('../api_mongo/api_projects_mongo');
var api_m_transactions = require('../api_mongo/api_transactions_mongo');
var api_emails = require('../api_mongo/api_emails');


var multer = require('multer');
var upload = multer({ dest: path.join(__dirname, '../public/avatars/') })

// Services on MySQL
router.get('/api_get_user', api_users.getUser);
router.get('/api_get_profile', api_users.getProfile);
router.post('/api_auth_user', api_users.validateUser);
router.post('/api_update_user', api_users.updateUser);
router.put('/api_add_user', api_users.addUser);
router.post('/api_update_avatar', upload.single('file'), api_users.updateAvatar);

router.get('/api_get_all_open_proj', api_projects.getAllOpenProjects);
router.get('/api_get_project_details', api_projects.getProjectDetails);
router.get('/api_get_all_proj_bidded_by_user', api_projects.getAllProjBiddedByUser);
router.get('/api_get_all_proj_published_by_user', api_projects.getAllProjPublishedByUser);
router.put('/api_add_project', api_projects.postProject);
router.post('/api_hire_bid', api_projects.hireBid);

router.get('/api_get_all_bids_on_proj', api_bids.getAllBidsOnProject);
router.get('/api_get_ave_bid_price_on_proj', api_bids.getAveBidPriceOnProject);
router.put('/api_add_bid_on_proj', api_bids.addBidOnProject);

// Services on MongoDB
router.get('/users/:id', api_m_users.getUser);
router.get('/users/:id/profile', api_m_users.getProfile);
router.post('/users', api_m_users.createUser);
router.post('/users/validation', api_m_users.validateUser);

router.get('/projects', api_m_projects.searchProjects);
router.get('/projects/:id', api_m_projects.getProjectDetails);
router.get('/projects/:id/bids', api_m_projects.getAllBidsOnProject);
router.get('/projects/status/:status', api_m_projects.getAllProjectsOnStatus);
router.get('/projects/bidder/:id', api_m_projects.getAllProjBiddedByUser);
router.get('/projects/publisher/:id', api_m_projects.getAllProjPublishedByUser);
router.post('/projects', api_m_projects.postProject);
router.post('/projects/notification/hire', api_emails.sendBidHiredEmail);
router.put('/projects/:id/status/:status', api_m_projects.updateStatus);
router.put('/projects/:projectID/hire/:bidID', api_m_projects.hireBid);

router.get('/transactions/users/:id/income', api_m_transactions.getIncomeTransOnUser);
router.get('/transactions/users/:id/expense', api_m_transactions.getExpenseTransOnUser);
router.get('/transactions/users/:id', api_m_transactions.getTransactionsOnUser);
router.post('/transactions', api_m_transactions.createTransaction);
module.exports = router;
