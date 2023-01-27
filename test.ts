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

const Equal = Symbol("Equal");
Number.prototype[Equal] = {
  eq__q(other) {
    return this === other;
  },
};
String.prototype[Equal] = {
  eq__q(other) {
    return this === other;
  },
};
BigInt.prototype[Equal] = {
  eq__q(other) {
    return this === other;
  },
};
Array.prototype[Equal] = {
  eq__q(other) {
    if (truthy(!(other instanceof Array))) {
      return false;
    } else {
    }
    if (truthy(this.length !== other.length)) {
      return false;
    } else {
    }
    return this.every(function (value, index) {
      return value[Equal](other[index]);
    });
  },
};
Map.prototype[Equal] = {
  eq__q(other) {
    if (truthy(!(other instanceof Map))) {
      return false;
    } else {
    }
    if (truthy(this.size !== other.size)) {
      return false;
    } else {
    }
    for (let [key, value] of this.entries()) {
      if (truthy(negate(other.get(key)[Equal](value)))) {
        return false;
      } else {
      }
    }
    return true;
  },
};
Object.prototype[Equal] = {
  eq__q(other) {
    for (let [key, value] of Object.entries(this)) {
      if (truthy(negate(value[Equal](other[key])))) {
        return false;
      } else {
      }
    }
    return true;
  },
};
function eq__q(a, b) {
  return a[Equal].eq__q.bind(a)(b);
}

const Iter = Symbol("Iter");
function entries() {
  return Object.entries(this);
}
function from_entries() {
  return Object.fromEntries(this);
}
Object.prototype[Iter] = {
  each(f) {
    return entries
      .bind(this)()
      .forEach(function ([k, v]) {
        return f(k, v);
      });
  },
  map(f) {
    return from_entries.bind(
      entries
        .bind(this)()
        .map(function ([k, v]) {
          return f(k, v);
        })
    )();
  },
  filter(f) {
    return from_entries.bind(
      entries
        .bind(this)()
        .filter(function ([k, v]) {
          return f(k, v);
        })
    )();
  },
  some__q(f) {
    return from_entries.bind(
      entries
        .bind(this)()
        .some(function ([k, v]) {
          return f(k, v);
        })
    )();
  },
  every__q(f) {
    return from_entries.bind(
      entries
        .bind(this)()
        .every(function ([k, v]) {
          return f(k, v);
        })
    )();
  },
  reduce(f, start) {
    return entries.bind(this)().reduce(f, start);
  },
  insert(key, value) {
    return Object.assign(this, { key: value });
  },
  sum() {
    return entries
      .bind(this)()
      .map(function ([_, v]) {
        return v;
      })
      .reduce(function (acc, x) {
        return acc + x;
      }, 0);
  },
};
Array.prototype[Iter] = {
  each(f) {
    return this.forEach(f);
  },
  map(f) {
    return this.map(f);
  },
  filter(f) {
    return this.filter(f);
  },
  reduce(f, start) {
    return this.reduce(f, start);
  },
  insert(value) {
    return [...this, value];
  },
  sum() {
    return this.reduce(function (acc, x) {
      return acc + x;
    }, 0);
  },
  some__q(f) {
    return this.some(f);
  },
  every__q(f) {
    return this.every(f);
  },
};
Set.prototype[Iter] = {
  each(f) {
    for (let elem of this) {
      f(elem);
    }
  },
  map(f) {
    let out = new Set([]);
    for (let elem of this) {
      out.add(f(elem));
    }
    return out;
  },
  reduce(f, start) {
    let acc = start;
    for (let elem of this) {
      acc = f(acc, elem);
    }
    return acc;
  },
  filter(f) {
    let out = new Set([]);
    for (let elem of this) {
      if (truthy(f(elem))) {
        out.add(elem);
      } else {
      }
    }
    return out;
  },
  insert(elem) {
    return new Set(a).add(elem);
  },
  sum() {
    return Array.from(this).reduce(function (acc, x) {
      return acc + x;
    }, 0);
  },
  some__q(f) {
    for (let elem of this) {
      if (truthy(f(elem))) {
        return true;
      } else {
      }
    }
    return false;
  },
  every__q(f) {
    for (let elem of this) {
      if (truthy(negate(f(elem)))) {
        return false;
      } else {
      }
    }
    return true;
  },
};
function each(f) {
  return this[Iter].each.bind(this)(call.bind(f));
}
function map(f) {
  return this[Iter].map.bind(this)(call.bind(f));
}
function filter(f) {
  return this[Iter].filter.bind(this)(call.bind(f));
}
function some__q(f) {
  return this[Iter].some__q.bind(this)(call.bind(f));
}
function every__q(f) {
  return this[Iter].every__q.bind(this)(call.bind(f));
}
function reduce(f, start) {
  return this[Iter].reduce.bind(this)(call.bind(f), start);
}
function insert(...args) {
  return this[Iter].insert.bind(this)(...args);
}
function sum() {
  return this[Iter].sum.bind(this)();
}

const Callable = Symbol("Callable");
Function.prototype[Callable] = {
  call(...args) {
    return this(...args);
  },
};
Set.prototype[Callable] = {
  call(key) {
    return this.has(key);
  },
};
Map.prototype[Callable] = {
  call(key) {
    return this.get(key);
  },
};
Object.prototype[Callable] = {
  call(key) {
    return this[key];
  },
};
String.prototype[Callable] = {
  call(object) {
    return call.bind(object)(this);
  },
};
Array.prototype[Callable] = {
  call(index) {
    return this.at(index);
  },
};
function call(...args) {
  return this[Callable].call.bind(this)(...args);
}

const Plus = Symbol("Plus");
const Minus = Symbol("Minus");
const Times = Symbol("Times");
const Divide = Symbol("Divide");
const Exponent = Symbol("Exponent");
Number.prototype[Plus] = {
  plus(other) {
    assert__b(typeof other === "number", 9, 13, `typeof(other) === "number"`);
    return js_plus(this, other);
  },
};
Number.prototype[Minus] = {
  minus(other) {
    assert__b(typeof other === "number", 16, 13, `typeof(other) === "number"`);
    return js_minus(this, other);
  },
};
Number.prototype[Times] = {
  times(other) {
    assert__b(typeof other === "number", 23, 13, `typeof(other) === "number"`);
    return js_times(this, other);
  },
};
Number.prototype[Divide] = {
  times(other) {
    assert__b(typeof other === "number", 30, 13, `typeof(other) === "number"`);
    return js_divide(this, other);
  },
};
Number.prototype[Exponent] = {
  exponent(other) {
    assert__b(typeof other === "number", 37, 13, `typeof(other) === "number"`);
    return js_exponent(this, other);
  },
};
String.prototype[Plus] = {
  plus(other) {
    assert__b(typeof other === "string", 44, 13, `typeof(other) === "string"`);
    return js_plus(this, other);
  },
};
function plus(other) {
  return this[Plus].plus.bind(this)(other);
}
function minus(other) {
  return this[Minus].minus.bind(this)(other);
}
function divide_by(other) {
  return this[Divide].divide_by.bind(this)(other);
}
function times(other) {
  return this[Times].times.bind(this)(other);
}
assert__b(10 > 10, 1, 9, `10>10`);
