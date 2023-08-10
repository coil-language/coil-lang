"use strict";

// DATATYPES
function ObjectLiteral(obj) {
  Object.assign(this, obj);
}

ObjectLiteral.prototype[Symbol.iterator] = function* () {
  for (let key in this) {
    yield [key, this[key]];
  }
};

function Nil() {}

let nil = new Proxy(new Nil(), {
  get(target, property, _receiver) {
    if (property in target) {
      return target[property];
    } else if (property === Symbol.toStringTag) {
      return "Nil";
    } else {
      throw new TypeError(`Nil does not have property: ${property.toString()}`);
    }
  },
});

// INVOKE
const invoke = Symbol("@coil/invoke");
const pipe = Symbol("@coil/pipe");

Object.prototype[pipe] = function pipe(...fns) {
  let result = this;
  for (let fn of fns) {
    result = fn[invoke](result);
  }
  return result;
};

Function.prototype[invoke] = function (...args) {
  return this(...args) ?? nil;
};

Set.prototype[invoke] = function (item) {
  return this.has(item) ?? nil;
};

Map.prototype[invoke] = function (key) {
  return this.get(key) ?? nil;
};

ObjectLiteral.prototype[invoke] = function (key) {
  return this[key] ?? nil;
};

Array.prototype[invoke] = function (index) {
  return this.at(index) ?? nil;
};

String.prototype[invoke] = function (collection) {
  if (typeof collection === "string" || collection instanceof Keyword) {
    throw new TypeError("Can't 'invoke' a string with " + collection.str());
  } else {
    return collection[invoke](this) ?? nil;
  }
};

Number.prototype[invoke] = function (collection) {
  if (collection instanceof Number) {
    throw new TypeError("Can't 'invoke' a number on a number");
  } else if (collection instanceof Keyword) {
    return this.collection ?? nil;
  } else {
    return collection[invoke](this) ?? nil;
  }
};

Keyword.prototype[invoke] = function (collection) {
  if (collection instanceof Keyword || typeof collection === "string") {
    throw new TypeError("Can't 'invoke' a keyword with" + collection.str());
  } else if (typeof collection[invoke] !== "undefined") {
    return collection[invoke](this) ?? nil;
  } else {
    return collection[this] ?? nil;
  }
};

// META

const Meta = Object.freeze({
  "nil?": Symbol("@coil/Meta:nil?"),
  "is_a?": Symbol("@coil/Meta:is_a?"),
  create: Symbol("@coil/Meta:create"),
  from_entries: Symbol("@coil/Meta:from_entries"),
  "==": Symbol("@coil/Meta:=="),
  "!=": Symbol("@coil/Meta:!="),
  "exists?": Symbol("@coil/Meta:exists?"),
  as_bool: Symbol("@coil/Meta:as_bool"),
  log: Symbol("@coil/Meta:log"),
});

Object.prototype[Meta.log] = function (...args) {
  console.log(this, ...args);
  return this;
};

Nil.prototype[Meta.as_bool] = function () {
  return false;
};

Boolean.prototype[Meta.as_bool] = function () {
  return this;
};

Object.prototype[Meta.as_bool] = function () {
  return true;
};

ObjectLiteral[Meta.from_entries] = function (entries) {
  let output = new ObjectLiteral({});
  for (let [key, value] of entries) {
    output[key] = value;
  }
  return output;
};

Nil.prototype[Meta["nil?"]] = function () {
  return true;
};

Object.prototype[Meta["nil?"]] = function () {
  return false;
};

Object.prototype[Meta["!="]] = function (other) {
  return !this[Meta["=="]](other);
};

Number.prototype[Meta["=="]] = function (other) {
  return this === other;
};

String.prototype[Meta["=="]] = function (other) {
  return this === other;
};

BigInt.prototype[Meta["=="]] = function (other) {
  return this === other;
};

Set.prototype[Meta["=="]] = function (other) {
  if (!(other instanceof Set)) {
    throw new TypeError("Expected Set");
  } else if (other.size !== this.size) {
    return false;
  } else {
    for (let value of this) {
      if (!other.has(value)) {
        return false;
      }
    }
    return true;
  }
};

Array.prototype[Meta["=="]] = function (other) {
  if (!(other instanceof Array)) {
    throw new TypeError("Expected Array");
  } else if (this.length !== other.length) {
    return false;
  } else {
    for (let i = 0; i < this.length; i++) {
      if (this[i][Meta["!="]](other[i])) {
        return false;
      }
    }
    return true;
  }
};

