export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

export function isValidArrayIndex(index) {
  return typeof index === 'number' && index >= 0;
}
