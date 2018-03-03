var express = require('express');
var router = express.Router();
var api_users = require('../api/api_users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api_getuser', api_users.getUser);


module.exports = router;
