
"use strict";
import { ObjectLiteral, Nil, nil, Keyword, dot, raise__b } from '../src/std/globals.js'
import Meta, {
  nil__q, is_a__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe
} from '../src/std/meta.js';
import Iter, {
  take, until, skip, find, zip, reduce, map, flat_map, each,
  filter, reject, all__q, any__q, split, compact, join, into, compose
} from '../src/std/iter/index.js';
import Algebra from '../src/std/algebra.js';
import Bool, { negate } from '../src/std/bool.js';
import Collection, { at, len, empty__q, has__q } from '../src/std/collection.js';
import OrderedSequence, { first, last } from '../src/std/ordered_sequence.js';
import {
  inc, InclusiveRange, ExclusiveRange, InclusiveRangeNoMaximum,
  InclusiveRangeNoMinimum, ExclusiveRangeNoMaximum, ExclusiveRangeNoMinimum
} from '../src/std/range.js';
import Record, { keys, values } from '../src/std/record.js';
import Underscore, { _ } from '../src/std/underscore.js';
import CondMap from '../src/std/cond_map.js'
let __coil_temp;
import {ParseError} from "./parse_error.js";
import tokenize from "./tokenizer.mjs";
import parse from "./parser.mjs";
import emit from "./emit.mjs";
let str = function (...args) {
args ??= nil;let __coil_temp;
return dot(dot(args, map)[invoke]((arg) => {
arg ??= nil;return dot(arg, 'toString')[invoke]();}), join)[invoke]("");};
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
let compile = function (string) {
string ??= nil;let __coil_temp;
let tokens = dot(string, pipe)[invoke](tokenize);
let collection_view = CollectionView[Meta.create]([tokens, (0)]);
let ast = parse[invoke](collection_view);
return emit[invoke](ast);};
let [src_file_name, out_name, ...args] = dot(Deno, 'args');
let src = dot(Deno, 'readTextFileSync')[invoke](src_file_name);
let std_prefix = ".";
var __coil_if_let_temp = dot(args, find)[invoke](dot(_, has__q)[invoke]("--std-prefix")) ?? nil;
if (__coil_if_let_temp[Meta.as_bool]()) {
let arg = __coil_if_let_temp;
let __coil_temp;
std_prefix = dot(dot(arg, 'split')[invoke]("--std-prefix="), last)[invoke]();
};
let imports = str[invoke](`
\"use strict\";
import { ObjectLiteral, Nil, nil, Keyword, dot, raise__b } from '`, std_prefix, `/src/std/globals.js'
import Meta, {
  nil__q, is_a__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe
} from '`, std_prefix, `/src/std/meta.js';
import Iter, {
  take, until, skip, find, zip, reduce, map, flat_map, each,
  filter, reject, all__q, any__q, split, compact, join, into, compose
} from '`, std_prefix, `/src/std/iter/index.js';
import Algebra from '`, std_prefix, `/src/std/algebra.js';
import Bool, { negate } from '`, std_prefix, `/src/std/bool.js';
import Collection, { at, len, empty__q, has__q } from '`, std_prefix, `/src/std/collection.js';
import OrderedSequence, { first, last } from '`, std_prefix, `/src/std/ordered_sequence.js';
import {
  inc, InclusiveRange, ExclusiveRange, InclusiveRangeNoMaximum,
  InclusiveRangeNoMinimum, ExclusiveRangeNoMaximum, ExclusiveRangeNoMinimum
} from '`, std_prefix, `/src/std/range.js';
import Record, { keys, values } from '`, std_prefix, `/src/std/record.js';
import Underscore, { _ } from '`, std_prefix, `/src/std/underscore.js';
import CondMap from '`, std_prefix, `/src/std/cond_map.js'
`);
dot(Deno, 'writeTextFile')[invoke](out_name, imports[Algebra["+"]](compile[invoke](src))[Algebra["+"]]("\n"));
