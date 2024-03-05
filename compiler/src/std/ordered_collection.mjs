const OrderedCollection = Object.freeze({
  first: Symbol("std/ordered_collection/OrderedCollection:first"),
});

Array.prototype[OrderedCollection.first] = function () {
  return this.at(0);
};

String.prototype[OrderedCollection.first] = function () {
  return this.at(0);
};

Map.prototype[OrderedCollection.first] = function () {
  return this.entries().next().value;
};

export default OrderedCollection;

export const { first } = OrderedCollection;
