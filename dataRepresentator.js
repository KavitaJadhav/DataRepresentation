var dataRepresentator = {};

var createRowWith = function(label, value) {
  var obj = {};
  obj.label = label;
  obj.value = value;
  return obj;
};

dataRepresentator.format = function(rows) {
  var keys = Object.keys(rows[0]);
  var labelledValues = [];

  for (var i = rows.length - 1; i >= 0; i--) {
    labelledValues.push(createRowWith(rows[i][keys[0]], rows[i][keys[1]]));
  };
  return {  'metadata' : {'x' : keys[0] , 'y' : keys[1]}, 
            'actualdata': labelledValues  };
};

dataRepresentator.display = function(request, rows, response) {  
  var graphType = (request.route.path).slice(1).toString();
  if(graphType == 'barGraph')
    response.render(graphType, {data : this.format(rows)});
  else response.render(graphType, {data : this.format(rows).actualdata});
};

exports.dataRepresentator = dataRepresentator;
