/*globals suite, test*/

"use strict";

var 
	assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;

suite ('hashTree.clear', function (){

	test ('- clear with keys', function (){
		var obj = { one: { two: { three: 3 } } };
		hashTree.clear(obj, "one, two");
		
		assert.deepEqual(obj, { one: { two: {} } });
	});

	test ('- clear without keys', function (){
		var obj = { one: { two: { three: 3 } } };
		hashTree.clear(obj);
		
		assert.deepEqual(obj, { one: { two: { three: 3 } } });
	});

	test ('- clear non existing keys', function (){
		var obj = { one: { two: { three: 3 } } };
		hashTree.clear(obj, "two, three");
		
		assert.deepEqual(obj, { one: { two: { three: 3 } } });
	});

	test ('- clear object with "0"', function (){
		var obj = { one: { two: 0 } };
		hashTree.clear(obj, "one, two");
		
		assert.deepEqual(obj, { one: { two: {} } });
	});

	test ('- clear object with ""', function (){
		var obj = { one: { two: "" } };
		hashTree.clear(obj, "one, two");
		
		assert.deepEqual(obj, { one: { two: {} } });
	});

	test ('- set on non existing object', function (){
		var obj;
		hashTree.clear(obj);
		
		assert.deepEqual(obj, undefined);
	});

});

suite ('HashTree.clear', function (){

	test ('- clear with keys', function (){
		var obj = { one: { two: { three: 3 } } };
		var ht = new HashTree(obj);
		ht.clear("one, two");
		
		assert.deepEqual(ht.tree(), { one: { two: {} } });
	});

	test ('- clear without keys', function (){
		var obj = { one: { two: { three: 3 } } };
		var ht = new HashTree(obj);
		ht.clear();
		
		assert.deepEqual(ht.tree(), {});
	});

	test ('- clear non existing keys', function (){
		var obj = { one: { two: { three: 3 } } };
		var ht = new HashTree(obj);
		ht.clear("two, three");
		
		assert.deepEqual(ht.tree(), { one: { two: { three: 3 } } });
	});

	test ('- clear object with "0"', function (){
		var obj = { one: { two: 0 } };
		var ht = new HashTree(obj);
		ht.clear("one, two");
		
		assert.deepEqual(ht.tree(), { one: { two: {} } });
	});

	test ('- clear object with ""', function (){
		var obj = { one: { two: "" } };
		var ht = new HashTree(obj);
		ht.clear("one, two");
		
		assert.deepEqual(ht.tree(), { one: { two: {} } });
	});

});
