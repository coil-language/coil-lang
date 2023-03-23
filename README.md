# Coil-Lang

Coil is a delightful small yet expressive dynamic language.

```
let score_to_letter_grade = ~CallMap{
  0...50 => :F
  50...60 => :D
  60...70 => :C
  70...80 => :B
  80.. => :A
}

let top_students =
  [{name: "marcelle", score: 53} {name: "jill", score: 80} {name: "john", score: 74}]
    ::keep(:score score_to_letter_grade #{:A :B})
    ::map(:name)
    ::as_set() // #{"john" "jill"}
```

# Key Principles

## Bind operator

The bind operator is a very simple syntactic sugar for `Function.prototype.bind`.

```
a::b == b.bind(a)
a::b(10) == b.bind(a)(10)
```

This is really powerful because it lets you chain function calls without being tied to object properties/methods.

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
