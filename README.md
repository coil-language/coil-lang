# Protej

[try it out](https://mellifluous-cheesecake-459893.netlify.app/)

Protej is a Protege of JavaScript, it doesn't try to fundamentally change the language but instead embrace what it's really good at while polishing a few rough edges.

JavaScript's prototype system is radically underused resulting in no agreed upon idioms for polymorphic design.

Protej addresses this with a very simple system called Protocols, it combines JavaScript Symbols, prototypes & dynamic `this` semantics to bring a system that can do the following:

```
[{ status: "won" }, { status: "lost" }]
  ::map("status")
  ::map({ won: 10, lost: -10 })
  ::sum() == 0
```

I think this is pure magic, I love it.

But unlike other forms of "magic" we often hear about, this magic is well defined & easy to extend.

The core of what's happening is protocols.

Protocols can be thought of as a safe form of monkey-patching, or highly dynamic interfaces.

The protocols at play here are `Iter` and `Callable`

Lets take a look at a minimal implementation of `Iter` for `Array`

```
protocol Iter

impl Iter for Array = {
  fn map(f) = this.map(f)
}

fn map(f) = this::(this[Iter].map)(f)

[2, 3]::map(fn (x) = x ** 2) // [4, 9]
```

If you haven't seen the bind operator before, it's a very simple syntactic sugar for [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

For example

```
lhs::rhs
// ->
rhs.bind(lhs)

[1, 2, 3]::map
// ->
map.bind([1, 2, 3])

// and finally
[1, 2, 3]::map(f)
// ->
map.bind([1, 2, 3])(f)
```

This global functions to be used & chained together feeling like traditional methods.

But I can't yet do this from the implementation above

```
["won"]::map({ won: 10 }) // hoping to get [10]
```

The reason is we haven't implemented the `Callable` protocol. So lets do it for objects

```
protocol Callable

impl Callable for Object = {
  fn call(key) = this[key]
}

// accessor function
fn call(...args) = this::(this[Callable].call)(...args)

{ a: 10 }::call("a") // 10
```

Now we can bring it together by modifying the definition of `map` to use `::call`

```
fn map(callable) = this::(this[Iter].map)(callable::call)
```

Now we have to `impl` Callable for all things we want to use as a map function, but that's quite straightforward, you can see the full implementation of `Iter` and `Callable` in ./src/std

## JavaScript's rough edges

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

[TO BE IMPLEMENTED]

When you do

```
1 + '1'
// ->
1::plus('1')
// throws TypeError
```

We redefine all math operators to make sure that there is no automatic type conversions happening.

### Conclusion

The JavaScript hate is really poorly founded, the problems I've mentioned above are very easy to fix using protocols (prototypes with syntax sugar) and we get to the shining gem that is the core of JavaScript.

## Inspiration

- Clojure
- lodash
- JavaScript
- [Bind Operator](https://github.com/tc39/proposal-bind-operator)
