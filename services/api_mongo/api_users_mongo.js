var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 

module.exports.getUser = function (req, res, next) {
	var userID = req.query.id;
	console.log("user id: " + userID);

	mongoUtil.getMongoConn(function(db, closeConn) {
		var coll = db.collection('users');
		coll.find({"_id": ObjectId(userID)}).toArray(function(err, result) {
			if(err)
			{
				throw err;
			}

			console.log(result);
			res.type('json');
			res.send(JSON.stringify(result));
			closeConn();
		});
		
		return;
	});
}

