/*globals suite, test*/

"use strict";

var 
	assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;

function sortDesc(a, b) {
	return (a > b) ? -1 : ( a == b ? 0 : 1);
}

suite ('hashTree.sort', function (){

	test ('- sort empty object', function (){
		
		var obj = {};
		var result = hashTree.sort(obj);
		var expected = {};
		
		assert.equal(JSON.stringify(result), JSON.stringify(expected));
		
	});

	test ('- sort object', function (){
		
		var obj = {
			"z":{"zz":3,"zm":2,"za":1},
			"a":{"am":2,"aa":1,"az":3},
			"m":{"mm":2,"mz":3,"ma":1}
		};
		var result = hashTree.sort(obj);
		var expected = {
			"a": {"aa":1,"am":2,"az":3},
			"m": {"ma":1,"mm":2,"mz":3},
			"z": {"za":1,"zm":2,"zz":3}
		};
		
		assert.equal(JSON.stringify(result), JSON.stringify(expected));
	});

	test ('- sort object with custom sorter', function (){
		
		var obj = { 
			"z": { "az": 3, "am": 2, "aa": 1 },
			"a": { "am": 2, "aa": 1, "az": 3 },
			"m": { "am": 2, "az": 3, "aa": 1 } 
		};
		
		var result = hashTree.sort(obj, sortDesc);
		var expected = {
			"z":{"az":3,"am":2,"aa":1},
			"m":{"az":3,"am":2,"aa":1},
			"a":{"az":3,"am":2,"aa":1}
		};
		
		assert.equal(JSON.stringify(result), JSON.stringify(expected));
	});

	test ('- sort HashTree with custom sorter', function (){
		
		var obj = { 
			"z": { "az": 3, "am": 2, "aa": 1 },
			"a": { "am": 2, "aa": 1, "az": 3 },
			"m": { "am": 2, "az": 3, "aa": 1 } 
		};
		var ht = new HashTree(obj);
		
		ht.sort(sortDesc);
		
		var expected = {
			"z":{"az":3,"am":2,"aa":1},
			"m":{"az":3,"am":2,"aa":1},
			"a":{"az":3,"am":2,"aa":1}
		};
		
		assert.equal(JSON.stringify(ht.tree()), JSON.stringify(expected));
	});

});
