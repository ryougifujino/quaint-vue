import Dep from "./dep.js";
import { arrayMethods } from "./array.js";

export default class Observer {
  constructor(value) {

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
  if (typeof val === 'object') {
    new Observer(val);
  }

  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
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
