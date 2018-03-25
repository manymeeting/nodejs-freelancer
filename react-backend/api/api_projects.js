var dbUtil = require('../utils/dbutil');
var authUtil = require('../utils/authUtil');
var project_codes = require('../codes/project_codes');

const TABLE_PROJCETS = ' ' + dbUtil.getDBName() + ".projects" + ' ';
const TABLE_USERS = ' ' + dbUtil.getDBName() + ".users" + ' ';
const TABLE_BIDS = ' ' + dbUtil.getDBName() + ".bids" + ' ';

module.exports.getAllOpenProjects = function (req, res, next) {

	var result = {};
	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' left join' + TABLE_USERS + 'on projects.employer_id = users.user_id ' +
		' where projects.status = ?' +
		' order by projects.published_date desc';
	
	console.log(queryStr);
	dbUtil.query(queryStr,[project_codes.PROJECT_STATUS.OPEN], function(err, rows, fields) {
	  dbUtil.handleError(err);
	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  
	  return;
	});
}

module.exports.getProjectDetails = function (req, res, next) {
	
	var result = {};
	var projectID = req.query.id;
	console.log("projectID: " + projectID);
	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' left join' + TABLE_USERS + 'on projects.employer_id = users.user_id ' +
		' where projects.project_id = ?';
	
	console.log(queryStr);
	dbUtil.query(queryStr,[projectID], function(err, rows, fields) {
	  dbUtil.handleError(err);

	  result = rows[0];
	  res.type('json');
	  res.send(JSON.stringify(result));
	  
	  return;
	});
}

module.exports.getAllProjBiddedByUser = function (req, res, next) {
	

	var result = {};
	var userID = req.query.id;

	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' left join' + TABLE_BIDS + 'on projects.project_id = bids.project_id ' +
		' where bids.bidder_id = ?';
	
	console.log(queryStr);
	dbUtil.query(queryStr,[userID], function(err, rows, fields) {
	  dbUtil.handleError(err);

	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  
	  return;
	});
}

module.exports.getAllProjPublishedByUser = function (req, res, next) {
	
	var result = {};
	var userID = req.query.id;

	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' where projects.employer_id = ?';
	
	console.log(queryStr);
	dbUtil.query(queryStr,[userID], function(err, rows, fields) {
	  dbUtil.handleError(err);

	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  
	  return;
	});
}

module.exports.postProject = function (req, res, next) {
	
	var params = {
		projectName: "",
		employerID: "",
		projectDescription: "",
		projectSkills: "",
		budgetRange: "",
		publishedDate: "",
		status: project_codes.PROJECT_STATUS.OPEN
	};

	params = Object.assign(params, req.body);
	var queryStr = 
		'insert into ' + TABLE_PROJCETS +
		'(project_name, employer_id, project_description, project_skills, budget_range, published_date, status)' + 
		'values(?,?,?,?,?,?,?)';
	
	console.log(queryStr);
	dbUtil.query(queryStr,[params.projectName, params.employerID, params.projectDescription, params.projectSkills, params.budgetRange, params.publishedDate, params.status], function(err, results, fields) {
	  dbUtil.handleError(err);
	  
	  res.type('json');
	  res.send(JSON.stringify({insertID: results.insertId}));
	  
	  return;
	});
}

module.exports.hireBid = function (req, res, next) {
	
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
	dbUtil.query(queryStr,[params.bidID, project_codes.PROJECT_STATUS.STARTED, params.projectID], function(err, rows, fields) {
	  dbUtil.handleError(err);
	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  
	  return;
	});
}


module.exports.updateProjectAveBidPrice = function (req, res, next) {
	
	var projectID = req.body.id;
	var result = {};
	var queryStr = 
		'update ' + TABLE_PROJCETS +
		'set avg_bid_price = ' + 
		' (select avg(bids.bid_price) from ' + TABLE_BIDS + 
		' where bids.project_id = ?' +
		' group by bids.project_id) ' +   T 
		'where projects.project_id = ?';
	
	console.log(queryStr);
	dbUtil.query(queryStr,[projectID, projectID], function(err, rows, fields) {
	  dbUtil.handleError(err);
	  result = rows;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  
	  return;
	});
}
