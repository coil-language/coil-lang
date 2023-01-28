
plus[Callable] = new ObjectLiteral({call(a, b) {

return plus.call(a,b)
}})
console.log(reduce.bind([1, 2, 3])(plus, 0))