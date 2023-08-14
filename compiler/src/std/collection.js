import Meta from "./meta.js";
import { ObjectLiteral } from "./globals.js";

const Collection = Object.freeze({
  at: Symbol("coil-lang/@0.1.0/std/collection/Collection:at"),
  len: Symbol("coil-lang/@0.1.0/std/collection/Collection:len"),
  "empty?": Symbol("coil-lang/@0.1.0/std/collection/Collection:empty?"),
  "has?": Symbol("coil-lang/@0.1.0/std/collection/Collection:has?"),
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
  return this.some((elem) => elem[Meta["=="]](value));
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

export default Collection;

export const { at, len, "empty?": empty__q, "has?": has__q } = Collection;
