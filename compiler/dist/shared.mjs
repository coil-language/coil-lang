"use strict";
import {ObjectLiteral, Nil, nil, Keyword, dot, raise__b, panic__b, type_of, str, from_js} from '../src/std/globals.mjs'
import Meta, {nil__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe, as_kw, assert__b} from '../src/std/meta.mjs';
import Iter, {take, until, skip, find, find_map, zip, reduce, map, flat_map, each, count, filter, filter_map, reject, all__q, any__q, split, compact, join, into, compose} from '../src/std/iter.mjs';
import Algebra from '../src/std/algebra.mjs';
import Bool, {negate} from '../src/std/bool.mjs';
import Collection, {at, len, empty__q, has__q, delete__b} from '../src/std/collection.mjs';
import OrderedCollection, {first} from '../src/std/ordered_collection.mjs';
import {inc, InclusiveRange, ExclusiveRange, InclusiveRangeNoMaximum, InclusiveRangeNoMinimum, ExclusiveRangeNoMaximum, ExclusiveRangeNoMinimum} from '../src/std/range.mjs';
import Record, {keys, values} from '../src/std/record.mjs';
import Underscore, {_} from '../src/std/underscore.mjs';
let __coil_temp;
export let CollectionView = function (collection, idx) {
this['collection'] = collection;
this['idx'] = idx;
collection ??= nil;
idx ??= nil;let __coil_temp;
};;
CollectionView['prototype'][(dot(Collection, 'len'))] = function () {
let __coil_temp;
return dot(dot(this, 'collection'), len)[invoke]()[Algebra["-"]](dot(this, 'idx'));};
CollectionView['prototype'][(dot(Collection, 'empty?'))] = function () {
let __coil_temp;
return dot(this, len)[invoke]()[Meta["=="]]((0));};
CollectionView['prototype'][(dot(Collection, 'at'))] = function (idx) {
idx ??= nil;let __coil_temp;
return dot(dot(this, 'collection'), at)[invoke](dot(this, 'idx')[Algebra["+"]](idx));};
CollectionView['prototype'][first] = function () {
let __coil_temp;
return dot(dot(this, 'collection'), at)[invoke](dot(this, 'idx'));};
CollectionView['prototype']['skip'] = function (n) {
n ??= nil;let __coil_temp;
return CollectionView[Meta.create]([dot(this, 'collection'), dot(this, 'idx')[Algebra["+"]](n)]);};
CollectionView['prototype'][(dot(Symbol, 'iterator'))] = function *() {
let __coil_temp;
for  (let i of new ExclusiveRange(dot(this, 'idx'), dot(dot(this, 'collection'), len)[invoke]())) {
i ??= nil;;
let __coil_temp;
(yield dot(dot(this, 'collection'), i));
};};
