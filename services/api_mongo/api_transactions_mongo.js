var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 


module.exports.getIncomeTransOnUser = function(req, res, next) {
	var transactionsQuery = {
		trans_to: req.params.id
	};

	mongoUtil.getMongoConn(function(db) {
		db.collection('transactions').find(transactionsQuery).toArray(function(err, transactions) {
			if(err)
			{
				throw err;
			}
			console.log(transactions);
			res.type('json');
			res.send(JSON.stringify(transactions));
			
		});
	});
}

module.exports.getExpenseTransOnUser = function(req, res, next) {
	var transactionsQuery = {
		trans_from: req.params.id
	};

	mongoUtil.getMongoConn(function(db) {
		db.collection('transactions').find(transactionsQuery).toArray(function(err, transactions) {
			if(err)
			{
				throw err;
			}
			console.log(transactions);
			res.type('json');
			res.send(JSON.stringify(transactions));
			
		});
	});
}

module.exports.getTransactionsOnUser = function(req, res, next) {
	var transactionsQuery = {
		$or: [ { trans_from: req.params.id }, { trans_to: req.params.id } ]
	};

	mongoUtil.getMongoConn(function(db) {
		db.collection('transactions').find(transactionsQuery).toArray(function(err, transactions) {
			if(err)
			{
				throw err;
			}
			console.log(transactions);
			res.type('json');
			res.send(JSON.stringify(transactions));
			
		});
	});
}

module.exports.createTransaction = function (req, res, next) {
	req.body.transAmount = parseFloat(req.body.transAmount);

	var newTransaction = {
		trans_from: req.body.transFrom,
		trans_to: req.body.transTo,
		trans_amount: req.body.transAmount,
		trans_for_project: req.body.transForProject,
		trans_date: req.body.transDate
	};

	mongoUtil.getMongoConn(function(db) {
		// insert transaction record first so that if errors happen on updating user balances, we have record to track.
		db.collection('transactions').insertOne(newTransaction, function(err, result) {
			if(err)
			{	
				throw err;
			}
			console.log(result.ops);

			// update users balance (send response without waiting)
			if(req.body.transFrom && req.body.transFrom.length > 0) // if withdraw from a real user
			{
				db.collection('users').updateOne({"_id": ObjectId(req.body.transFrom)}, {$inc: { "user_balance" : (0 - req.body.transAmount) }}, function(errUsers, users) {
					if(errUsers)
					{
						throw errUsers;
					}
				});
			}
			if(req.body.transTo && req.body.transTo.length > 0) // if withdraw from a real user
			{
				db.collection('users').updateOne({"_id": ObjectId(req.body.transTo)}, {$inc: { "user_balance" : req.body.transAmount }}, function(errUsers, users) {
					if(errUsers)
					{
						throw errUsers;
					}
				});
			}
			
			res.type('json');
			res.status(201).send(JSON.stringify(result.ops));
			
		});
	});
}