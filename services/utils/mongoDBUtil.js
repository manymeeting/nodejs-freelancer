var config = require('config').mongoDBConfig;
var MongoClient = require('mongodb').MongoClient;
var connURL = config.connectionStr;

// An MongoDB instance
var _mongoDB = null;

module.exports.getMongoConn = function(playWith){
	if(_mongoDB !== null)
	{
		playWith(_mongoDB);
		return;
	}

	MongoClient.connect(connURL, function(err, client){
		if(err)
		{
			throw err;
		}
		_mongoDB = client.db("nodejs-freelancer");
		playWith(_mongoDB);
	});
}
