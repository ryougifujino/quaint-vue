import './util/environment.js';
import Watcher from "./core/observer/watcher.js";
import Observer, {set, del} from "./core/observer/index.js";

const vm = {
  data: {
    people: {
      name: 'Tom',
      age: '18'
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
  },
  $set: set,
  $delete: del
};

new Observer(vm.data);

vm.$watch('people', function (newVal, oldVal) {
  console.log(`The value changes from ${JSON.stringify(oldVal)} to ${JSON.stringify(newVal)}`);
}, {
  deep: true
});

delete vm.data.people.name;
setTimeout(() => {
  vm.$delete(vm.data.people, 'age');
}, 2000);

