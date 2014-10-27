var rs = require('./processOnResult.js').rs;
var con = require('./databaseConnection.js').connect;

var sd = {
  featchingDataFromDatabase : function(req, res){
    con.connection.connect();

    return con.connection.query('SELECT Book_title,Price FROM bookcatalog', function selectAll(err, rows, fields) {
      if (err) 
          throw err;
      rs.resultset(rows, res);
      res.end();
    })
  }
};

exports.sd = sd;