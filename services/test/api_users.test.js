var fetch = require('node-fetch');
var chai = require('chai');

var project_codes = require('../codes/project_codes');
var api_users = require('../api/api_users');

describe('Test Get User', function () {
	var userID = 1;
  	it('should return user information', function () {
	  	fetch('http://localhost:3001/api_get_user?id=' + userID)
	  	.then(res => res.text())
	    .then(body => {
	    	var userInfo = JSON.parse(body);
	    	chai.expect(userInfo.user_id).to.equal(userID);
	    	
	    })
	    .catch(err => {
	    	console.log(err);
	    });
  });
  
});


