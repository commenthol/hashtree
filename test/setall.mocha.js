/*globals suite, test*/

"use strict";

var 
	assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;

suite ('hashTree.setAll', function (){

	suite ('- set all values to 0', function (){
		var obj = { one: { two: { a: 1, b: 2, c: 3 } }, three: 3 };
		hashTree.setAll(obj, "one", 0);
	
		test('- shall return obj', function(){
			assert.deepEqual(obj, { one: { two: { a: 0, b: 0, c: 0 } }, three: 3 });
		});
	});

	suite ('- set leafes to "null"', function (){
		var obj = { one: { two: { a: [ 1, 2 ], b: 2, c: 3 } }, three: 3 };
		hashTree.setAll(obj, "one", null);
	
		test('- shall return obj', function(){
			assert.deepEqual(obj, { one: { two: { a: [1, 2], b: null, c: null } }, three: 3 });
		});
	});

	suite ('- do not set on empty objects', function (){
		var obj = { one: { two: { a: {}, b: {} } } };
		hashTree.setAll(obj, "one", null);
	
		test('- shall return the same', function(){
			assert.deepEqual(obj, { one: { two: { a: {}, b: {} } }});
		});
	});

});
