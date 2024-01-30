"use strict";
import { ObjectLiteral, Nil, nil, Keyword, dot, raise__b, panic__b } from '../src/std/globals.mjs'
import Meta, {
  nil__q, is_a__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe, to_s
} from '../src/std/meta.mjs';
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
let Tokenizer = function (entries) {
this['entries'] = entries;
entries ??= nil;let __coil_temp;
};
let pass = function () {
let __coil_temp;
};
let newline = function () {
let __coil_temp;
};
Tokenizer['prototype'][invoke] = function (str) {
str ??= nil;let __coil_temp;
let tokens = [];
let index = (0);
let rest_of_string = function () {
let __coil_temp;
return dot(str, 'slice')[invoke](index);};
let scan = function (pattern) {
pattern ??= nil;let __coil_temp;
let result = dot(rest_of_string[invoke](), Keyword.for("match"))[invoke](pattern);
if ((__coil_temp = {left: dot(result, nil__q)[invoke]()}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : dot(result, 'index')[Meta["!="]]((0)))[Meta.as_bool]()) {
let __coil_temp;
return false;
} else {
let __coil_temp;
index = index[Algebra["+"]](dot(dot(result, (0)), Keyword.for("length")));
return dot(result, (0));
};};
let line = (1);
let col = (1);
while (rest_of_string[invoke]()[Meta["!="]]("")[Meta.as_bool]()) {
let __coil_temp;
let found = false;
for  (let [pattern, type] of dot(this, 'entries')) {
let __coil_temp;
var __coil_if_let_temp = scan[invoke](pattern) ?? nil;
if (__coil_if_let_temp[Meta.as_bool]()) {
let value = __coil_if_let_temp;
let __coil_temp;
if (type[Meta["=="]](newline)[Meta.as_bool]()) {
let __coil_temp;
line = line[Algebra["+"]]((1));
col = (1);
} else if (type[Meta["!="]](pass)) {
let __coil_temp;
dot(tokens, 'push')[invoke](ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), type], [Keyword.for("value"), value], [Keyword.for("line"), line], [Keyword.for("col"), col]]));
col = col[Algebra["+"]](dot(value, len)[invoke]());
} else {
let __coil_temp;
col = col[Algebra["+"]](dot(value, len)[invoke]());
};
found = true;
break;
};
};
if (found[Bool.negate]()[Meta.as_bool]()) {
let __coil_temp;
panic__b[invoke]("No token matched.");
};
};
return tokens;};
let tokenize = Tokenizer[Meta.from_entries]([[/^\n/, newline], [/^\s+/, pass], [/^\#.*/, pass], [/^\-\-.*/, pass], [/^\,/, pass], [/^\;/, pass], [/^if\s/, Keyword.for("if")], [/^else\s/, Keyword.for("else")], [/^return\s/, Keyword.for("return")], [/^import\s/, Keyword.for("import")], [/^export\s/, Keyword.for("export")], [/^default\s/, Keyword.for("default")], [/^from\s/, Keyword.for("from")], [/^let\s/, Keyword.for("let")], [/^protocol\s/, Keyword.for("protocol")], [/^for\s/, Keyword.for("for")], [/^try\s/, Keyword.for("try")], [/^catch\s/, Keyword.for("catch")], [/^finally\s/, Keyword.for("finally")], [/^end\b/, Keyword.for("end")], [/^while\s/, Keyword.for("while")], [/^loop\s/, Keyword.for("loop")], [/^and\s/, Keyword.for("and")], [/^or\s/, Keyword.for("or")], [/^continue\s/, Keyword.for("continue")], [/^break\s/, Keyword.for("break")], [/^of\s/, Keyword.for("of")], [/^yield\s/, Keyword.for("yield")], [/^async\s/, Keyword.for("async")], [/^await\s/, Keyword.for("await")], [/^\=\>/, Keyword.for("arrow")], [/^\@/, Keyword.for("at")], [/^\=\=/, Keyword.for("double_eq")], [/^\!\=/, Keyword.for("not_eq")], [/^\!/, Keyword.for("bang")], [/^\=/, Keyword.for("eq")], [/^def\b/, Keyword.for("def")], [/^\{/, Keyword.for("open_b")], [/^\}/, Keyword.for("close_b")], [/^\(/, Keyword.for("open_p")], [/^\)/, Keyword.for("close_p")], [/^\|/, Keyword.for("pipe_bar")], [/^[\-\+]?(\d+\.)?\d+n/, Keyword.for("bigint")], [/^[\-\+]?(\d+\.)?\d+/, Keyword.for("num")], [/^\.\.\./, Keyword.for("dot_dot_dot")], [/^\.\./, Keyword.for("dot_dot")], [/^\./, Keyword.for("dot")], [/^\/.*\/[a-z]?/, Keyword.for("regex_lit")], [/^\>\=/, Keyword.for("gt_eq")], [/^\<\=/, Keyword.for("lt_eq")], [/^\>/, Keyword.for("gt")], [/^\</, Keyword.for("lt")], [/^\+/, Keyword.for("plus")], [/^\%/, Keyword.for("mod")], [/^\-/, Keyword.for("minus")], [/^\*\*/, Keyword.for("pow")], [/^\*/, Keyword.for("times")], [/^\//, Keyword.for("div")], [/^\[/, Keyword.for("open_sq")], [/^\]/, Keyword.for("close_sq")], [/^\"([^\\\"]|\\.)*\"/s, Keyword.for("string_lit")], [/^[a-zA-Z_\?\!\$0-9]+/, Keyword.for("id")], [/^\:[a-zA-Z_\?\!\$0-9]+/, Keyword.for("keyword")], [/^\:/, Keyword.for("colon")]]);
export default tokenize;
