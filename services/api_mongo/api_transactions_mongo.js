var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 

module.exports.createTransaction = function (req, res, next) {
	var newTransaction = {
		trans_from: req.body.transFrom,
		trans_to: req.body.transTo,
		trans_amount: req.body.transAmount,
		trans_for_project: req.body.transForProject,
		trans_date: req.body.transDate
	};

	mongoUtil.getMongoConn(function(db) {
		db.collection('transactions').insertOne(newTransaction, function(err, result) {
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