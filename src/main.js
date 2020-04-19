import './util/environment.js';
import Watcher from "./core/watcher.js";
import Observer from "./core/observer.js";

const vm = {
  data: {
    nameObj : {
      name: 'Amy'
    }
  },
  $watch(pathOrFn, cb) {
    new Watcher(this, pathOrFn, cb);
  }
};
new Observer(vm.data);

vm.$watch('nameObj.name', function (newVal, oldVal) {
  console.log(`The name changes from ${oldVal} to ${newVal}`);
});

vm.data.nameObj.name = 'Tom';
vm.data.nameObj.name = 'Franklin';
