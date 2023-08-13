const Algebra = Object.freeze({
  "+": Symbol("coil-lang@0.1.0/std/algebra/Algebra:+"),
  "-": Symbol("coil-lang@0.1.0/std/algebra/Algebra:-"),
  "/": Symbol("coil-lang@0.1.0/std/algebra/Algebra:/"),
  "*": Symbol("coil-lang@0.1.0/std/algebra/Algebra:*"),
  "**": Symbol("coil-lang@0.1.0/std/algebra/Algebra:**"),
  "%": Symbol("coil-lang@0.1.0/std/algebra/Algebra:%"),
  ">": Symbol("coil-lang@0.1.0/std/algebra/Algebra:>"),
  ">=": Symbol("coil-lang@0.1.0/std/algebra/Algebra:>="),
  "<": Symbol("coil-lang@0.1.0/std/algebra/Algebra:<"),
  "<=": Symbol("coil-lang@0.1.0/std/algebra/Algebra:<="),
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

export const {
  "+": __plus__,
  "-": __minus__,
  "/": __divide__,
  "*": __multiply__,
  "**": __exponent__,
  "%": __modulo__,
  ">": __greater_than__,
  ">=": __greater_than_or_equal_to__,
  "<": __less_than__,
  "<=": __less_than_or_equal_to__,
} = Algebra;
