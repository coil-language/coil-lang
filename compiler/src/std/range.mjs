import Meta from "./meta.mjs";
import Algebra from "./algebra.mjs";

export const inc = Symbol("coil-lang@0.1.6/std/range/inc");

Number.prototype[inc] = function () {
  return this + 1;
};

BigInt.prototype[inc] = function () {
  return this + 1n;
};

String.prototype[inc] = function () {
  return String.fromCharCode(this.charCodeAt(0) + 1);
};

export class InclusiveRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  [Meta.invoke](value) {
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

export class ExclusiveRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  [Meta.invoke](value) {
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

export class InclusiveRangeNoMaximum {
  constructor(start) {
    this.start = start;
  }
  [Meta.invoke](value) {
    return value[Algebra[">="]](this.start);
  }
}

export class InclusiveRangeNoMinimum {
  constructor(end) {
    this.end = end;
  }
  [Meta.invoke](value) {
    return value[Algebra["<="]](this.end);
  }
}

export class ExclusiveRangeNoMaximum {
  constructor(start) {
    this.start = start;
  }
  [Meta.invoke](value) {
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

export class ExclusiveRangeNoMinimum {
  constructor(end) {
    this.end = end;
  }
  [Meta.invoke](value) {
    return value[Algebra["<"]](this.end);
  }
}
