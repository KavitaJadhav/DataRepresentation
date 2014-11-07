var databaseHandler = require('./database/processOnDatabase.js').databaseHandler;
var dataRepresentator = require('./database/dataRepresentator.js').dataRepresentator;
var con = require('./database/databaseConnection.js').connect;

var handler = {
	resultSet : function(req,res){
    	databaseHandler.fetchDataAndDisplay(req, res, con, dataRepresentator);
	},
	home : function(req,res){
    	databaseHandler.getTableNames(req, res, con);
    },
	bubbleGraphResultSet : function(req, res) {
		databaseHandler.fetchDataAndDisplayForBubbleChart(req, res, con, dataRepresentator);
	},
	multiBarGraphResultSet : function(req, res) {
		databaseHandler.fetchDataAndDisplayForMultiBarChart(req, res, con, dataRepresentator);
	}
};

exports.handler = handler;