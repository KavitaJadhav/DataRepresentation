var mysql = require('mysql'); 

var connect = {
	connection : mysql.createConnection({
		host     : 'localhost',
		user     : 'pallavi',
		password : 'password',
		database : 'test'
	})
};

exports.connect = connect;
