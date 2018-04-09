var fetch = require('node-fetch');
var config = require('config');

var pathPrefix = config.services.url;

module.exports.get = function(pathURL, params, callback)
{
	var queryStr = "?";
	var paramKeys = Object.keys(params);
	paramKeys.forEach(function(key) {
		queryStr += (key + "=" + params[key] + (key === paramKeys[paramKeys.length-1] ? "" : "&"));
	});

	fetch(pathPrefix + pathURL + queryStr, {
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
