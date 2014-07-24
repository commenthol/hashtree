/*globals suite, test*/

"use strict";

var 
	assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;


suite ('hashTree.set', function (){

	suite ('- set on non existing object', function (){
		var obj;
		var r = hashTree.set(obj, "test.test.test", 1);
		
		test('- shall return false', function(){
			assert.equal(r, false);
		});
		test('- shall return undefined', function(){
			assert.deepEqual(obj, undefined);
		});
	});

	suite ('- set test test test to 0', function (){
		var obj = {};
		var r = hashTree.set(obj, "test.test.test", 0);
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(obj, {"test":{"test":{"test":0}}});
		});
	});

	suite ('- set test test test to ""', function (){
		var obj = {};
		var r = hashTree.set(obj, "test.test.test", "");
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(obj, {"test":{"test":{"test":""}}});
		});
	});

	suite ('- set test test test to {}', function (){
		var obj = {};
		var r = hashTree.set(obj, "test.test.test", {});
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(obj, {"test":{"test":{"test":{}}}});
		});
	});

	suite ('- overwriting an object with a value', function (){
		var
			r,
			obj = { test: { test: 1 }};
		r = hashTree.set(obj, "test", 2);
		
		test('- shall return false', function(){
			assert.equal(r, false);	
		});
		
		test('- shall not overwrite the existing leaf', function() {
			assert.deepEqual(obj, {"test": { "test": 1 } });
		});
	});

	suite ('- overwriting a value', function (){
		var
			r,
			obj = { test: 2 };
		r = hashTree.set(obj, "test.test", 1);
		
		test('- shall return false', function(){
			assert.equal(r, false);	
		});
		
		test('- shall not overwrite the existing value', function() {
			assert.deepEqual(obj, {"test":2});
		});
	});

	suite ('- overwriting an object with an array', function (){
		var
			r,
			obj = { test: { test: [ 1 ] }};
		r = hashTree.set(obj, "test", [ 1, 2 ]);
		
		test('- shall return true', function(){
			assert.equal(r, true);	
		});
		
		test('- shall overwrite the existing leaf', function() {
			assert.deepEqual(obj, { "test": [ 1, 2 ] } );
		});
	});

	suite ('- overwriting an object with an object', function (){
		var
			r,
			obj = { test: { test: 1 }};
		r = hashTree.set(obj, "test", { "overwrite": 1 });
		
		test('- shall return true', function(){
			assert.equal(r, true);	
		});
		
		test('- shall not overwrite the existing leaf', function() {
			assert.deepEqual(obj, {"test":{"overwrite":1}});
		});
	});

	suite ('- overwriting an null object with an object', function (){
		var
			r,
			obj = { test: { test: null }};
		r = hashTree.set(obj, "test .test", { "overwrite": 1 });
		
		test('- shall return true', function(){
			assert.equal(r, true);	
		});
		
		test('- shall not overwrite the existing leaf', function() {
			assert.deepEqual(obj, {"test":{"test":{"overwrite":1}}});
		});
	});

	suite ('- overwriting an empty object with an object', function (){
		var
			r,
			obj = { test: { test: {} }};
		r = hashTree.set(obj, "test .test", { "overwrite": 1 });
		
		test('- shall return true', function(){
			assert.equal(r, true);	
		});
		
		test('- shall not overwrite the existing leaf', function() {
			assert.deepEqual(obj, {"test":{"test":{"overwrite":1}}});
		});
	});

	suite ('- setting a new value', function (){
		var
			r,
			obj = { test: 2 };
		r = hashTree.set(obj, "test", 1);

		test('- shall return true', function(){
			assert.equal(r, true);	
		});
		
		test('- shall set the new value', function() {
			assert.deepEqual(obj, {"test": 1});
		});
	});
	
	test ('- extending', function (){
		var obj = {};
		hashTree.set(obj, "one.test", 1);
		hashTree.set(obj, "one.zero", 0);
		hashTree.set(obj, "two", 2);
		hashTree.set(obj, "three", "3");
		
		assert.deepEqual(obj, {"one":{"test":1, "zero":0},"two":2,"three":"3"});
	});

	test ('- extending; array notation', function (){
		var obj = {};
		hashTree.set(obj, ['one','test'], 1);
		hashTree.set(obj, ['two', 'next', 'again'], 2);
		hashTree.set(obj, ['three', 'is a string'], "3");
		
		assert.deepEqual(obj, {"one":{"test":1},"two":{"next":{"again":2}},"three":{"is a string":"3"}});
	});

	test ('- set false', function (){
		var obj = {};
		hashTree.set(obj, "one.test", false);
		
		assert.deepEqual(obj, { one: { test: false }});
	});

	test ('- set undefined', function (){
		var obj = {};
		hashTree.set(obj, "one.test", undefined);
		
		assert.deepEqual(obj, {});
	});

	test ('- set value using reserved keywords', function (){
		var r;
		var obj = {
			"this": {}
		};
		hashTree.set(obj, "this.constructor", 1);
		hashTree.set(obj, "this.prototype", "a");
		assert.deepEqual(obj, {"this":{"constructor":1,"prototype":"a"}});
	});

	test ('- set value using reserved keywords', function (){
		var r;
		var obj = {};
		hashTree.set(obj, [ 1, 5, 9 ], '#1');
		hashTree.set(obj, [ 1, 5, 9, 0 ], '#2');
		r = hashTree.get(obj, [ 1, 5, 9, 0 ] );

		assert.deepEqual(obj, {"1":{"5":{"9":"#1"}}});
		assert.deepEqual(r, undefined);
	});
});


