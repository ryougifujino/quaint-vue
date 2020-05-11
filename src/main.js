import './util/environment.js';
import Watcher from "./core/watcher.js";
import Observer from "./core/observer.js";

const vm = {
  data: {
    people: {
      name: ''
    }
  },
  $watch(pathOrFn, cb, options = {}) {
    const watcher = new Watcher(this, pathOrFn, cb, options);
    if (options.immediate) {
      cb.call(this, watcher.value);
    }
    return function unwatch() {
      watcher.teardown();
    };
  }
};

new Observer(vm.data);

vm.$watch('people', function (newVal, oldVal) {
  console.log(`The value changes from ${JSON.stringify(oldVal)} to ${JSON.stringify(newVal)}`);
}, {
  deep: true
});

vm.data.people.name = 'Tom';
