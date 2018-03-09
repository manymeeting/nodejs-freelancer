var dbUtil = require('../utils/dbutil');
var authUtil = require('../utils/authUtil');

module.exports.getUser = function (req, res, next) {
	var connection = dbUtil.getDBConnection();

	var result = {};
	connection.query('SELECT * from cmpefreelancer.users where id = ? ',[1] , function(err, rows, fields) {
	  if (err) {
	  	connection.end();
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
}

module.exports.validateUser = function (req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	var connection = dbUtil.getDBConnection();
	console.log(req.body);
	connection.query('SELECT * FROM cmpefreelancer.users WHERE email = ? and password = ? ',[email, password] , function(err, rows, fields) {
	  if (err) throw err;

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
		skill: "",
		avatarurl: "",
		phone: "",
		about: "",
		skills: ""
	};

	userData = Object.assign(userData, req.body);

	var connection = dbUtil.getDBConnection();
	var result = {};
	

	connection.end();
}


