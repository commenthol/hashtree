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
	 * @param {String|Array} keys dot separated string or Array to gather `value` from hashtree object `obj`
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
	 *     hashTree.set(obj, ['two', 'b', '2'], 2);
	 *     // OR
	 *     hashTree.set(obj, 'two, b, 2', 2);
	 *     // => true; obj = { one: { a: 1 }, two: { b: { '2': 2 } } }
	 * 
	 * @param {Object} obj Object to append `value` to lead defined by `keys`
	 * @param {String|Array} keys dot separated string or Array to append value to hashtree object `obj`
	 * @param {*} value The value to add
	 * @return {Boolean} true if value was set, otherwise false
	 */
	// @property {Boolean} options.overwrite overwrite in any case (required for clear) 
	hashTree.set = function (obj, keys, value, options){
		var 
			i,
			lastkey,
			newbr = false,
			prev,
			tmp = obj;
			
		options = options || { overwrite: false };
		keys = splitKeys(keys);
		
		if (keys === undefined || obj === undefined || value === undefined) {
			return false;
		}

		for (i = 0; i < keys.length; i +=1) {
			prev = tmp;
			if (tmp.hasOwnProperty([keys[i]])) {
				tmp = tmp[keys[i]];
				newbr = false;
			}
			else {
				// append a new branch
				tmp = tmp[keys[i]] = {};
				newbr = true;
			}
		}
		lastkey = keys[keys.length-1];
		
		if (!options.overwrite && 
			(prev[lastkey] === undefined || 
				!newbr && 
				typeof(prev[lastkey]) === 'object' && 
				typeof(value) !== 'object'
			)
		) {
			return false;
		}
		
		prev[lastkey] = value;
		return true;
	};

	/**
	 * Sets all leafes of the hash tree on `obj` to `value`.
	 * 
	 * Example:
	 * 
	 *     obj = { one: { a: 1, b: 2, c: 3 } };
	 *     hashTree.setAll(obj, 'one', 0);
	 *     // => true; obj = { one: { a: 0, b: 0, c: 0 } }
	 * 
	 * @param {Object} obj Object to append `value` to lead defined by `keys`
	 * @param {String|Array} keys dot separated string or Array to append value to hashtree object `obj`
	 * @param {*} value The value to add
	 */
	hashTree.setAll = function (obj, keys, value){
		var 
			i,
			tmp,
			_obj = obj;
		
		keys = splitKeys(keys);
		
		if (obj === undefined || value === undefined) {
			return;
		}

		if (keys !== undefined) {
			_obj = hashTree.get(obj, keys);
		}

		if (_obj && typeof(_obj) === 'object' && tmp !== null && !Array.isArray(obj)) {
			for (i in _obj) {
				if (_obj.hasOwnProperty(i)) {
					if (typeof(_obj[i]) === 'object') {
						hashTree.setAll(_obj[i], undefined, value);
					}
					else {
						hashTree.set(_obj, [ i ], value);
					}
				}
			}
		}
	};

	/**
	 * Deletes a branch of the hash tree on `obj`.
	 * 
	 * Example:
	 * 
	 *     obj = { one: { a: [1, 2, 3], b: 2, c: 3 } };
	 *     hashTree.delete(obj, 'one.a');
	 *     // => true; obj = { one: { b: 2, c: 3 } }
	 * 
	 * @param {Object} obj Object to append `value` to lead defined by `keys`
	 * @param {String|Array} keys dot separated string or Array to append value to hashtree object `obj`
	 * @return {Boolean} `true` if branch could be deleted; otherwise `false`
	 */
	hashTree.delete = function (obj, keys){
		var tmp, lastkey;
		
		keys = splitKeys(keys);
		
		if (keys) {
			lastkey = keys.pop();
			tmp = hashTree.get(obj, keys);
			if (tmp !== undefined) {
				delete(tmp[lastkey]);
				return true;
			}
		}
		return false;
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
								hashTree.set(diff1, keys, obj1[i]);
								hashTree.set(diff2, keys, obj2[i]);
								keys.pop();
							}
						}
					}
					else {
						// only in obj1
						keys.push(i);
						hashTree.set(diff1, keys, obj1[i]);
						keys.pop();
					}
				}
			}
			for (i in obj2) {
				if (obj2.hasOwnProperty(i) && ! obj1.hasOwnProperty(i)) {
					// only in obj2
					keys.push(i);
					hashTree.set(diff2, keys, obj2[i]);
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
	 * @private
	 * @param {String|Array} keys
	 */
	var splitKeys = function (keys) {
		
		if (typeof(keys) === 'string') {
			return keys.replace(/^\s*\.\s*/,'')
				.replace(/(?:\s*\.\s*)+/g, '.')
				.split('.');
		}
		else if (Array.isArray(keys)) {
			return [].concat(keys);
		}
		return;
	};

	/**
	 * @exports hashTree
	 */
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
	 * Deletes a HashTree
	 * 
	 * @see hashTree.delete()
	 * @param {String|Array} keys dot separated string or Array to append value to hashtree object `obj`
	 * @return {Boolean} `true` if branch could be deleted; otherwise `false`
	 */
	HashTree.prototype.delete = function(keys){
		
		if (keys) {
			return hashTree.delete(this._tree, keys);
		}
		else {
			this._tree = {};
			return true;
		}
	};

	/**
	 * Get value from HashTree using keys
	 * 
	 * @see hashTree.get()
	 * @param {String|Array} keys dot separated string or Array to gather `value` from hashtree object `obj`
	 * @return {*} value found using keys
	 */
	HashTree.prototype.get = function(keys) {
		return hashTree.get(this._tree, keys);
	};

	/**
	 * Set value on HashTree using keys
	 * 
	 * @see hashTree.set()
	 * @param {String|Array} keys dot separated string or Array to gather `value` from hashtree object `obj`
	 * @param {*} value The value to add
	 * @return {Boolean} true if value was set, otherwise false
	 */
	HashTree.prototype.set = function(keys, value) {
		return hashTree.set(this._tree, keys, value);
	};

	/**
	 * Sets all leafes of the hash tree on `obj` to `value`.
	 * 
	 * Example:
	 * 
	 *     obj = { one: { a: 1, b: 2, c: 3 } };
	 *     _hashTree = new HashTree(obj);
	 *     _hashTree.setAll('one', 0);
	 *     _hashTree.tree();
	 *     // => { one: { a: 0, b: 0, c: 0 } }
	 * 
	 * @param {String|Array} keys dot separated string or Array to append value to hashtree object `obj`
	 * @param {*} value The value to add
	 */
	HashTree.prototype.setAll = function (keys, value){
		hashTree.setAll(this._tree, keys, value);
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

	/**
	 * @exports HashTree
	 */
	exports.HashTree = HashTree;
	
})(this.exports || this);
