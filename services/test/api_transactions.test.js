var fetch = require('node-fetch');
var chai = require('chai');

describe('Test Get All Income Transactions On User', function () {
	var userID = "5ad3a6362883911d573d7cea";
  	it('should return all income transactions on project', function () {
	  	fetch('http://localhost:3003/transactions/users/' + userID + '/income')
	  	.then(res => res.text())
	    .then(body => {
	    	var transactions = JSON.parse(body);
	    	for(let i = 0; i < transactions.length; i++)
	    	{
	    		chai.expect(transactions[i].trans_to).to.equal(userID);
	    	}
	    })
	    .catch(err => {
	    	console.log(err);
	    });
  });
  
});


