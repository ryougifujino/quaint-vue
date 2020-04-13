export default class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    const index = this.subs.findIndex(s => s === sub);
    index !== -1 && this.subs.splice(index, 1);
  }

  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }

  notify(newVal, oldVal) {
    for (const sub of this.subs) {
      sub(newVal, oldVal);
    }
  }
}
