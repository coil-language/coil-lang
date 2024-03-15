import { ObjectLiteral } from "./globals.mjs";

const Record = Object.freeze({
  keys: Symbol("std/record/Record:keys"),
  values: Symbol("std/record/Record:values"),
  set: Symbol("std/record/Record:set"),
  "set!": Symbol("std/record/Record:set!"),
});

ObjectLiteral.prototype[Record.keys] = function () {
  return Object.keys(this);
};

ObjectLiteral.prototype[Record.values] = function () {
  return Object.values(this);
};

ObjectLiteral.prototype[Record.set] = function (key, value) {
  return new ObjectLiteral([...this, [key, value]]);
};

ObjectLiteral.prototype[Record["set!"]] = function (key, value) {
  this[key] = value;
  return this;
};

Map.prototype[Record.keys] = function () {
  return this.keys();
};

Map.prototype[Record.values] = function () {
  return this.values();
};

Map.prototype[Record.set] = function (key, value) {
  return new Map([...this, [key, value]]);
};

Map.prototype[Record["set!"]] = function (key, value) {
  this.set(key, value);
  return this;
};

export default Record;
export const { keys, values, set, "set!": set__b } = Record;
