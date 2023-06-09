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
  console.log(err);
  throw err;
}

globalThis["raise__b"] = raise__b;
globalThis["Keyword"] = Keyword;
globalThis["ObjectLiteral"] = ObjectLiteral;
globalThis["truthy"] = truthy;
const Meta = Symbol("Meta");
globalThis['Meta'] = Meta
Object.prototype[Meta] = new ObjectLiteral({["[]"]: function (...keys) {
return reduce.bind(keys)(js_dynamic_object_lookup, this);}, ["[]="]: function (keys, expr) {
return js_set_property(this, keys, expr);}});
Function.prototype[Meta] = new ObjectLiteral({["[]"]: function (...args) {
return Reflect['construct'](this, args);}, ["{}"]: function (entries) {
return Reflect['construct'](this, [entries]);}});
Set[Meta] = new ObjectLiteral({["[]"]: function (...elems) {
return Reflect['construct'](Set, [elems]);}});
function def_global(f) {
let resolved_name = f['name']['replaceAll']("?", "__q")['replaceAll']("!", "__b")['replaceAll'](">", "_lt_")['replaceAll']("-", "_");
globalThis[resolved_name] = f
return f;}
const CustomNumberLiteral = Symbol("CustomNumberLiteral");
globalThis['CustomNumberLiteral'] = CustomNumberLiteral
Keyword.for("custom_number_literal/n")[CustomNumberLiteral] = BigInt;
const Doc = Symbol("Doc");
globalThis['Doc'] = Doc
let doc = def_global(function doc(f, doc_str) {
f[Doc] = doc_str['trim']();
return f;});
const Nullish = Symbol("Nullish");
globalThis['Nullish'] = Nullish
function nullish(thunk) {
return js_nullish(this?.[Nullish](thunk), thunk);}
Object.prototype[Nullish] = function (thunk) {
return js_nullish(this, thunk);};
let log_doc = def_global(function log_doc() {
if (truthy(this['name'])) {
console['log'](str("# ", this['name']))
};
console['log'](this[Doc])
return this;});
const Call = Symbol("Call");
globalThis['Call'] = Call
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
return this[key];};
Array.prototype[Call] = function (index) {
return this['at'](index);};
String.prototype[Call] = function (collection) {
if (truthy(or.call(typeof(collection) === "string", () => collection instanceof Keyword))) {
raise__b(TypeError[Meta]['[]'].call(TypeError, plus.call("Can't 'call' a string with ",as_str.bind(collection)())))
} else {
return call.bind(collection)(this);
};};
Number.prototype[Call] = function (collection) {
if (truthy(collection instanceof Number)) {
raise__b(TypeError[Meta]['[]'].call(TypeError, "Can't call a number on a number"))
} else if (collection instanceof Keyword) {
return this[Meta]['[]'].call(this, collection);
} else {
return call.bind(collection)(this);
};};
Keyword.prototype[Call] = function (collection) {
if (truthy(or.call(collection instanceof Keyword, () => typeof(collection) === "string"))) {
raise__b(TypeError[Meta]['[]'].call(TypeError, plus.call("Can't 'call' a keyword with",as_str.bind(collection)())))
} else if (collection[Call]) {
return call.bind(collection)(this);
} else {
return collection[Meta]['[]'].call(collection, this);
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
let nil__q = Object['freeze'](Set[Meta]['[]'].call(Set, undefined, null));
const Pipe = Symbol("Pipe");
globalThis['Pipe'] = Pipe
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
return or.call(this?.[Symbol['iterator']](), () => iter.bind([])());})
let iter__q = compose(def_call, F => doc(F, `
Determines if 'this' is a valid Symbol.iterator

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol for more
`))(function iter__q() {
return iter.bind(this)() === this;})
const Iterator = Symbol("Iterator");
globalThis['Iterator'] = Iterator
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
let gen_states = into.bind(map.bind(generators)(function (state) {
return state['next']();}))([]);
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
    ::into(Map{})
  // -> Map{axe: 3, hammer: 1, pickaxe: 4}
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
let select = map;
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
    ::find(Set[4 5]) // 4
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
let where = keep;
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
  [1 2 3 4 5]::any?(Set[3]) // true
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
    ::split(Set[`, `])
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
globalThis['Into'] = Into
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
    ::into(Set[]) // Set[1 2 3 4]

  [[:score 10] [:grade :bad]]
    ::into({}) // {score: 20, grade: :bad}
