var config = require('config');

module.exports.getDBConnection = function () {
    var mysql      = require('mysql');

    dbConfig = {};
    dbConfig.host = config.get('dbConfig.host');
    dbConfig.user = config.get('dbConfig.user');
    dbConfig.password = config.get('dbConfig.password');

	var connection = mysql.createConnection(dbConfig);

	connection.on('error', function(err) {
	 	console.log("[mysql error]",err);
	});

	connection.connect();
	
	return connection;
}


module.exports.handleError = function(conn, err) {
	if(err)
	{
		conn.end();
	  	console.log(err);
	  	throw err;
	}
}


module.exports.getDBName = function()
{
	return config.get('dbConfig.user');
}