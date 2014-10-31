var dataRepresentator = require('./dataRepresentator.js').dataRepresentator;
var con = require('./databaseConnection.js').connect;

var sd = {
  featchingDataFromDatabase : function(req, res){
    var reqBody = req.body;
    var tableName = reqBody['tableName'];
    var xAxisTitle = reqBody['xAxis'];
    var yAxisTitle = reqBody['yAxis'];
    var query = "SELECT " + xAxisTitle + "," + yAxisTitle + " FROM " + tableName;

    return con.connection.query(query, function selectAll(err, rows, fields) {
      if (err) 
          throw err;
      dataRepresentator.display(req, rows, res);
      res.end();
    })
  }
};

exports.sd = sd;