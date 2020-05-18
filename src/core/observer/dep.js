let uid = 0;

export default class Dep {
  constructor() {
    this.subs = [];
    this.id = uid++;
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
      window.target.addDep(this);
    }
  }

  notify() {
    for (const sub of this.subs) {
      sub.update();
    }
  }
}
