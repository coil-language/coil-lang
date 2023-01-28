
const Iterator = Symbol("Iterator")
function split(f) {

return function (arr) {

return f(arr[0], arr[1])
}
}
Object.prototype[Iterator] = new ObjectLiteral({each(f) {

return Object.entries(this).forEach(split(f))
}, map(f) {

return Object.fromEntries(Object.entries(this).map(split(f)))
}, filter(f) {

return Object.fromEntries(Object.entries(this).filter(split(f)))
}})
Array.prototype[Iterator] = new ObjectLiteral({each(f) {

return this.forEach(f)
}, map(f) {

return this.map(f)
}, filter(f) {

return this.filter(f)
}})
function get_protocol(sym) {

let proto = this[sym]
let self = this
return new Proxy(proto, new ObjectLiteral({get(target, method) {

return target[method].bind(self)
}}))
}
function iter() {

return get_protocol.bind(this)(Iterator)
}
function each(f) {

return iter.bind(this)().each(f)
}
function map(f) {

return iter.bind(this)().map(f)
}
function filter(f) {

return iter.bind(this)().filter(f)
}
console.log(filter.bind(new ObjectLiteral({a: 10, b: 20}))(function (k, v) {

return greater_than.bind(v)(10)
}))
console.log(filter.bind([1, 2, 3])(function (x) {

return greater_than.bind(x)(1)
}))