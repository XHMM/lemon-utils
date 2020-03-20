export function type(val): string {
  return Object.prototype.toString
    .call(val)
    .split(" ")[1]
    .slice(0, -1)
    .toLowerCase();
}

export function assertType(receivedValue, expectedType): void | never {
  if (type(receivedValue) !== expectedType)
    throw new Error(
      `expect ${expectedType}, received ${type(receivedValue)}`
    );
}

export function conditionalObjectMerge<
  T extends Record<string, any>,
  K extends Record<string, any>
>(target: T, ...args: Array<[boolean, K]>): (T & K) | T {
  const obj = {};
  for (const [condition, val] of args) {
    assertType(val, "object");
    if (condition) Object.assign(obj, val);
  }

  return Object.assign(target, obj);
}

export function conditionalArrayMerge(
  target: Array<any>,
  ...args: Array<[boolean, any]>
): Array<any> {
  for (const [condition, val] of args) {
    if (condition) target.push(val);
  }

  return target;
}

export function valueExistsInObject(
  obj: any,
  ...values: Array<string | number>
): boolean {
  if (type(obj) !== "object")
    throw new TypeError(
      `the first parameter should be an object, received ${type(obj)}`
    );
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (values.includes(obj[key])) return true;
      if (type(obj[key]) === "object")
        return valueExistsInObject(obj[key], ...values);
    }
  }
  return false;
}

export function hasRepeat(arr: string[]): boolean {
  return arr.filter((item, idx) => arr.indexOf(item) !== idx).length !== 0;
}

export function sleep(seconds: number): Promise<void> {
  return new Promise<void>(resolve => {
    setTimeout(resolve, seconds*1000)
  })
}
