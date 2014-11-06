var databaseHandler = require('./database/processOnDatabase.js').databaseHandler;
var dataRepresentator = require('./database/dataRepresentator.js').dataRepresentator;
var con = require('./database/databaseConnection.js').connect;

var handler = {
	resultSet : function(req,res){
    	databaseHandler.fetchDataAndDisplay(req, res, con, dataRepresentator);
	},
	home : function(req,res){
    	databaseHandler.getTableNames(req, res, con);
	}
};

exports.handler = handler;