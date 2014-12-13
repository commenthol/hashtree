/*globals describe, it*/

"use strict";

var assert = require('assert'),
	hashTree = require('../hashtree.js').hashTree,
	HashTree = require('../hashtree.js').HashTree;

describe ('hashTree.get', function (){

	var obj = {
		one:   { a: 1 },
		two:   { b: "bee" },
		three: { c: [ "cee", "C" ] },
		four:  { 4: { obj: null } }
	};

	it ('- find not existing', function (){
		var r;
		r = hashTree.get(obj, "not.there");
		
		assert.deepEqual(r, undefined);
	});

	it ('- find empty', function (){
		var r;
		r = hashTree.get(obj, "");
		
		assert.deepEqual(r, undefined);
	});

	it ('- find undefined', function (){
		var r;
		r = hashTree.get(obj);
		
		assert.deepEqual(r, obj);
	});

	it ('- find one a', function (){
		var r;
		r = hashTree.get(obj, "one.a");
		
		assert.deepEqual(r, 1);
	});

	it ('- find two b', function (){
		var r;
		r = hashTree.get(obj, "two .b");
		
		assert.deepEqual(r, "bee");
	});

	it ('- find three', function (){
		var r;
		r = hashTree.get(obj, "three");
		
		assert.deepEqual(r, {"c":["cee","C"]});
	});

	it ('- find three c', function (){
		var r;
		r = hashTree.get(obj, "three.c");
		
		assert.deepEqual(r, ["cee","C"]);
	});

	it ('- find non existing leaf', function (){
		var r;
		r = hashTree.get(obj, "three.nothing");
		
		assert.deepEqual(r, undefined);
	});

	it ('- find four 4', function (){
		var r;
		r = hashTree.get(obj, "four.4");
		
		assert.deepEqual(r, {"obj":null});
	});

	it ('- find four 4; array notation', function (){
		var r;
		r = hashTree.get(obj, ['four','4']);
		
		assert.deepEqual(r, {"obj":null});
	});

	it ('- find four 4 with bad spacing', function (){
		var r;
		r = hashTree.get(obj, "four ..  4");
		
		assert.deepEqual(r, {"obj":null});
	});

	describe ('- using reserved keywords', function(){

		var obj = {
			"this": { 
				"constructor": 0,
				"prototype": { "this": 1 }
			}
		};
		
		it ('- find constructor ', function (){
			var r;

			r = hashTree.get(obj, "this.constructor");
			assert.deepEqual(r, 0);
		});

		it ('- find constructor ', function (){
			var r;
			
			r = hashTree.get(obj, "this.prototype.this");
			assert.deepEqual(r, 1);
		});
		
	});
});


describe ('HashTree.get', function (){

	var obj = {
		one:   { a: 1 },
		two:   { b: "bee" },
		three: { c: [ "cee", "C" ] },
		four:  { 4: { obj: null } }
	};
	var ht = new HashTree(obj);

	it ('- find not existing', function (){
		var r = ht.get("not.there");
		
		assert.deepEqual(r, undefined);
	});

	it ('- find empty', function (){
		var r = ht.get("");
		
		assert.deepEqual(r, undefined);
	});

	it ('- find undefined', function (){
		var r = ht.get();
		
		assert.deepEqual(r, ht.tree());
	});

	it ('- find one a', function (){
		var r = ht.get("one.a");
		
		assert.deepEqual(r, 1);
	});

	it ('- find two b', function (){
		var r = ht.get("two.b");
		
		assert.deepEqual(r, "bee");
	});

	it ('- find three', function (){
		var r = ht.get("three");
		
		assert.deepEqual(r, {"c":["cee","C"]});
	});

	it ('- find three c', function (){
		var r = ht.get("three.c");
		
		assert.deepEqual(r, ["cee","C"]);
	});

	it ('- find non existing leaf', function (){
		var r = ht.get("three.nothing");
		
		assert.deepEqual(r, undefined);
	});

	it ('- find four 4', function (){
		var r = ht.get("four.4");
		
		assert.deepEqual(r, {"obj":null});
	});

	it ('- find four 4; array notation', function (){
		var r = ht.get(['four','4']);
		
		assert.deepEqual(r, {"obj":null});
	});

	it ('- find four 4 with bad spacing', function (){
		var r = ht.get("four ..   4");
		
		assert.deepEqual(r, {"obj":null});
	});

	describe ('- using reserved keywords', function(){

		var obj = {
			"this": { 
				"constructor": 0,
				"prototype": { "this": 1 }
			}
		};
		var ht = new HashTree(obj);
		
		it ('- find constructor ', function (){
			var r = ht.get("this.constructor");
			
			assert.deepEqual(r, 0);
		});

		it ('- find constructor ', function (){
			var r = ht.get("this.prototype.this");
			
			assert.deepEqual(r, 1);
		});
		
	});
});

