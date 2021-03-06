/* globals describe, it */

'use strict'

var
  assert = require('assert')
var hashTree = require('../hashtree.js').hashTree
var HashTree = require('../hashtree.js').HashTree

function sortDesc (a, b) {
  return (a > b) ? -1 : (a === b ? 0 : 1)
}

describe('hashTree.sort', function () {
  it('- sort empty object', function () {
    var obj = {}
    var result = hashTree.sort(obj)
    var expected = {}

    assert.strictEqual(JSON.stringify(result), JSON.stringify(expected))
  })

  it('- sort object', function () {
    var obj = {
      z: { zz: 3, zm: 2, za: 1 },
      a: { am: 2, aa: 1, az: 3 },
      m: { mm: 2, mz: 3, ma: 1 }
    }
    var result = hashTree.sort(obj)
    var expected = {
      a: { aa: 1, am: 2, az: 3 },
      m: { ma: 1, mm: 2, mz: 3 },
      z: { za: 1, zm: 2, zz: 3 }
    }

    assert.strictEqual(JSON.stringify(result), JSON.stringify(expected))
  })

  it('- sort object with custom sorter', function () {
    var obj = {
      z: { az: 3, am: 2, aa: 1 },
      a: { am: 2, aa: 1, az: 3 },
      m: { am: 2, az: 3, aa: 1 }
    }

    var result = hashTree.sort(obj, sortDesc)
    var expected = {
      z: { az: 3, am: 2, aa: 1 },
      m: { az: 3, am: 2, aa: 1 },
      a: { az: 3, am: 2, aa: 1 }
    }

    assert.strictEqual(JSON.stringify(result), JSON.stringify(expected))
  })

  it('- sort object with array custom sorter', function () {
    var obj = {
      z: { az: [8, 7, 9], am: 2, aa: 1 },
      a: { am: [2, 3, 1], aa: 1, az: 3 },
      m: { am: 1, az: 3, aa: [4, 5, 6] }
    }

    var result = hashTree.sort(obj, sortDesc, sortDesc)
    var expected = {
      z: { az: [9, 8, 7], am: 2, aa: 1 },
      m: { az: 3, am: 1, aa: [6, 5, 4] },
      a: { az: 3, am: [3, 2, 1], aa: 1 }
    }

    assert.strictEqual(JSON.stringify(result), JSON.stringify(expected))
  })
})

describe('HashTree.sort', function () {
  it('- sort HashTree with custom sorter', function () {
    var obj = {
      z: { az: 3, am: 2, aa: 1 },
      a: { am: 2, aa: 1, az: 3 },
      m: { am: 2, az: 3, aa: 1 }
    }
    var ht = new HashTree(obj)

    ht.sort(sortDesc)

    var expected = {
      z: { az: 3, am: 2, aa: 1 },
      m: { az: 3, am: 2, aa: 1 },
      a: { az: 3, am: 2, aa: 1 }
    }

    assert.strictEqual(JSON.stringify(ht.tree()), JSON.stringify(expected))
  })
})
