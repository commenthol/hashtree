/*globals describe, it*/

"use strict";

var 
	assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;

describe ('hashTree.setAll', function (){

	describe ('- set all values to 0', function (){
		var obj = { one: { two: { a: 1, b: 2, c: 3 } }, three: 3 };
		hashTree.setAll(obj, "one", 0);
	
		it('- shall return obj', function(){
			assert.deepEqual(obj, { one: { two: { a: 0, b: 0, c: 0 } }, three: 3 });
		});
	});

	describe ('- set leafes to "null"', function (){
		var obj = { one: { two: { a: [ 1, 2 ], b: 2, c: 3 } }, three: 3 };
		hashTree.setAll(obj, "one", null);
	
		it('- shall return obj', function(){
			assert.deepEqual(obj, { one: { two: { a: [1, 2], b: null, c: null } }, three: 3 });
		});
	});

	describe ('- do not set on empty objects', function (){
		var obj = { one: { two: { a: {}, b: {} } } };
		hashTree.setAll(obj, "one", null);
	
		it('- shall return the same', function(){
			assert.deepEqual(obj, { one: { two: { a: {}, b: {} } }});
		});
	});

});
