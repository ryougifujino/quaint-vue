import './util/environment.js';
import Watcher from "./core/watcher.js";
import Observer from "./core/observer.js";

const vm = {
  data: {
    names: []
  },
  $watch(pathOrFn, cb) {
    new Watcher(this, pathOrFn, cb);
  }
};
new Observer(vm.data);

vm.$watch('names', function (newVal, oldVal) {
  console.log(`The names changes from ${oldVal} to ${newVal}`);
});

vm.data.names.push('Tom');
vm.data.names.push('Franklin');
