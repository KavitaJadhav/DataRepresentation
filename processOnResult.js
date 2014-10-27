var rs = {};

var Result = function(label, value) {
  var obj = {};
  obj.label = label;
  obj.value = value;
  return obj;
}

rs.resultset = function(rows, response) {
  var keys = Object.keys(rows[0]);
  var labelledValues = [];

  for (var i = rows.length - 1; i >= 0; i--) {
  	labelledValues.push(Result(rows[i][keys[0]], rows[i][keys[1]]));
  };

  var result = {'metadata' : {'x' : keys[0] , 'y' : keys[1]}, 
               'actualdata': labelledValues};
  response.render('barGraph', {data:result});
}

exports.rs = rs;
