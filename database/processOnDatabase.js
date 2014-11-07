var databaseHandler = {};
exports.databaseHandler = databaseHandler;

databaseHandler.fetchDataAndDisplay = function(request, response, con, dataRepresentator) {
  var query = this.formQuery(request.body);

  return con.connection.query(query, function(err, rows, fields) {
    if (err) 
        throw err;
    dataRepresentator.display(request, rows, response);
    response.end();
  });
};

databaseHandler.getColumnsForTablesAndRenderHomePage = function(table_names, tableWithColumns, response, con) {
  table_names.forEach(function(element, index) {
    var table_name = element['table_name'];
    var columns = [];
    con.connection.query("show columns from "+ table_name + ";", function(err, rows, fields){
      columns = rows.map(function(element) { return element['Field']; });
      tableWithColumns.push({"table_name": table_name, "columns": columns});
      if(tableWithColumns.length == table_names.length){
        console.log(tableWithColumns);
        response.render('home', {'tableWithColumns':tableWithColumns});        
      }
    });
  });
};

databaseHandler.getTableNames = function(request, response, con) {
  var tableWithColumns = [];
  con.connection.query("select table_name from information_schema.tables where table_schema = 'test';", function(err, rows, fields){
    var table_names = rows;
    databaseHandler.getColumnsForTablesAndRenderHomePage(table_names, tableWithColumns, response, con)
  });
};

databaseHandler.formQuery = function(reqBody) {
  var tableName = reqBody['tableName'];
  var xAxisTitle = reqBody['xAxis'];
  var yAxisTitle = reqBody['yAxis'];
  return "SELECT " + xAxisTitle + "," + yAxisTitle + " FROM " + tableName + ";";
};

databaseHandler.fetchDataAndDisplayForBubbleChart = function(request, response, con, dataRepresentator){
  var query = "SELECT " + request.body.xAxis + "," + request.body.yAxis +
           "," + request.body.desc + " FROM " + request.body.tableName + ";"; 

  return con.connection.query(query, function(err, rows, fields) {
    if (err) 
        throw err;
    dataRepresentator.display(request, rows, response);
    response.end();
  });
};