import { Nil } from "./globals.mjs";

const Bool = Object.freeze({
  negate: Symbol("std/bool/Bool:negate"),
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

export default Bool;

export const { negate } = Bool;
