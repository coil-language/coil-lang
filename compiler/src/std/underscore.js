import Meta from "./meta.js";
import Iter from "./iter/index.js";
import IterEager from "./iter/eager.js";
import Collection from "./collection.js";
import OrderedSequence from "./ordered_sequence.js";
import Algebra from "./algebra.js";
import Record from "./record.js";
import Bool from "./bool.js";
import { inc } from "./range.js";

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
      result = dot(result, symbol)[Meta.invoke](args);
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
  Underscore.prototype[sym] = function (...args) {
    return this.insert(sym, ...args);
  };
}

export let _ = new Underscore([]);
