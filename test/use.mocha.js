/* globals describe, it */

'use strict'

var assert = require('assert')
var hashTree = require('../hashtree.js').hashTree
var HashTree = require('../hashtree.js').HashTree

describe('hashTree.use', function () {
  describe('rare cases', function () {
    it('use on root without key', function () {
      var obj = { a: 1 }
      var exp = { a: 1 }

      hashTree.use(obj)
      assert.deepStrictEqual(obj, exp)
    })
    it('use on array', function () {
      var obj = { c: ['a', 'b'] }
      var exp = { c: ['a7', 'b'] }

      hashTree.use(obj, 'c.0').add(7)
      // ~ console.log(obj);
      assert.deepStrictEqual(obj, exp)
    })
    it('use on array with unallowed key', function () {
      var obj = { c: ['a', 'b'] }
      var exp = { c: ['a', 'b'] }

      hashTree.use(obj, 'c.a').sub(7)
      // ~ console.log(obj); //==> { c: [ 'a', 'b', a: -7 ] }
      assert.strictEqual(obj.c.length, 2)
      assert.deepStrictEqual(JSON.stringify(obj), JSON.stringify(exp))
    })
    it('use on function', function () {
      var obj = {}
      obj.c = function () { return 'hi' }

      hashTree.use(obj, 'c').add(7)
      assert.strictEqual(obj.c(), 'hi')
      assert.strictEqual(typeof obj.c, 'function')
    })
  })

  describe('functions on numbers', function () {
    it('increment number', function () {
      var obj = { one: { a: 10 } }
      var exp = { one: { a: 11 } }

      hashTree.use(obj, 'one.a').inc()
      assert.deepStrictEqual(obj, exp)
    })
    it('decrement number', function () {
      var obj = { one: { a: 10 } }
      var exp = { one: { a: 9 } }

      hashTree.use(obj, 'one.a').dec()
      assert.deepStrictEqual(obj, exp)
    })
    it('add number', function () {
      var obj = { one: { a: 10 } }
      var exp = { one: { a: 20 } }

      hashTree.use(obj, 'one.a').add(10)
      assert.deepStrictEqual(obj, exp)
    })
    it('subtract number', function () {
      var obj = { one: { a: 10 } }
      var exp = { one: { a: -10 } }

      hashTree.use(obj, 'one.a').sub(20)
      assert.deepStrictEqual(obj, exp)
    })
    it('multiply number', function () {
      var obj = { one: { a: 10 } }
      var exp = { one: { a: 30 } }

      hashTree.use(obj, 'one.a').mul(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('divide number', function () {
      var obj = { one: { a: 36 } }
      var exp = { one: { a: 12 } }

      hashTree.use(obj, 'one.a').div(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('modulo number', function () {
      var obj = { one: { a: 37 } }
      var exp = { one: { a: 1 } }

      hashTree.use(obj, 'one.a').mod(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('or number', function () {
      var obj = { one: { a: 32 } }
      var exp = { one: { a: 35 } }

      hashTree.use(obj, 'one.a').or(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('and number', function () {
      var obj = { one: { a: 33 } }
      var exp = { one: { a: 1 } }

      hashTree.use(obj, 'one.a').and(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('bitwise not number', function () {
      var obj = { one: { a: 12 } }
      var exp = { one: { a: -13 } }

      hashTree.use(obj, 'one.a').not()
      assert.deepStrictEqual(obj, exp)
    })
  })

  describe('chaining', function () {
    it('set value and increment number', function () {
      var obj = {}
      var exp = { one: { a: 21 } }

      hashTree.use(obj, 'one.a', 20).inc()
      assert.deepStrictEqual(obj, exp)
    })
    it('perform multiple ops on number', function () {
      var obj = { one: { a: 10 } }
      var exp = { one: { a: 1 } }

      hashTree.use(obj, 'one.a').inc().add(10).sub(5).mul(7).div(3).dec().mod(7).or(0)
      assert.deepStrictEqual(obj, exp)
    })
    it('perform multiple logical ops on boolean', function () {
      var obj = { one: { a: true } }
      var exp = { one: { a: false } }

      hashTree.use(obj, 'one.a').or(true).and(true).not()
      assert.deepStrictEqual(obj, exp)
    })
    it('add number to uninitialized value', function () {
      var obj = {}
      var exp = { one: { a: 21 } }

      hashTree.use(obj, 'one.a').add(18)
      hashTree.use(obj, 'one.a').add(3)
      assert.deepStrictEqual(obj, exp)
    })
  })

  describe('functions on strings - automatic conversion to number', function () {
    it('increment', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: 11 } }

      hashTree.use(obj, 'one.a').inc()
      assert.deepStrictEqual(obj, exp)
    })
    it('decrement', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: 9 } }

      hashTree.use(obj, 'one.a').dec()
      assert.deepStrictEqual(obj, exp)
    })
    it('add', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: 15 } }

      hashTree.use(obj, 'one.a').add(5)
      assert.deepStrictEqual(obj, exp)
    })
    it('subtract number', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: -10 } }

      hashTree.use(obj, 'one.a').sub(20)
      assert.deepStrictEqual(obj, exp)
    })
    it('multiply number', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: 30 } }

      hashTree.use(obj, 'one.a').mul(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('divide number', function () {
      var obj = { one: { a: '99' } }
      var exp = { one: { a: 33 } }

      hashTree.use(obj, 'one.a').div(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('modulo number', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: 1 } }

      hashTree.use(obj, 'one.a').mod(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('or number', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: 11 } }

      hashTree.use(obj, 'one.a').or(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('and number', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: 2 } }

      hashTree.use(obj, 'one.a').and(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('bitwise not number', function () {
      var obj = { one: { a: '10' } }
      var exp = { one: { a: -11 } }

      hashTree.use(obj, 'one.a').not()
      assert.deepStrictEqual(obj, exp)
    })
  })

  describe('functions on strings ', function () {
    it('increment', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').inc()
      assert.deepStrictEqual(obj, exp)
    })
    it('decrement', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').dec()
      assert.deepStrictEqual(obj, exp)
    })
    it('add', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10test5' } }

      hashTree.use(obj, 'one.a').add('test5')
      assert.deepStrictEqual(obj, exp)
    })
    it('subtract string', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').sub(20)
      assert.deepStrictEqual(obj, exp)
    })
    it('multiply string', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').mul(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('divide string', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').div(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('modulo string', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').mod(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('or string', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').or(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('and string', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').and(3)
      assert.deepStrictEqual(obj, exp)
    })
    it('bitwise not string', function () {
      var obj = { one: { a: 'a10' } }
      var exp = { one: { a: 'a10' } }

      hashTree.use(obj, 'one.a').not()
      assert.deepStrictEqual(obj, exp)
    })
  })

  describe('get and set', function () {
    it('get number value', function () {
      var obj = { one: { a: 11 } }
      var exp = 11
      var res = hashTree.use(obj, 'one.a').get()
      assert.strictEqual(res, exp)
    })
    it('get string value converted to number', function () {
      var obj = { one: { a: '10' } }
      var exp = 10
      var res = hashTree.use(obj, 'one.a').get()
      assert.strictEqual(res, exp)
    })
    it('get string value ', function () {
      var obj = { one: { a: '10a' } }
      var exp = '10a'
      var res = hashTree.use(obj, 'one.a').get()
      assert.strictEqual(res, exp)
    })
    it('set number value', function () {
      var obj = { one: { a: 11 } }
      var exp = 11
      var res = hashTree.use(obj, 'one.a').set(exp).get()
      assert.strictEqual(res, exp)
    })
    it('set string value', function () {
      var obj = { one: { a: '10a' } }
      var exp = '10a'
      var res = hashTree.use(obj, 'one.a').set(exp).get()
      assert.strictEqual(res, exp)
    })
    it('set string value and convert to number', function () {
      var obj = { one: { a: '10' } }
      var exp = 20
      var res = hashTree.use(obj, 'one.a').set(exp).get()
      assert.strictEqual(res, exp)
    })
  })

  describe('keys', function () {
    it('get keys on undefined obj', function () {
      var obj
      var res
      res = hashTree.use(obj).keys()
      assert.deepStrictEqual(res, [])
    })
    it('get keys on empty obj', function () {
      var obj = {}
      var res
      res = hashTree.use(obj).keys()
      assert.deepStrictEqual(res, [])
    })
    it('get keys on obj with no keys', function () {
      var obj = { a: {} }

      var res
      res = hashTree.use(obj, 'a').keys()
      assert.deepStrictEqual(res, [])
    })
    it('get keys on obj with undefined keys', function () {
      var obj = {
        a: {
          b: {
            1: 11,
            2: 22,
            3: 33,
            4: 44
          }
        }
      }

      var res
      res = hashTree.use(obj).keys()
      assert.deepStrictEqual(res, ['a'])
      res = hashTree.use(obj, 'a').keys()
      assert.deepStrictEqual(res, ['b'])
      res = hashTree.use(obj, 'a.b').keys()
      assert.deepStrictEqual(res, ['1', '2', '3', '4'])
    })
    it('get keys from undefined keys', function () {
      var obj = {
        1: 11,
        2: 22,
        3: 33,
        4: 44
      }
      var res = hashTree.use(obj).keys()
      assert.deepStrictEqual(res, ['1', '2', '3', '4'])
    })
  })
})

describe('HashTree.use', function () {
  describe('chaining', function () {
    it('perform multiple ops on number', function () {
      var obj = { one: { a: 10 } }
      var exp = { one: { a: 1 } }
      var ht = new HashTree(obj)

      ht.use('one.a').inc().add(10).sub(5).mul(7).div(3).dec().mod(7).or(0)
      assert.deepStrictEqual(ht.tree(), exp)
    })
  })
})
