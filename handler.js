var sd = require('./processOnDatabase.js').sd;

var handler = {
	resultSet : function(req,res){
    	sd.featchingDataFromDatabase(req,res);
	}
};

exports.handler = handler;