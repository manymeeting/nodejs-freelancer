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
	
}


module.exports.put = function(pathURL, params, callback)
{
	
}

module.exports.delete = function(pathURL, params, callback)
{
	
}
