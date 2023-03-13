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

function raise__b(err) {
  console.log(err);
  throw err;
}
const Hash = Symbol("Hash");
String.prototype[Hash] = function () {
  return js_str_hash(this);
};
Number.prototype[Hash] = function () {
  return this;
};
Keyword.prototype[Hash] = function () {
  return hash.bind(plus.call("____coil_keyword:", this.value))();
};
Array.prototype[Hash] = function () {
  return reduce.bind(this)(function (value, elem, idx) {
    return plus.call(times.call(value, 31n), hash.bind(elem)());
  }, 7n);
};
ObjectLiteral.prototype[Hash] = function () {
  return reduce.bind(this)(function (value, entry) {
    return plus.call(times.call(value, 31n), hash.bind(entry)());
  }, 7n);
};
Map.prototype[Hash] = function () {
  return reduce.bind(this)(function (hash_value, key, value) {
    return plus.call(times.call(hash_value, 31n), hash.bind([key, value])());
  }, 7n);
};
function hash() {
  return this[Hash]();
}
const Record = Symbol("Record");
Map[Record] = function (entries) {
  return new Map(entries);
};
ObjectLiteral[Record] = function (entries) {
  return from_entries.bind(entries)();
};
function record__q() {
  return as_bool.bind(this.constructor[Record])();
}
function construct_record(entries) {
  return this[Record](entries);
}
const Vector = Symbol("Vector");
function vector__q() {
  return as_bool.bind(this.constructor[Vector])();
}
Array[Vector] = function (entries) {
  return entries;
};
function construct_vector(entries) {
  return this[Vector](entries);
}
const Validation = Symbol("Validation");
const Constructors = Symbol("Constructors");
const Defaults = Symbol("Defaults");
function StructValidationError(message) {
  this.name = "StructValidationError";
  this.message = message;
  this.stack = new Error().stack;
}
StructValidationError.prototype = new Error();
function validate_struct(struct_name) {
  if (truthy(negate.call(Validation in this))) {
    return true;
  }
  function error_msg(key, validator) {
    return str(
      struct_name,
      " validation failed.\n",
      "Failed at ",
      key,
      ".\n",
      "Expected [",
      validator,
      "]",
      ", got value ",
      this[key],
      "."
    );
  }
  for (let [key, validator] of entries.bind(this[Validation])()) {
    if (truthy(matches__q.bind(validator)(this[key]))) {
      continue;
    } else {
      raise__b(new StructValidationError(error_msg.bind(this)(key, validator)));
    }
  }
}
function construct_struct_values() {
  if (truthy(negate.call(Constructors in this))) {
    return null;
  }
  for (let [key, f] of entries.bind(this[Constructors])()) {
    if (truthy(eq__q.call(typeof f, "function"))) {
      f = f.bind(this);
    }
    let __coil_if_let_temp = call.bind(f)(this[key]);
    if (truthy(__coil_if_let_temp)) {
      let prop_val = __coil_if_let_temp;
      this[key] = prop_val;
    }
  }
}
function set_struct_defaults() {
  if (truthy(negate.call(Defaults in this))) {
    return null;
  }
  for (let [key, fallback] of entries.bind(this[Defaults])()) {
    if (truthy(exists__q.bind(this[key])())) {
      continue;
    } else {
      this[key] = fallback;
    }
  }
}
function Struct(name, ...properties) {
  function Constructor(...args) {
    let i = 0;
    for (let key of properties) {
      this[key] = args[i];
      i = plus.call(i, 1);
    }
    validate_struct.bind(this)(name);
    construct_struct_values.bind(this)(this);
    set_struct_defaults.bind(this)(this);
  }
  Object.defineProperty(
    Constructor,
    "name",
    new ObjectLiteral({ value: name })
  );
  return Constructor;
}
Struct[Vector] = function (args) {
  return Struct(...args);
};
const Call = Symbol("Call");
Symbol.prototype[Call] = function (obj, ...args) {
  return obj[this](...args);
};
Function.prototype[Call] = function (...args) {
  return this(...args);
};
Set.prototype[Call] = function (key) {
  return this.has(key);
};
Map.prototype[Call] = function (key) {
  return this.get(key);
};
ObjectLiteral.prototype[Call] = function (key) {
  return this[key];
};
Array.prototype[Call] = function (index) {
  return this.at(index);
};
String.prototype[Call] = function (collection) {
  if (
    truthy(
      or.call(
        typeof collection === "string",
        () => collection instanceof Keyword
      )
    )
  ) {
    raise__b(
      new TypeError(
        plus.call("Can't 'call' a string with", as_str.bind(collection)())
      )
    );
  } else {
    return call.bind(collection)(this);
  }
};
Number.prototype[Call] = function (collection) {
  if (truthy(collection instanceof Keyword)) {
    return this[collection];
  } else {
    return call.bind(collection)(this);
  }
};
Keyword.prototype[Call] = function (collection) {
  if (
    truthy(
      or.call(
        collection instanceof Keyword,
        () => typeof collection === "string"
      )
    )
  ) {
    raise__b(
      new TypeError(
        plus.call("Can't 'call' a keyword with", as_str.bind(collection)())
      )
    );
  } else if (Call in collection) {
    return call.bind(collection)(this);
  } else {
    return collection[this];
  }
};
function call(...args) {
  return this?.[Call](...args);
}
Set.prototype[Keyword.for("bind")] = function (val) {
  return function () {
    return call.bind(this)(val);
  }.bind(this);
};
Map.prototype[Keyword.for("bind")] = function (val) {
  return function () {
    return call.bind(this)(val);
  }.bind(this);
};
const Pipe = Symbol("Pipe");
Object.prototype[Pipe] = function (callable) {
  return call.bind(callable)(this);
};
function freeze() {
  return Object.freeze(this);
}
let nil__q = freeze.bind(new Set([undefined, null]))();
function pipe_one(callable) {
  if (truthy(nil__q.bind(this)())) {
    return call.bind(callable)(this);
  } else {
    return this[Pipe](callable);
  }
}
function pipe(...callables) {
  return reduce.bind(callables)(function (r, c) {
    return pipe_one.bind(r)(c);
  }, this);
}
function compose(first_fn, ...fns) {
  return function (...args) {
    return reduce.bind(fns)(function (result, f) {
      return call.bind(f)(result);
    }, call.bind(first_fn)(...args));
  };
}
function impl_callable(f) {
  f[Call] = function (first, ...rest) {
    return f.bind(first)(...rest);
  };
  return f;
}
const Equal = Symbol("Equal");
function strict_eq__q(other) {
  return this === other;
}
Object.prototype[Equal] = strict_eq__q;
function vector_eq__q(other) {
  if (truthy(negate.call(eq__q.call(len.bind(this)(), len.bind(other)())))) {
    return false;
  }
  return all__q.bind(zip.bind(this)(other))(function ([a, b]) {
    return eq__q.call(a, b);
  });
}
function record_eq__q(other) {
  if (truthy(negate.call(record__q.bind(other)()))) {
    return false;
  }
  if (truthy(negate.call(eq__q.call(len.bind(this)(), len.bind(other)())))) {
    return false;
  }
  return all__q.bind(this)(function (key, value) {
    return eq__q.call(at.bind(other)(key), value);
  });
}
Set.prototype[Equal] = vector_eq__q;
Array.prototype[Equal] = vector_eq__q;
Map.prototype[Equal] = record_eq__q;
ObjectLiteral.prototype[Equal] = record_eq__q;
let eq__q = impl_callable(function eq__q(other) {
  if (truthy(nil__q.bind(this)())) {
    return this === other;
  } else {
    return this[Equal](other);
  }
});
const Clone = Symbol("Clone");
ObjectLiteral.prototype[Clone] = new ObjectLiteral({
  clone() {
    return new ObjectLiteral({ ...this });
  },
  deep_clone() {
    return map.bind(this)(function (k, v) {
      return [k, deep_clone.bind(v)()];
    });
  },
});
Array.prototype[Clone] = new ObjectLiteral({
  clone() {
    return this.slice();
  },
  deep_clone() {
    return map.bind(this)(deep_clone);
  },
});
Map.prototype[Clone] = new ObjectLiteral({
  clone() {
    return new Map(this);
  },
  deep_clone() {
    return map.bind(this)(deep_clone);
  },
});
Set.prototype[Clone] = new ObjectLiteral({
  clone() {
    return new Set(this);
  },
  deep_clone() {
    return map.bind(this)(deep_clone);
  },
});
let clone = impl_callable(function clone() {
  return this[Clone].clone.call(this);
});
let deep_clone = impl_callable(function deep_clone() {
  return this[Clone].deep_clone.call(this);
});
const Identity = Symbol("Identity");
Number.prototype[Identity] = 0;
BigInt.prototype[Identity] = 0n;
String.prototype[Identity] = "";
function identity() {
  if (truthy(nil__q.bind(this)())) {
    return this;
  } else {
    return this[Identity];
  }
}
const Collection = Symbol("Collection");
function entries() {
  return Object.entries(this);
}
function from_entries() {
  return new ObjectLiteral(Object.fromEntries(this));
}
function values() {
  return Object.values(this);
}
Object.prototype[Collection] = new ObjectLiteral({
  at(key) {
    return this[key];
  },
  has__q(property) {
    return property in this;
  },
  keys() {
    return as_set.bind(Object.keys(this))();
  },
});
ObjectLiteral.prototype[Symbol.iterator] = function* () {
  for (let [key, value] of entries.bind(this)()) {
    yield [key, value];
  }
};
ObjectLiteral.prototype[Collection] = new ObjectLiteral({
  at(key) {
    return this[key];
  },
  sample() {
    return values.bind(this)()[0];
  },
  keys() {
    return as_set.bind(Object.keys(this))();
  },
  each(f) {
    return entries
      .bind(this)()
      .forEach(function ([k, v]) {
        return f(k, v);
      });
  },
  find(f) {
    return entries
      .bind(this)()
      .find(function ([k, v]) {
        return pipe.bind(f(k, v))(truthy);
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
  flat_map(f) {
    return from_entries.bind(
      entries
        .bind(this)()
        .map(function ([k, v]) {
          return entries.bind(f(as_keyword.bind(k)(), v))();
        })
        .flat()
    )();
  },
  filter(f) {
    return from_entries.bind(
      entries
        .bind(this)()
        .filter(function ([k, v]) {
          return pipe.bind(f(as_keyword.bind(k)(), v))(truthy);
        })
    )();
  },
  any__q(f) {
    return entries
      .bind(this)()
      .some(function ([k, v]) {
        return pipe.bind(f(k, v))(truthy);
      });
  },
  all__q(f) {
    return entries
      .bind(this)()
      .every(function ([k, v]) {
        return pipe.bind(f(k, v))(truthy);
      });
  },
  reduce(f, start) {
    let result = start;
    for (let [k, v] of this) {
      result = f(result, k, v);
    }
    return result;
  },
  insert(key, value) {
    return new ObjectLiteral({ ...this, [key]: value });
  },
  concat(other) {
    return new ObjectLiteral({ ...this, ...other });
  },
  update(key, update_fn) {
    return insert.bind(this)(key, call.bind(update_fn)(at.bind(this)(key)));
  },
  empty__q() {
    return eq__q.call(len.bind(this)(), 0);
  },
  has__q(key) {
    return as_bool.bind(this[key])();
  },
  len() {
    return Object.keys(this).length;
  },
  remove(key) {
    let obj = clone.bind(this)();
    js_object_delete(obj, key);
    return obj;
  },
});
Array.prototype[Collection] = new ObjectLiteral({
  at(idx) {
    return this.at(idx);
  },
  keys() {
    return as_set.bind(Object.keys(this))();
  },
  sample() {
    return this[0];
  },
  each(f) {
    return this.forEach((...__args) => f(__args[0]));
  },
  find(f) {
    return this.find(compose((...__args) => f(__args[0]), truthy));
  },
  map(f) {
    return this.map((...__args) => f(__args[0]));
  },
  flat_map(f) {
    return this.flatMap((...__args) => f(__args[0]));
  },
  filter(f) {
    return this.filter(compose((...__args) => f(__args[0]), truthy));
  },
  any__q(f) {
    return this.some(compose((...__args) => f(__args[0]), truthy));
  },
  all__q(f) {
    return this.every(compose((...__args) => f(__args[0]), truthy));
  },
  reduce(f, start) {
    return this.reduce(function (acc, val) {
      return f(acc, val);
    }, start);
  },
  insert(value) {
    return [...this, value];
  },
  replace(old_value, new_value) {
    return map.bind(this)(function (val) {
      if (truthy(eq__q.call(val, old_value))) {
        return new_value;
      } else {
        return val;
      }
    });
  },
  concat(other) {
    return [...this, ...other];
  },
  update(val, update_fn) {
    return map.bind(this)(function (v) {
      if (truthy(eq__q.call(val, v))) {
        return call.bind(update_fn)(val);
      } else {
        return v;
      }
    });
  },
  empty__q() {
    return eq__q.call(this.length, 0);
  },
  has__q(val) {
    return or.call(this.includes(val), () =>
      any__q.bind(this)(function (v) {
        return eq__q.call(v, val);
      })
    );
  },
  len() {
    return this.length;
  },
  remove(val) {
    return filter.bind(this)(function (v) {
      return negate.call(eq__q.call(v, val));
    });
  },
});
Map.prototype[Collection] = new ObjectLiteral({
  at(key) {
    return this.get(key);
  },
  keys() {
    return as_set.bind(this.keys())();
  },
  sample() {
    return this.values().next().value;
  },
  each(f) {
    for (let [k, v] of this) {
      f(k, v);
    }
  },
  map(f) {
    let new_map = new Map([]);
    for (let [k, v] of this) {
      new_map.set(k, f(k, v));
    }
    return new_map;
  },
  find(f) {
    for (let [k, v] of this) {
      if (truthy(f(k, v))) {
        return v;
      }
    }
  },
  flat_map(f) {
    let new_map = new Map([]);
    for (let [k, v] of this) {
      for (let [_k, _v] of f(k, v)) {
        new_map.set(k, f(v));
      }
    }
    return new_map;
  },
  filter(f) {
    let new_map = new Map([]);
    for (let [k, v] of this) {
      if (truthy(f(k, v))) {
        new_map.set(k, f(v));
      }
    }
    return new_map;
  },
  any__q(f) {
    for (let [k, v] of this) {
      if (truthy(f(k, v))) {
        return true;
      }
    }
    return false;
  },
  all__q(f) {
    for (let [k, v] of this) {
      if (truthy(negate.call(f(k, v)))) {
        return false;
      }
    }
    return true;
  },
  reduce(f, start) {
    let acc = start;
    for (let [k, v] of this) {
      acc = f(acc, k, v);
    }
    return acc;
  },
  insert(k, v) {
    return clone.bind(this)().set(k, v);
  },
  concat(other) {
    let new_map = clone.bind(this)();
    for (let [k, v] of other) {
      new_map.set(k, v);
    }
    return new_map;
  },
  update(key, update_fn) {
    return insert.bind(this)(key, call.bind(update_fn)(at.bind(this)(key)));
  },
  empty__q() {
    return eq__q.call(this.size, 0);
  },
  has__q(key) {
    return as_bool.bind(at.bind(this)(key))();
  },
  len() {
    return this.size;
  },
  remove(key) {
    let map = clone.bind(this)();
    map.remove(key);
    return map;
  },
});
Set.prototype[Collection] = new ObjectLiteral({
  at(val) {
    if (truthy(this.has(val))) {
      return val;
    }
  },
  keys() {
    return this;
  },
  sample() {
    return this.values().next().value;
  },
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
  find(f) {
    for (let elem of this) {
      if (truthy(f(elem))) {
        return elem;
      }
    }
  },
  flat_map(f) {
    let out = new Set([]);
    for (let elem of this) {
      for (let x of f(elem)) {
        out.add(x);
      }
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
      }
    }
    return out;
  },
  any__q(f) {
    for (let elem of this) {
      if (truthy(f(elem))) {
        return true;
      }
    }
    return false;
  },
  all__q(f) {
    for (let elem of this) {
      if (truthy(negate.call(f(elem)))) {
        return false;
      }
    }
    return true;
  },
  insert(elem) {
    return clone.bind(this)().add(elem);
  },
  concat(other) {
    let new_set = clone.bind(this)();
    for (let item of other) {
      new_set.add(item);
    }
    return new_set;
  },
  update(key, update_fn) {
    let new_set = clone.bind(this)();
    new_set.remove(key);
    new_set.add(call.bind(update_fn)(key));
    return new_set;
  },
  empty__q() {
    return eq__q.call(this.size, 0);
  },
  has__q(val) {
    return this.has(val);
  },
  len() {
    return this.size;
  },
  remove(key) {
    let set = clone.bind(this)();
    set.remove(key);
    return set;
  },
});
String.prototype[Collection] = new ObjectLiteral({
  at(idx) {
    return this.at(idx);
  },
  keys() {
    return as_set.bind(Object.keys(this))();
  },
  sample() {
    return this[0];
  },
  each(f) {
    for (let char of this) {
      f(char);
    }
  },
  map(f) {
    let out = "";
    for (let char of this) {
      out = plus.call(out, f(char));
    }
    return out;
  },
  flat_map(f) {
    let out = "";
    for (let char of this) {
      out = plus.call(out, f(char));
    }
    return out;
  },
  find(f) {
    for (let char of this) {
      if (truthy(f(char))) {
        return char;
      }
    }
  },
  filter(f) {
    let out = "";
    for (let char of this) {
      if (truthy(f(char))) {
        out = plus.call(out, char);
      }
    }
  },
  any__q(f) {
    for (let char of this) {
      if (truthy(f(char))) {
        return true;
      }
    }
    return false;
  },
  all__q(f) {
    for (let char of this) {
      if (truthy(negate.call(f(char)))) {
        return false;
      }
    }
    return true;
  },
  reduce(f, start) {
    let out = start;
    for (let char of this) {
      out = f(out, char);
    }
    return out;
  },
  insert(char) {
    return plus.call(this, char);
  },
  concat(str) {
    return plus.call(this, str);
  },
  update(idx, update_fn) {
    let [before, after] = [this.slice(0, idx), this.slice(idx, -1)];
    return plus.call(
      before,
      plus.call(call.bind(update_fn)(at.bind(this)(idx)), after)
    );
  },
  empty__q() {
    return eq__q.call(this.length, 0);
  },
  has__q(sub_str) {
    return this.includes(sub_str);
  },
  len() {
    return this.length;
  },
  remove(sub_str) {
    let idx = this.indexOf(sub_str);
    return plus.call(
      this.slice(0, idx),
      this.slice(plus.call(idx, len.bind(sub_str)()))
    );
  },
});
function at(key_or_idx) {
  return this[Collection].at.call(this, key_or_idx);
}
function keys() {
  return this[Collection].keys.call(this);
}
function sample() {
  return this[Collection].sample.call(this);
}
function each(f) {
  return this[Collection].each.call(this, call.bind(f));
}
function map(...fns) {
  return this[Collection].map.call(this, compose(...fns));
}
function flat_map(...fns) {
  return this[Collection].flat_map.call(this, compose(...fns));
}
function find(f) {
  return this[Collection].find.call(this, call.bind(f));
}
function filter(f) {
  return this[Collection].filter.call(this, call.bind(f));
}
function any__q(...fns) {
  return this[Collection].any__q.call(this, compose(...fns));
}
function any__b(...fns) {
  assert__b(any__q.bind(this)(...fns), 621, 11, `any__q.bind(this)(...fns)`);
  return true;
}
function all__q(...fns) {
  return this[Collection].all__q.call(this, compose(...fns));
}
function all__b(...fns) {
  assert__b(all__q.bind(this)(...fns), 626, 11, `all__q.bind(this)(...fns)`);
  return true;
}
function reduce(f, start) {
  if (truthy(nil__q.bind(start)())) {
    start = identity.bind(sample.bind(this)())();
  }
  return this[Collection].reduce.call(this, call.bind(f), start);
}
function insert(...args) {
  return this[Collection].insert.call(this, ...args);
}
function push(val) {
  return insert.bind(this)(val);
}
function replace(old_value, new_value) {
  return this[Collection].replace.call(this, old_value, new_value);
}
function concat(other) {
  return this[Collection].concat.call(this, other);
}
function merge(other) {
  return concat.bind(this)(other);
}
function update(key, update_fn) {
  return this[Collection].update.call(this, key, update_fn);
}
function empty__q() {
  if (truthy(nil__q.bind(this)())) {
    return true;
  } else {
    return this[Collection].empty__q.call(this);
  }
}
function not_empty__q() {
  return negate.call(empty__q.bind(this)());
}
function has__q(key_or_value) {
  return this[Collection].has__q.call(this, key_or_value);
}
function len() {
  return this[Collection].len.call(this);
}
function remove(key_or_val) {
  return this[Collection].remove.call(this, key_or_val);
}
function map_values(f) {
  assert__b(record__q.bind(this)(), 655, 11, `record__q.bind(this)()`);
  return map.bind(this)(function (key, value) {
    return [key, f(value)];
  });
}
function omit(...keys) {
  assert__b(record__q.bind(this)(), 659, 11, `record__q.bind(this)()`);
  return filter.bind(this)(function (k, v) {
    return negate.call(has__q.bind(keys)(k));
  });
}
function collection__q() {
  return and.call(
    all__q.bind([Collection, Identity])(
      function (proto) {
        return this[proto];
      }.bind(this)
    ),
    () => or.call(record__q.bind(this)(), () => vector__q.bind(this)())
  );
}
function ordered_collection__q() {
  return and.call(collection__q.bind(this)(), () =>
    and.call(as_bool.bind(this[OrderedCollection])(), () =>
      as_bool.bind(this[Symbol.iterator])()
    )
  );
}
function keep(callable) {
  return filter.bind(this)(callable);
}
function discard(callable) {
  return filter.bind(this)(compose(callable, negate.call(_)));
}
const OrderedCollection = Symbol("OrderedCollection");
Array.prototype[OrderedCollection] = new ObjectLiteral({
  first() {
    return this[0];
  },
  last() {
    return this.at(-1);
  },
  skip(n) {
    return this.slice(n);
  },
  drop(n) {
    return this.slice(minus.call(0, n));
  },
  take_last(n) {
    return this.slice(minus.call(-1, n), -1);
  },
  take(n) {
    return this.slice(0, n);
  },
  sort(f) {
    return clone.bind(this)().sort(f);
  },
  reverse() {
    return clone.bind(this)().reverse();
  },
});
String.prototype[OrderedCollection] = new ObjectLiteral({
  first() {
    return this[0];
  },
  last() {
    return this.at(-1);
  },
  skip(n) {
    return this.slice(n);
  },
  take_last(n) {
    return this.slice(minus.call(-1, n), -1);
  },
  take(n) {
    return this.slice(0, n);
  },
  sort(f) {
    return Array["from"](this).sort(f).join("");
  },
  reverse() {
    return Array["from"](this).reverse().join("");
  },
});
Map.prototype[OrderedCollection] = new ObjectLiteral({
  first() {
    return this.entries().next().value;
  },
  last() {
    return Array["from"](this).at(-1);
  },
  skip(n) {
    return new Map(Array["from"](this).slice(n));
  },
  take_last() {
    return new Map(Array["from"](this).slice(minus.call(-1, n), -1));
  },
  take() {
    return new Map(Array["from"](this).slice(0, n));
  },
  sort() {
    return new Map(
      Array["from"](this).sort(function ([_k1, v1], [_k2, v2]) {
        return minus.call(v2, v1);
      })
    );
  },
  reverse() {
    return new Map(Array["from"](this).reverse());
  },
});
function each_with_index(f) {
  if (truthy(is_a__q.bind(this)(Record))) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      call.bind(f)(...elem, i);
    }
  } else if (is_a__q.bind(this)(Vector)) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      call.bind(f)(elem, i);
    }
  } else {
    raise__b(new TypeError("Expected a Record or Vector"));
  }
}
function map_with_index(f) {
  let coll = identity.bind(this)();
  if (truthy(record__q.bind(this)())) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      coll = insert.bind(coll)(...call.bind(f)(...elem, i));
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      coll = insert.bind(coll)(call.bind(f)(elem, i));
    }
  }
  return coll;
}
function flat_map_with_index(f) {
  let coll = identity.bind(this)();
  if (truthy(record__q.bind(this)())) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      coll = concat.bind(coll)(...call.bind(f)(...elem, i));
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      coll = concat.bind(coll)(call.bind(f)(elem, i));
    }
  }
  return coll;
}
function find_with_index(f) {
  if (truthy(record__q.bind(this)())) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(...elem, i))) {
        return elem;
      }
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(elem, i))) {
        return elem;
      }
    }
  }
}
function filter_with_index(f) {
  let coll = identity.bind(this)();
  if (truthy(record__q.bind(this)())) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(...elem, i))) {
        coll = insert.bind(coll)(elem);
      }
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(elem, i))) {
        coll = insert.bind(coll)(elem);
      }
    }
  }
  return coll;
}
function any_with_index__q(f) {
  if (truthy(record__q.bind(this)())) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(...elem, i))) {
        return true;
      }
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(elem, i))) {
        return true;
      }
    }
  }
  return false;
}
function all_with_index__q(f) {
  if (truthy(record__q.bind(this)())) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(negate.call(call.bind(f)(...elem, i)))) {
        return false;
      }
    }
    return true;
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(negate.call(call.bind(f)(elem, i)))) {
        return false;
      }
    }
    return true;
  }
}
function reduce_with_index(f, start) {
  let result = or.call(start, () => identity.bind(first.bind(this)())());
  if (truthy(record__q.bind(this)())) {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      result = call.bind(f)(result, ...elem, i);
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      result = call.bind(f)(result, elem, i);
    }
  }
  return result;
}
let first = impl_callable(function first() {
  return this[OrderedCollection].first.call(this);
});
let last = impl_callable(function last() {
  return this[OrderedCollection].last.call(this);
});
let skip = impl_callable(function skip(n) {
  return this[OrderedCollection].skip.call(this, n);
});
let drop = impl_callable(function drop(n) {
  return this[OrderedCollection].drop.call(this, n);
});
let take_last = impl_callable(function take_last(n) {
  return this[OrderedCollection].take_last.call(this, n);
});
let take = impl_callable(function take(n) {
  return this[OrderedCollection].take.call(this, n);
});
let sort = impl_callable(function sort() {
  return this[OrderedCollection].sort.call(this);
});
let reverse = impl_callable(function reverse() {
  return this[OrderedCollection].reverse.call(this);
});
const Plus = Symbol("Plus");
const Negate = Symbol("Negate");
const Minus = Symbol("Minus");
const Times = Symbol("Times");
const Divide = Symbol("Divide");
const Exponent = Symbol("Exponent");
const Mod = Symbol("Mod");
const Comparable = Symbol("Comparable");
const LessThan = Symbol("LessThan");
const And = Symbol("And");
const Or = Symbol("Or");
Object.prototype[Negate] = function () {
  return js_negate(this);
};
Object.prototype[And] = function (thunk) {
  return js_and(this, thunk);
};
Object.prototype[Or] = function (thunk) {
  return js_or(this, thunk);
};
Set.prototype[Plus] = function (other_set) {
  return merge.bind(this)(other_set);
};
Number.prototype[Plus] = function (other) {
  assert__b(typeof other === "number", 882, 11, `typeof(other) === "number"`);
  return js_plus(this, other);
};
Number.prototype[Minus] = function (other) {
  assert__b(typeof other === "number", 887, 11, `typeof(other) === "number"`);
  return js_minus(this, other);
};
Number.prototype[Times] = function (other) {
  assert__b(typeof other === "number", 892, 11, `typeof(other) === "number"`);
  return js_times(this, other);
};
Number.prototype[Divide] = function (other) {
  assert__b(typeof other === "number", 897, 11, `typeof(other) === "number"`);
  return js_divide(this, other);
};
Number.prototype[Exponent] = function (other) {
  assert__b(typeof other === "number", 902, 11, `typeof(other) === "number"`);
  return js_exponent(this, other);
};
Number.prototype[Mod] = function (other) {
  assert__b(typeof other === "number", 907, 11, `typeof(other) === "number"`);
  return js_mod(this, other);
};
BigInt.prototype[Plus] = function (other) {
  assert__b(typeof other === "bigint", 912, 11, `typeof(other) === "bigint"`);
  return js_plus(this, other);
};
BigInt.prototype[Minus] = function (other) {
  assert__b(typeof other === "bigint", 917, 11, `typeof(other) === "bigint"`);
  return js_minus(this, other);
};
BigInt.prototype[Times] = function (other) {
  assert__b(typeof other === "bigint", 922, 11, `typeof(other) === "bigint"`);
  return js_times(this, other);
};
BigInt.prototype[Divide] = function (other) {
  assert__b(typeof other === "bigint", 927, 11, `typeof(other) === "bigint"`);
  return js_divide(this, other);
};
BigInt.prototype[Exponent] = function (other) {
  assert__b(typeof other === "bigint", 932, 11, `typeof(other) === "bigint"`);
  return js_exponent(this, other);
};
BigInt.prototype[Mod] = function (other) {
  assert__b(typeof other === "bigint", 937, 11, `typeof(other) === "bigint"`);
  return js_mod(this, other);
};
let ComparableMixin = new ObjectLiteral({
  greater_than_eq(other) {
    return or.call(greater_than.bind(this)(other), () =>
      eq__q.call(this, other)
    );
  },
  less_than_eq(other) {
    return or.call(less_than.bind(this)(other), () => eq__q.call(this, other));
  },
});
Number.prototype[Comparable] = new ObjectLiteral({
  ...ComparableMixin,
  greater_than(other) {
    assert__b(typeof other === "number", 949, 13, `typeof(other) === "number"`);
    return js_greater_than(this, other);
  },
  less_than(other) {
    assert__b(typeof other === "number", 953, 13, `typeof(other) === "number"`);
    return js_less_than(this, other);
  },
});
BigInt.prototype[Comparable] = new ObjectLiteral({
  ...ComparableMixin,
  greater_than(other) {
    assert__b(typeof other === "bigint", 961, 13, `typeof(other) === "bigint"`);
    return js_greater_than(this, other);
  },
  less_than(other) {
    assert__b(typeof other === "bigint", 965, 13, `typeof(other) === "bigint"`);
    return js_less_than(this, other);
  },
});
String.prototype[Plus] = function (other) {
  assert__b(typeof other === "string", 971, 11, `typeof(other) === "string"`);
  return js_plus(this, other);
};
String.prototype[Times] = function (amount) {
  assert__b(typeof amount === "number", 976, 11, `typeof(amount) === "number"`);
  return this.repeat(amount);
};
String.prototype[Comparable] = new ObjectLiteral({
  ...ComparableMixin,
  greater_than(other) {
    assert__b(typeof other === "string", 983, 13, `typeof(other) === "string"`);
    return js_greater_than(this, other);
  },
  less_than(other) {
    assert__b(typeof other === "string", 987, 13, `typeof(other) === "string"`);
    return js_less_than(this, other);
  },
});
let plus = impl_callable(function plus(other) {
  return call.bind(
    find.bind(
      construct_record.call(Map, [
        [
          Plus,
          function () {
            return this[Plus](other);
          }.bind(this),
        ],
        [
          Collection,
          function () {
            return concat.bind(this)(other);
          }.bind(this),
        ],
      ])
    )(
      function (proto, f) {
        return this[proto];
      }.bind(this)
    )
  )();
});
let negate = impl_callable(function negate() {
  if (truthy(nil__q.bind(this)())) {
    return true;
  } else {
    return this[Negate]();
  }
});
let minus = impl_callable(function minus(other) {
  return this[Minus](other);
});
let times = impl_callable(function times(other) {
  return this[Times](other);
});
let divide_by = impl_callable(function divide_by(other) {
  return this[Divide](other);
});
let exponent = impl_callable(function exponent(other) {
  return this[Exponent](other);
});
let mod = impl_callable(function mod(other) {
  return this[Mod](other);
});
let greater_than = impl_callable(function greater_than(other) {
  return this[Comparable].greater_than.call(this, other);
});
let greater_than_eq = impl_callable(function greater_than_eq(other) {
  return this[Comparable].greater_than_eq.call(this, other);
});
let less_than = impl_callable(function less_than(other) {
  return this[Comparable].less_than.call(this, other);
});
let less_than_eq = impl_callable(function less_than_eq(other) {
  return this[Comparable].less_than_eq.call(this, other);
});
let and = impl_callable(function and(thunk) {
  if (truthy(nil__q.bind(this)())) {
    return this;
  } else {
    return this[And](thunk);
  }
});
let or = impl_callable(function or(thunk) {
  if (truthy(nil__q.bind(this)())) {
    return thunk();
  } else {
    return this[Or](thunk);
  }
});
const Printable = Symbol("Printable");
function _resolve_keyword_str(kw) {
  return kw.replaceAll("__q", "?").replaceAll("__b", "!");
}
ObjectLiteral.prototype[Printable] = function () {
  return Object.assign(
    new Object(),
    map.bind(this)(function (k, v) {
      return [_resolve_keyword_str(k), printable.bind(v)()];
    })
  );
};
Array.prototype[Printable] = function () {
  return map.bind(this)(printable);
};
Set.prototype[Printable] = function () {
  return plus.call(
    "#{",
    plus.call(Array["from"](map.bind(this)(printable)).join(", "), "}")
  );
};
function print_for_generic_clone_object() {
  let out = clone.bind(this)();
  for (let [key, value] of entries.bind(this)()) {
    let new_key = _resolve_keyword_str(key);
    out[new_key] = value;
    if (truthy(negate.call(eq__q.call(new_key, key)))) {
      js_object_delete(out, key);
    }
  }
  return out;
}
Keyword.prototype[Printable] = function () {
  return plus.call(":", _resolve_keyword_str(this.value));
};
Boolean.prototype[Printable] = function () {
  return this;
};
String.prototype[Printable] = function () {
  return this;
};
Function.prototype[Printable] = function () {
  return this.name;
};
let printable = impl_callable(function printable() {
  if (truthy(nil__q.bind(this)())) {
    return this;
  } else {
    return or.call(
      call.bind(
        find.bind(
          construct_record.call(Map, [
            [
              Printable,
              function () {
                return this[Printable]();
              }.bind(this),
            ],
            [Clone, print_for_generic_clone_object.bind(this)],
          ])
        )(
          function (proto) {
            return this[proto];
          }.bind(this)
        )
      )(),
      () => this
    );
  }
});
let log = impl_callable(function log(...args) {
  console.log(...args, printable.bind(this)());
  return this;
});
const PrettyStr = Symbol("PrettyStr");
ObjectLiteral.prototype[PrettyStr] = function () {
  let s = "{ ";
  for (let [key, value] of this) {
    s = plus.call(s, str(key, ": ", value, ", "));
  }
  return plus.call(s, " }");
};
Keyword.prototype[PrettyStr] = function () {
  return str(":", this.value);
};
String.prototype[PrettyStr] = function () {
  return this;
};
Number.prototype[PrettyStr] = function () {
  return this;
};
BigInt.prototype[PrettyStr] = function () {
  return this;
};
Function.prototype[PrettyStr] = function () {
  return this.name;
};
let pretty_str = impl_callable(function pretty_str() {
  return this?.[PrettyStr]();
});
function str(...args) {
  return map.bind(args)(pretty_str).join("");
}
let int__q = impl_callable(function int__q() {
  return Number.isInteger(this);
});
let bigint__q = impl_callable(function bigint__q() {
  return typeof this === "bigint";
});
let float__q = impl_callable(function float__q() {
  return and.call(typeof this === "number", () => negate.call(int__q(this)));
});
let even__q = impl_callable(function even__q() {
  return mod.call(this, 2) === 0;
});
let odd__q = impl_callable(function odd__q() {
  return negate.call(even__q.bind(this)());
});
let pos__q = impl_callable(function pos__q() {
  return greater_than_eq.call(this, identity.bind(this)());
});
let nan__q = impl_callable(function nan__q() {
  return Number.isNaN(this);
});
let str__q = impl_callable(function str__q() {
  return eq__q.call(typeof this, "string");
});
let finite__q = impl_callable(function finite__q() {
  return or.call(bigint__q.bind(this)(), () => Number.isFinite(this));
});
let inf__q = impl_callable(function inf__q() {
  return negate.call(finite__q.bind(this)());
});
let as_lowercase = impl_callable(function as_lowercase() {
  return this.toLowerCase();
});
let as_set = impl_callable(function as_set() {
  return new Set(this);
});
let as_array = impl_callable(function as_array() {
  return Array["from"](this);
});
let as_obj = impl_callable(function as_obj() {
  return new ObjectLiteral(this);
});
let as_map = impl_callable(function as_map() {
  return new Map(this);
});
let as_keyword = impl_callable(function as_keyword() {
  return Keyword["for"](this.toString());
});
let as_num = impl_callable(function as_num() {
  return Number(this);
});
let as_str = impl_callable(function as_str() {
  return this.toString();
});
let as_bool = impl_callable(function as_bool() {
  return truthy(this);
});
let exists__q = impl_callable(function exists__q() {
  return negate.call(nil__q.bind(this)());
});
let is_a__q = impl_callable(function is_a__q(KlassOrProtocol) {
  if (truthy(eq__q.call(typeof KlassOrProtocol, "symbol"))) {
    return (
      KlassOrProtocol in
      or.call(
        Object.getPrototypeOf(this),
        () => KlassOrProtocol in this.constructor
      )
    );
  } else if (eq__q.call(typeof KlassOrProtocol, "function")) {
    return this instanceof KlassOrProtocol;
  } else {
    return false;
  }
});
Set.prototype[Negate] = function () {
  return (...__args) => negate.call(this.has(__args[0]));
};
let Underscore = construct_vector.call(Struct, [
  "Underscore",
  Keyword.for("transforms"),
]);
const UnderscoreInterpreter = Symbol("UnderscoreInterpreter");
let _ = new Underscore([
  new ObjectLiteral({
    f: function id() {
      return this;
    },
    args: [],
  }),
]);
Underscore.prototype[Symbol.iterator] = function* () {
  for (let transform of this.transforms) {
    yield transform;
  }
};
Underscore.prototype[Keyword.for("insert")] = function (f, ...args) {
  return new Underscore([...this.transforms, new ObjectLiteral({ f, args })]);
};
_[Hash] = function () {
  return 2n;
};
Object.prototype[UnderscoreInterpreter] = function (underscore) {
  let initial_value = this;
  let result = initial_value;
  for (let { f, args } of underscore) {
    result = call.bind(f.bind(result))(...args);
    if (truthy(result instanceof Underscore)) {
      result = call.bind(result)(initial_value);
    }
  }
  return result;
};
Underscore.prototype[Call] = function (data, ...args) {
  if (truthy(nil__q.bind(data)())) {
    return Object.prototype[UnderscoreInterpreter].call(data, this, ...args);
  } else {
    return data[UnderscoreInterpreter](this, ...args);
  }
};
Underscore.prototype[Comparable] = new ObjectLiteral({
  less_than(val) {
    return this.insert(less_than, val);
  },
  greater_than(val) {
    return this.insert(greater_than, val);
  },
  less_than_eq(val) {
    return this.insert(less_than_eq, val);
  },
  greater_than_eq(val) {
    return this.insert(greater_than_eq, val);
  },
});
Underscore.prototype[Negate] = function () {
  return function (val) {
    return negate.call(call.bind(this)(val));
  }.bind(this);
};
Underscore.prototype[Equal] = function (other) {
  return this.insert(eq__q, other);
};
Underscore.prototype[Collection] = new ObjectLiteral({
  at(idx) {
    return this.insert(at, idx);
  },
  sample() {
    return this.insert(sample);
  },
  each(f) {
    return this.insert(each, f);
  },
  find(f) {
    return this.insert(find, f);
  },
  map(f) {
    return this.insert(map, f);
  },
  flat_map(f) {
    return this.insert(flat_map, f);
  },
  filter(f) {
    return this.insert(filter, f);
  },
  any__q(f) {
    return this.insert(any__q, f);
  },
  all__q(f) {
    return this.insert(all__q, f);
  },
  reduce(f, start) {
    return this.insert(reduce, f, start);
  },
  insert(...args) {
    return this.insert(insert, ...args);
  },
  replace(...args) {
    return this.insert(replace, ...args);
  },
  concat(other) {
    return this.insert(concat, other);
  },
  update(key, update_fn) {
    return this.insert(update, key, update_fn);
  },
  empty__q() {
    return this.insert(empty__q);
  },
  has__q(k) {
    return this.insert(has__q, k);
  },
  len() {
    return this.insert(len);
  },
  remove(key_or_val) {
    return this.insert(remove, key_or_val);
  },
});
Underscore.prototype[Pipe] = function (f) {
  return this.insert(pipe, f);
};
Underscore.prototype[And] = function (thunk) {
  return this.insert(and, thunk);
};
Underscore.prototype[Or] = function (thunk) {
  return this.insert(or, thunk);
};
Underscore.prototype[Plus] = function (other) {
  return this.insert(plus, other);
};
Underscore.prototype[Minus] = function (other) {
  return this.insert(minus, other);
};
Underscore.prototype[Times] = function (other) {
  return this.insert(times, other);
};
Underscore.prototype[Divide] = function (other) {
  return this.insert(divide, other);
};
Underscore.prototype[Exponent] = function (other) {
  return this.insert(exponent, other);
};
Underscore.prototype[Mod] = function (other) {
  return this.insert(mod, other);
};
Underscore.prototype[Printable] = function () {
  let fn_to_op = construct_record.call(Map, [
    ["greater_than", ">"],
    ["greater_than_eq", ">="],
    ["less_than", "<"],
    ["less_than_eq", "<="],
    ["times", "*"],
    ["exponent", "**"],
    ["divide_by", "/"],
    ["plus", "+"],
    ["minus", "-"],
    ["mod", "%"],
    ["eq__q", "=="],
  ]);
  return str(
    "_",
    map
      .bind(skip.bind(this.transforms)(1))(function ({ f, args }) {
        if (truthy(eq__q.call(f, and))) {
          let [thunk] = args;
          return str(" && ", printable.bind(thunk())());
        } else if (eq__q.call(f, or)) {
          let [thunk] = args;
          return str(" || ", printable.bind(thunk())());
        }
        let s = printable.bind(f)();
        let __coil_if_let_temp = call.bind(fn_to_op)(s);
        if (truthy(__coil_if_let_temp)) {
          let op = __coil_if_let_temp;
          let [rhs] = args;
          return str(" ", op, " ", printable.bind(rhs)());
        } else {
          return str("::", s, "(", map.bind(args)(printable).join(", "), ")");
        }
      })
      .join("")
  );
};
const Stepable = Symbol("Stepable");
Number.prototype[Stepable] = new ObjectLiteral({
  inc() {
    return plus.call(this, 1);
  },
  dec() {
    return minus.call(this, 1);
  },
});
BigInt.prototype[Stepable] = new ObjectLiteral({
  inc() {
    return plus.call(this, 1n);
  },
  dec() {
    return minus.call(this, 1n);
  },
});
String.prototype[Stepable] = new ObjectLiteral({
  inc() {
    return String.fromCharCode(plus.call(this.charCodeAt(0), 1));
  },
  dec() {
    return String.fromCharCode(minus.call(this.charCodeAt(0), 1));
  },
});
function inc() {
  return this[Stepable].inc.call(this);
}
function dec() {
  return this[Stepable].dec.call(this);
}
let Range = construct_vector.call(Struct, [
  "Range",
  Keyword.for("start"),
  Keyword.for("end"),
  Keyword.for("exclusive__q"),
  Keyword.for("transform"),
]);
Range.prototype[Constructors] = new ObjectLiteral({ exclusive__q: truthy });
Range.prototype[Defaults] = new ObjectLiteral({ transform: _ });
Range.prototype[Printable] = function () {
  if (truthy(this.exclusive__q)) {
    return str(printable.bind(this.start)(), "...", printable.bind(this.end)());
  } else {
    return str(printable.bind(this.start)(), "..", printable.bind(this.end)());
  }
};
Range.prototype[UnderscoreInterpreter] = function (underscore, val) {
  let result = val;
  for (let { f, args } of underscore) {
    result = or.call(
      call.bind(
        at.bind(
          construct_record.call(Map, [
            [
              map,
              function (map_fn) {
                return map_fn(result);
              },
            ],
            [
              filter,
              function (filter_fn) {
                if (truthy(filter_fn(result))) {
                  return result;
                } else {
                  return Keyword.for("filtered");
                }
              },
            ],
          ])
        )(f)
      )(...args),
      () => result
    );
  }
  return result;
};
Range.prototype[Symbol.iterator] = function* () {
  let i = this.start;
  let end = this.end;
  if (truthy(this.exclusive__q)) {
    end = dec.bind(end)();
  }
  while (less_than_eq.call(i, end)) {
    let result = call.bind(this.transform)(this, i);
    if (truthy(negate.call(eq__q.call(result, Keyword.for("filtered"))))) {
      yield result;
    }
    i = inc.bind(i)();
  }
};
Range.prototype[Keyword.for("update")] = function (new_transform) {
  return new Range(this.start, this.end, this.exclusive__q, new_transform);
};
Range.prototype[Keyword.for("fill")] = function (val) {
  let output = [];
  for (let i of this) {
    output[i] = val;
  }
  return output;
};
Range.prototype[Collection] = new ObjectLiteral({
  sample() {
    return this.start;
  },
  each(f) {
    for (let elem of this) {
      f(elem);
    }
  },
  reduce(f, start) {
    let result = start;
    for (let elem of this) {
      result = f(result, elem);
    }
    return result;
  },
  map(f) {
    return this.update(map.bind(this.transform)(f));
  },
  filter(f) {
    return this.update(filter.bind(this.transform)(f));
  },
  has__q(value) {
    return call.bind(this)(value);
  },
});
Range.prototype[Call] = function (value) {
  value = call.bind(this.transform)(this, value);
  if (truthy(eq__q.call(value, Keyword.for("filtered")))) {
    return false;
  }
  if (truthy(this.exclusive__q)) {
    return and.call(greater_than_eq.call(value, this.start), () =>
      less_than.call(value, this.end)
    );
  } else {
    return and.call(greater_than_eq.call(value, this.start), () =>
      less_than_eq.call(value, this.end)
    );
  }
};
Range.prototype[Clone] = new ObjectLiteral({
  clone() {
    return new Range(this.start, this.end, this.exclusive__q, this.transform);
  },
  deep_clone() {
    return new Range(
      deep_clone.bind(this.start)(),
      deep_clone.bind(this.end)(),
      this.exclusive__q,
      deep_clone.bind(this.transform)()
    );
  },
});
Range.prototype[OrderedCollection] = new ObjectLiteral({
  first() {
    return call.bind(this.transform)(this.start);
  },
  last() {
    return call.bind(this.transform)(this.end);
  },
  take(n) {
    let output = [];
    for (let [item, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(eq__q.call(i, n))) {
        break;
      }
      output.push(item);
    }
    return output;
  },
});
let ZipView = construct_vector.call(Struct, [
  "ZipView",
  Keyword.for("collections"),
]);
let zip = impl_callable(function zip(...collections) {
  return new ZipView([this, ...collections]);
});
let iterator = impl_callable(function iterator() {
  return this[Symbol.iterator]();
});
ZipView.prototype[Collection] = new ObjectLiteral({
  map(f) {
    let output = [];
    for (let [a, b] of this) {
      output.push(f(a, b));
    }
    return output;
  },
});
ZipView.prototype[Symbol.iterator] = function* () {
  let generators = map.bind(this.collections)(iterator);
  while (true) {
    let gen_states = map.bind(generators)((...__args) => __args[0].next());
    if (truthy(at.bind(first.bind(gen_states)())(Keyword.for("done")))) {
      break;
    }
    yield map.bind(gen_states)(Keyword.for("value"));
  }
};
ZipView.prototype[Keyword.for("collect")] = function () {
  let output = [];
  for (let idx of new Range(
    0,
    len.bind(first.bind(this.collections)())(),
    true
  )) {
    output.push([]);
    for (let col of this.collections) {
      output.at(-1).push(col[idx]);
    }
  }
  return output;
};
function DefVector() {}
DefVector[Vector] = function (properties) {
  let Constructor = null;
  if (truthy(eq__q.call(at.bind(properties)(1), _))) {
    let kw = at.bind(properties)(2);
    Constructor = function (fst, ...args) {
      this[first.bind(properties)()] = fst;
      this[kw] = args;
    };
  } else if (eq__q.call(first.bind(properties)(), _)) {
    let kw = at.bind(properties)(1);
    Constructor = function (...args) {
      this[kw] = args;
    };
  } else {
    Constructor = function (...args) {
      for (let [key, i] of zip.bind(properties)(new Range(0, Infinity))) {
        this[key] = args[i];
      }
    };
  }
  Constructor[Vector] = function (args) {
    return new Constructor(...args);
  };
  return Constructor;
};
function DefRecord() {}
DefRecord[Vector] = function (property_name) {
  let Constructor = function (entries) {
    this[property_name] = entries;
  };
  Constructor[Record] = function (entries) {
    return new Constructor(entries);
  };
  Constructor.prototype[Symbol.iterator] = function* () {
    for (let [key, value] of this.entries) {
      yield [key, value];
    }
  };
  return Constructor;
};
const Matches = Symbol("Matches");
function matches__q(value) {
  return this[Matches](value);
}
function guard(...args) {
  let [patterns, f] = [args.slice(0, -1), args.at(-1)];
  return function (...args) {
    if (truthy(matches__q.bind(patterns)(args))) {
      return f(...args);
    }
  };
}
function primitive__q() {
  return and.call(negate.call(eq__q.call(typeof this, "object")), () =>
    negate.call(eq__q.call(typeof this, "function"))
  );
}
Object.prototype[Matches] = function (value) {
  if (truthy(primitive__q.bind(this)())) {
    return eq__q.call(this, value);
  } else if (Call in this) {
    return call.bind(this)(value);
  } else {
    return eq__q.call(this, value);
  }
};
Array.prototype[Matches] = function (value) {
  return and.call(eq__q.call(len.bind(value)(), len.bind(this)()), () =>
    all_with_index__q.bind(this)(function (pattern, i) {
      return matches__q.bind(pattern)(at.bind(value)(i));
    })
  );
};
Set.prototype[Matches] = function (value) {
  return has__q.bind(this)(value);
};
Underscore.prototype[Matches] = function (value) {
  if (truthy(nil__q.bind(value)())) {
    return false;
  } else {
    return call.bind(this)(value);
  }
};
ObjectLiteral.prototype[Matches] = function (record) {
  return all__q.bind(this)(function (key, pattern) {
    return matches__q.bind(pattern)(at.bind(record)(as_keyword.bind(key)()));
  });
};
let Match = construct_vector.call(DefRecord, [Keyword.for("entries")]);
Match.prototype[Call] = function (val) {
  for (let [pattern, ret] of this.entries) {
    if (truthy(matches__q.bind(pattern)(val))) {
      return ret;
    }
  }
};
let char_alpha__q = plus.call(
  as_set.bind(new Range("a", "z"))(),
  new Range("A", "Z")
);
let char_numeric__q = as_set.bind(map.bind(new Range(0, 9))(as_str))();
let char_alpha_numeric__q = plus.call(char_alpha__q, char_numeric__q);
function alpha__q() {
  return all__q.bind(this)(char_alpha__q);
}
function alpha_numeric__q() {
  return all__q.bind(this)(char_alpha_numeric__q);
}
let CollectionView = construct_vector.call(Struct, [
  "CollectionView",
  Keyword.for("collection"),
  Keyword.for("idx"),
]);
CollectionView.prototype[OrderedCollection] = new ObjectLiteral({
  first() {
    return at.bind(this.collection)(this.idx);
  },
  last() {
    return last.bind(this.collection)();
  },
  skip(n) {
    return new CollectionView(this.collection, plus.call(this.idx, n));
  },
});
CollectionView.prototype[Symbol.iterator] = function* () {
  for (let elem of this.collection) {
    yield elem;
  }
};
CollectionView.prototype[Collection] = new ObjectLiteral({
  at(idx) {
    return at.bind(this.collection)(plus.call(this.idx, idx));
  },
  len() {
    return minus.call(len.bind(this.collection)(), this.idx);
  },
  empty__q() {
    return eq__q.call(len.bind(this)(), 0);
  },
});
CollectionView.prototype[Printable] = function () {
  return skip.bind(this.collection)(this.idx);
};
let Lexer = construct_vector.call(DefRecord, [Keyword.for("entries")]);
function pass() {}
function newline() {}
Lexer.prototype[Call] = function (str) {
  let tokens = [];
  let index = 0;
  function rest_of_string() {
    return str.slice(index);
  }
  function scan() {
    let result = rest_of_string().match(this);
    if (
      truthy(
        or.call(negate.call(result), () =>
          negate.call(eq__q.call(result.index, 0))
        )
      )
    ) {
      return false;
    }
    index = plus.call(index, result[0].length);
    return result[0];
  }
  let line = 1;
  let col = 1;
  while (negate.call(eq__q.call(rest_of_string(), ""))) {
    let found = false;
    for (let [pattern, type] of this.entries) {
      let __coil_if_let_temp = scan.bind(pattern)();
      if (truthy(__coil_if_let_temp)) {
        let value = __coil_if_let_temp;
        if (truthy(eq__q.call(type, newline))) {
          line = plus.call(line, 1);
          col = 1;
        } else if (negate.call(eq__q.call(type, pass))) {
          tokens.push(new ObjectLiteral({ type, value, line, col }));
          col = plus.call(col, len.bind(value)());
        } else {
          col = plus.call(col, len.bind(value)());
        }
        found = true;
        break;
      }
    }
    assert__b(found, 63, 13, `found`);
  }
  return tokens;
};
let lexer = construct_record.call(Lexer, [
  [/^\n/, newline],
  [/^\s+/, pass],
  [/^\/\/.*/, pass],
  [/^\,/, pass],
  [/^\;/, pass],
  [/^#/, Keyword.for("hash")],
  [/^\~/, Keyword.for("tilde")],
  [/^if\b/, Keyword.for("if")],
  [/^is\b/, Keyword.for("is")],
  [/^unless\b/, Keyword.for("unless")],
  [/^else\b/, Keyword.for("else")],
  [/^return\b/, Keyword.for("return")],
  [/^import\b/, Keyword.for("import")],
  [/^export\b/, Keyword.for("export")],
  [/^default\b/, Keyword.for("default")],
  [/^from\b/, Keyword.for("from")],
  [/^let\b/, Keyword.for("let")],
  [/^protocol\b/, Keyword.for("protocol")],
  [/^for\b/, Keyword.for("for")],
  [/^try\b/, Keyword.for("try")],
  [/^catch\b/, Keyword.for("catch")],
  [/^finally\b/, Keyword.for("finally")],
  [/^while\b/, Keyword.for("while")],
  [/^loop\b/, Keyword.for("loop")],
  [/^continue\b/, Keyword.for("continue")],
  [/^break\b/, Keyword.for("break")],
  [/^of\b/, Keyword.for("of")],
  [/^impl\b/, Keyword.for("impl")],
  [/^define\b/, Keyword.for("define")],
  [/^yield\b/, Keyword.for("yield")],
  [/^async\b/, Keyword.for("async")],
  [/^await\b/, Keyword.for("await")],
  [/^assert\!/, Keyword.for("assert__b")],
  [/^new\b/, Keyword.for("new")],
  [/^keyof\b/, Keyword.for("keyof")],
  [/^\=\>/, Keyword.for("arrow")],
  [/^\@/, Keyword.for("at")],
  [/^\&\&/, Keyword.for("and_and")],
  [/^\|\|/, Keyword.for("or_or")],
  [/^\=\=\=/, Keyword.for("triple_eq")],
  [/^\!\=\=/, Keyword.for("triple_not_eq")],
  [/^\=\=/, Keyword.for("double_eq")],
  [/^\!\=/, Keyword.for("not_eq")],
  [/^\!/, Keyword.for("bang")],
  [/^\=/, Keyword.for("eq")],
  [/^fn\b/, Keyword.for("fn")],
  [/^\{/, Keyword.for("open_b")],
  [/^\}/, Keyword.for("close_b")],
  [/^\(/, Keyword.for("open_p")],
  [/^\)/, Keyword.for("close_p")],
  [/^[\-\+]?\d+n/, Keyword.for("big_int")],
  [/^[\-\+]?(\d*\.)?\d+/, Keyword.for("num")],
  [/^\.\.\./, Keyword.for("dot_dot_dot")],
  [/^\.\./, Keyword.for("dot_dot")],
  [/^\./, Keyword.for("dot")],
  [/^\/.*\/[a-z]?/, Keyword.for("regex_lit")],
  [/^\>\=/, Keyword.for("gt_eq")],
  [/^\<\=/, Keyword.for("lt_eq")],
  [/^\>/, Keyword.for("gt")],
  [/^\</, Keyword.for("lt")],
  [/^\+/, Keyword.for("plus")],
  [/^\%/, Keyword.for("mod")],
  [/^\-/, Keyword.for("minus")],
  [/^\*\*/, Keyword.for("pow")],
  [/^\*/, Keyword.for("times")],
  [/^\&/, Keyword.for("single_and")],
  [/^\:\:/, Keyword.for("double_colon")],
  [/^\:[a-zA-Z_\?\!\$0-9]+/, Keyword.for("keyword")],
  [/^\:/, Keyword.for("colon")],
  [/^\//, Keyword.for("div")],
  [/^\[/, Keyword.for("open_sq")],
  [/^\]/, Keyword.for("close_sq")],
  [/^\"([^\\\"]|\\.)*\"/s, Keyword.for("string_lit")],
  [/^[a-zA-Z_\?\!\$0-9]+/, Keyword.for("id")],
]);
function ParseError(expected_token_type, actual_token) {
  this.stack = new Error().stack;
  this.message = str(
    "Expected: ",
    printable.bind(expected_token_type)(),
    " got ",
    printable.bind(at.bind(actual_token)(Keyword.for("type")))(),
    " @ ",
    as_str.bind(at.bind(actual_token)(Keyword.for("line")))(),
    ":",
    as_str.bind(at.bind(actual_token)(Keyword.for("col")))()
  );
}
ParseError.prototype = new Error();
function expect_token__b(kw) {
  if (
    truthy(
      negate.call(
        eq__q.call(at.bind(first.bind(this)())(Keyword.for("type")), kw)
      )
    )
  ) {
    raise__b(new ParseError(kw, first.bind(this)()));
  } else {
    return this;
  }
}
function verify_exists__b(parser) {
  if (truthy(nil__q.bind(this)())) {
    raise__b(
      new Error(
        plus.call("Parser Failed - Expected ", printable.bind(parser)())
      )
    );
  } else {
    return this;
  }
}
const ParseInstruction = Symbol("ParseInstruction");
let Init = construct_vector.call(DefVector, [Keyword.for("expr")]);
Init.prototype[ParseInstruction] = function ([_expr, tokens]) {
  return [this.expr, tokens];
};
Init.prototype[Printable] = function () {
  return str("Init(", printable.bind(this.expr)(), ")");
};
let One = construct_vector.call(DefVector, [
  Keyword.for("kw"),
  Keyword.for("as"),
]);
One.prototype[ParseInstruction] = function ([expr, tokens]) {
  let { value, type } = first.bind(expect_token__b.bind(tokens)(this.kw))();
  return [
    merge.bind(expr)(new ObjectLiteral({ [this.as]: value })),
    skip.bind(tokens)(1),
  ];
};
One.prototype[Printable] = function () {
  return plus.call(
    "One(kw: ",
    plus.call(
      printable.bind(this.kw)(),
      plus.call(", as: ", plus.call(printable.bind(this.as)(), ")"))
    )
  );
};
let Optional = construct_vector.call(DefVector, [
  Keyword.for("set_or_kw"),
  Keyword.for("parse_fn"),
  Keyword.for("as"),
]);
Optional.prototype[ParseInstruction] = function ([expr, tokens]) {
  if (truthy(empty__q.bind(tokens)())) {
    return [expr, tokens];
  }
  let { type } = first.bind(tokens)();
  if (
    truthy(
      and.call(this.set_or_kw instanceof Keyword, () =>
        eq__q.call(type, this.set_or_kw)
      )
    )
  ) {
    return parse_step.bind(
      construct_vector.call(Then, [this.parse_fn, this.as])
    )([expr, tokens]);
  } else if (
    and.call(this.set_or_kw instanceof Set, () =>
      call.bind(this.set_or_kw)(type)
    )
  ) {
    return parse_step.bind(
      construct_vector.call(Then, [this.parse_fn, this.as])
    )([expr, tokens]);
  } else {
    return [expr, tokens];
  }
};
Optional.prototype[Printable] = function () {
  return plus.call(
    "Optional(kw: ",
    plus.call(
      printable.bind(this.kw)(),
      plus.call(", as: ", plus.call(printable.bind(this.as)(), ")"))
    )
  );
};
Function.prototype[ParseInstruction] = function ([_expr, tokens]) {
  return this(tokens);
};
let Chomp = construct_vector.call(DefVector, [_, Keyword.for("kws")]);
Chomp.prototype[ParseInstruction] = function ([expr, tokens]) {
  let i = 0;
  for (let kw of this.kws) {
    expect_token__b.bind(skip.bind(tokens)(i))(kw);
    i = plus.call(i, 1);
  }
  return [expr, skip.bind(tokens)(i)];
};
Chomp.prototype[Printable] = function () {
  return plus.call(
    "Chomp(",
    plus.call(printable.bind(this.kws)().join(", "), ")")
  );
};
let Then = construct_vector.call(DefVector, [
  Keyword.for("parser"),
  Keyword.for("kw"),
]);
Then.prototype[ParseInstruction] = function ([expr, tokens]) {
  let result = call.bind(this.parser)(tokens);
  if (truthy(nil__q.bind(result)())) {
    return [expr, tokens];
  }
  let [new_expr, new_tokens] = result;
  if (truthy(this.kw)) {
    return [
      merge.bind(expr)(new ObjectLiteral({ [this.kw]: new_expr })),
      new_tokens,
    ];
  } else {
    return [new_expr, new_tokens];
  }
};
Then.prototype[Printable] = function () {
  return str("Then(", this.parser.name, ", ", printable.bind(this.kw)(), ")");
};
let FMap = construct_vector.call(DefVector, [Keyword.for("f")]);
FMap.prototype[ParseInstruction] = function ([expr, tokens]) {
  return [call.bind(this.f)(expr), tokens];
};
FMap.prototype[Printable] = function () {
  return plus.call("Fmap(", plus.call(this.f.name, ")"));
};
let Until = construct_vector.call(DefVector, [
  Keyword.for("end_kw"),
  Keyword.for("parser"),
  Keyword.for("kw"),
]);
Until.prototype[ParseInstruction] = function ([expr, tokens]) {
  let exprs = [];
  while (
    negate.call(
      eq__q.call(
        at.bind(first.bind(tokens)())(Keyword.for("type")),
        this.end_kw
      )
    )
  ) {
    let [expr, new_tokens] = verify_exists__b.bind(
      call.bind(this.parser)(tokens)
    )(this);
    exprs.push(expr);
    tokens = new_tokens;
  }
  if (truthy(this.kw)) {
    return [merge.bind(expr)(new ObjectLiteral({ [this.kw]: exprs })), tokens];
  } else {
    return [exprs, tokens];
  }
};
Until.prototype[Printable] = function () {
  return str(
    "Until(end: ",
    printable.bind(this.end_kw)(),
    ", f: ",
    this.parser.name,
    ", as: ",
    printable.bind(this.kw)(),
    ")"
  );
};
let Case = construct_vector.call(DefVector, [
  Keyword.for("parse_map"),
  Keyword.for("kw"),
]);
Case.prototype[ParseInstruction] = function ([expr, tokens]) {
  let __coil_if_let_temp = call.bind(this.parse_map)(tokens);
  if (truthy(__coil_if_let_temp)) {
    let [new_expr, new_tokens] = __coil_if_let_temp;
    if (truthy(this.kw)) {
      return [
        merge.bind(expr)(new ObjectLiteral({ [this.kw]: new_expr })),
        new_tokens,
      ];
    } else {
      return [new_expr, new_tokens];
    }
  } else {
    console.log(first.bind(this.tokens)(), this.parse_map);
    raise__b(new Error("Case Parse Failed"));
  }
};
Case.prototype[Printable] = function () {
  return plus.call(
    "Case(",
    plus.call(
      printable.bind(this.parse_map)(),
      plus.call(", as: ", plus.call(printable.bind(this.kw)(), ")"))
    )
  );
};
let Either = construct_vector.call(DefVector, [
  Keyword.for("set"),
  Keyword.for("kw"),
]);
Either.prototype[ParseInstruction] = function ([expr, tokens]) {
  let op = verify_exists__b.bind(
    at.bind(this.set)(at.bind(first.bind(tokens)())(Keyword.for("type")))
  )(this.set);
  let [new_expr, rest] = [first.bind(tokens)(), skip.bind(tokens)(1)];
  return [
    merge.bind(expr)(
      new ObjectLiteral({ [this.kw]: at.bind(new_expr)(Keyword.for("value")) })
    ),
    rest,
  ];
};
Either.prototype[Printable] = function () {
  return plus.call(
    "Either(",
    plus.call(
      printable.bind(this.set)(),
      plus.call(", as: ", plus.call(printable.bind(this.kw)(), ")"))
    )
  );
};
function parse_step(result) {
  if (truthy(negate.call(ParseInstruction in this))) {
    console.log("This is not parsable:", printable.bind(this)());
  }
  return this[ParseInstruction](result);
}
let Parser = construct_vector.call(DefVector, [_, Keyword.for("instructions")]);
Parser.prototype[Printable] = function () {
  return plus.call(
    "~Parser[",
    plus.call(printable.bind(this.instructions)().join(", "), "]")
  );
};
Parser.prototype[Call] = function (tokens) {
  return parse_step.bind(this)([null, tokens]);
};
let AbortIf = construct_vector.call(DefVector, [Keyword.for("cond_fn")]);
AbortIf.prototype[Printable] = function () {
  return plus.call(
    "~AbortIf[",
    plus.call(_resolve_keyword_str(this.cond_fn.name), "]")
  );
};
Parser.prototype[ParseInstruction] = function (result) {
  for (let instruction of this.instructions) {
    if (truthy(instruction instanceof AbortIf)) {
      if (truthy(call.bind(instruction.cond_fn)(result))) {
        return null;
      } else {
        continue;
      }
    }
    result = parse_step.bind(instruction)(result);
  }
  return result;
};
let ParseMap = construct_vector.call(DefRecord, [Keyword.for("entries")]);
ParseMap.prototype[Collection] = new ObjectLiteral({
  keys() {
    return as_set.bind(map.bind(this.entries)(first))();
  },
});
ParseMap.prototype[Call] = function (tokens, ...args) {
  if (truthy(empty__q.bind(tokens)())) {
    return null;
  }
  for (let [pattern, parser] of this.entries) {
    if (truthy(eq__q.call(pattern, _))) {
      return call.bind(parser)(tokens, ...args);
    }
    if (
      truthy(
        and.call(pattern instanceof Set, () =>
          call.bind(pattern)(at.bind(first.bind(tokens)())(Keyword.for("type")))
        )
      )
    ) {
      return call.bind(parser)(tokens, ...args);
    }
    if (
      truthy(
        and.call(pattern instanceof Array, () =>
          all_with_index__q.bind(pattern)(function (p, i) {
            if (truthy(greater_than_eq.call(i, len.bind(tokens)()))) {
              return false;
            }
            let type = at.bind(at.bind(tokens)(i))(Keyword.for("type"));
            if (truthy(p instanceof Keyword)) {
              return eq__q.call(p, type);
            }
            if (truthy(p instanceof Set)) {
              return has__q.bind(p)(type);
            }
            return false;
          })
        )
      )
    ) {
      return call.bind(parser)(tokens, ...args);
    }
    if (
      truthy(
        and.call(pattern instanceof Keyword, () =>
          eq__q.call(
            pattern,
            at.bind(first.bind(tokens)())(Keyword.for("type"))
          )
        )
      )
    ) {
      return call.bind(parser)(tokens, ...args);
    }
  }
};
let math_ops = new Set([
  Keyword.for("mod"),
  Keyword.for("plus"),
  Keyword.for("minus"),
  Keyword.for("times"),
  Keyword.for("pow"),
  Keyword.for("div"),
]);
let comparison_ops = new Set([
  Keyword.for("lt"),
  Keyword.for("gt"),
  Keyword.for("lt_eq"),
  Keyword.for("gt_eq"),
]);
let all_math_ops = merge.bind(math_ops)(comparison_ops);
function parse_double_eq(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("double_equals"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("double_eq")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_not_eq(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("not_equals"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("not_eq")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_triple_eq(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("triple_equals"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("triple_eq")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_triple_not_eq(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("triple_not_equals"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("triple_not_eq")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_and_and(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("and_and"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("and_and")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_or_or(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("or_or"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("or_or")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_keyof(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("keyof"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("keyof")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_comparison_op(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("math_op"), lhs }),
      ]),
      construct_vector.call(Either, [comparison_ops, Keyword.for("op")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_third_expr_step(tokens, lhs) {
  return call.bind(
    construct_record.call(ParseMap, [
      [Keyword.for("double_eq"), parse_double_eq],
      [Keyword.for("triple_eq"), parse_triple_eq],
      [Keyword.for("triple_not_eq"), parse_triple_not_eq],
      [Keyword.for("not_eq"), parse_not_eq],
      [Keyword.for("and_and"), parse_and_and],
      [Keyword.for("or_or"), parse_or_or],
      [Keyword.for("keyof"), parse_keyof],
      [comparison_ops, parse_comparison_op],
    ])
  )(tokens, lhs);
}
function parse_third_expr([lhs, tokens]) {
  let __coil_while_let_temp = parse_third_expr_step(tokens, lhs);
  while (__coil_while_let_temp) {
    let [new_lhs, rest] = __coil_while_let_temp;
    lhs = new_lhs;
    tokens = rest;
    __coil_while_let_temp = parse_third_expr_step(tokens, lhs);
  }
  return [lhs, tokens];
}
function parse_partial_obj_dyn_access(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("partial_obj_dyn_access") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_sq")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      construct_vector.call(Chomp, [Keyword.for("close_sq")]),
    ])
  )(tokens);
}
function parse_partial_fn_call(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("partial_fn_call") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_p")]),
      construct_vector.call(Until, [
        Keyword.for("close_p"),
        parse_expr,
        Keyword.for("args"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_p")]),
    ])
  )(tokens);
}
function parse_and_dot(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("and_dot"), lhs }),
      ]),
      construct_vector.call(Chomp, [
        Keyword.for("single_and"),
        Keyword.for("dot"),
      ]),
      construct_vector.call(Case, [
        construct_record.call(ParseMap, [
          [Keyword.for("id"), parse_id],
          [Keyword.for("open_sq"), parse_partial_obj_dyn_access],
          [Keyword.for("open_p"), parse_partial_fn_call],
        ]),
        Keyword.for("rhs"),
      ]),
    ])
  )(tokens);
}
function parse_dot(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("property_lookup"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("dot")]),
      construct_vector.call(One, [Keyword.for("id"), Keyword.for("property")]),
    ])
  )(tokens);
}
function parse_infix_bind(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("bind"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("double_colon")]),
      construct_vector.call(Case, [
        construct_record.call(ParseMap, [
          [Keyword.for("id"), parse_id],
          [Keyword.for("fn"), parse_fn],
          [
            [Keyword.for("tilde"), Keyword.for("id"), Keyword.for("open_b")],
            parse_record_syntax,
          ],
          [all_math_ops, parse_unapplied_math_op],
          [Keyword.for("open_p"), parse_paren_expr],
        ]),
        Keyword.for("expr"),
      ]),
    ])
  )(tokens);
}
function parse_is(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("is"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("is")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_snd_assign(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("snd_assign"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("eq")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_math_op(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("math_op"), lhs }),
      ]),
      construct_vector.call(Either, [math_ops, Keyword.for("op")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function not_adjacent__q([_expr, tokens]) {
  let current = first.bind(tokens)();
  let previous = at.bind(tokens.collection)(minus.call(tokens.idx, 1));
  if (truthy(negate.call(eq__q.call(current.line, previous.line)))) {
    return true;
  }
  let end_of_prev_token = plus.call(previous.col, previous.value.length);
  return greater_than_eq.call(minus.call(current.col, end_of_prev_token), 1);
}
function parse_adjacent_1_2_expr(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(AbortIf, [not_adjacent__q]),
      construct_vector.call(Then, [parse_1_2_expr]),
    ])
  )(tokens);
}
function parse_inclusive_range(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(AbortIf, [not_adjacent__q]),
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("inclusive_range"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("dot_dot")]),
      construct_vector.call(Optional, [
        keys.bind(SINGLE_EXPR_PARSE_MAP)(),
        parse_adjacent_1_2_expr,
        Keyword.for("rhs"),
      ]),
    ])
  )(tokens);
}
function parse_exclusive_range(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(AbortIf, [not_adjacent__q]),
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("exclusive_range"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("dot_dot_dot")]),
      construct_vector.call(Optional, [
        keys.bind(SINGLE_EXPR_PARSE_MAP)(),
        parse_adjacent_1_2_expr,
        Keyword.for("rhs"),
      ]),
    ])
  )(tokens);
}
function parse_fn_call(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(AbortIf, [not_adjacent__q]),
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("fn_call"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_p")]),
      construct_vector.call(Until, [
        Keyword.for("close_p"),
        parse_expr,
        Keyword.for("args"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_p")]),
    ])
  )(tokens);
}
function parse_object_dynamic_access(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(AbortIf, [not_adjacent__q]),
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("dynamic_access"), lhs }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_sq")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      construct_vector.call(Chomp, [Keyword.for("close_sq")]),
    ])
  )(tokens);
}
let assignable_ops = concat.bind(math_ops)([
  Keyword.for("or_or"),
  Keyword.for("and_and"),
]);
function parse_op_eq(tokens, lhs) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("op_eq"), lhs }),
      ]),
      construct_vector.call(Either, [assignable_ops, Keyword.for("op")]),
      construct_vector.call(Chomp, [Keyword.for("eq")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("rhs")]),
    ])
  )(tokens);
}
function parse_snd_expr_step(tokens, lhs) {
  return call.bind(
    construct_record.call(ParseMap, [
      [Keyword.for("single_and"), parse_and_dot],
      [Keyword.for("dot"), parse_dot],
      [Keyword.for("dot_dot"), parse_inclusive_range],
      [Keyword.for("dot_dot_dot"), parse_exclusive_range],
      [Keyword.for("open_p"), parse_fn_call],
      [Keyword.for("double_colon"), parse_infix_bind],
      [Keyword.for("open_sq"), parse_object_dynamic_access],
      [Keyword.for("is"), parse_is],
      [Keyword.for("eq"), parse_snd_assign],
      [[assignable_ops, Keyword.for("eq")], parse_op_eq],
      [math_ops, parse_math_op],
    ])
  )(tokens, lhs);
}
function parse_snd_expr([lhs, tokens]) {
  let __coil_while_let_temp = parse_snd_expr_step(tokens, lhs);
  while (__coil_while_let_temp) {
    let [new_lhs, rest] = __coil_while_let_temp;
    lhs = new_lhs;
    tokens = rest;
    __coil_while_let_temp = parse_snd_expr_step(tokens, lhs);
  }
  return [lhs, tokens];
}
function parse_call_expr(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Chomp, [Keyword.for("open_p")]),
      construct_vector.call(Until, [Keyword.for("close_p"), parse_expr]),
      construct_vector.call(Chomp, [Keyword.for("close_p")]),
    ])
  )(tokens);
}
function parse_decorator(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("decorator") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("at")]),
      construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
      construct_vector.call(Optional, [
        Keyword.for("open_p"),
        parse_call_expr,
        Keyword.for("args"),
      ]),
      construct_vector.call(Then, [parse_fn, Keyword.for("fn_def")]),
    ])
  )(tokens);
}
let parse_regex = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("regex_lit") }),
  ]),
  construct_vector.call(One, [Keyword.for("regex_lit"), Keyword.for("value")]),
]);
let parse_str = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("str") }),
  ]),
  construct_vector.call(One, [Keyword.for("string_lit"), Keyword.for("value")]),
]);
let parse_id = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("id_lookup") }),
  ]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
]);
function parse_reg_obj_entry(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("reg_obj_entry") }),
      ]),
      construct_vector.call(Either, [
        new Set([Keyword.for("id"), Keyword.for("num")]),
        Keyword.for("key"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("colon")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("value")]),
    ])
  )(tokens);
}
let parse_obj_shorthand_entry = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("obj_shorthand_entry") }),
  ]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("id")]),
]);
function parse_dynamic_obj_entry(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("dynamic_obj_entry") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_sq")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("key_expr")]),
      construct_vector.call(Chomp, [
        Keyword.for("close_sq"),
        Keyword.for("colon"),
      ]),
      construct_vector.call(Then, [parse_expr, Keyword.for("value")]),
    ])
  )(tokens);
}
function parse_spread_obj_entry(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("spread_obj_entry") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("dot_dot_dot")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
    ])
  )(tokens);
}
function parse_obj_entry(tokens) {
  return call.bind(
    construct_record.call(ParseMap, [
      [Keyword.for("open_sq"), parse_dynamic_obj_entry],
      [Keyword.for("dot_dot_dot"), parse_spread_obj_entry],
      [Keyword.for("fn"), parse_fn],
      [[Keyword.for("async"), Keyword.for("fn")], parse_fn],
      [[Keyword.for("id"), Keyword.for("colon")], parse_reg_obj_entry],
      [[Keyword.for("num"), Keyword.for("colon")], parse_reg_obj_entry],
      [Keyword.for("id"), parse_obj_shorthand_entry],
    ])
  )(tokens);
}
function parse_obj(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("obj_lit") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_b")]),
      construct_vector.call(Until, [
        Keyword.for("close_b"),
        parse_obj_entry,
        Keyword.for("entries"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_b")]),
    ])
  )(tokens);
}
let parse_spread_assign = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("spread_assign") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("dot_dot_dot")]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
]);
let parse_assign_id = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("id_assign") }),
  ]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
]);
let parse_assign_array_entry = construct_record.call(ParseMap, [
  [Keyword.for("id"), parse_assign_id],
  [Keyword.for("dot_dot_dot"), parse_spread_assign],
]);
let parse_assign_array = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("array_deconstruction") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("open_sq")]),
  construct_vector.call(Until, [
    Keyword.for("close_sq"),
    parse_assign_array_entry,
    Keyword.for("entries"),
  ]),
  construct_vector.call(Chomp, [Keyword.for("close_sq")]),
]);
let parse_obj_entry_rename = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("obj_entry_rename") }),
  ]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("old_name")]),
  construct_vector.call(Chomp, [Keyword.for("colon")]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("new_name")]),
]);
let parse_regular_obj_assign_entry = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("obj_reg_entry") }),
  ]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
]);
let parse_obj_assign_entry = construct_record.call(ParseMap, [
  [[Keyword.for("id"), Keyword.for("colon")], parse_obj_entry_rename],
  [Keyword.for("id"), parse_regular_obj_assign_entry],
  [Keyword.for("dot_dot_dot"), parse_spread_assign],
]);
let parse_assign_obj = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("object_deconstruction") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("open_b")]),
  construct_vector.call(Until, [
    Keyword.for("close_b"),
    parse_obj_assign_entry,
    Keyword.for("entries"),
  ]),
  construct_vector.call(Chomp, [Keyword.for("close_b")]),
]);
let parse_assign_expr = construct_record.call(ParseMap, [
  [Keyword.for("id"), parse_assign_id],
  [Keyword.for("open_sq"), parse_assign_array],
  [Keyword.for("open_b"), parse_assign_obj],
  [Keyword.for("dot_dot_dot"), parse_spread_assign],
]);
let parse_keyword = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("keyword") }),
  ]),
  construct_vector.call(One, [Keyword.for("keyword"), Keyword.for("value")]),
]);
function parse_paren_expr(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("paren_expr") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_p")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      construct_vector.call(Chomp, [Keyword.for("close_p")]),
    ])
  )(tokens);
}
function parse_yield(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("yield") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("yield")]),
      construct_vector.call(Optional, [
        Keyword.for("times"),
        parse_gen_modifier,
        Keyword.for("star__q"),
      ]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
    ])
  )(tokens);
}
function parse_await(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("await") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("await")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
    ])
  )(tokens);
}
let parse_num = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("num") }),
  ]),
  construct_vector.call(One, [Keyword.for("num"), Keyword.for("value")]),
]);
let parse_big_int = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("big_int") }),
  ]),
  construct_vector.call(One, [Keyword.for("big_int"), Keyword.for("value")]),
]);
function parse_array(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("array") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_sq")]),
      construct_vector.call(Until, [
        Keyword.for("close_sq"),
        parse_expr,
        Keyword.for("elements"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_sq")]),
    ])
  )(tokens);
}
function parse_spread(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("spread") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("dot_dot_dot")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
    ])
  )(tokens);
}
let parse_unapplied_math_op = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("unapplied_math_op") }),
  ]),
  construct_vector.call(Either, [all_math_ops, Keyword.for("op")]),
]);
function parse_bind_this(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("bind_this") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("double_colon")]),
      construct_vector.call(Case, [
        construct_record.call(ParseMap, [
          [Keyword.for("id"), parse_id],
          [Keyword.for("fn"), parse_fn],
          [all_math_ops, parse_unapplied_math_op],
          [Keyword.for("open_p"), parse_paren_expr],
        ]),
        Keyword.for("expr"),
      ]),
    ])
  )(tokens);
}
function parse_not(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("not") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("bang")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("expr")]),
    ])
  )(tokens);
}
function parse_new(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("new") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("new")]),
      construct_vector.call(One, [
        Keyword.for("id"),
        Keyword.for("constructor_name"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_p")]),
      construct_vector.call(Until, [
        Keyword.for("close_p"),
        parse_expr,
        Keyword.for("args"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_p")]),
    ])
  )(tokens);
}
function parse_num_raw(tokens) {
  return pipe.bind(call.bind(parse_num)(tokens))(function ([expr, tokens]) {
    return [to_i.bind(at.bind(expr)(Keyword.for("value")))(), tokens];
  });
}
let parse_anon_arg_id = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("anon_arg_id") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("single_and")]),
  construct_vector.call(Optional, [
    Keyword.for("num"),
    parse_num_raw,
    Keyword.for("arg_num"),
  ]),
]);
let parse_unapplied_and_and = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("unapplied_and_and") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("and_and")]),
]);
let parse_unapplied_or_or = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("unapplied_or_or") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("or_or")]),
]);
function parse_shorthand_anon_fn(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("shorthand_anon_fn") }),
      ]),
      construct_vector.call(Chomp, [
        Keyword.for("hash"),
        Keyword.for("open_p"),
      ]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      construct_vector.call(Chomp, [Keyword.for("close_p")]),
    ])
  )(tokens);
}
let parse_async_modifier = construct_vector.call(Parser, [
  construct_vector.call(Init, [true]),
  construct_vector.call(Chomp, [Keyword.for("async")]),
]);
let parse_gen_modifier = construct_vector.call(Parser, [
  construct_vector.call(Init, [true]),
  construct_vector.call(Chomp, [Keyword.for("times")]),
]);
function parse_fn_expr_body(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("return") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("eq")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      construct_vector.call(FMap, [
        function (node) {
          return [node];
        },
      ]),
    ])
  )(tokens);
}
function parse_args_def(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Chomp, [Keyword.for("open_p")]),
      construct_vector.call(Until, [Keyword.for("close_p"), parse_assign_expr]),
      construct_vector.call(Chomp, [Keyword.for("close_p")]),
    ])
  )(tokens);
}
function parse_fn_name(tokens) {
  return pipe.bind(call.bind(parse_id)(tokens))(function ([expr, tokens]) {
    return [at.bind(expr)(Keyword.for("name")), tokens];
  });
}
function parse_fn(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("fn") }),
      ]),
      construct_vector.call(Optional, [
        Keyword.for("async"),
        parse_async_modifier,
        Keyword.for("is_async__q"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("fn")]),
      construct_vector.call(Optional, [
        Keyword.for("times"),
        parse_gen_modifier,
        Keyword.for("generator__q"),
      ]),
      construct_vector.call(Optional, [
        Keyword.for("id"),
        parse_fn_name,
        Keyword.for("name"),
      ]),
      construct_vector.call(Optional, [
        Keyword.for("open_p"),
        parse_args_def,
        Keyword.for("args"),
      ]),
      construct_vector.call(Case, [
        construct_record.call(ParseMap, [
          [Keyword.for("eq"), parse_fn_expr_body],
          [Keyword.for("open_b"), block()],
        ]),
        Keyword.for("body"),
      ]),
    ])
  )(tokens);
}
function parse_keyword_record_entry(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("keyword_record_entry") }),
      ]),
      construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
      construct_vector.call(Chomp, [Keyword.for("colon")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
    ])
  )(tokens);
}
function parse_regular_record_entry(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("regular_record_entry") }),
      ]),
      construct_vector.call(Then, [parse_expr, Keyword.for("key_expr")]),
      construct_vector.call(Chomp, [Keyword.for("arrow")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("value_expr")]),
    ])
  )(tokens);
}
function parse_record_entry(tokens) {
  return call.bind(
    construct_record.call(ParseMap, [
      [[Keyword.for("id"), Keyword.for("colon")], parse_keyword_record_entry],
      [_, parse_regular_record_entry],
    ])
  )(tokens);
}
function parse_record_syntax(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("record_syntax") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("tilde")]),
      construct_vector.call(One, [
        Keyword.for("id"),
        Keyword.for("constructor_name"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_b")]),
      construct_vector.call(Until, [
        Keyword.for("close_b"),
        parse_record_entry,
        Keyword.for("entries"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_b")]),
    ])
  )(tokens);
}
function parse_vector_syntax(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("vector_syntax") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("tilde")]),
      construct_vector.call(One, [
        Keyword.for("id"),
        Keyword.for("constructor_name"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("open_sq")]),
      construct_vector.call(Until, [
        Keyword.for("close_sq"),
        parse_expr,
        Keyword.for("entries"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_sq")]),
    ])
  )(tokens);
}
function parse_set(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("set") }),
      ]),
      construct_vector.call(Chomp, [
        Keyword.for("hash"),
        Keyword.for("open_b"),
      ]),
      construct_vector.call(Until, [
        Keyword.for("close_b"),
        parse_expr,
        Keyword.for("elements"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_b")]),
    ])
  )(tokens);
}
function parse_prefix_inclusive_range(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("prefix_inclusive_range") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("dot_dot")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
    ])
  )(tokens);
}
let SINGLE_EXPR_PARSE_MAP = construct_record.call(ParseMap, [
  [Keyword.for("string_lit"), parse_str],
  [Keyword.for("regex_lit"), parse_regex],
  [Keyword.for("keyword"), parse_keyword],
  [Keyword.for("open_p"), parse_paren_expr],
  [Keyword.for("yield"), parse_yield],
  [Keyword.for("await"), parse_await],
  [Keyword.for("id"), parse_id],
  [Keyword.for("at"), parse_decorator],
  [Keyword.for("num"), parse_num],
  [Keyword.for("big_int"), parse_big_int],
  [Keyword.for("open_sq"), parse_array],
  [Keyword.for("dot_dot"), parse_prefix_inclusive_range],
  [Keyword.for("dot_dot_dot"), parse_spread],
  [Keyword.for("double_colon"), parse_bind_this],
  [Keyword.for("bang"), parse_not],
  [Keyword.for("new"), parse_new],
  [Keyword.for("single_and"), parse_anon_arg_id],
  [Keyword.for("open_b"), parse_obj],
  [Keyword.for("and_and"), parse_unapplied_and_and],
  [Keyword.for("or_or"), parse_unapplied_or_or],
  [all_math_ops, parse_unapplied_math_op],
  [[Keyword.for("hash"), Keyword.for("open_p")], parse_shorthand_anon_fn],
  [[Keyword.for("hash"), Keyword.for("open_b")], parse_set],
  [[Keyword.for("async"), Keyword.for("fn")], parse_fn],
  [Keyword.for("fn"), parse_fn],
  [
    [Keyword.for("tilde"), Keyword.for("id"), Keyword.for("open_b")],
    parse_record_syntax,
  ],
  [
    [Keyword.for("tilde"), Keyword.for("id"), Keyword.for("open_sq")],
    parse_vector_syntax,
  ],
]);
function parse_single_expr(tokens) {
  return call.bind(SINGLE_EXPR_PARSE_MAP)(tokens);
}
function parse_1_2_expr(tokens) {
  return pipe.bind(parse_single_expr(tokens))(parse_snd_expr);
}
function parse_expr(tokens) {
  return pipe.bind(pipe.bind(parse_single_expr(tokens))(parse_snd_expr))(
    parse_third_expr
  );
}
function parse_else_branch(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("else") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("else")]),
      block(Keyword.for("body")),
    ])
  )(tokens);
}
function parse_else_if_branch(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("else_if") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("else"), Keyword.for("if")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      block(Keyword.for("pass")),
      construct_vector.call(Optional, [
        Keyword.for("else"),
        parse_if_branch,
        Keyword.for("fail"),
      ]),
    ])
  )(tokens);
}
function parse_if_branch(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Case, [
        construct_record.call(ParseMap, [
          [[Keyword.for("else"), Keyword.for("if")], parse_else_if_branch],
          [Keyword.for("else"), parse_else_branch],
        ]),
      ]),
    ])
  )(tokens);
}
function parse_if(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("if") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("if")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      block(Keyword.for("pass")),
      construct_vector.call(Optional, [
        Keyword.for("else"),
        parse_if_branch,
        Keyword.for("fail"),
      ]),
    ])
  )(tokens);
}
function parse_unless(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("unless") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("unless")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      block(Keyword.for("body")),
    ])
  )(tokens);
}
let parse_let = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("let") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("let")]),
  construct_vector.call(Then, [parse_assign_expr, Keyword.for("assign_expr")]),
  construct_vector.call(Chomp, [Keyword.for("eq")]),
  construct_vector.call(Then, [parse_expr, Keyword.for("rhs")]),
]);
function parse_if_let(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("if_let") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("if"), Keyword.for("let")]),
      construct_vector.call(Then, [
        parse_assign_expr,
        Keyword.for("assign_expr"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("eq")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      construct_vector.call(Chomp, [Keyword.for("open_b")]),
      construct_vector.call(Until, [
        Keyword.for("close_b"),
        parse_statement,
        Keyword.for("pass"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("close_b")]),
      construct_vector.call(Optional, [
        Keyword.for("else"),
        parse_else_branch,
        Keyword.for("fail"),
      ]),
    ])
  )(tokens);
}
let parse_impl_for = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("impl_for") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("impl")]),
  construct_vector.call(Then, [parse_expr, Keyword.for("proto_expr")]),
  construct_vector.call(Chomp, [Keyword.for("for")]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("constructor")]),
  construct_vector.call(Chomp, [Keyword.for("eq")]),
  construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
]);
let parse_define = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("define_for") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("define")]),
  construct_vector.call(Then, [parse_expr, Keyword.for("proto_expr")]),
  construct_vector.call(Chomp, [Keyword.for("for")]),
  construct_vector.call(Then, [parse_single_expr, Keyword.for("src_expr")]),
  construct_vector.call(Chomp, [Keyword.for("eq")]),
  construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
]);
let parse_protocol = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("protocol_def") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("protocol")]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
]);
let parse_return = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("return") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("return")]),
  construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
]);
let parse_await_modifier = construct_vector.call(Parser, [
  construct_vector.call(Init, [true]),
  construct_vector.call(Chomp, [Keyword.for("await")]),
]);
function parse_for_loop(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("for_loop") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("for")]),
      construct_vector.call(Optional, [
        Keyword.for("await"),
        parse_await_modifier,
        Keyword.for("is_await__q"),
      ]),
      construct_vector.call(Then, [
        parse_assign_expr,
        Keyword.for("assign_expr"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("of")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("iterable_expr")]),
      block(Keyword.for("body")),
    ])
  )(tokens);
}
function parse_assert(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("assert") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("assert__b")]),
      construct_vector.call(Then, [
        function (tokens) {
          return [first.bind(tokens)(), tokens];
        },
        Keyword.for("token"),
      ]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
      construct_vector.call(Optional, [
        Keyword.for("string_lit"),
        parse_str,
        Keyword.for("msg"),
      ]),
    ])
  )(tokens);
}
function parse_loop(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("loop") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("loop")]),
      block(Keyword.for("body")),
    ])
  )(tokens);
}
function parse_while_loop(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("while_loop") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("while")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("test_expr")]),
      block(Keyword.for("body")),
    ])
  )(tokens);
}
function parse_while_let_loop(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("while_let_loop") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("while"), Keyword.for("let")]),
      construct_vector.call(Then, [
        parse_assign_expr,
        Keyword.for("assign_expr"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("eq")]),
      construct_vector.call(Then, [parse_expr, Keyword.for("test_expr")]),
      block(Keyword.for("body")),
    ])
  )(tokens);
}
function parse_continue(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("continue") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("continue")]),
    ])
  )(tokens);
}
function parse_break(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("break") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("break")]),
    ])
  )(tokens);
}
function parse_catch(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("catch") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("catch")]),
      construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
      block(Keyword.for("body")),
    ])
  )(tokens);
}
function parse_finally(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("finally") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("finally")]),
      block(Keyword.for("body")),
    ])
  )(tokens);
}
function parse_try(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("try") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("try")]),
      block(Keyword.for("body")),
      construct_vector.call(Optional, [
        Keyword.for("catch"),
        parse_catch,
        Keyword.for("catch"),
      ]),
      construct_vector.call(Optional, [
        Keyword.for("finally"),
        parse_finally,
        Keyword.for("finally"),
      ]),
    ])
  )(tokens);
}
let parse_impl_object = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("impl_object") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("impl")]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("constructor")]),
  construct_vector.call(Chomp, [Keyword.for("eq")]),
  construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
]);
function parse_import(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("import") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("import")]),
      construct_vector.call(Then, [
        parse_assign_expr,
        Keyword.for("assign_expr"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("from")]),
      construct_vector.call(Then, [parse_str, Keyword.for("path")]),
    ])
  )(tokens);
}
function parse_export(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("export") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("export")]),
      construct_vector.call(Then, [parse_statement, Keyword.for("statement")]),
    ])
  )(tokens);
}
function parse_export_default(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("export_default") }),
      ]),
      construct_vector.call(Chomp, [
        Keyword.for("export"),
        Keyword.for("default"),
      ]),
      construct_vector.call(Then, [parse_expr, Keyword.for("expr")]),
    ])
  )(tokens);
}
function parse_label(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("label") }),
      ]),
      construct_vector.call(One, [
        Keyword.for("id"),
        Keyword.for("label_name"),
      ]),
      construct_vector.call(Chomp, [Keyword.for("colon")]),
      construct_vector.call(Then, [parse_statement, Keyword.for("statement")]),
    ])
  )(tokens);
}
function parse_statement(tokens) {
  return call.bind(
    construct_record.call(ParseMap, [
      [Keyword.for("let"), parse_let],
      [Keyword.for("for"), parse_for_loop],
      [Keyword.for("unless"), parse_unless],
      [Keyword.for("assert__b"), parse_assert],
      [Keyword.for("define"), parse_define],
      [Keyword.for("try"), parse_try],
      [Keyword.for("protocol"), parse_protocol],
      [Keyword.for("return"), parse_return],
      [Keyword.for("continue"), parse_continue],
      [Keyword.for("break"), parse_break],
      [Keyword.for("loop"), parse_loop],
      [Keyword.for("import"), parse_import],
      [[Keyword.for("export"), Keyword.for("default")], parse_export_default],
      [Keyword.for("export"), parse_export],
      [
        [Keyword.for("impl"), Keyword.for("id"), Keyword.for("eq")],
        parse_impl_object,
      ],
      [Keyword.for("impl"), parse_impl_for],
      [[Keyword.for("while"), Keyword.for("let")], parse_while_let_loop],
      [Keyword.for("while"), parse_while_loop],
      [[Keyword.for("if"), Keyword.for("let")], parse_if_let],
      [Keyword.for("if"), parse_if],
      [[Keyword.for("id"), Keyword.for("colon")], parse_label],
      [_, parse_expr],
    ])
  )(tokens);
}
function block(name) {
  return construct_vector.call(Parser, [
    construct_vector.call(Chomp, [Keyword.for("open_b")]),
    construct_vector.call(Until, [
      Keyword.for("close_b"),
      parse_statement,
      name,
    ]),
    construct_vector.call(Chomp, [Keyword.for("close_b")]),
  ]);
}
function parse(tokens) {
  let ast = [];
  let __coil_while_let_temp = call.bind(parse_statement)(tokens);
  while (__coil_while_let_temp) {
    let [statement_or_expr, rest] = __coil_while_let_temp;
    ast.push(statement_or_expr);
    tokens = rest;
    __coil_while_let_temp = call.bind(parse_statement)(tokens);
  }
  return ast;
}
function resolve_name(name) {
  if (truthy(eq__q.call(name, "with"))) {
    return "__coil_with";
  }
  if (truthy(eq__q.call(name, "case"))) {
    return "__coil_case";
  }
  if (truthy(name)) {
    return name.replaceAll("?", "__q").replaceAll("!", "__b");
  }
  return name;
}
function eval_if_branch(branch) {
  if (truthy(nil__q.bind(branch)())) {
    return "";
  } else if (
    eq__q.call(at.bind(branch)(Keyword.for("type")), Keyword.for("else"))
  ) {
    return str(
      " else {\n",
      eval_ast(or.call(at.bind(branch)(Keyword.for("body")), () => [])),
      "\n}"
    );
  } else {
    assert__b(
      eq__q.call(at.bind(branch)(Keyword.for("type")), Keyword.for("else_if")),
      1160,
      13,
      `eq__q.call(at.bind(branch)(Keyword.for("type")), Keyword.for("else_if"))`
    );
    return str(
      " else if (",
      eval_expr(at.bind(branch)(Keyword.for("expr"))),
      ") {\n",
      eval_ast(or.call(at.bind(branch)(Keyword.for("pass")), () => [])),
      "\n}",
      eval_if_branch(at.bind(branch)(Keyword.for("fail")))
    );
  }
}
function eval_if({ expr, pass, fail }) {
  return str(
    "if (truthy(",
    eval_expr(expr),
    ")) {\n",
    eval_ast(pass),
    "\n",
    "}",
    eval_if_branch(fail)
  );
}
function eval_unless({ expr, body }) {
  return str(
    "if (negate.call(",
    eval_expr(expr),
    ")) {\n",
    eval_ast(body),
    "\n",
    "}"
  );
}
function eval_str({ value }) {
  value = value.slice(1, -1);
  if (truthy(value.includes("\n"))) {
    return str("`", value, "`");
  } else {
    return str('"', value, '"');
  }
}
function eval_property_lookup({ lhs, property }) {
  return str(eval_expr(lhs), ".", resolve_name(property));
}
function eval_fn_call({ lhs, args }) {
  return str(eval_expr(lhs), "(", map.bind(args)(eval_expr).join(", "), ")");
}
function eval_id_assign_name({ name }) {
  return resolve_name(name);
}
function eval_spread_assign({ name }) {
  return str("...", resolve_name(name));
}
function eval_array_deconstruction_entry(node) {
  return call.bind(
    pipe.bind(at.bind(node)(Keyword.for("type")))(
      construct_record.call(Map, [
        [Keyword.for("id_assign"), eval_id_assign_name],
        [Keyword.for("spread_assign"), eval_spread_assign],
      ])
    )
  )(node);
}
function eval_array_deconstruction_names({ entries }) {
  return str(
    "[",
    map.bind(entries)(eval_array_deconstruction_entry).join(", "),
    "]"
  );
}
function eval_obj_deconstruction_entry(node) {
  return call.bind(
    pipe.bind(at.bind(node)(Keyword.for("type")))(
      construct_record.call(Map, [
        [
          Keyword.for("obj_reg_entry"),
          (...__args) => resolve_name(at.bind(__args[0])(Keyword.for("name"))),
        ],
        [
          Keyword.for("obj_entry_rename"),
          (...__args) =>
            str(
              resolve_name(at.bind(__args[0])(Keyword.for("old_name"))),
              ": ",
              resolve_name(at.bind(__args[0])(Keyword.for("new_name")))
            ),
        ],
        [Keyword.for("spread_assign"), eval_spread_assign],
      ])
    )
  )(node);
}
function eval_object_deconstruction_names({ entries }) {
  return str(
    "{",
    map.bind(entries)(eval_obj_deconstruction_entry).join(", "),
    "}"
  );
}
function eval_assign_expr(node) {
  return call.bind(
    pipe.bind(at.bind(node)(Keyword.for("type")))(
      construct_record.call(Map, [
        [Keyword.for("id_assign"), eval_id_assign_name],
        [Keyword.for("spread_assign"), eval_spread_assign],
        [Keyword.for("array_deconstruction"), eval_array_deconstruction_names],
        [
          Keyword.for("object_deconstruction"),
          eval_object_deconstruction_names,
        ],
      ])
    )
  )(node);
}
function eval_while_let_loop({ assign_expr, test_expr, body }) {
  return str(
    "let __coil_while_let_temp = ",
    eval_expr(test_expr),
    ";\n",
    "while (__coil_while_let_temp) {\n",
    "let ",
    eval_assign_expr(assign_expr),
    " = __coil_while_let_temp;\n",
    eval_ast(body),
    "\n",
    "__coil_while_let_temp = ",
    eval_expr(test_expr),
    ";\n",
    "}"
  );
}
function eval_if_let({ assign_expr, expr, pass, fail }) {
  return str(
    "let __coil_if_let_temp = ",
    eval_expr(expr),
    ";\n",
    "if (truthy(__coil_if_let_temp)) {\n",
    "let ",
    eval_assign_expr(assign_expr),
    " = __coil_if_let_temp;\n",
    eval_ast(pass),
    "\n",
    "}",
    eval_if_branch(fail)
  );
}
function eval_spread({ expr }) {
  return str("...", eval_expr(expr));
}
function eval_let({ assign_expr, rhs }) {
  return str("let ", eval_assign_expr(assign_expr), " = ", eval_expr(rhs));
}
function eval_array({ elements }) {
  return str("[", map.bind(elements)(eval_expr).join(", "), "]");
}
let math_op_to_method = construct_record.call(Map, [
  [">", "greater_than"],
  ["<", "less_than"],
  [">=", "greater_than_eq"],
  ["<=", "less_than_eq"],
  ["*", "times"],
  ["**", "exponent"],
  ["/", "divide_by"],
  ["+", "plus"],
  ["-", "minus"],
  ["%", "mod"],
]);
function eval_math_op({ lhs, op, rhs }) {
  return str(
    call.bind(math_op_to_method)(op),
    ".call(",
    eval_expr(lhs),
    ",",
    eval_expr(rhs),
    ")"
  );
}
function eval_fn({ is_async__q, generator__q, name, args, body }) {
  return str(
    and.call(is_async__q, () => "async "),
    "function ",
    and.call(generator__q, () => "*"),
    resolve_name(name),
    "(",
    map.bind(args)(eval_assign_expr).join(", "),
    ") {\n",
    eval_ast(body),
    "}"
  );
}
function eval_set({ elements }) {
  return str("new Set([", map.bind(elements)(eval_expr).join(", "), "])");
}
function eval_bind({ lhs, expr }) {
  return str(eval_expr(expr), ".bind(", eval_expr(lhs), ")");
}
function eval_reg_obj_entry({ key, value }) {
  return str(resolve_name(key), ": ", eval_expr(value));
}
function eval_obj_shorthand_entry({ id }) {
  return resolve_name(id);
}
function eval_dynamic_obj_entry({ key_expr, value }) {
  return str("[", eval_expr(key_expr), "]: ", eval_expr(value));
}
function eval_obj_fn({ name, generator__q, is_async__q, args, body }) {
  return str(
    and.call(is_async__q, () => "async"),
    and.call(generator__q, () => "*"),
    resolve_name(name),
    "(",
    map.bind(args)(eval_assign_expr).join(", "),
    ") {\n",
    eval_ast(body),
    "\n}"
  );
}
function eval_obj_entry(node) {
  return call.bind(
    pipe.bind(at.bind(node)(Keyword.for("type")))(
      construct_record.call(Map, [
        [Keyword.for("reg_obj_entry"), eval_reg_obj_entry],
        [Keyword.for("obj_shorthand_entry"), eval_obj_shorthand_entry],
        [Keyword.for("dynamic_obj_entry"), eval_dynamic_obj_entry],
        [Keyword.for("spread_obj_entry"), eval_spread],
        [Keyword.for("fn"), eval_obj_fn],
      ])
    )
  )(node);
}
function eval_obj_lit({ entries }) {
  return str(
    "new ObjectLiteral({",
    map.bind(entries)(eval_obj_entry).join(", "),
    "})"
  );
}
function eval_bind_this({ expr }) {
  return str(eval_expr(expr), ".bind(this)");
}
function eval_id_lookup({ name }) {
  return resolve_name(name);
}
function eval_num({ value }) {
  return str("(", value, ")");
}
function eval_big_int({ value }) {
  return value;
}
function eval_double_equals({ lhs, rhs }) {
  return str(
    resolve_name("eq?"),
    ".call(",
    eval_expr(lhs),
    ", ",
    eval_expr(rhs),
    ")"
  );
}
function eval_not_equals(node) {
  return str("negate.call(", eval_double_equals(node), ")");
}
function eval_not({ expr }) {
  return str("negate.call(", eval_expr(expr), ")");
}
function eval_dynamic_access({ lhs, expr }) {
  return str(eval_expr(lhs), "[", eval_expr(expr), "]");
}
function eval_new({ constructor_name, args }) {
  return str(
    "new ",
    constructor_name,
    "(",
    map.bind(args)(eval_expr).join(", "),
    ")"
  );
}
function eval_triple_equals({ lhs, rhs }) {
  return str(eval_expr(lhs), " === ", eval_expr(rhs));
}
function eval_triple_not_equals({ lhs, rhs }) {
  return str(eval_expr(lhs), " !== ", eval_expr(rhs));
}
function eval_is({ lhs, rhs }) {
  return str(eval_expr(lhs), " instanceof ", eval_expr(rhs));
}
function eval_and_and({ lhs, rhs }) {
  return str("and.call(", eval_expr(lhs), ", () => ", eval_expr(rhs), ")");
}
function eval_or_or({ lhs, rhs }) {
  return str("or.call(", eval_expr(lhs), ", () => ", eval_expr(rhs), ")");
}
function eval_snd_assign({ lhs, rhs }) {
  return str(eval_expr(lhs), " = ", eval_expr(rhs));
}
function eval_await({ expr }) {
  return str("await ", eval_expr(expr));
}
function eval_yield({ star__q, expr }) {
  return str(
    "yield",
    and.call(star__q, () => "*"),
    " ",
    eval_expr(expr)
  );
}
function eval_paren_expr({ expr }) {
  return str("(", eval_expr(expr), ")");
}
function eval_unapplied_math_op({ op }) {
  return call.bind(math_op_to_method)(op);
}
function eval_unapplied_and_and() {
  return "and";
}
function eval_unapplied_or_or() {
  return "or";
}
function eval_keyword({ value }) {
  return str('Keyword.for("', resolve_name(value).slice(1), '")');
}
function eval_regular_record_entry({ key_expr, value_expr }) {
  return str("[", eval_expr(key_expr), ", ", eval_expr(value_expr), "]");
}
function eval_keyword_record_entry({ name, expr }) {
  return str(
    "[",
    eval_keyword(new ObjectLiteral({ value: str(":", name) })),
    ", ",
    eval_expr(expr),
    "]"
  );
}
function eval_record_entry(node) {
  return call.bind(
    pipe.bind(at.bind(node)(Keyword.for("type")))(
      construct_record.call(Map, [
        [Keyword.for("regular_record_entry"), eval_regular_record_entry],
        [Keyword.for("keyword_record_entry"), eval_keyword_record_entry],
      ])
    )
  )(node);
}
function eval_record_syntax({ constructor_name, entries }) {
  return str(
    "construct_record.call(",
    constructor_name,
    ", ",
    "[",
    map.bind(entries)(eval_record_entry).join(", "),
    "]",
    ")"
  );
}
function eval_vector_syntax({ constructor_name, entries }) {
  return str(
    "construct_vector.call(",
    constructor_name,
    ", ",
    "[",
    map.bind(entries)(eval_expr).join(", "),
    "]",
    ")"
  );
}
function eval_inclusive_range({ lhs, rhs }) {
  if (truthy(rhs)) {
    return str("new IRange(", eval_expr(lhs), ", ", eval_expr(rhs), ")");
  } else {
    return str("new IRange(", eval_expr(lhs), ", Infinity)");
  }
}
function eval_exclusive_range({ lhs, rhs }) {
  if (truthy(rhs)) {
    return str("new ERange(", eval_expr(lhs), ", ", eval_expr(rhs), ", true)");
  } else {
    return str("new ERange(", eval_expr(lhs), ", Infinity, true)");
  }
}
function eval_shorthand_anon_fn({ expr }) {
  return str("(...__args) => ", eval_expr(expr));
}
function eval_anon_arg_id({ arg_num }) {
  return str("__args[", dec.bind(or.call(arg_num, () => 1))(), "]");
}
function eval_decorator({ name: decorator_name, fn_def, args }) {
  let fn_name = pipe.bind(at.bind(fn_def)(Keyword.for("name")))(resolve_name);
  let fn_def_js = eval_fn(fn_def);
  if (truthy(empty__q.bind(args)())) {
    return str("let ", fn_name, " = ", decorator_name, "(", fn_def_js, ");");
  } else {
    return str(
      "let ",
      fn_name,
      " = ",
      decorator_name,
      "(",
      fn_def_js,
      ", ",
      map.bind(args)(eval_expr).join(", "),
      ");"
    );
  }
}
function eval_keyof({ lhs, rhs }) {
  return str(eval_expr(lhs), " in ", eval_expr(rhs));
}
function eval_and_dot({ lhs, rhs }) {
  return str(eval_expr(lhs), "?.", eval_expr(rhs));
}
function eval_partial_fn_call({ expr }) {
  return str("(", eval_expr(expr), ")");
}
function eval_partial_obj_dyn_access({ expr }) {
  return str("[", eval_expr(expr), "]");
}
function eval_regex_lit({ value }) {
  return value;
}
let logic_ops = construct_record.call(Map, [
  ["||", "or"],
  ["&&", "and"],
]);
let all_ops_to_method = concat.bind(math_op_to_method)(logic_ops);
function eval_rhs_based_on_op(op, rhs) {
  if (truthy(has__q.bind(logic_ops)(op))) {
    return str("() => ", eval_expr(rhs));
  } else {
    return eval_expr(rhs);
  }
}
function eval_op_eq({ lhs, op, rhs }) {
  return str(
    eval_expr(lhs),
    " = ",
    call.bind(all_ops_to_method)(op),
    ".call(",
    eval_expr(lhs),
    ", ",
    eval_rhs_based_on_op(op, rhs),
    ")"
  );
}
function eval_prefix_inclusive_range({ expr }) {
  return str("new IRange(-Infinity, ", eval_expr(expr), ")");
}
function eval_expr(node) {
  return call.bind(
    pipe.bind(at.bind(node)(Keyword.for("type")))(
      construct_record.call(Map, [
        [Keyword.for("str"), eval_str],
        [Keyword.for("regex_lit"), eval_regex_lit],
        [Keyword.for("decorator"), eval_decorator],
        [Keyword.for("keyword"), eval_keyword],
        [Keyword.for("and_dot"), eval_and_dot],
        [Keyword.for("prefix_inclusive_range"), eval_prefix_inclusive_range],
        [Keyword.for("partial_fn_call"), eval_partial_fn_call],
        [Keyword.for("partial_obj_dyn_access"), eval_partial_obj_dyn_access],
        [Keyword.for("property_lookup"), eval_property_lookup],
        [Keyword.for("id_lookup"), eval_id_lookup],
        [Keyword.for("fn_call"), eval_fn_call],
        [Keyword.for("num"), eval_num],
        [Keyword.for("big_int"), eval_big_int],
        [Keyword.for("array"), eval_array],
        [Keyword.for("math_op"), eval_math_op],
        [Keyword.for("double_equals"), eval_double_equals],
        [Keyword.for("not_equals"), eval_not_equals],
        [Keyword.for("not"), eval_not],
        [Keyword.for("fn"), eval_fn],
        [Keyword.for("bind"), eval_bind],
        [Keyword.for("anon_arg_id"), eval_anon_arg_id],
        [Keyword.for("set"), eval_set],
        [Keyword.for("obj_lit"), eval_obj_lit],
        [Keyword.for("bind_this"), eval_bind_this],
        [Keyword.for("dynamic_access"), eval_dynamic_access],
        [Keyword.for("new"), eval_new],
        [Keyword.for("triple_equals"), eval_triple_equals],
        [Keyword.for("triple_not_equals"), eval_triple_not_equals],
        [Keyword.for("spread"), eval_spread],
        [Keyword.for("is"), eval_is],
        [Keyword.for("and_and"), eval_and_and],
        [Keyword.for("or_or"), eval_or_or],
        [Keyword.for("snd_assign"), eval_snd_assign],
        [Keyword.for("await"), eval_await],
        [Keyword.for("yield"), eval_yield],
        [Keyword.for("record_syntax"), eval_record_syntax],
        [Keyword.for("vector_syntax"), eval_vector_syntax],
        [Keyword.for("paren_expr"), eval_paren_expr],
        [Keyword.for("unapplied_math_op"), eval_unapplied_math_op],
        [Keyword.for("unapplied_and_and"), eval_unapplied_and_and],
        [Keyword.for("unapplied_or_or"), eval_unapplied_or_or],
        [Keyword.for("shorthand_anon_fn"), eval_shorthand_anon_fn],
        [Keyword.for("inclusive_range"), eval_inclusive_range],
        [Keyword.for("exclusive_range"), eval_exclusive_range],
        [Keyword.for("keyof"), eval_keyof],
        [Keyword.for("op_eq"), eval_op_eq],
      ])
    )
  )(node);
}
function eval_return({ expr }) {
  return str("return ", eval_expr(expr));
}
function eval_protocol({ name }) {
  return str("const ", resolve_name(name), ' = Symbol("', name, '")');
}
function eval_impl_for({ proto_expr, constructor, expr }) {
  return str(
    constructor,
    ".prototype[",
    eval_expr(proto_expr),
    "] = ",
    eval_expr(expr)
  );
}
function eval_impl_object({ constructor, expr }) {
  return str(constructor, ".prototype = ", eval_expr(expr));
}
function eval_define_for({ proto_expr, src_expr, expr }) {
  return str(
    eval_expr(src_expr),
    "[",
    eval_expr(proto_expr),
    "] = ",
    eval_expr(expr)
  );
}
function eval_for_loop({ is_await__q, assign_expr, iterable_expr, body }) {
  return str(
    "for ",
    and.call(is_await__q, () => "await "),
    " (let ",
    eval_assign_expr(assign_expr),
    " of ",
    eval_expr(iterable_expr),
    ") {\n",
    eval_ast(body),
    "\n",
    "}"
  );
}
function eval_id_assign({ name, expr }) {
  return str(resolve_name(name), " = ", eval_expr(expr));
}
function eval_assert({ expr, token, msg }) {
  return str(
    resolve_name("assert!"),
    "(",
    eval_expr(expr),
    ", ",
    at.bind(token)(Keyword.for("line")),
    ", ",
    at.bind(token)(Keyword.for("col")),
    ", ",
    "`",
    eval_expr(expr),
    "`,",
    msg,
    ")"
  );
}
function eval_while_loop({ test_expr, body }) {
  return str(
    "while (",
    eval_expr(test_expr),
    ") {\n",
    eval_ast(body),
    "\n",
    "}"
  );
}
function eval_loop({ body }) {
  return str("while (true) {\n", eval_ast(body), "\n", "}");
}
function eval_continue() {
  return "continue";
}
function eval_break() {
  return "break";
}
function eval_try(node) {
  let body_js = pipe.bind(at.bind(node)(Keyword.for("body")))(eval_ast);
  let catch_js = "";
  let finally_js = "";
  if (truthy(has__q.bind(node)(Keyword.for("catch")))) {
    let { name, body } = at.bind(node)(Keyword.for("catch"));
    catch_js = str(" catch (", name, ") {\n", eval_ast(body), "\n}");
  }
  if (truthy(has__q.bind(node)(Keyword.for("finally")))) {
    let { body } = at.bind(node)(Keyword.for("finally"));
    finally_js = str(" finally {\n", eval_ast(body), "\n}");
  }
  return str("try {\n", body_js, "\n", "}", catch_js, finally_js);
}
function get_deconstructed_obj_entry_name(node) {
  return pipe.bind(
    at.bind(
      construct_record.call(Map, [
        [Keyword.for("obj_reg_entry"), Keyword.for("name")],
        [Keyword.for("obj_entry_rename"), Keyword.for("old_name")],
      ])
    )(at.bind(node)(Keyword.for("type")))
  )(node);
}
function get_deconstructed_array_entry_name(node) {
  return pipe.bind(
    at.bind(
      construct_record.call(Map, [
        [Keyword.for("id_assign"), Keyword.for("name")],
      ])
    )(at.bind(node)(Keyword.for("type")))
  )(node);
}
function eval_import_path(path) {
  if (
    truthy(
      and.call(eq__q.call(len.bind(path.split("."))(), 1), () =>
        and.call(negate.call(path.includes(":")), () =>
          negate.call(path.includes("@"))
        )
      )
    )
  ) {
    return str(path, ".js");
  } else {
    return path;
  }
}
function eval_import({ assign_expr, path }) {
  return str(
    "import ",
    eval_assign_expr(assign_expr),
    ' from "',
    eval_import_path(path.value.slice(1, -1)),
    '"'
  );
}
function eval_export({ statement }) {
  return str("export ", eval_statement(statement));
}
function eval_export_default({ expr }) {
  return str("export default ", eval_expr(expr));
}
function eval_label({ label_name, statement }) {
  return str(label_name, ": ", eval_statement(statement));
}
function eval_statement(node) {
  return call.bind(
    pipe.bind(
      pipe.bind(at.bind(node)(Keyword.for("type")))(
        construct_record.call(Map, [
          [Keyword.for("label"), eval_label],
          [Keyword.for("if"), eval_if],
          [Keyword.for("unless"), eval_unless],
          [Keyword.for("import"), eval_import],
          [Keyword.for("export"), eval_export],
          [Keyword.for("export_default"), eval_export_default],
          [Keyword.for("let"), eval_let],
          [Keyword.for("if_let"), eval_if_let],
          [Keyword.for("return"), eval_return],
          [Keyword.for("protocol_def"), eval_protocol],
          [Keyword.for("impl_for"), eval_impl_for],
          [Keyword.for("impl_object"), eval_impl_object],
          [Keyword.for("define_for"), eval_define_for],
          [Keyword.for("for_loop"), eval_for_loop],
          [Keyword.for("id_assign"), eval_id_assign],
          [Keyword.for("assert"), eval_assert],
          [Keyword.for("while_loop"), eval_while_loop],
          [Keyword.for("loop"), eval_loop],
          [Keyword.for("while_let_loop"), eval_while_let_loop],
          [Keyword.for("continue"), eval_continue],
          [Keyword.for("break"), eval_break],
          [Keyword.for("try"), eval_try],
        ])
      )
    )(function (f) {
      if (truthy(f)) {
        return compose(f, plus.call(_, ";"));
      } else {
        return eval_expr;
      }
    })
  )(node);
}
function eval_ast(ast) {
  return map.bind(ast)(eval_statement).join("\n");
}
function compile(string) {
  return pipe.bind(
    pipe.bind(
      pipe.bind(call.bind(lexer)(string))(function (tokens) {
        return new CollectionView(tokens, 0);
      })
    )(parse)
  )(eval_ast);
}
function compile_file(src_file_name, out_name, prelude_src) {
  let prelude = Deno.readTextFileSync("./src/std/js_prelude.js");
  prelude = plus.call(prelude, compile(Deno.readTextFileSync(prelude_src)));
  let src = Deno.readTextFileSync(src_file_name);
  Deno.writeTextFile(out_name, plus.call(prelude, compile(src)));
}
if (truthy(globalThis.Deno)) {
  let src_file_name = Deno.args[0];
  let out_name = Deno.args[1];
  let prelude_src = "./src/std/prelude.coil";
  if (truthy(eq__q.call(Deno.args[2], "-w"))) {
    let watcher = Deno.watchFs([src_file_name, prelude_src]);
    for await (let event of watcher) {
      if (truthy(negate.call(eq__q.call(event.kind, "modify")))) {
        continue;
      }
      console.log("Rebuilding...");
      try {
        compile_file(src_file_name, out_name, prelude_src);
      } catch (e) {
        console.error("Compile Failed", e);
      }
    }
  } else {
    compile_file(src_file_name, out_name, prelude_src);
  }
}
