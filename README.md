# Coil-Lang

Coil is a delightfully small yet powerful language.

```
let score->letter_grade = ~CallMap{
  ..50 => :F
  50..60 => :D
  60..70 => :C
  70..80 => :B
  80.. => :A
}

let top_students =
  [{name: "marcelle", score: 53} {name: "jill", score: 80} {name: "john", score: 74}]
    ::keep(:score score->letter_grade #{:A :B})
    ::map(:name)
    ::into(#{}) // #{"jill" "john"}
```

# Key Principles

## Bind operator

The bind operator is a very simple syntactic sugar for `Function.prototype.bind`.

```
a::b == b.bind(a)
a::b(10) == b.bind(a)(10)
```

This has 2 big implications:

1 - functions are automatically chainable without being tied to an explicit object model.
2 - this provides a very sane subset of partial application.

These two notions together provide a very powerful building block (built into javascript!) that we can use to express large operations.

## Protocols

Protocols provide a sane, simple & powerful way to do polymorphism.

```
// definition
protocol Greet

// impls
impl Greet for Person = fn() = str("Hi there, I'm " this.name)

impl Greet for Dog = fn() = "Woof"

// protocol function
fn greet() = this[Greet]()

// usage
new Dog()::greet() // Woof
new Person("Marcelle")::greet() // Hi there, I'm marcelle
```

If this looks somewhat familiar to you JavaScript folks, its because its just prototypes with symbols.

Working with prototypes in JavaScript has been increasingly considered "bad practice", but Symbols due to their uniqueness property bring ease-of-mind back to extending prototypes.

Coil has taken a different syntax to reorient & provide a sane set of best practices when dealing with prototypes.

## Data's Primary Function

In coil there's a notion that every piece of data has a primary function.

Records map from keys to values, arrays from indices to entries, sets let you know if a value exists within it..

To do that, there is a protocol called "Call", it exposes 1 function "call"

```
{name: "Marcelle"}::call(:name) // "Marcelle"
[:one :two :three]::call(0) // :one
#{:A :B :C}::call(:A) // :A
```

This protocol can be extended, here is the complete implementation of CallMap that was used in the first example.

```
@def_record
fn CallMap(@entries) {}
impl Call for CallMap = fn(value) =
  ::find(fn([callable, _]) = callable::call(value))
  ::pipe(fn([_, val]) = val)
```

When you combine this with the custom record & vector syntax, you get very expressive & clear code. "Here's what the data looks like, and this is what does."
