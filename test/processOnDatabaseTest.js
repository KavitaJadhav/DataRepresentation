var databaseHandler = require('../database/processOnDatabase.js').databaseHandler;
var assert = require('assert');
var test = {};
exports.test = test;

var request = {
	body: {
		tableName: 'student',
		xAxis: 'name',
		yAxis: 'percentage'
	}
};
var getStubResponse = function() {
	return {
		endCalled: false,
		end: function() {
			this.endCalled = true;
		}
	};
};
var rows = [ 
  { title: 'book1', price: 100 },
  { title: 'book2', price: 500 }
];
var getStubConnection = function() {
	return {
		connection: {
			query: function(sqlQuery, callbackFunction) {
				callbackFunction(null, rows, {})
			}
		}
	};
};
var getStubDataRepresentator = function() {
		return {
		isDisplayCalled: false,
		rows : null,
		display: function(request, rows, response) {
			this.isDisplayCalled = true;
			this.rows = rows;
		}
	};
};

test.databaseHandler_forms_correct_query_considering_the_user_request = function() {
	var expected = "SELECT name,percentage FROM student;";

	var actual = databaseHandler.formQuery(request.body);

	assert.equal(expected, actual);
};

test.databaseHandler_gives_data_based_on_query_to_dataRepresentator = function() {
	var dataRepresentator = getStubDataRepresentator();
	var response = getStubResponse();

	databaseHandler.fetchDataAndDisplay(request, response, getStubConnection(), dataRepresentator);

	assert.equal(dataRepresentator.isDisplayCalled, true);
	assert.deepEqual(dataRepresentator.rows, rows);
};

test.databaseHandler_ends_response = function() {
	var dataRepresentator = getStubDataRepresentator();
	var response = getStubResponse();

	databaseHandler.fetchDataAndDisplay(request, response, getStubConnection(), dataRepresentator);
	assert.equal(response.endCalled, true);
};