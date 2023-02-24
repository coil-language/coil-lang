# Protocols

Protocols are a very simple implementation with powerful implications.

Protocols define special names to act as an interface between the consumer and producer of an API.

Let's look at a trivial example

```
protocol TypeInfo
```

We've defined the protocol "TypeInfo", now lets implement it for some constructors.

```
impl TypeInfo for Date = "This is a Date object"

impl TypeInfo for ObjectLiteral = "This is an object literal"
```

Great, now we can do the following

```
new Date()[TypeInfo] // "This is a Date object"
```

We can make this cleaner by providing a protocol accessor function

```
fn type_info() = this[TypeInfo]

new Date()::type_info() // "This is a Date object"
{}::type_info() // "This is an object literal"
```

The most important part of this that you can't overwrite this property unless you have access to the "TypeInfo" protocol value.

To illustrate further, say we've implemented all of this in a module

```
// type_info.coil
protocol TypeInfo

impl TypeInfo for Date = "This is a Date object"
impl TypeInfo for ObjectLiteral = "This is an object literal"

fn type_info() = this[TypeInfo]

export default type_info
```

Since the "TypeInfo" protocol itself is not exported, we cannot access it because each time a protocol is created it is unique, even if the name is the same.

```
// some_other_module.coil
protocol TypeInfo

{}[TypeInfo] // undefined
```

This means that protocols are safe, and "smooth-gate" proof.

This doesn't mean that if you export a protocol, someone can't overwrite it. It does however mean that you can make those choices on which protocols are extendable or not.

Side Note:

If you want the extensibility of exporting a protocol but don't want people to modify your internal implementation of it, you can always use `Object.freeze(MyConstructor.prototype)`. This ensures that no one can insert or overwrite your prototype.

I imagine for 99% of use cases you want to leave your constructors open and trust the consumers.
