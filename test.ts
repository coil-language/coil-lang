function Nil() {}

let nil = new Nil();

function ObjectLiteral(obj) {
  Object.assign(this, obj);
}

function negate(val) {
  return !truthy(val);
}

function truthy(val) {
  return val !== nil && val !== null && val !== undefined && val !== false;
}

function js_and(a, b) {
  if (!truthy(b)) {
    return a;
  } else {
    return b;
  }
}

function js_or(a, b) {
  if (truthy(a)) {
    return a;
  }
  return b;
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

Keyword.cache = {};

Keyword.for = function (name) {
  return (Keyword.cache[name] ||= new Keyword(name));
};

Keyword.prototype.valueOf = function () {
  return this.value;
};
Keyword.prototype.toString = function () {
  return this.value;
};


const Call = Symbol("Call")
Function.prototype[Call] = function (...args) {

return this(...args)
}
Set.prototype[Call] = function (key) {

return this.has(key)
}
Map.prototype[Call] = function (key) {

return this.get(key)
}
ObjectLiteral.prototype[Call] = function (key) {

return this[key]
}
Array.prototype[Call] = function (index) {

return this.at(index)
}
String.prototype[Call] = function (collection) {

if (truthy(typeof(collection) === "string")) {

return collection[this]
} else {

return call.bind(collection)(this)
}
}
Keyword.prototype[Call] = function (collection) {

if (truthy(collection instanceof Keyword)) {

return collection[this]
} else {

return call.bind(collection)(this)
}
}
function call(...args) {

return this[Call](...args)
}
function pipe(callable) {

return call.bind(callable)(this)
}
function compose(f, ...fns) {

return function (...args) {

return reduce.bind(fns)(function (result, f) {

return call.bind(f)(result)
}, call.bind(f)(...args))
}
}
const Equal = Symbol("Equal")
function strict_eq__q(other) {

return this === other
}
Number.prototype[Equal] = strict_eq__q
String.prototype[Equal] = strict_eq__q
BigInt.prototype[Equal] = strict_eq__q
Array.prototype[Equal] = function (other) {

if (truthy(!(other instanceof Array))) {

return false
} else {

}
if (truthy(this.length !== other.length)) {

return false
} else {

}
return this.every(function (value, index) {

return eq__q(value, other[index])
})
}
Map.prototype[Equal] = function (other) {

if (truthy(!(other instanceof Map))) {

return false
} else {

}
if (truthy(this.size !== other.size)) {

return false
} else {

}
for  (let [key, value] of this.entries()) {

if (truthy(!eq__q(other.get(key), value))) {

return false
} else {

}
}
return true
}
ObjectLiteral.prototype[Equal] = function (other) {

for  (let [key, value] of Object.entries(this)) {

if (truthy(!eq__q(value[Equal], other[key]))) {

return false
} else {

}
}
return true
}
function eq__q(a, b) {

return a[Equal](b)
}
const Iter = Symbol("Iter")
function entries() {

return Object.entries(this)
}
function from_entries() {

return Object.fromEntries(this)
}
ObjectLiteral.prototype[Iter] = new ObjectLiteral({each(f) {

return entries.bind(this)().forEach(function ([k, v]) {

return f(k, v)
})
}, map(f) {

return from_entries.bind(entries.bind(this)().map(function ([k, v]) {

return f(k, v)
}))()
}, filter(f) {

return from_entries.bind(entries.bind(this)().filter(function ([k, v]) {

return negate(negate(f(k, v)))
}))()
}, some__q(f) {

return from_entries.bind(entries.bind(this)().some(function ([k, v]) {

return negate(negate(f(k, v)))
}))()
}, every__q(f) {

return from_entries.bind(entries.bind(this)().every(function ([k, v]) {

return negate(negate(f(k, v)))
}))()
}, reduce(f, start) {

return entries.bind(this)().reduce(f, start)
}, insert(key, value) {

return new ObjectLiteral({...this, [key]: value})
}, sum() {

return entries.bind(this)().map(function ([_, v]) {

return v
}).reduce(plus, 0)
}})
Array.prototype[Iter] = new ObjectLiteral({each(f) {

return this.forEach(f)
}, map(f) {

return this.map(f)
}, filter(f) {

return this.filter(compose(f, truthy))
}, some__q(f) {

return this.some(compose(f, truthy))
}, every__q(f) {

return this.every(compose(f, truthy))
}, reduce(f, start) {

return this.reduce(f, start)
}, insert(value) {

return [...this, value]
}, sum() {

return this.reduce(plus, 0)
}})
Set.prototype[Iter] = new ObjectLiteral({each(f) {

for  (let elem of this) {

f(elem)
}
}, map(f) {

let out = new Set([])
for  (let elem of this) {

out.add(f(elem))
}
return out
}, reduce(f, start) {

let acc = start
for  (let elem of this) {

acc = f(acc, elem)
}
return acc
}, filter(f) {

let out = new Set([])
for  (let elem of this) {

if (truthy(f(elem))) {

out.add(elem)
} else {

}
}
return out
}, insert(elem) {

return new Set(this).add(elem)
}, sum() {

return reduce.bind(this)(plus, 0)
}, some__q(f) {

for  (let elem of this) {

if (truthy(f(elem))) {

return true
} else {

}
}
return false
}, every__q(f) {

for  (let elem of this) {

if (truthy(negate(f(elem)))) {

return false
} else {

}
}
return true
}})
function each(f) {

return this[Iter].each.bind(this)(call.bind(f))
}
function map(...fns) {

return this[Iter].map.bind(this)(compose(...fns))
}
function filter(f) {

return this[Iter].filter.bind(this)(call.bind(f))
}
function some__q(...fns) {

return this[Iter].some__q.bind(this)(compose(...fns))
}
function every__q(...fns) {

return this[Iter].every__q.bind(this)(compose(...fns))
}
function reduce(f, start) {

return this[Iter].reduce.bind(this)(call.bind(f), start)
}
function insert(...args) {

return this[Iter].insert.bind(this)(...args)
}
function sum() {

return this[Iter].sum.bind(this)()
}
const Plus = Symbol("Plus")
const Minus = Symbol("Minus")
const Times = Symbol("Times")
const Divide = Symbol("Divide")
const Exponent = Symbol("Exponent")
const Mod = Symbol("Mod")
const Comparable = Symbol("Comparable")
const LessThan = Symbol("LessThan")
const And = Symbol("And")
const Or = Symbol("Or")
Object.prototype[And] = function (other) {

return js_and(this, other)
}
Function.prototype[And] = function (callable) {

return function (...args) {

return and.call(call.bind(this)(...args), call.bind(callable)(...args))
}.bind(this)
}
Set.prototype[And] = function (callable) {

return function (item) {

return and.call(call.bind(this)(item), call.bind(callable)(item))
}.bind(this)
}
Object.prototype[Or] = function (other) {

return js_or(this, other)
}
Number.prototype[Plus] = function (other) {

assert__b(typeof(other) === "number", 193, 11, `typeof(other) === "number"`,)
return js_plus(this, other)
}
Number.prototype[Minus] = function (other) {

assert__b(typeof(other) === "number", 198, 11, `typeof(other) === "number"`,)
return js_minus(this, other)
}
Number.prototype[Times] = function (other) {

assert__b(typeof(other) === "number", 203, 11, `typeof(other) === "number"`,)
return js_times(this, other)
}
Number.prototype[Divide] = function (other) {

assert__b(typeof(other) === "number", 208, 11, `typeof(other) === "number"`,)
return js_divide(this, other)
}
Number.prototype[Exponent] = function (other) {

assert__b(typeof(other) === "number", 213, 11, `typeof(other) === "number"`,)
return js_exponent(this, other)
}
Number.prototype[Mod] = function (other) {

assert__b(typeof(other) === "number", 218, 11, `typeof(other) === "number"`,)
return js_mod(this, other)
}
let ComparableMixin = new ObjectLiteral({greater_than_eq(other) {

return or(greater_than.bind(this)(other), eq__q(this, other))
}, less_than_eq(other) {

return or(greater_than.bind(this)(other), eq__q(this, other))
}})
Number.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {

assert__b(typeof(other) === "number", 232, 13, `typeof(other) === "number"`,)
return js_greater_than(this, other)
}, less_than(other) {

assert__b(typeof(other) === "number", 236, 13, `typeof(other) === "number"`,)
return js_less_than(this, other)
}})
String.prototype[Plus] = function (other) {

assert__b(typeof(other) === "string", 242, 11, `typeof(other) === "string"`,)
return js_plus(this, other)
}
String.prototype[Times] = function (amount) {

assert__b(typeof(amount) === "number", 247, 11, `typeof(amount) === "number"`,)
let s = ""
for  (let _ of Array.from(new ObjectLiteral({length: amount}))) {

s = plus.call(s,this)
}
return s
}
String.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {

assert__b(typeof(other) === "string", 258, 13, `typeof(other) === "string"`,)
return js_greater_than(this, other)
}, less_than(other) {

assert__b(typeof(other) === "string", 262, 13, `typeof(other) === "string"`,)
return js_less_than(this, other)
}})
function plus(other) {

return this[Plus](other)
}
function minus(other) {

return this[Minus](other)
}
function times(other) {

return this[Times](other)
}
function divide_by(other) {

return this[Divide](other)
}
function exponent(other) {

return this[Exponent](other)
}
function mod(other) {

return this[Mod](other)
}
function greater_than(other) {

return this[Comparable].greater_than.bind(this)(other)
}
function greater_than_eq(other) {

return this[Comparable].greater_than_eq.bind(this)(other)
}
function less_than(other) {

return this[Comparable].less_than.bind(this)(other)
}
function less_than_eq(other) {

return this[Comparable].less_than_eq.bind(this)(other)
}
function and(other) {

if (truthy(this)) {

return this[And](other)
} else {

return this
}
}
function or(other) {

if (truthy(this)) {

return this[Or](other)
} else {

return other
}
}
each.bind([plus, minus, times, divide_by, exponent, mod, greater_than, greater_than_eq, less_than, less_than_eq, and, or])(function (op) {

return op[Call] = function call(a, b) {

return op.bind(a)(b)
}
})
const Printable = Symbol("Printable")
Object.prototype[Printable] = function printable() {

return this
}
function _resolve_keyword_str(kw) {

return kw.replaceAll("__q", "?").replaceAll("__b", "!")
}
ObjectLiteral.prototype[Printable] = function printable() {

return map.bind(this)(function (k, v) {

return [_resolve_keyword_str(k), v]
})
}
Keyword.prototype[Printable] = function printable() {

return plus.call(":",_resolve_keyword_str(this))
}
function printable() {

if (truthy(this)) {

return this[Printable]()
} else {

return this
}
}
function log() {

console.log(printable.bind(this)())
return this
}
function int__q() {

return Number.isInteger(this)
}
function even__q() {

return eq__q((mod.call(this,2)), 0)
}
function pos__q() {

return greater_than_eq.call(this,0)
}
each.bind([int__q, even__q, pos__q])(function (f) {

return f[Call] = function (num) {

return f.bind(num)()
}
})
let result = eq__q(reduce.bind(map.bind([new ObjectLiteral({status: "won"}), new ObjectLiteral({status: "lost"})])(Keyword.for("status"), new ObjectLiteral({won: 10, lost: -11})))(plus, 0), 0)
log.bind(result)()