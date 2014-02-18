hashtree [![Build Status](https://secure.travis-ci.org/commenthol/hashtree.png?branch=master)](https://travis-ci.org/commenthol/hashtree)
========

Build up "hash of hashes" in javascript and access the data contained.

For documentation of the methods provided see the [Doc][documentation]

Using objects:

```js
var HashTree = require('hashtree').HashTree;

var ht = new HashTree({ "one": 1 }); 
ht.set("two, three", 3);
ht.get("two");
// => { three: 3 }
ht.set("two, zero", 0);
ht.tree();
// => { one: 1, two: { three: 3, zero: 0 } }
ht.set("z", [ 26 ]);
ht.tree();
// => { one: 1, two: { three: 3, zero: 0 }, z: [ 26 ] }
// sort in decending order
ht.sort(function(a,b){ return (a > b) ? -1 : ( a == b ? 0 : 1) });
JSON.stringify(ht.tree());
// => { z: [ 26 ], two: { zero: 0, three: 3 }, one: 1 }
ht.clear("two");
ht.tree();
// => { z: [ 26 ], two: {}, one: 1 }
``` 

Using functions:

```js
var ht = require('hashtree').hashTree;

var obj = { "one": 1 };
ht.set(obj, "two, three", 3);
ht.get(obj, "two");
// => { three: 3 }
ht.set(obj, "z", [ 26 ]);
// => obj === { one: 1, two: { three: 3 }, z: [ 26 ] }
// sort in decending order
JSON.stringify(ht.sort(obj, function(a,b){ return (a > b) ? -1 : ( a == b ? 0 : 1) }));
// => { z: [ 26 ], two: { three: 3 }, one: 1 }
ht.clear(obj, "two");
// => obj === { z: [ 26 ], two: {}, one: 1 }
```

Additionally two hashtrees can be compared with `diff` or `diffToBase`.

```js
var ht = require('hashtree').hashTree;

ht.diff({one:{two:{a:1,b:2}},two:2}, {one:{two:{a:1,b:3}},two:2});
// => { diff1: {one:{two:{b:2}}}, diff2: {one:{two:{b:3}}} }

ht.diffToBase({one:{two:{a:1,b:2}},two:2}, {one:{two:{a:1,b:3}},two:2});
// => {one:{two:{b:3}}}
```

## License

Copyright (c) 2014 commenthol 

Software is released under [MIT][license].


[license]: ./LICENSE
[documentation]: ./docs/documentation.md


