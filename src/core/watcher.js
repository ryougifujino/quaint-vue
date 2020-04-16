export default class Watcher {
  constructor(vm, pathOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(pathOrFn);
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    window.target = this;
    const value = this.getter(this.vm.data);
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

function parsePath(path) {
  const segments = path.split('.');
  return function (obj) {
    for (const segment of segments) {
      obj = obj[segment];
    }
    return obj;
  }
}
