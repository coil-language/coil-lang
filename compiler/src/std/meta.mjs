import { ObjectLiteral, Keyword, Nil, nil } from "./globals.mjs";

const Meta = Object.freeze({
  "nil?": Symbol("coil-lang@0.1.0/std/meta/Meta:nil?"),
  // look into using `Symbol.hasInstance`
  "is_a?": Symbol("coil-lang@0.1.0/std/meta/Meta:is_a?"),
  create: Symbol("coil-lang@0.1.0/std/meta/Meta:create"),
  from_entries: Symbol("coil-lang@0.1.0/std/meta/Meta:from_entries"),
  "==": Symbol("coil-lang@0.1.0/std/meta/Meta:=="),
  "!=": Symbol("coil-lang@0.1.0/std/meta/Meta:!="),
  "exists?": Symbol("coil-lang@0.1.0/std/meta/Meta:exists?"),
  log: Symbol("coil-lang@0.1.0/std/meta/Meta:log"),
  invoke: Symbol("coil-lang@0.1.0/std/meta/Meta:invoke"),
  pipe: Symbol("coil-lang@0.1.0/std/meta/Meta:pipe"),
  as_bool: Symbol("coil-lang@0.1.0/std/meta/Meta:as_bool"),
  as_num: Symbol("coil-lang@0.1.0/std/meta/Meta:as_num"),
  to_s: Symbol("coil-lang@0.1.0/std/meta/Meta:debug"),
});

String.prototype[Meta.to_s] = function () {
  return `"${this}"`;
};

Keyword.prototype[Meta.to_s] = function () {
  return `:${this}`;
};

Number.prototype[Meta.to_s] = function () {
  return this.toString();
};

Nil.prototype[Meta.to_s] = function () {
  return "nil";
};

Boolean.prototype[Meta.to_s] = function () {
  return this.toString();
};

Map.prototype[Meta.to_s] = function () {
  let output = "Map{ ";
  for (let [key, value] of this) {
    output += `${key[Meta.to_s]()} => ${value[Meta.to_s]()}, `;
  }
  return output + "}";
};

ObjectLiteral.prototype[Meta.to_s] = function () {
  let output = "{ ";
  for (let [key, value] of this) {
    output += `${key[Meta.to_s]()} => ${value[Meta.to_s]()}, `;
  }
  return output + "}";
};

Array.prototype[Meta.to_s] = function () {
  return `[${this.map((x) => x[Meta.to_s]()).join(", ")}]`;
};

Object.prototype[Meta.log] = function (...args) {
  console.log(...args, this);
  return this;
};

String.prototype[Meta.as_num] = function () {
  return Number(this);
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

Nil.prototype[Meta["nil?"]] = function () {
  return true;
};

Object.prototype[Meta["nil?"]] = function () {
  return false;
};

Object.prototype[Meta["!="]] = function (other) {
  return !this[Meta["=="]](other);
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
  return Object(this) instanceof Ctor;
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
  if (typeof collection === "string" || collection instanceof Keyword) {
    throw new TypeError(
      "Can't 'invoke' a string with " + collection.toString()
    );
  } else {
    return collection[Meta.invoke](this) ?? nil;
  }
};

Number.prototype[Meta.invoke] = function (collection) {
  if (collection instanceof Number) {
    throw new TypeError("Can't 'invoke' a number on a number");
  } else if (collection instanceof Keyword) {
    return this.collection ?? nil;
  } else {
    return collection[Meta.invoke](this) ?? nil;
  }
};

Keyword.prototype[Meta.invoke] = function (collection) {
  if (collection instanceof Keyword) {
    throw new TypeError(
      "Can't 'invoke' a keyword with" + collection.toString()
    );
  } else if (typeof collection === "string") {
    return collection[this];
  } else if (typeof collection[Meta.invoke] !== "undefined") {
    return collection[Meta.invoke](this) ?? nil;
  } else {
    return collection[this] ?? nil;
  }
};

export default Meta;

export const {
  "nil?": nil__q,
  "is_a?": is_a__q,
  create,
  from_entries,
  "exists?": exists__q,
  as_bool,
  log,
  invoke,
  pipe,
  as_num,
  to_s,
} = Meta;
