import {isObject} from "../util/index.js";

const seenObjects = new Set();

export function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse(val, seen) {
  const isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return;
  }
  if (val.__ob__) {
    const depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    let i = val.length;
    while (i--) _traverse(val[i], seen);
  } else {
    Object.keys(val).forEach(key => _traverse(val[key], seen));
  }
}
