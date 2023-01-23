const CALL = Symbol("proto-call");

const Protocol = {
  call: CALL,
  iter: Symbol.iterator,
} as const;

Function.prototype[Protocol.call] = function (...args) {
  return this(...args);
};

Set.prototype[Protocol.call] = function (key) {
  return this.has(key);
};

Object.prototype[Protocol.call] = function (key) {
  return this[key];
};

Array.prototype[Protocol.call] = function (index) {
  return this.at(index);
};

interface Callable {
  [CALL](...args: any[]): any;
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


let b = 20
let a = {a: 10, b, " a b": "wow"}
console.log(a)