import Meta from "./meta.js";

class CondMap {
  constructor(entries) {
    this.entries = entries;
  }

  [Meta.invoke](value) {
    let result = this.entries.find(([f, _]) =>
      f[Meta.invoke](value)[Meta.as_bool]()
    );
    if (result) {
      return result[1];
    }
  }

  get [Symbol.toStringTag]() {
    return this.entries.length.toString();
  }

  [Symbol.iterator]() {
    return this.entries[Symbol.iterator]();
  }
}

export default CondMap;