Map.prototype[Meta["=="]] = function (other) {
  if (!(other instanceof Map)) {
    throw new TypeError("Expected Map");
  } else if (other.size !== this.size) {
    return false;
  } else {
    for (let [key, value] of this) {
      if (other.get(key)[Meta["!="]](value)) {
        return false;
      }
    }
    return true;
  }
};

ObjectLiteral.prototype[Meta["=="]] = function (other) {
  if (!(other instanceof ObjectLiteral)) {
    throw new TypeError("Expected Object Literal");
  }
  let my_keys = Object.keys(this);
  let your_keys = Object.keys(other);
  if (my_keys.length !== your_keys.length) {
    return false;
  } else {
    for (let key of my_keys) {
      if (this[key][Meta["!="]](other[key])) {
        return false;
      }
    }
    return true;
  }
};

Object.prototype[Meta["exists?"]] = function () {
  return true;
};

Nil.prototype[Meta["exists?"]] = function () {
  return false;
};

Object.prototype[Meta["is_a?"]] = function (Ctor) {
  return this instanceof Ctor;
};

Function.prototype[Meta.create] = function (args) {
  return Reflect.construct(this, args);
};

Set[Meta.create] = function (elements) {
  return new Set(elements);
};

Function.prototype[Meta.from_entries] = function (entries) {
  return Reflect.construct(this, [entries]);
};

// BOOL

const Bool = Object.freeze({
  negate: Symbol("@coil/Bool:negate"),
});

Nil.prototype[Bool.negate] = function () {
  return true;
};

Object.prototype[Bool.negate] = function () {
  return false;
};

Boolean.prototype[Bool.negate] = function () {
  return !this;
};

