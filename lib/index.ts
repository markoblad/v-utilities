import * as _ from 'lodash';
import * as moment from 'moment';
import * as mathjs from 'mathjs';

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

  public static isFunction(obj: any): boolean {
    const getType = {};
    return !!obj && getType.toString.call(obj) === '[object Function]';
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

  public static isBigNumber(value?: any): boolean {
    return mathjs.typeOf(value) === 'BigNumber';
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
      return _.reduce(value, (memo: number, num: any) => {
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

  public static bigArraySum(value?: any): mathjs.BigNumber {
    if (value && VUtilities.isArray(value)) {
      return _.reduce(value, (memo: any, num: any) => {
        let numType = mathjs.typeOf(num);
        return (
          (
            num &&
            (numType === 'BigNumber' || numType === 'string' || numType === 'number') &&
            (isFinite(num) || num.toString() === 'Infinity')
          ) ?
            mathjs.add(memo, numType === 'string' ? VUtilities.parseBigOrZero(num as string) : num) :
            memo
        );
      }, mathjs.bignumber(0));
    } else { return mathjs.bignumber(0); }
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

  public static rangeToArray(startIndex: number, endIndex: number): number[] {
    // TODO 20180629 - add support for negative numbers and reverse ranges
    return Array.from(Array(endIndex + 1).keys()).slice(startIndex, endIndex + 1);
  }

  public static filterHashes(hashes: any[] = [], selectorHash: any = {}): any[] {
    const returnObj = _.filter(hashes, (hash: any) => {
      const allTrue = _.every(selectorHash, (
        value: Function | string | number | boolean | null,
        key: string | number
      ) => {
        return (VUtilities.isFunction(value) ? (value as Function)(hash[key]) : hash[key] === value);
      });
      return allTrue;
    });
    return returnObj;
  }

  /*
   * Date methods
  */
  // returns timestamp in milliseconds
  public static enumDate(obj?: any): number | null {
    const dataFormatPriority = [
    // '2016-09-30T19:31:55.637-04:00'
      'YYYY-MM-DDTHH:mm:ss.SSS ZZ',
      'YYYY-MM-DDTHH:mm:ss.SSS Z',
      'YYYY-MM-DDTHH:mm:ss.SSS',

      'YYYY-MM-DD HH:mm:ss ZZ',
      'YYYY-MM-DD HH:mm:ss Z',
      'dddd MMMM DD, YYYY HH:mm:ss ZZ',
      'dddd MMMM DD, YYYY HH:mm:ss Z',
      'ddd MMMM DD, YYYY HH:mm:ss ZZ',
      'ddd MMMM DD, YYYY HH:mm:ss Z',
      'MMMM DD, YYYY HH:mm:ss ZZ',
      'MMMM DD, YYYY HH:mm:ss Z',
      'MMMM DD YYYY HH:mm:ss ZZ',
      'MMMM DD YYYY HH:mm:ss Z',
      'MMMM D, YYYY HH:mm:ss ZZ',
      'MMMM D, YYYY HH:mm:ss Z',
      'MMMM D YYYY HH:mm:ss ZZ',
      'MMMM D YYYY HH:mm:ss Z',
      'MMM D, YYYY HH:mm:ss Z',
      'MMM D, YYYY HH:mm:ss ZZ',
      'MMM D YYYY HH:mm:ss Z',
      'MMM D YYYY HH:mm:ss ZZ',
      'ddd MMM D YYYY HH:mm:ss Z',
      'ddd MMM D YYYY HH:mm:ss ZZ',

      'YYYY-MM-DD HH:mm:ss',
      'MMMM DD, YYYY HH:mm:ss',
      'dddd MMMM DD, YYYY HH:mm:ss',
      'ddd MMMM DD, YYYY HH:mm:ss',
      'MMMM DD YYYY HH:mm:ss',
      'MMMM D, YYYY HH:mm:ss',
      'MMMM D YYYY HH:mm:ss',
      'MMM D, YYYY HH:mm:ss',
      'MMM D YYYY HH:mm:ss',
      'ddd MMM D YYYY HH:mm:ss',

      'YYYY-MM-DD HH:mm ZZ',
      'YYYY-MM-DD HH:mm Z',
      'dddd MMMM DD, YYYY HH:mm ZZ',
      'dddd MMMM DD, YYYY HH:mm Z',
      'ddd MMMM DD, YYYY HH:mm ZZ',
      'ddd MMMM DD, YYYY HH:mm Z',
      'MMMM DD, YYYY HH:mm ZZ',
      'MMMM DD, YYYY HH:mm Z',
      'MMMM DD YYYY HH:mm ZZ',
      'MMMM DD YYYY HH:mm Z',
      'MMMM D, YYYY HH:mm ZZ',
      'MMMM D, YYYY HH:mm Z',
      'MMMM D YYYY HH:mm ZZ',
      'MMMM D YYYY HH:mm Z',
      'MMM D, YYYY HH:mm ZZ',
      'MMM D, YYYY HH:mm Z',
      'MMM D YYYY HH:mm ZZ',
      'MMM D YYYY HH:mm Z',
      'ddd MMM D YYYY HH:mm ZZ',
      'ddd MMM D YYYY HH:mm Z',

      'LLLL',
      'LLL',
      'LL',
      'L',

      'YYYY-MM-DD',
      'MM-DD-YYYY',
      'DD-MM-YYYY',

      'YYYY-M-D',
      'M-D-YYYY',
      'D-M-YYYY',

      'MMMM DD, YYYY',
      'MMMM D, YYYY',
      'MMM D, YYYY',

      'MMMM DD YYYY',
      'MMMM D YYYY',
      'MMM D YYYY',

      'MM-DD-YY',
      'DD-MM-YY',

      'M-D-YY',
      'D-M-YY',

      // 'YYYYMMDD',
    ];
    if (VUtilities.isBlank(obj)) return null;
    if (typeof(obj) === 'number') {
      // let exp = ParseInt(obj.toExponential().split(/e[\+\-]/)[1], 10);
      // if (exp < 12) {

      // } else {
        return obj;
      // }
    }
    if (typeof(obj) === 'string' &&
      (/^[12]\d{3}(?:0\d)|(?:1[012])(?:[012]\d)|(?:3[01])$/g).test(obj)
      && !(/\d\d\d\d023\d/g).test(obj)
    ) {
      return parseInt(moment.utc(obj, 'YYYYMMDD').format('x'), 10);
    }
    if (typeof(obj) === 'string' || typeof(obj) === 'object') {
      // let dateObj = Date.parse(obj);
      // let offset = new Date().getTimezoneOffset()*60000;
      // return new Date(dateObj).getTime() + offset
      if (VUtilities.isNumeric(obj)) {
        return parseInt(moment.utc(parseFloat(obj)).format('x'), 10);
      } else {
        return parseInt(moment.utc(obj, dataFormatPriority).format('x'), 10);
      }
    }
    console.log('typeof obj', typeof obj);
    if (obj instanceof moment) {
      return (obj).utc().format('x');
    }
    // return Date.parse(obj)
    return parseInt(moment.utc(obj).format('x'), 10);
  }

  public static newUTCDateTimeStamp(): number {
    // return VUtilities.enumDate(new Date()) as number;
    return VUtilities.enumDate(moment()) as number;
  }

  public static convertDateToStartOfDayStamp(date: any): number | null {
    // return VUtilities.enumDate(moment.utc(date).startOf('day'));
    if (date == null) return date;
    return VUtilities.enumDate(moment.utc(VUtilities.enumDate(date) || 0).startOf('day'));
  }

  public static periodsToSortedStamps(periods: any[] = []): number[] {
    const sortedPeriodStamps = _.chain(periods || [])
    .map((period: any) => {
      return VUtilities.enumDate(period);
    }).compact().uniq().sortBy().value();
    return sortedPeriodStamps;
  }

  public static isLeapYear(year: number | string) {
    year = parseInt(year as string, 10);
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  }

  /*
   * Number methods
  */
  public static parseIntOrZero(value?: number | string | mathjs.BigNumber | null): number {
    value = value || 0.0;
    value = VUtilities.isBigNumber(value) ? (mathjs.number(value) as number) : value;
    return VUtilities.isNumeric(value) ? parseInt(value as string) : 0;
  }

  public static parseFloatOrZero(value?: number | string | mathjs.BigNumber | null): number {
    value = value || 0.0;
    value = VUtilities.isBigNumber(value) ? (mathjs.number(value) as number) : value;
    return VUtilities.isNumeric(value) ? parseFloat(value as string) : 0.0;
  }

  public static parseBigOrZero(value?: number | mathjs.BigNumber | string | null): mathjs.BigNumber {
    value = value || 0.0;
    if (VUtilities.isBigNumber(value)) return value as mathjs.BigNumber;
    return mathjs.bignumber((VUtilities.isNumeric(value) ? value : 0.0) as number | string);
  }

  public static parseBigOrOne(value?: number | mathjs.BigNumber | string | null): mathjs.BigNumber {
    value = value === 0.0 ? value : (value || '');
    if (VUtilities.isBigNumber(value)) return value as mathjs.BigNumber;
    return mathjs.bignumber((VUtilities.isNumeric(value) ? value : 1.0) as number | string);
  }

}

export default VUtilities;
