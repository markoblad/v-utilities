/// <reference types="mathjs" />
export declare class VUtilities {
    static makeString(value?: any): string;
    static coerceToString(value: any): string;
    static reverse(value: string): string;
    static isBlank(value?: any): boolean;
    static isObject(obj?: any): boolean;
    static isArray(obj: any): boolean;
    static isFunction(obj: any): boolean;
    static isDate(obj: any): boolean;
    static isString(value?: any): boolean;
    static isNumeric(value?: any): boolean;
    static isTrue(value?: any): boolean;
    static isFalse(value?: any): boolean;
    static isTrueOrFalse(value?: any): boolean;
    static eachSlice(value: any[], size: number | undefined, callback: Function): void;
    static arraySum(value?: any): number;
    static arrayItemCounts(array: any[] | null): any;
    static arraySort(array?: any[] | null): any;
    static arrayClosest(num: number, arr?: number[]): number | null;
    static arrayClosestBelowOrAbove(num: number, arr: number[] | undefined, orEqual: boolean | null, orAbove: boolean | null): number | null;
    static arrayClosestBelow(num: number, arr?: number[]): number | null;
    static arrayClosestAbove(num: number, arr?: number[]): number | null;
    static arrayEqualOrClosestBelow(num: number, arr?: number[]): number | null;
    static arrayEqualOrClosestAbove(num: number, arr?: number[]): number | null;
    static hasRangeOverlap(range1: [number, number], range2: [number, number], options?: {
        strict?: boolean;
        sort?: boolean;
    }): boolean;
    static filterHashes(hashes?: any[], selectorHash?: any): any[];
    static enumDate(obj?: any): number | null;
    static newUTCDateTimeStamp(): number;
    static convertDateToStartOfDayStamp(date: any): number | null;
    static periodsToSortedStamps(periods?: any[]): number[];
    static isLeapYear(year: number | string): boolean;
    static parseIntOrZero(value: number | string): number;
    static parseFloatOrZero(value: number | string): number;
    static parseBigOrZero(value: number | string): mathjs.BigNumber;
    static parseBigOrOne(value: number | string): mathjs.BigNumber;
}
export default VUtilities;
