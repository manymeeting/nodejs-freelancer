var fetch = require('node-fetch');
var config = require('config');

var pathPrefix = config.services.url;

module.exports.get = function(pathURL, callback)
{
	fetch(pathPrefix + pathURL, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		.then(res => res.json())
	    .then(body => {
	    	console.log(body);
	    	callback(body);	
	    })
	    .catch(err => {
	    	console.log("ServiceProxy[ERROR]: " + err);
	    });
}


module.exports.post = function(pathURL, params, callback)
{
	fetch(pathPrefix + pathURL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		})
		.then(res => res.json())
		.then(body => {
	    	console.log(body);
	    	callback(body);	
	    })
	    .catch(err => {
	    	console.log("ServiceProxy[ERROR]: " + err);
	    });
}


module.exports.put = function(pathURL, params, callback)
{
	fetch(pathPrefix + pathURL, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		})
		.then(res => res.json())
		.then(body => {
	    	console.log(body);
	    	callback(body);	
	    })
	    .catch(err => {
	    	console.log("ServiceProxy[ERROR]: " + err);
	    });	
}

module.exports.delete = function(pathURL, params, callback)
{
	fetch(pathPrefix + pathURL, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(params)
		})
		.then(res => res.json())
		.then(body => {
	    	console.log(body);
	    	callback(body);	
	    })
	    .catch(err => {
	    	console.log("ServiceProxy[ERROR]: " + err);
	    });
}
