"use strict";

export class ObjectLiteral {
  constructor(entries) {
    Object.assign(this, Object.fromEntries(entries));
  }
  *[Symbol.iterator]() {
    for (let key in this) {
      yield [key, this[key]];
    }
  }
}

export class Nil {
  toString() {
    return "";
  }
  *[Symbol.iterator]() {}
}

export let nil = new Nil();

export class Keyword {
  static cache = new Map();
  static for(name) {
    if (this.cache.get(name)) {
      return Keyword.cache.get(name);
    } else {
      let kw = new Keyword(name);
      Keyword.cache.set(name, kw);
      return kw;
    }
  }
  constructor(value) {
    this.value = value;
  }
  [Symbol.toPrimitive]() {
    return this.value;
  }
  toString() {
    return this.value;
  }
}

export function dot(lhs, rhs) {
  let result = lhs[rhs];
  if (typeof result === "function") {
    let fn = result.bind(lhs);
    for (let key in result) {
      fn[key] = result[key]?.bind(lhs);
    }
    return fn;
  } else {
    return result ?? nil;
  }
}

export function from_js(js_object) {
  if (js_object == null) {
    return nil;
  } else if (Object.getPrototypeOf(js_object) === Object.prototype) {
    let out = new ObjectLiteral();
    for (let key in js_object) {
      out[key] = js_object[key];
    }
    return out;
  } else {
    return js_object;
  }
}

export function raise__b(error) {
  console.error(error.stack);
  throw error;
}

export function panic__b(...args) {
  throw args.map((x) => x.toString()).join("");
}

export function type_of(object) {
  return typeof object;
}

export function str(...strs) {
  return strs.join("");
}
