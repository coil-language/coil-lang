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

globalThis["Keyword"] = Keyword;
globalThis["ObjectLiteral"] = ObjectLiteral;
globalThis["truthy"] = truthy;
const Doc = Symbol("Doc");
function doc(f, doc_str) {
  f[Doc] = doc_str.trim();
  return f;
}
function log_doc() {
  console.log(this[Doc]);
  return this;
}
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
        plus.call("Can't 'call' a string with ", as_str.bind(collection)())
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
let call = doc(
  function call(...args) {
    return this?.[Call](...args);
  },
  `
Invokes [[Call]] on 'this'


Usage:
- On Object Literals
  {a: 10}::call(:a) // 10
`
);
Set.prototype[Keyword.for("bind")] = function (val) {
  return function () {
    return call.bind(this)(val);
  }.bind(this);
};
let nil__q = Object.freeze(new Set([undefined, null]));
const Pipe = Symbol("Pipe");
Object.prototype[Pipe] = function (callable) {
  return call.bind(callable)(this);
};
let pipe = doc(
  function pipe(...callables) {
    let f = compose(...callables);
    if (truthy(nil__q.bind(this)())) {
      return f(this);
    } else {
      return this[Pipe](f);
    }
  },
  `
invokes [[Pipe]] protocol

args:
  ...callables: list of [[Call]] objects

returns:
  result of invoking 'callables' on this

nil handling:
  since nil doesn't impl Pipe, we'll call 'f' directly.

note on [[Pipe]]:
  pipe is protocol based so that it can be used with Underscore.
`
);
let compose = doc(
  function compose(first_fn, ...fns) {
    return function (...args) {
      return reduce.bind(fns)(function (result, f) {
        return call.bind(f)(result);
      }, call.bind(first_fn)(...args));
    };
  },
  `
composes a list of [[Call]] objects into a single function

example:
  compose(:users 0 :id)({users: [{id: 123}]}) // -> 123 
`
);
let def_call = doc(
  function def_call(f) {
    f[Call] = function (first, ...rest) {
      return f.bind(first)(...rest);
    };
    return f;
  },
  `
decorator to define [[Call]]

takes f, and applies first argument as the 'this' arg.

this is helpful when you are writing functions that rely on 'this'
and don't have any arguments.

example:
  fn first() = this[0]

  // I want this to work.. but it doesn't
  [[1] [2] [3]]::map(first) // Error

  // if I use @def_call we can do this
  @def_call
  fn first() = this[0]

  [[1] [2] [3]]::map(first) // [1 2 3]  
`
);
let iter = def_call(function iter() {
  if (truthy(nil__q.bind(this)())) {
    return [][Symbol.iterator]();
  } else {
    return this[Symbol.iterator]();
  }
});
let iter__q = def_call(function iter__q() {
  return and.call(this?.[Symbol.iterator], () => iter.bind(this)() === this);
});
const Iterator = Symbol("Iterator");
let default_iterator_impl = new ObjectLiteral({
  *take(n) {
    for (let [elem, i] of zip.bind(this)(new ERangeNoMax(0))) {
      if (truthy(equals__q.call(i, n))) {
        break;
      }
      yield elem;
    }
  },
  *drop(n) {
    let size = len.bind(this)();
    for (let [elem, i] of zip.bind(this)(new ERangeNoMax(0))) {
      if (truthy(greater_than.call(minus.call(size, i), n))) {
        break;
      }
      yield elem;
    }
  },
  *until(f) {
    for (let elem of this) {
      if (truthy(f(elem))) {
        break;
      }
      yield elem;
    }
  },
  *skip(n) {
    for (let [elem, i] of zip.bind(this)(new ERangeNoMax(0))) {
      if (truthy(less_than.call(i, n))) {
        continue;
      }
      yield elem;
    }
  },
  find(f) {
    for (let elem of this) {
      if (truthy(f(elem))) {
        return elem;
      }
    }
  },
  *zip(...collections) {
    let generators = into.bind(map.bind([this, ...collections])(iter))([]);
    while (true) {
      let gen_states = into.bind(
        map.bind(generators)((...__args) => __args[0].next())
      )([]);
      if (truthy(any__q.bind(gen_states)(Keyword.for("done")))) {
        break;
      }
      yield into.bind(map.bind(gen_states)(Keyword.for("value")))([]);
    }
  },
  reduce(f, start) {
    let acc = start;
    for (let elem of this) {
      acc = f(acc, elem);
    }
    return acc;
  },
  *map(f) {
    for (let elem of this) {
      yield f(elem);
    }
  },
  *flat_map(f) {
    for (let elem of this) {
      yield* f(elem);
    }
  },
  each(f) {
    for (let elem of this) {
      f(elem);
    }
  },
  *keep(f) {
    for (let elem of this) {
      if (truthy(f(elem))) {
        yield elem;
      }
    }
  },
  all__q(f) {
    for (let elem of this) {
      if (truthy(negate.call(f(elem)))) {
        return false;
      }
    }
    return true;
  },
  any__q(f) {
    for (let elem of this) {
      if (truthy(f(elem))) {
        return true;
      }
    }
    return false;
  },
  *split(f) {
    let chunk = [];
    for (let elem of this) {
      if (truthy(f(elem))) {
        yield chunk;
        chunk = [];
      } else {
        chunk = push.bind(chunk)(elem);
      }
    }
    yield chunk;
  },
  *compact() {
    for (let elem of this) {
      if (truthy(nil__q.bind(elem)())) {
        continue;
      }
      yield elem;
    }
  },
});
function iterator_impl() {
  return or.call(this[Iterator], () => default_iterator_impl);
}
function skip(n) {
  return iterator_impl.bind(this)().skip.call(this, n);
}
function take(n) {
  return iterator_impl.bind(this)().take.call(this, n);
}
function drop(n) {
  return iterator_impl.bind(this)().drop.call(this, n);
}
function each(f) {
  return iterator_impl.bind(this)().each.call(this, call.bind(f));
}
function until(...fns) {
  return iterator_impl
    .bind(this)()
    .until.call(this, compose(...fns));
}
function zip(...iterables) {
  return iterator_impl
    .bind(this)()
    .zip.call(this, ...iterables);
}
function map(...fns) {
  return iterator_impl
    .bind(this)()
    .map.call(this, compose(...fns));
}
function flat_map(...fns) {
  return iterator_impl
    .bind(this)()
    .flat_map.call(this, compose(...fns));
}
function find(...fns) {
  return iterator_impl
    .bind(this)()
    .find.call(this, compose(...fns));
}
function keep(...fns) {
  return iterator_impl
    .bind(this)()
    .keep.call(this, compose(...fns));
}
function reject(...fns) {
  return keep.bind(this)(...fns, negate.call(_));
}
function any__q(...fns) {
  return iterator_impl
    .bind(this)()
    .any__q.call(this, compose(...fns));
}
function all__q(...fns) {
  return iterator_impl
    .bind(this)()
    .all__q.call(this, compose(...fns));
}
function reduce(f, start) {
  return iterator_impl.bind(this)().reduce.call(this, call.bind(f), start);
}
function split(...fns) {
  return iterator_impl
    .bind(this)()
    .split.call(this, compose(...fns));
}
function compact() {
  return iterator_impl.bind(this)().compact.call(this);
}
function join(sep) {
  return reduce.bind(this)(function (prev, cur) {
    if (truthy(empty__q.bind(prev)())) {
      return cur;
    } else {
      return plus.call(prev, plus.call(sep, cur));
    }
  }, "");
}
const Into = Symbol("Into");
Array.prototype[Into] = function (iterable) {
  return [...this, ...iterable];
};
ObjectLiteral.prototype[Into] = function (iterable) {
  return merge.bind(this)(iterable);
};
Map.prototype[Into] = function (iterable) {
  return merge.bind(this)(iterable);
};
Set.prototype[Into] = function (iterable) {
  return concat.bind(this)(iterable);
};
String.prototype[Into] = function (iterable) {
  return plus.call(this, reduce.bind(iterable)(plus, ""));
};
Object[Into] = function (iterable) {
  return Object.fromEntries(iterable);
};
function into(val) {
  return val[Into](this);
}
const Collection = Symbol("Collection");
ObjectLiteral.prototype[Collection] = new ObjectLiteral({
  at(key) {
    return this[key];
  },
  len() {
    return Object.keys(this).length;
  },
  empty__q() {
    return this.length === 0;
  },
  has__q(key) {
    return key in this;
  },
});
Array.prototype[Collection] = new ObjectLiteral({
  at(idx) {
    return this.at(idx);
  },
  len() {
    return this.length;
  },
  empty__q() {
    return this.length === 0;
  },
  has__q(val) {
    return any__q.bind(this)(equals__q.call(_, val));
  },
});
Map.prototype[Collection] = new ObjectLiteral({
  at(key) {
    return this.get(key);
  },
  len() {
    return this.size;
  },
  empty__q() {
    return this.size === 0;
  },
  has__q(key) {
    return this.has(key);
  },
});
String.prototype[Collection] = new ObjectLiteral({
  at(idx) {
    return this.at(idx);
  },
  len() {
    return this.length;
  },
  empty__q() {
    return this.length === 0;
  },
  has__q(substr) {
    return this.includes(substr);
  },
});
Set.prototype[Collection] = new ObjectLiteral({
  at(val) {
    return and.call(this.has(val), () => val);
  },
  len() {
    return this.size;
  },
  empty__q() {
    return this.size === 0;
  },
  has__q(val) {
    return this.has(val);
  },
});
let len = def_call(function len() {
  return this[Collection].len.call(this);
});
function at(key_or_idx) {
  return this[Collection].at.call(this, key_or_idx);
}
let empty__q = def_call(function empty__q() {
  if (truthy(nil__q.bind(this)())) {
    return true;
  } else {
    return this[Collection].empty__q.call(this);
  }
});
let not_empty__q = def_call(function not_empty__q() {
  return negate.call(empty__q.bind(this)());
});
function has__q(val) {
  return this[Collection].has__q.call(this, val);
}
const Record = Symbol("Record");
ObjectLiteral.prototype[Record] = new ObjectLiteral({
  insert(key, value) {
    return new ObjectLiteral({ ...this, [key]: value });
  },
  merge(other) {
    return ObjectLiteral.from_entries([...this, ...other]);
  },
  keys() {
    return Object.keys(this);
  },
  values() {
    return Object.values(this);
  },
});
Map.prototype[Record] = new ObjectLiteral({
  insert(key, value) {
    return new Map([...this, [key, value]]);
  },
  merge(other) {
    return new Map([...this, ...other]);
  },
  keys() {
    return this.keys();
  },
  values() {
    return this.values();
  },
});
function insert(key, value) {
  return this[Record].insert.call(this, key, value);
}
function merge(other) {
  return this[Record].merge.call(this, other);
}
let keys = def_call(function keys() {
  return this[Record].keys.call(this);
});
let values = def_call(function values() {
  return this[Record].values.call(this);
});
Map[Record] = function (entries) {
  return new Map(entries);
};
function record__q() {
  return exists__q.bind(this[Record])();
}
function construct_record(entries) {
  return this[Record](entries);
}
const Vector = Symbol("Vector");
function vector__q() {
  return exists__q.bind(this[Vector])();
}
Array.prototype[Vector] = new ObjectLiteral({
  push(val) {
    return [...this, val];
  },
  replace(old_val, new_val) {
    return map.bind(this)(function (val) {
      if (truthy(equals__q.call(val, old_val))) {
        return new_val;
      } else {
        return val;
      }
    });
  },
  concat(other) {
    return [...this, ...other];
  },
});
Set.prototype[Vector] = new ObjectLiteral({
  push(value) {
    return new Set(this).add(value);
  },
  replace(old_val, new_val) {
    let self = new Set(this);
    self.delete(old_value);
    self.add(new_val);
    return self;
  },
  concat(other) {
    return new Set([...this, ...other]);
  },
});
String.prototype[Vector] = new ObjectLiteral({
  push(val) {
    return plus.call(this, val);
  },
  replace(old_substr, new_substr) {
    return this.replaceAll(old_substr, new_substr);
  },
  concat(other) {
    return plus.call(this, other);
  },
});
let push = doc(function push(val) {
  return this[Vector].push.call(this, val);
}, "");
function replace(old_val, new_val) {
  return this[Vector].replace.call(this, old_val, new_val);
}
function concat(other) {
  return this[Vector].concat.call(this, other);
}
const OrderedSequence = Symbol("OrderedSequence");
Array.prototype[OrderedSequence] = new ObjectLiteral({
  prepend(val) {
    return [val, ...this];
  },
  update_at(idx, f) {
    let [before, after] = [
      take.bind(this)(idx),
      skip.bind(this)(plus.call(idx, 1)),
    ];
    return [...before, f(at.bind(this)(idx)), ...after];
  },
  insert_at(idx, val) {
    let [before, after] = [
      take.bind(this)(idx),
      skip.bind(this)(plus.call(idx, 1)),
    ];
    return [...before, val, ...after];
  },
  first() {
    return this[0];
  },
  last() {
    return this.at(-1);
  },
});
String.prototype[OrderedSequence] = new ObjectLiteral({
  prepend(val) {
    return plus.call(val, this);
  },
  update_at(idx, f) {
    return plus.call(
      this.slice(0, idx),
      plus.call(f(this.at(idx)), this.slice(idx))
    );
  },
  insert_at(idx, val) {
    return plus.call(this.slice(0, idx), plus.call(val, this.slice(idx)));
  },
  first() {
    return this[0];
  },
  last() {
    return this.at(-1);
  },
});
function prepend(val) {
  return this[OrderedSequence].prepend.call(this, val);
}
function update_at(idx, ...fns) {
  return this[OrderedSequence].update_at.call(this, idx, compose(...fns));
}
function insert_at(idx, val) {
  return this[OrderedSequence].insert_at.call(this, idx, val);
}
let first = def_call(function first() {
  return this[OrderedSequence].first.call(this);
});
let last = def_call(function last() {
  return this[OrderedSequence].last.call(this);
});
Array[Vector] = function (entries) {
  return entries;
};
function construct_vector(entries) {
  return this[Vector](entries);
}
const Equal = Symbol("Equal");
function impl_equal(Ctor, ...keys) {
  Ctor.prototype[Equal] = function (other) {
    return and.call(other instanceof Ctor, () =>
      all__q.bind(keys)(
        function (key) {
          return equals__q.call(this[key], other[key]);
        }.bind(this)
      )
    );
  };
  return Ctor;
}
Object.prototype[Equal] = function (other) {
  return this === other;
};
Set.prototype[Equal] = function (other) {
  if (truthy(negate.call(other instanceof Set))) {
    return false;
  }
  if (truthy(other.size !== this.size)) {
    return false;
  }
  return all__q.bind(this)(function (val) {
    return other.has(val);
  });
};
Array.prototype[Equal] = function (other) {
  if (truthy(negate.call(other instanceof Array))) {
    return false;
  }
  if (truthy(other.length !== this.length)) {
    return false;
  }
  return all__q.bind(zip.bind(this)(other))(function ([a, b]) {
    return equals__q.call(a, b);
  });
};
function record_equals__q(other) {
  if (truthy(this.constructor !== other.constructor)) {
    return false;
  }
  if (
    truthy(negate.call(equals__q.call(len.bind(this)(), len.bind(other)())))
  ) {
    return false;
  }
  return all__q.bind(this)(function ([key, value]) {
    return equals__q.call(at.bind(other)(key), value);
  });
}
Map.prototype[Equal] = record_equals__q;
ObjectLiteral.prototype[Equal] = record_equals__q;
let equals__q = def_call(function equals__q(other) {
  if (truthy(nil__q.bind(this)())) {
    return this === other;
  } else {
    return this[Equal](other);
  }
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
function expect_primitive_type__b(type_str) {
  if (truthy(typeof this !== type_str)) {
    raise__b(str("Expected ", type_str));
  }
}
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
  return concat.bind(this)(other_set);
};
Array.prototype[Plus] = function (arr) {
  return concat.bind(this)(arr);
};
Number.prototype[Plus] = function (other) {
  expect_primitive_type__b.bind(other)("number");
  return js_plus(this, other);
};
Number.prototype[Minus] = function (other) {
  expect_primitive_type__b.bind(other)("number");
  return js_minus(this, other);
};
Number.prototype[Times] = function (other) {
  expect_primitive_type__b.bind(other)("number");
  return js_times(this, other);
};
Number.prototype[Divide] = function (other) {
  expect_primitive_type__b.bind(other)("number");
  return js_divide(this, other);
};
Number.prototype[Exponent] = function (other) {
  expect_primitive_type__b.bind(other)("number");
  return js_exponent(this, other);
};
Number.prototype[Mod] = function (other) {
  expect_primitive_type__b.bind(other)("number");
  return js_mod(this, other);
};
BigInt.prototype[Plus] = function (other) {
  expect_primitive_type__b.bind(other)("bigint");
  return js_plus(this, other);
};
BigInt.prototype[Minus] = function (other) {
  expect_primitive_type__b.bind(other)("bigint");
  return js_minus(this, other);
};
BigInt.prototype[Times] = function (other) {
  expect_primitive_type__b.bind(other)("bigint");
  return js_times(this, other);
};
BigInt.prototype[Divide] = function (other) {
  expect_primitive_type__b.bind(other)("bigint");
  return js_divide(this, other);
};
BigInt.prototype[Exponent] = function (other) {
  expect_primitive_type__b.bind(other)("bigint");
  return js_exponent(this, other);
};
BigInt.prototype[Mod] = function (other) {
  expect_primitive_type__b.bind(other)("bigint");
  return js_mod(this, other);
};
Number.prototype[Comparable] = new ObjectLiteral({
  greater_than_eq(other) {
    expect_primitive_type__b.bind(other)("number");
    return js_greater_than_eq(this, other);
  },
  less_than_eq(other) {
    expect_primitive_type__b.bind(other)("number");
    return js_less_than_eq(this, other);
  },
  greater_than(other) {
    expect_primitive_type__b.bind(other)("number");
    return js_greater_than(this, other);
  },
  less_than(other) {
    expect_primitive_type__b.bind(other)("number");
    return js_less_than(this, other);
  },
});
BigInt.prototype[Comparable] = new ObjectLiteral({
  greater_than_eq(other) {
    expect_primitive_type__b.bind(other)("bigint");
    return js_greater_than_eq(this, other);
  },
  less_than_eq(other) {
    expect_primitive_type__b.bind(other)("bigint");
    return js_less_than_eq(this, other);
  },
  greater_than(other) {
    expect_primitive_type__b.bind(other)("bigint");
    return js_greater_than(this, other);
  },
  less_than(other) {
    expect_primitive_type__b.bind(other)("bigint");
    return js_less_than(this, other);
  },
});
String.prototype[Plus] = function (other) {
  expect_primitive_type__b.bind(other)("string");
  return js_plus(this, other);
};
String.prototype[Times] = function (amount) {
  expect_primitive_type__b.bind(amount)("number");
  return this.repeat(amount);
};
String.prototype[Comparable] = new ObjectLiteral({
  greater_than_eq(other) {
    expect_primitive_type__b.bind(other)("string");
    return js_greater_than_eq(this, other);
  },
  less_than_eq(other) {
    expect_primitive_type__b.bind(other)("string");
    return js_less_than_eq(this, other);
  },
  greater_than(other) {
    expect_primitive_type__b.bind(other)("string");
    return js_greater_than(this, other);
  },
  less_than(other) {
    expect_primitive_type__b.bind(other)("string");
    return js_less_than(this, other);
  },
});
let plus = def_call(function plus(other) {
  return this[Plus](other);
});
let negate = def_call(function negate() {
  if (truthy(nil__q.bind(this)())) {
    return true;
  } else {
    return this[Negate]();
  }
});
function minus(other) {
  return this[Minus](other);
}
function times(other) {
  return this[Times](other);
}
function divide_by(other) {
  return this[Divide](other);
}
function exponent(other) {
  return this[Exponent](other);
}
function mod(other) {
  return this[Mod](other);
}
function greater_than(other) {
  return this[Comparable].greater_than.call(this, other);
}
function greater_than_eq(other) {
  return this[Comparable].greater_than_eq.call(this, other);
}
function less_than(other) {
  return this[Comparable].less_than.call(this, other);
}
function less_than_eq(other) {
  return this[Comparable].less_than_eq.call(this, other);
}
function and(thunk) {
  if (truthy(nil__q.bind(this)())) {
    return this;
  } else {
    return this[And](thunk);
  }
}
function or(thunk) {
  if (truthy(nil__q.bind(this)())) {
    return thunk();
  } else {
    return this[Or](thunk);
  }
}
const JsLogFriendly = Symbol("JsLogFriendly");
function _resolve_keyword_str(kw) {
  return replace.bind(replace.bind(kw)("__q", "?"))("__b", "!");
}
ObjectLiteral.prototype[JsLogFriendly] = function () {
  return into.bind(
    map.bind(this)(function ([k, v]) {
      return [_resolve_keyword_str(k), js_log_friendly.bind(v)()];
    })
  )(Object);
};
Map.prototype[JsLogFriendly] = function () {
  return into.bind(
    map.bind(this)(function ([k, v]) {
      return [js_log_friendly.bind(k)(), js_log_friendly.bind(v)()];
    })
  )(construct_record.call(Map, []));
};
Array.prototype[JsLogFriendly] = function () {
  return into.bind(map.bind(this)(js_log_friendly))([]);
};
Set.prototype[JsLogFriendly] = function () {
  return str(
    "#{",
    join.bind(map.bind(this)(js_log_friendly, as_str))(", "),
    "}"
  );
};
Keyword.prototype[JsLogFriendly] = function () {
  return plus.call(":", _resolve_keyword_str(this.value));
};
Boolean.prototype[JsLogFriendly] = function () {
  return this;
};
String.prototype[JsLogFriendly] = function () {
  return this;
};
Function.prototype[JsLogFriendly] = function () {
  return this.name;
};
let js_log_friendly = def_call(function js_log_friendly() {
  if (
    truthy(or.call(nil__q.bind(this)(), () => negate.call(this[JsLogFriendly])))
  ) {
    return this;
  } else {
    return this[JsLogFriendly]();
  }
});
let log = def_call(function log(...args) {
  console.log(...args, js_log_friendly.bind(this)());
  return this;
});
function str(...args) {
  return args.join("");
}
let nan__q = def_call(function nan__q() {
  return Number.isNaN(this);
});
let num__q = def_call(function num__q() {
  return equals__q.call(typeof this, "number");
});
let bigint__q = def_call(function bigint__q() {
  return equals__q.call(typeof this, "bigint");
});
let str__q = def_call(function str__q() {
  return equals__q.call(typeof this, "string");
});
let as_keyword = def_call(function as_keyword() {
  return Keyword["for"](this.toString());
});
let as_num = def_call(function as_num() {
  return Number(this);
});
let as_str = def_call(function as_str() {
  if (truthy(nil__q.bind(this)())) {
    return "";
  } else {
    return this.toString();
  }
});
let exists__q = def_call(function exists__q() {
  return negate.call(nil__q.bind(this)());
});
function Underscore(transforms) {
  this.transforms = transforms;
}
const UnderscoreInterpreter = Symbol("UnderscoreInterpreter");
let _ = new Underscore([
  new ObjectLiteral({
    f: function id() {
      return this;
    },
    args: [],
  }),
]);
Underscore.prototype[Keyword.for("insert")] = function (f, ...args) {
  return new Underscore(
    push.bind(this.transforms)(new ObjectLiteral({ f, args }))
  );
};
Object.prototype[UnderscoreInterpreter] = function (underscore) {
  let initial_value = this;
  let result = initial_value;
  for (let { f, args } of underscore.transforms) {
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
  return this.insert(negate);
};
Underscore.prototype[Equal] = function (other) {
  return this.insert(equals__q, other);
};
Underscore.prototype[Collection] = new ObjectLiteral({
  at(key) {
    return this.insert(at, key);
  },
  has__q(k) {
    return this.insert(has__q, k);
  },
  len() {
    return this.insert(len);
  },
  empty__q() {
    return this.insert(empty__q);
  },
});
Underscore.prototype[Record] = new ObjectLiteral({
  insert(key, value) {
    return this.insert(insert, key, value);
  },
  merge(other) {
    return this.insert(merge, other);
  },
  keys() {
    return this.insert(keys);
  },
  values() {
    return this.insert(values);
  },
});
Underscore.prototype[OrderedSequence] = new ObjectLiteral({
  prepend(value) {
    return this.insert(prepend, value);
  },
  update_at(idx, callable) {
    return this.insert(update_at, idx, callable);
  },
  insert_at(idx, val) {
    return this.insert(insert_at, idx, val);
  },
  first() {
    return this.insert(first);
  },
  last() {
    return this.insert(last);
  },
});
Underscore.prototype[Vector] = new ObjectLiteral({
  push(value) {
    return this.insert(push, value);
  },
  replace(old_value, new_value) {
    return this.insert(has__q, old_value, new_value);
  },
  concat(other) {
    return this.insert(concat, other);
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
  return this.insert(divide_by, other);
};
Underscore.prototype[Exponent] = function (other) {
  return this.insert(exponent, other);
};
Underscore.prototype[Mod] = function (other) {
  return this.insert(mod, other);
};
Underscore.prototype[JsLogFriendly] = function () {
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
    ["and", "&&"],
    ["or", "||"],
  ]);
  return str(
    "_",
    into.bind(
      map.bind(skip.bind(this.transforms)(1))(function ({ f, args }) {
        let fn_name = js_log_friendly.bind(f)();
        let __coil_if_let_temp = call.bind(fn_to_op)(fn_name);
        if (truthy(__coil_if_let_temp)) {
          let op = __coil_if_let_temp;
          let [rhs] = args;
          if (truthy(call.bind(new Set([and, or]))(f))) {
            rhs = rhs();
          }
          return str(" ", op, " ", js_log_friendly.bind(rhs)());
        } else {
          let formatted_args = join.bind(map.bind(args)(js_log_friendly))(", ");
          return str("::", fn_name, "(", formatted_args, ")");
        }
      })
    )("")
  );
};
const Inc = Symbol("Inc");
Number.prototype[Inc] = function () {
  return plus.call(this, 1);
};
BigInt.prototype[Inc] = function () {
  return plus.call(this, 1n);
};
String.prototype[Inc] = function () {
  return String.fromCharCode(plus.call(this.charCodeAt(0), 1));
};
function inc() {
  return this[Inc]();
}
let IRange = impl_equal(
  function IRange(start, end) {
    this.start = start;
    this.end = end;
  },
  Keyword.for("start"),
  Keyword.for("end")
);
let ERange = impl_equal(
  function ERange(start, end) {
    this.start = start;
    this.end = end;
  },
  Keyword.for("start"),
  Keyword.for("end")
);
let IRangeNoMin = impl_equal(function IRangeNoMin(end) {
  this.end = end;
}, Keyword.for("end"));
let ERangeNoMax = impl_equal(function ERangeNoMax(start) {
  this.start = start;
}, Keyword.for("start"));
let ERangeNoMin = impl_equal(function ERangeNoMin(end) {
  this.end = end;
}, Keyword.for("end"));
IRange.prototype[Call] = function (value) {
  return and.call(greater_than_eq.call(value, this.start), () =>
    less_than_eq.call(value, this.end)
  );
};
ERange.prototype[Call] = function (value) {
  return and.call(greater_than_eq.call(value, this.start), () =>
    less_than.call(value, this.end)
  );
};
IRangeNoMin.prototype[Call] = function (value) {
  return less_than_eq.call(value, this.end);
};
ERangeNoMax.prototype[Call] = function (value) {
  return greater_than_eq.call(value, this.start);
};
ERangeNoMin.prototype[Call] = function (value) {
  return less_than.call(value, this.end);
};
IRange.prototype[JsLogFriendly] = function () {
  return str(this.start, "..=", this.end);
};
ERange.prototype[JsLogFriendly] = function () {
  return str(this.start, "..", this.end);
};
IRangeNoMin.prototype[JsLogFriendly] = function () {
  return str("..=", this.end);
};
ERangeNoMax.prototype[JsLogFriendly] = function () {
  return str(this.start, "..");
};
ERangeNoMin.prototype[JsLogFriendly] = function () {
  return str("..", this.end);
};
IRange.prototype[Symbol.iterator] = function* () {
  let { start: i, end } = this;
  while (less_than_eq.call(i, end)) {
    yield i;
    i = inc.bind(i)();
  }
};
ERange.prototype[Symbol.iterator] = function* () {
  let { start: i, end } = this;
  while (less_than.call(i, end)) {
    yield i;
    i = inc.bind(i)();
  }
};
ERangeNoMax.prototype[Symbol.iterator] = function* () {
  let i = this.start;
  while (true) {
    yield i;
    i = inc.bind(i)();
  }
};
function def_vector(Constructor) {
  Constructor[Vector] = function (args) {
    return new Constructor(...args);
  };
  return Constructor;
}
function def_record(Constructor) {
  Constructor[Record] = function (entries) {
    return new Constructor(entries);
  };
  Constructor.prototype[Symbol.iterator] = function () {
    return iter.bind(this.entries)();
  };
  return Constructor;
}
let char_alpha__q = plus.call(
  into.bind(new IRange("a", "z"))(new Set([])),
  into.bind(new IRange("A", "Z"))(new Set([]))
);
let char_numeric__q = into.bind(new IRange("0", "9"))(new Set([]));
let char_alpha_numeric__q = plus.call(char_alpha__q, char_numeric__q);
function alpha__q() {
  return all__q.bind(this)(char_alpha__q);
}
function alpha_numeric__q() {
  return all__q.bind(this)(char_alpha_numeric__q);
}
let CallMap = def_record(function CallMap(entries) {
  this.entries = entries;
});
CallMap.prototype[Call] = function (value) {
  return pipe.bind(
    find.bind(this)(function ([callable, _]) {
      return call.bind(callable)(value);
    })
  )(function ([_, val]) {
    return val;
  });
};
const Type = Symbol("Type");
Number.prototype[Type] = Keyword.for("number");
Symbol.prototype[Type] = Keyword.for("symbol");
Keyword.prototype[Type] = Keyword.for("keyword");
Array.prototype[Type] = Keyword.for("array");
ObjectLiteral.prototype[Type] = Keyword.for("object_literal");
Map.prototype[Type] = Keyword.for("map");
function type() {
  return this[Type];
}
globalThis[Keyword.for("Call")] = Call;
globalThis[Keyword.for("Type")] = Type;
globalThis[Keyword.for("type")] = type;
globalThis[Keyword.for("call")] = call;
globalThis[Keyword.for("nil__q")] = nil__q;
globalThis[Keyword.for("Pipe")] = Pipe;
globalThis[Keyword.for("pipe")] = pipe;
globalThis[Keyword.for("compose")] = compose;
globalThis[Keyword.for("iter")] = iter;
globalThis[Keyword.for("Iterator")] = Iterator;
globalThis[Keyword.for("skip")] = skip;
globalThis[Keyword.for("take")] = take;
globalThis[Keyword.for("drop")] = drop;
globalThis[Keyword.for("each")] = each;
globalThis[Keyword.for("until")] = until;
globalThis[Keyword.for("zip")] = zip;
globalThis[Keyword.for("map")] = map;
globalThis[Keyword.for("flat_map")] = flat_map;
globalThis[Keyword.for("find")] = find;
globalThis[Keyword.for("split")] = split;
globalThis[Keyword.for("keep")] = keep;
globalThis[Keyword.for("reject")] = reject;
globalThis[Keyword.for("any__q")] = any__q;
globalThis[Keyword.for("all__q")] = all__q;
globalThis[Keyword.for("reduce")] = reduce;
globalThis[Keyword.for("Record")] = Record;
globalThis[Keyword.for("insert")] = insert;
globalThis[Keyword.for("merge")] = merge;
globalThis[Keyword.for("keys")] = keys;
globalThis[Keyword.for("record__q")] = record__q;
globalThis[Keyword.for("construct_record")] = construct_record;
globalThis[Keyword.for("Vector")] = Vector;
globalThis[Keyword.for("vector__q")] = vector__q;
globalThis[Keyword.for("at")] = at;
globalThis[Keyword.for("push")] = push;
globalThis[Keyword.for("prepend")] = prepend;
globalThis[Keyword.for("concat")] = concat;
globalThis[Keyword.for("has__q")] = has__q;
globalThis[Keyword.for("replace")] = replace;
globalThis[Keyword.for("len")] = len;
globalThis[Keyword.for("first")] = first;
globalThis[Keyword.for("last")] = last;
globalThis[Keyword.for("empty__q")] = empty__q;
globalThis[Keyword.for("not_empty__q")] = not_empty__q;
globalThis[Keyword.for("construct_vector")] = construct_vector;
globalThis[Keyword.for("Equal")] = Equal;
globalThis[Keyword.for("equals__q")] = equals__q;
globalThis[Keyword.for("Plus")] = Plus;
globalThis[Keyword.for("Negate")] = Negate;
globalThis[Keyword.for("Minus")] = Minus;
globalThis[Keyword.for("Times")] = Times;
globalThis[Keyword.for("Divide")] = Divide;
globalThis[Keyword.for("Exponent")] = Exponent;
globalThis[Keyword.for("Mod")] = Mod;
globalThis[Keyword.for("Comparable")] = Comparable;
globalThis[Keyword.for("LessThan")] = LessThan;
globalThis[Keyword.for("And")] = And;
globalThis[Keyword.for("Or")] = Or;
globalThis[Keyword.for("plus")] = plus;
globalThis[Keyword.for("negate")] = negate;
globalThis[Keyword.for("minus")] = minus;
globalThis[Keyword.for("times")] = times;
globalThis[Keyword.for("divide_by")] = divide_by;
globalThis[Keyword.for("exponent")] = exponent;
globalThis[Keyword.for("mod")] = mod;
globalThis[Keyword.for("greater_than")] = greater_than;
globalThis[Keyword.for("greater_than_eq")] = greater_than_eq;
globalThis[Keyword.for("less_than")] = less_than;
globalThis[Keyword.for("less_than_eq")] = less_than_eq;
globalThis[Keyword.for("and")] = and;
globalThis[Keyword.for("or")] = or;
globalThis[Keyword.for("log")] = log;
globalThis[Keyword.for("str")] = str;
globalThis[Keyword.for("nan__q")] = nan__q;
globalThis[Keyword.for("str__q")] = str__q;
globalThis[Keyword.for("as_keyword")] = as_keyword;
globalThis[Keyword.for("as_num")] = as_num;
globalThis[Keyword.for("as_str")] = as_str;
globalThis[Keyword.for("exists__q")] = exists__q;
globalThis[Keyword.for("Negate")] = Negate;
globalThis[Keyword.for("Underscore")] = Underscore;
globalThis[Keyword.for("_")] = _;
globalThis[Keyword.for("Inc")] = Inc;
globalThis[Keyword.for("inc")] = inc;
globalThis[Keyword.for("IRange")] = IRange;
globalThis[Keyword.for("ERange")] = ERange;
globalThis[Keyword.for("alpha__q")] = alpha__q;
globalThis[Keyword.for("alpha_numeric__q")] = alpha_numeric__q;
globalThis[Keyword.for("def_vector")] = def_vector;
globalThis[Keyword.for("def_record")] = def_record;
globalThis[Keyword.for("def_call")] = def_call;
function CollectionView(collection, idx) {
  this.collection = collection;
  this.idx = idx;
}
CollectionView.prototype[Collection] = new ObjectLiteral({
  len() {
    return minus.call(len.bind(this.collection)(), this.idx);
  },
  empty__q() {
    return equals__q.call(len.bind(this)(), 0);
  },
  at(idx) {
    return at.bind(this.collection)(plus.call(this.idx, idx));
  },
});
CollectionView.prototype[OrderedSequence] = new ObjectLiteral({
  first() {
    return at.bind(this.collection)(this.idx);
  },
  last() {
    return last.bind(this.collection)();
  },
});
CollectionView.prototype[Keyword.for("skip")] = function (n) {
  return new CollectionView(this.collection, plus.call(this.idx, n));
};
CollectionView.prototype[Symbol.iterator] = function* () {
  for (let i of new IRange(this.idx, len.bind(this.collection)())) {
    yield this.collection[i];
  }
};
CollectionView.prototype[JsLogFriendly] = function () {
  return this.collection.skip(this.idx);
};
let Lexer = def_record(function Lexer(entries) {
  this.entries = entries;
});
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
          negate.call(equals__q.call(result.index, 0))
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
  while (negate.call(equals__q.call(rest_of_string(), ""))) {
    let found = false;
    for (let [pattern, type] of this.entries) {
      let __coil_if_let_temp = scan.bind(pattern)();
      if (truthy(__coil_if_let_temp)) {
        let value = __coil_if_let_temp;
        if (truthy(equals__q.call(type, newline))) {
          line = plus.call(line, 1);
          col = 1;
        } else if (negate.call(equals__q.call(type, pass))) {
          tokens.push(new ObjectLiteral({ type, value, line, col }));
          col = plus.call(col, len.bind(value)());
        } else {
          col = plus.call(col, len.bind(value)());
        }
        found = true;
        break;
      }
    }
    if (truthy(negate.call(found))) {
      raise__b(new Error("Not token matched."));
    }
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
  [/^new\b/, Keyword.for("new")],
  [/^keyof\b/, Keyword.for("keyof")],
  [/^as\b/, Keyword.for("as")],
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
  [/^\:[a-zA-Z_\?\!\$0-9\/\.]+/, Keyword.for("keyword")],
  [/^\:/, Keyword.for("colon")],
  [/^\//, Keyword.for("div")],
  [/^\[/, Keyword.for("open_sq")],
  [/^\]/, Keyword.for("close_sq")],
  [/^\"([^\\\"]|\\.)*\"/s, Keyword.for("string_lit")],
  [/^[a-zA-Z_\?\!\$0-9\>\-]+/, Keyword.for("id")],
]);
function ParseError(expected_token_type, actual_token) {
  this.stack = new Error().stack;
  this.message = str(
    "Expected: ",
    js_log_friendly.bind(expected_token_type)(),
    " got ",
    js_log_friendly.bind(at.bind(actual_token)(Keyword.for("type")))(),
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
        equals__q.call(at.bind(first.bind(this)())(Keyword.for("type")), kw)
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
        plus.call("Parser Failed - Expected ", js_log_friendly.bind(parser)())
      )
    );
  } else {
    return this;
  }
}
const ParseInstruction = Symbol("ParseInstruction");
function line_and_col({ line, col }) {
  return new ObjectLiteral({ line, col });
}
let Init = def_vector(function Init(expr) {
  this.expr = expr;
});
Init.prototype[ParseInstruction] = function ([_expr, tokens]) {
  return [
    new ObjectLiteral({
      ...this.expr,
      pos: line_and_col(first.bind(tokens)()),
    }),
    tokens,
  ];
};
Init.prototype[JsLogFriendly] = function () {
  return str("Init(", js_log_friendly.bind(this.expr)(), ")");
};
let One = def_vector(function One(kw, as) {
  this.kw = kw;
  this.as = as;
});
One.prototype[ParseInstruction] = function ([expr, tokens]) {
  let { value, type } = first.bind(expect_token__b.bind(tokens)(this.kw))();
  return [
    merge.bind(expr)(new ObjectLiteral({ [this.as]: value })),
    tokens.skip(1),
  ];
};
One.prototype[JsLogFriendly] = function () {
  return str("One(kw: ", this.kw, ", as: ", this.as, ")");
};
let Optional = def_vector(function Optional(set_or_kw, parse_fn, as) {
  this.set_or_kw = set_or_kw;
  this.parse_fn = parse_fn;
  this.as = as;
});
Optional.prototype[ParseInstruction] = function ([expr, tokens]) {
  if (truthy(empty__q.bind(tokens)())) {
    return [expr, tokens];
  }
  function check_set(type) {
    return any__q.bind(this)(function (val) {
      if (truthy(equals__q.call(val, type))) {
        return true;
      } else if (Vector in val) {
        return has__q.bind(val)(type);
      }
    });
  }
  let { type } = first.bind(tokens)();
  if (
    truthy(
      and.call(this.set_or_kw instanceof Keyword, () =>
        equals__q.call(type, this.set_or_kw)
      )
    )
  ) {
    return parse_step.bind(
      construct_vector.call(Then, [this.parse_fn, this.as])
    )([expr, tokens]);
  } else if (
    and.call(this.set_or_kw instanceof Set, () =>
      check_set.bind(this.set_or_kw)(type)
    )
  ) {
    return parse_step.bind(
      construct_vector.call(Then, [this.parse_fn, this.as])
    )([expr, tokens]);
  } else {
    return [expr, tokens];
  }
};
Optional.prototype[JsLogFriendly] = function () {
  return str("Optional(kw: ", this.kw, ", as: ", this.as, ")");
};
Function.prototype[ParseInstruction] = function ([_expr, tokens]) {
  return this(tokens);
};
let Chomp = def_vector(function Chomp(...kws) {
  this.kws = kws;
});
Chomp.prototype[ParseInstruction] = function ([expr, tokens]) {
  let i = 0;
  for (let kw of this.kws) {
    expect_token__b.bind(tokens.skip(i))(kw);
    i = plus.call(i, 1);
  }
  return [expr, tokens.skip(i)];
};
Chomp.prototype[JsLogFriendly] = function () {
  return str("Chomp(", this.kws, ")");
};
let Then = def_vector(function Then(parser, kw) {
  this.parser = parser;
  this.kw = kw;
});
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
Then.prototype[JsLogFriendly] = function () {
  return str("Then(", this.parser.name, ", as:", this.kw, ")");
};
let FMap = def_vector(function FMap(f) {
  this.f = f;
});
FMap.prototype[ParseInstruction] = function ([expr, tokens]) {
  return [call.bind(this.f)(expr), tokens];
};
FMap.prototype[JsLogFriendly] = function () {
  return str("Fmap(", this.f.name, ")");
};
let Until = def_vector(function Until(end_kw, parser, kw) {
  this.end_kw = end_kw;
  this.parser = parser;
  this.kw = kw;
});
Until.prototype[ParseInstruction] = function ([expr, tokens]) {
  let exprs = [];
  while (
    negate.call(
      equals__q.call(
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
Until.prototype[JsLogFriendly] = function () {
  return str(
    "Until(end: ",
    js_log_friendly.bind(this.end_kw)(),
    ", f: ",
    this.parser.name,
    ", as: ",
    js_log_friendly.bind(this.kw)(),
    ")"
  );
};
let Case = def_vector(function Case(parse_map, kw) {
  this.parse_map = parse_map;
  this.kw = kw;
});
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
Case.prototype[JsLogFriendly] = function () {
  return plus.call(
    "Case(",
    plus.call(
      js_log_friendly.bind(this.parse_map)(),
      plus.call(", as: ", plus.call(js_log_friendly.bind(this.kw)(), ")"))
    )
  );
};
let Either = def_vector(function Either(set, kw) {
  this.set = set;
  this.kw = kw;
});
Either.prototype[ParseInstruction] = function ([expr, tokens]) {
  let op = verify_exists__b.bind(
    call.bind(this.set)(at.bind(first.bind(tokens)())(Keyword.for("type")))
  )(this.set);
  let [new_expr, rest] = [first.bind(tokens)(), tokens.skip(1)];
  return [
    merge.bind(expr)(
      new ObjectLiteral({ [this.kw]: at.bind(new_expr)(Keyword.for("value")) })
    ),
    rest,
  ];
};
Either.prototype[JsLogFriendly] = function () {
  return plus.call(
    "Either(",
    plus.call(
      js_log_friendly.bind(this.set)(),
      plus.call(", as: ", plus.call(js_log_friendly.bind(this.kw)(), ")"))
    )
  );
};
function parse_step(result) {
  if (truthy(negate.call(ParseInstruction in this))) {
    console.log("This is not parsable:", js_log_friendly.bind(this)());
  }
  return this[ParseInstruction](result);
}
let Parser = def_vector(function Parser(...instructions) {
  this.instructions = instructions;
});
Parser.prototype[JsLogFriendly] = function () {
  return plus.call(
    "~Parser[",
    plus.call(js_log_friendly.bind(this.instructions)().join(", "), "]")
  );
};
Parser.prototype[Call] = function (tokens) {
  return parse_step.bind(this)([null, tokens]);
};
let AbortIf = def_vector(function AbortIf(cond_fn) {
  this.cond_fn = cond_fn;
});
AbortIf.prototype[JsLogFriendly] = function () {
  return plus.call(
    "~AbortIf[",
    plus.call(_resolve_keyword_str(this.cond_fn.name), "]")
  );
};
Parser.prototype[ParseInstruction] = function (result) {
  for (let instruction of this.instructions) {
    if (truthy(instruction instanceof AbortIf)) {
      if (truthy(call.bind(instruction.cond_fn)(result))) {
        return;
      } else {
        continue;
      }
    }
    result = parse_step.bind(instruction)(result);
  }
  return result;
};
let ParseMap = def_record(function ParseMap(entries) {
  this.entries = entries;
});
ParseMap.prototype[Record] = new ObjectLiteral({
  keys() {
    return into.bind(map.bind(iter.bind(this.entries)())(first))(new Set([]));
  },
});
ParseMap.prototype[Call] = function (tokens, ...args) {
  if (truthy(empty__q.bind(tokens)())) {
    return;
  }
  for (let [pattern, parser] of this.entries) {
    if (truthy(equals__q.call(pattern, _))) {
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
          all__q.bind(zip.bind(iter.bind(pattern)())(tokens))(function ([
            p,
            token,
          ]) {
            let type = at.bind(token)(Keyword.for("type"));
            if (truthy(p instanceof Keyword)) {
              return equals__q.call(p, type);
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
          equals__q.call(
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
let all_math_ops = concat.bind(math_ops)(comparison_ops);
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
      construct_vector.call(Either, [
        new Set([Keyword.for("id"), Keyword.for("from")]),
        Keyword.for("property"),
      ]),
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
  if (truthy(negate.call(equals__q.call(current.line, previous.line)))) {
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
      construct_vector.call(Chomp, [Keyword.for("dot_dot"), Keyword.for("eq")]),
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
      construct_vector.call(Chomp, [Keyword.for("dot_dot")]),
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
      [Keyword.for("dot"), parse_dot],
      [Keyword.for("open_p"), parse_fn_call],
      [Keyword.for("double_colon"), parse_infix_bind],
      [Keyword.for("open_sq"), parse_object_dynamic_access],
      [Keyword.for("is"), parse_is],
      [Keyword.for("eq"), parse_snd_assign],
      [[Keyword.for("single_and"), Keyword.for("dot")], parse_and_dot],
      [[Keyword.for("dot_dot"), Keyword.for("eq")], parse_inclusive_range],
      [Keyword.for("dot_dot"), parse_exclusive_range],
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
let valid_ids_in_all_contexts = new Set([
  Keyword.for("id"),
  Keyword.for("from"),
  Keyword.for("as"),
]);
let parse_id = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("id_lookup") }),
  ]),
  construct_vector.call(Either, [
    push.bind(valid_ids_in_all_contexts)(Keyword.for("import")),
    Keyword.for("name"),
  ]),
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
  construct_vector.call(Either, [valid_ids_in_all_contexts, Keyword.for("id")]),
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
  construct_vector.call(Either, [
    valid_ids_in_all_contexts,
    Keyword.for("name"),
  ]),
]);
let parse_assign_id = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("id_assign") }),
  ]),
  construct_vector.call(Either, [
    valid_ids_in_all_contexts,
    Keyword.for("name"),
  ]),
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
  construct_vector.call(Either, [
    valid_ids_in_all_contexts,
    Keyword.for("old_name"),
  ]),
  construct_vector.call(Chomp, [Keyword.for("colon")]),
  construct_vector.call(Either, [
    valid_ids_in_all_contexts,
    Keyword.for("new_name"),
  ]),
]);
let parse_regular_obj_assign_entry = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("obj_reg_entry") }),
  ]),
  construct_vector.call(Either, [
    valid_ids_in_all_contexts,
    Keyword.for("name"),
  ]),
]);
let parse_string_obj_assign_entry = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("obj_str_rename_entry") }),
  ]),
  construct_vector.call(One, [
    Keyword.for("string_lit"),
    Keyword.for("old_name"),
  ]),
  construct_vector.call(Chomp, [Keyword.for("colon")]),
  construct_vector.call(Either, [
    valid_ids_in_all_contexts,
    Keyword.for("new_name"),
  ]),
]);
let parse_obj_assign_entry = construct_record.call(ParseMap, [
  [[Keyword.for("id"), Keyword.for("colon")], parse_obj_entry_rename],
  [Keyword.for("id"), parse_regular_obj_assign_entry],
  [Keyword.for("string_lit"), parse_string_obj_assign_entry],
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
let parse_this_assign = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("this_assign") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("at")]),
  construct_vector.call(Either, [
    valid_ids_in_all_contexts,
    Keyword.for("name"),
  ]),
]);
let parse_assign_expr = construct_record.call(ParseMap, [
  [Keyword.for("id"), parse_assign_id],
  [Keyword.for("open_sq"), parse_assign_array],
  [Keyword.for("open_b"), parse_assign_obj],
  [Keyword.for("dot_dot_dot"), parse_spread_assign],
  [Keyword.for("at"), parse_this_assign],
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
    return [as_num.bind(at.bind(expr)(Keyword.for("value")))(), tokens];
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
function parse_default_record_syntax(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("default_record_syntax") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("tilde")]),
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
function parse_default_vector_syntax(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("default_vector_syntax") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("tilde")]),
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
function parse_record_syntax(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("record_syntax") }),
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
function parse_custom_data_syntax(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("custom_data_literal") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("tilde")]),
      construct_vector.call(Then, [
        parse_single_expr,
        Keyword.for("constructor_expr"),
      ]),
      construct_vector.call(Case, [
        construct_record.call(ParseMap, [
          [Keyword.for("open_sq"), parse_vector_syntax],
          [Keyword.for("open_b"), parse_record_syntax],
        ]),
        Keyword.for("data"),
      ]),
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
function parse_prefix_exclusive_range(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("prefix_exclusive_range") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("dot_dot")]),
      construct_vector.call(Then, [parse_1_2_expr, Keyword.for("expr")]),
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
  [Keyword.for("dot_dot_dot"), parse_spread],
  [Keyword.for("double_colon"), parse_bind_this],
  [Keyword.for("bang"), parse_not],
  [Keyword.for("new"), parse_new],
  [Keyword.for("single_and"), parse_anon_arg_id],
  [Keyword.for("open_b"), parse_obj],
  [Keyword.for("and_and"), parse_unapplied_and_and],
  [Keyword.for("or_or"), parse_unapplied_or_or],
  [Keyword.for("dot_dot"), parse_prefix_exclusive_range],
  [all_math_ops, parse_unapplied_math_op],
  [[Keyword.for("hash"), Keyword.for("open_p")], parse_shorthand_anon_fn],
  [[Keyword.for("hash"), Keyword.for("open_b")], parse_set],
  [[Keyword.for("async"), Keyword.for("fn")], parse_fn],
  [Keyword.for("fn"), parse_fn],
  [[Keyword.for("tilde"), Keyword.for("open_sq")], parse_default_vector_syntax],
  [[Keyword.for("tilde"), Keyword.for("open_b")], parse_default_record_syntax],
  [Keyword.for("tilde"), parse_custom_data_syntax],
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
  construct_vector.call(Optional, [
    keys.bind(SINGLE_EXPR_PARSE_MAP)(),
    parse_expr,
    Keyword.for("expr"),
  ]),
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
let parse_assign_all_as = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("assign_all_as") }),
  ]),
  construct_vector.call(Chomp, [Keyword.for("times"), Keyword.for("as")]),
  construct_vector.call(One, [Keyword.for("id"), Keyword.for("name")]),
]);
function parse_import_assign_expr(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Case, [
        construct_record.call(ParseMap, [
          [[Keyword.for("times"), Keyword.for("as")], parse_assign_all_as],
          [_, parse_assign_expr],
        ]),
      ]),
    ])
  )(tokens);
}
function parse_import(tokens) {
  return call.bind(
    construct_vector.call(Parser, [
      construct_vector.call(Init, [
        new ObjectLiteral({ type: Keyword.for("import") }),
      ]),
      construct_vector.call(Chomp, [Keyword.for("import")]),
      construct_vector.call(Until, [
        Keyword.for("from"),
        parse_import_assign_expr,
        Keyword.for("assign_exprs"),
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
let parse_export_all = construct_vector.call(Parser, [
  construct_vector.call(Init, [
    new ObjectLiteral({ type: Keyword.for("export_all") }),
  ]),
  construct_vector.call(Chomp, [
    Keyword.for("export"),
    Keyword.for("times"),
    Keyword.for("from"),
  ]),
  construct_vector.call(One, [Keyword.for("string_lit"), Keyword.for("path")]),
]);
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
      [Keyword.for("define"), parse_define],
      [Keyword.for("try"), parse_try],
      [Keyword.for("protocol"), parse_protocol],
      [Keyword.for("return"), parse_return],
      [Keyword.for("continue"), parse_continue],
      [Keyword.for("break"), parse_break],
      [Keyword.for("loop"), parse_loop],
      [Keyword.for("import"), parse_import],
      [[Keyword.for("export"), Keyword.for("default")], parse_export_default],
      [[Keyword.for("export"), Keyword.for("times")], parse_export_all],
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
function map_join(f, separator) {
  return reduce.bind(map.bind(iter.bind(this)())(f))(function (acc, cur) {
    if (truthy(empty__q.bind(acc)())) {
      return cur;
    } else {
      return plus.call(acc, plus.call(separator, cur));
    }
  }, "");
}
function resolve_name(name) {
  if (truthy(equals__q.call(name, "with"))) {
    return "__coil_with";
  }
  if (truthy(equals__q.call(name, "case"))) {
    return "__coil_case";
  }
  if (truthy(name)) {
    return name
      .replaceAll("?", "__q")
      .replaceAll("!", "__b")
      .replaceAll(">", "_lt_")
      .replaceAll("-", "_");
  }
  return name;
}
function eval_if_branch(branch) {
  if (truthy(nil__q.bind(branch)())) {
    return "";
  } else if (
    equals__q.call(at.bind(branch)(Keyword.for("type")), Keyword.for("else"))
  ) {
    return str(
      " else {\n",
      eval_ast(or.call(at.bind(branch)(Keyword.for("body")), () => [])),
      "\n}"
    );
  } else {
    if (
      truthy(
        equals__q.call(
          at.bind(branch)(Keyword.for("type")),
          Keyword.for("else_if")
        )
      )
    ) {
      return str(
        " else if (",
        eval_expr(at.bind(branch)(Keyword.for("expr"))),
        ") {\n",
        eval_ast(or.call(at.bind(branch)(Keyword.for("pass")), () => [])),
        "\n}",
        eval_if_branch(at.bind(branch)(Keyword.for("fail")))
      );
    } else {
      raise__b(new Error("Expected else if"));
    }
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
  return str(eval_expr(lhs), "(", map_join.bind(args)(eval_expr, ", "), ")");
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
    map_join.bind(entries)(eval_array_deconstruction_entry, ", "),
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
        [
          Keyword.for("obj_str_rename_entry"),
          (...__args) =>
            str(
              at.bind(__args[0])(Keyword.for("old_name")),
              ": ",
              resolve_name(at.bind(__args[0])(Keyword.for("new_name")))
            ),
        ],
      ])
    )
  )(node);
}
function eval_object_deconstruction_names({ entries }) {
  return str(
    "{",
    map_join.bind(entries)(eval_obj_deconstruction_entry, ", "),
    "}"
  );
}
function eval_this_assign({ name }) {
  return name;
}
function eval_assign_all_as({ name }) {
  return str("* as ", name);
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
        [Keyword.for("this_assign"), eval_this_assign],
        [Keyword.for("assign_all_as"), eval_assign_all_as],
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
  return str("[", map_join.bind(elements)(eval_expr, ", "), "]");
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
function eval_this_assignments(args) {
  return reduce.bind(
    map.bind(
      keep.bind(iter.bind(args)())((...__args) =>
        equals__q.call(
          at.bind(__args[0])(Keyword.for("type")),
          Keyword.for("this_assign")
        )
      )
    )(function ({ name }) {
      return str("this.", name, " = ", name, ";\n");
    })
  )(plus, "");
}
function eval_fn({ is_async__q, generator__q, name, args, body }) {
  return str(
    and.call(is_async__q, () => "async "),
    "function ",
    and.call(generator__q, () => "*"),
    resolve_name(name),
    "(",
    map_join.bind(args)(eval_assign_expr, ", "),
    ") {\n",
    eval_this_assignments(args),
    eval_ast(body),
    "}"
  );
}
function eval_set({ elements }) {
  return str("new Set([", map_join.bind(elements)(eval_expr, ", "), "])");
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
    and.call(is_async__q, () => "async "),
    and.call(generator__q, () => "*"),
    resolve_name(name),
    "(",
    map_join.bind(args)(eval_assign_expr, ", "),
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
    map_join.bind(entries)(eval_obj_entry, ", "),
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
    resolve_name("equals?"),
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
    map_join.bind(args)(eval_expr, ", "),
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
function eval_default_record_syntax({ constructor_name, entries }) {
  return str(
    "construct_record.call(Dict, [",
    map_join.bind(entries)(eval_record_entry, ", "),
    "])"
  );
}
function eval_default_vector_syntax({ entries }) {
  return str(
    "construct_vector.call(Vec, [",
    map_join.bind(entries)(eval_expr, ", "),
    "])"
  );
}
const EvalNode = Symbol("EvalNode");
function eval_node(...args) {
  return at
    .bind(this)(Keyword.for("type"))
    [EvalNode](this, ...args);
}
Keyword.for("vector_syntax")[EvalNode] = function (
  { entries },
  constructor_expr_js
) {
  return str(
    "construct_vector.call(",
    constructor_expr_js,
    ", ",
    "[",
    map_join.bind(entries)(eval_expr, ", "),
    "]",
    ")"
  );
};
Keyword.for("record_syntax")[EvalNode] = function (
  { entries },
  constructor_expr_js
) {
  return str(
    "construct_record.call(",
    constructor_expr_js,
    ", ",
    "[",
    map_join.bind(entries)(eval_record_entry, ", "),
    "]",
    ")"
  );
};
function eval_custom_data_literal({ constructor_expr, data }) {
  return eval_node.bind(data)(eval_expr(constructor_expr));
}
function eval_inclusive_range({ lhs, rhs }) {
  if (truthy(rhs)) {
    return str("new IRange(", eval_expr(lhs), ", ", eval_expr(rhs), ")");
  } else {
    return str("new IRangeNoMax(", eval_expr(lhs), ")");
  }
}
function eval_exclusive_range({ lhs, rhs }) {
  if (truthy(rhs)) {
    return str("new ERange(", eval_expr(lhs), ", ", eval_expr(rhs), ")");
  } else {
    return str("new ERangeNoMax(", eval_expr(lhs), ")");
  }
}
function eval_shorthand_anon_fn({ expr }) {
  return str("(...__args) => ", eval_expr(expr));
}
function eval_anon_arg_id({ arg_num }) {
  return str(
    "__args[",
    minus.call(
      or.call(arg_num, () => 1),
      1
    ),
    "]"
  );
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
      map_join.bind(args)(eval_expr, ", "),
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
let all_ops_to_method = merge.bind(math_op_to_method)(logic_ops);
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
function eval_prefix_exclusive_range({ expr }) {
  return str("new ERangeNoMin(", eval_expr(expr), ")");
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
        [Keyword.for("prefix_exclusive_range"), eval_prefix_exclusive_range],
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
        [Keyword.for("default_record_syntax"), eval_default_record_syntax],
        [Keyword.for("default_vector_syntax"), eval_default_vector_syntax],
        [Keyword.for("custom_data_literal"), eval_custom_data_literal],
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
  if (truthy(expr)) {
    return str("return ", eval_expr(expr));
  } else {
    return "return";
  }
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
function eval_import({ assign_exprs, path }) {
  return str(
    "import ",
    map_join.bind(assign_exprs)(eval_assign_expr, ", "),
    ' from "',
    path.value.slice(1, -1),
    '"'
  );
}
function eval_export({ statement }) {
  return str("export ", eval_statement(statement));
}
function eval_export_default({ expr }) {
  return str("export default ", eval_expr(expr));
}
function eval_export_all({ path }) {
  return str("export * from ", path);
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
          [Keyword.for("export_all"), eval_export_all],
          [Keyword.for("let"), eval_let],
          [Keyword.for("if_let"), eval_if_let],
          [Keyword.for("return"), eval_return],
          [Keyword.for("protocol_def"), eval_protocol],
          [Keyword.for("impl_for"), eval_impl_for],
          [Keyword.for("impl_object"), eval_impl_object],
          [Keyword.for("define_for"), eval_define_for],
          [Keyword.for("for_loop"), eval_for_loop],
          [Keyword.for("id_assign"), eval_id_assign],
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
  return map_join.bind(ast)(eval_statement, "\n");
}
export function lex_and_parse(string) {
  return pipe.bind(
    pipe.bind(call.bind(lexer)(string))(function (tokens) {
      return new CollectionView(tokens, 0);
    })
  )(parse);
}
export function compile(string) {
  return pipe.bind(
    pipe.bind(
      pipe.bind(call.bind(lexer)(string))(function (tokens) {
        return new CollectionView(tokens, 0);
      })
    )(parse)
  )(eval_ast);
}
function compile_file(src_file_name, out_name) {
  let src = Deno.readTextFileSync(src_file_name);
  Deno.writeTextFile(out_name, compile(src));
}
function compile_file_and_prelude(src_file_name, out_name, prelude_src) {
  let prelude = Deno.readTextFileSync("./src/std/js_prelude.js");
  prelude = plus.call(prelude, compile(Deno.readTextFileSync(prelude_src)));
  let src = Deno.readTextFileSync(src_file_name);
  Deno.writeTextFile(out_name, plus.call(prelude, compile(src)));
}
if (truthy(and.call(globalThis.Deno, () => not_empty__q.bind(Deno.args)()))) {
  let src_file_name = Deno.args[0];
  let out_name = Deno.args[1];
  let prelude_src = "./src/std/prelude.coil";
  if (truthy(equals__q.call(Deno.args[2], "-w"))) {
    let watcher = Deno.watchFs([src_file_name, prelude_src]);
    for await (let event of watcher) {
      if (truthy(negate.call(equals__q.call(event.kind, "modify")))) {
        continue;
      }
      console.log("Rebuilding...");
      try {
        compile_file_and_prelude(src_file_name, out_name, prelude_src);
      } catch (e) {
        console.error("Compile Failed", e);
      }
    }
  } else if (equals__q.call(Deno.args[2], "-no-prelude")) {
    compile_file(src_file_name, out_name);
  } else {
    compile_file_and_prelude(src_file_name, out_name, prelude_src);
  }
}