const Algebra = Object.freeze({
  "+": Symbol("@coil/Algebra:+"),
  "-": Symbol("@coil/Algebra:-"),
  "/": Symbol("@coil/Algebra:/"),
  "*": Symbol("@coil/Algebra:*"),
  "**": Symbol("@coil/Algebra:**"),
  "%": Symbol("@coil/Algebra:%"),
  ">": Symbol("@coil/Algebra:>"),
  ">=": Symbol("@coil/Algebra:>="),
  "<": Symbol("@coil/Algebra:<"),
  "<=": Symbol("@coil/Algebra:<="),
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

function Keyword(value) {
  this.value = value;
}

Keyword.cache = new Map();

Keyword.for = function (name) {
  if (Keyword.cache.get(name)) {
    return Keyword.cache.get(name);
  } else {
    let kw = new Keyword(name);
    Keyword.cache.set(name, kw);
    return kw;
  }
};

Keyword.prototype.toString = function () {
  return this.value;
};

function dot(lhs, rhs) {
  let result = lhs[rhs];
  if (typeof result === "function") {
    return result.bind(lhs);
  } else {
    return result ?? nil;
  }
}

// ITER

const Iter = Object.freeze({
  take: Symbol("@coil/Iter:take"),
  until: Symbol("@coil/Iter:until"),
  skip: Symbol("@coil/Iter:skip"),
  find: Symbol("@coil/Iter:find"),
  zip: Symbol("@coil/Iter:zip"),
  reduce: Symbol("@coil/Iter:reduce"),
  map: Symbol("@coil/Iter:map"),
  flat_map: Symbol("@coil/Iter:flat_map"),
  each: Symbol("@coil/Iter:each"),
  filter: Symbol("@coil/Iter:filter"),
  reject: Symbol("@coil/Iter:reject"),
  "all?": Symbol("@coil/Iter:all?"),
  "any?": Symbol("@coil/Iter:any?"),
  split: Symbol("@coil/Iter:split"),
  compact: Symbol("@coil/Iter:compact"),
  join: Symbol("@coil/Iter:join"),
});

Object.prototype[Iter.take] = function* (n) {
  let i = 0;
  for (let elem of this) {
    if (i++ == n) {
      break;
    } else {
      yield elem;
    }
  }
};
Object.prototype[Iter.until] = function* (f) {
  for (let elem of this) {
    if (f[invoke](elem)) {
      break;
    } else {
      yield elem;
    }
  }
};
Object.prototype[Iter.skip] = function* (n) {
  let i = 0;
  for (let elem of this) {
    if (i++ < n) {
      continue;
    } else {
      yield elem;
    }
  }
};
Object.prototype[Iter.find] = function (f) {
  for (let elem of this) {
    if (f[invoke](elem)) {
      return elem;
    }
  }
};
Object.prototype[Iter.zip] = function* (...collections) {
  let generators = [this, ...collections].map((item) =>
    item[Symbol.iterator]()
  );
  while (true) {
    let gen_states = generators.map((state) => state.next());
    if (gen_states.some((x) => x.done)) {
      break;
    } else {
      yield gen_states.map((x) => x.value);
    }
  }
};
Object.prototype[Iter.reduce] = function (f, start) {
  let accumulator = start;
  for (let elem of this) {
    accumulator = f[invoke](accumulator, elem);
  }
  return accumulator;
};
Object.prototype[Iter.map] = function* (f) {
  for (let elem of this) {
    yield f[invoke](elem);
  }
};
Object.prototype[Iter.flat_map] = function* (f) {
  for (let elem of this) {
    yield* f[invoke](elem);
  }
};
Object.prototype[Iter.each] = function (f) {
  for (let elem of this) {
    f[invoke](elem);
  }
};

Object.prototype[Iter.filter] = function* (f) {
  for (let elem of this) {
    if (f[invoke](elem)) {
      yield elem;
    }
  }
};

Object.prototype[Iter["all?"]] = function (f) {
  for (let elem of this) {
    if (!f[invoke](elem)) {
      return false;
    }
  }
  return true;
};
Object.prototype[Iter["any?"]] = function (f) {
  for (let elem of this) {
    if (f[invoke](elem)) {
      return true;
    }
  }
  return false;
};

Object.prototype[Iter.split] = function* (f) {
  let chunk = [];
  for (let elem of this) {
    if (f[invoke](elem)) {
      yield chunk;
      chunk = [];
    } else {
      chunk.push(elem);
    }
  }
  yield chunk;
};

Object.prototype[Iter.compact] = function* () {
  for (let elem of this) {
    if (elem[Meta["nil?"]]()) {
      continue;
    } else {
      yield elem;
    }
  }
};

Object.prototype[Iter.join] = function* (separator) {
  let iter = this[Symbol.iterator]();
  let { value, done } = iter.next();
  if (done) {
    return this;
  } else {
    yield value;
    for (let elem of iter) {
      yield separator;
      yield elem;
    }
  }
};

const into = Symbol("@coil/into");

Array.prototype[into] = function (iterable) {
  return [...this, ...iterable];
};

Map.prototype[into] = function (iterable) {
  return new Map([...this, ...iterable]);
};

Set.prototype[into] = function (iterable) {
  return new Set([...this, ...iterable]);
};

String.prototype[into] = function (iterable) {
  return this[Algebra["+"]](
    iterable[reduce]((acc, cur) => acc[Algebra["+"]](cur), "")
  );
};

const Collection = Object.freeze({
  at: Symbol("@coil/Collection:at"),
  len: Symbol("@coil/Collection:len"),
  "empty?": Symbol("@coil/Collection:empty?"),
  "has?": Symbol("@coil/Collection:has?"),
});

ObjectLiteral.prototype[Collection.at] = function (key) {
  return this[key];
};

ObjectLiteral.prototype[Collection.len] = function () {
  return Object.keys(this).at.length;
};

ObjectLiteral.prototype[Collection["empty?"]] = function () {
  return this[Collection.len]() === 0;
};

ObjectLiteral.prototype[Collection["has?"]] = function (key) {
  return key in this;
};

Array.prototype[Collection.at] = function (idx) {
  return this.at(idx);
};

Array.prototype[Collection.len] = function () {
  return this.length;
};

Array.prototype[Collection["empty?"]] = function () {
  return this.length === 0;
};

Array.prototype[Collection["has?"]] = function (value) {
  return this[Iter["any?"]]((elem) => elem[Meta["=="]](value));
};

String.prototype[Collection.at] = function (idx) {
  return this.at(idx);
};

String.prototype[Collection.len] = function () {
  return this.length;
};

String.prototype[Collection["empty?"]] = function () {
  return this.length === 0;
};

String.prototype[Collection["has?"]] = function (substring) {
  return this.includes(substring);
};

Map.prototype[Collection.at] = function (key) {
  return this.get(key);
};

Map.prototype[Collection.len] = function () {
  return this.size;
};

Map.prototype[Collection["empty?"]] = function () {
  return this.size === 0;
};

Map.prototype[Collection["has?"]] = function (key) {
  return this.has(key);
};

Set.prototype[Collection.at] = function (value) {
  if (this.has(value)) {
    return value;
  }
};

Set.prototype[Collection.len] = function () {
  return this.size;
};

Set.prototype[Collection["empty?"]] = function () {
  return this.size === 0;
};

Set.prototype[Collection["has?"]] = function (value) {
  return this.has(value);
};

const Record = Object.freeze({
  keys: Symbol("@coil/Record:keys"),
  values: Symbol("@coil/Record:values"),
});

ObjectLiteral.prototype[Record.keys] = function () {
  return Object.keys(this);
};

ObjectLiteral.prototype[Record.values] = function () {
  return Object.values(this);
};

Map.prototype[Record.keys] = function () {
  return this.keys();
};

Map.prototype[Record.values] = function () {
  return this.values();
};

const OrderedSequence = Object.freeze({
  first: Symbol("@coil/OrderedSequence:first"),
  last: Symbol("@coil/OrderedSequence:last"),
});

Array.prototype[OrderedSequence.first] = function () {
  return this.at(0);
};

Array.prototype[OrderedSequence.last] = function () {
  return this.at(-1);
};

String.prototype[OrderedSequence.first] = function () {
  return this.at(0);
};

String.prototype[OrderedSequence.last] = function () {
  return this.at(-1);
};

Map.prototype[OrderedSequence.first] = function () {
  return this.entries().next().value;
};

Map.prototype[OrderedSequence.last] = function () {
  let last = null;
  for (let entry of this) {
    last = entry;
  }
  return last;
};

const inc = Symbol("@coil/inc");

Number.prototype[inc] = function () {
  return this + 1;
};

BigInt.prototype[inc] = function () {
  return this + 1n;
};

String.prototype[inc] = function () {
  return String.fromCharCode(this.charCodeAt(0) + 1);
};

class InclusiveRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  [invoke](value) {
    return value[Algebra[">="]](this.start) && value[Algebra["<="]](this.end);
  }
  *[Symbol.iterator]() {
    let i = this.start;
    while (i[Algebra["<="]](this.end)) {
      yield i;
      i = i[inc]();
    }
  }
}

class ExclusiveRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  [invoke](value) {
    return value[Algebra[">="]](this.start) && value[Algebra["<"]](this.end);
  }
  *[Symbol.iterator]() {
    let i = this.start;
    while (i[Algebra["<"]](this.end)) {
      yield i;
      i = i[inc]();
    }
  }
}

