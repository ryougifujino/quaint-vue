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
      console.log('Intercepted!');
      return original.apply(this, args);
    },
    enumerable: false,
    writable: true,
    configurable: true
  });
});
