/**
 * hashTree
 *
 * @copyright commenthol 2014
 * @license Available under MIT license
 */

/* globals define */

;(function(exports){
	"use strict";

	var hashTree = {};

	/**
	 * Gets a value in the hash tree `obj` according to `keys`.
	 *
	 * Example:
	 *
	 *     obj = { one: { a: 1 } };
	 *     hashTree.get(obj, 'one.a');
	 *     // => 1
	 *
	 * @param {Object} obj : Object to append `value` to lead defined by `keys`
	 * @param {String|Array} keys : dot separated string or Array to gather `value` from hashtree object `obj`
	 * @return {Any} value found using keys
	 */
	hashTree.get = function (obj, keys){
		var i,
			tmp = obj;

		keys = splitKeys(keys);

		if (keys === undefined) {
			return obj;
		}

		for (i = 0; i < keys.length; i+=1 ) {
			if (typeof tmp === 'object' && tmp.hasOwnProperty(keys[i])) {
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
	 *     hashTree.set(obj, 'two.b.2', 2);
	 *     // => true; obj = { one: { a: 1 }, two: { b: { '2': 2 } } }
	 *
	 * @param {Object} obj : Object to append `value` to lead defined by `keys`
	 * @param {String|Array} keys : dot separated string or Array to append value to hashtree object `obj`
	 * @param {Any} value : The value to set
	 * @property {Boolean} _overwrite : _overwrite in any case
	 * @return {Boolean} true if value was set, otherwise false
	 */
	hashTree.set = function (obj, keys, value, _overwrite){
		var i,
			lastkey,
			newbr = false,
			last,
			tmp = obj;

		_overwrite = _overwrite || false;
		keys = splitKeys(keys);

		if (keys === undefined || obj === undefined || value === undefined) {
			return false;
		}

		for (i = 0; i < keys.length; i +=1) {
			last = tmp;
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

		if (!_overwrite &&
			(last[lastkey] === undefined ||
				!newbr &&
				typeof(last[lastkey]) === 'object' &&
				typeof(value) !== 'object'
			)
		) {
			return false;
		}

		last[lastkey] = value;
		return true;
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
	 * @param {Object} obj : Object to append `value` to lead defined by `keys`
	 * @param {String|Array} keys : dot separated string or Array to append value to hashtree object `obj`
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
	 * Make operations on a value in the hash tree `obj` according to `keys`.
	 *
	 * Example:
	 *
	 *     obj = { one: { a: 1 } };
	 *     hashTree.use(obj, 'one.a').add(5).get();
	 *     // => 6
	 *
	 * @param {Object} obj : Object to append `value` to lead defined by `keys`
	 * @param {String|Array} keys : dot separated string or Array to gather `value` from hashtree object `obj`
	 * @param {Number|Boolean} value : (optional) set value first
	 * @return {Ops} object for operations
	 * @see Ops
	 */
	hashTree.use = function (obj, keys, value) {
		var self = {};
		var ops;

		keys = splitKeys(keys) || [];
		self.key = keys.pop();
		self.ref = hashTree.get(obj, keys);

		if (self.key === undefined) {
			self.ref = {};
			self.key = "_";
			self.ref[self.key] = obj;
		}
		if (typeof self.ref !== 'object') {
			hashTree.set(obj, keys, {});
			self.ref = hashTree.get(obj, keys);
		}
		if (value !== undefined) {
			self.ref[self.key] = value;
		}

		ops = new Ops(self.ref, self.key);
		return ops;
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
	 * @param {Object} obj : Object to append `value` to lead defined by `keys`
	 * @param {String|Array} keys : dot separated string or Array to append value to hashtree object `obj`
	 * @param {Any} value : The value to add
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
				// istanbul ignore else
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
	 * @param {Object} obj : Object to sort
	 * @param {Function} sorter : sorting function with arguments (a, b)
	 * @return {Object} sorted obj
	 */
	hashTree.sort = function(obj, sorter) {
		var
			i,
			a = [],
			tmp = null;

		if (obj && typeof(obj) === 'object' && obj !== null) {
			if (Array.isArray(obj)) {
				// Array
				tmp = obj.sort(sorter);
			}
			else {
				// Object
				tmp = {};
				for (i in obj) {
					// istanbul ignore else
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
	 * @param {Object} obj1 : first Object to compare
	 * @param {Object} obj2 : second Object to compare
	 * @param {Array} keys : (private)
	 * @param {Object} diff1 : (private) Difference of `obj1` to `obj2`
	 * @param {Object} diff2 : (private) Difference of `obj2` to `obj1`
	 * @return {Object} {diff1: {Object}, diff2: {Object}}
	 * @property {Object} diff1 Difference of `obj1` to `obj2`
	 * @property {Object} diff2 Difference of `obj2` to `obj1`
	 */
	hashTree.diff = function (obj1, obj2, keys, diff1, diff2) {
		var i;

		keys  = keys || [];
		diff1 = diff1 || {};
		diff2 = diff2 || {};

		// istanbul ignore else
		if (obj1 && obj2) {
			for (i in obj1) {
				// istanbul ignore else
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
	 * Get value from HashTree using keys
	 *
	 * @see hashTree.get()
	 * @param {String|Array} keys : dot separated string or Array to gather `value` from hashtree object `obj`
	 * @return {Any} value : found using keys
	 */
	HashTree.prototype.get = function(keys) {
		return hashTree.get(this._tree, keys);
	};

	/**
	 * Set value on HashTree using keys
	 *
	 * @see hashTree.set()
	 * @param {String|Array} keys : dot separated string or Array to gather `value` from hashtree object `obj`
	 * @param {Any} value : The value to add
	 * @return {Boolean} true if value was set, otherwise false
	 */
	HashTree.prototype.set = function(keys, value) {
		return hashTree.set(this._tree, keys, value);
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
	 * Obtain the HashTree
	 */
	HashTree.prototype.tree = function() {
		return this._tree;
	};

	/**
	 * Set value on HashTree using keys
	 *
	 * @see hashTree.use()
	 * @param {String|Array} keys : dot separated string or Array to gather `value` from hashtree object `obj`
	 * @param {Number|Boolean} value : (optional) set value first
	 * @return {Object} internal object
	 */
	HashTree.prototype.use = function(keys, value) {
		return hashTree.use(this._tree, keys, value);
	};

	/**
	 * Sets all leafes of the hash tree on `obj` to `value`.
	 *
	 * Example:
	 *
	 *     obj = { one: { a: 1, b: 2, c: 3 } };
	 *     ahashTree = new HashTree(obj);
	 *     ahashTree.setAll('one', 0);
	 *     ahashTree.tree();
	 *     // => { one: { a: 0, b: 0, c: 0 } }
	 *
	 * @param {String|Array} keys : dot separated string or Array to append value to hashtree object `obj`
	 * @param {Any} value : The value to add
	 */
	HashTree.prototype.setAll = function (keys, value){
		hashTree.setAll(this._tree, keys, value);
	};

	/**
	 * Sort the HashTree using optional `sorter` function
	 *
	 * @see hashTree.sort()
	 * @param {Function} sorter : sorting function with arguments (a, b)
	 */
	HashTree.prototype.sort = function(sorter) {
		this._tree = hashTree.sort(this._tree, sorter);
		this._tree = hashTree.sort(this._tree, sorter);
	};

	/**
	 * @exports HashTree
	 */
	exports.HashTree = HashTree;

	/**
	 * Normalize and split `keys` for `get` and `set` method.
	 * Splits by "."
	 *
	 * @param {String|Array} keys
	 * @api private
	 */
	function splitKeys (keys) {
		if (typeof(keys) === 'string') {
			return keys.replace(/^\s*\.\s*/,'')
				.replace(/(?:\s*\.\s*)+/g, '.')
				.split('.');
		}
		else if (Array.isArray(keys)) {
			return [].concat(keys);
		}
		return;
	}

	/**
	 * Helper class for hashTree.use
	 * @param {Object} ref : reference in object
	 * @param {String} key : key for value to change
	 */
	function Ops (ref, key) {
		this.ref = ref;
		this.key = key;

		if (this.ref[this.key] === undefined) {
			this.ref[this.key] = 0;
		}
		this._toNumber();

		this.isNumber = (typeof this.ref[this.key] === 'number');
		this.isBoolean = (typeof this.ref[this.key] === 'boolean');
		this.isString = (typeof this.ref[this.key] === 'string');
		this.isArray = Array.isArray(this.ref[this.key]);
		this.isObject = (!this.isArray && typeof this.ref[this.key] === 'object');
	}

	/**
	 * Try to convert value to a Number
	 * @private
	 */
	Ops.prototype._toNumber = function() {
		var tmp = this.ref[this.key];
		if (typeof tmp === 'string' && /^\d+$/.test(tmp)) {
			// try to convert string to a number
			tmp = parseInt(tmp, 10);
			// istanbul ignore else
			if (! isNaN(tmp)) {
				this.ref[this.key] = tmp;
			}
		}
	};

	/**
	 * return keys of a hash tree branch
	 * @return {Array} array of keys
	 */
	Ops.prototype.keys = function() {
		if (this.isObject) {
			return Object.keys(this.ref[this.key]);
		} else {
			return [];
		}
	};

	/**
	 * increment
	 */
	Ops.prototype.inc = function() {
		if (this.isNumber) {
			this.ref[this.key]++;
		}
		return this;
	};
	/**
	 * decrement
	 */
	Ops.prototype.dec = function() {
		if (this.isNumber) {
			this.ref[this.key]--;
		}
		return this;
	};
	/**
	 * add `val`
	 * @param {Number} val
	 */
	Ops.prototype.add = function(val) {
		if (this.isNumber || this.isString) {
			this.ref[this.key] += val;
		}
		return this;
	};
	/**
	 * subtract `val`
	 * @param {Number} val
	 */
	Ops.prototype.sub = function(val) {
		if (this.isNumber) {
			this.ref[this.key] -= val;
		}
		return this;
	};
	/**
	 * multiply by `val`
	 * @param {Number} val
	 */
	Ops.prototype.mul = function(val) {
		if (this.isNumber) {
			this.ref[this.key] *= val;
		}
		return this;
	};
	/**
	 * divide by `val`
	 * @param {Number} val
	 */
	Ops.prototype.div = function(val) {
		if (this.isNumber) {
			this.ref[this.key] /= val;
		}
		return this;
	};
	/**
	 * modulo by `val`
	 * @param {Number} val
	 */
	Ops.prototype.mod = function(val) {
		if (this.isNumber) {
			this.ref[this.key] %= val;
		}
		return this;
	};
	/**
	 * logical-or by `val`
	 * @param {Number|Boolean} val
	 */
	Ops.prototype.or = function(val) {
		if (this.isNumber || this.isBoolean) {
			this.ref[this.key] |= val;
		}
		return this;
	};
	/**
	 * logical-and by `val`
	 * @param {Number|Boolean} val
	 */
	Ops.prototype.and = function(val) {
		if (this.isNumber || this.isBoolean) {
			this.ref[this.key] &= val;
		}
		return this;
	};
	/**
	 * logical-not by `val` if `val` is Boolean
	 * logical-bitwise-not by `val` if `val` is Number
	 * @param {Number|Boolean} val
	 */
	Ops.prototype.not = function() { // bitwise not if number
		if (this.isNumber) {
			this.ref[this.key] = ~this.ref[this.key];
		}
		else if (this.isBoolean){
			this.ref[this.key] = !this.ref[this.key];
		}
		return this;
	};
	/**
	 * returns the computed value
	 * @return {Number|Boolean}
	 */
	Ops.prototype.get = function() {
		return this.ref[this.key];
	};
	/**
	 * set to `val`
	 * @param {Any} val
	 */
	Ops.prototype.set = function(val) {
		this.ref[this.key] = val;
		this._toNumber();
		return this;
	};

	var M = {
		hashTree: hashTree,
		HashTree: HashTree
	};

	/* istanbul ignore next */
	// Node.js
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = M;
	}
	// AMD / RequireJS
	else if (typeof define !== 'undefined' && define.amd) {
		define([], function () {
			return M;
		});
	}
	// included in browser via <script> tag
	else if (typeof exports.Window !== 'undefined') {
		for (var i in M) {
			if (!exports[i]) {
				exports[i] = M[i];
			}
		}
	}

})(this);
