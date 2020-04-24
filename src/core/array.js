const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

[
  'push',
  'pop',
  'splice',
  'shift',
  'unshift',
  'reverse',
  'sort',
].forEach(method => {
  const original = arrayProto[method];

  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      const result = original.apply(this, args)
      this.__ob__.dep.notify();
      return result;
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
});
