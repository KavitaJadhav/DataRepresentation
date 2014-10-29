var rs = require('./processOnResult.js').rs;
var con = require('./databaseConnection.js').connect;

var sd = {
  featchingDataFromDatabase : function(reqBody, res){
    var tableName = reqBody['tableName'];
    var xAxisTitle = reqBody['xAxis'];
    var yAxisTitle = reqBody['yAxis'];
    var query = "SELECT " + xAxisTitle + "," + yAxisTitle + " FROM " + tableName;

    return con.connection.query(query, function selectAll(err, rows, fields) {
      if (err) 
          throw err;
      rs.resultset(rows, res);
      res.end();
    })
  }
};

exports.sd = sd;