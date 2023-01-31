;
const get = Symbol("get");
Object.prototype[get] = function (key) {
;
return this[key]
};
console.log(new ObjectLiteral({a: 10})[get]("a"))