/*globals describe, it*/

"use strict";

var assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;

describe ('hashTree.delete', function (){

	it ('- delete with one key', function (){
		var obj = { one: { two: { three: 3 } }, four: 4 };
		hashTree.delete(obj, "one");
		
		assert.deepEqual(obj, { four: 4 });
	});

	it ('- delete with keys', function (){
		var obj = { one: { two: { three: 3 } } };
		hashTree.delete(obj, "one.two");
		
		assert.deepEqual(obj, { one: {} });
	});

	it ('- delete without keys', function (){
		var obj = { one: { two: { three: 3 } } };
		hashTree.delete(obj);
		
		assert.deepEqual(obj, { one: { two: { three: 3 } } });
	});

	it ('- delete non existing keys', function (){
		var obj = { one: { two: { three: 3 } } };
		hashTree.delete(obj, "two.three");
		
		assert.deepEqual(obj, { one: { two: { three: 3 } } });
	});

	it ('- delete object with "0"', function (){
		var obj = { one: { two: 0 } };
		hashTree.delete(obj, "one.two");
		
		assert.deepEqual(obj, { one: {} });
	});

	it ('- delete object with ""', function (){
		var obj = { one: { two: "" } };
		hashTree.delete(obj, "one.two");
		
		assert.deepEqual(obj, { one: {} });
	});

	it ('- set on non existing object', function (){
		var obj;
		hashTree.delete(obj);
		
		assert.deepEqual(obj, undefined);
	});

});

describe ('HashTree.delete', function (){

	it ('- delete with one key', function (){
		var obj = { one: { two: { three: 3 } }, four: 4 };
		var ht = new HashTree(obj);
		ht.delete("one");
		
		assert.deepEqual(ht.tree(), { four: 4 });
	});

	it ('- delete with keys', function (){
		var obj = { one: { two: { three: 3 } } };
		var ht = new HashTree(obj);
		ht.delete("one.two");
		
		assert.deepEqual(ht.tree(), { one: {} });
	});

	it ('- delete without keys', function (){
		var obj = { one: { two: { three: 3 } } };
		var ht = new HashTree(obj);
		ht.delete();
		
		assert.deepEqual(ht.tree(), {});
	});

	it ('- delete non existing keys', function (){
		var obj = { one: { two: { three: 3 } } };
		var ht = new HashTree(obj);
		ht.delete("two.three");
		
		assert.deepEqual(ht.tree(), { one: { two: { three: 3 } } });
	});

	it ('- delete object with "0"', function (){
		var obj = { one: { two: 0 } };
		var ht = new HashTree(obj);
		ht.delete("one.two");
		
		assert.deepEqual(ht.tree(), { one: {} });
	});

	it ('- delete object with ""', function (){
		var obj = { one: { two: "" } };
		var ht = new HashTree(obj);
		ht.delete("one.two");
		
		assert.deepEqual(ht.tree(), { one: {} });
	});

});
