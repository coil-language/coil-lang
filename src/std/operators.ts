function negate(val) {
  return !truthy(val);
}

function truthy(val) {
  return val !== null && val !== undefined && val !== false;
}

function and(a, b) {
  if (!truthy(a)) {
    return b;
  } else {
    return a;
  }
}

function or(a, b) {
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

function js_multiply(a, b) {
  return a * b;
}

function js_exponent(a, b) {
  return a ** b;
}

class AssertionError extends Error {}

function assert__b(cond, line, column, code_str, msg = "") {
  if (!cond) {
    throw new AssertionError(
      `Assertion Failed: ${msg}\n\n@ ${line}:${column} '${code_str}'`
    );
  }
}
