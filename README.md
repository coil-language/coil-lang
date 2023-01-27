# Protej

[try it out](https://mellifluous-cheesecake-459893.netlify.app/)

Protej embraces JavaScript by providing clear & concise idioms to do what it's already great at - prototypal OO and functional style programming.

## Example

```
[{ status: "won" }, { status: "lost" }]
  ::map("status")
  ::map({ won: 10, lost: -10 })
  ::sum() == 0
```

I think this is pure magic, I love it.

But unlike other forms of programmer magic, this magic is well defined & easily extended.

The core of what's happening is protocols.

Protocols can be thought of as a safe form of monkey-patching by the use of JS Symbols.

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

## Inspiration

Clojure
lodash
JavaScript
[Bind Operator](https://github.com/tc39/proposal-bind-operator)
