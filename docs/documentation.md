hashTree


_Source: [hashtree.js](../hashtree.js)_

<a name="tableofcontents"></a>

- <a name="toc_hashtreegetobj-keys"></a><a name="toc_hashtree"></a>[hashTree.get](#hashtreegetobj-keys)
- <a name="toc_hashtreesetallobj-keys-value"></a>[hashTree.setAll](#hashtreesetallobj-keys-value)
- <a name="toc_hashtreedeleteobj-keys"></a>[hashTree.delete](#hashtreedeleteobj-keys)
- <a name="toc_hashtreedifftobasebase-obj"></a>[hashTree.diffToBase](#hashtreedifftobasebase-obj)
- <a name="toc_hashtreediffobj1-obj2-keys-diff1-diff2"></a>[hashTree.diff](#hashtreediffobj1-obj2-keys-diff1-diff2)
- <a name="toc_hashtreesortobj-sorter"></a>[hashTree.sort](#hashtreesortobj-sorter)
- <a name="toc_exportshashtree"></a><a name="toc_exports"></a>[exports.hashTree](#exportshashtree)
- <a name="toc_hashtreeprototypedeletekeys"></a><a name="toc_hashtreeprototype"></a><a name="toc_hashtree"></a>[HashTree.prototype.delete](#hashtreeprototypedeletekeys)
- <a name="toc_hashtreeprototypegetkeys"></a>[HashTree.prototype.get](#hashtreeprototypegetkeys)
- <a name="toc_hashtreeprototypesetkeys-value"></a>[HashTree.prototype.set](#hashtreeprototypesetkeys-value)
- <a name="toc_hashtreeprototypesetallkeys-value"></a>[HashTree.prototype.setAll](#hashtreeprototypesetallkeys-value)
- <a name="toc_hashtreeprototypetree"></a>[HashTree.prototype.tree](#hashtreeprototypetree)
- <a name="toc_hashtreeprototypesortsorter"></a>[HashTree.prototype.sort](#hashtreeprototypesortsorter)
- <a name="toc_exportshashtree"></a>[exports.HashTree](#exportshashtree)

<a name="hashtree"></a>

# hashTree.get(obj, keys)

> Gets a value in the hash tree `obj` according to `keys`.

**Example:**

```js
obj = { one: { a: 1 } };
hashTree.get(obj, 'one, a');
// => 1
```

**Parameters:**

- `{Object} obj` Object to append `value` to lead defined by `keys`
- `{String | Array} keys` dot separated string or Array to gather `value` from hashtree object `obj`

**Return:**

`{*}` value found using keys

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

- `{Object} obj` Object to append `value` to lead defined by `keys`
- `{String | Array} keys` dot separated string or Array to append value to hashtree object `obj`
- `{*} value` The value to add

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

# hashTree.delete(obj, keys)

> Deletes a branch of the hash tree on `obj`.

**Example:**

```js
obj = { one: { a: 1, b: 2, c: 3 } };
hashTree.delete(obj, 'one');
// => true; obj = { one: {} }
```

**Parameters:**

- `{Object} obj` Object to append `value` to lead defined by `keys`
- `{String | Array} keys` dot separated string or Array to append value to hashtree object `obj`

**Return:**

`{Boolean}` `true` if branch could be deleted; otherwise `false`

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

- `{Object} obj1` first Object to compare
- `{Object} obj2` second Object to compare
- `{Array} keys` (private)
- `{Object} diff1` (private) Difference of `obj1` to `obj2`
- `{Object} diff2` (private) Difference of `obj2` to `obj1`

**Return:**

`{Object}` {diff1: {Object}, diff2: {Object}}

{Object} diff1 Difference of `obj1` to `obj2`
{Object} diff2 Difference of `obj2` to `obj1`

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

- `{Object} obj` Object to sort
- `{Function} sorter` sorting function with arguments (a, b)

**Return:**

`{Object}` sorted obj

<sub>Go: [TOC](#tableofcontents) | [hashTree](#toc_hashtree)</sub>

<a name="exports"></a>

# exports.hashTree()

> @exports hashTree

<sub>Go: [TOC](#tableofcontents) | [exports](#toc_exports)</sub>

<a name="hashtreeprototype"></a>

<a name="hashtree"></a>

# HashTree.prototype.delete(keys)

> Deletes a HashTree

**Parameters:**

- `{String | Array} keys` dot separated string or Array to append value to hashtree object `obj`

**Return:**

`{Boolean}` `true` if branch could be deleted; otherwise `false`

**See:**

- [hashTree.delete](#hashtreedeleteobj-keys)()

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.get(keys)

> Get value from HashTree using keys

**Parameters:**

- `{String | Array} keys` dot separated string or Array to gather `value` from hashtree object `obj`

**Return:**

`{*}` value found using keys

**See:**

- [hashTree.get](#hashtreegetobj-keys)()

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.set(keys, value)

> Set value on HashTree using keys

**Parameters:**

- `{String | Array} keys` dot separated string or Array to gather `value` from hashtree object `obj`
- `{*} value` The value to add

**Return:**

`{Boolean}` true if value was set, otherwise false

**See:**

- hashTree.set()

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.setAll(keys, value)

> Sets all leafes of the hash tree on `obj` to `value`.

**Example:**

```js
obj = { one: { a: 1, b: 2, c: 3 } };
_hashTree = new HashTree(obj);
_hashTree.setAll('one', 0);
_hashTree.tree();
// => { one: { a: 0, b: 0, c: 0 } }
```

**Parameters:**

- `{String | Array} keys` dot separated string or Array to append value to hashtree object `obj`
- `{*} value` The value to add

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.tree()

> Obtain the HashTree

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# HashTree.prototype.sort(sorter)

> Sort the HashTree using optional `sorter` function

**Parameters:**

- `{Function} sorter` sorting function with arguments (a, b)

**See:**

- [hashTree.sort](#hashtreesortobj-sorter)() 

<sub>Go: [TOC](#tableofcontents) | [HashTree.prototype](#toc_hashtreeprototype)</sub>

# exports.HashTree()

> @exports HashTree

<sub>Go: [TOC](#tableofcontents) | [exports](#toc_exports)</sub>

_&mdash;generated by [apidox](https://github.com/codeactual/apidox)&mdash;_
