import Meta from "./meta.mjs";
import { ObjectLiteral } from "./globals.mjs";

const Collection = Object.freeze({
  at: Symbol("coil-lang/@0.1.15/std/collection/Collection:at"),
  len: Symbol("coil-lang/@0.1.15/std/collection/Collection:len"),
  "empty?": Symbol("coil-lang/@0.1.15/std/collection/Collection:empty?"),
  "has?": Symbol("coil-lang/@0.1.15/std/collection/Collection:has?"),
  "delete!": Symbol("coil-lang/@0.1.15/std/collection/Collection:delete!"),
});

ObjectLiteral.prototype[Collection["delete!"]] = function (key) {
  delete this[key];
  return this;
};

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

Array.prototype[Collection["delete!"]] = function (idx) {
  this.splice(idx, 1);
  return this;
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

Map.prototype[Collection["delete!"]] = function (key) {
  this.delete(key);
  return this;
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

Set.prototype[Collection["delete!"]] = function (value) {
  this.delete(value);
  return this;
};

export default Collection;

export const { at, len, "empty?": empty__q, "has?": has__q } = Collection;
