function negate(val) {
  return !truthy(val);
}

function truthy(val) {
  return val !== null && val !== undefined && val !== false;
}

function and(a, b) {
  if (!truthy(a)) {
    return b;
  } else {
    return a;
  }
}

function or(a, b) {
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

function js_multiply(a, b) {
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

class AssertionError extends Error {}

function assert__b(cond, line, column, code_str, msg = "") {
  if (!cond) {
    throw new AssertionError(
      `Assertion Failed: ${msg}\n\n@ ${line}:${column} '${code_str}'`
    );
  }
}


const Equal = Symbol("Equal")
Number.prototype[Equal] = {eq__q(other) {

return this === other
}}
String.prototype[Equal] = {eq__q(other) {

return this === other
}}
BigInt.prototype[Equal] = {eq__q(other) {

return this === other
}}
Array.prototype[Equal] = {eq__q(other) {

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
}}
Map.prototype[Equal] = {eq__q(other) {

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
}}
Object.prototype[Equal] = {eq__q(other) {

for  (let [key, value] of Object.entries(this)) {

if (truthy(negate(value[Equal](other[key])))) {

return false
} else {

}
}
return true
}}
function eq__q(a, b) {

return (a[Equal].eq__q).bind(a)(b)
}


const Iter = Symbol("Iter")
function entries() {

return Object.entries(this)
}
function from_entries() {

return Object.fromEntries(this)
}
Object.prototype[Iter] = {each(f) {

return entries.bind(this)().forEach(function ([k, v]) {

return f(k, v)
})
}, map(f) {

return from_entries.bind(entries.bind(this)().map(function ([k, v]) {

return f(k, v)
}))()
}, filter(f) {

return from_entries.bind(entries.bind(this)().filter(function ([k, v]) {

return f(k, v)
}))()
}, some__q(f) {

return from_entries.bind(entries.bind(this)().some(function ([k, v]) {

return f(k, v)
}))()
}, every__q(f) {

return from_entries.bind(entries.bind(this)().every(function ([k, v]) {

return f(k, v)
}))()
}, reduce(f, start) {

return entries.bind(this)().reduce(f, start)
}, insert(key, value) {

return Object.assign(this, {key: value})
}, sum() {

return entries.bind(this)().map(function ([_, v]) {

return v
}).reduce(function (acc, x) {

return plus.bind(acc)(x)
}, 0)
}}
Array.prototype[Iter] = {each(f) {

return this.forEach(f)
}, map(f) {

return this.map(f)
}, filter(f) {

return this.filter(f)
}, reduce(f, start) {

return this.reduce(f, start)
}, insert(value) {

return [...this, value]
}, sum() {

return this.reduce(function (acc, x) {

return plus.bind(acc)(x)
}, 0)
}, some__q(f) {

return this.some(f)
}, every__q(f) {

return this.every(f)
}}
Set.prototype[Iter] = {each(f) {

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

return new Set(a).add(elem)
}, sum() {

return Array.from(this).reduce(function (acc, x) {

return plus.bind(acc)(x)
}, 0)
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
}}
function each(f) {

return (this[Iter].each).bind(this)(call.bind(f))
}
function map(f) {

return (this[Iter].map).bind(this)(call.bind(f))
}
function filter(f) {

return (this[Iter].filter).bind(this)(call.bind(f))
}
function some__q(f) {

return (this[Iter].some__q).bind(this)(call.bind(f))
}
function every__q(f) {

return (this[Iter].every__q).bind(this)(call.bind(f))
}
function reduce(f, start) {

return (this[Iter].reduce).bind(this)(call.bind(f), start)
}
function insert(...args) {

return (this[Iter].insert).bind(this)(...args)
}
function sum() {

return (this[Iter].sum).bind(this)()
}


const Callable = Symbol("Callable")
Function.prototype[Callable] = {call(...args) {

return this(...args)
}}
Set.prototype[Callable] = {call(key) {

return this.has(key)
}}
Map.prototype[Callable] = {call(key) {

return this.get(key)
}}
Object.prototype[Callable] = {call(key) {

return this[key]
}}
String.prototype[Callable] = {call(object) {

return call.bind(object)(this)
}}
Array.prototype[Callable] = {call(index) {

return this.at(index)
}}
function call(...args) {

return (this[Callable].call).bind(this)(...args)
}


const Plus = Symbol("Plus")
const Minus = Symbol("Minus")
const Times = Symbol("Times")
const Divide = Symbol("Divide")
const Exponent = Symbol("Exponent")
const Comparable = Symbol("Comparable")
const LessThan = Symbol("LessThan")
Number.prototype[Plus] = {plus(other) {

assert__b(typeof(other) === "number", 11, 13, `typeof(other) === "number"`,)
return js_plus(this, other)
}}
Number.prototype[Minus] = {minus(other) {

assert__b(typeof(other) === "number", 18, 13, `typeof(other) === "number"`,)
return js_minus(this, other)
}}
Number.prototype[Times] = {times(other) {

assert__b(typeof(other) === "number", 25, 13, `typeof(other) === "number"`,)
return js_times(this, other)
}}
Number.prototype[Divide] = {divide_by(other) {

assert__b(typeof(other) === "number", 32, 13, `typeof(other) === "number"`,)
return js_divide(this, other)
}}
Number.prototype[Exponent] = {exponent(other) {

assert__b(typeof(other) === "number", 39, 13, `typeof(other) === "number"`,)
return js_exponent(this, other)
}}
Object.prototype[Comparable] = {greater_than_eq(other) {

return or(greater_than.bind(this)(other), eq__q(this, other))
}, less_than_eq(other) {

return or(greater_than.bind(this)(other), eq__q(this, other))
}}
Number.prototype[Comparable] = {greater_than(other) {

assert__b(typeof(other) === "number", 53, 13, `typeof(other) === "number"`,)
return js_greater_than(this, other)
}, less_than(other) {

assert__b(typeof(other) === "number", 57, 13, `typeof(other) === "number"`,)
return js_less_than(this, other)
}}
String.prototype[Plus] = {plus(other) {

assert__b(typeof(other) === "string", 64, 13, `typeof(other) === "string"`,)
return js_plus(this, other)
}}
String.prototype[Times] = {times(amount) {

assert__b(typeof(amount) === "number", 71, 13, `typeof(amount) === "number"`,)
let s = ""
for  (let _ of Array.from({length: amount})) {

s = plus.bind(s)(this)
}
return s
}}
String.prototype[Comparable] = {greater_than(other) {

assert__b(typeof(other) === "string", 82, 13, `typeof(other) === "string"`,)
return js_greater_than(this, other)
}, less_than(other) {

assert__b(typeof(other) === "string", 86, 13, `typeof(other) === "string"`,)
return js_less_than(this, other)
}}
function plus(other) {

return (this[Plus].plus).bind(this)(other)
}
function minus(other) {

return (this[Minus].minus).bind(this)(other)
}
function times(other) {

return (this[Times].times).bind(this)(other)
}
function divide_by(other) {

return (this[Divide].divide_by).bind(this)(other)
}
function exponent(other) {

return (this[Exponent].exponent).bind(this)(other)
}
function greater_than(other) {

return (this[Comparable].greater_than).bind(this)(other)
}
function greater_than_eq(other) {

return (this[Comparable].greater_than_eq).bind(this)(other)
}
function less_than(other) {

return (this[Comparable].less_than).bind(this)(other)
}
function less_than_eq(other) {

return (this[Comparable].less_than_eq).bind(this)(other)
}
function log() {

return console.log(this)
}
log.bind((greater_than.bind(1)(0)))()