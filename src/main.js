require('./util/environment');

function defineReactive(data, key, val) {
  const dep = [];
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.push(window.target);
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      for (const fn of dep) {
        fn(newVal, val);
      }
      val = newVal;
    }
  });
}

const data = {};
defineReactive(data, 'name', 'Amy');

window.target = function (newVal, oldVal) {
  console.log(`The name changes from ${oldVal} to ${newVal}`);
}
console.log('data.name', data.name);
data.name = 'Tom';
data.name = 'Franklin';
