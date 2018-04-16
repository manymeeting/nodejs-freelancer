var fetch = require('node-fetch');
var chai = require('chai');

var project_codes = require('../codes/project_codes');

describe('Test Get All Projects', function () {
  	it('should return all OPEN projects', function () {
	  	fetch('http://localhost:3003/projects/status/open')
	  	.then(res => res.text())
	    .then(body => {
	    	var projects = JSON.parse(body);
	    	for(let i = 0; i < projects.length; i++)
	    	{
	    		chai.expect(projects[i].project_status).to.equal(project_codes.PROJECT_STATUS.OPEN);
	    	}
	    })
	    .catch(err => {
	    	console.log(err);
	    });
  });
  
});

describe('Test Get All Projects Published By User', function () {
	var userID = "5acf043ef36d285dd8f31679";
  	it('should return all projects published by user', function () {
	  	fetch('http://localhost:3003/projects/publisher/' + userID)
	  	.then(res => res.text())
	    .then(body => {
	    	var projects = JSON.parse(body);
	    	for(let i = 0; i < projects.length; i++)
	    	{
	    		chai.expect(projects[i].employer_id).to.equal(userID);
	    	}
	    })
	    .catch(err => {
	    	console.log(err);
	    });
    
  });
  
});


describe('Test Get All Projects Bidded By User', function () {
	var userID = "5acf043ef36d285dd8f31679";
  	it('should return all projects bidded by user', function () {
	  	fetch('http://localhost:3003/projects/bidder/' + userID)
	  	.then(res => res.text())
	    .then(body => {
	    	var data = JSON.parse(body);
	    	for(let i = 0; i < data.length; i++)
	    	{
	    		chai.expect(data[i].bidder_id).to.equal(userID);
	    	}
	    })
	    .catch(err => {
	    	console.log(err);
	    });
    
  });
  
});