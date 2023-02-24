# Bind Operator

The bind operator is a very simple but powerful syntactic transformation

The basic idea is the following

```
lhs::rhs == rhs.bind(lhs)
```

And in turn when you do the following

```
lhs::rhs(a, b) == rhs.bind(lhs)(a, b)
```

lets take a look at a more "real world" example.

```
[1 2 3]::map(fn(x) = x + 1)
map.bind([1 2 3])(fn(x) = x + 1)
```

What this means is that we can use regular functions that are not tied to the data you are operating on as a way to chain a series of commands.

That is the power, regular functions untied to data.

In practice it gives the benefits of "|>" operator in elm, or f#, with the familiar feeling of the "." operator in OO languages.

But this is still only the tip of the iceberg, to learn more check out [protocols](./protocols.md).
