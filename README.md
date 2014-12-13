# hashtree [![Build Status](https://secure.travis-ci.org/commenthol/hashtree.png?branch=master)](https://travis-ci.org/commenthol/hashtree)

> Build up "hash of hashes" in javascript and access the data contained.

For documentation of the methods provided see the [Doc][documentation]

The module can be used in Node, AMD / RequireJS or straight in a browser.

## Motivation

I'm a big fan of perl hashes. Unfortunately in javascript building up and accessing hash-of-hashes is not as straightforward as in perl. This lib tries to solve this by providing methods to easily build up those.

## Interface

Two interfaces are offered either using a prototype function `HashTree` or a functional interface using `hashTree` both offering the same functionality.

To access the values in the hashtree you use the `keys` either with a dot concatenated string or an array.
E.g. `'key.subkey'` or `[ 'key', 'subkey' ]` .

## Basic Operations

Basic operations use the methods
* `set` - Sets a value in the hashtree obj according to keys. 
* `get` - Gets a value in the hashtree obj according to keys.
* `delete` - Deletes a value in the hashtree obj according to keys.

``` javascript
var ht = require('./hashtree').hashTree;

var r, 
	obj = { "one": 1 };

/// add a new branch `obj.two.three` and set its value to 3 using dot-notation for keys
ht.set(obj, 'two.three', 3);
// => obj = { one: 1, two: { three: 3 } }

/// add a new branch `obj.four.five` and set its value to 5 using array notation for keys
ht.set(obj, [ 'four', 'five' ], 5);
// => obj = { one: 1, two: { three: 3 }, four: { five: 5 } }

/// set objects - note this replaces existing branches
ht.set(obj, 'two', { six: 6 } );
// => obj = { one: 1, two: { six: 6 }, four: { five: 5 } }

/// get the value stored in `obj.two` using dot-notation for keys
r = ht.get(obj, 'two');
// => r = { six: 6 }

/// get the value stored in `obj.four.five` using array notation for keys
r = ht.get(obj, [ 'four', 'five' ]);
// => r = 5

/// you can also set arrays
ht.set(obj, 'arr', [ 26, 27, 28 ]);
// => obj = { one: 1, two: { three: 3 }, four: { five: 5 }, arr: [ 26, 27, 28 ] }

/// and delete branches
ht.delete(obj, 'four');
// => obj = { one: 1, two: { three: 3 }, arr: [ 26, 27, 28 ] }

/// or items from arrays
ht.delete(obj, 'arr.1');
// => obj = { one: 1, two: { three: 3 }, arr: [ 26, , 28 ] }
```

## Manipulate Values in the hashtree

To manipulate values in the hashtree use the methods
* `setAll` - Sets all leafes of the hashtree on obj to value.
* `use` - use a reference from the hashtree to make operations upon.
* `sort` - sort the hashtree.

``` javascript
var ht = require('./hashtree').hashTree;

var r, 
	obj = { one: { a: 1, b: 2, c: 3 } };
r = ht.setAll(obj, 'one', 0);
// => r = true 
// => obj = { one: { a: 0, b: 0, c: 0 } }
```

To manipulate values in the hashtree without having to constantly use get and set methods use the `use` method.
All operations can be chained.

``` javascript
var ht = require('./hashtree').hashTree;

var r, obj = {};
r = ht.use(obj, 'one.a', 7) // sets the value to '7'
        .inc()              // increments by one
        .dec()              // decrements by one
        .add(10)            // add 10
        .sub(5)             // subtract 5
        .mul(200)           // multiply by 2
        .div(3)             // divide by 3
        .mod(70)            // modulo 7
        .get();             // finally get the value        
// => r = 30
// => obj = { one: { a: 30 } }
```

Sorting a hash tree does not make a lot of sense. It does not change anything. But for human eyes, e.g. on exporting to YAML or JSON, sorted patterns are easier to read (at least for me).

``` javascript
var ht = require('./hashtree').hashTree;

// sort in decending order
function descSorter(a, b) { 
    return (a > b) ? -1 : ( a == b ? 0 : 1);
}

var r, 
    obj = { 
        a: { a: 1, b: 2, c: 2 }, 
        e: { a: 1, b: 2, c: 2 }, 
        d: { a: 1, b: 2, z: 3 }
    };
// sort in decending order
r = ht.sort(obj, descSorter);
// => obj = { 
//  e: { c: 2, b: 2, a: 1 },
//  d: { z: 3, b: 2, a: 1 },
//  a: { c: 2, b: 2, a: 1 } }
```

Additionally two hashtrees can be compared with `diff` or `diffToBase`.

```js
var ht = require('hashtree').hashTree;

ht.diff({one:{two:{a:1,b:2}},two:2}, {one:{two:{a:1,b:3}},two:2});
// => { diff1: {one:{two:{b:2}}}, diff2: {one:{two:{b:3}}} }

ht.diffToBase({one:{two:{a:1,b:2}},two:2}, {one:{two:{a:1,b:3}},two:2});
// => {one:{two:{b:3}}}
```

## HashTree

All methods are offered also as a prototype function.

``` javascript
var HashTree = require('hashtree').HashTree;

var r;
var ht = new HashTree({ 'one': 1 }); 
ht.set('two.three', 3);

r = ht.get('two');
// => r = { three: 3 }
ht.delete('two');

ht.use('three.four').inc().add(3);

/// return the hashtree object
r = ht.tree();
// => r = { one: 1, three: { four: 4 } }
``` 

## License

Copyright (c) 2014- commenthol 

Software is released under [MIT][license].


[license]: ./LICENSE
[documentation]: ./docs/documentation.md


