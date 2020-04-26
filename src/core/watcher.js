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
