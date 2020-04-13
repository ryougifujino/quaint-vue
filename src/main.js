import './util/environment.js';
import Dep from "./core/dep.js";

function defineReactive(data, key, val) {
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      dep.notify(newVal, val);
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
