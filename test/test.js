'use strict';
var expect = require('chai').expect;
var VTools = require('v-tools').VTools;
var index = require('../dist/index.js');
var VUtilities = index.VUtilities;

describe('VUtilities functions test', () => {

  it('should return makeString for various', () => {
    var result = [
      VUtilities.makeString(null),
      VUtilities.makeString(),
      VUtilities.makeString(undefined),
      VUtilities.makeString(0),
      VUtilities.makeString('0'),
      VUtilities.makeString(1),
      VUtilities.makeString(''),
      VUtilities.makeString({}),
      VUtilities.makeString({0:null}),
      VUtilities.makeString([]),
      VUtilities.makeString([0]),
      VUtilities.makeString(['']),
      VUtilities.makeString(true),
      VUtilities.makeString(false),
    ];
    var expectation = [
      '',
      '',
      '',
      '0',
      '0',
      '1',
      '',
      '[object Object]',
      '[object Object]',
      '',
      '0',
      '',
      'true',
      'false',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return coerceToString for various', () => {
    var result = [
      VUtilities.coerceToString(null),
      VUtilities.coerceToString(),
      VUtilities.coerceToString(undefined),
      VUtilities.coerceToString(0),
      VUtilities.coerceToString('0'),
      VUtilities.coerceToString(1),
      VUtilities.coerceToString(''),
      VUtilities.coerceToString({}),
      VUtilities.coerceToString({0:null}),
      VUtilities.coerceToString([]),
      VUtilities.coerceToString([0]),
      VUtilities.coerceToString(['']),
      VUtilities.coerceToString(true),
      VUtilities.coerceToString(false),
    ];
    var expectation = [
      '',
      '',
      '',
      '0',
      '0',
      '1',
      '',
      '[object Object]',
      '[object Object]',
      '',
      '0',
      '',
      'true',
      'false',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });  
  it('should return reverse', () => {
    var result = VUtilities.reverse('1234');
    expect(result).to.equal('4321');
  });

  it('should return isBlank for various', () => {
    var result = [
      VUtilities.isBlank(null),
      VUtilities.isBlank(),
      VUtilities.isBlank(undefined),
      VUtilities.isBlank(0),
      VUtilities.isBlank('0'),
      VUtilities.isBlank(1),
      VUtilities.isBlank(''),
      VUtilities.isBlank({}),
      VUtilities.isBlank({0:null}),
      VUtilities.isBlank([]),
      VUtilities.isBlank([0]),
      VUtilities.isBlank(['']),
      VUtilities.isBlank(true),
      VUtilities.isBlank(false),
    ];
    var expectation = [
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isObject for various', () => {
    var result = [
      VUtilities.isObject(null),
      VUtilities.isObject(),
      VUtilities.isObject(undefined),
      VUtilities.isObject(0),
      VUtilities.isObject('0'),
      VUtilities.isObject(1),
      VUtilities.isObject(''),
      VUtilities.isObject({}),
      VUtilities.isObject({0:null}),
      VUtilities.isObject([]),
      VUtilities.isObject([0]),
      VUtilities.isObject(['']),
      VUtilities.isObject(true),
      VUtilities.isObject(false),
      VUtilities.isObject(RegExp('\\d')),
      VUtilities.isObject(new RegExp('\\d')),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return isArray for various', () => {
    var result = [
      VUtilities.isArray(null),
      VUtilities.isArray(),
      VUtilities.isArray(undefined),
      VUtilities.isArray(0),
      VUtilities.isArray('0'),
      VUtilities.isArray({}),
      VUtilities.isArray({0:null}),
      VUtilities.isArray([]),
      VUtilities.isArray([0]),
      VUtilities.isArray(true),
      VUtilities.isArray(false),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isDate for various', () => {
    var result = [
      VUtilities.isDate(null),
      VUtilities.isDate(),
      VUtilities.isDate(undefined),
      VUtilities.isDate(0),
      VUtilities.isDate('0'),
      VUtilities.isDate({}),
      VUtilities.isDate({0:null}),
      VUtilities.isDate([]),
      VUtilities.isDate([0]),
      VUtilities.isDate(true),
      VUtilities.isDate(false),
      VUtilities.isDate(Date.now()), // returns a number
      VUtilities.isDate(new Date()),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isString for various', () => {
    var result = [
      VUtilities.isString(null),
      VUtilities.isString(),
      VUtilities.isString(undefined),
      VUtilities.isString(0),
      VUtilities.isString('0'),
      VUtilities.isString({}),
      VUtilities.isString({0:null}),
      VUtilities.isString([]),
      VUtilities.isString([0]),
      VUtilities.isString(true),
      VUtilities.isString(false),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isNumeric for various', () => {
    var result = [
      VUtilities.isNumeric(null),
      VUtilities.isNumeric(),
      VUtilities.isNumeric(undefined),
      VUtilities.isNumeric(0),
      VUtilities.isNumeric('0'),
      VUtilities.isNumeric({}),
      VUtilities.isNumeric({0:null}),
      VUtilities.isNumeric([]),
      VUtilities.isNumeric([0]),
      VUtilities.isNumeric(true),
      VUtilities.isNumeric(false),
      VUtilities.isNumeric(NaN),
      VUtilities.isNumeric(Infinity),
    ];
    var expectation = [
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isTrue for various', () => {
    var result = [
      VUtilities.isTrue(null),
      VUtilities.isTrue(),
      VUtilities.isTrue(undefined),
      VUtilities.isTrue(0),
      VUtilities.isTrue('0'),
      VUtilities.isTrue({}),
      VUtilities.isTrue({0:null}),
      VUtilities.isTrue([]),
      VUtilities.isTrue([0]),
      VUtilities.isTrue(true),
      VUtilities.isTrue(false),
      VUtilities.isTrue('yEs'),
      VUtilities.isTrue('Y'),
      VUtilities.isTrue('TRUE'),
      VUtilities.isTrue('T'),
      VUtilities.isTrue(1),
      VUtilities.isTrue('On'),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isFalse for various', () => {
    var result = [
      VUtilities.isFalse(null),
      VUtilities.isFalse(),
      VUtilities.isFalse(undefined),
      VUtilities.isFalse(0),
      VUtilities.isFalse('0'),
      VUtilities.isFalse({}),
      VUtilities.isFalse({0:null}),
      VUtilities.isFalse([]),
      VUtilities.isFalse([0]), // gets stringified
      VUtilities.isFalse(true),
      VUtilities.isFalse(false),
      VUtilities.isFalse('nO'),
      VUtilities.isFalse('N'),
      VUtilities.isFalse('FALSE'),
      VUtilities.isFalse('F'),
      VUtilities.isFalse(0),
      VUtilities.isFalse('OFF'),
    ];
    var expectation = [
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isTrueOrFalse for various', () => {
    var result = [
      VUtilities.isTrueOrFalse(null),
      VUtilities.isTrueOrFalse(),
      VUtilities.isTrueOrFalse(undefined),
      VUtilities.isTrueOrFalse(0),
      VUtilities.isTrueOrFalse('0'),
      VUtilities.isTrueOrFalse({}),
      VUtilities.isTrueOrFalse({0:null}),
      VUtilities.isTrueOrFalse([]),
      VUtilities.isTrueOrFalse([0]), // gets stringified
      VUtilities.isTrueOrFalse(true),
      VUtilities.isTrueOrFalse(false),
      VUtilities.isTrueOrFalse('yEs'),
      VUtilities.isTrueOrFalse('Y'),
      VUtilities.isTrueOrFalse('TRUE'),
      VUtilities.isTrueOrFalse('T'),
      VUtilities.isTrueOrFalse(1),
      VUtilities.isTrueOrFalse('On'),
      VUtilities.isTrueOrFalse('nO'),
      VUtilities.isTrueOrFalse('N'),
      VUtilities.isTrueOrFalse('FALSE'),
      VUtilities.isTrueOrFalse('F'),
      VUtilities.isTrueOrFalse(0),
      VUtilities.isTrueOrFalse('OFF'),
    ];
    var expectation = [
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return eachSlice for various', () => {
    var result = '';
    VUtilities.eachSlice([1, 2, 3, 4, 5, 6], 3, function(numberPiece) {
      result += numberPiece.join('');
    });
    var expectation = [1, 2, 3, 4, 5, 6];
    expect(result).to.equal(expectation.join(''));
  });

  it('should return arraySum for various', () => {
    var result = [
      VUtilities.arraySum(null),
      VUtilities.arraySum([null, undefined, 0, '0', 1, '1', {}, {0:null}, [], [1], true, false, '3.0001%', '$1', 0.1, '0.01']),
      VUtilities.arraySum([null, undefined, 0, '0', 1, '1', {}, {0:null}, [], [1], true, false, NaN, '$1', 0.1, '0.01']),
      VUtilities.arraySum([null, undefined, 0, '0', 1, '1', {}, {0:null}, [], [1], true, false, NaN, Infinity, 0.1, '0.1']),
    ];
    var expectation = [
      0,
      2.11,
      2.11,
      Infinity,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return arrayItemCounts for null', () => {
    var result = VUtilities.arrayItemCounts(null);
    expect(VTools.hashesToLines([null])).to.equal(VTools.hashesToLines([result]));
  });

  it('should return arrayItemCounts', () => {
    var result = VUtilities.arrayItemCounts([0, 1, 0, '0', null, null, 'null', '1', 2.1, 2.10, 'v', 'va', 'v', 3]);
    expect(VTools.hashesToLines([result])).to.equal(VTools.hashesToLines([{'0': 3, '1': 2, null: 3, '2.1': 2, 'v': 2, 'va': 1, 3: 1}]));
  });
  it('should return arraySort', () => {
    var result = VUtilities.arraySort(null);
    expect(result.toString()).to.equal([].toString());
    var result = VUtilities.arraySort([-1, 3, 2.1, -1.1, '-Infinity', null]);
    expect(result.toString()).to.equal([-Infinity, -1.1, -1.0, null, 2.1, 3.0].toString());
  });
  it('should return arrayClosest', () => {
    var result = VUtilities.arrayClosest(1, null);
    expect(result).to.equal(null);
    var result = VUtilities.arrayClosest(0.5, [-1, 3, 2.1, -1.1, '-Infinity', null, 1.0]);
    expect(result).to.equal(1.0);
  });
  it('should return arrayClosestBelow', () => {
    var result = VUtilities.arrayClosestBelow(1, null);
    expect(result).to.equal(null);
  });
  it('should return arrayClosestBelow', () => {
    var result = VUtilities.arrayClosestBelow(0.5, [-1, 3, 2.1, -1.1, '-Infinity', null]);
    expect(result).to.equal(-1.0);
  });
  it('should return arrayEqualOrClosestBelow', () => {
    var result = VUtilities.arrayEqualOrClosestBelow(1, null);
    expect(result).to.equal(null);
  });
  it('should return arrayEqualOrClosestBelow', () => {
    var result = VUtilities.arrayEqualOrClosestBelow(0.5, [-1, 3, 2.1, -1.1, '-Infinity', null]);
    expect(result).to.equal(-1.0);
  });
  it('should return arrayEqualOrClosestBelow', () => {
    var result = VUtilities.arrayEqualOrClosestBelow(0.5, [-1, 3, 2.1, -1.1, '-Infinity', null, 0.5]);
    expect(result).to.equal(0.5);
  });
  it('should return arrayClosestAbove', () => {
    var result = VUtilities.arrayClosestAbove(1, null);
    expect(result).to.equal(null);
  });
  it('should return arrayClosestAbove', () => {
    var result = VUtilities.arrayClosestAbove(0.5, [-1, 3, 2.1, -1.1, '-Infinity', null]);
    expect(result).to.equal(2.1);
  });
  it('should return arrayEqualOrClosestAbove', () => {
    var result = VUtilities.arrayEqualOrClosestAbove(1, null);
    expect(result).to.equal(null);
  });
  it('should return arrayEqualOrClosestAbove', () => {
    var result = VUtilities.arrayEqualOrClosestAbove(0.5, [-1, 3, 2.1, -1.1, '-Infinity', null]);
    expect(result).to.equal(2.1);
  });
  it('should return arrayEqualOrClosestAbove', () => {
    var result = VUtilities.arrayEqualOrClosestAbove(0.5, [-1, 3, 2.1, -1.1, '-Infinity', null, 0.5]);
    expect(result).to.equal(0.5);
  });
  it('should return hasRangeOverlap for various', () => {
    var result = [
      VUtilities.hasRangeOverlap([0, 1], [1, 2]),
      VUtilities.hasRangeOverlap([0, 1], [1, 2], {strict: true}),
      VUtilities.hasRangeOverlap([0, 1.1], [1, 2], {strict: true}),
      VUtilities.hasRangeOverlap([1, 2], [0, 1.1], {strict: true}),
      VUtilities.hasRangeOverlap([1, 2], [1.1, 0], {strict: true}),
      VUtilities.hasRangeOverlap([1, 2], [1.1, 0], {strict: true, sort: true}),
      VUtilities.hasRangeOverlap([-1, 2], [1, 2]),
      VUtilities.hasRangeOverlap([0, 1.1], [1, 2]),
      VUtilities.hasRangeOverlap([1, 2], [0, 1.1]),
      VUtilities.hasRangeOverlap([2, 1], [0, 1.1]),
      VUtilities.hasRangeOverlap([2, 1], [0, 1.1], {sort: true}),
      VUtilities.hasRangeOverlap([2], [0, 1.1]),
      VUtilities.hasRangeOverlap([2, 2, 2], [0, 1.1]),
    ];
    var expectation = [
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('for enumDate should get unix UTC timestamp given a unix UTC timestamp', () => {
    var result = VTools.enumDate(1439344269);
    expect(result).to.equal(1439344269);
  });
  it('for enumDate should get unix UTC timestamp given a date', () => {
    var result = VTools.enumDate('August 11, 2015');
    // 1439265600000
    expect(result).to.equal(1439251200000);
  });
  it('for enumDate should get unix UTC timestamp given a date', () => {
    var result = VTools.enumDate('August 11, 2015 21:51:09');
    expect(result).to.equal(1439329869000);
  });
  it('for enumDate should get NaN given a date wrapped in an array', () => {
    var result = VTools.enumDate(['August 11, 2015 21:51:09']);
    expect(result.toString()).to.equal(NaN.toString());
  });
  it('for newUTCDateTimeStamp should get unix UTC timestamp', () => {
    var result = VTools.newUTCDateTimeStamp();
    expect(result.toString().length).to.equal(13);
  });

});
