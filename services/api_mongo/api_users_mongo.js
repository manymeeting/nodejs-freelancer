var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 
var passport = require('passport');
var authUtil = require('../utils/authUtil');
var bcrypt = require('bcryptjs');

module.exports.validateUser = function (req, res, next) 
{
	
	passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Login Failed',
                user   : user
            });
        }
		req.login(user, {session: false}, (err) => {
            if (err) {
            	res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            var token = authUtil.generateToken({
			 	user: {
			 		_id: user._id.toString()
			 	}
			});
            var result = {token: token};
           return res.json(result);
        });
    })(req, res, next);
}

module.exports.getUser = function (req, res, next) {
	var userID = req.params.id;
	console.log("user id: " + userID);

	mongoUtil.getMongoConn(function(db) {
		var coll = db.collection('users');
		coll.findOne({"_id": ObjectId(userID)}, function(err, result) {
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
		coll.findOne({"_id": ObjectId(userID)}, {fields: {user_name: 1, user_email: 1, user_avatarurl: 1, 
				user_phone: 1, user_about: 1, user_skills: 1, user_balance: 1 }}, function(err, result) {
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

module.exports.updateUser = function(req, res, next) {
	var userQuery = {
		"_id": ObjectId(req.params.id),
	};
	var modifiedUser = {
		$set: { 
			"user_name": req.body.userName,
			"user_email": req.body.userEmail,
			"user_phone": req.body.userPhone,
			"user_about": req.body.userAbout,
			"user_skills": req.body.userSkills
		}
	}
	mongoUtil.getMongoConn(function(db) {
		db.collection('users').updateOne(userQuery, modifiedUser, function(err, result) {
			if(err)
			{
				throw err;
			}
			res.type('json');
			res.send(JSON.stringify(result));
		});
	});
}

module.exports.updateAvatar = function(req, res, next) {
	var userQuery = {
		"_id": ObjectId(req.params.id),
	};
	var modifiedUser = {
		$set: { 
			"user_avatarurl": req.body.userAvatarURL
		}
	}
	mongoUtil.getMongoConn(function(db) {
		db.collection('users').updateOne(userQuery, modifiedUser, function(err, result) {
			if(err)
			{
				throw err;
			}
			res.type('json');
			res.send(JSON.stringify(result));
		});
	});
}