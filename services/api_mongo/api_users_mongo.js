var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 

module.exports.getUser = function (req, res, next) {
	var userID = req.params.id;
	console.log("user id: " + userID);

	mongoUtil.getMongoConn(function(db) {
		var coll = db.collection('users');
		coll.find({"_id": ObjectId(userID)}).toArray(function(err, result) {
			if(err)
			{
				throw err;
			}

			console.log(result);
			res.type('json');
			res.send(JSON.stringify(result));
		});
	});
}


module.exports.getProfile = function (req, res, next) {
	var userID = req.params.id;
	console.log("user id: " + userID);

	mongoUtil.getMongoConn(function(db) {
		var coll = db.collection('users');
		coll.find({"_id": ObjectId(userID)}, {fields: {user_name: 1, user_email: 1, user_avatarurl: 1, 
				user_phone: 1, user_about: 1, user_skills: 1, user_balance: 1 }})
			.toArray(function(err, result) {
			if(err)
			{
				throw err;
			}

			console.log(result);
			res.type('json');
			res.send(JSON.stringify(result));
		});

	});
}

