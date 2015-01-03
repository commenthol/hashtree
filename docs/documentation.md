hashTree


_Source: [hashtree.js](../hashtree.js)_

<a name="tableofcontents"></a>

- <a name="toc_hashtreegetobj-keys"></a><a name="toc_hashtree"></a>[hashTree.get](#hashtreegetobj-keys)
- <a name="toc_hashtreesetobj-keys-value"></a>[hashTree.set](#hashtreesetobj-keys-value)
- <a name="toc_hashtreedeleteobj-keys"></a>[hashTree.delete](#hashtreedeleteobj-keys)
- <a name="toc_hashtreeuseobj-keys-value"></a>[hashTree.use](#hashtreeuseobj-keys-value)
- <a name="toc_hashtreesetallobj-keys-value"></a>[hashTree.setAll](#hashtreesetallobj-keys-value)
- <a name="toc_hashtreesortobj-sorter"></a>[hashTree.sort](#hashtreesortobj-sorter)
- <a name="toc_hashtreedifftobasebase-obj"></a>[hashTree.diffToBase](#hashtreedifftobasebase-obj)
- <a name="toc_hashtreediffobj1-obj2-keys-diff1-diff2"></a>[hashTree.diff](#hashtreediffobj1-obj2-keys-diff1-diff2)
- <a name="toc_exportshashtree"></a><a name="toc_exports"></a>[exports.hashTree](#exportshashtree)
- <a name="toc_hashtreeprototypegetkeys"></a><a name="toc_hashtreeprototype"></a><a name="toc_hashtree"></a>[HashTree.prototype.get](#hashtreeprototypegetkeys)
- <a name="toc_hashtreeprototypesetkeys-value"></a>[HashTree.prototype.set](#hashtreeprototypesetkeys-value)
- <a name="toc_hashtreeprototypedeletekeys"></a>[HashTree.prototype.delete](#hashtreeprototypedeletekeys)
- <a name="toc_hashtreeprototypetree"></a>[HashTree.prototype.tree](#hashtreeprototypetree)
- <a name="toc_hashtreeprototypeusekeys-value"></a>[HashTree.prototype.use](#hashtreeprototypeusekeys-value)
- <a name="toc_hashtreeprototypesetallkeys-value"></a>[HashTree.prototype.setAll](#hashtreeprototypesetallkeys-value)
- <a name="toc_hashtreeprototypesortsorter"></a>[HashTree.prototype.sort](#hashtreeprototypesortsorter)
- <a name="toc_exportshashtree"></a>[exports.HashTree](#exportshashtree)
- <a name="toc_opsref-key"></a>[Ops](#opsref-key)
- <a name="toc_opsprototypekeys"></a><a name="toc_opsprototype"></a>[Ops.prototype.keys](#opsprototypekeys)
- <a name="toc_opsprototypeinc"></a>[Ops.prototype.inc](#opsprototypeinc)
- <a name="toc_opsprototypedec"></a>[Ops.prototype.dec](#opsprototypedec)
- <a name="toc_opsprototypeaddval"></a>[Ops.prototype.add](#opsprototypeaddval)
- <a name="toc_opsprototypesubval"></a>[Ops.prototype.sub](#opsprototypesubval)
- <a name="toc_opsprototypemulval"></a>[Ops.prototype.mul](#opsprototypemulval)
- <a name="toc_opsprototypedivval"></a>[Ops.prototype.div](#opsprototypedivval)
- <a name="toc_opsprototypemodval"></a>[Ops.prototype.mod](#opsprototypemodval)
- <a name="toc_opsprototypeorval"></a>[Ops.prototype.or](#opsprototypeorval)
- <a name="toc_opsprototypeandval"></a>[Ops.prototype.and](#opsprototypeandval)
- <a name="toc_opsprototypenotval"></a>[Ops.prototype.not](#opsprototypenotval)

<a name="hashtree"></a>

# hashTree.get(obj, keys)

> Gets a value in the hash tree `obj` according to `keys`.

**Example:**

```js
obj = { one: { a: 1 } };
hashTree.get(obj, 'one.a');
// => 1
```

**Parameters:**

- `{Object} obj` : Object to append `value` to lead defined by `keys`
- `{String | Array} keys` : dot separated string or Array to gather `value` from hashtree object `obj`

**Return:**

`{Any}` value found using keys

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

# hashTree.set(obj, keys, value)

> Sets a value in the hash tree `obj` according to `keys`.

**Example:**

```js
obj = { one: { a: 1 } };
hashTree.set(obj, ['two', 'b', '2'], 2);
// OR
hashTree.set(obj, 'two.b.2', 2);
// => true; obj = { one: { a: 1 }, two: { b: { '2': 2 } } }
```

**Parameters:**

- `{Object} obj` : Object to append `value` to lead defined by `keys`
- `{String | Array} keys` : dot separated string or Array to append value to hashtree object `obj`
- `{Any} value` : The value to set



**Return:**

`{Boolean}` true if value was set, otherwise false

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

# hashTree.delete(obj, keys)

> Deletes a branch of the hash tree on `obj`.

**Example:**

```js
obj = { one: { a: [1, 2, 3], b: 2, c: 3 } };
hashTree.delete(obj, 'one.a');
// => true; obj = { one: { b: 2, c: 3 } }
```

**Parameters:**

- `{Object} obj` : Object to append `value` to lead defined by `keys`
- `{String | Array} keys` : dot separated string or Array to append value to hashtree object `obj`

**Return:**

`{Boolean}` `true` if branch could be deleted; otherwise `false`

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

# hashTree.use(obj, keys, value)

> Make operations on a value in the hash tree `obj` according to `keys`.

**Example:**

```js
obj = { one: { a: 1 } };
hashTree.use(obj, 'one.a').add(5).get();
// => 6
```

**Parameters:**

- `{Object} obj` : Object to append `value` to lead defined by `keys`
- `{String | Array} keys` : dot separated string or Array to gather `value` from hashtree object `obj`
- `{Number | Boolean} value` : (optional) set value first

**Return:**

`{Ops}` object for operations

**See:**

- [Ops](#opsref-key)

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

# hashTree.setAll(obj, keys, value)

> Sets all leafes of the hash tree on `obj` to `value`.

**Example:**

```js
obj = { one: { a: 1, b: 2, c: 3 } };
hashTree.setAll(obj, 'one', 0);
// => true; obj = { one: { a: 0, b: 0, c: 0 } }
```

**Parameters:**

- `{Object} obj` : Object to append `value` to lead defined by `keys`
- `{String | Array} keys` : dot separated string or Array to append value to hashtree object `obj`
- `{Any} value` : The value to add

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

# hashTree.sort(obj, sorter)

> Sorts a hash tree with an optional `sorter` function.

Sorting a hash tree does not make a lot of sense. It does not change anything.
But for human eyes, e.g. on exporting to YAML or JSON, sorted patterns are easier to read (at least for me).

**Example:**

```js
obj = { z: { y: 25, x: 24 }, a: { c: 2, b: 1 } }
hashTree.sort(obj);
// => { a: { b: 1, c: 2 }, z: { x: 24, y: 25 } }
```

**Parameters:**

- `{Object} obj` : Object to sort
- `{Function} sorter` : sorting function with arguments (a, b)

**Return:**

`{Object}` sorted obj

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

# hashTree.diffToBase(base, obj)

> Compare `obj` with `base` and return the difference between `base` and `obj`.
Properties which are only in `base` will not be considered.

**Example:**

```js
base = { one: { a: 1, c: 3 } };
obj  = { one: { a: 1, b: 2 } };
hashTree.diffToBase(base, obj);
// => { one: { b: 2 } }
```

**Parameters:**

- `{Object} base`
- `{Object} obj`

**Return:**

`{Object}` difference between base and obj

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

# hashTree.diff(obj1, obj2, keys, diff1, diff2)

> Obtain the difference from two hashtrees

**Example:**

```js
base = { one: { a: 1, c: 3 }, two: 2 };
obj  = { one: { a: 1, b: 2 } };
hashTree.diff(base, obj);
// => { diff1: { one: { c: 3 }, two: 2 }, diff2: { one: { b: 2 } } }
```

**Parameters:**

- `{Object} obj1` : first Object to compare
- `{Object} obj2` : second Object to compare
- `{Array} keys` : (private)
- `{Object} diff1` : (private) Difference of `obj1` to `obj2`
- `{Object} diff2` : (private) Difference of `obj2` to `obj1`

**Return:**

`{Object}` {diff1: {Object}, diff2: {Object}}




<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

<a name="exports"></a>

# exports.hashTree()

> @exports hashTree

<sub>Go: [TOC](#tableofcontents) | [exports](#toc_exports)</sub>

<a name="hashtreeprototype"></a>

<a name="hashtree"></a>

# HashTree.prototype.get(keys)

> Get value from HashTree using keys

**Parameters:**

- `{String | Array} keys` : dot separated string or Array to gather `value` from hashtree object `obj`

**Return:**

`{Any}` value : found using keys

**See:**

- [hashTree.get](#hashtreegetobj-keys)()

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.set(keys, value)

> Set value on HashTree using keys

**Parameters:**

- `{String | Array} keys` : dot separated string or Array to gather `value` from hashtree object `obj`
- `{Any} value` : The value to add

**Return:**

`{Boolean}` true if value was set, otherwise false

**See:**

- [hashTree.set](#hashtreesetobj-keys-value)()

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.delete(keys)

> Deletes a HashTree

**Parameters:**

- `{String | Array} keys` dot separated string or Array to append value to hashtree object `obj`

**Return:**

`{Boolean}` `true` if branch could be deleted; otherwise `false`

**See:**

- [hashTree.delete](#hashtreedeleteobj-keys)()

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.tree()

> Obtain the HashTree

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.use(keys, value)

> Set value on HashTree using keys

**Parameters:**

- `{String | Array} keys` : dot separated string or Array to gather `value` from hashtree object `obj`
- `{Number | Boolean} value` : (optional) set value first

**Return:**

`{Object}` internal object

**See:**

- [hashTree.use](#hashtreeuseobj-keys-value)()

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.setAll(keys, value)

> Sets all leafes of the hash tree on `obj` to `value`.

**Example:**

```js
obj = { one: { a: 1, b: 2, c: 3 } };
ahashTree = new HashTree(obj);
ahashTree.setAll('one', 0);
ahashTree.tree();
// => { one: { a: 0, b: 0, c: 0 } }
```

**Parameters:**

- `{String | Array} keys` : dot separated string or Array to append value to hashtree object `obj`
- `{Any} value` : The value to add

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.sort(sorter)

> Sort the HashTree using optional `sorter` function

**Parameters:**

- `{Function} sorter` : sorting function with arguments (a, b)

**See:**

- [hashTree.sort](#hashtreesortobj-sorter)()

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# exports.HashTree()

> @exports HashTree

<sub>Go: [TOC](#tableofcontents) | [exports](#toc_exports)</sub>

# Ops(ref, key)

> Helper class for [hashTree.use](#hashtreeuseobj-keys-value)

**Parameters:**

- `{Object} ref` : reference in object
- `{String} key` : key for value to change

<sub>Go: [TOC](#tableofcontents)</sub>

<a name="opsprototype"></a>

# Ops.prototype.keys()

> return keys of a hash tree branch

**Return:**

`{Array}` array of keys

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.inc()

> increment

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.dec()

> decrement

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.add(val)

> add `val`

**Parameters:**

- `{Number} val`

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.sub(val)

> subtract `val`

**Parameters:**

- `{Number} val`

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.mul(val)

> multiply by `val`

**Parameters:**

- `{Number} val`

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.div(val)

> divide by `val`

**Parameters:**

- `{Number} val`

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.mod(val)

> modulo by `val`

**Parameters:**

- `{Number} val`

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.or(val)

> logical-or by `val`

**Parameters:**

- `{Number | Boolean} val`

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.and(val)

> logical-and by `val`

**Parameters:**

- `{Number | Boolean} val`

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

# Ops.prototype.not(val)

> logical-not by `val` if `val` is Boolean
logical-bitwise-not by `val` if `val` is Number

**Parameters:**

- `{Number | Boolean} val`

<sub>Go: [TOC](#tableofcontents) | [Ops.prototype](#toc_opsprototype)</sub>

_&mdash;generated by [apidox](https://github.com/codeactual/apidox)&mdash;_
