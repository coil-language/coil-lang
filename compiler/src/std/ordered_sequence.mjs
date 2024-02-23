// TODO: rename to OrderedCollection
const OrderedSequence = Object.freeze({
  first: Symbol("coil-lang@0.1.6/std/ordered_sequence/OrderedSequence:first"),
});

Array.prototype[OrderedSequence.first] = function () {
  return this.at(0);
};

String.prototype[OrderedSequence.first] = function () {
  return this.at(0);
};

Map.prototype[OrderedSequence.first] = function () {
  return this.entries().next().value;
};

export default OrderedSequence;

export const { first } = OrderedSequence;
