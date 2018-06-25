const {math,max}= require('./math');

const {should,expect} = require('chai');

const assert = require('assert');



// console.info(add(2,3));

// console.info(mul(2,3));

// should();
// add(2,3).should.equal(5);
//
// expect(add(2,3)).to.equal(5);
//
// assert.equal(mul(2,3),6);

//
// describe('#math',()=>{
//   describe('add test',function () {
//     it.only('should return 5 ', function () {
//       expect(add(2,3)).to.be.equal(5);
//     });
//   });
//
//   describe('mul test',function () {
//     it('should return 6 ', function () {
//       expect(mul(2,3)).to.be.equal(6);
//     });
//   })
// });

const a=3;
const b=2;

console.info('a+b=',a+b);

describe('#math',()=>{
  it('should return 5', function () {
    assert.equal(math.add(a,b),5);
  });
});

// describe('加法函数的测试', function() {
//   it('1 加 1 应该等于 2', function() {
//     expect(add(1, 1)).to.be.equal(2);
//   });
// });
//
//
// describe('Array', function() {
//   describe('#indexOf()', function() {
//     it('should return -1 when the value is not present', function() {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//   });
// });
