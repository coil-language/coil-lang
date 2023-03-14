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
const Call = Symbol("Call");
Symbol.prototype[Call] = function (obj, ...args) {
return obj[this](...args);};
Function.prototype[Call] = function (...args) {
return this(...args);};
Set.prototype[Call] = function (key) {
return this.has(key);};
Map.prototype[Call] = function (key) {
return this.get(key);};
ObjectLiteral.prototype[Call] = function (key) {
return this[key];};
Array.prototype[Call] = function (index) {
return this.at(index);};
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
function call(...args) {
return this?.[Call](...args);}
Set.prototype[Keyword.for("bind")] = function (val) {
return function () {
return call.bind(this)(val);}.bind(this);};
Map.prototype[Keyword.for("bind")] = function (val) {
return function () {
return call.bind(this)(val);}.bind(this);};
let nil__q = Object.freeze(new Set([undefined, null]));
const Pipe = Symbol("Pipe");
Object.prototype[Pipe] = function (callable) {
return call.bind(callable)(this);};
function pipe_one(callable) {
if (truthy(nil__q.bind(this)())) {
return call.bind(callable)(this);
} else {
return this[Pipe](callable);
};}
function pipe(...callables) {
return reduce.bind(iter.bind(callables)())(function (r, c) {
return pipe_one.bind(r)(c);}, this);}
function compose(first_fn, ...fns) {
return function (...args) {
return reduce.bind(iter.bind(fns)())(function (result, f) {
return call.bind(f)(result);}, call.bind(first_fn)(...args));};}
function impl_callable(f) {
f[Call] = function (first, ...rest) {
return f.bind(first)(...rest);};
return f;}
let iter = impl_callable(function iter() {
return this[Symbol.iterator]();});
let ArrayIterator = Object.getPrototypeOf(iter.bind([])());
let MapIterator = Object.getPrototypeOf(iter.bind(new Map())());
let StringIterator = Object.getPrototypeOf(iter.bind("")());
let SetIterator = Object.getPrototypeOf(iter.bind(new Set([]))());
let GeneratorFunction = Object.getPrototypeOf(function *() {
});
const Iterable = Symbol("Iterable");
let iterable_collection_impl = new ObjectLiteral({empty__q() {
return this.done;
}, *take(n) {
for  (let [elem, i] of zip.bind(this)(new IRange((0), Infinity))) {
if (truthy(eq__q.call(i, n))) {
break;
};
yield elem
};
}, *drop(n) {
let size = len.bind(this)();
for  (let [elem, i] of zip.bind(this)(new IRange((0), Infinity))) {
if (truthy(greater_than.call((minus.call(size,i)),n))) {
break;
};
yield elem
};
}, *until(f) {
for  (let elem of this) {
if (truthy(f(elem))) {
break;
};
yield elem
};
}, *skip(n) {
for  (let [elem, i] of zip.bind(this)(new IRange((0), Infinity))) {
if (truthy(less_than.call(i,n))) {
continue;
};
yield elem
};
}, find(f) {
for  (let elem of this) {
if (truthy(f(elem))) {
return elem;
};
};
}, *zip(...collections) {
let generators = as_array.bind(map.bind(iter.bind([this, ...collections])())(iter))();
while (true) {
let gen_states = as_array.bind(map.bind(iter.bind(generators)())((...__args) => __args[0].next()))();
if (truthy(any__q.bind(iter.bind(gen_states)())(Keyword.for("done")))) {
break;
};
yield as_array.bind(map.bind(iter.bind(gen_states)())(Keyword.for("value")))()
};
}, reduce(f, start) {
let acc = start;
for  (let elem of this) {
acc = f(acc, elem)
};
return acc;
}, *map(f) {
for  (let elem of this) {
yield f(elem)
};
}, *flat_map(f) {
for  (let elem of this) {
yield* f(elem)
};
}, each(f) {
for  (let elem of this) {
f(elem)
};
}, *keep(f) {
for  (let elem of this) {
if (truthy(f(elem))) {
yield elem
};
};
}, all__q(f) {
for  (let elem of this) {
if (truthy(negate.call(f(elem)))) {
return false;
};
};
return true;
}, any__q(f) {
for  (let elem of this) {
if (truthy(f(elem))) {
return true;
};
};
return false;
}});
ArrayIterator[Iterable] = iterable_collection_impl;
StringIterator[Iterable] = iterable_collection_impl;
MapIterator[Iterable] = iterable_collection_impl;
SetIterator[Iterable] = iterable_collection_impl;
GeneratorFunction.prototype[Iterable] = iterable_collection_impl;
function skip(n) {
return this[Iterable].skip.call(this, n);}
function take(n) {
return this[Iterable].take.call(this, n);}
function drop(n) {
return this[Iterable].drop.call(this, n);}
function each(f) {
return this[Iterable].each.call(this, call.bind(f));}
function until(f) {
return this[Iterable].until.call(this, call.bind(f));}
function zip(...iterables) {
return this[Iterable].zip.call(this, ...iterables);}
function map(...fns) {
return this[Iterable].map.call(this, compose(...fns));}
function flat_map(...fns) {
return this[Iterable].flat_map.call(this, compose(...fns));}
function find(f) {
return this[Iterable].find.call(this, call.bind(f));}
function keep(f) {
return this[Iterable].keep.call(this, call.bind(f));}
function reject(f) {
return keep.bind(this)(compose(f, negate.call(_)));}
function any__q(...fns) {
return this[Iterable].any__q.call(this, compose(...fns));}
function all__q(...fns) {
return this[Iterable].all__q.call(this, compose(...fns));}
function reduce(f, start) {
if (truthy(and.call(nil__q.bind(start)(), () => f[Identity]))) {
start = f[Identity]
};
return this[Iterable].reduce.call(this, call.bind(f), start);}
const ReversedIterator = Symbol("ReversedIterator");
function *_reversed_impl() {
for  (let i of new IRange((1), len.bind(this)())) {
yield this.at(times.call(i,(-1)))
};}
Array.prototype[ReversedIterator] = _reversed_impl;
String.prototype[ReversedIterator] = _reversed_impl;
let reversed = impl_callable(function reversed() {
return this[ReversedIterator]();});
const Record = Symbol("Record");
Object.prototype[Record] = new ObjectLiteral({at(key) {
return this[key];
}, keys() {
return Object.keys(this);
}, has__q(key) {
return key in this;
}, len() {
return keys.bind(this)().length;
}, empty__q() {
return eq__q.call(len.bind(this)(), (0));
}});
ObjectLiteral.prototype[Record] = new ObjectLiteral({at(key) {
return this[key];
}, insert(key, value) {
return new ObjectLiteral({...this, [key]: value});
}, merge(other) {
return new ObjectLiteral({...this, ...other});
}, keys() {
return Object.keys(this);
}, has__q(key) {
return key in this;
}, len() {
return keys.bind(this)().length;
}, empty__q() {
return eq__q.call(len.bind(this)(), (0));
}});
Map.prototype[Record] = new ObjectLiteral({at(key) {
return this.get(key);
}, insert(key, value) {
return this.set(key, value);
}, merge(other) {
return new Map([...this.entries(), ...other.entries()]);
}, keys() {
return this.keys();
}, has__q(key) {
return this.has(key);
}, len() {
return this.size;
}, empty__q() {
return this.size === (0);
}, first() {
return this.entries().next().value;
}});
function insert(key, value) {
return this[Record].insert.call(this, key, value);}
function merge(other) {
return this[Record].merge.call(this, other);}
function keys() {
return this[Record].keys.call(this);}
Map[Record] = function (entries) {
return new Map(entries);};
function record__q() {
return exists__q.bind(this[Record])();}
function construct_record(entries) {
return this[Record](entries);}
const Vector = Symbol("Vector");
function vector__q() {
return exists__q.bind(this[Vector])();}
Array.prototype[Vector] = new ObjectLiteral({at(idx) {
return this.at(idx);
}, push(value) {
return [...this, value];
}, concat(other) {
return [...this, ...other];
}, has__q(value) {
return any__q.bind(this)(eq__q.call(_, value));
}, replace(old_value, new_value) {
return as_array.bind(map.bind(iter.bind(this)())(function (val) {
if (truthy(eq__q.call(val, old_value))) {
return new_value;
} else {
return val;
};}))();
}, len() {
return this.length;
}, empty__q() {
return this.length === (0);
}, first() {
return this[(0)];
}, last() {
return this.at((-1));
}});
Set.prototype[Vector] = new ObjectLiteral({push(value) {
return [...this, value];
}, concat(other) {
return new Set([...this, ...other]);
}, has__q(value) {
return this.has(value);
}, replace(old_value, new_value) {
let self = new Set(this);
self.delete(old_value)
return self.add(new_value);
}, len() {
return this.size;
}, empty__q() {
return this.size === (0);
}});
String.prototype[Vector] = new ObjectLiteral({push(value) {
return plus.call(this,value);
}, concat(other) {
return plus.call(this,other);
}, has__q(value) {
return this.includes(value);
}, replace(old_value, new_value) {
return this.replace(old_value, new_value);
}, len() {
return this.length;
}, empty__q() {
return this.length === (0);
}, first() {
return this[(0)];
}, last() {
return this.at((-1));
}});
function at(idx_or_key) {
return (or.call(this[Vector], () => this[Record])).at.call(this, idx_or_key);}
function push(value) {
return this[Vector].push.call(this, value);}
function concat(other) {
return this[Vector].concat.call(this, other);}
function has__q(value) {
return (or.call(this[Vector], () => this[Record])).has__q.call(this, value);}
function replace(old_value, new_value) {
return this[Vector].replace.call(this, old_value, new_value);}
let len = impl_callable(function len() {
return (or.call(this[Vector], () => this[Record])).len.call(this);});
let first = impl_callable(function first() {
return (or.call(this[Vector], () => this[Record])).first.call(this);});
let last = impl_callable(function last() {
return (or.call(this[Vector], () => this[Record])).last.call(this);});
function empty__q() {
if (truthy(nil__q.bind(this)())) {
return true;
} else {
return (or.call(this[Vector], () => or.call(this[Record], () => this[Iterable]))).empty__q.call(this);
};}
function not_empty__q() {
return negate.call(empty__q.bind(this)());}
Array[Vector] = function (entries) {
return entries;};
function construct_vector(entries) {
return this[Vector](entries);}
const Validation = Symbol("Validation");
const Constructors = Symbol("Constructors");
const Defaults = Symbol("Defaults");
function StructValidationError(message) {
this.name = "StructValidationError"
this.message = message
this.stack = (new Error()).stack}
StructValidationError.prototype = new Error()
function validate_struct(struct_name) {
if (truthy(negate.call((Validation in this)))) {
return true;
};
function error_msg(key, validator) {
return str(struct_name, " validation failed.\n", "Failed at ", key, ".\n", "Expected [", validator, "]", ", got value ", this[key], ".");}
for  (let [key, validator] of this[Validation]) {
if (truthy(matches__q.bind(validator)(this[key]))) {
continue;
} else {
raise__b(new StructValidationError(error_msg.bind(this)(key, validator)))
};
};}
function construct_struct_values() {
if (truthy(negate.call((Constructors in this)))) {
return null;
};
for  (let [key, f] of this[Constructors]) {
if (truthy(eq__q.call(typeof(f), "function"))) {
f = f.bind(this)
};
let __coil_if_let_temp = call.bind(f)(this[key]);
if (truthy(__coil_if_let_temp)) {
let prop_val = __coil_if_let_temp;
this[key] = prop_val
};
};}
function set_struct_defaults() {
if (truthy(negate.call((Defaults in this)))) {
return null;
};
for  (let [key, fallback] of this[Defaults]) {
if (truthy(exists__q.bind(this[key])())) {
continue;
} else {
this[key] = fallback
};
};}
function Struct(name, ...properties) {
function Constructor(...args) {
let i = (0);
for  (let key of properties) {
this[key] = args[i]
i = plus.call(i, (1))
};
validate_struct.bind(this)(name)
construct_struct_values.bind(this)(this)
set_struct_defaults.bind(this)(this)}
Object.defineProperty(Constructor, "name", new ObjectLiteral({value: name}))
return Constructor;}
Struct[Vector] = function (args) {
return Struct(...args);};
const Equal = Symbol("Equal");
function strict_eq__q(other) {
return this === other;}
Object.prototype[Equal] = strict_eq__q;
function vector_eq__q(other) {
if (truthy(this.constructor !== other.constructor)) {
return false;
};
if (truthy(negate.call(eq__q.call(len.bind(this)(), len.bind(other)())))) {
return false;
};
return all__q.bind(zip.bind(iter.bind(this)())(other))(function ([a, b]) {
return eq__q.call(a, b);});}
function record_eq__q(other) {
if (truthy(this.constructor !== other.constructor)) {
return false;
};
if (truthy(negate.call(eq__q.call(len.bind(this)(), len.bind(other)())))) {
return false;
};
return all__q.bind(iter.bind(this)())(function ([key, value]) {
return eq__q.call(at.bind(other)(key), value);});}
Set.prototype[Equal] = vector_eq__q;
Array.prototype[Equal] = vector_eq__q;
Map.prototype[Equal] = record_eq__q;
ObjectLiteral.prototype[Equal] = record_eq__q;
let eq__q = impl_callable(function eq__q(other) {
if (truthy(nil__q.bind(this)())) {
return this === other;
} else {
return this[Equal](other);
};});
const Identity = Symbol("Identity");
Number.prototype[Identity] = (0);
BigInt.prototype[Identity] = 0n;
String.prototype[Identity] = "";
function identity() {
if (truthy(nil__q.bind(this)())) {
return this;
} else {
return this[Identity];
};}
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
return js_negate(this);};
Object.prototype[And] = function (thunk) {
return js_and(this, thunk);};
Object.prototype[Or] = function (thunk) {
return js_or(this, thunk);};
Set.prototype[Plus] = function (other_set) {
return concat.bind(this)(other_set);};
Number.prototype[Plus] = function (other) {
assert__b(typeof(other) === "number", 456, 11, `typeof(other) === "number"`,);
return js_plus(this, other);};
Number.prototype[Minus] = function (other) {
assert__b(typeof(other) === "number", 460, 11, `typeof(other) === "number"`,);
return js_minus(this, other);};
Number.prototype[Times] = function (other) {
assert__b(typeof(other) === "number", 464, 11, `typeof(other) === "number"`,);
return js_times(this, other);};
Number.prototype[Divide] = function (other) {
assert__b(typeof(other) === "number", 468, 11, `typeof(other) === "number"`,);
return js_divide(this, other);};
Number.prototype[Exponent] = function (other) {
assert__b(typeof(other) === "number", 472, 11, `typeof(other) === "number"`,);
return js_exponent(this, other);};
Number.prototype[Mod] = function (other) {
assert__b(typeof(other) === "number", 476, 11, `typeof(other) === "number"`,);
return js_mod(this, other);};
BigInt.prototype[Plus] = function (other) {
assert__b(typeof(other) === "bigint", 480, 11, `typeof(other) === "bigint"`,);
return js_plus(this, other);};
BigInt.prototype[Minus] = function (other) {
assert__b(typeof(other) === "bigint", 484, 11, `typeof(other) === "bigint"`,);
return js_minus(this, other);};
BigInt.prototype[Times] = function (other) {
assert__b(typeof(other) === "bigint", 488, 11, `typeof(other) === "bigint"`,);
return js_times(this, other);};
BigInt.prototype[Divide] = function (other) {
assert__b(typeof(other) === "bigint", 492, 11, `typeof(other) === "bigint"`,);
return js_divide(this, other);};
BigInt.prototype[Exponent] = function (other) {
assert__b(typeof(other) === "bigint", 496, 11, `typeof(other) === "bigint"`,);
return js_exponent(this, other);};
BigInt.prototype[Mod] = function (other) {
assert__b(typeof(other) === "bigint", 500, 11, `typeof(other) === "bigint"`,);
return js_mod(this, other);};
let ComparableMixin = new ObjectLiteral({greater_than_eq(other) {
return or.call(greater_than.bind(this)(other), () => (eq__q.call(this, other)));
}, less_than_eq(other) {
return or.call(less_than.bind(this)(other), () => (eq__q.call(this, other)));
}});
Number.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {
assert__b(typeof(other) === "number", 510, 13, `typeof(other) === "number"`,);
return js_greater_than(this, other);
}, less_than(other) {
assert__b(typeof(other) === "number", 514, 13, `typeof(other) === "number"`,);
return js_less_than(this, other);
}});
BigInt.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {
assert__b(typeof(other) === "bigint", 521, 13, `typeof(other) === "bigint"`,);
return js_greater_than(this, other);
}, less_than(other) {
assert__b(typeof(other) === "bigint", 525, 13, `typeof(other) === "bigint"`,);
return js_less_than(this, other);
}});
String.prototype[Plus] = function (other) {
assert__b(typeof(other) === "string", 530, 11, `typeof(other) === "string"`,);
return js_plus(this, other);};
String.prototype[Times] = function (amount) {
assert__b(typeof(amount) === "number", 534, 11, `typeof(amount) === "number"`,);
return this.repeat(amount);};
String.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {
assert__b(typeof(other) === "string", 540, 13, `typeof(other) === "string"`,);
return js_greater_than(this, other);
}, less_than(other) {
assert__b(typeof(other) === "string", 544, 13, `typeof(other) === "string"`,);
return js_less_than(this, other);
}});
let plus = impl_callable(function plus(other) {
if (truthy(this[Plus])) {
return this[Plus](other);
} else {
return (or.call(concat.bind(this), () => merge.bind(this)))(other);
};});
let negate = impl_callable(function negate() {
if (truthy(nil__q.bind(this)())) {
return true;
} else {
return this[Negate]();
};});
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
return this[Comparable].greater_than.call(this, other);}
function greater_than_eq(other) {
return this[Comparable].greater_than_eq.call(this, other);}
function less_than(other) {
return this[Comparable].less_than.call(this, other);}
function less_than_eq(other) {
return this[Comparable].less_than_eq.call(this, other);}
function and(thunk) {
if (truthy(nil__q.bind(this)())) {
return this;
} else {
return this[And](thunk);
};}
function or(thunk) {
if (truthy(nil__q.bind(this)())) {
return thunk();
} else {
return this[Or](thunk);
};}
const Printable = Symbol("Printable");
function _resolve_keyword_str(kw) {
return replace.bind(replace.bind(kw)("__q", "?"))("__b", "!");}
ObjectLiteral.prototype[Printable] = function () {
return Object.assign(new Object(), as_obj.bind(map.bind(iter.bind(this)())(function ([k, v]) {
return [_resolve_keyword_str(k), printable.bind(v)()];}))());};
Map.prototype[Printable] = function () {
return as_map.bind(map.bind(iter.bind(this)())(function ([k, v]) {
return [printable.bind(k)(), printable.bind(v)()];}))();};
Array.prototype[Printable] = function () {
return as_array.bind(map.bind(iter.bind(this)())(printable))();};
Set.prototype[Printable] = function () {
return plus.call("#{",plus.call(as_array.bind(map.bind(iter.bind(this)())(printable))().join(", "),"}"));};
Keyword.prototype[Printable] = function () {
return plus.call(":",_resolve_keyword_str(this.value));};
Boolean.prototype[Printable] = function () {
return this;};
String.prototype[Printable] = function () {
return this;};
Function.prototype[Printable] = function () {
return this.name;};
let printable = impl_callable(function printable() {
if (truthy(or.call(nil__q.bind(this)(), () => negate.call(this[Printable])))) {
return this;
} else {
return this[Printable]();
};});
let log = impl_callable(function log(...args) {
console.log(...args, printable.bind(this)())
return this;});
function str(...args) {
return args.join("");}
let nan__q = impl_callable(function nan__q() {
return Number.isNaN(this);});
let str__q = impl_callable(function str__q() {
return eq__q.call(typeof(this), "string");});
let as_set = impl_callable(function as_set() {
return new Set(this);});
let as_array = impl_callable(function as_array() {
return Array["from"](this);});
let as_obj = impl_callable(function as_obj() {
return ObjectLiteral.from_entries(this);});
let as_map = impl_callable(function as_map() {
return new Map(this);});
let as_keyword = impl_callable(function as_keyword() {
return Keyword["for"](this.toString());});
let as_num = impl_callable(function as_num() {
return Number(this);});
let as_str = impl_callable(function as_str() {
return this.toString();});
let exists__q = impl_callable(function exists__q() {
return negate.call(nil__q.bind(this)());});
Set.prototype[Negate] = function () {
return (...__args) => negate.call(this.has(__args[0]));};
let Underscore = construct_vector.call(Struct, ["Underscore", Keyword.for("transforms")]);
const UnderscoreInterpreter = Symbol("UnderscoreInterpreter");
let _ = new Underscore([new ObjectLiteral({f: function id() {
return this;}, args: []})]);
Underscore.prototype[Symbol.iterator] = function () {
return this.insert(iter);};
Underscore.prototype[Keyword.for("insert")] = function (f, ...args) {
return new Underscore([...this.transforms, new ObjectLiteral({f, args})]);};
Object.prototype[UnderscoreInterpreter] = function (underscore) {
let initial_value = this;
let result = initial_value;
for  (let {f, args} of underscore.transforms) {
result = call.bind(f.bind(result))(...args)
if (truthy(result instanceof Underscore)) {
result = call.bind(result)(initial_value)
};
};
return result;};
Underscore.prototype[Call] = function (data, ...args) {
if (truthy(nil__q.bind(data)())) {
return Object.prototype[UnderscoreInterpreter].call(data, this, ...args);
} else {
return data[UnderscoreInterpreter](this, ...args);
};};
Underscore.prototype[Comparable] = new ObjectLiteral({less_than(val) {
return this.insert(less_than, val);
}, greater_than(val) {
return this.insert(greater_than, val);
}, less_than_eq(val) {
return this.insert(less_than_eq, val);
}, greater_than_eq(val) {
return this.insert(greater_than_eq, val);
}});
Underscore.prototype[Negate] = function () {
return this.insert(negate);};
Underscore.prototype[Equal] = function (other) {
return this.insert(eq__q, other);};
Underscore.prototype[Iterable] = new ObjectLiteral({empty__q() {
return this.insert(empty__q);
}, first() {
return this.insert(first);
}, take() {
return this.insert(take);
}, skip() {
return this.insert(skip);
}, find(f) {
return this.insert(find, f);
}, reduce(f, start) {
return this.insert(reduce, f, start);
}, map(f) {
return this.insert(map, f);
}, flat_map(f) {
return this.insert(flat_map, f);
}, each(f) {
return this.insert(each, f);
}, keep(f) {
return this.insert(keep, f);
}, all__q(f) {
return this.insert(all__q, f);
}, any__q(f) {
return this.insert(any__q, f);
}});
Underscore.prototype[ReversedIterator] = function () {
return this.insert(reversed);};
Underscore.prototype[Record] = new ObjectLiteral({at(key) {
return this.insert(at, key);
}, insert(key, value) {
return this.insert(insert, key, value);
}, merge(other) {
return this.insert(merge, other);
}, has__q(k) {
return this.insert(has__q, k);
}, len() {
return this.insert(len);
}});
Underscore.prototype[Vector] = new ObjectLiteral({push(value) {
return this.insert(push, value);
}, concat(other) {
return this.insert(concat, other);
}, replace(old_value, new_value) {
return this.insert(has__q, old_value, new_value);
}});
Underscore.prototype[Pipe] = function (f) {
return this.insert(pipe, f);};
Underscore.prototype[And] = function (thunk) {
return this.insert(and, thunk);};
Underscore.prototype[Or] = function (thunk) {
return this.insert(or, thunk);};
Underscore.prototype[Plus] = function (other) {
return this.insert(plus, other);};
Underscore.prototype[Minus] = function (other) {
return this.insert(minus, other);};
Underscore.prototype[Times] = function (other) {
return this.insert(times, other);};
Underscore.prototype[Divide] = function (other) {
return this.insert(divide, other);};
Underscore.prototype[Exponent] = function (other) {
return this.insert(exponent, other);};
Underscore.prototype[Mod] = function (other) {
return this.insert(mod, other);};
Underscore.prototype[Printable] = function () {
let fn_to_op = construct_record.call(Map, [["greater_than", ">"], ["greater_than_eq", ">="], ["less_than", "<"], ["less_than_eq", "<="], ["times", "*"], ["exponent", "**"], ["divide_by", "/"], ["plus", "+"], ["minus", "-"], ["mod", "%"], ["eq__q", "=="]]);
return str("_", reduce.bind(map.bind(skip.bind(iter.bind(this.transforms)())((1)))(function ({f, args}) {
if (truthy(eq__q.call(f, and))) {
let [thunk] = args;
return str(" && ", printable.bind(thunk())());
} else if (eq__q.call(f, or)) {
let [thunk] = args;
return str(" || ", printable.bind(thunk())());
};
let s = printable.bind(f)();
let __coil_if_let_temp = call.bind(fn_to_op)(s);
if (truthy(__coil_if_let_temp)) {
let op = __coil_if_let_temp;
let [rhs] = args;
return str(" ", op, " ", printable.bind(rhs)());
} else {
return str("::", s, "(", map.bind(args)(printable).join(", "), ")");
};}))(plus));};
const Inc = Symbol("Inc");
Number.prototype[Inc] = function () {
return plus.call(this,(1));};
BigInt.prototype[Inc] = function () {
return plus.call(this,1n);};
String.prototype[Inc] = function () {
return String.fromCharCode(plus.call(this.charCodeAt((0)),(1)));};
function inc() {
return this[Inc]();}
let IRange = construct_vector.call(Struct, ["IRange", Keyword.for("start"), Keyword.for("end")]);
let ERange = construct_vector.call(Struct, ["IRange", Keyword.for("start"), Keyword.for("end")]);
IRange.prototype[Call] = function (value) {
return and.call(greater_than_eq.call(value,this.start), () => less_than_eq.call(value,this.end));};
ERange.prototype[Call] = function (value) {
return and.call(greater_than_eq.call(value,this.start), () => less_than.call(value,this.end));};
IRange.prototype[Printable] = function () {
return str(printable.bind(this.start)(), "..", printable.bind(this.end)());};
ERange.prototype[Printable] = function () {
return str(printable.bind(this.start)(), "...", printable.bind(this.end)());};
IRange.prototype[Symbol.iterator] = function *() {
let {start: i, end} = this;
while (less_than_eq.call(i,end)) {
yield i
i = inc.bind(i)()
};};
ERange.prototype[Symbol.iterator] = function *() {
let {start: i, end} = this;
while (less_than.call(i,end)) {
yield i
i = inc.bind(i)()
};};
function DefVector() {
}
DefVector[Vector] = function (properties) {
let Constructor = null;
if (truthy(eq__q.call(at.bind(properties)((1)), _))) {
let kw = at.bind(properties)((2));
Constructor = function (fst, ...args) {
this[first.bind(properties)()] = fst
this[kw] = args}
} else if (eq__q.call(first.bind(properties)(), _)) {
let kw = at.bind(properties)((1));
Constructor = function (...args) {
this[kw] = args}
} else {
Constructor = function (...args) {
for  (let [key, i] of zip.bind(iter.bind(properties)())(new IRange((0), Infinity))) {
this[key] = args[i]
};}
};
Constructor[Vector] = function (args) {
return new Constructor(...args);};
return Constructor;};
function DefRecord() {
}
DefRecord[Vector] = function (property_name) {
let Constructor = function (entries) {
this[property_name] = entries};
Constructor[Record] = function (entries) {
return new Constructor(entries);};
Constructor.prototype[Record] = new ObjectLiteral({at(idx) {
return this.entries[idx];
}, keys() {
return map.bind(iter.bind(this.entries)())(first);
}, has__q(key) {
return has__q.bind(keys.bind(this)())(key);
}, len() {
return this.entries.length;
}});
Constructor.prototype[Symbol.iterator] = function () {
return iter.bind(this.entries)();};
return Constructor;};
const Matches = Symbol("Matches");
function matches__q(value) {
return this[Matches](value);}
Object.prototype[Matches] = function (value) {
if (truthy(and.call(negate.call(eq__q.call(typeof(this), "object")), () => negate.call(eq__q.call(typeof(this), "function"))))) {
return eq__q.call(this, value);
} else if (Call in this) {
return call.bind(this)(value);
} else {
return eq__q.call(this, value);
};};
Array.prototype[Matches] = function (arr) {
return and.call(eq__q.call(len.bind(arr)(), len.bind(this)()), () => all__q.bind(zip.bind(iter.bind(this)())(arr))(function ([pattern, val]) {
return matches__q.bind(pattern)(val);}));};
Set.prototype[Matches] = function (value) {
return has__q.bind(this)(value);};
Underscore.prototype[Matches] = function (value) {
if (truthy(nil__q.bind(value)())) {
return false;
} else {
return call.bind(this)(value);
};};
ObjectLiteral.prototype[Matches] = function (record) {
return all__q.bind(iter.bind(this)())(function (key, pattern) {
return matches__q.bind(pattern)(at.bind(record)(as_keyword.bind(key)()));});};
let Match = construct_vector.call(DefRecord, [Keyword.for("entries")]);
Match.prototype[Call] = function (val) {
return pipe.bind(find.bind(iter.bind(this.entries)())(function ([pattern, _ret]) {
return matches__q.bind(pattern)(val);}))((1));};
let char_alpha__q = plus.call(as_set.bind((new IRange("a", "z")))(),as_set.bind((new IRange("A", "Z")))());
let char_numeric__q = as_set.bind((new IRange("0", "9")))();
let char_alpha_numeric__q = plus.call(char_alpha__q,char_numeric__q);
function alpha__q() {
return all__q.bind(iter.bind(this)())(char_alpha__q);}
function alpha_numeric__q() {
return all__q.bind(iter.bind(this)())(char_alpha_numeric__q);}import {assertEquals} from "https://deno.land/std@0.179.0/testing/asserts.ts";
Deno.test("[1 2 3] map", function () {
let plus_one = as_array.bind(map.bind(iter.bind([(1), (2), (3)])())(plus.call(_,(1))))();
assertEquals(plus_one, [(2), (3), (4)])})
Deno.test("[1 2 3] flat_map", function () {
let itself = as_array.bind(flat_map.bind(iter.bind([(1), (2), (3)])())((...__args) => [__args[0]]))();
assertEquals(itself, [(1), (2), (3)])})
Deno.test("[1 2 3] any?", function () {
let has_two__q = any__q.bind(iter.bind([(1), (2), (3)])())(eq__q.call(_, (2)));
assertEquals(has_two__q, true)})
Deno.test("[1 2 3] all?", function () {
let less_than_4__q = all__q.bind(iter.bind([(1), (2), (3)])())(less_than.call(_,(4)));
assertEquals(less_than_4__q, true)})
Deno.test("[1 2 3] find first < 4", function () {
let one = find.bind(iter.bind([(1), (2), (3)])())(less_than.call(_,(4)));
assertEquals(one, (1))})