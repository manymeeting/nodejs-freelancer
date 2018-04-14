var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 
var bcrypt = require('bcryptjs');

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

module.exports.createUser = function(req, res, next) {

	var newUser = {
		user_name: req.body.userName,
		user_email: req.body.userEmail,
		user_password: req.body.userPassword,
		user_avatarurl: req.body.userAvatarURL,
		user_balance: 0
	};

	var salt = bcrypt.genSaltSync(10);
	newUser.user_password = bcrypt.hashSync(newUser.user_password, salt);

	mongoUtil.getMongoConn(function(db) {
		db.collection('users').insertOne(newUser, function(err, result) {
			if(err)
			{
				throw err;
			}
			console.log(result.ops);
			res.type('json');
			res.status(201).send(JSON.stringify(result.ops));
			
		});
	});
}
