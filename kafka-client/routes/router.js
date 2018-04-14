var express = require('express');
var router = express.Router();
var messenger_user = require('../messengers/messenger_user');

router.get('/users/:id', messenger_user.msgGetUser);
// router.get('/users/:id/profile', api_m_users.getProfile);
// router.post('/users', api_m_users.createUser);
// router.post('/users/validation', api_m_users.validateUser);

// router.get('/projects', api_m_projects.searchProjects);
// router.get('/projects/:id', api_m_projects.getProjectDetails);
// router.get('/projects/status/:status', api_m_projects.getAllProjectsOnStatus);
// router.get('/projects/bidder/:id', api_m_projects.getAllProjBiddedByUser);
// router.get('/projects/publisher/:id', api_m_projects.getAllProjPublishedByUser);
// router.post('/projects', api_m_projects.postProject);
// router.post('/projects/notification/hire', api_emails.sendBidHiredEmail);
// router.put('/projects/:id/status/:status', api_m_projects.updateStatus);
// router.put('/projects/:projectID/hire/:bidID', api_m_projects.hireBid);

// router.get('/transactions/users/:id/income', api_m_transactions.getIncomeTransOnUser);
// router.get('/transactions/users/:id/expense', api_m_transactions.getExpenseTransOnUser);
// router.get('/transactions/users/:id', api_m_transactions.getTransactionsOnUser);
// router.post('/transactions', api_m_transactions.createTransaction);

module.exports = router;
