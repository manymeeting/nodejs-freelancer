var express = require('express');
var router = express.Router();
var getMessenger = require('../messengers/GETMessenger');

router.get('/users/:id', getMessenger.sendGET);
router.get('/users/:id/profile', getMessenger.sendGET);
router.post('/users', getMessenger.sendGET);
router.post('/users/validation', getMessenger.sendGET);

router.get('/projects', getMessenger.sendGET);
router.get('/projects/:id', getMessenger.sendGET);
router.get('/projects/status/:status', getMessenger.sendGET);
router.get('/projects/bidder/:id', getMessenger.sendGET);
router.get('/projects/publisher/:id', getMessenger.sendGET);
// router.post('/projects', api_m_projects.postProject);
// router.post('/projects/notification/hire', api_emails.sendBidHiredEmail);
// router.put('/projects/:id/status/:status', api_m_projects.updateStatus);
// router.put('/projects/:projectID/hire/:bidID', api_m_projects.hireBid);

router.get('/transactions/users/:id/income', getMessenger.sendGET);
router.get('/transactions/users/:id/expense', getMessenger.sendGET);
router.get('/transactions/users/:id', getMessenger.sendGET);
// router.post('/transactions', api_m_transactions.createTransaction);

module.exports = router;
