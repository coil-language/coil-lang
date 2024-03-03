import { ObjectLiteral, Keyword, Nil, nil, str } from "./globals.mjs";
import { at } from "./collection.mjs";

const Meta = Object.freeze({
  "nil?": Symbol("coil-lang@0.1.6/std/meta/Meta:nil?"),
  create: Symbol("coil-lang@0.1.6/std/meta/Meta:create"),
  from_entries: Symbol("coil-lang@0.1.6/std/meta/Meta:from_entries"),
  "==": Symbol("coil-lang@0.1.6/std/meta/Meta:=="),
  "!=": Symbol("coil-lang@0.1.6/std/meta/Meta:!="),
  "exists?": Symbol("coil-lang@0.1.6/std/meta/Meta:exists?"),
  log: Symbol("coil-lang@0.1.6/std/meta/Meta:log"),
  invoke: Symbol("coil-lang@0.1.6/std/meta/Meta:invoke"),
  pipe: Symbol("coil-lang@0.1.6/std/meta/Meta:pipe"),
  as_bool: Symbol("coil-lang@0.1.6/std/meta/Meta:as_bool"),
  as_num: Symbol("coil-lang@0.1.6/std/meta/Meta:as_num"),
  as_kw: Symbol("coil-lang@0.1.9/std/meta/Meta:as_kw"),
  "assert!": Symbol("coil-lang@0.1.29/std/meta/Meta:assert!"),
});

Nil[Meta.create] = function () {
  throw new TypeError("Cannot create instance of Nil");
};

str.fmt = function (...args) {
  return (object) => {
    let out = "";
    for (let arg of args) {
      if (typeof arg === "string") {
        out += arg;
      } else {
        out += arg[Meta.invoke](object);
      }
    }
    return out;
  };
};

String.prototype[Meta.as_kw] = function () {
  return Keyword.for(this);
};

Object.prototype[Meta.log] = function (...args) {
  console.log(...args, this);
  return this;
};

String.prototype[Meta.as_num] = function () {
  let result = Number(this);
  if (Number.isNaN(result)) throw new TypeError("Not a number");
  return result;
};

Number.prototype[Meta.as_num] = function () {
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
  return new ObjectLiteral(entries);
};

Array[Meta.from_entries] = (entries) => entries;

Nil.prototype[Meta["nil?"]] = function () {
  return true;
};

Object.prototype[Meta["nil?"]] = function () {
  return false;
};

Object.prototype[Meta["!="]] = function (other) {
  return !this[Meta["=="]](other);
};

Boolean.prototype[Meta["=="]] = function (other) {
  return this.valueOf() === other.valueOf();
};

Nil.prototype[Meta["=="]] = function (other) {
  return this === other;
};

Function.prototype[Meta["=="]] = function (other) {
  return this === other;
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

Keyword.prototype[Meta["=="]] = function (other) {
  return this === other;
};

Set.prototype[Meta["=="]] = function (other) {
  if (!(other instanceof Set)) {
    return false;
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
    return false;
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
    return false;
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
    return false;
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

Function.prototype[Meta.create] = function (args) {
  return Reflect.construct(this, args);
};

Set[Meta.create] = function (elements) {
  return new Set(elements);
};

Function.prototype[Meta.from_entries] = function (entries) {
  return Reflect.construct(this, [entries]);
};

Object.prototype[Meta.pipe] = function pipe(...fns) {
  let result = this;
  for (let fn of fns) {
    result = fn[Meta.invoke](result);
  }
  return result;
};

Function.prototype[Meta.invoke] = function (...args) {
  return this(...args) ?? nil;
};

Set.prototype[Meta.invoke] = function (item) {
  return this.has(item) ?? nil;
};

Map.prototype[Meta.invoke] = function (key) {
  return this.get(key) ?? nil;
};

ObjectLiteral.prototype[Meta.invoke] = function (key) {
  return this[key] ?? nil;
};

Array.prototype[Meta.invoke] = function (index) {
  return this.at(index) ?? nil;
};

String.prototype[Meta.invoke] = function (collection) {
  return collection[at](this) ?? nil;
};

Number.prototype[Meta.invoke] = function (collection) {
  return collection[at](this) ?? nil;
};

Keyword.prototype[Meta.invoke] = function (collection) {
  if (collection[at]) return collection[at](this) ?? nil;
  // hmm.. not sure if we wanna allow this, really have to think about the purpose of Keywords in coil
  else return collection[this] ?? nil;
};

class AssertionError extends Error {}

Object.prototype[Meta["assert!"]] = function (msg, ...args) {
  if (!this[Meta.as_bool]()) {
    if (args.length > 0) console.log(...args);
    throw new AssertionError(msg);
  }
  return this;
};

export default Meta;

export const {
  "nil?": nil__q,
  create,
  from_entries,
  "exists?": exists__q,
  as_bool,
  log,
  invoke,
  pipe,
  as_num,
  as_kw,
  "assert!": assert__b,
} = Meta;
