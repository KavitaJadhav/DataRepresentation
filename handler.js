var databaseHandler = require('./database/processOnDatabase.js').databaseHandler;
var dataRepresentator = require('./database/dataRepresentator.js').dataRepresentator;
var con = require('./database/databaseConnection.js').connect;

var handler = {
	resultSet : function(req,res){
    	databaseHandler.fetchDataAndDisplay(req, res, con, dataRepresentator);
	}
};

exports.handler = handler;