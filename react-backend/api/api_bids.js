var dbUtil = require('../utils/dbutil');
var authUtil = require('../utils/authUtil');

const TABLE_PROJCETS = ' ' + dbUtil.getDBName() + ".projects" + ' ';
const TABLE_USERS = ' ' + dbUtil.getDBName() + ".users" + ' ';
const TABLE_BIDS = ' ' + dbUtil.getDBName() + ".bids" + ' ';

module.exports.getAllBidsOnProject = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	var projectID = req.query.id;
	var queryStr = 
		' select bids.bid_id, bids.bidder_id, bids.bid_period, bids.bid_date, bids.bid_price, users.user_name, users.user_avatarurl from' + TABLE_BIDS + 
		' left join' + TABLE_USERS + 'on bids.bidder_id = users.user_id ' + 
		' where bids.project_id = ?';
	
	console.log(queryStr);
	connection.query(queryStr,[projectID], function(err, rows, fields) {
	  dbUtil.handleError(connection, err);

	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});
}


module.exports.getAveBidPriceOnProject = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	var projectID = req.query.id;
	var queryStr = 
		' select avg(bids.bid_price) as avg_bid_price from' + TABLE_BIDS + 
		' left join' + TABLE_PROJCETS + 'on bids.project_id = projects.id ' + 
		' group by projects.id'
		' where projects.id = ?';
	
	console.log(queryStr);
	connection.query(queryStr,[projectID], function(err, rows, fields) {
	  dbUtil.handleError(connection, err);

	  result = rows[0];
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});
}

