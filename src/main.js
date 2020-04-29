import './util/environment.js';
import Watcher from "./core/watcher.js";
import Observer from "./core/observer.js";

const vm = {
  data: {
    name: '',
    age: ''
  },
  $watch(pathOrFn, cb, options = {}) {
    const watcher = new Watcher(this, pathOrFn, cb);
    if (options.immediate) {
      cb.call(this, watcher.value);
    }
    return function unwatch() {
      watcher.teardown();
    };
  }
};

new Observer(vm.data);

const unwatch = vm.$watch(function () {
  return this.data.name + this.data.age;
}, function (newVal, oldVal) {
  console.log(`The value changes from ${oldVal} to ${newVal}`);
}, {
  immediate: true
});

vm.data.name = 'Tom';
vm.data.age = "20";

unwatch();

vm.data.name = 'Franklin';
