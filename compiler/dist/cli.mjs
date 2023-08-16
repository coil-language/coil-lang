let __coil_temp;
import compile from "./compiler.mjs";
let [src_file_name, out_name, ...args] = dot(Deno, 'args');
let src = dot(Deno, 'readTextFileSync')[invoke](src_file_name);
let std_prefix = ".";
var __coil_if_let_temp = dot(args, find)[invoke](dot(_, has__q)[invoke]("--std-prefix")) ?? nil;
if (__coil_if_let_temp[Meta.as_bool]()) {
let arg = __coil_if_let_temp;
let __coil_temp;
std_prefix = dot(dot(arg, 'split')[invoke]("--std-prefix="), last)[invoke]();
};
dot(Deno, 'writeTextFile')[invoke](out_name, compile[invoke](src, std_prefix)[Algebra["+"]]("\n"));
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
  
