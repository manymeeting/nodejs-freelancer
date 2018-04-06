var fetch = require('node-fetch');
var chai = require('chai');

var project_codes = require('../codes/project_codes');
var api_projects = require('../api/api_projects');

describe('Test Get All Projects', function () {
  	it('should return all OPEN projects', function () {
	  	fetch('http://localhost:3001/api_get_all_open_proj')
	  	.then(res => res.text())
	    .then(body => {
	    	var projects = JSON.parse(body);
	    	for(let i = 0; i < projects.length; i++)
	    	{
	    		chai.expect(projects[i].status).to.equal(project_codes.PROJECT_STATUS.OPEN);
	    	}
	    })
	    .catch(err => {
	    	console.log(err);
	    });
  });
  
});

describe('Test Get All Projects Published By User', function () {
	var userID = 1;
  	it('should return all projects published by user', function () {
	  	fetch('http://localhost:3001/api_get_all_proj_published_by_user?id=' + userID)
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
	var userID = 1;
  	it('should return all projects bidded by user', function () {
	  	fetch('http://localhost:3001/api_get_all_proj_bidded_by_user?id=' + userID)
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