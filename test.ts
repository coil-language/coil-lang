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


const Callable = Symbol("Callable")
Function.prototype[Callable] = new ObjectLiteral({call(...args) {

return this(...args)
}})
Set.prototype[Callable] = new ObjectLiteral({call(key) {

return this.has(key)
}})
Map.prototype[Callable] = new ObjectLiteral({call(key) {

return this.get(key)
}})
ObjectLiteral.prototype[Callable] = new ObjectLiteral({call(key) {

return this[key]
}})
String.prototype[Callable] = new ObjectLiteral({call(collection) {

if (truthy(typeof(collection) === "string")) {

return collection[this]
} else {

return call.bind(collection)(this)
}
}})
Array.prototype[Callable] = new ObjectLiteral({call(index) {

return this.at(index)
}})
function call(...args) {

return this[Callable].call.bind(this)(...args)
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
Number.prototype[Equal] = new ObjectLiteral({eq__q(other) {

return this === other
}})
String.prototype[Equal] = new ObjectLiteral({eq__q(other) {

return this === other
}})
BigInt.prototype[Equal] = new ObjectLiteral({eq__q(other) {

return this === other
}})
Array.prototype[Equal] = new ObjectLiteral({eq__q(other) {

if (truthy(!(other instanceof Array))) {

return false
} else {

}
if (truthy(this.length !== other.length)) {

return false
} else {

}
return this.every(function (value, index) {

return value[Equal](other[index])
})
}})
Map.prototype[Equal] = new ObjectLiteral({eq__q(other) {

if (truthy(!(other instanceof Map))) {

return false
} else {

}
if (truthy(this.size !== other.size)) {

return false
} else {

}
for  (let [key, value] of this.entries()) {

if (truthy(negate(other.get(key)[Equal](value)))) {

return false
} else {

}
}
return true
}})
ObjectLiteral.prototype[Equal] = new ObjectLiteral({eq__q(other) {

for  (let [key, value] of Object.entries(this)) {

if (truthy(negate(value[Equal](other[key])))) {

return false
} else {

}
}
return true
}})
function eq__q(a, b) {

return a[Equal].eq__q.bind(a)(b)
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

return this.filter(compose.bind(f)(truthy))
}, some__q(f) {

return this.some(compose.bind(f)(truthy))
}, every__q(f) {

return this.every(compose.bind(f)(truthy))
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
function some__q(f) {

return this[Iter].some__q.bind(this)(call.bind(f))
}
function every__q(f) {

return this[Iter].every__q.bind(this)(call.bind(f))
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
Object.prototype[And] = new ObjectLiteral({and(other) {

return js_and(this, other)
}})
Function.prototype[And] = new ObjectLiteral({and(snd_fn) {

return function (...args) {

return and.call(call.bind(this)(...args), call.bind(snd_fn)(...args))
}.bind(this)
}})
Object.prototype[Or] = new ObjectLiteral({or(other) {

return js_or(this, other)
}})
Number.prototype[Plus] = new ObjectLiteral({plus(other) {

assert__b(typeof(other) === "number", 217, 13, `typeof(other) === "number"`,)
return js_plus(this, other)
}})
Number.prototype[Minus] = new ObjectLiteral({minus(other) {

assert__b(typeof(other) === "number", 224, 13, `typeof(other) === "number"`,)
return js_minus(this, other)
}})
Number.prototype[Times] = new ObjectLiteral({times(other) {

assert__b(typeof(other) === "number", 231, 13, `typeof(other) === "number"`,)
return js_times(this, other)
}})
Number.prototype[Divide] = new ObjectLiteral({divide_by(other) {

assert__b(typeof(other) === "number", 238, 13, `typeof(other) === "number"`,)
return js_divide(this, other)
}})
Number.prototype[Exponent] = new ObjectLiteral({exponent(other) {

assert__b(typeof(other) === "number", 245, 13, `typeof(other) === "number"`,)
return js_exponent(this, other)
}})
Number.prototype[Mod] = new ObjectLiteral({mod(other) {

assert__b(typeof(other) === "number", 252, 13, `typeof(other) === "number"`,)
return js_mod(this, other)
}})
let ComparableMixin = new ObjectLiteral({greater_than_eq(other) {

return or(greater_than.bind(this)(other), eq__q(this, other))
}, less_than_eq(other) {

return or(greater_than.bind(this)(other), eq__q(this, other))
}})
Number.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {

assert__b(typeof(other) === "number", 267, 13, `typeof(other) === "number"`,)
return js_greater_than(this, other)
}, less_than(other) {

assert__b(typeof(other) === "number", 271, 13, `typeof(other) === "number"`,)
return js_less_than(this, other)
}})
String.prototype[Plus] = new ObjectLiteral({plus(other) {

assert__b(typeof(other) === "string", 278, 13, `typeof(other) === "string"`,)
return js_plus(this, other)
}})
String.prototype[Times] = new ObjectLiteral({times(amount) {

assert__b(typeof(amount) === "number", 285, 13, `typeof(amount) === "number"`,)
let s = ""
for  (let _ of Array.from(new ObjectLiteral({length: amount}))) {

s = plus.call(s,this)
}
return s
}})
String.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {

assert__b(typeof(other) === "string", 297, 13, `typeof(other) === "string"`,)
return js_greater_than(this, other)
}, less_than(other) {

assert__b(typeof(other) === "string", 301, 13, `typeof(other) === "string"`,)
return js_less_than(this, other)
}})
function plus(other) {

return this[Plus].plus.bind(this)(other)
}
function minus(other) {

return this[Minus].minus.bind(this)(other)
}
function times(other) {

return this[Times].times.bind(this)(other)
}
function divide_by(other) {

return this[Divide].divide_by.bind(this)(other)
}
function exponent(other) {

return this[Exponent].exponent.bind(this)(other)
}
function mod(other) {

return this[Mod].mod.bind(this)(other)
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

return this[And].and.bind(this)(other)
} else {

return this
}
}
function or(other) {

if (truthy(this)) {

return this[Or].or.bind(this)(other)
} else {

return other
}
}
each.bind([plus, minus, times, divide_by, exponent, mod, greater_than, greater_than_eq, less_than, less_than_eq, and, or])(function (op) {

return op[Callable] = new ObjectLiteral({call(a, b) {

return op.bind(a)(b)
}})
})
const Printable = Symbol("Printable")
Object.prototype[Printable] = new ObjectLiteral({printable() {

return this
}})
ObjectLiteral.prototype[Printable] = new ObjectLiteral({printable() {

return map.bind(this)(function (k, v) {

k = k.replaceAll("__q", "?").replaceAll("__b", "!")
return [k, v]
})
}})
function printable() {

if (truthy(this)) {

return this[Printable].printable.bind(this)()
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

return f[Callable] = new ObjectLiteral({call(num) {

return f.bind(num)()
}})
})
log.bind(map.bind([new ObjectLiteral({id: 11})])("id", new ObjectLiteral({11: "eleven"}), "length", function (len) {

return eq__q(len, 6)
}))()