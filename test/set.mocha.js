/*globals suite, test*/

"use strict";

var 
	assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;


suite ('hashTree.set', function (){

	suite ('- set on non existing object', function (){
		var obj;
		var r = hashTree.set(obj, 1, "test,test,test");
		
		test('- shall return false', function(){
			assert.equal(r, false);
		});
		test('- shall return undefined', function(){
			assert.deepEqual(obj, undefined);
		});
	});

	suite ('- set test test test to 0', function (){
		var obj = {};
		var r = hashTree.set(obj, 0, "test,test,test");
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(obj, {"test":{"test":{"test":0}}});
		});
	});

	suite ('- set test test test to ""', function (){
		var obj = {};
		var r = hashTree.set(obj, "", "test,test,test");
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(obj, {"test":{"test":{"test":""}}});
		});
	});

	suite ('- set test test test to {}', function (){
		var obj = {};
		var r = hashTree.set(obj, {}, "test,test,test");
		
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
		r = hashTree.set(obj, 2, "test");
		
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
		r = hashTree.set(obj, 1, "test,test");
		
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
		r = hashTree.set(obj, [ 1, 2 ], "test");
		
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
			obj = {};
		r = hashTree.set(obj, 1, "test, test");
		r = hashTree.set(obj, { "overwrite": 1 }, "test");
		
		test('- shall return true', function(){
			assert.equal(r, true);	
		});
		
		test('- shall not overwrite the existing leaf', function() {
			assert.deepEqual(obj, {"test":{"overwrite":1}});
		});
	});

	suite ('- setting a new value', function (){
		var
			r,
			obj = { test: 2 };
		r = hashTree.set(obj, 1, "test");

		test('- shall return true', function(){
			assert.equal(r, true);	
		});
		
		test('- shall set the new value', function() {
			assert.deepEqual(obj, {"test": 1});
		});
	});
	
	test ('- extending', function (){
		var obj = {};
		hashTree.set(obj, 1, "one,test");
		hashTree.set(obj, 0, "one,zero");
		hashTree.set(obj, 2, "two");
		hashTree.set(obj, "3", "three");
		
		assert.deepEqual(obj, {"one":{"test":1, "zero":0},"two":2,"three":"3"});
	});

	test ('- extending; array notation', function (){
		var obj = {};
		hashTree.set(obj, 1, ['one','test']);
		hashTree.set(obj, 2, ['two', 'next', 'again']);
		hashTree.set(obj, "3", ['three', 'is a string']);
		
		assert.deepEqual(obj, {"one":{"test":1},"two":{"next":{"again":2}},"three":{"is a string":"3"}});
	});

	test ('- set false', function (){
		var obj = {};
		hashTree.set(obj, false, "one,test");
		
		assert.deepEqual(obj, { one: { test: false }});
	});

	test ('- set undefined', function (){
		var obj = {};
		hashTree.set(obj, undefined, "one,test");
		
		assert.deepEqual(obj, {});
	});

	test ('- set value using reserved keywords', function (){
		var r;
		var obj = {
			"this": {}
		};
		hashTree.set(obj, 1, "this, constructor");
		hashTree.set(obj, "a", "this, prototype");
		assert.deepEqual(obj, {"this":{"constructor":1,"prototype":"a"}});
	});
});


suite ('HashTree.set', function (){

	suite ('- set test test test to 0', function (){
		var ht = new HashTree();
		var r = ht.set(0, "test,test,test");
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(ht.tree(), {"test":{"test":{"test":0}}});
		});
	});

	suite ('- set test test test to ""', function (){
		var ht = new HashTree();
		var r = ht.set("", "test,test,test");
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(ht.tree(), {"test":{"test":{"test":""}}});
		});
	});

	test ('- set test test test to {}', function (){
		var ht = new HashTree();
		var r = ht.set({}, "test,test,test");
		
		test('- shall return true', function(){
			assert.equal(r, true);
		});
		test('- shall return obj', function(){
			assert.deepEqual(ht.tree(), {"test":{"test":{"test":{}}}});
		});
	});

	test ('- overwriting', function (){
		var ht = new HashTree();
		ht.set(1, "test,test");
		var r = ht.set(2, "test");
		
		test('- shall return false', function(){
			assert.equal(r, false);
		});
		test('- shall not overwrite', function(){
			assert.deepEqual(ht.tree(), {"test":{"test":1}});
		});
	});

	test ('- extending', function (){
		var ht = new HashTree();
		ht.set(1, "one,test");
		ht.set(2, "two");
		ht.set("3", "three");
		
		assert.deepEqual(ht.tree(), {"one":{"test":1},"two":2,"three":"3"});
	});

	test ('- extending; array notation', function (){
		var ht = new HashTree();
		ht.set(1, ['one','test']);
		ht.set(2, ['two', 'next', 'again']);
		ht.set("3", ['three', 'is a string']);
		
		assert.deepEqual(ht.tree(), {"one":{"test":1},"two":{"next":{"again":2}},"three":{"is a string":"3"}});
	});

	test ('- set false', function (){
		var ht = new HashTree();
		ht.set(false, "one,test");
		
		assert.deepEqual(ht.tree(), { one: { test: false }});
	});

	test ('- clear and set', function (){
		var ht = new HashTree({ "one": 1 });
		
		ht.clear();
		ht.set(2, "two");
		
		assert.deepEqual(ht.tree(), { two: 2 });
	});

	test ('- set undefined', function (){
		var ht = new HashTree();
		ht.set(undefined, "one,test");
		
		assert.deepEqual(ht.tree(), {});
	});

	test ('- set value using reserved keywords', function (){
		var obj = {"this": {}};
		var ht = new HashTree(obj);
		
		ht.set(1, "this, constructor");
		ht.set("a", "this, prototype");
		assert.deepEqual(ht.tree(), {"this":{"constructor":1,"prototype":"a"}});
	});

});

