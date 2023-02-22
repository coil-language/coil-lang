"use strict";
function ObjectLiteral(obj) {
  Object.assign(this, obj);
}

function js_negate(val) {
  return !truthy(val);
}

function truthy(val) {
  return val !== null && val !== undefined && val !== false;
}

function js_and(a, b) {
  if (!truthy(a)) {
    return a;
  } else {
    return b();
  }
}

function js_object_delete(object, key) {
  delete object[key];
}

function js_or(a, b) {
  if (truthy(a)) {
    return a;
  } else {
    return b();
  }
}

function js_plus(a, b) {
  return a + b;
}

function js_minus(a, b) {
  return a - b;
}

function js_divide(a, b) {
  return a / b;
}

function js_times(a, b) {
  return a * b;
}

function js_exponent(a, b) {
  return a ** b;
}

function js_greater_than(a, b) {
  return a > b;
}

function js_less_than(a, b) {
  return a < b;
}

function js_greater_than_eq(a, b) {
  return a >= b;
}

function js_less_than_eq(a, b) {
  return a <= b;
}

function js_mod(a, b) {
  return a % b;
}

class AssertionError extends Error {}

function assert__b(cond, line, column, code_str, msg = "") {
  if (!cond) {
    throw new AssertionError(
      `Assertion Failed: ${msg}\n\n@ ${line}:${column} '${code_str}'`
    );
  }
}

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

function js_num_hash(num) {
  return num;
}

function js_str_hash(str) {
  let hash = 7n;
  for (let char of str) hash = hash * 31n + BigInt(char.charCodeAt());
  return hash;
}

function raise(err) {
  console.log(err);
  throw err;
}
