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

  rows.forEach(function (row) {
    labelledValues.push(createRowWith(row[keys[0]], row[keys[1]]));
  });
  return {  'metadata' : {'x' : keys[0] , 'y' : keys[1]}, 
            'actualdata': labelledValues  };
};

var createRowForBubbleChart = function(desc, xAxis, yAxis, circleR) {
  var obj = {};
  obj.desc = desc;
  obj.xAxis = xAxis;
  obj.yAxis = yAxis;
  obj.circleR = circleR;
  return obj;
};

dataRepresentator.formatForBubbleGraph = function(rows) {
  var keys = Object.keys(rows[0]);
  var labelledValues = [];

  rows.forEach(function (row) {
    labelledValues.push(createRowForBubbleChart(row[keys[0]], row[keys[1]], row[keys[2]], row[keys[3]]));
  });

  return {  'metadata' : {'desc' : keys[0] , 'xAxis' : keys[1], 'yAxis' : keys[2], 'circleR' : keys[3] }, 
            'actualdata': labelledValues  };
};

var createRowForMultiBarChart = function(value1, value2, value3, value4) {
  var obj = {};
  obj.value1 = value1.toString();
  obj.value2 = value2;
  obj.value3 = value3;
  obj.value4 = value4;
  return obj;
};

dataRepresentator.formatForMultiBarGraph = function(rows) {
  var keys = Object.keys(rows[0]);
  var labelledValues = [];

  rows.forEach(function (row) {
    labelledValues.push(createRowForMultiBarChart(row[keys[0]], row[keys[1]], row[keys[2]], row[keys[3]]));
  });

  return {  'metadata' : {'label1' : keys[0] , 'label2' : keys[1], 'label3' : keys[2], 'label4' : keys[3] }, 
            'actualdata': labelledValues  };
};

dataRepresentator.display = function(request, rows, response) {  
  var graphType = (request.route.path).slice(1).toString();
  if(graphType == 'bubbleGraph')
    response.render(graphType, {data : this.formatForBubbleGraph(rows)});

  if(graphType == 'multiBarGraph')
    response.render(graphType, {data : this.formatForMultiBarGraph(rows)});
  
  response.render(graphType, {data : this.format(rows)});
};

exports.dataRepresentator = dataRepresentator;