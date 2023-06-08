# Coil-Lang

Coil is an opinionated language for application development

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
    ::where(:score score->letter-grade Set[:A :B])
    ::select(:name)
    ::into(Set[]) // Set["jill" "john"]
```

## Coil's opinions

### Static vs Dynamic

Coil favours conveying meaning over conveying statically verifiable code.

That being said, there's a lot of work being done to enable strong tooling around inspect the AST to develop lint rules like not seen anywhere else.

The vision for coil is to have end users easily specify domain specific rules to your framework, and/or library, and/or application.

While a linter is not a type system, its an open system where users can let the language know which rules matter to them. This mean that as a user I don't waste time and computer resources on rules that don't impact my code, and I can express things that I wouldn't normally be able to express in a type system.

### Functional vs Object Oriented

Coil is deeply inspired by both functional and object oriented languages.

It takes the expressive power of immutability, higher order functions & strong data literals from functional languages, and power of message-passing from object oriented languages.

Coil expands upon strong data literals by allowing you create your own list-like, and record-like constructors.

```
// defaults
[1 2 3] // Array
{a: 10} // Object Literal

// Custom data types
List[1 2 3]
Set[1 2 3]
Map{a: 10}
Record{a: 10}
```

Coil expands upon messaging by the notion of "protocols" which enable messages to have behave differently in different contexts.

Let's take a look at a common OO pattern that falls apart without context.

Let's take a look at how different entities have different greetings.

```
// constructors
fn Person(@name) {}
fn Dog(@name) {}
fn Cat(@name) {}

// defining a polymorphic property 'greeting'
impl :greeting for Person = "hello"
impl :greeting for Dog = "ruff"
impl :greeting for Cat = "meow"

// polymorphic function
fn interact = str(this.name " says " this.greeting)

Person["marcelle"]::interact() // "marcelle says hello"
Dog["joey"]::interact() // "joey says ruff"
Cat["fluffy"]::interact() // "fluffy says meow"
```

Now here's the problem, marcelle is a romanian, and when they interact with a romanian, they will say "buna ziua" (good day).

We'll model this with "protocols", let's start over.

```
// constructors stay the same
fn Person(@name) {}
fn Dog(@name) {}
fn Cat(@name) {}

// define our protocols
protocol English
protocol Romanian

impl English for Person = {
  greeting: "hello"
}

impl Romanian for Person = {
  greeting: "buna ziua"
}

// dogs and cats have the same greeting in both contexts, so we we'll keep their previous implementations
impl :greeting for Dog = "ruff"
impl :greeting for Cat = "meow"

// redefine interact to optionally take a context
fn interact(context) = str(this.name " says " (this.[context] ?? this).greeting)

Person["marcelle"]::interact() // "marcelle says hello"
Person["marcelle"]::interact(Romanian) // "marcelle says buna ziua"
```
