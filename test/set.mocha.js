/* globals describe, it */

'use strict'

var
  assert = require('assert')
var hashTree = require('../hashtree.js').hashTree
var HashTree = require('../hashtree.js').HashTree

describe('hashTree.set', function () {
  describe('- set on non existing object', function () {
    var obj
    var r = hashTree.set(obj, 'it.it.it', 1)

    it('- shall return false', function () {
      assert.strictEqual(r, false)
    })
    it('- shall return undefined', function () {
      assert.deepStrictEqual(obj, undefined)
    })
  })

  describe('- set it it it to 0', function () {
    var obj = {}
    var r = hashTree.set(obj, 'it.it.it', 0)

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })
    it('- shall return obj', function () {
      assert.deepStrictEqual(obj, { it: { it: { it: 0 } } })
    })
  })

  describe('- set it it it to ""', function () {
    var obj = {}
    var r = hashTree.set(obj, 'it.it.it', '')

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })
    it('- shall return obj', function () {
      assert.deepStrictEqual(obj, { it: { it: { it: '' } } })
    })
  })

  describe('- set it it it to {}', function () {
    var obj = {}
    var r = hashTree.set(obj, 'it.it.it', {})

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })
    it('- shall return obj', function () {
      assert.deepStrictEqual(obj, { it: { it: { it: {} } } })
    })
  })

  describe('- overwriting an object with a value', function () {
    var
      r
    var obj = { it: { it: 1 } }
    r = hashTree.set(obj, 'it', 2)

    it('- shall return false', function () {
      assert.strictEqual(r, false)
    })

    it('- shall not overwrite the existing leaf', function () {
      assert.deepStrictEqual(obj, { it: { it: 1 } })
    })
  })

  describe('- force overwriting an object with a value', function () {
    var
      r
    var obj = { it: { it: { it: 1 } } }
    r = hashTree.set(obj, 'it.it', 2, true)

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })

    it('- shall overwrite the existing leaf', function () {
      assert.deepStrictEqual(obj, { it: { it: 2 } })
    })
  })

  describe('- overwriting a value', function () {
    var
      r
    var obj = { it: 2 }
    r = hashTree.set(obj, 'it.it', 1)

    it('- shall return false', function () {
      assert.strictEqual(r, false)
    })

    it('- shall not overwrite the existing value', function () {
      assert.deepStrictEqual(obj, { it: 2 })
    })
  })

  describe('- overwriting an object with an array', function () {
    var
      r
    var obj = { it: { it: [1] } }
    r = hashTree.set(obj, 'it', [1, 2])

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })

    it('- shall overwrite the existing leaf', function () {
      assert.deepStrictEqual(obj, { it: [1, 2] })
    })
  })

  describe('- overwriting an object with an object', function () {
    var
      r
    var obj = { it: { it: 1 } }
    r = hashTree.set(obj, 'it', { overwrite: 1 })

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })

    it('- shall not overwrite the existing leaf', function () {
      assert.deepStrictEqual(obj, { it: { overwrite: 1 } })
    })
  })

  describe('- overwriting an null object with an object', function () {
    var
      r
    var obj = { it: { it: null } }
    r = hashTree.set(obj, 'it .it', { overwrite: 1 })

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })

    it('- shall not overwrite the existing leaf', function () {
      assert.deepStrictEqual(obj, { it: { it: { overwrite: 1 } } })
    })
  })

  describe('- overwriting an empty object with an object', function () {
    var
      r
    var obj = { it: { it: {} } }
    r = hashTree.set(obj, 'it .it', { overwrite: 1 })

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })

    it('- shall not overwrite the existing leaf', function () {
      assert.deepStrictEqual(obj, { it: { it: { overwrite: 1 } } })
    })
  })

  describe('- setting a new value', function () {
    var
      r
    var obj = { it: 2 }
    r = hashTree.set(obj, 'it', 1)

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })

    it('- shall set the new value', function () {
      assert.deepStrictEqual(obj, { it: 1 })
    })
  })

  it('- extending', function () {
    var obj = {}
    hashTree.set(obj, 'one.it', 1)
    hashTree.set(obj, 'one.zero', 0)
    hashTree.set(obj, 'two', 2)
    hashTree.set(obj, 'three', '3')

    assert.deepStrictEqual(obj, { one: { it: 1, zero: 0 }, two: 2, three: '3' })
  })

  it('- extending; array notation', function () {
    var obj = {}
    hashTree.set(obj, ['one', 'it'], 1)
    hashTree.set(obj, ['two', 'next', 'again'], 2)
    hashTree.set(obj, ['three', 'is a string'], '3')

    assert.deepStrictEqual(obj, { one: { it: 1 }, two: { next: { again: 2 } }, three: { 'is a string': '3' } })
  })

  it('- set false', function () {
    var obj = {}
    hashTree.set(obj, 'one.it', false)

    assert.deepStrictEqual(obj, { one: { it: false } })
  })

  it('- set undefined', function () {
    var obj = {}
    hashTree.set(obj, 'one.it', undefined)

    assert.deepStrictEqual(obj, {})
  })

  it('- set value using reserved keywords', function () {
    var obj = {
      this: {}
    }
    hashTree.set(obj, 'this.constructor', 1)
    hashTree.set(obj, 'this.prototype', 'a')
    assert.deepStrictEqual(obj, { this: { constructor: 1, prototype: 'a' } })
  })

  it('- set value using reserved keywords #2', function () {
    var r
    var obj = {}
    hashTree.set(obj, [1, 5, 9], '#1')
    hashTree.set(obj, [1, 5, 9, 0], '#2')
    r = hashTree.get(obj, [1, 5, 9, 0])

    assert.deepStrictEqual(obj, { 1: { 5: { 9: '#1' } } })
    assert.deepStrictEqual(r, undefined)
  })
})