`))(function into(output) {
return output[Meta]['[]'].call(output, Into)(this);})
const Collection = Symbol("Collection");
globalThis['Collection'] = Collection
ObjectLiteral.prototype[Collection] = new ObjectLiteral({['at'](key) {
return this[key];
}, ['len']() {
return Object['keys'](this)['length'];
}, ['empty?']() {
return len.bind(this)() === (0);
}, ['has?'](key) {
return exists__q.bind(this[key])();
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
  Set[1 2 3]::len() // 3
  {a: 10}::len() // 1
  Map{a: :a, b: :b}::len() // 2
`))(function len() {
return this[Collection]['len']['call'](this);})
let empty__q = compose(def_call, def_global, F => doc(F, `
determines if a collection is empty

Examples:
  []::empty?() // true
  Set[1]::empty?() // false
  null::empty?() // true
  `, `::empty?() // true
`))(function empty__q() {
return js_nullish(this?.[Collection]['empty?']['call'](this), function () {
return true;});})
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
  Set[4 3 1]::at(4) // 4
  // keywords coerce to strings for objects
  {a: 10}::at(:a) // 10
  {a: 10}::at(\"a\") // 10
  Map{a: 10}::at(:a) // 10
  // strings can not lookup keywords in maps
  Map{a: 10}::at(\"a\") // undefined
`))(function at(key_or_idx) {
return this[Collection]['at']['call'](this, key_or_idx);})
let has__q = compose(def_global, F => doc(F, `
determines if a collection has a value

Examples:
  [1 2 3 4]::has?(3) // true
  Set[1 2 3]::has?(2) // true
  {a: 10}::has?(:a) // true
`))(function has__q(val) {
return this[Collection]['has?']['call'](this, val);})
let in__q = compose(def_global, F => doc(F, "Inverse of ::has?"))(function in__q(coll) {
return has__q.bind(coll)(this);})
const Record = Symbol("Record");
globalThis['Record'] = Record
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
return Map[Meta]['{}'].call(Map, [...this, [key, value]]);
}, ['merge'](other) {
return Map[Meta]['{}'].call(Map, [...this, ...other]);
}, ['keys']() {
return this['keys']();
}, ['values']() {
return this['values']();
}});
let keys = compose(def_call, def_global, F => doc(F, `
Get keys of a record as an iterator OR a collection

Example:
  {a: 10}::keys() // [\"a\"]
  Map{a: 10}::keys()::into(Set[]) // Set[:a]
`))(function keys() {
return this[Record]['keys']['call'](this);})
let values = compose(def_call, def_global, F => doc(F, `
Get values of a record as an iterator OR a collection

Example:
  {a: 10}::values() // [10]
  Map{a: 10}::values()::into(Set[]) // Set[10]
`))(function values() {
return this[Record]['values']['call'](this);})
let insert = compose(def_global, F => doc(F, `
Insert key & value into a record

Example:
  {a: 10}::insert(:b 20) // {a: 10, b: 20}
  Map{a: 10}::insert(:b 20) // Map{a: 10, b: 20}
`))(function insert(key, value) {
return this[Record]['insert']['call'](this, key, value);})
let merge = compose(def_global, F => doc(F, `
Merge 2 records together

Note that since all object literal keys are strings, merging a
richer record that can hold keywords may have unexpected consequences

Do not merge a rich record type with a non rich record unless you are ok
with lossy conversions.

Example:
  {a: 10}::merge({b: 20}) {a: 10 b: 20}
  {a: 10}::merge({a: 20})
  Map{a: 10}::merge(Map{a: 20}) // Map{a: 20}
  // here's the unexpected result
  Map{a: 10}::merge({a: 20}) // Map{a: 10, \"a\" => 20}
`))(function merge(other) {
return this[Record]['merge']['call'](this, other);})
let record__q = compose(def_global, F => doc(F, `
Determines if 'this' is a record

Examples:
  {}::record?() // true
  Map{}::record?() // true
  Set[]::record?() // false
`))(function record__q() {
return exists__q.bind(this[Record])();})
const Bag = Symbol("Bag");
globalThis['Bag'] = Bag
let bag__q = compose(def_global, F => doc(F, `
Determines if 'this' conforms to the 'Bag' protocol

Examples:
  []::bag?() // true
  Set[]::bag?() // true
  {}::bag?() // false
`))(function bag__q() {
return exists__q.bind(this[Bag])();})
Array.prototype[Bag] = new ObjectLiteral({['push'](val) {
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
Set.prototype[Bag] = new ObjectLiteral({['push'](value) {
return Set[Meta]['[]'].call(Set, ...this, value);
}, ['replace'](old_val, new_val) {
let self = Set[Meta]['[]'].call(Set, ...this);
self['delete'](old_value)
self['add'](new_val)
return self;
}, ['concat'](other) {
return Set[Meta]['[]'].call(Set, ...this, ...other);
}});
String.prototype[Bag] = new ObjectLiteral({['push'](val) {
return plus.call(this,val);
}, ['replace'](old_substr, new_substr) {
return this['replaceAll'](old_substr, new_substr);
}, ['concat'](other) {
return plus.call(this,other);
}});
let push = compose(def_global, F => doc(F, `
push a value onto a bag

Examples:
  [1 2]::push(3) // [1 2 3]
  // order is not guaranteed for sets
  Set[1 2]::push(3) // Set[3 1 2]
`))(function push(val) {
return this[Bag]['push']['call'](this, val);})
let replace = compose(def_global, F => doc(F, `
replace a value in a bag

Examples:
  [1 2 3]::replace(2 3) // [1 3 3]
  Set[1 2 3]::replace(2 3) // Set[1 3]
`))(function replace(old_val, new_val) {
return this[Bag]['replace']['call'](this, old_val, new_val);})
let concat = compose(def_global, F => doc(F, `
concat two bags by swallowing the second one into the first

Examples:
  [1 2]::concat([3 4]) // [1 2 3 4]
  [1 2]::concat(Set[3 4]) // [1 2 4 3] - set order unknowable
  Set[1 2]::concat([3 4]) // Set[1 2 3 4]
  Set[1 2]::concat(Set[2 3]) // Set[1 2 3]
`))(function concat(other) {
return this[Bag]['concat']['call'](this, other);})
const OrderedSequence = Symbol("OrderedSequence");
globalThis['OrderedSequence'] = OrderedSequence
Array.prototype[OrderedSequence] = new ObjectLiteral({['prepend'](val) {
return [val, ...this];
}, ['update_at'](idx, f) {
let [before, after] = [take.bind(this)(idx), skip.bind(this)(plus.call(idx,(1)))];
return [...before, f(at.bind(this)(idx)), ...after];
}, ['insert_at'](idx, val) {
let [before, after] = [take.bind(this)(idx), skip.bind(this)(plus.call(idx,(1)))];
return [...before, val, ...after];
}, ['first']() {
return this[(0)];
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
return this[(0)];
}, ['last']() {
return this['at']((-1));
}});
let prepend = compose(def_global, F => doc(F, `
inserts element at beginning of collection

Examples:
  [1 2 3]::prepend(0) // [0 1 2 3]
`))(function prepend(val) {
return this[OrderedSequence]['prepend']['call'](this, val);})
let update_at = compose(def_global, F => doc(F, `
updates element at given index

Examples:
  [1 2 3]::update_at(1 as_keyword) // [1 :2 3]
`))(function update_at(idx, ...fns) {
return this[OrderedSequence]['update_at']['call'](this, idx, compose(...fns));})
let insert_at = compose(def_global, F => doc(F, `
inserts element at given index

Examples:
  [1 2 4]::insert_at(1 3) // [1 2 3 4]
`))(function insert_at(idx, val) {
return this[OrderedSequence]['insert_at']['call'](this, idx, val);})
let first = compose(def_call, def_global, F => doc(F, `
gets first element of collection

Examples:
  [1 2 3]::first() // 1
`))(function first() {
return this[OrderedSequence]['first']['call'](this);})
let last = compose(def_call, def_global, F => doc(F, `
gets last element of collection

Examples:
  [1 2 3]::last() // 3
`))(function last() {
return this[OrderedSequence]['last']['call'](this);})
const Equal = Symbol("Equal");
globalThis['Equal'] = Equal
let impl_equal = compose(def_global, F => doc(F, `
implement [[Equal]] for a generic constructor by
specifying the keys to measure equality by

Examples:
  fn Dog(@name, @age) {}

  Dog[\"joey\" 1] == Dog[\"joey\" 1] // false

  @impl_equal(:name :age)
  fn Dog(@name @age) {}

  Dog[\"joey\" 1] == Dog[\"joey\" 1] // true
`))(function impl_equal(Ctor, ...keys) {
Ctor.prototype[Equal] = function (other) {
return and.call(other instanceof Ctor, () => all__q.bind(keys)(function (key) {
return equals__q.call(this[key], other[key]);}.bind(this)));};
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
return js_or(this?.[Equal](other), function () {
return this === other;});})
const Plus = Symbol("Plus");
globalThis['Plus'] = Plus
const Negate = Symbol("Negate");
globalThis['Negate'] = Negate
const Minus = Symbol("Minus");
globalThis['Minus'] = Minus
const Times = Symbol("Times");
globalThis['Times'] = Times
const Divide = Symbol("Divide");
globalThis['Divide'] = Divide
const Exponent = Symbol("Exponent");
globalThis['Exponent'] = Exponent
const Mod = Symbol("Mod");
globalThis['Mod'] = Mod
const Comparable = Symbol("Comparable");
globalThis['Comparable'] = Comparable
const LessThan = Symbol("LessThan");
globalThis['LessThan'] = LessThan
const And = Symbol("And");
globalThis['And'] = And
const Or = Symbol("Or");
globalThis['Or'] = Or
let expect_primitive_type__b = doc(function expect_primitive_type__b(type_str) {
if (truthy(typeof(this) !== type_str)) {
raise__b(Error[Meta]['[]'].call(Error, str("Expected ", type_str)))
};}, "raise! if 'this' isn't a 'type_str'");
Object.prototype[Negate] = function () {
return js_negate(this);};
Object.prototype[And] = function (thunk) {
return js_and(this, thunk);};
Object.prototype[Or] = function (thunk) {
return js_or(this, thunk);};
Object.prototype[Nullish] = function (thunk) {
return js_nullish(this, thunk);};
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
return this[Plus](other);})
let negate = compose(def_call, def_global, F => doc(F, `
[[Negate]] method for '!' prefix operator

Examples:
  !true == true::negate()
`))(function negate() {
return js_nullish(this?.[Negate](), function () {
return true;});})
let minus = compose(def_global, F => doc(F, `
[[Minus]] method for '-' infix operator

Examples:
  1::minus(2) == 1 - 2
`))(function minus(other) {
return this[Minus](other);})
let times = compose(def_global, F => doc(F, `
[[Times]] method for '*' infix operator

Examples:
  2::times(3) == 2 * 3
`))(function times(other) {
return this[Times](other);})
let divide_by = compose(def_global, F => doc(F, `
[[Divide]] method for '/' infix operator

Examples:
  2::divide_by(3) == 2 / 3
`))(function divide_by(other) {
return this[Divide](other);})
let exponent = compose(def_global, F => doc(F, `
[[Exponent]] method for '**' infix operator

Examples:
  2::exponent(3) == 2 ** 3
`))(function exponent(other) {
return this[Exponent](other);})
let mod = compose(def_global, F => doc(F, `
[[Mod]] method for '%' infix operator

Examples:
  11::mod(2) == 11 % 2
`))(function mod(other) {
return this[Mod](other);})
let greater_than = compose(def_global, F => doc(F, `
[[Comparable]].greater_than method for '>' infix operator

Examples:
  2::greater_than(1) == 2 > 1
`))(function greater_than(other) {
return this[Comparable]['greater_than']['call'](this, other);})
let greater_than_eq = compose(def_global, F => doc(F, `
[[Comparable]].greater_than_eq method for '>=' infix operator

Examples:
  2::greater_than_eq(2) == 2 >= 2
`))(function greater_than_eq(other) {
return this[Comparable]['greater_than_eq']['call'](this, other);})
let less_than = compose(def_global, F => doc(F, `
[[Comparable]].less_than method for '<' infix operator

Examples:
  2::less_than(3) == 2 < 3
`))(function less_than(other) {
return this[Comparable]['less_than']['call'](this, other);})
let less_than_eq = compose(def_global, F => doc(F, `
[[Comparable]].less_than_eq method for '<=' infix operator

Examples:
  2::less_than_eq(2) == 2 <= 3
`))(function less_than_eq(other) {
return this[Comparable]['less_than_eq']['call'](this, other);})
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
return js_or(this?.[Or](thunk), thunk);})
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
return Keyword["for"](this['toString']());})
let as_num = compose(def_global, def_call)(function as_num() {
return Number(this);})
let as_str = compose(def_global, def_call)(function as_str() {
return js_or(this?.toString(), function () {
return "";});})
let exists__q = compose(def_global, def_call)(function exists__q() {
return negate.call(nil__q.bind(this)());})
let Underscore = def_global(function Underscore(...transforms) {
this['transforms'] = transforms});
Underscore.prototype[Meta] = new ObjectLiteral({["[]"]: function (...keys) {
return reduce.bind(keys)(function (under, f) {
return under['insert'](pipe, f);}, this);}});
const UnderscoreInterpreter = Symbol("UnderscoreInterpreter");
globalThis['UnderscoreInterpreter'] = UnderscoreInterpreter
let _ = Underscore[Meta]['[]'].call(Underscore, new ObjectLiteral({'f': function id() {
return this;}, 'args': []}));
globalThis['_'] = _
Underscore.prototype[Keyword.for("insert")] = function (f, ...args) {
return Underscore[Meta]['[]'].call(Underscore, ...this['transforms'], new ObjectLiteral({'f':f, 'args':args}));};
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
return data[UnderscoreInterpreter](this, ...args);
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
Underscore.prototype[Bag] = new ObjectLiteral({['push'](value) {
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
Underscore.prototype[Nullish] = function (thunk) {
return this['insert'](nullish, thunk);};
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
const Inc = Symbol("Inc");
globalThis['Inc'] = Inc
Number.prototype[Inc] = function () {
return plus.call(this,(1));};
BigInt.prototype[Inc] = function () {
return plus.call(this,Keyword.for("custom_number_literal/n")[CustomNumberLiteral](1));};
String.prototype[Inc] = function () {
return String['fromCharCode'](plus.call(this['charCodeAt']((0)),(1)));};
let inc = compose(def_call, def_global)(function inc() {
return this[Inc]();})
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
IRange.prototype[Collection] = new ObjectLiteral({['has?'](val) {
return call.bind(this)(val);
}});
ERange.prototype[Collection] = new ObjectLiteral({['has?'](val) {
return call.bind(this)(val);
}});
IRangeNoMin.prototype[Collection] = new ObjectLiteral({['has?'](val) {
return call.bind(this)(val);
}});
ERangeNoMax.prototype[Collection] = new ObjectLiteral({['has?'](val) {
return call.bind(this)(val);
}});
ERangeNoMin.prototype[Collection] = new ObjectLiteral({['has?'](val) {
return call.bind(this)(val);
}});
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
let char_alpha__q = plus.call(into.bind((new IRange("a", "z")))(Set[Meta]['[]'].call(Set, )),into.bind((new IRange("A", "Z")))(Set[Meta]['[]'].call(Set, )));
let char_numeric__q = into.bind((new IRange("0", "9")))(Set[Meta]['[]'].call(Set, ));
let char_alpha_numeric__q = plus.call(char_alpha__q,char_numeric__q);
globalThis['char_alpha__q'] = char_alpha__q
globalThis['char_numeric__q'] = char_numeric__q
globalThis['char_alpha_numeric__q'] = char_alpha_numeric__q
let alpha__q = compose(def_global, F => doc(F, "all characters in string are in a-z or A-Z"))(function alpha__q() {
return all__q.bind(this)(char_alpha__q);})
let alpha_numeric__q = compose(def_global, F => doc(F, "all characters in string are in a-z or A-Z or 0-9"))(function alpha_numeric__q() {
return all__q.bind(this)(char_alpha_numeric__q);})
let CallMap = def_global(function CallMap(entries) {
this.entries = entries;
});
CallMap.prototype[Call] = function (value) {
return pipe.bind(find.bind(this['entries'])(function ([callable, _]) {
return call.bind(callable)(value);}))(function ([_, val]) {
return val;});};