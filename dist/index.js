"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var moment = require("moment");
var math = require("mathjs");
var VUtilities = /** @class */ (function () {
    function VUtilities() {
    }
    /*
     * String methods
    */
    VUtilities.makeString = function (value) {
        if (value == null)
            return '';
        return '' + value;
    };
    VUtilities.coerceToString = function (value) {
        return _.some(['[object Undefined]', '[object Null]'], function (t) {
            return Object.prototype.toString.call(value) === t;
        }) ? '' : value.toString();
    };
    VUtilities.reverse = function (value) {
        return value.split('').reverse().join('');
    };
    /*
     * Type boolean methods
    */
    VUtilities.isBlank = function (value) {
        if (value == null || value == undefined) {
            return true;
        }
        else if (typeof value === 'string' || typeof value === 'number') {
            return (/^\s*$/).test(value.toString());
        }
        else if (VUtilities.isArray(value)) {
            return value.length === 0;
        }
        else if (VUtilities.isObject(value)) {
            return Object.getOwnPropertyNames(value).length === 0;
        }
        else {
            return (/^\s*$/).test(VUtilities.makeString(value));
        }
    };
    VUtilities.isObject = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };
    VUtilities.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    VUtilities.isFunction = function (obj) {
        var getType = {};
        return !!obj && getType.toString.call(obj) === '[object Function]';
    };
    VUtilities.isDate = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    };
    VUtilities.isString = function (value) {
        return (typeof (value) === 'string');
    };
    VUtilities.isNumeric = function (value) {
        return !VUtilities.isObject(value) && !VUtilities.isArray(value) && !isNaN(parseFloat(value)) && isFinite(value);
    };
    VUtilities.isBigNumber = function (value) {
        return math.typeof(value) === 'BigNumber';
    };
    VUtilities.isTrue = function (value) {
        if (value === undefined || value === null) {
            return false;
        }
        var arr = ['yes', 'y', 'true', 't', '1', 'on'];
        return (_.includes(arr, value.toString().toLowerCase()));
    };
    VUtilities.isFalse = function (value) {
        if (value === undefined || value === null) {
            return false;
        }
        var arr = ['no', 'n', 'false', 'f', '0', 'off'];
        return (_.includes(arr, value.toString().toLowerCase()));
    };
    VUtilities.isTrueOrFalse = function (value) {
        return VUtilities.isTrue(value) || VUtilities.isFalse(value);
    };
    /*
     * Array methods
    */
    VUtilities.eachSlice = function (value, size, callback) {
        if (size === void 0) { size = 1; }
        for (var i = 0, l = value.length; i < l; i += size) {
            callback(value.slice(i, i + size));
        }
    };
    VUtilities.arraySum = function (value) {
        if (value && VUtilities.isArray(value)) {
            return _.reduce(value, function (memo, num) {
                var numType = typeof num;
                return ((num &&
                    (numType === 'string' || numType === 'number') &&
                    (isFinite(num) || num === Infinity)) ?
                    memo + parseFloat(num) :
                    memo);
            }, 0);
        }
        else {
            return 0;
        }
    };
    VUtilities.arrayItemCounts = function (array) {
        return _.reduce(array || [], function (memo, e) {
            memo[e] = memo[e] || 0;
            memo[e] += 1;
            return memo;
        }, {});
    };
    VUtilities.arraySort = function (array) {
        if (array === void 0) { array = []; }
        var obj = _.map(array, function (i) { return i === 'Infinity' ? Infinity : (i === '-Infinity' ? -Infinity : i); });
        return obj.sort(function (a, b) { return (a - b); });
    };
    VUtilities.arrayClosest = function (num, arr) {
        if (arr === void 0) { arr = []; }
        if (!VUtilities.isNumeric(num) || !VUtilities.isArray(arr) || arr.length === 0)
            return null;
        num = parseFloat(num.toString());
        var curr = parseFloat(arr[0].toString());
        var diff = Math.abs(num - curr);
        arr.forEach(function (val) {
            if (!VUtilities.isBlank(val)) {
                var cleanVal = parseFloat(val.toString());
                var newdiff = Math.abs(num - cleanVal);
                if (VUtilities.isNumeric(val) && newdiff < diff) {
                    diff = newdiff;
                    curr = cleanVal;
                }
            }
        });
        return curr;
    };
    VUtilities.arrayClosestBelowOrAbove = function (num, arr, orEqual, orAbove) {
        if (arr === void 0) { arr = []; }
        if (!VUtilities.isNumeric(num) || !VUtilities.isArray(arr) || arr.length === 0) {
            return null;
        }
        num = parseFloat(num.toString());
        var obj = _.chain(arr).uniq().compact()
            .map(function (i) {
            return parseFloat(i.toString());
        }).value();
        obj = VUtilities.arraySort(obj);
        if (!orAbove) {
            obj = _.reverse(obj);
        }
        var closest = null;
        var fn;
        if (orEqual) {
            if (orAbove) {
                fn = function (val, num) { return val >= num; };
            }
            else {
                fn = function (val, num) { return val <= num; };
            }
        }
        else {
            if (orAbove) {
                fn = function (val, num) { return val > num; };
            }
            else {
                fn = function (val, num) { return val < num; };
            }
        }
        _.find(obj, function (val) {
            var r = VUtilities.isNumeric(val) && fn(val, num);
            // let r = val <= num;
            if (r)
                closest = val;
            return r;
        });
        return closest;
    };
    VUtilities.arrayClosestBelow = function (num, arr) {
        if (arr === void 0) { arr = []; }
        return VUtilities.arrayClosestBelowOrAbove(num, arr, false, false);
    };
    VUtilities.arrayClosestAbove = function (num, arr) {
        if (arr === void 0) { arr = []; }
        return VUtilities.arrayClosestBelowOrAbove(num, arr, false, true);
    };
    VUtilities.arrayEqualOrClosestBelow = function (num, arr) {
        if (arr === void 0) { arr = []; }
        return VUtilities.arrayClosestBelowOrAbove(num, arr, true, false);
    };
    VUtilities.arrayEqualOrClosestAbove = function (num, arr) {
        if (arr === void 0) { arr = []; }
        return VUtilities.arrayClosestBelowOrAbove(num, arr, true, true);
    };
    VUtilities.hasRangeOverlap = function (range1, range2, options) {
        if (options === void 0) { options = {}; }
        if (VUtilities.isTrue(options['sort'])) {
            range1 = range1.sort();
            range2 = range2.sort();
        }
        return range1 && range2 && range1.length === 2 && range2.length === 2 &&
            (VUtilities.isTrue(options['strict']) ?
                ((range1[0] !== range1[1]) && (((range1[0] < range2[1]) && (range1[1] > range2[0])) ||
                    ((range2[0] < range1[1]) && (range2[1] > range1[0])))) :
                ((range1[0] <= range2[1]) && (range2[0] <= range1[1])));
    };
    VUtilities.filterHashes = function (hashes, selectorHash) {
        if (hashes === void 0) { hashes = []; }
        if (selectorHash === void 0) { selectorHash = {}; }
        var returnObj = _.filter(hashes, function (hash) {
            var allTrue = _.every(selectorHash, function (value, key) {
                return (VUtilities.isFunction(value) ? value(hash[key]) : hash[key] === value);
            });
            return allTrue;
        });
        return returnObj;
    };
    /*
     * Date methods
    */
    VUtilities.enumDate = function (obj) {
        if (VUtilities.isBlank(obj))
            return null;
        if (typeof (obj) === 'number') {
            // let exp = ParseInt(obj.toExponential().split(/e[\+\-]/)[1], 10);
            // if (exp < 12) {
            // } else {
            return obj;
            // }
        }
        if (typeof (obj) === 'string' || typeof (obj) === 'object') {
            // let dateObj = Date.parse(obj);
            // let offset = new Date().getTimezoneOffset()*60000;
            // return new Date(dateObj).getTime() + offset
            return parseInt(moment.utc(obj).format('x'), 10);
        }
        // return Date.parse(obj)
        return parseInt(moment.utc(obj).format('x'), 10);
    };
    VUtilities.newUTCDateTimeStamp = function () {
        return VUtilities.enumDate(new Date());
    };
    VUtilities.convertDateToStartOfDayStamp = function (date) {
        return VUtilities.enumDate(moment.utc(date).startOf('day'));
    };
    VUtilities.periodsToSortedStamps = function (periods) {
        if (periods === void 0) { periods = []; }
        var sortedPeriodStamps = _.chain(periods || [])
            .map(function (period) {
            return VUtilities.enumDate(period);
        }).compact().uniq().sortBy().value();
        return sortedPeriodStamps;
    };
    VUtilities.isLeapYear = function (year) {
        year = parseInt(year, 10);
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    };
    /*
     * Number methods
    */
    VUtilities.parseIntOrZero = function (value) {
        return VUtilities.isNumeric(value) ? parseInt(value) : 0;
    };
    VUtilities.parseFloatOrZero = function (value) {
        return VUtilities.isNumeric(value) ? parseFloat(value) : 0.0;
    };
    VUtilities.parseBigOrZero = function (value) {
        value = value || 0.0;
        return VUtilities.isBigNumber(value) ? value : math.bignumber(VUtilities.isNumeric(value) ? value : 0.0);
    };
    VUtilities.parseBigOrOne = function (value) {
        value = value === 0.0 ? value : (value || '');
        return VUtilities.isBigNumber(value) ? value : math.bignumber(VUtilities.isNumeric(value) ? value : 1.0);
    };
    return VUtilities;
}());
exports.VUtilities = VUtilities;
exports.default = VUtilities;
