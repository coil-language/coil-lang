import Meta from "./meta.mjs";
import { ObjectLiteral } from "./globals.mjs";

const Collection = Object.freeze({
  at: Symbol("std/collection/Collection:at"),
  len: Symbol("std/collection/Collection:len"),
  "empty?": Symbol("std/collection/Collection:empty?"),
  "has?": Symbol("std/collection/Collection:has?"),
  "delete!": Symbol("std/collection/Collection:delete!"),
  delete: Symbol("std/collection/Collection:delete"),
});

ObjectLiteral.prototype[Collection.delete] = function (...keys) {
  let out = new ObjectLiteral(this);
  for (let key of keys) delete out[key];
  return out;
};

ObjectLiteral.prototype[Collection["delete!"]] = function (...keys) {
  for (let key of keys) delete this[key];
  return this;
};

ObjectLiteral.prototype[Collection.at] = function (key) {
  return this[key];
};

ObjectLiteral.prototype[Collection.len] = function () {
  return Object.keys(this).length;
};

ObjectLiteral.prototype[Collection["empty?"]] = function () {
  return this[Collection.len]() === 0;
};

ObjectLiteral.prototype[Collection["has?"]] = function (key) {
  return key in this;
};

Array.prototype[Collection.at] = function (idx) {
  if (typeof idx !== "number") throw new TypeError("Expected number");
  return this.at(idx);
};

Array.prototype[Collection.len] = function () {
  return this.length;
};

Array.prototype[Collection["empty?"]] = function () {
  return this.length === 0;
};

Array.prototype[Collection["has?"]] = function (value) {
  return this.some((elem) => elem[Meta["=="]](value));
};

Array.prototype[Collection["delete!"]] = function (...values) {
  for (let i = 0; i < this.length; i++) {
    if (values.some((val) => this[i][Meta["=="]](val))) {
      this.splice(i, 1);
    }
  }
  return this;
};

Array.prototype[Collection.delete] = function (...values) {
  return this.filter((value) => !values.some((val) => val[Meta["=="]](value)));
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

Map.prototype[Collection["delete!"]] = function (...keys) {
  for (let key of keys) this.delete(key);
  return this;
};

Map.prototype[Collection.delete] = function (...keys) {
  let out = new Map(this);
  for (let key of keys) out.delete(key);
  return out;
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

Set.prototype[Collection["delete!"]] = function (...values) {
  for (let value of values) this.delete(value);
  return this;
};

Set.prototype[Collection.delete] = function (...values) {
  let out = new Set(this);
  for (let value of values) out.delete(value);
  return out;
};

export default Collection;

export const {
  at,
  len,
  "empty?": empty__q,
  "has?": has__q,
  "delete!": delete__b,
  delete: __delete__,
} = Collection;
