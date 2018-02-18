import * as _ from 'lodash';
import * as moment from 'moment';
import * as math from 'mathjs';

export class VUtilities {

  /*
   * String methods
  */
  public static makeString(value?: any): string {
    if (value == null) return '';
    return '' + value;
  }

  public static coerceToString(value: any): string {
    return _.some(['[object Undefined]', '[object Null]'], (t): boolean => {
      return Object.prototype.toString.call(value) === t;
    }) ? '' : value.toString();
  }

  public static reverse(value: string): string {
    return value.split('').reverse().join('');
  }

  /*
   * Type boolean methods
  */
  public static isBlank(value?: any): boolean {
    if (value == null || value == undefined) {
      return true;
    } else if (typeof value === 'string' || typeof value === 'number') {
      return (/^\s*$/).test(value.toString());
    } else if (VUtilities.isArray(value)){
      return value.length === 0;
    } else if (VUtilities.isObject(value)) {
      return Object.getOwnPropertyNames(value).length === 0;
    } else {
      return (/^\s*$/).test(VUtilities.makeString(value));
    }
  }

  public static isObject(obj?: any): boolean {
    return Object.prototype.toString.call( obj ) === '[object Object]';
  }

  public static isArray(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  public static isDate(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Date]';
  }

  public static isString(value?: any): boolean {
    return (typeof(value) === 'string');
  }

  public static isNumeric(value?: any): boolean {
    return !VUtilities.isObject(value) && !VUtilities.isArray(value) && !isNaN(parseFloat(value)) && isFinite(value);
  }

  public static isTrue(value?: any): boolean {
    if (value === undefined || value === null) {
      return false;
    }
    let arr = ['yes', 'y', 'true', 't', '1', 'on'];
    return (_.includes(arr, value.toString().toLowerCase()));
  }

  public static isFalse(value?: any): boolean {
    if (value === undefined || value === null) {
      return false;
    }
    let arr = ['no', 'n', 'false', 'f', '0', 'off'];
    return (_.includes(arr, value.toString().toLowerCase()));
  }

  public static isTrueOrFalse(value?: any): boolean {
    return VUtilities.isTrue(value) || VUtilities.isFalse(value);
  }

  /*
   * Array methods
  */
  public static eachSlice(value: any[], size: number = 1, callback: Function): void {
    for (let i = 0, l = value.length; i < l; i += size) {
      callback(value.slice(i, i + size));
    }
  }

  public static arraySum(value?: any): number {
    if (value && VUtilities.isArray(value)) {
      return _.reduce(value, function(memo: number, num: any) {
        let numType = typeof num;
        return (
          (
            num &&
            (numType === 'string' || numType === 'number') &&
            (isFinite(num) || num === Infinity)
          ) ?
            memo + parseFloat(num) :
            memo
        );
      }, 0);
    } else { return 0; }
  }

  public static arrayItemCounts(array: any[] | null): any {
    return _.reduce(array || [], function(memo: any, e: any){
      memo[e] = memo[e] || 0; memo[e] += 1; return memo;
    }, {});
  }

  public static arraySort(array: any[] | null = []): any {
    let obj = _.map(array, (i) => { return i === 'Infinity' ? Infinity : (i === '-Infinity' ? -Infinity : i) });
    return obj.sort((a, b) => { return (a - b); });
  }

  public static arrayClosest(num: number, arr: number[] = []): number | null {
    if (!VUtilities.isNumeric(num) || !VUtilities.isArray(arr) || arr.length === 0) return null;
    num = parseFloat(num.toString());
    let curr: number = parseFloat(arr[0].toString());
    let diff: number = Math.abs(num - curr);
    arr.forEach((val: number | string) => {
      if (!VUtilities.isBlank(val)) {
        let cleanVal: number = parseFloat(val.toString());
        let newdiff: number = Math.abs(num - cleanVal);
        if (VUtilities.isNumeric(val) && newdiff < diff) {
          diff = newdiff;
          curr = cleanVal;
        }
      }
    });
    return curr;
  }

