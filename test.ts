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

function protocol_for(sym) {
  let proto = this[sym];
  let self = this;
  return new Proxy(proto, {
    get(target, method) {
      return target[method].bind(self);
    },
  });
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
Object.prototype[Callable] = {
  call(key) {
    return this[key];
  },
};
String.prototype[Callable] = {
  call(object) {
    return object[this];
  },
};
Array.prototype[Callable] = {
  call(index) {
    return this.at(index);
  },
};
function call(...args) {
  return protocol_for
    .bind(this)(Callable)
    .call(...args);
}

const Iter = Symbol("Iter");
Object.prototype[Iter] = {
  each(f) {
    return Object.entries(this).forEach(function ([k, v]) {
      return f(k, v);
    });
  },
  map(f) {
    return Object.fromEntries(
      Object.entries(this).map(function ([k, v]) {
        return f(k, v);
      })
    );
  },
  filter(f) {
    return Object.fromEntries(
      Object.entries(this).filter(function ([k, v]) {
        return f(k, v);
      })
    );
  },
  reduce(f, start) {
    return Object.entries(this).reduce(f, start);
  },
  insert(key, value) {
    return Object.assign(this, { key: value });
  },
  sum() {
    return Object.entries(this)
      .map(function ([_, v]) {
        return v;
      })
      .reduce(function (acc, x) {
        return acc + x;
      }, 0);
  },
  some__q(f) {
    return Object.fromEntries(
      Object.entries(this).some(function ([k, v]) {
        return f(k, v);
      })
    );
  },
  every__q(f) {
    return Object.fromEntries(
      Object.entries(this).every(function ([k, v]) {
        return f(k, v);
      })
    );
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
function iter() {
  return protocol_for.bind(this)(Iter);
}
function each(f) {
  return iter.bind(this)().each(call.bind(f));
}
function map(f) {
  return iter.bind(this)().map(call.bind(f));
}
function filter(f) {
  return iter.bind(this)().filter(call.bind(f));
}
function reduce(f, start) {
  return iter.bind(this)().reduce(call.bind(f), start);
}
function insert(...args) {
  return iter
    .bind(this)()
    .insert(...args);
}
function sum() {
  return iter.bind(this)().sum();
}
function some__q(f) {
  return iter.bind(this)().some(call.bind(f));
}
function every__q(f) {
  return iter.bind(this)().every(call.bind(f));
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
  return protocol_for.bind(a)(Equal).eq__q(b);
}
async function* f() {
  let a = await 10;
  let response = yield http.get();
  for await (let data of response) {
    view.bind(data)();
  }
}
