var express = require('express');
var path = require('path');
var router = express.Router();

var api_m_users = require('../api_mongo/api_users_mongo');
var api_m_projects = require('../api_mongo/api_projects_mongo');
var api_m_transactions = require('../api_mongo/api_transactions_mongo');
var api_emails = require('../api_mongo/api_emails');

// Services on MongoDB
router.get('/users/:id', api_m_users.getUser);
router.get('/users/:id/profile', api_m_users.getProfile);
router.post('/users', api_m_users.createUser);
router.post('/users/validation', api_m_users.validateUser);
router.put('/users/:id', api_m_users.updateUser);
router.put('/users/:id/avatar', api_m_users.updateAvatar);

router.get('/projects', api_m_projects.searchProjects);
router.get('/projects/:id', api_m_projects.getProjectDetails);
router.get('/projects/:id/bids', api_m_projects.getAllBidsOnProject);
router.get('/projects/status/:status', api_m_projects.getAllProjectsOnStatus);
router.get('/projects/bidder/:id', api_m_projects.getAllProjBiddedByUser);
router.get('/projects/publisher/:id', api_m_projects.getAllProjPublishedByUser);
router.post('/projects', api_m_projects.postProject);
router.post('/projects/:id/submission', api_m_projects.postSubmission);
router.post('/projects/notification/hire', api_emails.sendBidHiredEmail);
router.put('/projects/:id/bids', api_m_projects.addBidOnProject);
router.put('/projects/:id/status/:status', api_m_projects.updateStatus);
router.put('/projects/:projectID/hire/:bidID', api_m_projects.hireBid);

router.get('/transactions/users/:id/income', api_m_transactions.getIncomeTransOnUser);
router.get('/transactions/users/:id/expense', api_m_transactions.getExpenseTransOnUser);
router.get('/transactions/users/:id', api_m_transactions.getTransactionsOnUser);
router.post('/transactions', api_m_transactions.createTransaction);
module.exports = router;
