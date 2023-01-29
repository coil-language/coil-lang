function Nil() {}

let nil = new Nil();

function ObjectLiteral(obj) {
  Object.assign(this, obj);
}

function negate(val) {
  return !truthy(val);
}

function truthy(val) {
  return val !== nil && val !== null && val !== undefined && val !== false;
}

function js_and(a, b) {
  if (!truthy(b)) {
    return a;
  } else {
    return b;
  }
}

function js_or(a, b) {
  if (truthy(a)) {
    return a;
  }
  return b;
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

Keyword.cache = {};

Keyword.for = function (name) {
  return (Keyword.cache[name] ||= new Keyword(name));
};

Keyword.prototype.valueOf = function () {
  return this.value;
};
Keyword.prototype.toString = function () {
  return this.value;
};
