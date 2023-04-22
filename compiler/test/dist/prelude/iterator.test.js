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
f[Doc] = doc_str['trim']();
return f;}
function log_doc() {
console['log'](this[Doc])
return this;}
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
return this?.[Pipe](f) ?? f(this);}, `
invokes [[Pipe]] protocol

args:
  ...callables: list of [[Call]] objects

returns:
  result of invoking 'callables' on this

nil handling:
  since nil doesn't impl Pipe, we'll call 'f' directly.

note on [[Pipe]]:
  pipe is protocol based so that it can be used with Underscore.
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
let iter = def_call(function iter() {
return or.call(this?.[Symbol['iterator']](), () => iter.bind([])());});
let iter__q = def_call(function iter__q() {
return iter.bind(this)() === this;});
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
function skip(n) {
return iterator_impl.bind(this)()['skip']['call'](iter.bind(this)(), n);}
function take(n) {
return iterator_impl.bind(this)()['take']['call'](iter.bind(this)(), n);}
function each(f) {
return iterator_impl.bind(this)()['each']['call'](iter.bind(this)(), call.bind(f));}
function until(...fns) {
return iterator_impl.bind(this)()['until']['call'](iter.bind(this)(), compose(...fns));}
function zip(...iterables) {
return iterator_impl.bind(this)()['zip']['call'](iter.bind(this)(), ...iterables);}
function map(...fns) {
return iterator_impl.bind(this)()['map']['call'](iter.bind(this)(), compose(...fns));}
function flat_map(...fns) {
return iterator_impl.bind(this)()['flat_map']['call'](iter.bind(this)(), compose(...fns));}
function find(...fns) {
return iterator_impl.bind(this)()['find']['call'](iter.bind(this)(), compose(...fns));}
function keep(...fns) {
return iterator_impl.bind(this)()['keep']['call'](iter.bind(this)(), compose(...fns));}
function reject(...fns) {
return keep.bind(this)(...fns, negate.call(_));}
function any__q(...fns) {
return iterator_impl.bind(this)()['any?']['call'](iter.bind(this)(), compose(...fns));}
function all__q(...fns) {
return iterator_impl.bind(this)()['all?']['call'](iter.bind(this)(), compose(...fns));}
function reduce(f, start) {
return iterator_impl.bind(this)()['reduce']['call'](iter.bind(this)(), call.bind(f), start);}
function split(...fns) {
return iterator_impl.bind(this)()['split']['call'](iter.bind(this)(), compose(...fns));}
function compact() {
return iterator_impl.bind(this)()['compact']['call'](iter.bind(this)());}
function join(sep) {
return reduce.bind(this)(function (prev, cur) {
if (truthy(empty__q.bind(prev)())) {
return cur;
} else {
return plus.call(prev,plus.call(sep,cur));
};}, "");}
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
function into(val) {
return val[Into](this);}
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
let len = def_call(function len() {
return this[Collection]['len']['call'](this);});
let empty__q = def_call(function empty__q() {
return this?.[Collection]['empty?']['call'](this) ?? true;});
let not_empty__q = def_call(function not_empty__q() {
return negate.call(empty__q.bind(this)());});
function at(key_or_idx) {
return this[Collection]['at']['call'](this, key_or_idx);}
function has__q(val) {
return this[Collection]['has?']['call'](this, val);}
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
let keys = def_call(function keys() {
return this[Record]['keys']['call'](this);});
let values = def_call(function values() {
return this[Record]['values']['call'](this);});
function insert(key, value) {
return this[Record]['insert']['call'](this, key, value);}
function merge(other) {
return this[Record]['merge']['call'](this, other);}
Map[Record] = function (entries) {
return new Map(entries);};
Object[Record] = Object['fromEntries'];
function record__q() {
return exists__q.bind(this[Record])();}
function construct_record(entries) {
return this[Record](entries);}
const Vector = Symbol("Vector");
function vector__q() {
return exists__q.bind(this[Vector])();}
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
function push(val) {
return this[Vector]['push']['call'](this, val);}
function replace(old_val, new_val) {
return this[Vector]['replace']['call'](this, old_val, new_val);}
function concat(other) {
return this[Vector]['concat']['call'](this, other);}
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
function prepend(val) {
return this[OrderedSequence]['prepend']['call'](this, val);}
function update_at(idx, ...fns) {
return this[OrderedSequence]['update_at']['call'](this, idx, compose(...fns));}
function insert_at(idx, val) {
return this[OrderedSequence]['insert_at']['call'](this, idx, val);}
let first = def_call(function first() {
return this[OrderedSequence]['first']['call'](this);});
let last = def_call(function last() {
return this[OrderedSequence]['last']['call'](this);});
Array[Vector] = function (entries) {
return entries;};
function construct_vector(entries) {
return this[Vector](entries);}
const Equal = Symbol("Equal");
function impl_equal(Ctor, ...keys) {
Ctor.prototype[Equal] = function (other) {
return and.call(other instanceof Ctor, () => all__q.bind(keys)(function (key) {
return equals__q.call(this[key], other[key]);}.bind(this)));};
return Ctor;}
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
function record_equals__q(other) {
if (truthy(this['constructor'] !== other['constructor'])) {
return false;
} else if (negate.call(equals__q.call(len.bind(this)(), len.bind(other)()))) {
return false;
} else {
return all__q.bind(this)(function ([key, value]) {
return equals__q.call(at.bind(other)(key), value);});
};}
Map.prototype[Equal] = record_equals__q;
ObjectLiteral.prototype[Equal] = record_equals__q;
let equals__q = def_call(function equals__q(other) {
return this?.[Equal](other) ?? this === other;});
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
if (truthy(typeof(this) !== type_str)) {
raise__b(str("Expected ", type_str))
};}
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
let plus = def_call(function plus(other) {
return this[Plus](other);});
let negate = def_call(function negate() {
return this?.[Negate]() ?? true;});
function minus(other) {
return this[Minus](other);}
function times(other) {
return this[Times](other);}
function divide_by(other) {
return this[Divide](other);}
function exponent(other) {
return this[Exponent](other);}
function mod(other) {
return this[Mod](other);}
function greater_than(other) {
return this[Comparable]['greater_than']['call'](this, other);}
function greater_than_eq(other) {
return this[Comparable]['greater_than_eq']['call'](this, other);}
function less_than(other) {
return this[Comparable]['less_than']['call'](this, other);}
function less_than_eq(other) {
return this[Comparable]['less_than_eq']['call'](this, other);}
function and(thunk) {
return this?.[And](thunk);}
function or(thunk) {
return this?.[Or](thunk) ?? thunk();}
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
console['log'](...args, js_log_friendly.bind(this)())
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
return plus.call(this,1n);};
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
function def_record(Constructor) {
Constructor[Record] = function (entries) {
return new Constructor(entries);};
Constructor.prototype[Symbol['iterator']] = function () {
return iter.bind(this['entries'])();};
return Constructor;}
let char_alpha__q = plus.call(into.bind((new IRange("a", "z")))(new Set([])),into.bind((new IRange("A", "Z")))(new Set([])));
let char_numeric__q = into.bind((new IRange("0", "9")))(new Set([]));
let char_alpha_numeric__q = plus.call(char_alpha__q,char_numeric__q);
function alpha__q() {
return all__q.bind(this)(char_alpha__q);}
function alpha_numeric__q() {
return all__q.bind(this)(char_alpha_numeric__q);}
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
globalThis[Keyword.for("alpha?")] = alpha__q;
globalThis[Keyword.for("alpha_numeric?")] = alpha_numeric__q;
globalThis[Keyword.for("def_vector")] = def_vector;
globalThis[Keyword.for("def_record")] = def_record;
globalThis[Keyword.for("def_call")] = def_call;import * as asserts from "https://deno.land/std@0.179.0/testing/asserts.ts";
let assert_equals = asserts['assertEquals'];
Deno['test']("[1 2 3] map", function () {
let plus_one = into.bind(map.bind([(1), (2), (3)])(plus.call(_,(1))))([]);
assert_equals(plus_one, [(2), (3), (4)])})
Deno['test']("[1 2 3] flat_map", function () {
let itself = into.bind(flat_map.bind(iter.bind([(1), (2), (3)])())((...__args) => [__args[0]]))([]);
assert_equals(itself, [(1), (2), (3)])})
Deno['test']("[1 2 3] any?", function () {
let has_two__q = any__q.bind(iter.bind([(1), (2), (3)])())(equals__q.call(_, (2)));
assert_equals(has_two__q, true)})
Deno['test']("[1 2 3] all?", function () {
let less_than_4__q = all__q.bind(iter.bind([(1), (2), (3)])())(less_than.call(_,(4)));
assert_equals(less_than_4__q, true)})
Deno['test']("[1 2 3] find first < 4", function () {
let one = find.bind(iter.bind([(1), (2), (3)])())(less_than.call(_,(4)));
assert_equals(one, (1))})
Deno['test']("[] empty?", function () {
assert_equals(empty__q.bind([])(), true)})
Deno['test']("[1] empty?", function () {
assert_equals(empty__q.bind([(1)])(), false)})
Deno['test']("[]::push(1)", function () {
assert_equals(push.bind([])((1)), [(1)])})
Deno['test']("#{}::push(1)", function () {
assert_equals(push.bind(new Set([]))((1)), new Set([(1)]))})
Deno['test']("\"\"::push(\"a\")", function () {
assert_equals(push.bind("")("a"), "a")})
Deno['test']("[1 2 3]::concat([2 3 4])", function () {
assert_equals(concat.bind([(1), (2), (3)])([(2), (3), (4)]), [(1), (2), (3), (2), (3), (4)])})
Deno['test']("#{1 2 3}::concat(#{2 3 4})", function () {
assert_equals(concat.bind(new Set([(1), (2), (3)]))(new Set([(2), (3), (4)])), new Set([(1), (2), (3), (2), (3), (4)]))})
Deno['test']("#{1 2 3}::concat([2 3 4])", function () {
assert_equals(concat.bind(new Set([(1), (2), (3)]))([(2), (3), (4)]), new Set([(1), (2), (3), (2), (3), (4)]))})
Deno['test']("{a: 2}::merge({a: 3})", function () {
assert_equals(merge.bind(new ObjectLiteral({'a': (2)}))(new ObjectLiteral({'a': (3)})), new ObjectLiteral({'a': (3)}))})
Deno['test']("{a: 2}::merge({b: 3})", function () {
assert_equals(merge.bind(new ObjectLiteral({'a': (2)}))(new ObjectLiteral({'b': (3)})), new ObjectLiteral({'a': (2), 'b': (3)}))})
Deno['test']("{a: 2}::merge(~Map{b: 3})", function () {
assert_equals(merge.bind(new ObjectLiteral({'a': (2)}))(construct_record.call(Map, [[Keyword.for("b"), (3)]])), new ObjectLiteral({'a': (2), 'b': (3)}))})
Deno['test']("{a: 2}::merge(~Map{a: 3})", function () {
assert_equals(merge.bind(new ObjectLiteral({'a': (2)}))(construct_record.call(Map, [[Keyword.for("a"), (3)]])), new ObjectLiteral({'a': (3)}))})
Deno['test']("~Map{a: 2}::merge(~Map{a: 3})", function () {
assert_equals(merge.bind(construct_record.call(Map, [[Keyword.for("a"), (2)]]))(construct_record.call(Map, [[Keyword.for("a"), (3)]])), construct_record.call(Map, [[Keyword.for("a"), (3)]]))})
Deno['test']("~Map{a: 2}::merge({a: 3})", function () {
assert_equals(merge.bind(construct_record.call(Map, [[Keyword.for("a"), (2)]]))(new ObjectLiteral({'a': (3)})), construct_record.call(Map, [[Keyword.for("a"), (3)]]))})
Deno['test']("~Map{a: 2}::merge(~Map{b: 3})", function () {
assert_equals(merge.bind(construct_record.call(Map, [[Keyword.for("a"), (2)]]))(construct_record.call(Map, [[Keyword.for("b"), (3)]])), construct_record.call(Map, [[Keyword.for("a"), (2)], [Keyword.for("b"), (3)]]))})