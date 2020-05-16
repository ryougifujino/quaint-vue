import Dep from "./dep.js";
import { arrayMethods } from "./array.js";

export default class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, '__ob__', this);

    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      defineReactive(obj, key, val);
    })
  }

  observeArray(items) {
    for (const item of items) {
      observe(item);
    }
  }
}

function defineReactive(data, key, val) {
  const childOb = observe(val);

  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();

      if (childOb) {
        childOb.dep.depend();
      }

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

function observe(value) {
  if (typeof value !== 'object') {
    return;
  }
  let ob;
  if (value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

export function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (target.hasOwnProperty(key)) {
    target[key] = val;
    return val;
  }

  const ob = target.__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    // warn
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}

function isValidArrayIndex(index) {
  return typeof index === 'number' && index >= 0;
}
