var mongoUtil = require("../utils/mongoDBUtil");

module.exports.getUser = function (req, res, next) {

	mongoUtil.getMongoConn(function(db, closeConn) {
		var coll = db.collection('users');
		coll.find({}).toArray(function(err, result) {
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