  public static arrayClosestBelowOrAbove(
    num: number,
    arr: number[] = [],
    orEqual: boolean | null,
    orAbove: boolean | null
  ): number | null {
    if (!VUtilities.isNumeric(num) || !VUtilities.isArray(arr) || arr.length === 0) { return null; }
    num = parseFloat(num.toString());
    let obj = _.chain(arr).uniq().compact()
    .map((i: number) => {
      return parseFloat(i.toString());
    }).value();
    obj = VUtilities.arraySort(obj);
    if (!orAbove) { obj = _.reverse(obj); }
    let closest = null;
    let fn: Function;
    if (orEqual) {
      if (orAbove) {
        fn = function(val: number, num: number): boolean { return val >= num; }
      } else {
        fn = function(val: number, num: number): boolean { return val <= num; }
      }
    } else {
      if (orAbove) {
        fn = function(val: number, num: number): boolean { return val > num; }
      } else {
        fn = function(val: number, num: number): boolean { return val < num; }
      }
    }
    _.find(obj, (val: number) => {
      let r = VUtilities.isNumeric(val) && fn(val, num);
      // let r = val <= num;
      if (r) closest = val;
      return r;
    });
    return closest;
  }

  public static arrayClosestBelow(num: number, arr: number[] = []): number | null {
    return VUtilities.arrayClosestBelowOrAbove(num, arr, false, false);
  }

  public static arrayClosestAbove(num: number, arr: number[] = []): number | null {
    return VUtilities.arrayClosestBelowOrAbove(num, arr, false, true);
  }

  public static arrayEqualOrClosestBelow(num: number, arr: number[] = []): number | null {
    return VUtilities.arrayClosestBelowOrAbove(num, arr, true, false);
  }

  public static arrayEqualOrClosestAbove(num: number, arr: number[] = []): number | null {
    return VUtilities.arrayClosestBelowOrAbove(num, arr, true, true);
  }

  public static hasRangeOverlap(
    range1: [number, number],
    range2: [number, number],
    options: {strict?: boolean, sort?: boolean} = {}
  ): boolean {
    if (VUtilities.isTrue(options['sort'])) {
      range1 = range1.sort();
      range2 = range2.sort();
    }
    return range1 && range2 && range1.length === 2 && range2.length === 2 &&
    (VUtilities.isTrue(options['strict']) ?
      ( 
        (range1[0] !== range1[1]) && (
          ((range1[0] < range2[1]) && (range1[1] > range2[0])) ||
          ((range2[0] < range1[1]) && (range2[1] > range1[0]))
        )
      ) :
      ((range1[0] <= range2[1]) && (range2[0] <= range1[1]))
    );
  }

  /*
   * Date methods
  */
  public static enumDate(obj?: any) {
    if (VUtilities.isBlank(obj)) return null;
    if (typeof(obj) === 'number') {
      // let exp = ParseInt(obj.toExponential().split(/e[\+\-]/)[1], 10);
      // if (exp < 12) {

      // } else {
        return obj;
      // }
    }
    if (typeof(obj) === 'string' || typeof(obj) === 'object') {
      // let dateObj = Date.parse(obj);
      // let offset = new Date().getTimezoneOffset()*60000;
      // return new Date(dateObj).getTime() + offset
      return parseInt(moment.utc(obj).format('x'), 10);
    }
    // return Date.parse(obj)
    return parseInt(moment.utc(obj).format('x'), 10);
  }

  public static newUTCDateTimeStamp(): number {
    return VUtilities.enumDate(new Date()) as number;
  }

  /*
   * Number methods
  */
  public static parseBigOrZero(value: number | string) {
    return math.bignumber(VUtilities.isNumeric(value) ? value : 0.0);
  }

}

export default VUtilities;