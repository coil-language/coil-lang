"use strict";
function ObjectLiteral(obj) {
  Object.assign(this, obj);
}

ObjectLiteral.from_entries = function (entries) {
  let output = new ObjectLiteral({});
  for (let [key, value] of entries) {
    output[key] = value;
  }
  return output;
};

ObjectLiteral.prototype[Symbol.iterator] = function* () {
  for (let key in this) {
    yield [key, this[key]];
  }
};

function js_instanceof(lhs, rhs) {
  return lhs instanceof rhs;
}

function js_set_property(obj, keys, expr) {
  let original_obj = obj;
  for (let key of keys.slice(0, -1)) {
    obj = obj[key];
  }
  obj[keys.at(-1)] = expr;
  return original_obj;
}
globalThis.js_set_property = js_set_property;

function js_lookup_property_key(obj, key) {
  return obj.prototype[key];
}
globalThis.js_lookup_property_key = js_lookup_property_key;

function js_dynamic_object_lookup(obj, key) {
  let result = obj[key];
  if (typeof result === "function") {
    return result.bind(obj);
  } else {
    return result;
  }
}
globalThis.js_dynamic_object_lookup = js_dynamic_object_lookup;

function js_negate(val) {
  return !truthy(val);
}
globalThis.js_negate = js_negate;

function truthy(val) {
  return val !== null && val !== undefined && val !== false;
}
globalThis.truthy = truthy;

function js_and(a, b) {
  if (!truthy(a)) {
    return a;
  } else {
    return b();
  }
}
globalThis.js_and = js_and;

function js_or(a, b) {
  if (truthy(a)) {
    return a;
  } else {
    return b();
  }
}
globalThis.js_or = js_or;

function js_nullish(a, b) {
  if (a === null || a === undefined) {
    return b();
  } else {
    return a;
  }
}
globalThis.js_nullish = js_nullish;

function js_plus(a, b) {
  return a + b;
}
globalThis.js_plus = js_plus;

function js_minus(a, b) {
  return a - b;
}
globalThis.js_minus = js_minus;

function js_divide(a, b) {
  return a / b;
}
globalThis.js_divide = js_divide;

function js_times(a, b) {
  return a * b;
}
globalThis.js_times = js_times;

function js_exponent(a, b) {
  return a ** b;
}
globalThis.js_exponent = js_exponent;

function js_greater_than(a, b) {
  return a > b;
}
globalThis.js_greater_than = js_greater_than;

function js_less_than(a, b) {
  return a < b;
}
globalThis.js_less_than = js_less_than;

function js_greater_than_eq(a, b) {
  return a >= b;
}
globalThis.js_greater_than_eq = js_greater_than_eq;

function js_less_than_eq(a, b) {
  return a <= b;
}
globalThis.js_less_than_eq = js_less_than_eq;

function js_mod(a, b) {
  return a % b;
}
globalThis.js_mod = js_mod;

class AssertionError extends Error {}
globalThis.AssertionError = AssertionError;

function assert__b(cond, line, column, code_str, msg = "") {
  if (!cond) {
    throw new AssertionError(
      `Assertion Failed: ${msg}\n\n@ ${line}:${column} '${code_str}'`
    );
  }
}
globalThis.assert__b = assert__b;

function Keyword(value) {
  this.value = value;
}

Keyword.cache = new Map();

Keyword.for = function (name) {
  if (Keyword.cache.get(name)) {
    return Keyword.cache.get(name);
  } else {
    let kw = new Keyword(name);
    Keyword.cache.set(name, kw);
    return kw;
  }
};

Keyword.prototype.valueOf = function () {
  return this.value;
};
Keyword.prototype.toString = function () {
  return this.value;
};

function raise__b(err) {
  throw err;
}

globalThis["raise__b"] = raise__b;
globalThis["Keyword"] = Keyword;
globalThis["ObjectLiteral"] = ObjectLiteral;
globalThis["truthy"] = truthy;
