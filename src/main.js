import './util/environment.js';
import Watcher from "./core/watcher.js";
import Observer from "./core/observer.js";

const vm = {
  data: {
    persons: []
  },
  $watch(pathOrFn, cb) {
    new Watcher(this, pathOrFn, cb);
  }
};
new Observer(vm.data);

vm.data.persons.push({
  name: 'Tom'
});

vm.$watch('persons[0].name', function (newVal, oldVal) {
  console.log(`The persons changes from ${oldVal} to ${newVal}`);
});

vm.data.persons[0].name = 'Franklin';
