"use strict";
import { ObjectLiteral, Nil, nil, Keyword, dot, raise__b, panic__b, type_of, str, from_js } from '../src/std/globals.mjs'
import Meta, { nil__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe, as_kw } from '../src/std/meta.mjs';
import Iter, {
  take, until, skip, find, zip, reduce, map, flat_map, each, count,
  filter, reject, all__q, any__q, split, compact, join, into, compose
} from '../src/std/iter/index.mjs';
import Algebra from '../src/std/algebra.mjs';
import Bool, { negate } from '../src/std/bool.mjs';
import Collection, { at, len, empty__q, has__q } from '../src/std/collection.mjs';
import OrderedSequence, { first, last } from '../src/std/ordered_sequence.mjs';
import {
  inc, InclusiveRange, ExclusiveRange, InclusiveRangeNoMaximum,
  InclusiveRangeNoMinimum, ExclusiveRangeNoMaximum, ExclusiveRangeNoMinimum
} from '../src/std/range.mjs';
import Record, { keys, values } from '../src/std/record.mjs';
import Underscore, { _ } from '../src/std/underscore.mjs';
import CondMap from '../src/std/cond_map.mjs'
let __coil_temp;
import {ParseError} from "./parse_error.mjs";
import tokenize from "./tokenizer.mjs";
import parse from "./parser.mjs";
import emit from "./emit.mjs";
let CollectionView = function (collection, idx) {
this['collection'] = collection;
this['idx'] = idx;
collection ??= nil;
idx ??= nil;let __coil_temp;
};
CollectionView['prototype'][(dot(Collection, 'len'))] = function () {
let __coil_temp;
return dot(dot(this, 'collection'), len)[invoke]()[Algebra["-"]](dot(this, 'idx'));};
CollectionView['prototype'][(dot(Collection, 'empty?'))] = function () {
let __coil_temp;
return dot(this, len)[invoke]()[Meta["=="]]((0));};
CollectionView['prototype'][(dot(Collection, 'at'))] = function (idx) {
idx ??= nil;let __coil_temp;
return dot(dot(this, 'collection'), at)[invoke](dot(this, 'idx')[Algebra["+"]](idx));};
CollectionView['prototype'][(dot(OrderedSequence, 'first'))] = function () {
let __coil_temp;
return dot(dot(this, 'collection'), at)[invoke](dot(this, 'idx'));};
CollectionView['prototype'][(dot(OrderedSequence, 'last'))] = function () {
let __coil_temp;
return dot(dot(this, 'collection'), last)[invoke]();};
CollectionView['prototype']['skip'] = function (n) {
n ??= nil;let __coil_temp;
return CollectionView[Meta.create]([dot(this, 'collection'), dot(this, 'idx')[Algebra["+"]](n)]);};
CollectionView['prototype'][(dot(Symbol, 'iterator'))] = function *() {
let __coil_temp;
for  (let i of new ExclusiveRange(dot(this, 'idx'), dot(dot(this, 'collection'), len)[invoke]())) {
let __coil_temp;
yield dot(dot(this, 'collection'), i);
};};
let compile = function (string, std_prefix) {
string ??= nil;
std_prefix ??= nil;let __coil_temp;
let tokens = dot(string, pipe)[invoke](tokenize);
let collection_view = CollectionView[Meta.create]([tokens, (0)]);
let ast = parse[invoke](collection_view);
let js = emit[invoke](ast);
let imports = str[invoke](`\"use strict\";
import { ObjectLiteral, Nil, nil, Keyword, dot, raise__b, panic__b, type_of, str, from_js } from '`, std_prefix, `/src/std/globals.mjs'
import Meta, { nil__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe, as_kw } from '`, std_prefix, `/src/std/meta.mjs';
import Iter, {
  take, until, skip, find, zip, reduce, map, flat_map, each, count,
  filter, reject, all__q, any__q, split, compact, join, into, compose
} from '`, std_prefix, `/src/std/iter/index.mjs';
import Algebra from '`, std_prefix, `/src/std/algebra.mjs';
import Bool, { negate } from '`, std_prefix, `/src/std/bool.mjs';
import Collection, { at, len, empty__q, has__q } from '`, std_prefix, `/src/std/collection.mjs';
import OrderedSequence, { first, last } from '`, std_prefix, `/src/std/ordered_sequence.mjs';
import {
  inc, InclusiveRange, ExclusiveRange, InclusiveRangeNoMaximum,
  InclusiveRangeNoMinimum, ExclusiveRangeNoMaximum, ExclusiveRangeNoMinimum
} from '`, std_prefix, `/src/std/range.mjs';
import Record, { keys, values } from '`, std_prefix, `/src/std/record.mjs';
import Underscore, { _ } from '`, std_prefix, `/src/std/underscore.mjs';
import CondMap from '`, std_prefix, `/src/std/cond_map.mjs'
`);
return imports[Algebra["+"]](js);};
export default compile;
