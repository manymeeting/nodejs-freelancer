var dbUtil = require('../utils/dbutil');
var authUtil = require('../utils/authUtil');
var project_codes = require('../codes/project_codes');

const TABLE_PROJCETS = ' ' + dbUtil.getDBName() + ".projects" + ' ';
const TABLE_USERS = ' ' + dbUtil.getDBName() + ".users" + ' ';

module.exports.getAllOpenProjects = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	var queryStr = 
		' select * from' + TABLE_PROJCETS + 
		' left join' + TABLE_USERS + 'on projects.employer_id = users.id ' +
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