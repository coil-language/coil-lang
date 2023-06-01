# Coil-Lang

Coil is a small magical language for creating web app

```
let score->letter-grade = CallMap{
  ..50 => :F
  50..60 => :D
  60..70 => :C
  70..80 => :B
  80.. => :A
}

let top-students =
  [{name: "marcelle", score: 53} {name: "jill", score: 80} {name: "john", score: 74}]
    ::keep(:score score->letter-grade Set[:A :B])
    ::map(:name)
    ::into(Set[]) // Set["jill" "john"]
```

# Motivations

## JavaScript the Good Parts [part 2]

JavaScript has a really powerful system called prototypes. We, the JavaScript community has shunned them (for good reason), due to things like SmooshGate, but the terrain has changed and we have to re-examine what we've lost.

### prototypes

- Symbols solve the pre-existing issues with prototypes because they are unique (good-bye SmooshGate)

### dynamic 'this' binding

- Class/Class-like constructs are highly discouraged in Coil, so you almost never run into situations with multiple scopes of 'this'.

- Bind operator introduces a new way to chain functions untied to an object model.

## Rich Data Literals

Coil introduces a set of powerful data literals, lets explore them.

### Better Object Literals

Object Literal notation are instances of a new constructor `ObjectLiteral`.

`ObjectLiteral` acts like a regular JavaScript Object literal but because it has its own constructor means that we can implement protocols for it without messing with the prototype of every object in the world.

```
{name: "hello"}.constructor === ObjectLiteral

// letting us implement the Record protocol to use keys
{name: "hello"}::keys() // ["name"]
```

### Multiline strings

All strings in Coil are multiline, no switching between 2 types of strings.

### Keywords

Keywords are interned primitives used to lookup a key in a record. You should use them in place of strings wherever possible.

```
:my/keyword === :my/keyword // true
```

### Custom Vector Syntax

Coil allows you to extend the "vector" syntax to any type like the following

```
fn MyCustomList(@items) {}
define Vector for MyCustomList = fn(entries) = new MyCustomList(entries)

~MyCustomList[1 2 3] // MyCustomList { items: [1 2 3] }
```

Let's say due to performance concerns you want to move to immutable-js, but your entire codebase works on `Array`.

In JavaScript the only choice you have is to suck it up and rewrite everything.

In Coil all you have to do is implement the `Vector` protocols for immutable.

Let's take a look

```
import { List } from "immutable"

// define the syntax constructor
define Vector for List = List
// impl protocol methods
impl Vector for List = {
  fn push(item) = this.push(item)
  // .. others
}

let my_list = ~List[1 2 3]
let my_array = [1 2 3]

my_list = my_list::push(10)
my_array = my_array::push(10)
```

### Custom Record Syntax

Similarly there is a custom record syntax.

```
~Map{a: 10} == ~Map{:a => 10}
```

As seen above with `~CallMap{}`, the syntax lends itself well to defining nontrivial mappings.

## Integrated

Coil deeply integrates with existing JavaScript ecosystems in order to wrap them in better coil based idioms.

So while this is possible:

```
import * as React from "react"

fn HelloWorld = React.createElement("h1" null "Hello World")
```

There is a tiny coil wrapper to enable the following:

```
import {component} from "@coil-lang/react"

@component
fn HelloWorld = ~:h1["Hello World"]
```

## Fixing the bad parts of JavaScript

People have many different opinions on what is wrong with JavaScript, to me its actually a small set of things.

### Real Equality

We've reclaimed the `==` operator to mean real equality that can be overwritten for any constructor. While maintaining `===` to mean what it means in JavaScript

```
a == b
// is the same as
a::equals?(b)
// is the same as
a[Equals](b)

[1 2 {a: :b}] == [1 2 {a: :b}] // true
```

### Truthiness

While truthiness in JavaScript is a cute trick at first, it quickly becomes painful because its far too broad to be relied upon.

There is however contrary to popular belief a sane way to do truthiness if we take inspiration from clojure.

- the only falsy values in Coil are `null`, `undefined` and `false`
- everything else is truthy

This means no weird checking for `0` or having to look up how it works every time.

### Good-bye WatMan

You've likely seen the infamous 'wat' talk.

The reason WatMan exists is because JavaScript does implicit type conversion on math operators.

```
// javascript
1 + "2" // "12"
[] + {} // "[object Object]"
// coil
1 + "2" // throws TypeError
[] + {} // throws TypeError
```

This is because these operators in coil are functions, similar to `==`.
