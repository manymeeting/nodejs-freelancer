var fetch = require('node-fetch');
var chai = require('chai');

describe('Test Get User', function () {
	var userID = "5ac840ba734d1d2fb542b360";
  	it('should return user information', function () {
	  	fetch('http://localhost:3003/users/' + userID)
	  	.then(res => res.text())
	    .then(body => {
	    	var userInfo = JSON.parse(body);
	    	chai.expect(userInfo._id).to.equal(userID);
	    	
	    })
	    .catch(err => {
	    	console.log(err);
	    });
  });
  
});


