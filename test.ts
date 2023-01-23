const CALL = Symbol("proto-call");
const IS_EQUAL = Symbol("proto-is-equal");
const INSERT = Symbol("proto-insert");

const Protocol = {
  call: CALL,
  iter: Symbol.iterator,
  is_equal: IS_EQUAL,
  insert: INSERT,
} as const;

class AssertionError extends Error {}

function assert(cond: any, msg, Class = AssertionError) {
  if (!truthy(cond)) {
    throw new Class(msg);
  }
}

Number.prototype[Protocol.is_equal] = function (other) {
  return this === other;
};

String.prototype[Protocol.is_equal] = function (other) {
  return this === other;
};

BigInt.prototype[Protocol.is_equal] = function (other) {
  return this === other;
};

Array.prototype[Protocol.is_equal] = function (other) {
  if (!(other instanceof Array)) return false;
  if (this.length !== other.length) return false;
  return this.every((value) => value[Protocol.is_equal](other));
};

Map.prototype[Protocol.is_equal] = function (other) {
  if (!(other instanceof Map)) return false;
  if (this.size !== other.size) return false;
  for (let [key, value] of this.entries()) {
    if (!other.get(key)[Protocol.is_equal](value)) {
      return false;
    }
  }
  return true;
};

Object.prototype[Protocol.is_equal] = function (other) {
  for (let key in this) {
    if (!this[key][Protocol.is_equal](other[key])) {
      return false;
    }
  }
  return true;
};

Function.prototype[Protocol.call] = function (...args) {
  return this(...args);
};

Set.prototype[Protocol.call] = function (key) {
  return this.has(key);
};

Object.prototype[Protocol.call] = function (key) {
  return this[key];
};

String.prototype[Protocol.call] = function (object) {
  return object[this];
};

Array.prototype[Protocol.call] = function (index) {
  return this.at(index);
};

Array.prototype[Protocol.insert] = function (value) {
  return [...this, value];
};

Object.prototype[Protocol.insert] = function (key, value) {
  return { ...this, [key]: value };
};

interface Callable {
  [CALL](...args: any[]): any;
}

interface Equable {
  [IS_EQUAL](other: any): boolean;
}

function not(a: any) {
  return !truthy(a);
}

function equals(a: Equable, b: Equable) {
  return a[Protocol.is_equal](b);
}

function insert(...args) {
  return this[Protocol.insert](...args);
}

function truthy(val: any) {
  return val !== null && val !== undefined && val !== false;
}

function call(...args) {
  return this[Protocol.call](...args);
}

function filter(callable: Callable) {
  let output: any[] = [];
  for (let elem of this) {
    if (call.bind(callable)(elem)) {
      output.push(elem);
    }
  }
  return output;
}

function map(callable: Callable) {
  let output: any[] = [];
  // for loop to integrate Protocol.iter
  for (let elem of this) {
    output.push(call.bind(callable)(elem));
  }
  return output;
}

function sum() {
  let total = 0;
  for (let elem of this) {
    assert(typeof elem === "number", "Not a number");
    total += elem;
  }
  return total;
}


let data = [{score: "great"}, {score: "bad"}]
function tie__q() {

return equals(sum.bind(map.bind(map.bind(this)("score"))({great: 10, bad: -10}))(), 0)
}
console.log(tie__q.bind(data)())
console.log(equals({a: 10}, {a: 10}))