var mysql = require('mysql'); 

var connect = {
	connection : mysql.createConnection({
		host     : 'localhost',
		user     : 'shital',
		password : 'password',
		database : 'test'
	})
};

exports.connect = connect;
