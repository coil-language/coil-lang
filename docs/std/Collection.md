# Collection Protocol

The Collection prelude helps you deal with generic functions.

So far they have 4 protocol methods. 

## Methods

### ::has?

`has?` lets you check if an item or key exists in a collection

```
[1 2 3]::has?(3) // true
{a: 10}::has?(:a) // true
Map{a: 10}::has?(:a) // true
#{:a :b :c}::has?(:b) // true
"abc"::has?("ab") // true
```

### ::at

`at` gets you the value at a given index or key

```
[1 2 3]::at(2) // 3
[1 2 3]::at(-1) // 3
{a: 10}::at(:a) // 10
Map{a: 10}::at(:a) // 10
#{:a :b :c}::at(:a) // :a
```

### ::len

`len` gives you the length of a collection

```
[1 2 3]::len() // 3
{a: 10}::len() // 1
Map{a: 10}::len() // 1
#{:a :b :c}::len() // 3
```

### ::empty?

`empty?` lets you know if a given collection is empty or not

```
[]::empty?() // true
{}::empty?() // true
#{}::empty?() // true
Map{}::empty?() // true
```

## Implementing your own Collection

Let's see what it takes to implement the collection protocol.

Say we're want to work with [immutable.js](https://immutable-js.com/), and we want their `List` to be usable as a collection in coil.

```
import {List} from "immutable"

impl Collection for List = {
  fn at(idx) = this.get(idx)
  fn len = this.size
  fn empty? = this::len() == 0
  fn has?(idx) = this.has?(idx)
}

let list = List([1 2 3])
list::at(1) // 2
list::len() // 3
list::empty?() // false
list::has?(2) // true
```