suite ('HashTree.set', function (){

	suite ('- set test test test to 0', function (){
		var ht = new HashTree();
		var r = ht.set("test.test.test", 0);
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(ht.tree(), {"test":{"test":{"test":0}}});
		});
	});

	suite ('- set test test test to ""', function (){
		var ht = new HashTree();
		var r = ht.set("test.test.test", "");
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(ht.tree(), {"test":{"test":{"test":""}}});
		});
	});

	test ('- set test test test to {}', function (){
		var ht = new HashTree();
		var r = ht.set("test.test.test", {});
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(ht.tree(), {"test":{"test":{"test":{}}}});
		});
	});

	test ('- overwriting', function (){
		var ht = new HashTree();
		ht.set("test,test", 1);
		var r = ht.set("test", 2);
		
		test('- shall return false', function(){
			assert.equal(r, false);
		});
		test('- shall not overwrite', function(){
			assert.deepEqual(ht.tree(), {"test":{"test":1}});
		});
	});

	test ('- extending', function (){
		var ht = new HashTree();
		ht.set("one.test", 1);
		ht.set("two", 2);
		ht.set("three", "3");
		
		assert.deepEqual(ht.tree(), {"one":{"test":1},"two":2,"three":"3"});
	});

	test ('- extending; array notation', function (){
		var ht = new HashTree();
		ht.set(['one','test'], 1);
		ht.set(['two', 'next', 'again'], 2);
		ht.set(['three', 'is a string'], "3");
		
		assert.deepEqual(ht.tree(), {"one":{"test":1},"two":{"next":{"again":2}},"three":{"is a string":"3"}});
	});

	test ('- set false', function (){
		var ht = new HashTree();
		ht.set("one.test", false);
		
		assert.deepEqual(ht.tree(), { one: { test: false }});
	});

	test ('- delete and set', function (){
		var ht = new HashTree({ "one": 1 });
		
		ht.delete();
		ht.set("two", 2);
		
		assert.deepEqual(ht.tree(), { two: 2 });
	});

	test ('- set undefined', function (){
		var ht = new HashTree();
		ht.set("one.test", undefined);
		
		assert.deepEqual(ht.tree(), {});
	});

	test ('- set value using reserved keywords', function (){
		var obj = {"this": {}};
		var ht = new HashTree(obj);
		
		ht.set("this.constructor", 1);
		ht.set("this.prototype", "a");
		assert.deepEqual(ht.tree(), {"this":{"constructor":1,"prototype":"a"}});
	});

});

