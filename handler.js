var databaseHandler = require('./processOnDatabase.js').databaseHandler;
var dataRepresentator = require('./dataRepresentator.js').dataRepresentator;
var con = require('./databaseConnection.js').connect;

var handler = {
	resultSet : function(req,res){
    	databaseHandler.fetchDataAndDisplay(req, res, con, dataRepresentator);
	}
};

exports.handler = handler;