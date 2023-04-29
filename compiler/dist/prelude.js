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
const CustomNumberLiteral = Symbol("CustomNumberLiteral");
Keyword.for("custom_number_literal/n")[CustomNumberLiteral] = BigInt;
const Doc = Symbol("Doc");
function doc(f, doc_str) {
f[Doc] = doc_str['trim']();
return f;}
function log_doc() {
if (truthy(this['name'])) {
console['log'](str("# ", this['name']))
};
console['log'](this[Doc])
return this;}
function compose_decorators(F, ...decorators) {
for  (let decorator of decorators) {
F = call.bind(decorator)(F)
};
return F;}
const Call = Symbol("Call");
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
raise__b(new TypeError(plus.call("Can't 'call' a string with ",as_str.bind(collection)())))
} else {
return call.bind(collection)(this);
};};
Number.prototype[Call] = function (collection) {
if (truthy(collection instanceof Keyword)) {
return this[collection];
} else {
return call.bind(collection)(this);
};};
Keyword.prototype[Call] = function (collection) {
if (truthy(or.call(collection instanceof Keyword, () => typeof(collection) === "string"))) {
raise__b(new TypeError(plus.call("Can't 'call' a keyword with",as_str.bind(collection)())))
} else if (Call in collection) {
return call.bind(collection)(this);
} else {
return collection[this];
};};
let call = doc(function call(...args) {
return this?.[Call](...args);}, `
Invokes [[Call]] on 'this'


Usage:
- On Object Literals
  {a: 10}::call(:a) // 10
`);
Set.prototype[Keyword.for("bind")] = function (val) {
return function () {
return call.bind(this)(val);}.bind(this);};
let nil__q = Object['freeze'](new Set([undefined, null]));
const Pipe = Symbol("Pipe");
Object.prototype[Pipe] = function (callable) {
return call.bind(callable)(this);};
let pipe = doc(function pipe(...callables) {
let f = compose(...callables);
if (truthy(nil__q.bind(this)())) {
return f(this);
} else {
return this?.[Pipe](f);
};}, `
invokes [[Pipe]] protocol

args:
  ...callables: list of [[Call]] objects

returns:
  result of invoking 'callables' on this

nil handling:
  since nil doesn't impl Pipe, we'll call 'f' directly.

note on [[Pipe]]:
  pipe is protocol based so that it can be used with Underscore among other objects.
`);
let compose = doc(function compose(first_fn, ...fns) {
return function (...args) {
return reduce.bind(fns)(function (result, f) {
return call.bind(f)(result);}, call.bind(first_fn)(...args));};}, `
composes a list of [[Call]] objects into a single function

example:
  compose(:users 0 :id)({users: [{id: 123}]}) // -> 123 
`);
let def_call = doc(function def_call(f) {
f[Call] = function (first, ...rest) {
return f.bind(first)(...rest);};
return f;}, `
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
`);
let iter = compose_decorators(function iter() {
return this?.[Symbol['iterator']]() ?? iter.bind([])();}, def_call, (...__args) => doc(__args[0], `
Returns an iterator of 'this'.

In the case 'this' is nil, you will get an empty array iterator.
`));
let iter__q = compose_decorators(function iter__q() {
return iter.bind(this)() === this;}, def_call, (...__args) => doc(__args[0], `
Determines if 'this' is a valid Symbol.iterator

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol for more
`));
const Iterator = Symbol("Iterator");
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
let skip = doc(function skip(n) {
return iterator_impl.bind(this)()['skip']['call'](iter.bind(this)(), n);}, `
lazily skips 'n' elements for an iterator

Examples:
  [1 2 3 4 5]::skip(1)::into([]) // -> [2 3 4 5]
  [1 2 3]::skip(20)::into([]) // -> []
`);
let take = doc(function take(n) {
return iterator_impl.bind(this)()['take']['call'](iter.bind(this)(), n);}, `
lazily takes 'n' elements for an iterator

Examples:
  [1 2 3 4]::take(2)::into([]) // -> [1 2]
  [1 2 3]::take(200)::into([]) // -> [1 2 3]
`);
let each = doc(function each(...fns) {
return iterator_impl.bind(this)()['each']['call'](iter.bind(this)(), compose(...fns));}, `
eagerly consumes an iterator by calling 'f' on each elem

Examples:
  [{name: \"bob\"} {name: \"jill\"}]
    ::each(:name log) // prints 'bob' and 'jill'
`);
let until = doc(function until(...fns) {
return iterator_impl.bind(this)()['until']['call'](iter.bind(this)(), compose(...fns));}, `
lazily defines an end point for an iterator

Examples:
  [1 2 3 4 5 6 7]
    ::until(_ > 3)
    ::into([]) // [1 2 3]
`);
let zip = doc(function zip(...iterables) {
return iterator_impl.bind(this)()['zip']['call'](iter.bind(this)(), ...iterables);}, `
lazily zips together a number of iterators

Examples:
  [:axe :hammer :pickaxe]
    ::zip([3 1 4])
    ::into(~Map{})
  // -> ~Map{axe: 3, hammer: 1, pickaxe: 4}
`);
let map = doc(function map(...fns) {
return iterator_impl.bind(this)()['map']['call'](iter.bind(this)(), compose(...fns));}, `
lazily maps functions over an iterator

Examples:
  [{name: \"marcelle\"}, {name: \"jack\"}]
    ::map(:name len)
    ::into([]) // [8 4]
`);
let flat_map = doc(function flat_map(...fns) {
return iterator_impl.bind(this)()['flat_map']['call'](iter.bind(this)(), compose(...fns));}, `
lazily flat maps functions over an iterator

Examples:
  [[1 5] [6 10]]
    ::flat_map(fn([start, end]) = (start..=end)::into([]))
    ::into([]) // [1 2 3 4 5 6 7 8 9 10]
`);
let find = doc(function find(...fns) {
return iterator_impl.bind(this)()['find']['call'](iter.bind(this)(), compose(...fns));}, `
eagerly finds a value in an iterator

Examples:
  [1 2 3 4 5]
    ::find(#{4 5}) // 4
`);
let keep = doc(function keep(...fns) {
return iterator_impl.bind(this)()['keep']['call'](iter.bind(this)(), compose(...fns));}, `
lazily keeps values based off a condition

Examples:
  [{admin: true, name: \"bob\"} {admin: false, name: \"jill\"}]
    ::keep(:admin)
    ::into([]) // [{admin: true, name: \"bob\"}]
`);
let reject = doc(function reject(...fns) {
return keep.bind(this)(...fns, negate.call(_));}, `
lazily rejects values based of a condition

Examples:
  [{admin: true, name: \"bob\"} {admin: false, name: \"jill\"}]
    ::reject(:admin)
    ::into([]) // [{admin: false, name: \"jill\"}]
`);
let any__q = doc(function any__q(...fns) {
return iterator_impl.bind(this)()['any?']['call'](iter.bind(this)(), compose(...fns));}, `
eagerly finds out if an element matches the condition

Examples:
  [1 2 3 4 5]::any?(#{3}) // true
`);
let all__q = doc(function all__q(...fns) {
return iterator_impl.bind(this)()['all?']['call'](iter.bind(this)(), compose(...fns));}, `
eagerly finds out all elements matches the condition

Examples:
  [1 2 3 4 5]::all?(_ > 0) // true
`);
let reduce = doc(function reduce(f, start) {
return iterator_impl.bind(this)()['reduce']['call'](iter.bind(this)(), call.bind(f), start);}, `
eagerly reduces an iterator

Examples:
  [1 2 3 4 5]::reduce(+ 0) // 15
`);
let split = doc(function split(...fns) {
return iterator_impl.bind(this)()['split']['call'](iter.bind(this)(), compose(...fns));}, `
lazily splits an iterator

Examples:
  \"hey there buddy\"
    ::split(#{`, `})
    ::take(2)
    ::into([]) // [\"hey\" \"there\"]
`);
let compact = doc(function compact() {
return iterator_impl.bind(this)()['compact']['call'](iter.bind(this)());}, `
lazily compacts an iterator

Examples:
  [{status: :great} {status: :broken} {}]
    ::map(:status)
    ::compact()
    ::into([]) // [:great :broken]
`);
let join = doc(function join(sep) {
return reduce.bind(this)(function (prev, cur) {
if (truthy(empty__q.bind(prev)())) {
return cur;
} else {
return plus.call(prev,plus.call(sep,cur));
};}, "");}, `
eagerly joins an iterator

Examples:
  [\"hey\" \"there\"]
    ::join(\" \") // \"hey there\"
`);
const Into = Symbol("Into");
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
let into = doc(function into(output) {
return output[Into](this);}, `
converts 'this' iterator into 'output', prepending existing values in 'output'

Examples:
  [1 2 3 4]
    ::into(#{}) // #{1 2 3 4}

  [[:score 10] [:grade :bad]]
    ::into({}) // {score: 20, grade: :bad}
`);
const Collection = Symbol("Collection");
ObjectLiteral.prototype[Collection] = new ObjectLiteral({['at'](key) {
return this[key];
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
let len = compose_decorators(function len() {
return this[Collection]['len']['call'](this);}, def_call, (...__args) => doc(__args[0], `
gets length of a collection

Examples:
  [1 2 3]::len() // 3
  #{1 2 3}::len() // 3
  {a: 10}::len() // 1
  ~Map{a: :a, b: :b}::len() // 2
`));
let empty__q = compose_decorators(function empty__q() {
return this?.[Collection]['empty?']['call'](this) ?? true;}, def_call, (...__args) => doc(__args[0], `
determines if a collection is empty

Examples:
  []::empty?() // true
  #{1}::empty?() // false
  null::empty?() // true
  `, `::empty?() // true
`));
let not_empty__q = compose_decorators(function not_empty__q() {
return negate.call(empty__q.bind(this)());}, def_call, (...__args) => doc(__args[0], `
determines if a collection is not empty

Examples:
  [1]::not_empty?() // true
  `, `::not_empty?() // false
  null::not_empty?() // false
`));
let at = doc(function at(key_or_idx) {
return this[Collection]['at']['call'](this, key_or_idx);}, `
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
`);
let has__q = doc(function has__q(val) {
return this[Collection]['has?']['call'](this, val);}, `
determines if a collection has a value

Examples:
  [1 2 3 4]::has?(3) // true
  #{1 2 3}::has?(2) // true
  {a: 10}::has?(:a) // true
`);
const Record = Symbol("Record");
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
let keys = compose_decorators(function keys() {
return this[Record]['keys']['call'](this);}, def_call, (...__args) => doc(__args[0], `
Get keys of a record as an iterator OR a collection

Example:
  {a: 10}::keys() // [\"a\"]
  ~Map{a: 10}::keys()::into(#{}) // #{:a}
`));
let values = compose_decorators(function values() {
return this[Record]['values']['call'](this);}, def_call, (...__args) => doc(__args[0], `
Get values of a record as an iterator OR a collection

Example:
  {a: 10}::values() // [10]
  ~Map{a: 10}::values()::into(#{}) // #{10}
`));
let insert = doc(function insert(key, value) {
return this[Record]['insert']['call'](this, key, value);}, `
Insert key & value into a record

Example:
  {a: 10}::insert(:b 20) // {a: 10, b: 20}
  ~Map{a: 10}::insert(:b 20) // ~Map{a: 10, b: 20}
`);
let merge = doc(function merge(other) {
return this[Record]['merge']['call'](this, other);}, `
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
`);
Map[Record] = function (entries) {
return new Map(entries);};
Object[Record] = Object['fromEntries'];
let record__q = doc(function record__q() {
return exists__q.bind(this[Record])();}, `
Determines if 'this' is a record

Examples:
  {}::record?() // true
  ~Map{}::record?() // true
  #{}::record?() // false
`);
let construct_record = doc(function construct_record(entries) {
return this[Record](entries);}, `
Constructs a record based off an entries array

This is used for record syntax

Examples:
  Map::construct_record([[:a 20]])
    ==
  ~Map{a: 20}
`);
const Vector = Symbol("Vector");
let vector__q = doc(function vector__q() {
return exists__q.bind(this[Vector])();}, `
Determines if 'this' conforms to the vector protocol

Examples:
  []::vector?() // true
  #{}::vector?() // true
  {}::vector?() // false
`);
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
let push = doc(function push(val) {
return this[Vector]['push']['call'](this, val);}, `
push a value onto a vector

Examples:
  [1 2]::push(3) // [1 2 3]
  // order is not guaranteed for sets
  #{1 2}::push(3) // #{3 1 2}
`);
let replace = doc(function replace(old_val, new_val) {
return this[Vector]['replace']['call'](this, old_val, new_val);}, `
replace a value in a vector

Examples:
  [1 2 3]::replace(2 3) // [1 3 3]
  #{1 2 3}::replace(2 3) // #{1 3}
`);
let concat = doc(function concat(other) {
return this[Vector]['concat']['call'](this, other);}, `
concat two vectors

Examples:
  [1 2]::concat([3 4]) // [1 2 3 4]
  [1 2]::concat(#{3 4}) // [1 2 4 3] - set order unknowable
  #{1 2}::concat([3 4]) // #{1 2 3 4}
  #{1 2}::concat(#{2 3}) // #{1 2 3}
`);
const OrderedSequence = Symbol("OrderedSequence");
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
let prepend = doc(function prepend(val) {
return this[OrderedSequence]['prepend']['call'](this, val);}, `
inserts element at beginning of collection

Examples:
  [1 2 3]::prepend(0) // [0 1 2 3]
`);
let update_at = doc(function update_at(idx, ...fns) {
return this[OrderedSequence]['update_at']['call'](this, idx, compose(...fns));}, `
updates element at given index

Examples:
  [1 2 3]::update_at(1 as_keyword) // [1 :2 3]
`);
let insert_at = doc(function insert_at(idx, val) {
return this[OrderedSequence]['insert_at']['call'](this, idx, val);}, `
inserts element at given index

Examples:
  [1 2 4]::insert_at(1 3) // [1 2 3 4]
`);
let first = compose_decorators(function first() {
return this[OrderedSequence]['first']['call'](this);}, def_call, (...__args) => doc(__args[0], `
gets first element of collection

Examples:
  [1 2 3]::first() // 1
`));
let last = compose_decorators(function last() {
return this[OrderedSequence]['last']['call'](this);}, def_call, (...__args) => doc(__args[0], `
gets last element of collection

Examples:
  [1 2 3]::last() // 3
`));
Array[Vector] = function (entries) {
return entries;};
let construct_vector = doc(function construct_vector(entries) {
return this[Vector](entries);}, `
constructs vector based off entries

this is used for custom vector syntax

Examples:
  import { List } from \"immutable\"

  List::constructor_vector([1 2 3 4])
    ==
  ~List[1 2 3 4]
`);
const Equal = Symbol("Equal");
let impl_equal = doc(function impl_equal(Ctor, ...keys) {
Ctor.prototype[Equal] = function (other) {
return and.call(other instanceof Ctor, () => all__q.bind(keys)(function (key) {
return equals__q.call(this[key], other[key]);}.bind(this)));};
return Ctor;}, `
implement [[Equal]] for a generic constructor by
specifying the keys to measure equality by

Examples:
  fn Dog(@name, @age) {}

  new Dog(\"joey\" 1) == new Dog(\"joey\" 1) // false

  @impl_equal(:name :age)
  fn Dog(@name @age) {}

  new Dog(\"joey\" 1) == new Dog(\"joey\" 1) // true
`);
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
let equals__q = compose_decorators(function equals__q(other) {
return this?.[Equal](other) ?? this === other;}, def_call, (...__args) => doc(__args[0], `
[[Equal]] invocation

Examples:
  1::equals?(1) // true
  // is the same as
  1 == 1 // true
`));
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
let plus = compose_decorators(function plus(other) {
return this[Plus](other);}, def_call, (...__args) => doc(__args[0], `
[[Plus]] method for '+' infix operator

Examples:
  1::plus(2) == 1 + 2
`));
let negate = compose_decorators(function negate() {
return this?.[Negate]() ?? true;}, def_call, (...__args) => doc(__args[0], `
[[Negate]] method for '!' prefix operator

Examples:
  !true == true::negate()
`));
let minus = doc(function minus(other) {
return this[Minus](other);}, `
[[Minus]] method for '-' infix operator

Examples:
  1::minus(2) == 1 - 2
`);
let times = doc(function times(other) {
return this[Times](other);}, `
[[Times]] method for '*' infix operator

Examples:
  2::times(3) == 2 * 3
`);
let divide_by = doc(function divide_by(other) {
return this[Divide](other);}, `
[[Divide]] method for '/' infix operator

Examples:
  2::divide_by(3) == 2 / 3
`);
let exponent = doc(function exponent(other) {
return this[Exponent](other);}, `
[[Exponent]] method for '**' infix operator

Examples:
  2::exponent(3) == 2 ** 3
`);
let mod = doc(function mod(other) {
return this[Mod](other);}, `
[[Mod]] method for '%' infix operator

Examples:
  11::mod(2) == 11 % 2
`);
let greater_than = doc(function greater_than(other) {
return this[Comparable]['greater_than']['call'](this, other);}, `
[[Comparable]].greater_than method for '>' infix operator

Examples:
  2::greater_than(1) == 2 > 1
`);
let greater_than_eq = doc(function greater_than_eq(other) {
return this[Comparable]['greater_than_eq']['call'](this, other);}, `
[[Comparable]].greater_than_eq method for '>=' infix operator

Examples:
  2::greater_than_eq(2) == 2 >= 2
`);
let less_than = doc(function less_than(other) {
return this[Comparable]['less_than']['call'](this, other);}, `
[[Comparable]].less_than method for '<' infix operator

Examples:
  2::less_than(3) == 2 < 3
`);
let less_than_eq = doc(function less_than_eq(other) {
return this[Comparable]['less_than_eq']['call'](this, other);}, `
[[Comparable]].less_than_eq method for '<=' infix operator

Examples:
  2::less_than_eq(2) == 2 <= 3
`);
let and = doc(function and(thunk) {
return this?.[And](thunk);}, `
[[And]] method for '&&' infix operator

Examples:
  true::and(fn = :val) == true && :val
`);
let or = doc(function or(thunk) {
return this?.[Or](thunk) ?? thunk();}, `
[[Or]] method for '||' infix operator

Examples:
  false::or(fn = :val) == false || :val
`);
const JsLogFriendly = Symbol("JsLogFriendly");
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
let js_log_friendly = def_call(function js_log_friendly() {
return this?.[JsLogFriendly]();});
let log = def_call(function log(...args) {
console['log'](...args, this)
return this;});
function str(...args) {
return args['join']("");}
let nan__q = def_call(function nan__q() {
return Number['isNaN'](this);});
let num__q = def_call(function num__q() {
return equals__q.call(typeof(this), "number");});
let bigint__q = def_call(function bigint__q() {
return equals__q.call(typeof(this), "bigint");});
let str__q = def_call(function str__q() {
return equals__q.call(typeof(this), "string");});
let as_keyword = def_call(function as_keyword() {
return Keyword["for"](this['toString']());});
let as_num = def_call(function as_num() {
return Number(this);});
let as_str = def_call(function as_str() {
return this?.toString() ?? "";});
let exists__q = def_call(function exists__q() {
return negate.call(nil__q.bind(this)());});
function Underscore(transforms) {
this.transforms = transforms;
}
const UnderscoreInterpreter = Symbol("UnderscoreInterpreter");
let _ = new Underscore([new ObjectLiteral({'f': function id() {
return this;}, 'args': []})]);
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
return Object['prototype'][UnderscoreInterpreter]['call'](data, this, ...args);
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
Number.prototype[Inc] = function () {
return plus.call(this,(1));};
BigInt.prototype[Inc] = function () {
return plus.call(this,Keyword.for("custom_number_literal/n")[CustomNumberLiteral](1));};
String.prototype[Inc] = function () {
return String['fromCharCode'](plus.call(this['charCodeAt']((0)),(1)));};
function inc() {
return this[Inc]();}
let IRange = impl_equal(function IRange(start, end) {
this.start = start;
this.end = end;
}, Keyword.for("start"), Keyword.for("end"));
let ERange = impl_equal(function ERange(start, end) {
this.start = start;
this.end = end;
}, Keyword.for("start"), Keyword.for("end"));
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
function def_vector(Constructor) {
Constructor[Vector] = function (args) {
return new Constructor(...args);};
return Constructor;}
let def_record = doc(function def_record(Constructor) {
Constructor[Record] = function (entries) {
return new Constructor(entries);};
Constructor.prototype[Symbol['iterator']] = function () {
return iter.bind(this['entries'])();};
return Constructor;}, `
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
`);
let char_alpha__q = plus.call(into.bind((new IRange("a", "z")))(new Set([])),into.bind((new IRange("A", "Z")))(new Set([])));
let char_numeric__q = into.bind((new IRange("0", "9")))(new Set([]));
let char_alpha_numeric__q = plus.call(char_alpha__q,char_numeric__q);
let alpha__q = doc(function alpha__q() {
return all__q.bind(this)(char_alpha__q);}, "all characters in string are in a-z or A-Z");
let alpha_numeric__q = doc(function alpha_numeric__q() {
return all__q.bind(this)(char_alpha_numeric__q);}, "all characters in string are in a-z or A-Z or 0-9");
let CallMap = def_record(function CallMap(entries) {
this.entries = entries;
});
CallMap.prototype[Call] = function (value) {
return pipe.bind(find.bind(this)(function ([callable, _]) {
return call.bind(callable)(value);}))(function ([_, val]) {
return val;});};
globalThis[Keyword.for("Call")] = Call;
globalThis[Keyword.for("call")] = call;
globalThis[Keyword.for("nil?")] = nil__q;
globalThis[Keyword.for("Pipe")] = Pipe;
globalThis[Keyword.for("pipe")] = pipe;
globalThis[Keyword.for("compose")] = compose;
globalThis[Keyword.for("iter")] = iter;
globalThis[Keyword.for("Iterator")] = Iterator;
globalThis[Keyword.for("skip")] = skip;
globalThis[Keyword.for("take")] = take;
globalThis[Keyword.for("each")] = each;
globalThis[Keyword.for("until")] = until;
globalThis[Keyword.for("zip")] = zip;
globalThis[Keyword.for("map")] = map;
globalThis[Keyword.for("flat_map")] = flat_map;
globalThis[Keyword.for("find")] = find;
globalThis[Keyword.for("split")] = split;
globalThis[Keyword.for("keep")] = keep;
globalThis[Keyword.for("reject")] = reject;
globalThis[Keyword.for("any?")] = any__q;
globalThis[Keyword.for("all?")] = all__q;
globalThis[Keyword.for("reduce")] = reduce;
globalThis[Keyword.for("Record")] = Record;
globalThis[Keyword.for("insert")] = insert;
globalThis[Keyword.for("merge")] = merge;
globalThis[Keyword.for("keys")] = keys;
globalThis[Keyword.for("record?")] = record__q;
globalThis[Keyword.for("construct_record")] = construct_record;
globalThis[Keyword.for("Vector")] = Vector;
globalThis[Keyword.for("vector?")] = vector__q;
globalThis[Keyword.for("at")] = at;
globalThis[Keyword.for("push")] = push;
globalThis[Keyword.for("prepend")] = prepend;
globalThis[Keyword.for("concat")] = concat;
globalThis[Keyword.for("has?")] = has__q;
globalThis[Keyword.for("replace")] = replace;
globalThis[Keyword.for("len")] = len;
globalThis[Keyword.for("first")] = first;
globalThis[Keyword.for("last")] = last;
globalThis[Keyword.for("empty?")] = empty__q;
globalThis[Keyword.for("not_empty?")] = not_empty__q;
globalThis[Keyword.for("construct_vector")] = construct_vector;
globalThis[Keyword.for("Equal")] = Equal;
globalThis[Keyword.for("equals?")] = equals__q;
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
globalThis[Keyword.for("nan?")] = nan__q;
globalThis[Keyword.for("str?")] = str__q;
globalThis[Keyword.for("as_keyword")] = as_keyword;
globalThis[Keyword.for("as_num")] = as_num;
globalThis[Keyword.for("as_str")] = as_str;
globalThis[Keyword.for("exists?")] = exists__q;
globalThis[Keyword.for("Negate")] = Negate;
globalThis[Keyword.for("Underscore")] = Underscore;
globalThis[Keyword.for("_")] = _;
globalThis[Keyword.for("Inc")] = Inc;
globalThis[Keyword.for("inc")] = inc;
globalThis[Keyword.for("IRange")] = IRange;
globalThis[Keyword.for("ERange")] = ERange;
globalThis[Keyword.for("ERangeNoMax")] = ERangeNoMax;
globalThis[Keyword.for("ERangeNoMin")] = ERangeNoMin;
globalThis[Keyword.for("IRangeNoMin")] = IRangeNoMin;
globalThis[Keyword.for("alpha?")] = alpha__q;
globalThis[Keyword.for("alpha_numeric?")] = alpha_numeric__q;
globalThis[Keyword.for("def_vector")] = def_vector;
globalThis[Keyword.for("def_record")] = def_record;
globalThis[Keyword.for("def_call")] = def_call;
globalThis[Keyword.for("into")] = into;
globalThis[Keyword.for("Into")] = Into;