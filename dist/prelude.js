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
function HashMap(entries) {
  this.raw_entries = entries;
  this.map = new Map(
    entries.map(function ([key, value]) {
      return [hash.bind(key)(), value];
    })
  );
}
HashMap.prototype[Hash] = function () {
  return hash.bind(this.map)();
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
function inc() {
  return this[Stepable].inc.call(this);
}
function dec() {
  return this[Stepable].dec.call(this);
}
const Record = Symbol("Record");
Map[Record] = function (entries) {
  return new Map(entries);
};
ObjectLiteral[Record] = function (entries) {
  return from_entries.bind(entries)();
};
HashMap[Record] = function (entries) {
  return new HashMap(entries);
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
const Deconstruct = Symbol("Deconstruct");
Map.prototype[Deconstruct] = function () {
  return from_entries.bind(this.entries())();
};
ObjectLiteral.prototype[Deconstruct] = function () {
  return this;
};
HashMap.prototype[Deconstruct] = function () {
  return from_entries.bind(this.raw_entries)();
};
Array.prototype[Deconstruct] = function () {
  return this;
};
function deconstruct() {
  return this[Deconstruct]();
}
function deconstruct_this(f) {
  return function () {
    return f.bind(this)(deconstruct.bind(this)());
  };
}
function deconstruct_args(f) {
  return function (...args) {
    return f.bind(this)(
      ...map.bind(args)((...__args) => deconstruct.bind(__args[0])())
    );
  };
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
  } else {
  }
  function error_msg(key, validator) {
    return str(
      struct_name,
      " validation failed.\n",
      "Failed at ",
      printable.bind(key)(),
      ".\n",
      "Expected [",
      printable.bind(validator)(),
      "]",
      ", got value ",
      printable.bind(this[key])(),
      "."
    );
  }
  for (let [key, validator] of entries.bind(this[Validation])()) {
    if (truthy(call.bind(validator)(this[key]))) {
      continue;
    } else {
      raise__b(new StructValidationError(error_msg(key, validator)));
    }
  }
}
function construct_struct_values() {
  if (truthy(negate.call(Constructors in this))) {
    return null;
  } else {
  }
  for (let [key, f] of entries.bind(this[Constructors])()) {
    this[key] = call.bind(f)(this[key]);
  }
}
function set_struct_defaults() {
  if (truthy(negate.call(Defaults in this))) {
    return null;
  } else {
  }
  for (let [key, fallback] of entries.bind(this[Defaults])()) {
    if (truthy(this[key])) {
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
    validate_struct.call(this, name);
    construct_struct_values.call(this);
    set_struct_defaults.call(this);
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
HashMap.prototype[Call] = function (key) {
  return at.bind(this)(key);
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
  } else {
    if (truthy(Call in collection)) {
      return call.bind(collection)(this);
    } else {
      return collection[this];
    }
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
function pipe(callable) {
  return this?.[Pipe](callable);
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
  } else {
  }
  return all__q.bind(zip.bind(this)(other))(function ([a, b]) {
    return eq__q.call(a, b);
  });
}
function record_eq__q(other) {
  if (truthy(negate.call(record__q.bind(other)()))) {
    return false;
  } else {
  }
  if (truthy(negate.call(eq__q.call(len.bind(this)(), len.bind(other)())))) {
    return false;
  } else {
  }
  return all__q.bind(this)(function (key, value) {
    return eq__q.call(at.bind(other)(key), value);
  });
}
Set.prototype[Equal] = vector_eq__q;
Array.prototype[Equal] = vector_eq__q;
Map.prototype[Equal] = record_eq__q;
ObjectLiteral.prototype[Equal] = record_eq__q;
HashMap.prototype[Equal] = record_eq__q;
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
HashMap.prototype[Clone] = new ObjectLiteral({
  clone() {
    return new HashMap(this.raw_entries.slice());
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
Array.prototype[Identity] = [];
ObjectLiteral.prototype[Identity] = new ObjectLiteral({});
Map.prototype[Identity] = construct_record.call(Map, []);
HashMap.prototype[Identity] = construct_record.call(HashMap, []);
Set.prototype[Identity] = new Set([]);
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
          return entries.bind(f(k, v))();
        })
        .flat()
    )();
  },
  filter(f) {
    return from_entries.bind(
      entries
        .bind(this)()
        .filter(function ([k, v]) {
          return pipe.bind(f(k, v))(truthy);
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
      reuslt = f(result, k, v);
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
HashMap.prototype[Symbol.iterator] = function* () {
  for (let [key, value] of raw_entries.bind(this)) {
    yield [key, value];
  }
};
HashMap.prototype[Collection] = new ObjectLiteral({
  at(key) {
    return this.map.get(hash.bind(key)());
  },
  keys() {
    return as_set.bind(map.bind(this.raw_entries)(first))();
  },
  sample() {
    return this.raw_entries[0];
  },
  each(f) {
    for (let [k, v] of this.raw_entries) {
      f(k, v);
    }
  },
  map(f) {
    let new_hash = new HashMap([]);
    for (let [k, v] of this.raw_entries) {
      new_hash = insert.bind(new_hash)(...f(k, v));
    }
    return new_hash;
  },
  find(f) {
    for (let [k, v] of this.raw_entries) {
      if (truthy(f(k, v))) {
        return v;
      } else {
      }
    }
  },
  flat_map(f) {
    let new_hash = new HashMap([]);
    for (let [k, v] of this) {
      for (let [_k, _v] of f(k, v)) {
        new_hash = insert.bind(new_hash)(k, f(v));
      }
    }
    return new_hash;
  },
  filter(f) {
    let new_hash = new HashMap([]);
    for (let [k, v] of this.raw_entries) {
      if (truthy(f(k, v))) {
        new_hash = insert.bind(new_hash)(k, f(v));
      } else {
      }
    }
    return new_hash;
  },
  any__q(f) {
    for (let [k, v] of this.raw_entries) {
      if (truthy(f(k, v))) {
        return true;
      } else {
      }
    }
    return false;
  },
  all__q(f) {
    for (let [k, v] of this.raw_entries) {
      if (truthy(negate.call(f(k, v)))) {
        return false;
      } else {
      }
    }
    return true;
  },
  reduce(f, start) {
    let acc = start;
    for (let [k, v] of this.raw_entries) {
      acc = f(acc, k, v);
    }
    return acc;
  },
  insert(k, v) {
    return new HashMap([...this.raw_entries, [k, v]]);
  },
  concat(other) {
    let new_hash = clone.bind(this)();
    for (let [k, v] of other) {
      new_hash = insert.bind(new_hash)(k, v);
    }
    return new_hash;
  },
  update(key, update_fn) {
    return insert.bind(this)(key, call.bind(update_fn)(at.bind(this)(key)));
  },
  empty__q() {
    return eq__q.call(this.raw_entries.length, 0);
  },
  has__q(key) {
    return as_bool.bind(at.bind(this)(key))();
  },
  len() {
    return this.raw_entries.length;
  },
  remove(key) {
    return filter.bind(this)(function (k, v) {
      return negate.call(eq__q.call(k, key));
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
      } else {
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
      } else {
      }
    }
    return new_map;
  },
  any__q(f) {
    for (let [k, v] of this) {
      if (truthy(f(k, v))) {
        return true;
      } else {
      }
    }
    return false;
  },
  all__q(f) {
    for (let [k, v] of this) {
      if (truthy(negate.call(f(k, v)))) {
        return false;
      } else {
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
    } else {
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
      } else {
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
      } else {
      }
    }
    return out;
  },
  any__q(f) {
    for (let elem of this) {
      if (truthy(f(elem))) {
        return true;
      } else {
      }
    }
    return false;
  },
  all__q(f) {
    for (let elem of this) {
      if (truthy(negate.call(f(elem)))) {
        return false;
      } else {
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
      } else {
      }
    }
  },
  filter(f) {
    let out = "";
    for (let char of this) {
      if (truthy(f(char))) {
        out = plus.call(out, char);
      } else {
      }
    }
  },
  any__q(f) {
    for (let char of this) {
      if (truthy(f(char))) {
        return true;
      } else {
      }
    }
    return false;
  },
  all__q(f) {
    for (let char of this) {
      if (truthy(negate.call(f(char)))) {
        return false;
      } else {
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
  has__q(substr) {
    return this.includes(substr);
  },
  len() {
    return this.length;
  },
  remove(substr) {
    let idx = this.indexOf(substr);
    return plus.call(
      this.slice(0, idx),
      this.slice(plus.call(idx, len.bind(substr)()))
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
  assert__b(any__q.bind(this)(...fns), 734, 11, `(any__q.bind(this))(...fns)`);
  return true;
}
function all__q(...fns) {
  return this[Collection].all__q.call(this, compose(...fns));
}
function all__b(...fns) {
  assert__b(all__q.bind(this)(...fns), 739, 11, `(all__q.bind(this))(...fns)`);
  return true;
}
function reduce(f, start) {
  if (truthy(nil__q.bind(start)())) {
    start = identity.bind(sample.bind(this)())();
  } else {
  }
  return this[Collection].reduce.call(this, call.bind(f), start);
}
function insert(...args) {
  return this[Collection].insert.call(this, ...args);
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
  return this[Collection].empty__q.call(this);
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
  } else {
    if (truthy(is_a__q.bind(this)(Vector))) {
      for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
        call.bind(f)(elem, i);
      }
    } else {
      raise__b(new TypeError("Expected a Record or Vector"));
    }
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
      } else {
      }
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(elem, i))) {
        return elem;
      } else {
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
      } else {
      }
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(elem, i))) {
        coll = insert.bind(coll)(elem);
      } else {
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
      } else {
      }
    }
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(call.bind(f)(elem, i))) {
        return true;
      } else {
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
      } else {
      }
    }
    return true;
  } else {
    for (let [elem, i] of zip.bind(this)(new Range(0, Infinity))) {
      if (truthy(negate.call(call.bind(f)(elem, i)))) {
        return false;
      } else {
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
Number.prototype[Plus] = function (other) {
  assert__b(typeof other === "number", 973, 11, `typeof(other) === "number"`);
  return js_plus(this, other);
};
Number.prototype[Minus] = function (other) {
  assert__b(typeof other === "number", 978, 11, `typeof(other) === "number"`);
  return js_minus(this, other);
};
Number.prototype[Times] = function (other) {
  assert__b(typeof other === "number", 983, 11, `typeof(other) === "number"`);
  return js_times(this, other);
};
Number.prototype[Divide] = function (other) {
  assert__b(typeof other === "number", 988, 11, `typeof(other) === "number"`);
  return js_divide(this, other);
};
Number.prototype[Exponent] = function (other) {
  assert__b(typeof other === "number", 993, 11, `typeof(other) === "number"`);
  return js_exponent(this, other);
};
Number.prototype[Mod] = function (other) {
  assert__b(typeof other === "number", 998, 11, `typeof(other) === "number"`);
  return js_mod(this, other);
};
BigInt.prototype[Plus] = function (other) {
  assert__b(typeof other === "bigint", 1003, 11, `typeof(other) === "bigint"`);
  return js_plus(this, other);
};
BigInt.prototype[Minus] = function (other) {
  assert__b(typeof other === "bigint", 1008, 11, `typeof(other) === "bigint"`);
  return js_minus(this, other);
};
BigInt.prototype[Times] = function (other) {
  assert__b(typeof other === "bigint", 1013, 11, `typeof(other) === "bigint"`);
  return js_times(this, other);
};
BigInt.prototype[Divide] = function (other) {
  assert__b(typeof other === "bigint", 1018, 11, `typeof(other) === "bigint"`);
  return js_divide(this, other);
};
BigInt.prototype[Exponent] = function (other) {
  assert__b(typeof other === "bigint", 1023, 11, `typeof(other) === "bigint"`);
  return js_exponent(this, other);
};
BigInt.prototype[Mod] = function (other) {
  assert__b(typeof other === "bigint", 1028, 11, `typeof(other) === "bigint"`);
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
    assert__b(
      typeof other === "number",
      1040,
      13,
      `typeof(other) === "number"`
    );
    return js_greater_than(this, other);
  },
  less_than(other) {
    assert__b(
      typeof other === "number",
      1044,
      13,
      `typeof(other) === "number"`
    );
    return js_less_than(this, other);
  },
});
BigInt.prototype[Comparable] = new ObjectLiteral({
  ...ComparableMixin,
  greater_than(other) {
    assert__b(
      typeof other === "bigint",
      1052,
      13,
      `typeof(other) === "bigint"`
    );
    return js_greater_than(this, other);
  },
  less_than(other) {
    assert__b(
      typeof other === "bigint",
      1056,
      13,
      `typeof(other) === "bigint"`
    );
    return js_less_than(this, other);
  },
});
String.prototype[Plus] = function (other) {
  assert__b(typeof other === "string", 1062, 11, `typeof(other) === "string"`);
  return js_plus(this, other);
};
String.prototype[Times] = function (amount) {
  assert__b(
    typeof amount === "number",
    1067,
    11,
    `typeof(amount) === "number"`
  );
  return this.repeat(amount);
};
String.prototype[Comparable] = new ObjectLiteral({
  ...ComparableMixin,
  greater_than(other) {
    assert__b(
      typeof other === "string",
      1074,
      13,
      `typeof(other) === "string"`
    );
    return js_greater_than(this, other);
  },
  less_than(other) {
    assert__b(
      typeof other === "string",
      1078,
      13,
      `typeof(other) === "string"`
    );
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
HashMap.prototype[Printable] = function () {
  return pipe.bind(
    map.bind(this)(function (k, v) {
      return [printable.bind(k)(), printable.bind(v)()];
    }).raw_entries
  )((...__args) => new Map(__args[0]));
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
    } else {
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
function when(cond, f) {
  if (truthy(cond(this))) {
    return f(this);
  } else {
    return this;
  }
}
function otherwise(val) {
  return or.call(this, () => val);
}
let printable = impl_callable(function printable() {
  if (truthy(nil__q.bind(this)())) {
    return this;
  } else {
    return otherwise.bind(
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
      )()
    )(this);
  }
});
let log = impl_callable(function log(...args) {
  console.log(...args, printable.bind(this)());
  return this;
});
let inspect = impl_callable(function inspect(...args) {
  console.log(...args, this);
  return this;
});
function str(...args) {
  return args.join("");
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
let pos__q = impl_callable(function pos__q() {
  return greater_than_eq.call(this, identity.bind(this)());
});
let nan__q = impl_callable(function nan__q() {
  return Number.isNaN(this);
});
let str__q = impl_callable(function str__q() {
  return eq__q.call(typeof this, "string");
});
let exists__q = impl_callable(function exists__q() {
  return as_bool.bind(or.call(this, () => eq__q.call(this, false)))();
});
let finite__q = impl_callable(function finite__q() {
  return or.call(bigint__q.bind(this)(), () => Number.isFinite(this));
});
let inf__q = impl_callable(function inf__q() {
  return negate.call(finite__q.bind(this)());
});
let to_lowercase = impl_callable(function to_lowercase() {
  return this.toLowerCase();
});
let as_set = impl_callable(function as_set() {
  return new Set(this);
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
let as_float = impl_callable(function as_float() {
  return Number(this);
});
let as_int = impl_callable(function as_int() {
  return pipe.bind(as_float.bind(this)())(Math.floor);
});
let as_str = impl_callable(function as_str() {
  return this.toString();
});
let as_bool = impl_callable(function as_bool() {
  return truthy(this);
});
let error__q = impl_callable(function error__q() {
  return this instanceof Error;
});
let is_a__q = impl_callable(function is_a__q(KlassOrProtocol) {
  if (truthy(eq__q.call(typeof KlassOrProtocol, "symbol"))) {
    return as_bool.bind(this.constructor[KlassOrProtocol])();
  } else {
    if (truthy(eq__q.call(typeof KlassOrProtocol, "function"))) {
      return this instanceof KlassOrProtocol;
    } else {
      return false;
    }
  }
});
Set.prototype[Negate] = function () {
  return (...__args) => negate.call(this.has(__args[0]));
};
function pre(...args) {
  let cond_fns = args.slice(0, -1);
  let f = args.at(-1);
  return function (...args) {
    assert__b(
      all__q.bind(cond_fns)(function (f) {
        return call.bind(f)(...args);
      }),
      1293,
      13,
      `(all__q.bind(cond_fns))(function (f) {
return (call.bind(f))(...args);})`
    );
    return f(...args);
  };
}
let Args = construct_vector.call(Struct, ["Args", Keyword.for("schemas")]);
Args[Vector] = function (schemas) {
  return new Args(schemas);
};
Args.prototype[Call] = function (...args) {
  return all_with_index__q.bind(this.schemas)(function (schema, i) {
    return call.bind(schema)(args[i]);
  });
};
Args.prototype[Negate] = function () {
  return function (...args) {
    return negate.call(call.bind(this)(...args));
  }.bind(this);
};
let Schema = construct_vector.call(Struct, ["Schema", Keyword.for("entries")]);
Schema.prototype[Constructors] = new ObjectLiteral({ entries: as_map });
Schema[Record] = function (entries) {
  return new Schema(entries);
};
Schema.prototype[Call] = function (record) {
  return and.call(record__q.bind(record)(), () =>
    all__q.bind(this.entries)(function (k, schema) {
      return call.bind(schema)(at.bind(record)(k));
    })
  );
};
Schema.prototype[Negate] = function () {
  return function (record) {
    return negate.call(call.bind(this)(record));
  }.bind(this);
};
Schema.prototype[And] = function (thunk) {
  return new Schema([...this.entries.entries(), ...thunk().entries.entries()]);
};
Schema.prototype[Or] = function (thunk) {
  return function (record) {
    return as_bool.bind(
      or.call(call.bind(this)(record), () => call.bind(thunk())(record))
    )();
  }.bind(this);
};
let Underscore = construct_vector.call(Struct, [
  "Underscore",
  Keyword.for("transforms"),
]);
function id() {
  return this;
}
const UnderscoreInterpreter = Symbol("UnderscoreInterpreter");
let _ = new Underscore([new ObjectLiteral({ f: id, args: [] })]);
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
    } else {
    }
  }
  return result;
};
Underscore.prototype[Call] = function (data, ...args) {
  return data?.[UnderscoreInterpreter](this, ...args);
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
Underscore.prototype[Or] = function (other) {
  return this.insert(or, other);
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
        } else {
        }
        if (truthy(eq__q.call(f, or))) {
          let [thunk] = args;
          return str(" || ", printable.bind(thunk())());
        } else {
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
    result = otherwise.bind(
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
      )(...args)
    )(result);
  }
  return result;
};
Range.prototype[Symbol.iterator] = function* () {
  let i = this.start;
  let end = this.end;
  if (truthy(this.exclusive__q)) {
    end = dec.bind(end)();
  } else {
  }
  while (less_than_eq.call(i, end)) {
    let result = call.bind(this.transform)(this, i);
    if (truthy(negate.call(eq__q.call(result, Keyword.for("filtered"))))) {
      yield result;
    } else {
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
  } else {
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
      } else {
      }
      output.push(item);
    }
    return output;
  },
});
let All = construct_vector.call(Struct, ["All", Keyword.for("conds")]);
All[Vector] = function (conds) {
  return new All(conds);
};
All.prototype[Call] = function (val) {
  return all__q.bind(this.conds)(function (f) {
    return call.bind(f)(val);
  });
};
let Any = construct_vector.call(Struct, ["Any", Keyword.for("conds")]);
Any[Vector] = function (conds) {
  return new Any(conds);
};
Any.prototype[Call] = function (val) {
  return any__q.bind(this.conds)(function (f) {
    return call.bind(f)(val);
  });
};
const Effect = Symbol("Effect");
function run_effect() {
  if (truthy(this[Effect])) {
    return this[Effect]();
  } else {
    console.log("No effect found for", this);
    raise__b(this);
  }
}
async function spawn(generator_fn, ...gen_args) {
  let generator = generator_fn(...gen_args);
  let state = new ObjectLiteral({ done: false });
  let yield_result = null;
  let effects = [];
  while (negate.call(state.done)) {
    state = await generator.next(yield_result);
    if (truthy(state.done)) {
      break;
    } else {
    }
    let effect = state.value;
    try {
      yield_result = await run_effect.bind(effect)();
    } catch (error) {
      state = await generator.throw(error);
      yield_result = await run_effect.bind(state.value)();
      effects.push(state.value);
    }
    effects.push(effect);
  }
  return new ObjectLiteral({ effects, value: state.value });
}
async function run(generator_fn) {
  return at.bind(await spawn(generator_fn))(Keyword.for("value"));
}
let Channel = construct_vector.call(Struct, ["Channel"]);
Channel.prototype[Keyword.for("send")] = function (msg) {
  this.resolve(msg);
};
Channel.prototype[Keyword.for("subscribe")] = function (f) {
  this.resolve = f;
};
Channel.prototype[Symbol.asyncIterator] = async function* () {
  while (true) {
    yield new Promise(
      function (resolve) {
        return (this.resolve = resolve);
      }.bind(this)
    );
  }
};
function fork(generator_fn) {
  let chan = new Channel();
  spawn(generator_fn, chan);
  return chan;
}
function CallEffectWith(effect, ...args) {
  this.effect = effect;
  this.args = args;
}
function __coil_with(...args) {
  return new CallEffectWith(this, ...args);
}
CallEffectWith.prototype[Effect] = function () {
  return this.effect[Effect](...this.args);
};
function intern_vec(klass) {
  if (truthy(negate.call(klass.cache))) {
    klass.cache = construct_record.call(Map, []);
    klass[Vector] = function (args) {
      let hash_value = hash.bind(args)();
      let __coil_if_let_temp = klass.cache.get(hash_value);
      if (truthy(__coil_if_let_temp)) {
        let obj = __coil_if_let_temp;
        return obj;
      } else {
        let obj = new klass(...args);
        klass.cache.set(hash_value, obj);
        return obj;
      }
    };
  } else {
  }
  return klass;
}
let Fetch = intern_vec(function Fetch(method, url, status) {
  this.method = method;
  this.url = url;
  this.status = status;
});
let Msg = intern_vec(function Msg(...descriptors) {
  this.descriptors = descriptors;
});
Msg.prototype[Equal] = function (obj) {
  return and.call(obj instanceof Msg, () =>
    eq__q.call(this.descriptors, obj.descriptors)
  );
};
function HttpError(code, message) {
  this.name = "HttpError";
  this.message = message;
  this.stack = new Error().stack;
  this.code = as_keyword.bind(code)();
}
HttpError.prototype = new Error();
let JSONRequest = construct_vector.call(Struct, [
  "JSONRequest",
  Keyword.for("url"),
]);
JSONRequest.prototype[Effect] = function () {
  return fetch(this.url).then(async function (res) {
    if (truthy(negate.call(res.ok))) {
      let text = await res.text();
      return Promise.reject(new HttpError(res.status, text));
    } else {
    }
    return res.json();
  });
};
function json_req(url) {
  return new JSONRequest(url);
}
let http = new ObjectLiteral({
  async *get(url) {
    if (
      truthy(
        Effect in
          construct_vector.call(Fetch, [
            Keyword.for("get"),
            url,
            Keyword.for("init"),
          ])
      )
    ) {
      yield construct_vector.call(Fetch, [
        Keyword.for("get"),
        url,
        Keyword.for("init"),
      ]);
    } else {
    }
    if (
      truthy(
        Effect in
          construct_vector.call(Fetch, [
            Keyword.for("get"),
            url,
            Keyword.for("loading"),
          ])
      )
    ) {
      yield construct_vector.call(Fetch, [
        Keyword.for("get"),
        url,
        Keyword.for("loading"),
      ]);
    } else {
    }
    try {
      return yield json_req(url);
    } catch (error) {
      if (
        truthy(
          Effect in
            construct_vector.call(Fetch, [Keyword.for("get"), url, error.code])
        )
      ) {
        yield __coil_with.bind(
          construct_vector.call(Fetch, [Keyword.for("get"), url, error.code])
        )(error);
      } else {
        yield __coil_with.bind(
          construct_vector.call(Fetch, [
            Keyword.for("get"),
            url,
            Keyword.for("error"),
          ])
        )(error);
      }
      return error;
    }
  },
});
let Comp = construct_vector.call(Struct, ["Comp"]);
Comp[Vector] = function ([map_fn, _for, collection, ...rest]) {
  assert__b(
    eq__q.call(_for, Keyword.for("for")),
    1726,
    11,
    `eq__q.call(_for, Keyword.for("for"))`
  );
  assert__b(Call in map_fn, 1727, 11, `Call in map_fn`);
  let result = collection;
  if (truthy(eq__q.call(first.bind(rest)(), Keyword.for("where")))) {
    let [_if, filter_fn, ..._rest] = rest;
    rest = _rest;
    assert__b(Call in filter_fn, 1733, 13, `Call in filter_fn`);
    result = filter.bind(result)(filter_fn);
  } else {
  }
  result = map.bind(result)(map_fn);
  if (truthy(eq__q.call(first.bind(rest)(), Keyword.for("verify")))) {
    let [_verify, verify_fn, ..._rest] = rest;
    assert__b(
      all__q.bind(result)(verify_fn),
      1741,
      13,
      `(all__q.bind(result))(verify_fn)`
    );
  } else {
  }
  return result;
};
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
    } else {
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
function DefVector() {}
DefVector[Vector] = function (properties) {
  let Constructor = null;
  if (truthy(eq__q.call(first.bind(properties)(), _))) {
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
  return Constructor;
};
let Atom = construct_vector.call(Struct, ["Atom", Keyword.for("value")]);
Atom.prototype = new ObjectLiteral({
  set(new_value) {
    this.value = new_value;
  },
});
const Dereference = Symbol("Dereference");
Atom.prototype[Dereference] = function () {
  return this.value;
};
let Deref = construct_vector.call(Struct, ["Deref"]);
let $ = new Deref();
$[Keyword.for("bind")] = function (other) {
  return other[Dereference]();
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
    } else {
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
  } else {
  }
  if (truthy(Call in this)) {
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
    } else {
    }
  }
};
let EventStream = construct_vector.call(Struct, [
  "EventStream",
  Keyword.for("event_type"),
  Keyword.for("filter"),
]);
EventStream.prototype[Validation] = new ObjectLiteral({
  event_type: (...__args) =>
    has__q.bind(window)(plus.call("on", as_str.bind(__args[0])())),
});
EventStream.prototype = new ObjectLiteral({
  start() {
    this.watch = function (e) {
      if (truthy(call.bind(this.filter)(e))) {
        call.bind(this.resolve)(e);
      } else {
      }
    }.bind(this);
    window.addEventListener(this.event_type, this.watch);
  },
  end() {
    return window.removeEventListener(this.event_type, this.watch);
  },
  subscribe(f) {
    if (truthy(negate.call(this.watch))) {
      this.start();
    } else {
    }
    this.resolve = f;
  },
});
EventStream.prototype[Symbol.asyncIterator] = async function* () {
  while (true) {
    yield await new Promise(
      function (resolve) {
        return this.subscribe(resolve);
      }.bind(this)
    );
  }
};
let AnimationFrames = new ObjectLiteral({});
AnimationFrames[Symbol.asyncIterator] = async function* () {
  while (true) {
    yield await new Promise(function (resolve) {
      return requestAnimationFrame(resolve);
    });
  }
};
function Race() {}
Race[Vector] = async function* (items) {
  all__b.bind(items)(Keyword.for("subscribe"));
  while (true) {
    let promises = map.bind(items)(function (stream) {
      return new Promise(function (resolve) {
        return stream.subscribe(resolve);
      });
    });
    yield await Promise.race(promises);
  }
};
construct_vector.call(Msg, [Keyword.for("keydown")])[Effect] = function (
  filter
) {
  return new EventStream(
    "keydown",
    pipe.bind(at.bind(_)(Keyword.for("key")))(filter)
  );
};
construct_vector.call(Msg, [Keyword.for("mousedown")])[Effect] = function () {
  return new EventStream("mousedown", _);
};
construct_vector.call(Msg, [Keyword.for("mousemove")])[Effect] = function () {
  return new EventStream("mousemove", _);
};
