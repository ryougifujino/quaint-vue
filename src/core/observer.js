import Dep from "./dep.js";
import { arrayMethods } from "./array.js";

export default class Observer {
  constructor(value) {
    this.dep = new Dep();
    def(value, '__ob__', this);

    if (!Array.isArray(value)) {
      this.walk(value);
    } else {
      value.__proto__ = arrayMethods;
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      defineReactive(obj, key, val);
    })
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
  if ('__ob__' in value && value.__ob__ instanceof Observer) {
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
