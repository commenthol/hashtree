/*globals suite, test*/

"use strict";

var 
	assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;


suite ('hashTree.get', function (){

	var obj = {
		one:   { a: 1 },
		two:   { b: "bee" },
		three: { c: [ "cee", "C" ] },
		four:  { 4: { obj: null } }
	};

	test ('- find not existing', function (){
		var r;
		r = hashTree.get(obj, "not, there");
		
		assert.deepEqual(r, undefined);
	});

	test ('- find empty', function (){
		var r;
		r = hashTree.get(obj, "");
		
		assert.deepEqual(r, undefined);
	});

	test ('- find undefined', function (){
		var r;
		r = hashTree.get(obj);
		
		assert.deepEqual(r, undefined);
	});

	test ('- find one a', function (){
		var r;
		r = hashTree.get(obj, "one,a");
		
		assert.deepEqual(r, 1);
	});

	test ('- find two b', function (){
		var r;
		r = hashTree.get(obj, "two, b");
		
		assert.deepEqual(r, "bee");
	});

	test ('- find three', function (){
		var r;
		r = hashTree.get(obj, "three");
		
		assert.deepEqual(r, {"c":["cee","C"]});
	});

	test ('- find three c', function (){
		var r;
		r = hashTree.get(obj, "three,c");
		
		assert.deepEqual(r, ["cee","C"]);
	});

	test ('- find non existing leaf', function (){
		var r;
		r = hashTree.get(obj, "three,nix");
		
		assert.deepEqual(r, undefined);
	});

	test ('- find four 4', function (){
		var r;
		r = hashTree.get(obj, "four,4");
		
		assert.deepEqual(r, {"obj":null});
	});

	test ('- find four 4; array notation', function (){
		var r;
		r = hashTree.get(obj, ['four','4']);
		
		assert.deepEqual(r, {"obj":null});
	});

	test ('- find four 4 with bad spacing', function (){
		var r;
		r = hashTree.get(obj, "four ,,   4");
		
		assert.deepEqual(r, {"obj":null});
	});

	suite ('- using reserved keywords', function(){

		var obj = {
			"this": { 
				"constructor": 0,
				"prototype": { "this": 1 }
			}
		};
		
		test ('- find constructor ', function (){
			var r;

			r = hashTree.get(obj, "this, constructor");
			assert.deepEqual(r, 0);
		});

		test ('- find constructor ', function (){
			var r;
			
			r = hashTree.get(obj, "this, prototype, this");
			assert.deepEqual(r, 1);
		});
		
	});
});


suite ('HashTree.get', function (){

	var obj = {
		one:   { a: 1 },
		two:   { b: "bee" },
		three: { c: [ "cee", "C" ] },
		four:  { 4: { obj: null } }
	};
	var ht = new HashTree(obj);

	test ('- find not existing', function (){
		var r = ht.get("not, there");
		
		assert.deepEqual(r, undefined);
	});

	test ('- find empty', function (){
		var r = ht.get("");
		
		assert.deepEqual(r, undefined);
	});

	test ('- find undefined', function (){
		var r = ht.get();
		
		assert.deepEqual(r, undefined);
	});

	test ('- find one a', function (){
		var r = ht.get("one,a");
		
		assert.deepEqual(r, 1);
	});

	test ('- find two b', function (){
		var r = ht.get("two, b");
		
		assert.deepEqual(r, "bee");
	});

	test ('- find three', function (){
		var r = ht.get("three");
		
		assert.deepEqual(r, {"c":["cee","C"]});
	});

	test ('- find three c', function (){
		var r = ht.get("three, c");
		
		assert.deepEqual(r, ["cee","C"]);
	});

	test ('- find non existing leaf', function (){
		var r = ht.get("three,nix");
		
		assert.deepEqual(r, undefined);
	});

	test ('- find four 4', function (){
		var r = ht.get("four, 4");
		
		assert.deepEqual(r, {"obj":null});
	});

	test ('- find four 4; array notation', function (){
		var r = ht.get(['four','4']);
		
		assert.deepEqual(r, {"obj":null});
	});

	test ('- find four 4 with bad spacing', function (){
		var r = ht.get("four ,,   4");
		
		assert.deepEqual(r, {"obj":null});
	});

	suite ('- using reserved keywords', function(){

		var obj = {
			"this": { 
				"constructor": 0,
				"prototype": { "this": 1 }
			}
		};
		var ht = new HashTree(obj);
		
		test ('- find constructor ', function (){
			var r = ht.get("this, constructor");
			
			assert.deepEqual(r, 0);
		});

		test ('- find constructor ', function (){
			var r = ht.get("this, prototype, this");
			
			assert.deepEqual(r, 1);
		});
		
	});
});


suite ('hashTree.set', function (){

	test ('- set on non existing object', function (){
		var obj;
		hashTree.set(obj, 1, "test,test,test");
		
		assert.deepEqual(obj, undefined);
	});

	test ('- set test test test to 0', function (){
		var obj = {};
		hashTree.set(obj, 0, "test,test,test");
		
		assert.deepEqual(obj, {"test":{"test":{"test":0}}});
	});

	test ('- set test test test to ""', function (){
		var obj = {};
		hashTree.set(obj, "", "test,test,test");
		
		assert.deepEqual(obj, {"test":{"test":{"test":""}}});
	});

	test ('- set test test test to {}', function (){
		var obj = {};
		hashTree.set(obj, {}, "test,test,test");
		
		assert.deepEqual(obj, {"test":{"test":{"test":{}}}});
	});

	test ('- overwriting', function (){
		var obj = {};
		hashTree.set(obj, 1, "test,test");
		hashTree.set(obj, 2, "test");
		
		assert.deepEqual(obj, {"test":2});
	});

	test ('- extending', function (){
		var obj = {};
		hashTree.set(obj, 1, "one,test");
		hashTree.set(obj, 2, "two");
		hashTree.set(obj, "3", "three");
		
		assert.deepEqual(obj, {"one":{"test":1},"two":2,"three":"3"});
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

	test ('- set test test test to 0', function (){
		var ht = new HashTree();
		ht.set(0, "test,test,test");
		
		assert.deepEqual(ht.tree(), {"test":{"test":{"test":0}}});
	});

	test ('- set test test test to ""', function (){
		var ht = new HashTree();
		ht.set("", "test,test,test");
		
		assert.deepEqual(ht.tree(), {"test":{"test":{"test":""}}});
	});

	test ('- set test test test to {}', function (){
		var ht = new HashTree();
		ht.set({}, "test,test,test");
		
		assert.deepEqual(ht.tree(), {"test":{"test":{"test":{}}}});
	});

	test ('- overwriting', function (){
		var ht = new HashTree();
		ht.set(1, "test,test");
		ht.set(2, "test");
		
		assert.deepEqual(ht.tree(), {"test":2});
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
