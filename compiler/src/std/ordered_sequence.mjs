// TODO: rename to OrderedCollection
const OrderedSequence = Object.freeze({
  first: Symbol("coil-lang@0.1.0/std/ordered_sequence/OrderedSequence:first"),
  last: Symbol("coil-lang@0.1.0/std/ordered_sequence/OrderedSequence:last"),
});

Array.prototype[OrderedSequence.first] = function () {
  return this.at(0);
};

Array.prototype[OrderedSequence.last] = function () {
  return this.at(-1);
};

String.prototype[OrderedSequence.first] = function () {
  return this.at(0);
};

String.prototype[OrderedSequence.last] = function () {
  return this.at(-1);
};

Map.prototype[OrderedSequence.first] = function () {
  return this.entries().next().value;
};

Map.prototype[OrderedSequence.last] = function () {
  let last = null;
  for (let entry of this) {
    last = entry;
  }
  return last;
};

export default OrderedSequence;

export const { first, last } = OrderedSequence;
