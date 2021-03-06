/* globals describe, it */

'use strict'

var assert = require('assert')
var hashTree = require('../hashtree.js').hashTree

describe('object differences', function () {
  it('- compare empty', function () {
    var o1 = {}
    var o2 = {}

    var result = hashTree.diff(o1, o2)
    var expected = { diff1: {}, diff2: {} }

    assert.deepStrictEqual(result, expected)
  })

  it('- compare same objects', function () {
    var o1 = { a: { b: 'b' }, c: 3 }
    var o2 = { a: { b: 'b' }, c: 3 }

    var result = hashTree.diff(o1, o2)
    var expected = { diff1: {}, diff2: {} }

    assert.deepStrictEqual(result, expected)
  })

  it('- compare only in 1', function () {
    var o1 = { a: 'a' }
    var o2 = {}

    var result = hashTree.diff(o1, o2)
    var expected = { diff1: { a: 'a' }, diff2: {} }

    assert.deepStrictEqual(result, expected)
  })

  it('- compare only in 2', function () {
    var o1 = {}
    var o2 = { a: 'a' }

    var result = hashTree.diff(o1, o2)
    var expected = { diff1: {}, diff2: { a: 'a' } }

    assert.deepStrictEqual(result, expected)
  })

  it('- compare different properties', function () {
    var o1 = { a: 0 }
    var o2 = { a: { b: 'b' } }

    var result = hashTree.diff(o1, o2)
    var expected = { diff1: { a: 0 }, diff2: { a: { b: 'b' } } }

    assert.deepStrictEqual(result, expected)
  })

  it('- compare different and common properties', function () {
    var o1 = { a: 0, c: 3 }
    var o2 = { a: { b: 'b' }, c: 3 }

    var result = hashTree.diff(o1, o2)
    var expected = { diff1: { a: 0 }, diff2: { a: { b: 'b' } } }

    assert.deepStrictEqual(result, expected)
  })

  it('- compare different and common properties with reserved keywords', function () {
    var o1 = { constructor: 0, c: 3 }
    var o2 = { prototype: { b: 'b' }, c: 3 }

    var result = hashTree.diff(o1, o2)
    var expected = { diff1: { constructor: 0 }, diff2: { prototype: { b: 'b' } } }

    assert.deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  })
})

describe('object differences to base', function () {
  it('- compare empty', function () {
    var o1 = {}
    var o2 = {}

    var result = hashTree.diffToBase(o1, o2)
    var expected = {}

    assert.deepStrictEqual(result, expected)
  })

  it('- compare different properties', function () {
    var o1 = { one: { a: 1, c: 3 } }
    var o2 = { one: { a: 1, b: 2 } }

    var result = hashTree.diffToBase(o1, o2)
    var expected = { one: { b: 2 } }

    assert.deepStrictEqual(result, expected)
  })
})
