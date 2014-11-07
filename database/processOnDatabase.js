var databaseHandler = {};
exports.databaseHandler = databaseHandler;

databaseHandler.fetchDataAndDisplay = function(request, response, con, dataRepresentator){
  var query = this.formQuery(request.body);

  return con.connection.query(query, function(err, rows, fields) {
    if (err) 
        throw err;
    dataRepresentator.display(request, rows, response);
    response.end();
  });
};

databaseHandler.formQuery = function(reqBody) {
  var tableName = reqBody['tableName'];
  var xAxisTitle = reqBody['xAxis'];
  var yAxisTitle = reqBody['yAxis'];
  return "SELECT " + xAxisTitle + "," + yAxisTitle + " FROM " + tableName + ";";
};

databaseHandler.fetchDataAndDisplayForBubbleChart = function(request, response, con, dataRepresentator){
  var query = "SELECT " + request.body.desc + "," + request.body.xAxis + "," + request.body.yAxis +
           "," + request.body.circleR + " FROM " + request.body.tableName + ";"; 

  return con.connection.query(query, function(err, rows, fields) {
    if (err) 
        throw err;
    dataRepresentator.display(request, rows, response);
    response.end();
  });
};