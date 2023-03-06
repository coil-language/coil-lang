# Coil-Lang

[try it out](https://coil-lang.netlify.app/)

Coil is an extensible dynamically typed language.

Featuring:

- Protocol-based Polymorphism
- Rich immutable `Collection` api to provide a clear, concise & consistent API for dealing with virtually all collections
- Bind operator to enable clear function chaining
- Strong data literal syntax beyond just Arrays and Object Literals - Sets, custom Vectors & custom Records.
- No macros

```
fn tie?() =
  ::map(:status {won: 10, lost: -10})
  ::reduce(+) == 0

[{status: "won"}, {status: "lost"}]
  ::tie?() // true
```

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

### Arrays

```
["string", :keyword, 123]
```

### Object Literals

```
{ key: "value" }
```

### Set Notation

```
#{1 2 3}
```

## Functions

```
fn add(a, b) {
  return a + b
}
```

## Bind operator

```
fn pos?() = this >= 0
console.log(1::pos?()) // true
```

## Differences from JavaScript

### Truthiness

Truthiness is defined as anything that isn't null, undefined, or false.

```
if "" {
  console.log("this works!")
}
if 0 {
  console.log("this works too!")
}
```

### Value Equality

In coil, we maintain the `===` strict equality operator without changes, but `==` uses the `Equal` protocol.

This allows us to have real deep value-based equality.

```
{ a: [{ b: [10] }] } == { a: [{ b: [10] }] } // true
```

### No Implicit Math Type Coercion

```
1 + '1' // throws TypeError
```
