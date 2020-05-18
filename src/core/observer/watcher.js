import {traverse} from "./traverse.js";

export default class Watcher {
  constructor(vm, pathOrFn, cb, options = {}) {
    this.vm = vm;
    this.deep = !!options.deep;
    this.depIds = new Set();
    this.deps = [];
    if (typeof pathOrFn === 'function') {
      this.getter = pathOrFn;
    } else {
      this.getter = parsePath(pathOrFn);
    }
    this.cb = cb;
    this.value = this.get();
  }

  get() {
    window.target = this;
    const value = this.getter.call(this.vm, this.vm.data);
    if (this.deep) {
      traverse(value);
    }
    window.target = undefined;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }

  addDep(dep) {
    const id = dep.id;
    if (!this.depIds.has(id)) {
      this.depIds.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }

  teardown() {
    for (const dep of this.deps) {
      dep.removeSub(this);
    }
  }
}

const RE_SEGMENT_WITH_BRACKET = /(.+?)\[(.+?)]/;

function parsePath(path) {
  const segments = path.split('.');
  return function (obj) {
    for (const segment of segments) {
      const segmentWithBracketReExecArray = RE_SEGMENT_WITH_BRACKET.exec(segment);
      if (segmentWithBracketReExecArray) {
        const realSegment = segmentWithBracketReExecArray[1];
        const bracketInner = segmentWithBracketReExecArray[2];
        obj = obj[realSegment][bracketInner];
      } else {
        obj = obj[segment];
      }
    }
    return obj;
  }
}
