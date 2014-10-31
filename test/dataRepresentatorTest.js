var dataRepresentator = require('../dataRepresentator.js').dataRepresentator;
var assert = require('assert');
var test = {};
exports.test = test;

test.format_gives_data_in_specific_format = function(){
	var rows = [ 
		{ title: 'book1', price: 100 },
  		{ title: 'book2', price: 500 }
  	];

	var actual = dataRepresentator.format(rows);
	var expected = { 
			metadata: { x: 'title', y: 'price' },
  			actualdata:[ 
  				{ label: 'book2', value: 500 },
     			{ label: 'book1', value: 100 } 
     		] 
     	};
	assert.deepEqual(actual, expected);
};

test.display_repressents_formatted_data_in_bar_graph = function(){
	var rows = [ 
		{ title: 'book1', price: 100 },
  		{ title: 'book2', price: 500 }
  	];
  	
  	var response = {
  		routeName : null,
  		input : null,
  		render : function(routeName, input) {
	  		this.routeName = routeName;
	  		this.input = input;
	  	}
  	};
	dataRepresentator.display(rows, response);
	var result = { 
		data: { 
			metadata: { x: 'title', y: 'price' },
  			actualdata:[ 
  				{ label: 'book2', value: 500 },
     			{ label: 'book1', value: 100 } 
     		] 
     	}
    };
	assert.equal(response.routeName, 'barGraph');
	assert.deepEqual(response.input, result);
};