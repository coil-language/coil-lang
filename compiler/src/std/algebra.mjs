const Algebra = Object.freeze({
  "+": Symbol("std/algebra/Algebra:+"),
  "-": Symbol("std/algebra/Algebra:-"),
  "/": Symbol("std/algebra/Algebra:/"),
  "*": Symbol("std/algebra/Algebra:*"),
  "**": Symbol("std/algebra/Algebra:**"),
  "%": Symbol("std/algebra/Algebra:%"),
  ">": Symbol("std/algebra/Algebra:>"),
  ">=": Symbol("std/algebra/Algebra:>="),
  "<": Symbol("std/algebra/Algebra:<"),
  "<=": Symbol("std/algebra/Algebra:<="),
});

Number.prototype[Algebra["+"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this + other;
};

Number.prototype[Algebra["-"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this - other;
};

Number.prototype[Algebra["/"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this / other;
};

Number.prototype[Algebra["*"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this * other;
};

Number.prototype[Algebra["**"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this ** other;
};

Number.prototype[Algebra[">"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this > other;
};

Number.prototype[Algebra["<"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this < other;
};

Number.prototype[Algebra[">="]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this >= other;
};

Number.prototype[Algebra["<="]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this <= other;
};

Number.prototype[Algebra["%"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this % other;
};

BigInt.prototype[Algebra["+"]] = function (other) {
  if (typeof other !== "bigint") throw new TypeError("Expected bigint");
  return this + other;
};

BigInt.prototype[Algebra["-"]] = function (other) {
  if (typeof other !== "bigint") throw new TypeError("Expected bigint");
  return this - other;
};

BigInt.prototype[Algebra["/"]] = function (other) {
  if (typeof other !== "bigint") throw new TypeError("Expected bigint");
  return this / other;
};

BigInt.prototype[Algebra["*"]] = function (other) {
  if (typeof other !== "bigint") throw new TypeError("Expected bigint");
  return this * other;
};

BigInt.prototype[Algebra["**"]] = function (other) {
  if (typeof other !== "bigint") throw new TypeError("Expected bigint");
  return this ** other;
};

BigInt.prototype[Algebra[">"]] = function (other) {
  if (typeof other !== "bigint") throw new TypeError("Expected bigint");
  return this > other;
};

BigInt.prototype[Algebra["<"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this < other;
};

BigInt.prototype[Algebra[">="]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this >= other;
};

BigInt.prototype[Algebra["<="]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this <= other;
};

BigInt.prototype[Algebra["%"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number");
  return this % other;
};

Set.prototype[Algebra["+"]] = function (other) {
  return new Set(...this, ...other);
};

Array.prototype[Algebra["+"]] = function (other) {
  return [...this, ...other];
};

String.prototype[Algebra["+"]] = function (other) {
  if (typeof other !== "string") throw new TypeError("Expected string!");
  return this + other;
};

String.prototype[Algebra["*"]] = function (other) {
  if (typeof other !== "number") throw new TypeError("Expected number!");
  return this.repeat(other);
};

String.prototype[Algebra["<"]] = function (str) {
  if (typeof str !== "string") throw new TypeError("Expected string!");
  return this < str;
};

String.prototype[Algebra["<="]] = function (str) {
  if (typeof str !== "string") throw new TypeError("Expected string!");
  return this <= str;
};

String.prototype[Algebra[">"]] = function (str) {
  if (typeof str !== "string") throw new TypeError("Expected string!");
  return this > str;
};

String.prototype[Algebra[">="]] = function (str) {
  if (typeof str !== "string") throw new TypeError("Expected string!");
  return this >= str;
};

export default Algebra;
