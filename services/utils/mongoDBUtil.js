var config = require('config').mongoDBConfig;
var MongoClient = require('mongodb').MongoClient;
var connURL = config.connectionStr;

// An MongoDB instance
var _mongoDB = null;

MongoClient.connect(connURL, function(err, db){
	if(err)
	{
		throw err;
	}
	_mongoDB = db;

});

MongoPool = function(){
	if(MongoPool.instance)
	{
		return MongoPool.instance;
	}
	MongoPool.instance = this;
}

MongoPool.getDB = function(){
	return _mongoDB;
}

module.exports.MongoPool = new MongoPool();