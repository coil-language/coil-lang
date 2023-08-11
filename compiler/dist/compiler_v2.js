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

function js_instanceof(lhs, rhs) {
  return lhs instanceof rhs;
}

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
Object[Meta] = new ObjectLiteral({["{}"]: Object['fromEntries']});
Function.prototype[Meta] = new ObjectLiteral({["[]"]: function (...args) {
return Reflect['construct'](this, args);}, ["{}"]: function (entries) {
return Reflect['construct'](this, [entries]);}});
Set[Meta] = new ObjectLiteral({["[]"]: function (...elems) {
return Reflect['construct'](Set, [elems]);}});
function inherit(f, ...Ctors) {
f['prototype'] = Object['assign'](f['prototype'], ...map.bind(Ctors)(function (x) {
return x['prototype'];}))
return f;}
function def_global(f, name) {
globalThis[name] = f
return f;}
const CustomNumberLiteral = Symbol("CustomNumberLiteral");
globalThis['CustomNumberLiteral'] = CustomNumberLiteral
Keyword.for("custom_number_literal/n")[CustomNumberLiteral] = BigInt;
const Doc = Symbol("Doc");
globalThis['Doc'] = Doc
let doc = def_global(function doc(f, doc_str) {
f[Doc] = doc_str['trim']();
return f;}, Keyword.for("doc"));
const Nullish = Symbol("Nullish");
globalThis['Nullish'] = Nullish
function nullish(thunk) {
return js_nullish(this?.[Nullish](thunk), thunk);}
globalThis['nullish'] = nullish
Object.prototype[Nullish] = function (thunk) {
return js_nullish(this, thunk);};
let log_doc = def_global(function log_doc() {
if (truthy(this['name'])) {
console['log'](str("# ", this['name']))
};
console['log'](this[Doc])
return this;}, Keyword.for("log_doc"));
const Call = Symbol("Call");
globalThis['Call'] = Call
function compose(first_fn, ...fns) {
return function (...args) {
let result = first_fn?.[Call](...args);
for  (let f of fns) {
result = f?.[Call](result)
};
return result;};}
compose = def_global(compose, Keyword.for("compose"))
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
raise__b(TypeError[Meta]['[]'].call(TypeError, plus.call("Can't 'call' a string with ", as_str.bind(collection)())))
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
raise__b(TypeError[Meta]['[]'].call(TypeError, plus.call("Can't 'call' a keyword with", as_str.bind(collection)())))
} else if (collection[Call]) {
return call.bind(collection)(this);
} else {
return collection[Meta]['[]'].call(collection, this);
};};
let call = compose(F => def_global(F, Keyword.for("call")), F => doc(F, `
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
globalThis['nil__q'] = nil__q
const Pipe = Symbol("Pipe");
globalThis['Pipe'] = Pipe
Object.prototype[Pipe] = function (callable) {
return call.bind(callable)(this);};
let pipe = compose(F => def_global(F, Keyword.for("pipe")), F => doc(F, `
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
let def_call = compose(F => def_global(F, Keyword.for("def_call")), F => doc(F, `
decorator to define [[Call]]

takes f, and applies first argument as the 'this' arg.

this is helpful when you are writing functions that rely on 'this'
and don't have any arguments.

example:
  fn first() = this[0]

  // I want this to work.. but it doesn't
  [[1] [2] [3]]::map(first) // Error

  // if I use @def-call we can do this
  @def-call
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
let fallback_iterator_impl = new ObjectLiteral({*['take'](n) {
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
if (truthy(less_than.call(i, n))) {
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
}, *['flat-map'](f) {
for  (let elem of this) {
times.call(yield, f(elem))
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
return or.call(this?.[Iterator], () => fallback_iterator_impl);}
let skip = compose(F => def_global(F, Keyword.for("skip")), F => doc(F, `
lazily skips 'n' elements for an iterator

Examples:
  [1 2 3 4 5]::skip(1)::into([]) // -> [2 3 4 5]
  [1 2 3]::skip(20)::into([]) // -> []
`))(function skip(n) {
return iterator_impl.bind(this)()['skip']['call'](iter.bind(this)(), n);})
let take = compose(F => def_global(F, Keyword.for("take")), F => doc(F, `
lazily takes 'n' elements for an iterator

Examples:
  [1 2 3 4]::take(2)::into([]) // -> [1 2]
  [1 2 3]::take(200)::into([]) // -> [1 2 3]
`))(function take(n) {
return iterator_impl.bind(this)()['take']['call'](iter.bind(this)(), n);})
let each = compose(F => def_global(F, Keyword.for("each")), F => doc(F, `
eagerly consumes an iterator by calling 'f' on each elem

Examples:
  [{name: \"bob\"} {name: \"jill\"}]
    ::each(:name log) // prints 'bob' and 'jill'
`))(function each(...fns) {
return iterator_impl.bind(this)()['each']['call'](iter.bind(this)(), compose(...fns));})
let until = compose(F => def_global(F, Keyword.for("until")), F => doc(F, `
lazily defines an end point for an iterator

Examples:
  [1 2 3 4 5 6 7]
    ::until(_ > 3)
    ::into([]) // [1 2 3]
`))(function until(...fns) {
return iterator_impl.bind(this)()['until']['call'](iter.bind(this)(), compose(...fns));})
let zip = compose(F => def_global(F, Keyword.for("zip")), F => doc(F, `
lazily zips together a number of iterators

Examples:
  [:axe :hammer :pickaxe]
    ::zip([3 1 4])
    ::into(Map{})
  // -> Map{axe: 3, hammer: 1, pickaxe: 4}
`))(function zip(...iterables) {
return iterator_impl.bind(this)()['zip']['call'](iter.bind(this)(), ...iterables);})
let map = compose(F => def_global(F, Keyword.for("map")), F => doc(F, `
lazily maps functions over an iterator

Examples:
  [{name: \"marcelle\"}, {name: \"jack\"}]
    ::map(:name len)
    ::into([]) // [8 4]
`))(function map(...fns) {
return iterator_impl.bind(this)()['map']['call'](iter.bind(this)(), compose(...fns));})
let select = map;
globalThis['select'] = select
let flat_map = compose(F => def_global(F, Keyword.for("flat_map")), F => doc(F, `
lazily flat maps functions over an iterator

Examples:
  [[1 5] [6 10]]
    ::flat-map(fn([start, end]) = (start..=end)::into([]))
    ::into([]) // [1 2 3 4 5 6 7 8 9 10]
`))(function flat_map(...fns) {
return iterator_impl.bind(this)()['flat-map']['call'](iter.bind(this)(), compose(...fns));})
let find = compose(F => def_global(F, Keyword.for("find")), F => doc(F, `
eagerly finds a value in an iterator

Examples:
  [1 2 3 4 5]
    ::find(Set[4 5]) // 4
`))(function find(...fns) {
return iterator_impl.bind(this)()['find']['call'](iter.bind(this)(), compose(...fns));})
let keep = compose(F => def_global(F, Keyword.for("keep")), F => doc(F, `
lazily keeps values based off a condition

Examples:
  [{admin: true, name: \"bob\"} {admin: false, name: \"jill\"}]
    ::keep(:admin)
    ::into([]) // [{admin: true, name: \"bob\"}]
`))(function keep(...fns) {
return iterator_impl.bind(this)()['keep']['call'](iter.bind(this)(), compose(...fns));})
let where = keep;
globalThis['where'] = where
let reject = compose(F => def_global(F, Keyword.for("reject")), F => doc(F, `
lazily rejects values based of a condition

Examples:
  [{admin: true, name: \"bob\"} {admin: false, name: \"jill\"}]
    ::reject(:admin)
    ::into([]) // [{admin: false, name: \"jill\"}]
`))(function reject(...fns) {
return keep.bind(this)(...fns, negate.call(_));})
let any__q = compose(F => def_global(F, Keyword.for("any__q")), F => doc(F, `
eagerly finds out if an element matches the condition

Examples:
  [1 2 3 4 5]::any?(Set[3]) // true
`))(function any__q(...fns) {
return iterator_impl.bind(this)()['any?']['call'](iter.bind(this)(), compose(...fns));})
let all__q = compose(F => def_global(F, Keyword.for("all__q")), F => doc(F, `
eagerly finds out all elements matches the condition

Examples:
  [1 2 3 4 5]::all?(_ > 0) // true
`))(function all__q(...fns) {
return iterator_impl.bind(this)()['all?']['call'](iter.bind(this)(), compose(...fns));})
let reduce = compose(F => def_global(F, Keyword.for("reduce")), F => doc(F, `
eagerly reduces an iterator

Examples:
  [1 2 3 4 5]::reduce(+ 0) // 15
`))(function reduce(f, start) {
return iterator_impl.bind(this)()['reduce']['call'](iter.bind(this)(), call.bind(f), start);})
let split = compose(F => def_global(F, Keyword.for("split")), F => doc(F, `
lazily splits an iterator

Examples:
  \"hey there buddy\"
    ::split(Set[`, `])
    ::take(2)
    ::into([]) // [\"hey\" \"there\"]
`))(function split(...fns) {
return iterator_impl.bind(this)()['split']['call'](iter.bind(this)(), compose(...fns));})
let compact = compose(F => def_global(F, Keyword.for("compact")), F => doc(F, `
lazily compacts an iterator

Examples:
  [{status: :great} {status: :broken} {}]
    ::map(:status)
    ::compact()
    ::into([]) // [:great :broken]
`))(function compact() {
return iterator_impl.bind(this)()['compact']['call'](iter.bind(this)());})
let join = compose(F => def_global(F, Keyword.for("join")), F => doc(F, `
eagerly joins an iterator

Examples:
  [\"hey\" \"there\"]
    ::join(\" \") // \"hey there\"
`))(function join(sep) {
return reduce.bind(this)(function (prev, cur) {
if (truthy(empty__q.bind(prev)())) {
return cur;
} else {
return plus.call(prev, plus.call(sep, cur));
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
return plus.call(this, reduce.bind(iterable)(plus, ""));};
Object[Into] = function (iterable) {
return Object['fromEntries'](iterable);};
let into = compose(F => def_global(F, Keyword.for("into")), F => doc(F, `
converts 'this' iterator into 'output', prepending existing values in 'output'

Examples:
  [1 2 3 4]
    ::into(Set[]) // Set[1 2 3 4]

  [[:score 10] [:grade :bad]]
    ::into({}) // {score: 20, grade: :bad}
`))(function into(output) {
if (truthy(this instanceof Underscore)) {
return this['insert'](into, output);
} else {
return output[Into](this);
};})
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
let len = compose(def_call, F => def_global(F, Keyword.for("len")), F => doc(F, `
gets length of a collection

Examples:
  [1 2 3]::len() // 3
  Set[1 2 3]::len() // 3
  {a: 10}::len() // 1
  Map{a: :a, b: :b}::len() // 2
`))(function len() {
return this[Collection]['len']['call'](this);})
let empty__q = compose(def_call, F => def_global(F, Keyword.for("empty__q")), F => doc(F, `
determines if a collection is empty

Examples:
  []::empty?() // true
  Set[1]::empty?() // false
  null::empty?() // true
  `, `::empty?() // true
`))(function empty__q() {
return js_nullish(this?.[Collection]['empty?']['call'](this), function () {
return true;});})
let not_empty__q = compose(def_call, F => def_global(F, Keyword.for("not_empty__q")), F => doc(F, `
determines if a collection is not empty

Examples:
  [1]::not-empty?() // true
  `, `::not-empty?() // false
  null::not-empty?() // false
`))(function not_empty__q() {
return negate.call(empty__q.bind(this)());})
let at = compose(F => def_global(F, Keyword.for("at")), F => doc(F, `
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
let has__q = compose(F => def_global(F, Keyword.for("has__q")), F => doc(F, `
determines if a collection has a value

Examples:
  [1 2 3 4]::has?(3) // true
  Set[1 2 3]::has?(2) // true
  {a: 10}::has?(:a) // true
`))(function has__q(val) {
return this[Collection]['has?']['call'](this, val);})
let in__q = compose(F => def_global(F, Keyword.for("in__q")), F => doc(F, "Inverse of ::has?"))(function in__q(coll) {
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
let keys = compose(def_call, F => def_global(F, Keyword.for("keys")), F => doc(F, `
Get keys of a record as an iterator OR a collection

Example:
  {a: 10}::keys() // [\"a\"]
  Map{a: 10}::keys()::into(Set[]) // Set[:a]
`))(function keys() {
return this[Record]['keys']['call'](this);})
let values = compose(def_call, F => def_global(F, Keyword.for("values")), F => doc(F, `
Get values of a record as an iterator OR a collection

Example:
  {a: 10}::values() // [10]
  Map{a: 10}::values()::into(Set[]) // Set[10]
`))(function values() {
return this[Record]['values']['call'](this);})
let insert = compose(F => def_global(F, Keyword.for("insert")), F => doc(F, `
Insert key & value into a record

Example:
  {a: 10}::insert(:b 20) // {a: 10, b: 20}
  Map{a: 10}::insert(:b 20) // Map{a: 10, b: 20}
`))(function insert(key, value) {
return this[Record]['insert']['call'](this, key, value);})
let merge = compose(F => def_global(F, Keyword.for("merge")), F => doc(F, `
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
let record__q = compose(F => def_global(F, Keyword.for("record__q")), F => doc(F, `
Determines if 'this' is a record

Examples:
  {}::record?() // true
  Map{}::record?() // true
  Set[]::record?() // false
`))(function record__q() {
return exists__q.bind(this[Record])();})
const Bag = Symbol("Bag");
globalThis['Bag'] = Bag
let bag__q = compose(F => def_global(F, Keyword.for("bag__q")), F => doc(F, `
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
return plus.call(this, val);
}, ['replace'](old_substr, new_substr) {
return this['replaceAll'](old_substr, new_substr);
}, ['concat'](other) {
return plus.call(this, other);
}});
let push = compose(F => def_global(F, Keyword.for("push")), F => doc(F, `
push a value onto a bag

Examples:
  [1 2]::push(3) // [1 2 3]
  // order is not guaranteed for sets
  Set[1 2]::push(3) // Set[3 1 2]
`))(function push(val) {
return this[Bag]['push']['call'](this, val);})
let replace = compose(F => def_global(F, Keyword.for("replace")), F => doc(F, `
replace a value in a bag

Examples:
  [1 2 3]::replace(2 3) // [1 3 3]
  Set[1 2 3]::replace(2 3) // Set[1 3]
`))(function replace(old_val, new_val) {
return this[Bag]['replace']['call'](this, old_val, new_val);})
let concat = compose(F => def_global(F, Keyword.for("concat")), F => doc(F, `
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
}, ['update-at'](idx, f) {
let [before, after] = [take.bind(this)(idx), skip.bind(this)(plus.call(idx, (1)))];
return [...before, f(at.bind(this)(idx)), ...after];
}, ['insert-at'](idx, val) {
let [before, after] = [take.bind(this)(idx), skip.bind(this)(plus.call(idx, (1)))];
return [...before, val, ...after];
}, ['first']() {
return this[(0)];
}, ['last']() {
return this['at']((-1));
}});
String.prototype[OrderedSequence] = new ObjectLiteral({['prepend'](val) {
return plus.call(val, this);
}, ['update-at'](idx, f) {
return plus.call(this['slice']((0), idx), plus.call(f(this['at'](idx)), this['slice'](idx)));
}, ['insert-at'](idx, val) {
return plus.call(this['slice']((0), idx), plus.call(val, this['slice'](idx)));
}, ['first']() {
return this[(0)];
}, ['last']() {
return this['at']((-1));
}});
let prepend = compose(F => def_global(F, Keyword.for("prepend")), F => doc(F, `
inserts element at beginning of collection

Examples:
  [1 2 3]::prepend(0) // [0 1 2 3]
`))(function prepend(val) {
return this[OrderedSequence]['prepend']['call'](this, val);})
let update_at = compose(F => def_global(F, Keyword.for("update_at")), F => doc(F, `
updates element at given index

Examples:
  [1 2 3]::update-at(1 as_keyword) // [1 :2 3]
`))(function update_at(idx, ...fns) {
return this[OrderedSequence]['update-at']['call'](this, idx, compose(...fns));})
let insert_at = compose(F => def_global(F, Keyword.for("insert_at")), F => doc(F, `
inserts element at given index

Examples:
  [1 2 4]::insert-at(1 3) // [1 2 3 4]
`))(function insert_at(idx, val) {
return this[OrderedSequence]['insert-at']['call'](this, idx, val);})
let first = compose(def_call, F => def_global(F, Keyword.for("first")), F => doc(F, `
gets first element of collection

Examples:
  [1 2 3]::first() // 1
`))(function first() {
return this[OrderedSequence]['first']['call'](this);})
let last = compose(def_call, F => def_global(F, Keyword.for("last")), F => doc(F, `
gets last element of collection

Examples:
  [1 2 3]::last() // 3
`))(function last() {
return this[OrderedSequence]['last']['call'](this);})
const Equal = Symbol("Equal");
globalThis['Equal'] = Equal
let impl_equal = compose(F => def_global(F, Keyword.for("impl_equal")), F => doc(F, `
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
let equals__q = compose(def_call, F => def_global(F, Keyword.for("equals__q")), F => doc(F, `
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
let plus = compose(def_call, F => def_global(F, Keyword.for("plus")), F => doc(F, `
[[Plus]] method for '+' infix operator

Examples:
  1::plus(2) == 1 + 2
`))(function plus(other) {
return this[Plus](other);})
let negate = compose(def_call, F => def_global(F, Keyword.for("negate")), F => doc(F, `
[[Negate]] method for '!' prefix operator

Examples:
  !true == true::negate()
`))(function negate() {
return js_nullish(this?.[Negate](), function () {
return true;});})
let minus = compose(F => def_global(F, Keyword.for("minus")), F => doc(F, `
[[Minus]] method for '-' infix operator

Examples:
  1::minus(2) == 1 - 2
`))(function minus(other) {
return this[Minus](other);})
let times = compose(F => def_global(F, Keyword.for("times")), F => doc(F, `
[[Times]] method for '*' infix operator

Examples:
  2::times(3) == 2 * 3
`))(function times(other) {
return this[Times](other);})
let divide_by = compose(F => def_global(F, Keyword.for("divide_by")), F => doc(F, `
[[Divide]] method for '/' infix operator

Examples:
  2::divide_by(3) == 2 / 3
`))(function divide_by(other) {
return this[Divide](other);})
let exponent = compose(F => def_global(F, Keyword.for("exponent")), F => doc(F, `
[[Exponent]] method for '**' infix operator

Examples:
  2::exponent(3) == 2 ** 3
`))(function exponent(other) {
return this[Exponent](other);})
let mod = compose(F => def_global(F, Keyword.for("mod")), F => doc(F, `
[[Mod]] method for '%' infix operator

Examples:
  11::mod(2) == 11 % 2
`))(function mod(other) {
return this[Mod](other);})
let greater_than = compose(F => def_global(F, Keyword.for("greater_than")), F => doc(F, `
[[Comparable]].greater_than method for '>' infix operator

Examples:
  2::greater_than(1) == 2 > 1
`))(function greater_than(other) {
return this[Comparable]['greater_than']['call'](this, other);})
let greater_than_eq = compose(F => def_global(F, Keyword.for("greater_than_eq")), F => doc(F, `
[[Comparable]].greater_than_eq method for '>=' infix operator

Examples:
  2::greater_than_eq(2) == 2 >= 2
`))(function greater_than_eq(other) {
return this[Comparable]['greater_than_eq']['call'](this, other);})
let less_than = compose(F => def_global(F, Keyword.for("less_than")), F => doc(F, `
[[Comparable]].less_than method for '<' infix operator

Examples:
  2::less_than(3) == 2 < 3
`))(function less_than(other) {
return this[Comparable]['less_than']['call'](this, other);})
let less_than_eq = compose(F => def_global(F, Keyword.for("less_than_eq")), F => doc(F, `
[[Comparable]].less_than_eq method for '<=' infix operator

Examples:
  2::less_than_eq(2) == 2 <= 3
`))(function less_than_eq(other) {
return this[Comparable]['less_than_eq']['call'](this, other);})
let and = compose(F => def_global(F, Keyword.for("and")), F => doc(F, `
[[And]] method for '&&' infix operator

Examples:
  true::and(fn = :val) == true && :val
`))(function and(thunk) {
return this?.[And](thunk);})
let or = compose(F => def_global(F, Keyword.for("or")), F => doc(F, `
[[Or]] method for '||' infix operator

Examples:
  false::or(fn = :val) == false || :val
`))(function or(thunk) {
return js_or(this?.[Or](thunk), thunk);})
let log = compose(F => def_global(F, Keyword.for("log")), def_call)(function log(...args) {
console['log'](...args, this)
return this;})
let str = def_global(function str(...args) {
return args['join']("");}, Keyword.for("str"));
let nan__q = compose(F => def_global(F, Keyword.for("nan__q")), def_call)(function nan__q() {
return Number['isNaN'](this);})
let num__q = compose(F => def_global(F, Keyword.for("num__q")), def_call)(function num__q() {
return equals__q.call(typeof(this), "number");})
let bigint__q = compose(F => def_global(F, Keyword.for("bigint__q")), def_call)(function bigint__q() {
return equals__q.call(typeof(this), "bigint");})
let str__q = compose(F => def_global(F, Keyword.for("str__q")), def_call)(function str__q() {
return equals__q.call(typeof(this), "string");})
let as_keyword = compose(F => def_global(F, Keyword.for("as_keyword")), def_call)(function as_keyword() {
return Keyword["for"](this['toString']());})
let as_num = compose(F => def_global(F, Keyword.for("as_num")), def_call)(function as_num() {
return Number(this);})
let as_str = compose(F => def_global(F, Keyword.for("as_str")), def_call)(function as_str() {
return js_or(this?.toString(), function () {
return "";});})
let exists__q = compose(F => def_global(F, Keyword.for("exists__q")), def_call)(function exists__q() {
return negate.call(nil__q.bind(this)());})
let Underscore = def_global(function Underscore(...transforms) {
this['transforms'] = transforms}, Keyword.for("Underscore"));
Underscore.prototype[Meta] = new ObjectLiteral({["[]"]: function (...keys) {
return this['insert'](pipe, ...keys);}});
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
}, ['update-at'](idx, callable) {
return this['insert'](update_at, idx, callable);
}, ['insert-at'](idx, val) {
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
return plus.call(this, (1));};
BigInt.prototype[Inc] = function () {
return plus.call(this, Keyword.for("custom_number_literal/n")[CustomNumberLiteral](1));};
String.prototype[Inc] = function () {
return String['fromCharCode'](plus.call(this['charCodeAt']((0)), (1)));};
let inc = compose(def_call, F => def_global(F, Keyword.for("int")))(function inc() {
return this[Inc]();})
let IRange = compose(F => def_global(F, Keyword.for("IRange")), F => impl_equal(F, Keyword.for("start"), Keyword.for("end")))(function IRange(start, end) {
this['start'] = start;
this['end'] = end;
})
let ERange = compose(F => def_global(F, Keyword.for("ERange")), F => impl_equal(F, Keyword.for("start"), Keyword.for("end")))(function ERange(start, end) {
this['start'] = start;
this['end'] = end;
})
let IRangeNoMin = compose(F => def_global(F, Keyword.for("IRangeNoMin")), F => impl_equal(F, Keyword.for("end")))(function IRangeNoMin(end) {
this['end'] = end;
})
let ERangeNoMax = compose(F => def_global(F, Keyword.for("ERangeNoMax")), F => impl_equal(F, Keyword.for("start")))(function ERangeNoMax(start) {
this['start'] = start;
})
let ERangeNoMin = compose(F => def_global(F, Keyword.for("ERangeNoMin")), F => impl_equal(F, Keyword.for("end")))(function ERangeNoMin(end) {
this['end'] = end;
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
return and.call(greater_than_eq.call(value, this['start']), () => less_than_eq.call(value, this['end']));};
ERange.prototype[Call] = function (value) {
return and.call(greater_than_eq.call(value, this['start']), () => less_than.call(value, this['end']));};
IRangeNoMin.prototype[Call] = function (value) {
return less_than_eq.call(value, this['end']);};
ERangeNoMax.prototype[Call] = function (value) {
return greater_than_eq.call(value, this['start']);};
ERangeNoMin.prototype[Call] = function (value) {
return less_than.call(value, this['end']);};
IRange.prototype[Symbol['iterator']] = function *() {
let {'start': i, 'end': end} = this;
while (less_than_eq.call(i, end)) {
yield i
i = inc.bind(i)()
};};
ERange.prototype[Symbol['iterator']] = function *() {
let {'start': i, 'end': end} = this;
while (less_than.call(i, end)) {
yield i
i = inc.bind(i)()
};};
ERangeNoMax.prototype[Symbol['iterator']] = function *() {
let i = this['start'];
while (true) {
yield i
i = inc.bind(i)()
};};
let char_alpha__q = plus.call(into.bind((new IRange("a", "z")))(Set[Meta]['[]'].call(Set, )), into.bind((new IRange("A", "Z")))(Set[Meta]['[]'].call(Set, )));
let char_numeric__q = into.bind((new IRange("0", "9")))(Set[Meta]['[]'].call(Set, ));
let char_alpha_numeric__q = plus.call(char_alpha__q, char_numeric__q);
globalThis['char_alpha__q'] = char_alpha__q
globalThis['char_numeric__q'] = char_numeric__q
globalThis['char_alpha_numeric__q'] = char_alpha_numeric__q
let alpha__q = compose(F => def_global(F, Keyword.for("alpha__q")), F => doc(F, "all characters in string are in a-z or A-Z"))(function alpha__q() {
return all__q.bind(this)(char_alpha__q);})
let alpha_numeric__q = compose(F => def_global(F, Keyword.for("alpha_numeric__q")), F => doc(F, "all characters in string are in a-z or A-Z or 0-9"))(function alpha_numeric__q() {
return all__q.bind(this)(char_alpha_numeric__q);})
let CondMap = def_global(function CondMap(entries) {
this['entries'] = entries;
}, Keyword.for("CondMap"));
CondMap.prototype[Call] = function (value) {
return pipe.bind(find.bind(this['entries'])(function ([callable, _]) {
return call.bind(callable)(value);}))(function ([_, val]) {
return val;});};
let KeyedSet = doc(function KeyedSet(key, map) {
this['key'] = key;
this['map'] = map;
}, `
KeyedSet is an efficient set-like data structure for cheaply
defining uniqueness

Examples:
let users = KeyedSet{key: :id, items: [{id: 1, name: \"jack\"} {id: 2, name: \"john\"}]}

users::has?({id: 2, name: \"john\"}) // true
`);
KeyedSet[Meta] = new ObjectLiteral({["{}"]: function (entries) {
let {'key': key, 'items': items} = into.bind(entries)(new ObjectLiteral({}));
let map = into.bind(select.bind(items)(function (item) {
return [at.bind(item)(key), item];}))(Map[Meta]['{}'].call(Map, []));
return Reflect['construct'](KeyedSet, [key, map]);}});
KeyedSet.prototype[Symbol['iterator']] = function () {
return select.bind(this['map'])((1));};
KeyedSet.prototype[Collection] = new ObjectLiteral({['at'](object) {
return pipe.bind(at.bind(object)(this['key']))(this['map']);
}, ['len']() {
return len.bind(this['map'])();
}, ['empty?']() {
return empty__q.bind(this['map'])();
}, ['has?'](object) {
return pipe.bind(at.bind(object)(this['key']))(has__q.bind(this['map']));
}});
function subtype(Ctor, ParentCtor) {
Ctor[Meta] = new ObjectLiteral({["[]"]: function (...args) {
return Reflect['construct'](ParentCtor, args, Ctor);}});
Ctor['prototype'] = Object['setPrototypeOf'](Ctor, ParentCtor['prototype'])
return Ctor;}
function MethodCall(args) {
this['args'] = args;
}
function mock(chain) {
return Proxy[Meta]['[]'].call(Proxy, new ObjectLiteral({}), new ObjectLiteral({['get'](_target, prop) {
chain = or.call(chain, () => [])
if (truthy(equals__q.call(prop, Meta))) {
return new ObjectLiteral({["[]"]: function (...args) {
return mock([...chain, MethodCall[Meta]['[]'].call(MethodCall, args)]);}});
} else if (equals__q.call(prop, Call)) {
return function (obj) {
return reduce.bind(chain)(function (res, val) {
if (truthy(equals__q.call(typeof(val), "string"))) {
let next_res = res[val];
if (truthy(equals__q.call(typeof(next_res), "function"))) {
next_res = next_res.bind(res)
};
return next_res;
} else if (val instanceof MethodCall) {
return res(...val['args']);
};}, obj);};
} else {
return mock([...chain, prop]);
};
}}));}
let $ = mock([]);
let __ = globalThis['$'] = $;function CollectionView(collection, idx) {
this['collection'] = collection;
this['idx'] = idx;
}
CollectionView.prototype[Collection] = new ObjectLiteral({['len']() {
return minus.call(len.bind(this['collection'])(), this['idx']);
}, ['empty?']() {
return equals__q.call(len.bind(this)(), (0));
}, ['at'](idx) {
return at.bind(this['collection'])(plus.call(this['idx'], idx));
}});
CollectionView.prototype[OrderedSequence] = new ObjectLiteral({['first']() {
return at.bind(this['collection'])(this['idx']);
}, ['last']() {
return last.bind(this['collection'])();
}});
CollectionView.prototype[Keyword.for("skip")] = function (n) {
return CollectionView[Meta]['[]'].call(CollectionView, this['collection'], plus.call(this['idx'], n));};
CollectionView.prototype[Symbol['iterator']] = function *() {
for  (let i of new IRange(this['idx'], len.bind(this['collection'])())) {
yield this['collection'][Meta]['[]'].call(this['collection'], i)
};};
function Lexer(entries) {
this['entries'] = entries;
}
function pass() {
}
function newline() {
}
Lexer.prototype[Call] = function (str) {
let tokens = [];
let index = (0);
function rest_of_string() {
return str['slice'](index);}
function scan() {
let result = rest_of_string()['match'](this);
if (truthy(or.call(negate.call(result), () => negate.call(equals__q.call(result['index'], (0)))))) {
return false;
};
index = plus.call(index, result[Meta]['[]'].call(result, (0))['length'])
return result[Meta]['[]'].call(result, (0));}
let line = (1);
let col = (1);
while (negate.call(equals__q.call(rest_of_string(), ""))) {
let found = false;
for  (let [pattern, type] of this['entries']) {
var __coil_if_let_temp = scan.bind(pattern)();
if (truthy(__coil_if_let_temp)) {
let value = __coil_if_let_temp;
if (truthy(equals__q.call(type, newline))) {
line = plus.call(line, (1))
col = (1)
} else if (negate.call(equals__q.call(type, pass))) {
tokens['push'](new ObjectLiteral({'type':type, 'value':value, 'line':line, 'col':col}))
col = plus.call(col, len.bind(value)())
} else {
col = plus.call(col, len.bind(value)())
};
found = true
break;
};
};
if (truthy(negate.call(found))) {
raise__b(Error[Meta]['[]'].call(Error, "No token matched."))
};
};
return tokens;};
let lexer = Lexer[Meta]['{}'].call(Lexer, [[/^\n/, newline], [/^\s+/, pass], [/^\#.*/, pass], [/^\,/, pass], [/^\;/, pass], [/^if\s/, Keyword.for("if")], [/^else\s/, Keyword.for("else")], [/^return\s/, Keyword.for("return")], [/^import\s/, Keyword.for("import")], [/^export\s/, Keyword.for("export")], [/^default\s/, Keyword.for("default")], [/^from\s/, Keyword.for("from")], [/^let\s/, Keyword.for("let")], [/^protocol\s/, Keyword.for("protocol")], [/^for\s/, Keyword.for("for")], [/^try\s/, Keyword.for("try")], [/^catch\s/, Keyword.for("catch")], [/^finally\s/, Keyword.for("finally")], [/^end\s/, Keyword.for("end")], [/^while\s/, Keyword.for("while")], [/^loop\s/, Keyword.for("loop")], [/^and\s/, Keyword.for("and")], [/^or\s/, Keyword.for("or")], [/^continue\s/, Keyword.for("continue")], [/^break\s/, Keyword.for("break")], [/^of\s/, Keyword.for("of")], [/^yield\s/, Keyword.for("yield")], [/^async\s/, Keyword.for("async")], [/^await\s/, Keyword.for("await")], [/^\=\>/, Keyword.for("arrow")], [/^\@/, Keyword.for("at")], [/^\=\=/, Keyword.for("double_eq")], [/^\!\=/, Keyword.for("not_eq")], [/^\!/, Keyword.for("bang")], [/^\=/, Keyword.for("eq")], [/^fn\b/, Keyword.for("fn")], [/^\{/, Keyword.for("open_b")], [/^\}/, Keyword.for("close_b")], [/^\(/, Keyword.for("open_p")], [/^\)/, Keyword.for("close_p")], [/^\|/, Keyword.for("pipe_bar")], [/^[\-\+]?(\d+\.)?\d+n/, Keyword.for("bigint")], [/^[\-\+]?(\d+\.)?\d+/, Keyword.for("num")], [/^\.\.\./, Keyword.for("dot_dot_dot")], [/^\.\./, Keyword.for("dot_dot")], [/^\./, Keyword.for("dot")], [/^\/.*\/[a-z]?/, Keyword.for("regex_lit")], [/^\>\=/, Keyword.for("gt_eq")], [/^\<\=/, Keyword.for("lt_eq")], [/^\>/, Keyword.for("gt")], [/^\</, Keyword.for("lt")], [/^\+/, Keyword.for("plus")], [/^\%/, Keyword.for("mod")], [/^\-/, Keyword.for("minus")], [/^\*\*/, Keyword.for("pow")], [/^\*/, Keyword.for("times")], [/^\:/, Keyword.for("colon")], [/^\//, Keyword.for("div")], [/^\[/, Keyword.for("open_sq")], [/^\]/, Keyword.for("close_sq")], [/^\"([^\\\"]|\\.)*\"/s, Keyword.for("string_lit")], [/^[a-zA-Z_\?\!\$0-9]+/, Keyword.for("id")]]);
function ParseError(expected_token_type, actual_token) {
this['stack'] = Error[Meta]['[]'].call(Error, )['stack']
this['message'] = str("Expected: ", expected_token_type, " got ", at.bind(actual_token)(Keyword.for("type")), " @ ", as_str.bind(at.bind(actual_token)(Keyword.for("line")))(), ":", as_str.bind(at.bind(actual_token)(Keyword.for("col")))())}
ParseError['prototype'] = Error[Meta]['[]'].call(Error, )
function expect_token__b(kw) {
if (truthy(negate.call(equals__q.call(at.bind(first.bind(this)())(Keyword.for("type")), kw)))) {
raise__b(ParseError[Meta]['[]'].call(ParseError, kw, first.bind(this)()))
} else {
return this;
};}
function verify_exists__b(parser) {
if (truthy(nil__q.bind(this)())) {
raise__b(Error[Meta]['[]'].call(Error, plus.call("Parser Failed - Expected ", parser)))
} else {
return this;
};}
const ParseInstruction = Symbol("ParseInstruction");
function line_and_col({'line': line, 'col': col}) {
return new ObjectLiteral({'line':line, 'col':col});}
function Init(expr) {
this['expr'] = expr;
}
Init.prototype[ParseInstruction] = function ([_expr, tokens]) {
return [new ObjectLiteral({...this['expr'], 'pos': line_and_col(first.bind(tokens)())}), tokens];};
function One(kw, as) {
this['kw'] = kw;
this['as'] = as;
}
One.prototype[ParseInstruction] = function ([expr, tokens]) {
let {'value': value, 'type': type} = first.bind(expect_token__b.bind(tokens)(this['kw']))();
return [merge.bind(expr)(new ObjectLiteral({[this['as']]: value})), tokens['skip']((1))];};
function Optional(set_or_kw, parse_fn, as) {
this['set_or_kw'] = set_or_kw;
this['parse_fn'] = parse_fn;
this['as'] = as;
}
Optional.prototype[ParseInstruction] = function ([expr, tokens]) {
if (truthy(empty__q.bind(tokens)())) {
return [expr, tokens];
};
function check_set(type) {
return any__q.bind(this)(function (val) {
if (truthy(equals__q.call(val, type))) {
return true;
} else if (val[Bag]) {
return has__q.bind(val)(type);
};});}
let {'type': type} = first.bind(tokens)();
if (truthy(and.call(this['set_or_kw'] instanceof Keyword, () => equals__q.call(type, this['set_or_kw'])))) {
return parse_step.bind(Then[Meta]['[]'].call(Then, this['parse_fn'], this['as']))([expr, tokens]);
} else if (and.call(this['set_or_kw'] instanceof Set, () => check_set.bind(this['set_or_kw'])(type))) {
return parse_step.bind(Then[Meta]['[]'].call(Then, this['parse_fn'], this['as']))([expr, tokens]);
} else {
return [expr, tokens];
};};
Function.prototype[ParseInstruction] = function ([_expr, tokens]) {
return this(tokens);};
function Chomp(...kws) {
this['kws'] = kws;
}
Chomp.prototype[ParseInstruction] = function ([expr, tokens]) {
let i = (0);
for  (let kw of this['kws']) {
expect_token__b.bind(tokens['skip'](i))(kw)
i = plus.call(i, (1))
};
return [expr, tokens['skip'](i)];};
function Then(parser, kw) {
this['parser'] = parser;
this['kw'] = kw;
}
Then.prototype[ParseInstruction] = function ([expr, tokens]) {
let result = call.bind(this['parser'])(tokens);
if (truthy(nil__q.bind(result)())) {
return [expr, tokens];
};
let [new_expr, new_tokens] = result;
if (truthy(this['kw'])) {
return [merge.bind(expr)(new ObjectLiteral({[this['kw']]: new_expr})), new_tokens];
} else {
return [new_expr, new_tokens];
};};
function FMap(f) {
this['f'] = f;
}
FMap.prototype[ParseInstruction] = function ([expr, tokens]) {
return [call.bind(this['f'])(expr), tokens];};
function Until(end_kw, parser, kw) {
this['end_kw'] = end_kw;
this['parser'] = parser;
this['kw'] = kw;
}
Until.prototype[ParseInstruction] = function ([expr, tokens]) {
let exprs = [];
while (negate.call(equals__q.call(at.bind(first.bind(tokens)())(Keyword.for("type")), this['end_kw']))) {
let [expr, new_tokens] = verify_exists__b.bind(call.bind(this['parser'])(tokens))(this);
exprs['push'](expr)
tokens = new_tokens
};
if (truthy(this['kw'])) {
return [merge.bind(expr)(new ObjectLiteral({[this['kw']]: exprs})), tokens];
} else {
return [exprs, tokens];
};};
function UntilEither(set, parser, kw) {
this['set'] = set;
this['parser'] = parser;
this['kw'] = kw;
}
UntilEither.prototype[ParseInstruction] = function ([expr, tokens]) {
let exprs = [];
while (negate.call(pipe.bind(at.bind(first.bind(tokens)())(Keyword.for("type")))(this['set']))) {
let [expr, new_tokens] = verify_exists__b.bind(call.bind(this['parser'])(tokens))(this);
exprs['push'](expr)
tokens = new_tokens
};
return [new ObjectLiteral({...expr, [this['kw']]: exprs}), tokens];};
function Case(parse_map, kw) {
this['parse_map'] = parse_map;
this['kw'] = kw;
}
Case.prototype[ParseInstruction] = function ([expr, tokens]) {
var __coil_if_let_temp = call.bind(this['parse_map'])(tokens);
if (truthy(__coil_if_let_temp)) {
let [new_expr, new_tokens] = __coil_if_let_temp;
if (truthy(this['kw'])) {
return [merge.bind(expr)(new ObjectLiteral({[this['kw']]: new_expr})), new_tokens];
} else {
return [new_expr, new_tokens];
};
} else {
console['log'](first.bind(this['tokens'])(), this['parse_map'])
raise__b(Error[Meta]['[]'].call(Error, "Case Parse Failed"))
};};
function Either(set, kw) {
this['set'] = set;
this['kw'] = kw;
}
Either.prototype[ParseInstruction] = function ([expr, tokens]) {
let op = verify_exists__b.bind(call.bind(this['set'])(at.bind(first.bind(tokens)())(Keyword.for("type"))))(this['set']);
let [new_expr, rest] = [first.bind(tokens)(), tokens['skip']((1))];
return [merge.bind(expr)(new ObjectLiteral({[this['kw']]: at.bind(new_expr)(Keyword.for("value"))})), rest];};
function parse_step(result) {
return this[Meta]['[]'].call(this, ParseInstruction)(result);}
function Parser(...instructions) {
this['instructions'] = instructions;
}
Parser.prototype[Call] = function (tokens) {
return parse_step.bind(this)([null, tokens]);};
function AbortIf(cond_fn) {
this['cond_fn'] = cond_fn;
}
Parser.prototype[ParseInstruction] = function (result) {
for  (let instruction of this['instructions']) {
if (truthy(instruction instanceof AbortIf)) {
if (truthy(call.bind(instruction['cond_fn'])(result))) {
return;
} else {
continue;
};
};
result = parse_step.bind(instruction)(result)
};
return result;};
function ParseMap(entries) {
this['entries'] = entries;
}
ParseMap.prototype[Record] = new ObjectLiteral({['keys']() {
return into.bind(map.bind(this['entries'])(first))(Set[Meta]['[]'].call(Set, ));
}});
ParseMap.prototype[Call] = function (tokens, ...args) {
if (truthy(empty__q.bind(tokens)())) {
return;
};
for  (let [pattern, parser] of this['entries']) {
if (truthy(equals__q.call(pattern, _))) {
return call.bind(parser)(tokens, ...args);
} else if (and.call(pattern instanceof Set, () => call.bind(pattern)(at.bind(first.bind(tokens)())(Keyword.for("type"))))) {
return call.bind(parser)(tokens, ...args);
} else if (and.call(pattern instanceof Array, () => all__q.bind(zip.bind(pattern)(tokens))(function ([p, token]) {
var __coil_if_let_temp = token;
if (truthy(__coil_if_let_temp)) {
let {'type': type} = __coil_if_let_temp;
if (truthy(p instanceof Keyword)) {
return equals__q.call(p, type);
};
if (truthy(p instanceof Set)) {
return has__q.bind(p)(type);
};
} else {
return false;
};}))) {
return call.bind(parser)(tokens, ...args);
} else if (and.call(pattern instanceof Keyword, () => equals__q.call(pattern, at.bind(first.bind(tokens)())(Keyword.for("type"))))) {
return call.bind(parser)(tokens, ...args);
};
};};
let algebra_ops = Set[Meta]['[]'].call(Set, Keyword.for("mod"), Keyword.for("plus"), Keyword.for("minus"), Keyword.for("times"), Keyword.for("pow"), Keyword.for("div"), Keyword.for("lt"), Keyword.for("gt"), Keyword.for("lt_eq"), Keyword.for("gt_eq"));
function parse_dot(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("dot"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot")), Then[Meta]['[]'].call(Then, parse_single_expr, Keyword.for("rhs"))))(tokens);}
function parse_keyword_lookup(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("keyword_lookup"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("property"))))(tokens);}
function not_adjacent__q([_expr, tokens]) {
let current = first.bind(tokens)();
let previous = at.bind(tokens['collection'])(minus.call(tokens['idx'], (1)));
if (truthy(negate.call(equals__q.call(current['line'], previous['line'])))) {
return true;
};
let end_of_prev_token = plus.call(previous['col'], previous['value']['length']);
return greater_than_eq.call((minus.call(current['col'], end_of_prev_token)), (1));}
function parse_adjacent_expr(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Then[Meta]['[]'].call(Then, parse_expr)))(tokens);}
function parse_inclusive_range(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("inclusive_range"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot"), Keyword.for("eq")), Optional[Meta]['[]'].call(Optional, keys.bind(SINGLE_EXPR_PARSE_MAP)(), parse_adjacent_expr, Keyword.for("rhs"))))(tokens);}
function parse_exclusive_range(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("exclusive_range"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot")), Optional[Meta]['[]'].call(Optional, keys.bind(SINGLE_EXPR_PARSE_MAP)(), parse_adjacent_expr, Keyword.for("rhs"))))(tokens);}
function parse_fn_call(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("fn_call"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_p")), Until[Meta]['[]'].call(Until, Keyword.for("close_p"), parse_expr, Keyword.for("args")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_p"))))(tokens);}
function parse_meta_from_entries(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("meta_from_entries"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_record_entry, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b"))))(tokens, lhs);}
function parse_meta_create(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("meta_create"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_sq")), Until[Meta]['[]'].call(Until, Keyword.for("close_sq"), parse_expr, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq"))))(tokens, lhs);}
function parse_snd_expr_step(tokens, lhs) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("open_p"), parse_fn_call], [Keyword.for("open_b"), parse_meta_from_entries], [Keyword.for("open_sq"), parse_meta_create], [Keyword.for("dot"), parse_dot], [Keyword.for("colon"), parse_keyword_lookup], [[Keyword.for("dot_dot"), Keyword.for("eq")], parse_inclusive_range], [Keyword.for("dot_dot"), parse_exclusive_range]]))(tokens, lhs);}
function parse_snd_expr([lhs, tokens]) {
var __coil_while_let_temp = parse_snd_expr_step(tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
lhs = new_lhs
tokens = rest
__coil_while_let_temp = parse_snd_expr_step(tokens, lhs);
};
return [lhs, tokens];}
function parse_algebra_op(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("algebra_op"), 'lhs':lhs})), Either[Meta]['[]'].call(Either, algebra_ops, Keyword.for("op")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_third_expr_step(tokens, lhs) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[algebra_ops, parse_algebra_op]]))(tokens, lhs);}
function parse_third_expr([lhs, tokens]) {
var __coil_while_let_temp = parse_third_expr_step(tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
lhs = new_lhs
tokens = rest
__coil_while_let_temp = parse_third_expr_step(tokens, lhs);
};
return [lhs, tokens];}
function parse_eq_op(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("equality_op"), 'lhs':lhs})), Either[Meta]['[]'].call(Either, Set[Meta]['[]'].call(Set, Keyword.for("double_eq"), Keyword.for("not_eq")), Keyword.for("op")), Then[Meta]['[]'].call(Then, parse_1_2_3_expr, Keyword.for("rhs"))))(tokens);}
function parse_fourth_expr_step(tokens, lhs) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Set[Meta]['[]'].call(Set, Keyword.for("double_eq"), Keyword.for("not_eq")), parse_eq_op]]))(tokens, lhs);}
function parse_fourth_expr([lhs, tokens]) {
var __coil_while_let_temp = parse_fourth_expr_step(tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
lhs = new_lhs
tokens = rest
__coil_while_let_temp = parse_fourth_expr_step(tokens, lhs);
};
return [lhs, tokens];}
function parse_and(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("and"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("and")), Then[Meta]['[]'].call(Then, parse_1_2_3_4_expr, Keyword.for("rhs"))))(tokens);}
function parse_or(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("or"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("or")), Then[Meta]['[]'].call(Then, parse_1_2_3_4_expr, Keyword.for("rhs"))))(tokens);}
function parse_fifth_expr_step(tokens, lhs) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("and"), parse_and], [Keyword.for("or"), parse_or]]))(tokens, lhs);}
function parse_fifth_expr([lhs, tokens]) {
var __coil_while_let_temp = parse_fifth_expr_step(tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
lhs = new_lhs
tokens = rest
__coil_while_let_temp = parse_fifth_expr_step(tokens, lhs);
};
return [lhs, tokens];}
let parse_regex = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("regex_lit")})), One[Meta]['[]'].call(One, Keyword.for("regex_lit"), Keyword.for("value")));
let parse_str = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("str")})), One[Meta]['[]'].call(One, Keyword.for("string_lit"), Keyword.for("value")));
let valid_ids_in_all_contexts = Set[Meta]['[]'].call(Set, Keyword.for("id"), Keyword.for("from"));
let parse_id = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("id_lookup")})), Either[Meta]['[]'].call(Either, push.bind(valid_ids_in_all_contexts)(Keyword.for("import")), Keyword.for("name")));
function parse_obj(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("object_literal")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_record_entry, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b"))))(tokens);}
let parse_spread_assign = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("spread_assign")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot_dot")), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("name")));
let parse_assign_id = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("id_assign")})), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("name")));
function parse_assign_array(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("array_deconstruction")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_sq")), Until[Meta]['[]'].call(Until, Keyword.for("close_sq"), parse_assign_expr, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq"))))(tokens);}
let parse_obj_entry_rename = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("obj_entry_rename")})), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("old_name")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("new_name")));
let parse_regular_obj_assign_entry = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("obj_reg_entry")})), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("name")));
function parse_obj_entry_destructure(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("obj_assign_expr")})), One[Meta]['[]'].call(One, valid_ids_in_all_contexts, Keyword.for("property")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr"))))(tokens);}
let parse_obj_assign_entry = ParseMap[Meta]['{}'].call(ParseMap, [[[Keyword.for("id"), Keyword.for("colon"), Keyword.for("id")], parse_obj_entry_rename], [[Keyword.for("id"), Keyword.for("colon")], parse_obj_entry_destructure], [Keyword.for("id"), parse_regular_obj_assign_entry], [Keyword.for("dot_dot_dot"), parse_spread_assign]]);
let parse_assign_obj = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("object_deconstruction")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_obj_assign_entry, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b")));
let parse_this_assign = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("this_assign")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("at")), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("name")));
let parse_this_spread_assign = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("this_spread_assign")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot_dot"), Keyword.for("at")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")));
let parse_assign_expr = ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("id"), parse_assign_id], [Keyword.for("open_sq"), parse_assign_array], [Keyword.for("open_b"), parse_assign_obj], [Keyword.for("at"), parse_this_assign], [[Keyword.for("dot_dot_dot"), Keyword.for("at")], parse_this_spread_assign], [Keyword.for("dot_dot_dot"), parse_spread_assign]]);
function parse_paren_expr(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("paren_expr")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_p")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_p"))))(tokens);}
function parse_yield(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("yield")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("yield")), Optional[Meta]['[]'].call(Optional, Keyword.for("times"), parse_gen_modifier, Keyword.for("star?")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_await(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("await")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("await")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
let parse_num = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("num")})), One[Meta]['[]'].call(One, Keyword.for("num"), Keyword.for("value")));
function parse_array(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("array")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_sq")), Until[Meta]['[]'].call(Until, Keyword.for("close_sq"), parse_expr, Keyword.for("elements")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq"))))(tokens);}
function parse_spread(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("spread")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot_dot")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_not(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("not")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("bang")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_num_raw(tokens) {
return pipe.bind(call.bind(parse_num)(tokens))(function ([expr, tokens]) {
return [as_num.bind(at.bind(expr)(Keyword.for("value")))(), tokens];});}
let parse_adjacent_num_raw = Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Then[Meta]['[]'].call(Then, parse_num_raw));
let parse_async_modifier = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, true), Chomp[Meta]['[]'].call(Chomp, Keyword.for("async")));
let parse_gen_modifier = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, true), Chomp[Meta]['[]'].call(Chomp, Keyword.for("times")));
function parse_fn_expr_body(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("return")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), FMap[Meta]['[]'].call(FMap, function (node) {
return [node];})))(tokens);}
function parse_args_def(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_p")), Until[Meta]['[]'].call(Until, Keyword.for("close_p"), parse_assign_expr), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_p"))))(tokens);}
function parse_name_expr(tokens) {
var __coil_if_let_temp = parse_single_expr(tokens);
if (truthy(__coil_if_let_temp)) {
let [expr, tokens] = __coil_if_let_temp;
let parse_map = ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("dot"), parse_dot], [Keyword.for("colon"), parse_keyword_lookup]]);
var __coil_while_let_temp = call.bind(parse_map)(tokens, expr);
while (__coil_while_let_temp) {
let [new_expr, new_tokens] = __coil_while_let_temp;
expr = new_expr
tokens = new_tokens
__coil_while_let_temp = call.bind(parse_map)(tokens, expr);
};
return [expr, tokens];
};}
function parse_fn(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("fn")})), Optional[Meta]['[]'].call(Optional, Keyword.for("async"), parse_async_modifier, Keyword.for("is_async?")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("fn")), Optional[Meta]['[]'].call(Optional, Keyword.for("times"), parse_gen_modifier, Keyword.for("generator?")), Then[Meta]['[]'].call(Then, parse_name_expr, Keyword.for("name_expr")), Optional[Meta]['[]'].call(Optional, Keyword.for("open_p"), parse_args_def, Keyword.for("args")), Case[Meta]['[]'].call(Case, ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("eq"), parse_fn_expr_body], [_, block()]]), Keyword.for("body"))))(tokens);}
function parse_keyword_record_entry(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("keyword_record_entry")})), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_regular_record_entry(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("regular_record_entry")})), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("key_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("arrow")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("value_expr"))))(tokens);}
function parse_id_shorthand_record_entry(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("id_shorthand_record_entry")})), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name"))))(tokens);}
function parse_record_entry(tokens) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("dot_dot_dot"), parse_spread], [[Keyword.for("id"), Keyword.for("colon")], parse_keyword_record_entry], [[Keyword.for("id"), Keyword.for("arrow")], parse_regular_record_entry], [Keyword.for("id"), parse_id_shorthand_record_entry], [Keyword.for("fn"), parse_fn], [[Keyword.for("async"), Keyword.for("fn")], parse_fn], [_, parse_regular_record_entry]]))(tokens);}
function parse_prefix_inclusive_range(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("prefix_inclusive_range")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot"), Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_prefix_exclusive_range(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("prefix_exclusive_range")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
let parse_keyword = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("keyword")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("value")));
let parse_anon_fn = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("anon_fn")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("pipe_bar")), Until[Meta]['[]'].call(Until, Keyword.for("pipe_bar"), parse_assign_expr, Keyword.for("args")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("pipe_bar")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("return_expr")));
let SINGLE_EXPR_PARSE_MAP = ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("string_lit"), parse_str], [Keyword.for("regex_lit"), parse_regex], [Keyword.for("keyword"), parse_keyword], [Keyword.for("open_p"), parse_paren_expr], [Keyword.for("yield"), parse_yield], [Keyword.for("await"), parse_await], [Keyword.for("num"), parse_num], [Keyword.for("open_sq"), parse_array], [Keyword.for("dot_dot_dot"), parse_spread], [Keyword.for("bang"), parse_not], [Keyword.for("open_b"), parse_obj], [Keyword.for("pipe_bar"), parse_anon_fn], [[Keyword.for("dot_dot"), Keyword.for("eq")], parse_prefix_inclusive_range], [Keyword.for("dot_dot"), parse_prefix_exclusive_range], [push.bind(valid_ids_in_all_contexts)(Keyword.for("import")), parse_id], [[Keyword.for("async"), Keyword.for("fn")], parse_fn], [Keyword.for("fn"), parse_fn], [[Keyword.for("colon"), Keyword.for("id")], parse_keyword]]);
function parse_single_expr(tokens) {
return call.bind(SINGLE_EXPR_PARSE_MAP)(tokens);}
function parse_expr(tokens) {
return parse_fifth_expr(parse_fourth_expr(parse_third_expr(parse_snd_expr(parse_single_expr(tokens)))));}
function parse_1_2_expr(tokens) {
return parse_snd_expr(parse_single_expr(tokens));}
function parse_1_2_3_expr(tokens) {
return parse_third_expr(parse_snd_expr(parse_single_expr(tokens)));}
function parse_1_2_3_4_expr(tokens) {
return parse_fourth_expr(parse_third_expr(parse_snd_expr(parse_single_expr(tokens))));}
function parse_else_branch(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("else")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("else")), UntilEither[Meta]['[]'].call(UntilEither, Set[Meta]['[]'].call(Set, Keyword.for("else"), Keyword.for("end")), parse_statement, Keyword.for("body"))))(tokens);}
function parse_else_if_branch(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("else_if")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("else"), Keyword.for("if")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), UntilEither[Meta]['[]'].call(UntilEither, Set[Meta]['[]'].call(Set, Keyword.for("else"), Keyword.for("end")), parse_statement, Keyword.for("pass")), Optional[Meta]['[]'].call(Optional, Keyword.for("else"), parse_if_branch, Keyword.for("fail"))))(tokens);}
let parse_if_branch = ParseMap[Meta]['{}'].call(ParseMap, [[[Keyword.for("else"), Keyword.for("if")], parse_else_if_branch], [Keyword.for("else"), parse_else_branch]]);
function parse_if(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("if")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("if")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), UntilEither[Meta]['[]'].call(UntilEither, Set[Meta]['[]'].call(Set, Keyword.for("else"), Keyword.for("end")), parse_statement, Keyword.for("pass")), Optional[Meta]['[]'].call(Optional, Keyword.for("else"), parse_if_branch, Keyword.for("fail")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("end"))))(tokens);}
let parse_let = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("let")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("let")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("rhs")));
function parse_if_let(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("if_let")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("if"), Keyword.for("let")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), UntilEither[Meta]['[]'].call(UntilEither, Set[Meta]['[]'].call(Set, Keyword.for("else"), Keyword.for("end")), parse_statement, Keyword.for("pass")), Optional[Meta]['[]'].call(Optional, Keyword.for("else"), parse_else_branch, Keyword.for("fail")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("end"))))(tokens);}
let parse_protocol_methods = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("protocol_method")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_id, Keyword.for("names")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b")));
let parse_protocol = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("protocol_def")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("protocol")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")), Optional[Meta]['[]'].call(Optional, Keyword.for("open_b"), parse_protocol_methods, Keyword.for("methods")));
let parse_return = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("return")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("return")), Optional[Meta]['[]'].call(Optional, keys.bind(SINGLE_EXPR_PARSE_MAP)(), parse_expr, Keyword.for("expr")));
let parse_await_modifier = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, true), Chomp[Meta]['[]'].call(Chomp, Keyword.for("await")));
function parse_for_loop(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("for_loop")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("for")), Optional[Meta]['[]'].call(Optional, Keyword.for("await"), parse_await_modifier, Keyword.for("is_await?")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("of")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("iterable_expr")), block(Keyword.for("body"))))(tokens);}
function parse_loop(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("loop")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("loop")), block(Keyword.for("body"))))(tokens);}
function parse_while_loop(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("while_loop")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("while")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("test_expr")), block(Keyword.for("body"))))(tokens);}
function parse_while_let_loop(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("while_let_loop")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("while"), Keyword.for("let")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("test_expr")), block(Keyword.for("body"))))(tokens);}
function parse_continue(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("continue")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("continue"))))(tokens);}
function parse_break(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("break")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("break"))))(tokens);}
function parse_catch(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("catch")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("catch")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")), block(Keyword.for("body"))))(tokens);}
function parse_finally(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("finally")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("finally")), block(Keyword.for("body"))))(tokens);}
function parse_try(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("try")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("try")), block(Keyword.for("body")), Optional[Meta]['[]'].call(Optional, Keyword.for("catch"), parse_catch, Keyword.for("catch")), Optional[Meta]['[]'].call(Optional, Keyword.for("finally"), parse_finally, Keyword.for("finally"))))(tokens);}
function parse_import(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("import")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("import")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_exprs")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("from")), Then[Meta]['[]'].call(Then, parse_str, Keyword.for("path"))))(tokens);}
function parse_export(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("export")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("export")), Then[Meta]['[]'].call(Then, parse_statement, Keyword.for("statement"))))(tokens);}
function parse_export_default(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("export_default")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("export"), Keyword.for("default")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
let parse_direct_import = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("direct_import")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("import")), One[Meta]['[]'].call(One, Keyword.for("string_lit"), Keyword.for("path")));
function parse_statement(tokens) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("let"), parse_let], [Keyword.for("for"), parse_for_loop], [Keyword.for("try"), parse_try], [Keyword.for("protocol"), parse_protocol], [Keyword.for("return"), parse_return], [Keyword.for("continue"), parse_continue], [Keyword.for("break"), parse_break], [Keyword.for("loop"), parse_loop], [[Keyword.for("import"), Keyword.for("string_lit")], parse_direct_import], [Keyword.for("import"), parse_import], [[Keyword.for("export"), Keyword.for("default")], parse_export_default], [Keyword.for("export"), parse_export], [[Keyword.for("while"), Keyword.for("let")], parse_while_let_loop], [Keyword.for("while"), parse_while_loop], [[Keyword.for("if"), Keyword.for("let")], parse_if_let], [Keyword.for("if"), parse_if], [_, parse_expr]]))(tokens);}
function block(name) {
return Parser[Meta]['[]'].call(Parser, Until[Meta]['[]'].call(Until, Keyword.for("end"), parse_statement, name), Chomp[Meta]['[]'].call(Chomp, Keyword.for("end")));}
function parse(tokens) {
let ast = [];
var __coil_while_let_temp = call.bind(parse_statement)(tokens);
while (__coil_while_let_temp) {
let [statement_or_expr, rest] = __coil_while_let_temp;
ast['push'](statement_or_expr)
tokens = rest
__coil_while_let_temp = call.bind(parse_statement)(tokens);
};
return ast;}
function map_join(f, separator) {
return reduce.bind(map.bind(this)(f))(function (acc, cur) {
if (truthy(empty__q.bind(acc)())) {
return cur;
} else {
return plus.call(acc, plus.call(separator, cur));
};}, "");}
function resolve_name(name) {
if (truthy(name)) {
return name['replaceAll']("?", "__q")['replaceAll']("!", "__b")['replaceAll'](">", "_lt_")['replaceAll']("-", "_");
};
return name;}
function eval_if_branch(branch) {
if (truthy(nil__q.bind(branch)())) {
return "";
} else if (equals__q.call(branch['type'], Keyword.for("else"))) {
return str(" else {\n", eval_ast(or.call(call.call(Keyword.for("body"), branch), () => [])), "\n}");
} else {
if (truthy(equals__q.call(call.call(Keyword.for("type"), branch), Keyword.for("else_if")))) {
return str(" else if (", eval_expr(at.bind(branch)(Keyword.for("expr"))), ") {\n", eval_ast(or.call(at.bind(branch)(Keyword.for("pass")), () => [])), "\n}", eval_if_branch(at.bind(branch)(Keyword.for("fail"))));
} else {
raise__b(Error[Meta]['[]'].call(Error, "Expected else if"))
};
};}
function eval_if({'expr': expr, 'pass': pass, 'fail': fail}) {
return str("if (", eval_expr(expr), "[Meta.as_bool]()) {\n", eval_ast(pass), "\n", "}", eval_if_branch(fail));}
function eval_str({'value': value}) {
value = value['slice']((1), (-1))
if (truthy(value['includes']("\n"))) {
return str("`", value, "`");
} else {
return str("\"", value, "\"");
};}
function eval_fn_call({'lhs': lhs, 'args': args}) {
return str(eval_expr(lhs), "[invoke](", map_join.bind(args)(eval_expr, ", "), ")");}
function eval_id_assign_name({'name': name}) {
return resolve_name(name);}
function eval_spread_assign({'name': name}) {
return str("...", resolve_name(name));}
function eval_array_deconstruction_entry(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("array_deconstruction"), eval_array_deconstruction_names]])))(node);}
function eval_array_deconstruction_names({'entries': entries}) {
return str("[", map_join.bind(entries)(eval_array_deconstruction_entry, ", "), "]");}
function eval_obj_reg_entry({'name': name}) {
return str("'", name, "': ", resolve_name(name));}
function eval_obj_entry_rename({'old_name': old_name, 'new_name': new_name}) {
return str("'", old_name, "': ", resolve_name(new_name));}
function eval_obj_deconstruction_entry(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("obj_reg_entry"), eval_obj_reg_entry], [Keyword.for("obj_entry_rename"), eval_obj_entry_rename], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("obj_str_rename_entry"), function ({'old_name': old_name, 'new_name': new_name}) {
return str(old_name, ": ", resolve_name(new_name));}]])))(node);}
function eval_object_deconstruction_names({'entries': entries}) {
return str("{", map_join.bind(entries)(eval_obj_deconstruction_entry, ", "), "}");}
let eval_this_assign = compose(Keyword.for("name"), resolve_name);
function eval_this_spread_assign({'name': name}) {
return str("...", resolve_name(name));}
function eval_assign_expr(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("array_deconstruction"), eval_array_deconstruction_names], [Keyword.for("object_deconstruction"), eval_object_deconstruction_names], [Keyword.for("this_assign"), eval_this_assign], [Keyword.for("this_spread_assign"), eval_spread_assign]])))(node);}
function eval_while_let_loop({'test_expr': test_expr, 'assign_expr': assign_expr, 'body': body}) {
return str("var __coil_while_let_temp = ", eval_expr(test_expr), ";\n", "while (__coil_while_let_temp) {\n", "let ", eval_assign_expr(assign_expr), " = __coil_while_let_temp;\n", eval_ast(body), "\n", "__coil_while_let_temp = ", eval_expr(test_expr), ";\n", "}");}
function eval_if_let({'expr': expr, 'assign_expr': assign_expr, 'pass': pass, 'fail': fail}) {
return str("var __coil_if_let_temp = ", eval_expr(expr), ";\n", "if (__coil_if_let_temp[Meta.as_bool]()) {\n", "let ", eval_assign_expr(assign_expr), " = __coil_if_let_temp;\n", eval_ast(pass), "\n", "}", eval_if_branch(fail));}
function eval_spread({'expr': expr}) {
return str("...", eval_expr(expr));}
function eval_let({'assign_expr': assign_expr, 'rhs': rhs}) {
return str("let ", eval_assign_expr(assign_expr), " = ", eval_expr(rhs));}
function eval_array({'elements': elements}) {
return str("[", map_join.bind(elements)(eval_expr, ", "), "]");}
function eval_this_assignments(args) {
return into.bind(map.bind(keep.bind(args)(Keyword.for("type"), Set[Meta]['[]'].call(Set, Keyword.for("this_assign"), Keyword.for("this_spread_assign"))))(function ({'name': name}) {
return str("this['", name, "'] = ", resolve_name(name), ";\n");}))("");}
function eval_name_expr(node) {
return pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("dot"), function ({'lhs': lhs, 'rhs': rhs}) {
return str(eval_name_expr(lhs), "[", eval_name_expr(rhs), "]");}], [Keyword.for("keyword_lookup"), function ({'lhs': lhs, 'property': property}) {
return str(eval_name_expr(lhs), "['", property, "']");}]]), or.call(_, () => eval_expr))(node);}
function eval_fn({'is_async?': is_async__q, 'generator?': generator__q, 'name_expr': name_expr, 'args': args, 'body': body}) {
return str(or.call((and.call(equals__q.call(name_expr['type'], Keyword.for("id_lookup")), () => "let ")), () => ""), eval_name_expr(name_expr), " = ", (and.call(is_async__q, () => "async ")), "function ", (and.call(generator__q, () => "*")), "(", map_join.bind(args)(eval_assign_expr, ", "), ") {\n", eval_this_assignments(args), eval_ast(body), "}");}
function eval_obj_fn({'name': name, 'generator?': generator__q, 'is_async?': is_async__q, 'args': args, 'body': body}) {
return str((and.call(is_async__q, () => "async ")), (and.call(generator__q, () => "*")), "['", name, "'](", map_join.bind(args)(eval_assign_expr, ", "), ") {\n", eval_ast(body), "\n}");}
function eval_id_lookup({'name': name}) {
return resolve_name(name);}
function eval_num({'value': value}) {
return str("(", value, ")");}
function eval_double_equals({'lhs': lhs, 'rhs': rhs}) {
return str(eval_expr(lhs), "[Equal['==']](", eval_expr(rhs), ")");}
function eval_not_equals({'lhs': lhs, 'rhs': rhs}) {
return str(eval_expr(lhs), "[Equal['!=']](", eval_expr(rhs), ")");}
function eval_not({'expr': expr}) {
return str(eval_expr(expr), "[Bool.negate]]()");}
function eval_meta_from_entries({'lhs': lhs, 'entries': entries}) {
let lhs_js = eval_expr(lhs);
let entries_js = map_join.bind(entries)(eval_record_entry, ", ");
return str(lhs_js, "[Meta.from_entries]([", entries_js, "])");}
function eval_meta_create({'lhs': lhs, 'entries': entries}) {
return str(eval_expr(lhs), "[Meta.create]([", map_join.bind(entries)(eval_expr, ", "), "])");}
function eval_await({'expr': expr}) {
return str("await ", eval_expr(expr));}
function eval_yield({'star?': star__q, 'expr': expr}) {
return str("yield", (and.call(star__q, () => "*")), " ", eval_expr(expr));}
function eval_paren_expr({'expr': expr}) {
return str("(", eval_expr(expr), ")");}
function eval_keyword({'value': value}) {
return str("Keyword.for(\"", value, "\")");}
function eval_regular_record_entry({'key_expr': key_expr, 'value_expr': value_expr}) {
return str("[", eval_expr(key_expr), ", ", eval_expr(value_expr), "]");}
function eval_keyword_record_entry({'name': name, 'expr': expr}) {
return str("[", eval_keyword(new ObjectLiteral({'value': name})), ", ", eval_expr(expr), "]");}
function eval_id_shorthand_record_entry({'name': name}) {
return str("[", eval_keyword(new ObjectLiteral({'value': name})), ", ", name, "]");}
function eval_record_entry(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("regular_record_entry"), eval_regular_record_entry], [Keyword.for("keyword_record_entry"), eval_keyword_record_entry], [Keyword.for("spread"), eval_spread], [Keyword.for("id_shorthand_record_entry"), eval_id_shorthand_record_entry]])))(node);}
function eval_inclusive_range({'lhs': lhs, 'rhs': rhs}) {
if (truthy(rhs)) {
return str("new InclusiveRange(", eval_expr(lhs), ", ", eval_expr(rhs), ")");
} else {
return str("new InclusiveRangeNoMaximum(", eval_expr(lhs), ")");
};}
function eval_exclusive_range({'lhs': lhs, 'rhs': rhs}) {
if (truthy(rhs)) {
return str("new ExclusiveRange(", eval_expr(lhs), ", ", eval_expr(rhs), ")");
} else {
return str("new ExclusiveRangeNoMaximum(", eval_expr(lhs), ")");
};}
let eval_regex_lit = Keyword.for("value");
function eval_prefix_exclusive_range({'expr': expr}) {
return str("new ExclusiveRangeNoMinimum(", eval_expr(expr), ")");}
function eval_prefix_inclusive_range({'expr': expr}) {
return str("new InclusiveRangeNoMinimum(", eval_expr(expr), ")");}
function eval_dot({'lhs': lhs, 'rhs': rhs}) {
return str("dot(", eval_expr(lhs), ", ", eval_expr(rhs), ")");}
function eval_keyword_lookup({'lhs': lhs, 'property': property}) {
return str("dot(", eval_expr(lhs), ", '", property, "')");}
function eval_object_literal({'entries': entries}) {
return str("ObjectLiteral[Meta.from_entries]([", map_join.bind(entries)(eval_record_entry, ", "), "])");}
function eval_anon_fn({'args': args, 'return_expr': return_expr}) {
return str("(", map_join.bind(args)(eval_assign_expr, ", "), ") => ", eval_expr(return_expr));}
function eval_algebra_op({'lhs': lhs, 'op': op, 'rhs': rhs}) {
return str(eval_expr(lhs), "[Algebra[\"", op, "\"]](", eval_expr(rhs), ")");}
function eval_equality_op({'lhs': lhs, 'op': op, 'rhs': rhs}) {
return str(eval_expr(lhs), "[Meta[\"", op, "\"]](", eval_expr(rhs), ")");}
function eval_and({'lhs': lhs, 'rhs': rhs}) {
return str("(__coil_temp = {left: ", eval_expr(lhs), ", right: ", eval_expr(rhs), "}", ", __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : __coil_temp.right[Meta.as_bool]() === true ? __coil_temp.right : __coil_temp.left)");}
function eval_or({'lhs': lhs, 'rhs': rhs}) {
return str("(__coil_temp = {left: ", eval_expr(lhs), ", right: ", eval_expr(rhs), "}", ", __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : __coil_temp.right)");}
function eval_expr(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("algebra_op"), eval_algebra_op], [Keyword.for("equality_op"), eval_equality_op], [Keyword.for("and"), eval_and], [Keyword.for("or"), eval_or], [Keyword.for("str"), eval_str], [Keyword.for("dot"), eval_dot], [Keyword.for("keyword_lookup"), eval_keyword_lookup], [Keyword.for("object_literal"), eval_object_literal], [Keyword.for("regex_lit"), eval_regex_lit], [Keyword.for("keyword"), eval_keyword], [Keyword.for("prefix_exclusive_range"), eval_prefix_exclusive_range], [Keyword.for("prefix_inclusive_range"), eval_prefix_inclusive_range], [Keyword.for("id_lookup"), eval_id_lookup], [Keyword.for("fn_call"), eval_fn_call], [Keyword.for("num"), eval_num], [Keyword.for("array"), eval_array], [Keyword.for("double_equals"), eval_double_equals], [Keyword.for("not_equals"), eval_not_equals], [Keyword.for("not"), eval_not], [Keyword.for("fn"), eval_fn], [Keyword.for("meta_from_entries"), eval_meta_from_entries], [Keyword.for("meta_create"), eval_meta_create], [Keyword.for("spread"), eval_spread], [Keyword.for("await"), eval_await], [Keyword.for("yield"), eval_yield], [Keyword.for("paren_expr"), eval_paren_expr], [Keyword.for("inclusive_range"), eval_inclusive_range], [Keyword.for("exclusive_range"), eval_exclusive_range], [Keyword.for("anon_fn"), eval_anon_fn]])))(node);}
function eval_return({'expr': expr}) {
if (truthy(expr)) {
return str("return ", eval_expr(expr));
} else {
return "return";
};}
function eval_protocol({'name': name, 'methods': methods}) {
if (truthy(methods)) {
return str("const ", name, " = Object.freeze({", map_join.bind(methods['names'])(function (entry) {
return str("\"", entry['name'], "\": Symbol(\"", name, ":", entry['name'], "\")");}, ",\n"), "})");
} else {
return str("const ", resolve_name(name), " = Symbol(\"", name, "\")");
};}
function eval_for_loop({'is_await?': is_await__q, 'assign_expr': assign_expr, 'iterable_expr': iterable_expr, 'body': body}) {
return str("for ", (and.call(is_await__q, () => "await ")), " (let ", eval_assign_expr(assign_expr), " of ", eval_expr(iterable_expr), ") {\n", eval_ast(body), "\n", "}");}
function eval_id_assign({'name': name, 'expr': expr}) {
return str(resolve_name(name), " = ", eval_expr(expr));}
function eval_while_loop({'test_expr': test_expr, 'body': body}) {
return str("while (", eval_expr(test_expr), "[Meta.as_bool]()) {\n", eval_ast(body), "\n}");}
function eval_loop({'body': body}) {
return str("while (true) {\n", eval_ast(body), "\n}");}
function eval_continue() {
return "continue";}
function eval_break() {
return "break";}
function eval_try(node) {
let body_js = pipe.bind(at.bind(node)(Keyword.for("body")))(eval_ast);
let catch_js = "";
let finally_js = "";
if (truthy(has__q.bind(node)(Keyword.for("catch")))) {
let {'name': name, 'body': body} = at.bind(node)(Keyword.for("catch"));
catch_js = str(" catch (", name, ") {\n", eval_ast(body), "\n}")
};
if (truthy(has__q.bind(node)(Keyword.for("finally")))) {
let {'body': body} = at.bind(node)(Keyword.for("finally"));
finally_js = str(" finally {\n", eval_ast(body), "\n}")
};
return str("try {\n", body_js, "\n", "}", catch_js, finally_js);}
function eval_import({'assign_exprs': assign_exprs, 'path': path}) {
return str("import * as __coil_temp from \"", path['value']['slice']((1), (-1)), "\";\n", "let {", map_join.bind(assign_exprs)(eval_assign_expr, ", "), "} = __coil_temp");}
function eval_export({'statement': statement}) {
return str("export ", eval_statement(statement));}
function eval_export_default({'expr': expr}) {
return str("export default ", eval_expr(expr));}
function eval_direct_import({'path': path}) {
return str("import ", path);}
function eval_statement(node) {
return call.bind(pipe.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("if"), eval_if], [Keyword.for("direct_import"), eval_direct_import], [Keyword.for("import"), eval_import], [Keyword.for("export"), eval_export], [Keyword.for("export_default"), eval_export_default], [Keyword.for("let"), eval_let], [Keyword.for("if_let"), eval_if_let], [Keyword.for("return"), eval_return], [Keyword.for("protocol_def"), eval_protocol], [Keyword.for("for_loop"), eval_for_loop], [Keyword.for("id_assign"), eval_id_assign], [Keyword.for("while_loop"), eval_while_loop], [Keyword.for("loop"), eval_loop], [Keyword.for("while_let_loop"), eval_while_let_loop], [Keyword.for("continue"), eval_continue], [Keyword.for("break"), eval_break], [Keyword.for("try"), eval_try]])))(function (f) {
if (truthy(f)) {
return compose(f, plus.call(_, ";"));
} else {
return eval_expr;
};}))(node);}
export function eval_ast(ast) {
return str("let __coil_temp;\n", map_join.bind(ast)(eval_statement, "\n"));};
export function lex(string) {
return call.bind(lexer)(string);};
function coll_view(tokens) {
return CollectionView[Meta]['[]'].call(CollectionView, tokens, (0));}
export function lex_and_parse(string) {
return pipe.bind(string)(lexer, coll_view, parse);};
export function compile(string) {
return pipe.bind(string)(lexer, coll_view, parse, eval_ast);};
let [src_file_name, out_name] = Deno['args'];
let prelude = Deno['readTextFileSync']("./src/std/js_prelude_v2.js");
let src = Deno['readTextFileSync'](src_file_name);
Deno['writeTextFile'](out_name, plus.call(prelude, plus.call(compile(src), "\n")))