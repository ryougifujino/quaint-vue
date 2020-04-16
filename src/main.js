import './util/environment.js';
import Dep from "./core/dep.js";
import Watcher from "./core/watcher.js";

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
      val = newVal;
      dep.notify();
    }
  });
}

const vm = {
  data: {},
  $watch(pathOrFn, cb) {
    new Watcher(this, pathOrFn, cb);
  }
};
defineReactive(vm.data, 'name', 'Amy');

vm.$watch('name', function (newVal, oldVal) {
  console.log(`The name changes from ${oldVal} to ${newVal}`);
});

vm.data.name = 'Tom';
vm.data.name = 'Franklin';
