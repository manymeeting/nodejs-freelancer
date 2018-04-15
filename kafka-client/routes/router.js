var express = require('express');
var router = express.Router();
var getMessenger = require('../messengers/GETMessenger');
var postMessenger = require('../messengers/POSTMessenger');
var putMessenger = require('../messengers/PUTMessenger');


router.get('/users/:id', getMessenger.sendGET);
router.get('/users/:id/profile', getMessenger.sendGET);
router.post('/users', postMessenger.sendPOST);
router.post('/users/validation', postMessenger.sendPOST);

router.get('/projects', getMessenger.sendGET);
router.get('/projects/:id', getMessenger.sendGET);
router.get('/projects/status/:status', getMessenger.sendGET);
router.get('/projects/bidder/:id', getMessenger.sendGET);
router.get('/projects/publisher/:id', getMessenger.sendGET);
router.get('/projects/:id/bids', getMessenger.sendGET);
router.post('/projects', postMessenger.sendPOST);
router.post('/projects/notification/hire', postMessenger.sendPOST);
router.put('/projects/:id/bids', putMessenger.sendPUT);
router.put('/projects/:id/status/:status', putMessenger.sendPUT);
router.put('/projects/:projectID/hire/:bidID', putMessenger.sendPUT);

router.get('/transactions/users/:id/income', getMessenger.sendGET);
router.get('/transactions/users/:id/expense', getMessenger.sendGET);
router.get('/transactions/users/:id', getMessenger.sendGET);
router.post('/transactions', postMessenger.sendPOST);

module.exports = router;
