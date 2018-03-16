var dbUtil = require('../utils/dbutil');
var authUtil = require('../utils/authUtil');


const TABLE_NAME = ' ' + dbUtil.getDBName() + ".users" + ' ';

module.exports.validateUser = function (req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	var connection = dbUtil.getDBConnection();

	connection.query('SELECT * FROM  ' + TABLE_NAME + '  WHERE user_email = ? and user_password = ? ',[email, password] , function(err, rows, fields) {
	   dbUtil.handleError(connection, err);

	  if(!rows.length > 0)
	  {
	  	res.status(404).send("Invalid User");
	  	connection.end();
	  	return;
	  }

	  console.log('The validated user is: ', rows[0].user_name);

	  var result = {};
	  result.user_name = rows[0].user_name;
	  result.user_id = rows[0].user_id;

	  // validation passed, send jwt back to client
	  var token = authUtil.generateToken({
	  	user: {
	  		user_id: result.user_id
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
	connection.query('INSERT INTO ' + TABLE_NAME + '(user_name, user_email, user_password, user_avatarurl, user_phone, user_about, user_skills) VALUES(?, ?, ?, ?, ?, ?, ?) ',
		[userData.username, userData.email, userData.password, userData.avatarurl, userData.phone, userData.about, userData.skills] , 
		function(err, rows, fields) {
		  dbUtil.handleError(connection, err);
		  res.type('json');
		  result = {status: "success"};
		  res.send(JSON.stringify(result));
		  connection.end();
		  return;
	});
}



