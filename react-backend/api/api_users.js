var dbUtil = require('../utils/dbutil');
var authUtil = require('../utils/authUtil');


const TABLE_NAME = ' ' + dbUtil.getDBName() + ".users" + ' ';

module.exports.getUser = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	
	connection.query('SELECT * from ' + TABLE_NAME + ' where id = ? ',[1] , function(err, rows, fields) {
	  dbUtil.handleError(connection, err);

	  console.log('The result is: ', rows[0].name);
	  result.name = rows[0].name;
	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});
}

module.exports.validateUser = function (req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	var connection = dbUtil.getDBConnection();

	connection.query('SELECT * FROM  ' + TABLE_NAME + '  WHERE email = ? and password = ? ',[email, password] , function(err, rows, fields) {
	   dbUtil.handleError(connection, err);

	  if(!rows.length > 0)
	  {
	  	res.status(404).send("Invalid User");
	  	connection.end();
	  	return;
	  }
	  console.log('The validated user is: ', rows[0].name);

	  var result = {};
	  result.name = rows[0].name;
	  result.id = rows[0].id;

	  // validation passed, send jwt back to client
	  var token = authUtil.generateToken({
	  	user: {
	  		id: result.id
	  	}
	  });

	  result.token = token;

	  res.type('json');
	  res.send(JSON.stringify(result));
	  connection.end();
	  return;
	});
}


module.exports.addUser = function (req, res, next) {
	var userData = {
		email: "",
		password: "",
		username: "",
		avatarurl: "",
		phone: "",
		about: "",
		skills: ""
	};

	userData = Object.assign(userData, req.body);

	var connection = dbUtil.getDBConnection();
	var result = {};
	connection.query('INSERT INTO ' + TABLE_NAME + '(name, email, password, avatarurl, phone, about, skills) VALUES(?, ?, ?, ?, ?, ?, ?) ',
		[userData.email, userData.password, userData.username, userData.avatarurl, userData.phone, userData.about, userData.skills] , 
		function(err, rows, fields) {
		  dbUtil.handleError(connection, err);
		  
		  console.log('The result is: ', rows[0]);
		  result = rows[0];
		  res.type('json');
		  res.send(JSON.stringify(result));
		  connection.end();
		  return;
	});

	connection.end();
}



