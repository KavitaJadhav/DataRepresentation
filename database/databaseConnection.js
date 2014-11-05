var mysql = require('mysql'); 

var connect = {
	connection : mysql.createConnection({
		host     : 'localhost',
		user     : 'data_rep',
		password : 'password',
		database : 'test'
	})
};

exports.connect = connect;