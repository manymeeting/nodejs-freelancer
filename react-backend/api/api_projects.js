var dbUtil = require('../utils/dbutil');
var authUtil = require('../utils/authUtil');
var project_codes = require('../codes/project_codes');

const TABLE_PROJCETS = ' ' + dbUtil.getDBName() + ".projects" + ' ';
const TABLE_USERS = ' ' + dbUtil.getDBName() + ".users" + ' ';
const TABLE_BIDS = ' ' + dbUtil.getDBName() + ".bids" + ' ';

module.exports.getAllOpenProjects = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' left join' + TABLE_USERS + 'on projects.employer_id = users.user_id ' +
		' where projects.status = ?' +
		' order by projects.published_date desc';
	
	console.log(queryStr);
	connection.query(queryStr,[project_codes.PROJECT_STATUS.OPEN], function(err, rows, fields) {
	  dbUtil.handleError(connection, err);

	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});
}

module.exports.getProjectDetails = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	var projectID = req.query.id;
	console.log("projectID: " + projectID);
	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' left join' + TABLE_USERS + 'on projects.employer_id = users.user_id ' +
		' where projects.project_id = ?';
	
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

module.exports.getAllProjBiddedByUser = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	var userID = req.query.id;

	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' left join' + TABLE_BIDS + 'on projects.project_id = bids.project_id ' +
		' where bids.bidder_id = ?';
	
	console.log(queryStr);
	connection.query(queryStr,[userID], function(err, rows, fields) {
	  dbUtil.handleError(connection, err);

	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});
}

module.exports.getAllProjPublishedByUser = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	var userID = req.query.id;

	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' where projects.employer_id = ?';
	
	console.log(queryStr);
	connection.query(queryStr,[userID], function(err, rows, fields) {
	  dbUtil.handleError(connection, err);

	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});
}

module.exports.postProject = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var params = {
		projectName: "",
		employerID: "",
		projectDescription: "",
		projectSkills: "",
		budgeRange: "",
		publishedDate: "",
		status: project_codes.PROJECT_STATUS.OPEN
	};

	params = Object.assign(params, req.body);
	var queryStr = 
		'insert into ' + TABLE_PROJCETS +
		'(project_name, employer_id, project_description, project_skills, budget_range, published_date, status)' + 
		'values(?,?,?,?,?,?,?)';
	
	console.log(queryStr);
	connection.query(queryStr,[params.projectName, params.employerID, params.projectDescription, params.projectSkills, params.budgeRange, params.publishedDate, params.status], function(err, results, fields) {
	  dbUtil.handleError(connection, err);
	  
	  res.type('json');
	  res.send(JSON.stringify({insertID: results.insertId}));
	  connection.end();
	  return;
	});
}

module.exports.hireBid = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	var params = {
		projectID: "",
		bidID: ""
	}
	params = Object.assign(params, req.body);

	var queryStr = 
		' update' + TABLE_PROJCETS + 
		' set hired_bid_id = ?, status = ?' +
		' where projects.project_id = ?';
	
	console.log(queryStr);
	connection.query(queryStr,[params.bidID, project_codes.PROJECT_STATUS.STARTED, params.projectID], function(err, rows, fields) {
	  dbUtil.handleError(connection, err);

	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});
}