describe('HashTree.set', function () {
  describe('- set it it it to 0', function () {
    var ht = new HashTree()
    var r = ht.set('it.it.it', 0)

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })
    it('- shall return obj', function () {
      assert.deepStrictEqual(ht.tree(), { it: { it: { it: 0 } } })
    })
  })

  describe('- set it it it to ""', function () {
    var ht = new HashTree()
    var r = ht.set('it.it.it', '')

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })
    it('- shall return obj', function () {
      assert.deepStrictEqual(ht.tree(), { it: { it: { it: '' } } })
    })
  })

  it('- set it it it to {}', function () {
    var ht = new HashTree()
    var r = ht.set('it.it.it', {})

    it('- shall return true', function () {
      assert.strictEqual(r, true)
    })
    it('- shall return obj', function () {
      assert.deepStrictEqual(ht.tree(), { it: { it: { it: {} } } })
    })
  })

  it('- overwriting', function () {
    var ht = new HashTree()
    ht.set('it,it', 1)
    var r = ht.set('it', 2)

    it('- shall return false', function () {
      assert.strictEqual(r, false)
    })
    it('- shall not overwrite', function () {
      assert.deepStrictEqual(ht.tree(), { it: { it: 1 } })
    })
  })

  it('- extending', function () {
    var ht = new HashTree()
    ht.set('one.it', 1)
    ht.set('two', 2)
    ht.set('three', '3')

    assert.deepStrictEqual(ht.tree(), { one: { it: 1 }, two: 2, three: '3' })
  })

  it('- extending; array notation', function () {
    var ht = new HashTree()
    ht.set(['one', 'it'], 1)
    ht.set(['two', 'next', 'again'], 2)
    ht.set(['three', 'is a string'], '3')

    assert.deepStrictEqual(ht.tree(), { one: { it: 1 }, two: { next: { again: 2 } }, three: { 'is a string': '3' } })
  })

  it('- set false', function () {
    var ht = new HashTree()
    ht.set('one.it', false)

    assert.deepStrictEqual(ht.tree(), { one: { it: false } })
  })

  it('- delete and set', function () {
    var ht = new HashTree({ one: 1 })

    ht.delete()
    ht.set('two', 2)

    assert.deepStrictEqual(ht.tree(), { two: 2 })
  })

  it('- set undefined', function () {
    var ht = new HashTree()
    ht.set('one.it', undefined)

    assert.deepStrictEqual(ht.tree(), {})
  })

  it('- set value using reserved keywords', function () {
    var obj = { this: {} }
    var ht = new HashTree(obj)

    ht.set('this.constructor', 1)
    ht.set('this.prototype', 'a')
    assert.deepStrictEqual(ht.tree(), { this: { constructor: 1, prototype: 'a' } })
  })
})
