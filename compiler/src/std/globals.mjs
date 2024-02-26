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

// Keywords
export const from_memo = Symbol("String#from_memo");
let __keyword_cache = new Map();
String[from_memo] = function (string) {
  let value = __keyword_cache.get(string);
  if (value) {
    return value;
  } else {
    let value = new String(string);
    __keyword_cache.set(string, value);
    return value;
  }
};

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
    let out = new ObjectLiteral([]);
    for (let key in js_object) {
      out[key] = from_js(js_object[key]);
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
  throw new Error(str(...args));
}

export function type_of(object) {
  return typeof object;
}

export function str(...strs) {
  return strs.join("");
}
