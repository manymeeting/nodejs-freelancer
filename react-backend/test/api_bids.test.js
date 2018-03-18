var fetch = require('node-fetch');
var chai = require('chai');

var api_bids = require('../api/api_bids');

describe('Test Get All Bids On Project', function () {
	var projectID = 2;
	var employerID = 1;
  	it('should return all bids on project', function () {
	  	fetch('http://localhost:3001/api_get_all_bids_on_proj?id=' + projectID)
	  	.then(res => res.text())
	    .then(body => {
	    	var bids = JSON.parse(body);
	    	for(let i = 0; i < bids.length; i++)
	    	{
	    		chai.expect(bids[i].employer_id).to.equal(employerID);
	    	}
	    })
	    .catch(err => {
	    	console.log(err);
	    });
  });
  
});


