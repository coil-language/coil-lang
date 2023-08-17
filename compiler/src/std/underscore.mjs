import Meta from "./meta.mjs";
import Iter from "./iter/index.mjs";
import IterEager from "./iter/eager.mjs";
import Collection from "./collection.mjs";
import OrderedSequence from "./ordered_sequence.mjs";
import Algebra from "./algebra.mjs";
import Record from "./record.mjs";
import Bool from "./bool.mjs";
import { inc } from "./range.mjs";
import { dot } from "./globals.mjs";

export default class Underscore {
  constructor(transforms) {
    this.transforms = transforms;
  }

  insert(symbol, ...args) {
    return new Underscore([...this.transforms, { symbol, args }]);
  }

  [Meta.invoke](data) {
    let result = data;
    for (let { symbol, args } of this.transforms) {
      result = dot(result, symbol)[Meta.invoke](...args);
    }
    return result;
  }
}

for (let sym of [
  Meta,
  Iter,
  IterEager,
  Collection,
  OrderedSequence,
  Algebra,
  Record,
  Bool,
]
  .flatMap(Object.values)
  .concat([inc])) {
  if (sym === Meta.invoke) {
    continue;
  } else {
    Underscore.prototype[sym] = function (...args) {
      return this.insert(sym, ...args);
    };
  }
}

export let _ = new Underscore([]);