class InclusiveRangeNoMaximum {
  constructor(start) {
    this.start = start;
  }
  [invoke](value) {
    return value[Algebra[">="]](this.start);
  }
}

class InclusiveRangeNoMinimum {
  constructor(end) {
    this.end = end;
  }
  [invoke](value) {
    return value[Algebra["<="]](this.end);
  }
}

class ExclusiveRangeNoMaximum {
  constructor(start) {
    this.start = start;
  }
  [invoke](value) {
    return value[Algebra[">="]](this.start);
  }
  *[Symbol.iterator]() {
    let i = this.start;
    while (true) {
      yield i;
      i = i[inc]();
    }
  }
}

class ExclusiveRangeNoMinimum {
  constructor(end) {
    this.end = end;
  }
  [invoke](value) {
    return value[Algebra["<"]](this.end);
  }
}

class Underscore {
  constructor(transforms) {
    this.transforms = transforms;
  }

  insert(symbol, ...args) {
    return new Underscore([...this.transforms, { symbol, args }]);
  }

  [invoke](data) {
    let result = data;
    for (let { symbol, args } of this.transforms) {
      result = dot(result, symbol)[invoke](args);
    }
    return result;
  }
}

for (let sym of [Meta, Iter, Collection, OrderedSequence, Algebra, Record, Bool]
  .flatMap(Object.values)
  .concat([pipe, into, inc])) {
  Underscore.prototype[sym] = function (...args) {
    return this.insert(sym, ...args);
  };
}

let _ = new Underscore([]);

class CondMap {
  constructor(entries) {
    this.entries = entries;
  }

  [invoke](value) {
    let result = this.entries.find(([f, _]) =>
      f[invoke](value)[Meta.as_bool]()
    );
    if (result) {
      return result[1];
    }
  }
}

const {
  take,
  until,
  skip,
  find,
  zip,
  reduce,
  map,
  flat_map,
  each,
  filter,
  reject,
  "all?": all__q,
  "any?": any__q,
  split,
  compact,
  join,
} = Iter;

const {
  "nil?": nil__q,
  "is_a?": is_a__q,
  create,
  from_entries,
  "exists?": exists__q,
  log,
  as_bool,
} = Meta;
const { negate } = Bool;
const { at, len, "empty?": empty__q, "has?": has__q } = Collection;
const { keys, values } = Record;
const { first, last } = OrderedSequence;
