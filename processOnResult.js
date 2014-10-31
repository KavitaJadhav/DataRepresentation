var rs = {};

var Result = function(label, value) {
  var obj = {};
  obj.label = label;
  obj.value = value;
  return obj;
}

rs.resultset = function(req, response, rows) {
  var keys = Object.keys(rows[0]);
  var labelledValues = [];

  for (var i = rows.length - 1; i >= 0; i--) {
  	labelledValues.push(Result(rows[i][keys[0]], rows[i][keys[1]]));
  };

  var result = {'metadata' : {'x' : keys[0] , 'y' : keys[1]}, 
               'actualdata': labelledValues};
  var graphType = (req.route.path).slice(1).toString();
  if(graphType == 'barGraph')
    response.render(graphType, {data:result});
  else response.render(graphType, {data:result.actualdata});
}

exports.rs = rs;
