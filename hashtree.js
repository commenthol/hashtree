/**
 * hashTree
 * 
 * @copyright commenthol 2014
 * @license Available under MIT license
 */
 
;(function(exports){
	"use strict";
	
	var hashTree = {};

	/**
	 * Gets a value in the hash tree `obj` according to `keys`.
	 * 
	 * Example:
	 * 
	 *     obj = { one: { a: 1 } };
	 *     hashTree.get(obj, 'one, a');
	 *     // => 1
	 * 
	 * @param {Object} obj Object to append `value` to lead defined by `keys`
	 * @param {string|Array} keys comma separated string or Array to gather `value` from hashtree object `obj`
	 * @return {*} value found using keys
	 */
	hashTree.get = function (obj, keys){
		var 
			i,
			tmp = obj;
		
		keys = splitKeys(keys);

		if (keys === undefined) {
			return;
		}

		for (i = 0; i < keys.length; i +=1) {

			if (tmp.hasOwnProperty([keys[i]])) {
				tmp = tmp[keys[i]];
			}
			else {
				tmp = undefined;
				break;
			}
		}
		return tmp;
	};

	/**
	 * Sets a value in the hash tree `obj` according to `keys`.
	 * 
	 * Example:
	 * 
	 *     obj = { one: { a: 1 } };
	 *     hashTree.set(obj, 2, ['two', 'b', '2']);
	 *     // => obj = { one: { a: 1 }, two: { b: { '2': 2 } } }
	 * 
	 * @param {Object} obj Object to append `value` to lead defined by `keys`
	 * @param {*} value The value to add
	 * @param {string|Array} keys comma separated string or Array to append value to hashtree object `obj`
	 */
	hashTree.set = function (obj, value, keys){
		var 
			i,
			prev,
			tmp = obj;
		
		keys = splitKeys(keys);
		
		if (keys === undefined || obj === undefined || value === undefined) {
			return;
		}

		for (i = 0; i < keys.length; i +=1) {
			prev = tmp;
			if (tmp.hasOwnProperty([keys[i]])) {
				tmp = tmp[keys[i]];
			}
			else {
				tmp = tmp[keys[i]] = {};
			}
		}
		prev[keys[keys.length-1]] = value;
		return;
	};

	/**
	 * Compare `obj` with `base` and return the difference between `base` and `obj`.
	 * Properties which are only in `base` will not be considered.
	 * 
	 * Example:
	 * 
	 *     base = { one: { a: 1, c: 3 } };
	 *     obj  = { one: { a: 1, b: 2 } };
	 *     hashTree.diffToBase(base, obj);
	 *     // => { one: { b: 2 } }
	 * 
	 * @param {Object} base
	 * @param {Object} obj
	 * @return {Object} difference between base and obj
	 */
	hashTree.diffToBase = function (base, obj) {
		var result = hashTree.diff(base, obj);
		return result.diff2;
	};

	/**
	 * Obtain the difference from two hashtrees
	 * 
	 * Example:
	 * 
	 *     base = { one: { a: 1, c: 3 }, two: 2 };
	 *     obj  = { one: { a: 1, b: 2 } };
	 *     hashTree.diff(base, obj);
	 *     // => { diff1: { one: { c: 3 }, two: 2 }, diff2: { one: { b: 2 } } }
	 * 
	 * @param {Object} obj1 first Object to compare
	 * @param {Object} obj2 second Object to compare
	 * @param {Array} keys (private)
	 * @param {Object} diff1 (private) Difference of `obj1` to `obj2`
	 * @param {Object} diff2 (private) Difference of `obj2` to `obj1`
	 * @return {Object} {diff1: {Object}, diff2: {Object}}
	 * @property {Object} diff1 Difference of `obj1` to `obj2`
	 * @property {Object} diff2 Difference of `obj2` to `obj1`
	 */
	hashTree.diff = function (obj1, obj2, keys, diff1, diff2) {
		var i;
		
		keys  = keys || [];
		diff1 = diff1 || {};
		diff2 = diff2 || {};
		
		if (obj1 && obj2) {
			for (i in obj1) {
				if (obj1.hasOwnProperty(i)) {
					if (obj2.hasOwnProperty(i)){
						if (typeof(obj1[i]) === 'object' && typeof(obj2[i]) === 'object') {
							// property is there
							keys.push(i);
							hashTree.diff(obj1[i], obj2[i], keys, diff1, diff2);
							keys.pop();
						}
						else {
							if (obj1[i] !== obj2[i]) {
								// objects differ
								keys.push(i);
								hashTree.set(diff1, obj1[i], keys);
								hashTree.set(diff2, obj2[i], keys);
								keys.pop();
							}
						}
					}
					else {
						// only in obj1
						keys.push(i);
						hashTree.set(diff1, obj1[i], keys);
						keys.pop();
					}
				}
			}
			for (i in obj2) {
				if (obj2.hasOwnProperty(i) && ! obj1.hasOwnProperty(i)) {
					// only in obj2
					keys.push(i);
					hashTree.set(diff2, obj2[i], keys);
					keys.pop();
				}
			}
		}
		return { diff1: diff1, diff2: diff2 };
	};

	/**
	 * Sorts a hash tree with an optional `sorter` function.
	 * 
	 * Sorting a hash tree does not make a lot of sense. It does not change anything.
	 * But for human eyes, e.g. on exporting to YAML or JSON, sorted patterns are easier to read (at least for me).
	 * 
	 * Example:
	 * 
	 *     obj = { z: { y: 25, x: 24 }, a: { c: 2, b: 1 } }
	 *     hashTree.sort(obj);
	 *     // => { a: { b: 1, c: 2 }, z: { x: 24, y: 25 } }
	 * 
	 * @param {Object} obj Object to sort
	 * @param {Function} sorter sorting function with arguments (a, b)
	 * @return {Object} sorted obj
	 */
	hashTree.sort = function(obj, sorter) {
		var 
			i,
			a = [],
			tmp = null;
		
		if (obj && typeof(obj) === 'object' && obj !== null) {
			if (typeof(obj.length) === 'number') {
				// Array
				tmp = [];
				tmp = obj.map(function(p){
					return hashTree.sort(p, sorter);
				});
			}
			else { 
				// Object
				tmp = {};
				for (i in obj) {
					if (obj.hasOwnProperty(i)) {
						a.push(i);
					}
				}
				a.sort(sorter).forEach(function(p){ 
					tmp[p] = hashTree.sort(obj[p], sorter);
				});
			}
		}
		else {
			tmp = obj;
		}
		
		return tmp;
	};

	/**
	 * Normalize and split `keys` for `get` and `set` method
	 * 
	 * @api private
	 * @param {string|Array} keys
	 */
	var splitKeys = function (keys) {
		
		if (typeof(keys) === 'string') {
			return keys.replace(/(?:\s*,\s*)+/g, ',').split(',');
		}
		else if (keys && typeof(keys) === 'object' && typeof(keys.length) === 'number') {
			return keys;
		}
		return;
	};

	exports.hashTree = hashTree;

	/**
	 * Creates a HashTree
	 * @constructor
	 * @param {Object} obj pre-set HashTree with obj
	 */
	var HashTree = function (obj){
		this._tree = obj || {};
	};
	
	/**
	 * Clears a HashTree
	 */
	HashTree.prototype.clear = function(){
		this._tree = {};
	};

	/**
	 * Get value from HashTree using keys
	 * 
	 * @see hashTree.get()
	 * @param {string|Array} keys comma separated string or Array to gather `value` from hashtree object `obj`
	 * @return {*} value found using keys
	 */
	HashTree.prototype.get = function(keys) {
		return hashTree.get(this._tree, keys);
	};

	/**
	 * Set value on HashTree using keys
	 * 
	 * @see hashTree.set()
	 * @param {*} value The value to add
	 * @param {string|Array} keys comma separated string or Array to gather `value` from hashtree object `obj`
	 */
	HashTree.prototype.set = function(value, keys) {
		hashTree.set(this._tree, value, keys);
	};

	/**
	 * Obtain the HashTree
	 */
	HashTree.prototype.tree = function() {
		return this._tree;
	};

	/**
	 * Sort the HashTree using optional `sorter` function
	 * 
	 * @see hashTree.sort() 
	 * @param {Function} sorter sorting function with arguments (a, b)
	 */
	HashTree.prototype.sort = function(sorter) {
		this._tree = hashTree.sort(this._tree, sorter);
		this._tree = hashTree.sort(this._tree, sorter);
	};

	exports.HashTree = HashTree;
	
})(this.exports || this);
