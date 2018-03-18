var config = require('config');
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : config.get('dbConfig.connectionLimit'),
  host            : config.get('dbConfig.host'),
  user            : config.get('dbConfig.user'),
  password        : config.get('dbConfig.password'),
  database        : config.get('dbConfig.user')
});

module.exports.query = function(sql, options, callback){  
    pool.getConnection(function(err, conn){  
        if(err){  
            callback(err, null, null);  
        }else{  
            conn.query(sql, options, function(err, results, fields){
                // release connection
                conn.release(); 
                callback(err, results, fields); 
            });  
        }  
    });  
};

module.exports.getDBPool = function () {
    return pool;
}


module.exports.handleError = function(err) {
	if(err)
	{
	 	console.log(err);
	  	throw err;
	}
}


module.exports.getDBName = function()
{
	return config.get('dbConfig.user');
}