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
  console.log(err);
  throw err;
}

globalThis["raise__b"] = raise__b;
globalThis["Keyword"] = Keyword;
globalThis["ObjectLiteral"] = ObjectLiteral;
globalThis["truthy"] = truthy;
Object.prototype["[]"] = function (...keys) {
let o = this;
for  (let key of keys) {
o = js_dynamic_object_lookup(o, key)
};
return o;};
Object.prototype["[]="] = function (keys, expr) {
return js_set_property(this, keys, expr);};
function def_global(f) {
let resolved_name = f['name']['replaceAll']("?", "__q")['replaceAll']("!", "__b")['replaceAll'](">", "_lt_")['replaceAll']("-", "_");
globalThis['[]='].call(globalThis, [resolved_name], f)
return f;}
const CustomNumberLiteral = Symbol("CustomNumberLiteral");
globalThis['[]='].call(globalThis, [Keyword.for("CustomNumberLiteral")], CustomNumberLiteral)
Keyword.for("custom_number_literal/n")[CustomNumberLiteral] = BigInt;
const Doc = Symbol("Doc");
globalThis['[]='].call(globalThis, [Keyword.for("Doc")], Doc)
let doc = def_global(function doc(f, doc_str) {
f[Doc] = doc_str['trim']();
return f;});
let log_doc = def_global(function log_doc() {
if (truthy(this['name'])) {
console['log'](str("# ", this['name']))
};
console['log'](this['[]'].call(this, Doc))
return this;});
const Call = Symbol("Call");
globalThis['[]='].call(globalThis, [Keyword.for("Call")], Call)
function compose(first_fn, ...fns) {
return function (...args) {
let result = first_fn?.[Call](...args);
for  (let f of fns) {
result = f?.[Call](result)
};
return result;};}
compose = def_global(compose)
compose = doc(compose, `
composes a list of [[Call]] objects into a single function

example:
  compose(:users 0 :id)({users: [{id: 123}]}) // -> 123 
`)
Function.prototype[Call] = function (...args) {
return this(...args);};
Set.prototype[Call] = function (key) {
return this['has'](key);};
Map.prototype[Call] = function (key) {
return this['get'](key);};
ObjectLiteral.prototype[Call] = function (key) {
return this['[]'].call(this, key);};
Array.prototype[Call] = function (index) {
return this['at'](index);};
String.prototype[Call] = function (collection) {
if (truthy(or.call(typeof(collection) === "string", () => collection instanceof Keyword))) {
raise__b(new TypeError(plus.call("Can't 'call' a string with ",as_str.bind(collection)())))
} else {
return call.bind(collection)(this);
};};
Number.prototype[Call] = function (collection) {
if (truthy(collection instanceof Keyword)) {
return this['[]'].call(this, collection);
} else {
return call.bind(collection)(this);
};};
Keyword.prototype[Call] = function (collection) {
if (truthy(or.call(collection instanceof Keyword, () => typeof(collection) === "string"))) {
raise__b(new TypeError(plus.call("Can't 'call' a keyword with",as_str.bind(collection)())))
} else if (Call in collection) {
return call.bind(collection)(this);
} else {
return collection['[]'].call(collection, this);
};};
let call = compose(def_global, F => doc(F, `
Invokes [[Call]] on 'this'


Usage:
- On Object Literals
  {a: 10}::call(:a) // 10
`))(function call(...args) {
return this?.[Call](...args);})
Set.prototype[Keyword.for("bind")] = function (val) {
return function () {
return call.bind(this)(val);}.bind(this);};
let nil__q = Object['freeze'](new Set([undefined, null]));
const Pipe = Symbol("Pipe");
globalThis['[]='].call(globalThis, [Keyword.for("Pipe")], Pipe)
Object.prototype[Pipe] = function (callable) {
return call.bind(callable)(this);};
let pipe = compose(def_global, F => doc(F, `
invokes [[Pipe]] protocol

args:
  ...callables: list of [[Call]] objects

returns:
  result of invoking 'callables' on this

nil handling:
  since nil doesn't impl Pipe, we'll call 'f' directly.

note on [[Pipe]]:
  pipe is protocol based so that it can be used with Underscore among other objects.
`))(function pipe(...callables) {
let f = compose(...callables);
if (truthy(nil__q.bind(this)())) {
return f(this);
} else {
return this?.[Pipe](f);
};})
let def_call = compose(def_global, F => doc(F, `
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
`))(function def_call(f) {
f[Call] = function (first, ...rest) {
return f.bind(first)(...rest);};
return f;})
let iter = compose(def_call, F => doc(F, `
Returns an iterator of 'this'.

In the case 'this' is nil, you will get an empty array iterator.
`))(function iter() {
return this?.[Symbol['iterator']]() ?? iter.bind([])();})
let iter__q = compose(def_call, F => doc(F, `
Determines if 'this' is a valid Symbol.iterator

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol for more
`))(function iter__q() {
return iter.bind(this)() === this;})
const Iterator = Symbol("Iterator");
globalThis['[]='].call(globalThis, [Keyword.for("Iterator")], Iterator)
let default_iterator_impl = new ObjectLiteral({*['take'](n) {
for  (let [elem, i] of zip.bind(this)(new ERangeNoMax((0)))) {
if (truthy(equals__q.call(i, n))) {
break;
} else {
yield elem
};
};
}, *['until'](f) {
for  (let elem of this) {
if (truthy(f(elem))) {
break;
} else {
yield elem
};
};
}, *['skip'](n) {
for  (let [elem, i] of zip.bind(this)(new ERangeNoMax((0)))) {
if (truthy(less_than.call(i,n))) {
continue;
} else {
yield elem
};
};
}, ['find'](f) {
for  (let elem of this) {
if (truthy(f(elem))) {
return elem;
};
};
}, *['zip'](...collections) {
let generators = into.bind(map.bind([this, ...collections])(iter))([]);
while (true) {
let gen_states = into.bind(map.bind(generators)((...__args) => __args[0]['next']()))([]);
if (truthy(any__q.bind(gen_states)(Keyword.for("done")))) {
break;
} else {
yield into.bind(map.bind(gen_states)(Keyword.for("value")))([])
};
};
}, ['reduce'](f, start) {
let acc = start;
for  (let elem of this) {
acc = f(acc, elem)
};
return acc;
}, *['map'](f) {
for  (let elem of this) {
yield f(elem)
};
}, *['flat_map'](f) {
for  (let elem of this) {
yield* f(elem)
};
}, ['each'](f) {
for  (let elem of this) {
f(elem)
};
}, *['keep'](f) {
for  (let elem of this) {
if (truthy(f(elem))) {
yield elem
};
};
}, ['all?'](f) {
for  (let elem of this) {
if (truthy(negate.call(f(elem)))) {
return false;
};
};
return true;
}, ['any?'](f) {
for  (let elem of this) {
if (truthy(f(elem))) {
return true;
};
};
return false;
}, *['split'](f) {
let chunk = [];
for  (let elem of this) {
if (truthy(f(elem))) {
yield chunk
chunk = []
} else {
chunk = push.bind(chunk)(elem)
};
};
yield chunk
}, *['compact']() {
for  (let elem of this) {
if (truthy(nil__q.bind(elem)())) {
continue;
} else {
yield elem
};
};
}});
function iterator_impl() {
return or.call(this?.[Iterator], () => default_iterator_impl);}
let skip = compose(def_global, F => doc(F, `
lazily skips 'n' elements for an iterator

Examples:
  [1 2 3 4 5]::skip(1)::into([]) // -> [2 3 4 5]
  [1 2 3]::skip(20)::into([]) // -> []
`))(function skip(n) {
return iterator_impl.bind(this)()['skip']['call'](iter.bind(this)(), n);})
let take = compose(def_global, F => doc(F, `
lazily takes 'n' elements for an iterator

Examples:
  [1 2 3 4]::take(2)::into([]) // -> [1 2]
  [1 2 3]::take(200)::into([]) // -> [1 2 3]
`))(function take(n) {
return iterator_impl.bind(this)()['take']['call'](iter.bind(this)(), n);})
let each = compose(def_global, F => doc(F, `
eagerly consumes an iterator by calling 'f' on each elem

Examples:
  [{name: \"bob\"} {name: \"jill\"}]
    ::each(:name log) // prints 'bob' and 'jill'
`))(function each(...fns) {
return iterator_impl.bind(this)()['each']['call'](iter.bind(this)(), compose(...fns));})
let until = compose(def_global, F => doc(F, `
lazily defines an end point for an iterator

Examples:
  [1 2 3 4 5 6 7]
    ::until(_ > 3)
    ::into([]) // [1 2 3]
`))(function until(...fns) {
return iterator_impl.bind(this)()['until']['call'](iter.bind(this)(), compose(...fns));})
let zip = compose(def_global, F => doc(F, `
lazily zips together a number of iterators

Examples:
  [:axe :hammer :pickaxe]
    ::zip([3 1 4])
    ::into(~Map{})
  // -> ~Map{axe: 3, hammer: 1, pickaxe: 4}
`))(function zip(...iterables) {
return iterator_impl.bind(this)()['zip']['call'](iter.bind(this)(), ...iterables);})
let map = compose(def_global, F => doc(F, `
lazily maps functions over an iterator

Examples:
  [{name: \"marcelle\"}, {name: \"jack\"}]
    ::map(:name len)
    ::into([]) // [8 4]
`))(function map(...fns) {
return iterator_impl.bind(this)()['map']['call'](iter.bind(this)(), compose(...fns));})
let flat_map = compose(def_global, F => doc(F, `
lazily flat maps functions over an iterator

Examples:
  [[1 5] [6 10]]
    ::flat_map(fn([start, end]) = (start..=end)::into([]))
    ::into([]) // [1 2 3 4 5 6 7 8 9 10]
`))(function flat_map(...fns) {
return iterator_impl.bind(this)()['flat_map']['call'](iter.bind(this)(), compose(...fns));})
let find = compose(def_global, F => doc(F, `
eagerly finds a value in an iterator

Examples:
  [1 2 3 4 5]
    ::find(#{4 5}) // 4
`))(function find(...fns) {
return iterator_impl.bind(this)()['find']['call'](iter.bind(this)(), compose(...fns));})
let keep = compose(def_global, F => doc(F, `
lazily keeps values based off a condition

Examples:
  [{admin: true, name: \"bob\"} {admin: false, name: \"jill\"}]
    ::keep(:admin)
    ::into([]) // [{admin: true, name: \"bob\"}]
`))(function keep(...fns) {
return iterator_impl.bind(this)()['keep']['call'](iter.bind(this)(), compose(...fns));})
let reject = compose(def_global, F => doc(F, `
lazily rejects values based of a condition

Examples:
  [{admin: true, name: \"bob\"} {admin: false, name: \"jill\"}]
    ::reject(:admin)
    ::into([]) // [{admin: false, name: \"jill\"}]
`))(function reject(...fns) {
return keep.bind(this)(...fns, negate.call(_));})
let any__q = compose(def_global, F => doc(F, `
eagerly finds out if an element matches the condition

Examples:
  [1 2 3 4 5]::any?(#{3}) // true
`))(function any__q(...fns) {
return iterator_impl.bind(this)()['any?']['call'](iter.bind(this)(), compose(...fns));})
let all__q = compose(def_global, F => doc(F, `
eagerly finds out all elements matches the condition

Examples:
  [1 2 3 4 5]::all?(_ > 0) // true
`))(function all__q(...fns) {
return iterator_impl.bind(this)()['all?']['call'](iter.bind(this)(), compose(...fns));})
let reduce = compose(def_global, F => doc(F, `
eagerly reduces an iterator

Examples:
  [1 2 3 4 5]::reduce(+ 0) // 15
`))(function reduce(f, start) {
return iterator_impl.bind(this)()['reduce']['call'](iter.bind(this)(), call.bind(f), start);})
let split = compose(def_global, F => doc(F, `
lazily splits an iterator

Examples:
  \"hey there buddy\"
    ::split(#{`, `})
    ::take(2)
    ::into([]) // [\"hey\" \"there\"]
`))(function split(...fns) {
return iterator_impl.bind(this)()['split']['call'](iter.bind(this)(), compose(...fns));})
let compact = compose(def_global, F => doc(F, `
lazily compacts an iterator

Examples:
  [{status: :great} {status: :broken} {}]
    ::map(:status)
    ::compact()
    ::into([]) // [:great :broken]
`))(function compact() {
return iterator_impl.bind(this)()['compact']['call'](iter.bind(this)());})
let join = compose(def_global, F => doc(F, `
eagerly joins an iterator

Examples:
  [\"hey\" \"there\"]
    ::join(\" \") // \"hey there\"
`))(function join(sep) {
return reduce.bind(this)(function (prev, cur) {
if (truthy(empty__q.bind(prev)())) {
return cur;
} else {
return plus.call(prev,plus.call(sep,cur));
};}, "");})
const Into = Symbol("Into");
globalThis['[]='].call(globalThis, [Keyword.for("Into")], Into)
Array.prototype[Into] = function (iterable) {
return [...this, ...iterable];};
ObjectLiteral.prototype[Into] = function (iterable) {
return merge.bind(this)(iterable);};
Map.prototype[Into] = function (iterable) {
return merge.bind(this)(iterable);};
Set.prototype[Into] = function (iterable) {
return concat.bind(this)(iterable);};
String.prototype[Into] = function (iterable) {
return plus.call(this,reduce.bind(iterable)(plus, ""));};
Object[Into] = function (iterable) {
return Object['fromEntries'](iterable);};
let into = compose(def_global, F => doc(F, `
converts 'this' iterator into 'output', prepending existing values in 'output'

Examples:
  [1 2 3 4]
    ::into(#{}) // #{1 2 3 4}

  [[:score 10] [:grade :bad]]
    ::into({}) // {score: 20, grade: :bad}
`))(function into(output) {
return output['[]'].call(output, Into)(this);})
const Collection = Symbol("Collection");
globalThis['[]='].call(globalThis, [Keyword.for("Collection")], Collection)
ObjectLiteral.prototype[Collection] = new ObjectLiteral({['at'](key) {
return this['[]'].call(this, key);
}, ['len']() {
return Object['keys'](this)['length'];
}, ['empty?']() {
return len.bind(this)() === (0);
}, ['has?'](key) {
return key in this;
}});
Array.prototype[Collection] = new ObjectLiteral({['at'](idx) {
return this['at'](idx);
}, ['len']() {
return this['length'];
}, ['empty?']() {
return this['length'] === (0);
}, ['has?'](val) {
return any__q.bind(this)(equals__q.call(_, val));
}});
Map.prototype[Collection] = new ObjectLiteral({['at'](key) {
return this['get'](key);
}, ['len']() {
return this['size'];
}, ['empty?']() {
return this['size'] === (0);
}, ['has?'](key) {
return this['has'](key);
}});
String.prototype[Collection] = new ObjectLiteral({['at'](idx) {
return this['at'](idx);
}, ['len']() {
return this['length'];
}, ['empty?']() {
return this['length'] === (0);
}, ['has?'](substr) {
return this['includes'](substr);
}});
Set.prototype[Collection] = new ObjectLiteral({['at'](val) {
return and.call(this['has'](val), () => val);
}, ['len']() {
return this['size'];
}, ['empty?']() {
return this['size'] === (0);
}, ['has?'](val) {
return this['has'](val);
}});
let len = compose(def_call, def_global, F => doc(F, `
gets length of a collection

Examples:
  [1 2 3]::len() // 3
  #{1 2 3}::len() // 3
  {a: 10}::len() // 1
  ~Map{a: :a, b: :b}::len() // 2
`))(function len() {
return this['[]'].call(this, Collection)['len']['call'](this);})
let empty__q = compose(def_call, def_global, F => doc(F, `
determines if a collection is empty

Examples:
  []::empty?() // true
  #{1}::empty?() // false
  null::empty?() // true
  `, `::empty?() // true
`))(function empty__q() {
return this?.[Collection]['empty?']['call'](this) ?? true;})
let not_empty__q = compose(def_call, def_global, F => doc(F, `
determines if a collection is not empty

Examples:
  [1]::not_empty?() // true
  `, `::not_empty?() // false
  null::not_empty?() // false
`))(function not_empty__q() {
return negate.call(empty__q.bind(this)());})
let at = compose(def_global, F => doc(F, `
extracts value from collection based on a key or index

Examples:
  [1 3 4]::at(2) // 4
  // set::at works as an identity function if the value is in the set
  #{4 3 1}::at(4) // 4
  // keywords coerce to strings for objects
  {a: 10}::at(:a) // 10
  {a: 10}::at(\"a\") // 10
  ~Map{a: 10}::at(:a) // 10
  // strings can not lookup keywords in maps
  ~Map{a: 10}::at(\"a\") // undefined
`))(function at(key_or_idx) {
return this['[]'].call(this, Collection)['at']['call'](this, key_or_idx);})
let has__q = compose(def_global, F => doc(F, `
determines if a collection has a value

Examples:
  [1 2 3 4]::has?(3) // true
  #{1 2 3}::has?(2) // true
  {a: 10}::has?(:a) // true
`))(function has__q(val) {
return this['[]'].call(this, Collection)['has?']['call'](this, val);})
const Record = Symbol("Record");
globalThis['[]='].call(globalThis, [Keyword.for("Record")], Record)
ObjectLiteral.prototype[Record] = new ObjectLiteral({['insert'](key, value) {
return new ObjectLiteral({...this, [key]: value});
}, ['merge'](other) {
return ObjectLiteral['from_entries']([...this, ...other]);
}, ['keys']() {
return Object['keys'](this);
}, ['values']() {
return Object['values'](this);
}});
Map.prototype[Record] = new ObjectLiteral({['insert'](key, value) {
return new Map([...this, [key, value]]);
}, ['merge'](other) {
return new Map([...this, ...other]);
}, ['keys']() {
return this['keys']();
}, ['values']() {
return this['values']();
}});
let keys = compose(def_call, def_global, F => doc(F, `
Get keys of a record as an iterator OR a collection

Example:
  {a: 10}::keys() // [\"a\"]
  ~Map{a: 10}::keys()::into(#{}) // #{:a}
`))(function keys() {
return this['[]'].call(this, Record)['keys']['call'](this);})
let values = compose(def_call, def_global, F => doc(F, `
Get values of a record as an iterator OR a collection

Example:
  {a: 10}::values() // [10]
  ~Map{a: 10}::values()::into(#{}) // #{10}
`))(function values() {
return this['[]'].call(this, Record)['values']['call'](this);})
let insert = compose(def_global, F => doc(F, `
Insert key & value into a record

Example:
  {a: 10}::insert(:b 20) // {a: 10, b: 20}
  ~Map{a: 10}::insert(:b 20) // ~Map{a: 10, b: 20}
`))(function insert(key, value) {
return this['[]'].call(this, Record)['insert']['call'](this, key, value);})
let merge = compose(def_global, F => doc(F, `
Merge 2 records together

Note that since all object literal keys are strings, merging a
richer record that can hold keywords may have unexpected consequences

Do not merge a rich record type with a non rich record unless you are ok
with lossy conversions.

Example:
  {a: 10}::merge({b: 20}) {a: 10 b: 20}
  {a: 10}::merge({a: 20})
  ~Map{a: 10}::merge(~Map{a: 20}) // ~Map{a: 20}
  // here's the unexpected result
  ~Map{a: 10}::merge({a: 20}) // ~Map{a: 10, \"a\" => 20}
`))(function merge(other) {
return this['[]'].call(this, Record)['merge']['call'](this, other);})
Map["{}"] = function (entries) {
return new Map(entries);};
Object["{}"] = Object['fromEntries'];
Map[Record] = function (entries) {
return new Map(entries);};
Object[Record] = Object['fromEntries'];
let record__q = compose(def_global, F => doc(F, `
Determines if 'this' is a record

Examples:
  {}::record?() // true
  Map{}::record?() // true
  #{}::record?() // false
`))(function record__q() {
return exists__q.bind(this['[]'].call(this, Record))();})
let construct_record = compose(def_global, F => doc(F, `
Constructs a record based off an entries array

This is used for record syntax

Examples:
  Map::construct_record([[:a 20]])
    ==
  ~Map{a: 20}
`))(function construct_record(entries) {
return this['[]'].call(this, Record)(entries);})
const Vector = Symbol("Vector");
globalThis['[]='].call(globalThis, [Keyword.for("Vector")], Vector)
let vector__q = compose(def_global, F => doc(F, `
Determines if 'this' conforms to the vector protocol

Examples:
  []::vector?() // true
  #{}::vector?() // true
  {}::vector?() // false
`))(function vector__q() {
return exists__q.bind(this['[]'].call(this, Vector))();})
Array.prototype[Vector] = new ObjectLiteral({['push'](val) {
return [...this, val];
}, ['replace'](old_val, new_val) {
return map.bind(this)(function (val) {
if (truthy(equals__q.call(val, old_val))) {
return new_val;
} else {
return val;
};});
}, ['concat'](other) {
return [...this, ...other];
}});
Set.prototype[Vector] = new ObjectLiteral({['push'](value) {
return new Set(this)['add'](value);
}, ['replace'](old_val, new_val) {
let self = new Set(this);
self['delete'](old_value)
self['add'](new_val)
return self;
}, ['concat'](other) {
return new Set([...this, ...other]);
}});
String.prototype[Vector] = new ObjectLiteral({['push'](val) {
return plus.call(this,val);
}, ['replace'](old_substr, new_substr) {
return this['replaceAll'](old_substr, new_substr);
}, ['concat'](other) {
return plus.call(this,other);
}});
let push = compose(def_global, F => doc(F, `
push a value onto a vector

Examples:
  [1 2]::push(3) // [1 2 3]
  // order is not guaranteed for sets
  #{1 2}::push(3) // #{3 1 2}
`))(function push(val) {
return this['[]'].call(this, Vector)['push']['call'](this, val);})
let replace = compose(def_global, F => doc(F, `
replace a value in a vector

Examples:
  [1 2 3]::replace(2 3) // [1 3 3]
  #{1 2 3}::replace(2 3) // #{1 3}
`))(function replace(old_val, new_val) {
return this['[]'].call(this, Vector)['replace']['call'](this, old_val, new_val);})
let concat = compose(def_global, F => doc(F, `
concat two vectors

Examples:
  [1 2]::concat([3 4]) // [1 2 3 4]
  [1 2]::concat(#{3 4}) // [1 2 4 3] - set order unknowable
  #{1 2}::concat([3 4]) // #{1 2 3 4}
  #{1 2}::concat(#{2 3}) // #{1 2 3}
`))(function concat(other) {
return this['[]'].call(this, Vector)['concat']['call'](this, other);})
const OrderedSequence = Symbol("OrderedSequence");
globalThis['[]='].call(globalThis, [Keyword.for("OrderedSequence")], OrderedSequence)
Array.prototype[OrderedSequence] = new ObjectLiteral({['prepend'](val) {
return [val, ...this];
}, ['update_at'](idx, f) {
let [before, after] = [take.bind(this)(idx), skip.bind(this)(plus.call(idx,(1)))];
return [...before, f(at.bind(this)(idx)), ...after];
}, ['insert_at'](idx, val) {
let [before, after] = [take.bind(this)(idx), skip.bind(this)(plus.call(idx,(1)))];
return [...before, val, ...after];
}, ['first']() {
return this['[]'].call(this, (0));
}, ['last']() {
return this['at']((-1));
}});
String.prototype[OrderedSequence] = new ObjectLiteral({['prepend'](val) {
return plus.call(val,this);
}, ['update_at'](idx, f) {
return plus.call(this['slice']((0), idx),plus.call(f(this['at'](idx)),this['slice'](idx)));
}, ['insert_at'](idx, val) {
return plus.call(this['slice']((0), idx),plus.call(val,this['slice'](idx)));
}, ['first']() {
return this['[]'].call(this, (0));
}, ['last']() {
return this['at']((-1));
}});
let prepend = compose(def_global, F => doc(F, `
inserts element at beginning of collection

Examples:
  [1 2 3]::prepend(0) // [0 1 2 3]
`))(function prepend(val) {
return this['[]'].call(this, OrderedSequence)['prepend']['call'](this, val);})
let update_at = compose(def_global, F => doc(F, `
updates element at given index

Examples:
  [1 2 3]::update_at(1 as_keyword) // [1 :2 3]
`))(function update_at(idx, ...fns) {
return this['[]'].call(this, OrderedSequence)['update_at']['call'](this, idx, compose(...fns));})
let insert_at = compose(def_global, F => doc(F, `
inserts element at given index

Examples:
  [1 2 4]::insert_at(1 3) // [1 2 3 4]
`))(function insert_at(idx, val) {
return this['[]'].call(this, OrderedSequence)['insert_at']['call'](this, idx, val);})
let first = compose(def_call, def_global, F => doc(F, `
gets first element of collection

Examples:
  [1 2 3]::first() // 1
`))(function first() {
return this['[]'].call(this, OrderedSequence)['first']['call'](this);})
let last = compose(def_call, def_global, F => doc(F, `
gets last element of collection

Examples:
  [1 2 3]::last() // 3
`))(function last() {
return this['[]'].call(this, OrderedSequence)['last']['call'](this);})
Array["[]"] = function (...entries) {
return entries;};
let construct_vector = compose(def_global, F => doc(F, `
constructs vector based off entries

this is used for custom vector syntax

Examples:
  import { List } from \"immutable\"

  List::constructor_vector([1 2 3 4])
    ==
  ~List[1 2 3 4]
`))(function construct_vector(entries) {
return this['[]'].call(this, Vector)(entries);})
const Equal = Symbol("Equal");
globalThis['[]='].call(globalThis, [Keyword.for("Equal")], Equal)
let impl_equal = compose(def_global, F => doc(F, `
implement [[Equal]] for a generic constructor by
specifying the keys to measure equality by

Examples:
  fn Dog(@name, @age) {}

  new Dog(\"joey\" 1) == new Dog(\"joey\" 1) // false

  @impl_equal(:name :age)
  fn Dog(@name @age) {}

  new Dog(\"joey\" 1) == new Dog(\"joey\" 1) // true
`))(function impl_equal(Ctor, ...keys) {
Ctor.prototype[Equal] = function (other) {
return and.call(other instanceof Ctor, () => all__q.bind(keys)(function (key) {
return equals__q.call(this['[]'].call(this, key), other['[]'].call(other, key));}.bind(this)));};
return Ctor;})
Object.prototype[Equal] = function (other) {
return this === other;};
Set.prototype[Equal] = function (other) {
if (truthy(negate.call((other instanceof Set)))) {
return false;
} else if (other['size'] !== this['size']) {
return false;
} else {
return all__q.bind(this)(function (val) {
return other['has'](val);});
};};
Array.prototype[Equal] = function (other) {
if (truthy(negate.call((other instanceof Array)))) {
return false;
} else if (other['length'] !== this['length']) {
return false;
} else {
return all__q.bind(zip.bind(this)(other))(function ([a, b]) {
return equals__q.call(a, b);});
};};
let record_equals__q = doc(function record_equals__q(other) {
if (truthy(this['constructor'] !== other['constructor'])) {
return false;
} else if (negate.call(equals__q.call(len.bind(this)(), len.bind(other)()))) {
return false;
} else {
return all__q.bind(this)(function ([key, value]) {
return equals__q.call(at.bind(other)(key), value);});
};}, "determine if 2 records of any kind are equal");
Map.prototype[Equal] = record_equals__q;
ObjectLiteral.prototype[Equal] = record_equals__q;
let equals__q = compose(def_call, def_global, F => doc(F, `
[[Equal]] invocation

Examples:
  1::equals?(1) // true
  // is the same as
  1 == 1 // true
`))(function equals__q(other) {
return this?.[Equal](other) ?? this === other;})
const Plus = Symbol("Plus");
globalThis['[]='].call(globalThis, [Keyword.for("Plus")], Plus)
const Negate = Symbol("Negate");
globalThis['[]='].call(globalThis, [Keyword.for("Negate")], Negate)
const Minus = Symbol("Minus");
globalThis['[]='].call(globalThis, [Keyword.for("Minus")], Minus)
const Times = Symbol("Times");
globalThis['[]='].call(globalThis, [Keyword.for("Times")], Times)
const Divide = Symbol("Divide");
globalThis['[]='].call(globalThis, [Keyword.for("Divide")], Divide)
const Exponent = Symbol("Exponent");
globalThis['[]='].call(globalThis, [Keyword.for("Exponent")], Exponent)
const Mod = Symbol("Mod");
globalThis['[]='].call(globalThis, [Keyword.for("Mod")], Mod)
const Comparable = Symbol("Comparable");
globalThis['[]='].call(globalThis, [Keyword.for("Comparable")], Comparable)
const LessThan = Symbol("LessThan");
globalThis['[]='].call(globalThis, [Keyword.for("LessThan")], LessThan)
const And = Symbol("And");
globalThis['[]='].call(globalThis, [Keyword.for("And")], And)
const Or = Symbol("Or");
globalThis['[]='].call(globalThis, [Keyword.for("Or")], Or)
let expect_primitive_type__b = doc(function expect_primitive_type__b(type_str) {
if (truthy(typeof(this) !== type_str)) {
raise__b(new Error(str("Expected ", type_str)))
};}, "raise! if 'this' isn't a 'type_str'");
Object.prototype[Negate] = function () {
return js_negate(this);};
Object.prototype[And] = function (thunk) {
return js_and(this, thunk);};
Object.prototype[Or] = function (thunk) {
return js_or(this, thunk);};
Set.prototype[Plus] = function (other_set) {
return concat.bind(this)(other_set);};
Array.prototype[Plus] = function (arr) {
return concat.bind(this)(arr);};
Number.prototype[Plus] = function (other) {
expect_primitive_type__b.bind(other)("number")
return js_plus(this, other);};
Number.prototype[Minus] = function (other) {
expect_primitive_type__b.bind(other)("number")
return js_minus(this, other);};
Number.prototype[Times] = function (other) {
expect_primitive_type__b.bind(other)("number")
return js_times(this, other);};
Number.prototype[Divide] = function (other) {
expect_primitive_type__b.bind(other)("number")
return js_divide(this, other);};
Number.prototype[Exponent] = function (other) {
expect_primitive_type__b.bind(other)("number")
return js_exponent(this, other);};
Number.prototype[Mod] = function (other) {
expect_primitive_type__b.bind(other)("number")
return js_mod(this, other);};
BigInt.prototype[Plus] = function (other) {
expect_primitive_type__b.bind(other)("bigint")
return js_plus(this, other);};
BigInt.prototype[Minus] = function (other) {
expect_primitive_type__b.bind(other)("bigint")
return js_minus(this, other);};
BigInt.prototype[Times] = function (other) {
expect_primitive_type__b.bind(other)("bigint")
return js_times(this, other);};
BigInt.prototype[Divide] = function (other) {
expect_primitive_type__b.bind(other)("bigint")
return js_divide(this, other);};
BigInt.prototype[Exponent] = function (other) {
expect_primitive_type__b.bind(other)("bigint")
return js_exponent(this, other);};
BigInt.prototype[Mod] = function (other) {
expect_primitive_type__b.bind(other)("bigint")
return js_mod(this, other);};
Number.prototype[Comparable] = new ObjectLiteral({['greater_than_eq'](other) {
expect_primitive_type__b.bind(other)("number")
return js_greater_than_eq(this, other);
}, ['less_than_eq'](other) {
expect_primitive_type__b.bind(other)("number")
return js_less_than_eq(this, other);
}, ['greater_than'](other) {
expect_primitive_type__b.bind(other)("number")
return js_greater_than(this, other);
}, ['less_than'](other) {
expect_primitive_type__b.bind(other)("number")
return js_less_than(this, other);
}});
BigInt.prototype[Comparable] = new ObjectLiteral({['greater_than_eq'](other) {
expect_primitive_type__b.bind(other)("bigint")
return js_greater_than_eq(this, other);
}, ['less_than_eq'](other) {
expect_primitive_type__b.bind(other)("bigint")
return js_less_than_eq(this, other);
}, ['greater_than'](other) {
expect_primitive_type__b.bind(other)("bigint")
return js_greater_than(this, other);
}, ['less_than'](other) {
expect_primitive_type__b.bind(other)("bigint")
return js_less_than(this, other);
}});
String.prototype[Plus] = function (other) {
expect_primitive_type__b.bind(other)("string")
return js_plus(this, other);};
String.prototype[Times] = function (amount) {
expect_primitive_type__b.bind(amount)("number")
return this['repeat'](amount);};
String.prototype[Comparable] = new ObjectLiteral({['greater_than_eq'](other) {
expect_primitive_type__b.bind(other)("string")
return js_greater_than_eq(this, other);
}, ['less_than_eq'](other) {
expect_primitive_type__b.bind(other)("string")
return js_less_than_eq(this, other);
}, ['greater_than'](other) {
expect_primitive_type__b.bind(other)("string")
return js_greater_than(this, other);
}, ['less_than'](other) {
expect_primitive_type__b.bind(other)("string")
return js_less_than(this, other);
}});
let plus = compose(def_call, def_global, F => doc(F, `
[[Plus]] method for '+' infix operator

Examples:
  1::plus(2) == 1 + 2
`))(function plus(other) {
return this['[]'].call(this, Plus)(other);})
let negate = compose(def_call, def_global, F => doc(F, `
[[Negate]] method for '!' prefix operator

Examples:
  !true == true::negate()
`))(function negate() {
return this?.[Negate]() ?? true;})
let minus = compose(def_global, F => doc(F, `
[[Minus]] method for '-' infix operator

Examples:
  1::minus(2) == 1 - 2
`))(function minus(other) {
return this['[]'].call(this, Minus)(other);})
let times = compose(def_global, F => doc(F, `
[[Times]] method for '*' infix operator

Examples:
  2::times(3) == 2 * 3
`))(function times(other) {
return this['[]'].call(this, Times)(other);})
let divide_by = compose(def_global, F => doc(F, `
[[Divide]] method for '/' infix operator

Examples:
  2::divide_by(3) == 2 / 3
`))(function divide_by(other) {
return this['[]'].call(this, Divide)(other);})
let exponent = compose(def_global, F => doc(F, `
[[Exponent]] method for '**' infix operator

Examples:
  2::exponent(3) == 2 ** 3
`))(function exponent(other) {
return this['[]'].call(this, Exponent)(other);})
let mod = compose(def_global, F => doc(F, `
[[Mod]] method for '%' infix operator

Examples:
  11::mod(2) == 11 % 2
`))(function mod(other) {
return this['[]'].call(this, Mod)(other);})
let greater_than = compose(def_global, F => doc(F, `
[[Comparable]].greater_than method for '>' infix operator

Examples:
  2::greater_than(1) == 2 > 1
`))(function greater_than(other) {
return this['[]'].call(this, Comparable)['greater_than']['call'](this, other);})
let greater_than_eq = compose(def_global, F => doc(F, `
[[Comparable]].greater_than_eq method for '>=' infix operator

Examples:
  2::greater_than_eq(2) == 2 >= 2
`))(function greater_than_eq(other) {
return this['[]'].call(this, Comparable)['greater_than_eq']['call'](this, other);})
let less_than = compose(def_global, F => doc(F, `
[[Comparable]].less_than method for '<' infix operator

Examples:
  2::less_than(3) == 2 < 3
`))(function less_than(other) {
return this['[]'].call(this, Comparable)['less_than']['call'](this, other);})
let less_than_eq = compose(def_global, F => doc(F, `
[[Comparable]].less_than_eq method for '<=' infix operator

Examples:
  2::less_than_eq(2) == 2 <= 3
`))(function less_than_eq(other) {
return this['[]'].call(this, Comparable)['less_than_eq']['call'](this, other);})
let and = compose(def_global, F => doc(F, `
[[And]] method for '&&' infix operator

Examples:
  true::and(fn = :val) == true && :val
`))(function and(thunk) {
return this?.[And](thunk);})
let or = compose(def_global, F => doc(F, `
[[Or]] method for '||' infix operator

Examples:
  false::or(fn = :val) == false || :val
`))(function or(thunk) {
return this?.[Or](thunk) ?? thunk();})
const JsLogFriendly = Symbol("JsLogFriendly");
globalThis['[]='].call(globalThis, [Keyword.for("JsLogFriendly")], JsLogFriendly)
ObjectLiteral.prototype[JsLogFriendly] = function () {
return into.bind(this)(Object);};
Map.prototype[JsLogFriendly] = function () {
return into.bind(map.bind(this)(function ([k, v]) {
return [js_log_friendly.bind(k)(), js_log_friendly.bind(v)()];}))(construct_record.call(Map, []));};
Array.prototype[JsLogFriendly] = function () {
return into.bind(map.bind(this)(js_log_friendly))([]);};
Set.prototype[JsLogFriendly] = function () {
return str("#{", join.bind(map.bind(this)(js_log_friendly, as_str))(", "), "}");};
Keyword.prototype[JsLogFriendly] = function () {
return str(":", this['value']);};
Boolean.prototype[JsLogFriendly] = function () {
return this;};
String.prototype[JsLogFriendly] = function () {
return this;};
Function.prototype[JsLogFriendly] = function () {
return this;};
let js_log_friendly = compose(def_global, def_call)(function js_log_friendly() {
return this?.[JsLogFriendly]();})
let log = compose(def_global, def_call)(function log(...args) {
console['log'](...args, this)
return this;})
let str = def_global(function str(...args) {
return args['join']("");});
let nan__q = compose(def_global, def_call)(function nan__q() {
return Number['isNaN'](this);})
let num__q = compose(def_global, def_call)(function num__q() {
return equals__q.call(typeof(this), "number");})
let bigint__q = compose(def_global, def_call)(function bigint__q() {
return equals__q.call(typeof(this), "bigint");})
let str__q = compose(def_global, def_call)(function str__q() {
return equals__q.call(typeof(this), "string");})
let as_keyword = compose(def_global, def_call)(function as_keyword() {
return Keyword['[]'].call(Keyword, "for")(this['toString']());})
let as_num = compose(def_global, def_call)(function as_num() {
return Number(this);})
let as_str = compose(def_global, def_call)(function as_str() {
return this?.toString() ?? "";})
let exists__q = compose(def_global, def_call)(function exists__q() {
return negate.call(nil__q.bind(this)());})
let Underscore = def_global(function Underscore(transforms) {
this.transforms = transforms;
});
const UnderscoreInterpreter = Symbol("UnderscoreInterpreter");
globalThis['[]='].call(globalThis, [Keyword.for("UnderscoreInterpreter")], UnderscoreInterpreter)
let _ = new Underscore([new ObjectLiteral({'f': function id() {
return this;}, 'args': []})]);
globalThis['[]='].call(globalThis, [Keyword.for("_")], _)
Underscore.prototype[Keyword.for("insert")] = function (f, ...args) {
return new Underscore(push.bind(this['transforms'])(new ObjectLiteral({'f':f, 'args':args})));};
Object.prototype[UnderscoreInterpreter] = function (underscore) {
let initial_value = this;
let result = initial_value;
for  (let {'f': f, 'args': args} of underscore['transforms']) {
result = call.bind(f.bind(result))(...args)
if (truthy(result instanceof Underscore)) {
result = call.bind(result)(initial_value)
};
};
return result;};
Underscore.prototype[Call] = function (data, ...args) {
if (truthy(nil__q.bind(data)())) {
return js_lookup_property_key(Object, UnderscoreInterpreter)['call'](data, this, ...args);
} else {
return data['[]'].call(data, UnderscoreInterpreter)(this, ...args);
};};
Underscore.prototype[Comparable] = new ObjectLiteral({['less_than'](val) {
return this['insert'](less_than, val);
}, ['greater_than'](val) {
return this['insert'](greater_than, val);
}, ['less_than_eq'](val) {
return this['insert'](less_than_eq, val);
}, ['greater_than_eq'](val) {
return this['insert'](greater_than_eq, val);
}});
Underscore.prototype[Negate] = function () {
return this['insert'](negate);};
Underscore.prototype[Equal] = function (other) {
return this['insert'](equals__q, other);};
Underscore.prototype[Collection] = new ObjectLiteral({['at'](key) {
return this['insert'](at, key);
}, ['has?'](k) {
return this['insert'](has__q, k);
}, ['len']() {
return this['insert'](len);
}, ['empty?']() {
return this['insert'](empty__q);
}});
Underscore.prototype[Record] = new ObjectLiteral({['insert'](key, value) {
return this['insert'](insert, key, value);
}, ['merge'](other) {
return this['insert'](merge, other);
}, ['keys']() {
return this['insert'](keys);
}, ['values']() {
return this['insert'](values);
}});
Underscore.prototype[OrderedSequence] = new ObjectLiteral({['prepend'](value) {
return this['insert'](prepend, value);
}, ['update_at'](idx, callable) {
return this['insert'](update_at, idx, callable);
}, ['insert_at'](idx, val) {
return this['insert'](insert_at, idx, val);
}, ['first']() {
return this['insert'](first);
}, ['last']() {
return this['insert'](last);
}});
Underscore.prototype[Vector] = new ObjectLiteral({['push'](value) {
return this['insert'](push, value);
}, ['replace'](old_value, new_value) {
return this['insert'](has__q, old_value, new_value);
}, ['concat'](other) {
return this['insert'](concat, other);
}});
Underscore.prototype[Pipe] = function (f) {
return this['insert'](pipe, f);};
Underscore.prototype[And] = function (thunk) {
return this['insert'](and, thunk);};
Underscore.prototype[Or] = function (thunk) {
return this['insert'](or, thunk);};
Underscore.prototype[Plus] = function (other) {
return this['insert'](plus, other);};
Underscore.prototype[Minus] = function (other) {
return this['insert'](minus, other);};
Underscore.prototype[Times] = function (other) {
return this['insert'](times, other);};
Underscore.prototype[Divide] = function (other) {
return this['insert'](divide_by, other);};
Underscore.prototype[Exponent] = function (other) {
return this['insert'](exponent, other);};
Underscore.prototype[Mod] = function (other) {
return this['insert'](mod, other);};
Underscore.prototype[JsLogFriendly] = function () {
let fn_to_op = construct_record.call(Map, [["greater_than", ">"], ["greater_than_eq", ">="], ["less_than", "<"], ["less_than_eq", "<="], ["times", "*"], ["exponent", "**"], ["divide_by", "/"], ["plus", "+"], ["minus", "-"], ["mod", "%"], ["eq__q", "=="], ["and", "&&"], ["or", "||"]]);
return str("_", into.bind(map.bind(skip.bind(this['transforms'])((1)))(function ({'f': f, 'args': args}) {
let fn_name = js_log_friendly.bind(f)();
let __coil_if_let_temp = call.bind(fn_to_op)(fn_name);
if (truthy(__coil_if_let_temp)) {
let op = __coil_if_let_temp;
let [rhs] = args;
if (truthy(call.bind(new Set([and, or]))(f))) {
rhs = rhs()
};
return str(" ", op, " ", js_log_friendly.bind(rhs)());
} else {
let formatted_args = join.bind(map.bind(args)(js_log_friendly))(", ");
return str("::", fn_name, "(", formatted_args, ")");
};}))(""));};
const Inc = Symbol("Inc");
globalThis['[]='].call(globalThis, [Keyword.for("Inc")], Inc)
Number.prototype[Inc] = function () {
return plus.call(this,(1));};
BigInt.prototype[Inc] = function () {
return plus.call(this,Keyword.for("custom_number_literal/n")[CustomNumberLiteral](1));};
String.prototype[Inc] = function () {
return String['fromCharCode'](plus.call(this['charCodeAt']((0)),(1)));};
let inc = compose(def_call, def_global)(function inc() {
return this['[]'].call(this, Inc)();})
let IRange = compose(def_global, F => impl_equal(F, Keyword.for("start"), Keyword.for("end")))(function IRange(start, end) {
this.start = start;
this.end = end;
})
let ERange = compose(def_global, F => impl_equal(F, Keyword.for("start"), Keyword.for("end")))(function ERange(start, end) {
this.start = start;
this.end = end;
})
let IRangeNoMin = compose(def_global, F => impl_equal(F, Keyword.for("end")))(function IRangeNoMin(end) {
this.end = end;
})
let ERangeNoMax = compose(def_global, F => impl_equal(F, Keyword.for("start")))(function ERangeNoMax(start) {
this.start = start;
})
let ERangeNoMin = compose(def_global, F => impl_equal(F, Keyword.for("end")))(function ERangeNoMin(end) {
this.end = end;
})
IRange.prototype[Call] = function (value) {
return and.call(greater_than_eq.call(value,this['start']), () => less_than_eq.call(value,this['end']));};
ERange.prototype[Call] = function (value) {
return and.call(greater_than_eq.call(value,this['start']), () => less_than.call(value,this['end']));};
IRangeNoMin.prototype[Call] = function (value) {
return less_than_eq.call(value,this['end']);};
ERangeNoMax.prototype[Call] = function (value) {
return greater_than_eq.call(value,this['start']);};
ERangeNoMin.prototype[Call] = function (value) {
return less_than.call(value,this['end']);};
IRange.prototype[JsLogFriendly] = function () {
return str(this['start'], "..=", this['end']);};
ERange.prototype[JsLogFriendly] = function () {
return str(this['start'], "..", this['end']);};
IRangeNoMin.prototype[JsLogFriendly] = function () {
return str("..=", this['end']);};
ERangeNoMax.prototype[JsLogFriendly] = function () {
return str(this['start'], "..");};
ERangeNoMin.prototype[JsLogFriendly] = function () {
return str("..", this['end']);};
IRange.prototype[Symbol['iterator']] = function *() {
let {'start': i, 'end': end} = this;
while (less_than_eq.call(i,end)) {
yield i
i = inc.bind(i)()
};};
ERange.prototype[Symbol['iterator']] = function *() {
let {'start': i, 'end': end} = this;
while (less_than.call(i,end)) {
yield i
i = inc.bind(i)()
};};
ERangeNoMax.prototype[Symbol['iterator']] = function *() {
let i = this['start'];
while (true) {
yield i
i = inc.bind(i)()
};};
let def_vector = def_global(function def_vector(Constructor) {
Constructor[Vector] = function (args) {
return new Constructor(...args);};
return Constructor;});
let def_record = compose(def_global, F => doc(F, `
Defines a basic record type for a given constructor.

Important! make sure your constructor has its entries stored at this.entries.

Example:
  @def_record
  fn ArrayMap(@entries) {}

  let name->role = ~ArrayMap{
    \"marcelle rusu\" => \"coil language designer\"
  }

  // note that in this most minimal use, def_record isn't super useful.
  // let's take a look at something more practical

  @def_record
  fn CallMap(@entries) {}

  impl Call for CallMap = fn(val) =
    ::find(fn([key]) = key::call(val))
    ::pipe(1)

  let score->letter_grade = ~CallMap{
    ..50 => :F
    50..60 => :D
    60..70 => :C
    70..80 => :B
    80.. => :A
  }
  score->letter_grade::call(60) // :C
`))(function def_record(Constructor) {
Constructor[Record] = function (entries) {
return new Constructor(entries);};
Constructor.prototype[Symbol['iterator']] = function () {
return iter.bind(this['entries'])();};
return Constructor;})
let char_alpha__q = plus.call(into.bind((new IRange("a", "z")))(new Set([])),into.bind((new IRange("A", "Z")))(new Set([])));
let char_numeric__q = into.bind((new IRange("0", "9")))(new Set([]));
let char_alpha_numeric__q = plus.call(char_alpha__q,char_numeric__q);
globalThis['[]='].call(globalThis, [Keyword.for("char_alpha__q")], char_alpha__q)
globalThis['[]='].call(globalThis, [Keyword.for("char_numeric__q")], char_numeric__q)
globalThis['[]='].call(globalThis, [Keyword.for("char_alpha_numeric__q")], char_alpha_numeric__q)
let alpha__q = compose(def_global, F => doc(F, "all characters in string are in a-z or A-Z"))(function alpha__q() {
return all__q.bind(this)(char_alpha__q);})
let alpha_numeric__q = compose(def_global, F => doc(F, "all characters in string are in a-z or A-Z or 0-9"))(function alpha_numeric__q() {
return all__q.bind(this)(char_alpha_numeric__q);})
let CallMap = compose(def_record, def_global)(function CallMap(entries) {
this.entries = entries;
})
CallMap.prototype[Call] = function (value) {
return pipe.bind(find.bind(this)(function ([callable, _]) {
return call.bind(callable)(value);}))(function ([_, val]) {
return val;});};import client from "./client.js";
import * as coil from "npm:@coil-lang/compiler";
function Model(name, fields) {
this.name = name;
this.fields = fields;
}
Model["{}"] = function (entries) {
let name = pipe.bind(find.bind(entries)((0), equals__q.call(_, Keyword.for("table_name"))))((1));
let fields = into.bind(keep.bind(entries)((0), negate.call(equals__q.call(_, Keyword.for("table_name")))))([]);
return new Model(name, fields);};
let Todos = Model['{}'].call(Model, [[Keyword.for("table_name"), "Todos"], [Keyword.for("title"), Keyword.for("string")], [Keyword.for("description"), Keyword.for("string")]]);
const Query = Symbol("Query");
Model.prototype[Query] = new ObjectLiteral({['all']() {
return client['queryArray'](str("SELECT id, ", join.bind(map.bind(this['fields'])((0), as_str))(", "), " FROM ", this['name']))['then'](function ({'rows': rows}) {
return map.bind(rows)(function (row) {
return into.bind(zip.bind([Keyword.for("id"), ...map.bind(this['fields'])((0))])(row))(new ObjectLiteral({}));}.bind(this));}.bind(this));
}});
function query_all() {
return this['[]'].call(this, Query)['all']['call'](this);}
let array_result = await query_all.bind(Todos)();
console['log'](into.bind(array_result)([]))
async function read_coil_file(path) {
let ast = await Deno['readTextFile'](path)['then'](coil['compile']);
let component = find.bind(ast)(Keyword.for("type"), Keyword.for("value"), new Set(["export_default"]))['expr'];
return new ObjectLiteral({'name': component['name'], 'string': coil['eval_ast']([component])});}
async function read_coil_component_file(path) {
let ast = await Deno['readTextFile'](path)['then'](coil['lex_and_parse']);
let component = find.bind(ast)(Keyword.for("type"), Keyword.for("value"), new Set(["export_default"]))['expr'];
return new ObjectLiteral({'name': component['name'], 'string': coil['eval_ast']([component])});}
let Routes = Map['{}'].call(Map, []);
for await  (let {'name': name} of Deno['readDir']("./view")) {
let model_map = Map['{}'].call(Map, []);
for await  (let {'name': component_name} of Deno['readDir'](str("./view/", name))) {
model_map['set'](component_name['split'](".coil")['[]'].call(component_name['split'](".coil"), (0)), str("./view/", name, "/", component_name))
};
Routes['set'](name, model_map)
};
console['log']("routes", Routes)
let server = Deno['listen'](new ObjectLiteral({'port': (8080)}));
console['log']("HTTP webserver running.  Access it at:  http://localhost:8080/")
let coil_react_boilerplate = await Deno['readTextFile']("./boilerplate/coil_react.js");
for await  (let conn of server) {
serveHttp(conn)
};
async function server_request(url) {
let path = pipe.bind(Routes)(...skip.bind(url['pathname']['split']("/"))((1)));
if (truthy(nil__q.bind(path)())) {
return;
};
let component = await read_coil_component_file(path);
let react = `
    <script crossorigin src='https://unpkg.com/react@18/umd/react.development.js'></script>
    <script crossorigin src='https://unpkg.com/react-dom@18/umd/react-dom.development.js'></script>
    <script crossorigin src='https://www.unpkg.com/@coil-lang/compiler@0.0.9/dist/prelude.js'></script>
  `;
let data_for_request = new ObjectLiteral({'name': "marcelle"});
let mounting_code = str(`
    ReactDOM
      .createRoot(document.getElementById('app'))
      .render(to_react_child.call(`, component['name'], "(new ObjectLiteral(", JSON['stringify'](data_for_request), `))));
  `);
return str(`
    <html>
      <head>`, react, `</head>
      <body><div id='app'></div></body>
      <script>
        'use strict';`, coil_react_boilerplate, ";", component['string'], ";", mounting_code, `</script>
    </html>
  `);}
async function serveHttp(conn) {
let httpConn = Deno['serveHttp'](conn);
for await  (let requestEvent of httpConn) {
requestEvent['respondWith'](new Response(await server_request(new URL(requestEvent['request']['url'])), new ObjectLiteral({'status': (200), 'headers': new Headers([["Content-Type", "text/html"]])})))
};}