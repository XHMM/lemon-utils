export declare function getType(val: any): string;
export declare function assertType(receivedValue: any, expectedType: any): void | never;
export declare function objectToQS(obj?: Record<string, any>): string;
export declare function conditionalObjectMerge<T extends Record<string, any>, K extends Record<string, any>>(target: T, ...args: Array<[boolean, K]>): T & K | T;
export declare function conditionalArrayMerge(target: Array<any>, ...args: Array<[boolean, any]>): Array<any>;
export declare function valueExistsInObject(obj: any, ...values: Array<string | number>): boolean;
export declare function hasRepeat(arr: string[]): boolean;
