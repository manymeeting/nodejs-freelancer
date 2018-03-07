var dbUtil = require('../utils/dbutil');

module.exports.getUser = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	connection.query('SELECT * from cmpefreelancer.users where id = ? ',[1] , function(err, rows, fields) {
	  if (err) {
	  	console.log(err);
	  	throw err;	
	  }
	  console.log('The result is: ', rows[0].name);
	  result.name = rows[0].name;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});

	connection.end();
}

module.exports.validateUser = function (req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	var connection = dbUtil.getDBConnection();
	var result = {};
	connection.query('SELECT * FROM cmpefreelancer.users WHERE email = ? and password = ? ',[email, password] , function(err, rows, fields) {
	  if (err) throw err;
	  console.log('The result is: ', rows[0].name);
	  result.name = rows[0].name;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});

	connection.end();
}




