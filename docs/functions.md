# Functions

## Fn Syntax

Coil has various syntax shorthands for functions. Let's take a look at different ways to write this function.

```
fn say_hi() {
  return "hello there"
}

// when the body is just a return, we can use '='
fn say_hi() = "hello there"

// when there are no arguments, we can remove the "()" argument list
fn say_hi = "hello there"
```

## ::fn syntax

There are times where you need to bind an anonmous function the local scope, for eg here's the implementation of :bind for set

```
impl :bind for Set = fn(val) = ::fn() = this::call(val)
// #{10}.bind(10) // #{10}::fn() = this::call(10)
```

## Constructors & dataclass syntax

Sometimes your function defines an object constructor, for example

```
fn Dog(name) {
  this.name = name
}

new Dog(:joe) // Dog { name: :joe }

// dataclass syntax for the same result
fn Dog(@name) {}
```

## Short Functions

There are cases where you need a syntax that's even more terse. 

```
let add_1 = #(& + 1)
```

These are a strange part of the language as these actual compile to [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
which keep the parent binding of 'this'.

Expect these to be deprecated.
