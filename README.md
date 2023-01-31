# Protej

[try it out](https://protej-lang.netlify.app/)

Protej is a new OO language influenced by JavaScript, Ruby, Clojure and SmallTalk

Protej implements an OO system called Protocols built on JavaScript's prototypal object system.

## Primer

Note on syntax: commas are optional.

## Data Literals

### Strings

```
"this is a string"

"strings can be

multi-line"
```

### Numbers

```
-123.123
```

### Booleans

```
true
false
```

### Keywords

```
:this_is_a_keyword
```

Note: Keywords are like strings without methods for manipulation, they are an important part of the language.

### Arrays

```
["string", :keyword, 123]
```

Note: This is a regular JavaScript array

### Object Literals

```
{ key: "value" }
```

Note: This are _almost_ identical to JS objects, but they are defined by a constructor `ObjectLiteral` so that we can define protocols specific to Object Literals.

### Set Notation

```
#{1 2 3}.has(2) // true
```

## Functions

```
// One liner
fn add(a, b) = a + b

// Multi line
fn add(a, b) {
  return a + b
}

// Unnamed
fn (a, b) = a + b
fn (a, b) {
  return a + b
}
```

## Bind operator

```
fn pos?() = this >= 0
console.log(1::pos?()) // true
```

the [bind operator](https://github.com/tc39/proposal-bind-operator) is something already proposed for JavaScript. It is syntax sugar for the following

```
1::pos?()
->
pos?.bind(1)()
```

If you aren't familiar with `Function.prototype.bind`, all it does is replace the value for `this` in the functions body with the left hand side of the operator.

Lets check out another simple case to make it clear.

```
fn id() = this

console.log(111::id()) // 111
```

### Prefix Bind

Sometimes its useful to use bind an expression to the current context.

```
fn get_id() = ::id()
// the same as
fn id_wrapper() = this::id()

// more useful - bound fn
fn make_adder() = ::fn(x) = this + x

let add3 = 3::make_adder()
add3(3) // 6
```

## Protocols

A protocol is kind of like a dynamic interface that is not tied to the defintion of the data. Kind of like a dynamic version of traits in rust, or a safe version of monkey-patching.

There's a subtle distinction between function protocols & object protocols we'll dive into, but from a user perspective these have no impact on how you use them.

### Function based Protocol

```
// this defines the name of a protocol, which we can use
// to implement on data structures
protocol Get

impl Get for Array = fn (idx) = this.at(idx)

// public getter for consumers
fn get(key) = this[Get](key)

[1, 2, 3]::get(-1) // 3

// lets extend this to object literals

impl Get for ObjectLiteral = fn (key) = this[key]

{key: "value"}::get(:key) // "value"
```

### Object based Protocol

Get approach is fine if your protocol is a single function, but maybe you want to have multiple that work together.

A protocol like this in the prelude is `Collection` we'll do a simplified implementation to see how it works

```
protocol Collection

impl Collection for Array = {
  fn map(f) = this.map(f)
  fn filter(f) = this.filter(f)
}

// helpers
fn entries() = Object.entries(this)
fn from_entries() = Object.fromEntries(this)

impl Collection for ObjectLiteral = {
  fn map(f) = this::entries().map(fn ([k, v]) = f(k, v))::from_entries
  fn filter(f) = this::entries().filter(fn ([k, v]) = f(k, v))::from_entries
}

// Protocol Accessor syntax
fn map(f) = this[[Collection]].map(f)
fn filter(f) = this[[Collection]].filter(f)
```

You'll notice `[[protocol_name]]` is a new syntax, this is how you access methods on protocol objects.

This is required for protocol objects but not protocol functions because the methods of the object need to be bound to the data its operating on.

### Callable Protocol

The callable protocol defines a method for "calling" something.

```
// object literal
{key: 10}::call(:key) // 10
// functions
(fn(x) = x * x)::call(10) // 100
// sets
#{1 2 3}::call(2) // true
```

### Collection Protocol

We have a protocol called `Collection` to define a standard way to manipulate collections.

```
[1 2 3]
  ::map(fn(x) = x * x)
  ::filter(fn(x) = x > 2) // [4 9]
```

Map and filter among others can take more than one "callable", letting you do stuff like this

```
fn tie?() =
  ::map(:status {won: 10, lost: 10})
  ::reduce(+, 0) == 0

[{ status: "won" }, { status: "lost" }]
  ::tie?() // true
```

### Operator Overloading

```
fn valid_scores?() =
  ::map(:score)
  // we are &&'ing 2 functions as a way to compose them and apply && to the result
  ::every?(pos? && even?)

[{score: 10}, {score: 8}]
  ::valid_scores?()
  ::log() // true
```

Here's how we extended the && operator.

```
a && b
// compiles to
a::and(b)

// so lets implement the `And` protocol for Function
impl And for Function = fn(callable) =
  ::fn(...args) =
    this::call(...args)
    && callable::call(...args)

// That's it!
```

### Note on protocols

There are still new design patterns to learn from the basic application of protocols. So far I've found function & object based protocols are good but due to its highly expressive nature it's not limited to just those two.

## Differences from JavaScript

### Truthiness

```
if "" {
  console.log("this works!")
}
if 0 {
  console.log("this works too!")
}
```

In protej, truthiness is defined like so

```js
function truthy(val) {
  return val !== null && val !== undefined && val !== false;
}
```

This means there's no surprises in the `0` or `""` cases.

### Value Equality

In protej, we maintain the `===` strict equality operator without changes but we redefine `==` to be the following

```
a == b
// ->
a::eq?(b)
```

This uses the `Equal` protocol, which you can define for any data type. It is defined for the core data structures, and easy to extend to others.

Meaning this works:

```
{ a: [{ b: [10] }] } == { a: [{ b: [10] }] } // true
```

### Math Type Coercion

When you do

```
1 + '1'
// ->
1::plus('1')
// throws TypeError
```

We redefine all math operators to make sure that there is no automatic type conversions happening.

### Object Literal distinction

In JavaScript there isn't a clear way to verify an object was created from object literal syntax. We address this in Protej by doing the following boilerplate the compiler generates.

```
// protej code
{ a: 10 }
// JavaScript
new ObjectLiteral({ a : 10 })

// ...in the js_prelude.ts the definition of ObjectLiteral is the following
function ObjectLiteral(obj) {
  Object.assign(this, obj);
}
```

There are tradeoffs to this approach, but the result is we can impl protocols specifically for ObjectLiteral's and not worry about messing up the prototype chain for every other object.

## Inspiration

- Clojure
- lodash
- JavaScript
- [Bind Operator](https://github.com/tc39/proposal-bind-operator)

## Left to do

- Regex support
- Optimize `&&` and `||` operators to lazily evaluate their arguments
