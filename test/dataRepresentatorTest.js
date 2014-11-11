var dataRepresentator = require('../database/dataRepresentator.js').dataRepresentator;
var assert = require('assert');
var test = {};
exports.test = test;

var rows = [ 
  { title: 'book1', price: 100 },
  { title: 'book2', price: 500 }
];

var expected = {
  data: {
    metadata: { x: 'title', y: 'price' },
    actualdata:[ 
      { label: 'book2', value: 500 },
      { label: 'book1', value: 100 } 
    ]
  }
};

var response = {
  routeName : null,
  input : null,
  render : function(routeName, input) {
    this.routeName = routeName;
      this.input = input;
  }
};

var tearDown = function() {
  response = {
    routeName : null,
    input : null,
    render : function(routeName, input) {
      this.routeName = routeName;
        this.input = input;
    }
  }
};

var createRequest = function(givenPath) {
  return {
    route : {
      path : givenPath
    }
  }
};

test.format_gives_data_in_specific_format = function(){
	var actual = dataRepresentator.format(rows);
	assert.deepEqual(actual, expected.data);
};

test.display_repressents_formatted_data_in_bar_graph = function(){
  var request = createRequest("/barGraph")

	dataRepresentator.display(request, rows, response);

	assert.equal(response.routeName, 'barGraph');
	assert.deepEqual(response.input, expected);

  tearDown();
};

test.display_repressents_formatted_data_in_pie_chart = function(){
  var request = createRequest("/pieChart");

  dataRepresentator.display(request, rows, response);

  assert.equal(response.routeName, 'pieChart');
  assert.deepEqual(response.input, {data: expected.data.actualdata});

  tearDown();
};