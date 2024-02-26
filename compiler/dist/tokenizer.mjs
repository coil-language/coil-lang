"use strict";
import {ObjectLiteral, Nil, nil, dot, raise__b, panic__b, type_of, str, from_js, from_memo} from '../src/std/globals.mjs'
import Meta, {nil__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe, as_kw} from '../src/std/meta.mjs';
import Iter, {take, until, skip, find, find_map, zip, reduce, map, flat_map, each, count, filter, filter_map, reject, all__q, any__q, split, compact, join, into, compose} from '../src/std/iter.mjs';
import Algebra from '../src/std/algebra.mjs';
import Bool, {negate} from '../src/std/bool.mjs';
import Collection, {at, len, empty__q, has__q, delete__b} from '../src/std/collection.mjs';
import OrderedCollection, {first} from '../src/std/ordered_collection.mjs';
import {inc, InclusiveRange, ExclusiveRange, InclusiveRangeNoMaximum, InclusiveRangeNoMinimum, ExclusiveRangeNoMaximum, ExclusiveRangeNoMinimum} from '../src/std/range.mjs';
import Record, {keys, values} from '../src/std/record.mjs';
import Underscore, {_} from '../src/std/underscore.mjs';
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
let result = dot(rest_of_string[invoke](), "match")[invoke](pattern);
if (((__coil_temp = {left: dot(result, nil__q)[invoke]()}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : dot(result, 'index')[Meta["!="]]((0))))[Meta.as_bool]()) {
let __coil_temp;
return false;
} else {
let __coil_temp;
index = index[Algebra["+"]](dot(dot(result, (0)), "length"));
return dot(result, (0));
};};
let line = (1);
let col = (1);
while ((rest_of_string[invoke]()[Meta["!="]](""))[Meta.as_bool]()) {
let __coil_temp;
let found = false;
for  (let [pattern, type] of dot(this, 'entries')) {
let __coil_temp;
var __coil_if_let_temp = scan[invoke](pattern) ?? nil;
if (__coil_if_let_temp[Meta.as_bool]()) {
let value = __coil_if_let_temp;
let __coil_temp;
if ((type[Meta["=="]](newline))[Meta.as_bool]()) {
let __coil_temp;
line = line[Algebra["+"]]((1));
col = (1);
} else if ((type[Meta["!="]](pass))[Meta.as_bool]()) {
let __coil_temp;
dot(tokens, 'push')[invoke](ObjectLiteral[Meta.from_entries]([["type", type], ["value", value], ["line", line], ["col", col]]));
col = col[Algebra["+"]](dot(value, len)[invoke]());
} else {
let __coil_temp;
col = col[Algebra["+"]](dot(value, len)[invoke]());
};
found = true;
break;
};
};
if ((found[Bool.negate]())[Meta.as_bool]()) {
let __coil_temp;
panic__b[invoke]("No token matched.");
};
};
return tokens;};
let tokenize = Tokenizer[Meta.from_entries]([[/^\n/, newline], [/^\s+/, pass], [/^\#.*/, pass], [/^\-\-.*/, pass], [/^\,/, pass], [/^\;/, pass], [/^if\s/, "if"], [/^else\s/, "else"], [/^return\s/, "return"], [/^import\s/, "import"], [/^export\s/, "export"], [/^default\s/, "default"], [/^from\s/, "from"], [/^let\s/, "let"], [/^protocol\s/, "protocol"], [/^for\s/, "for"], [/^try\s/, "try"], [/^catch\s/, "catch"], [/^finally\s/, "finally"], [/^instanceof\s/, "instanceof"], [/^end\b/, "end"], [/^while\s/, "while"], [/^loop\s/, "loop"], [/^and\s/, "and"], [/^or\s/, "or"], [/^continue\s/, "continue"], [/^break\s/, "break"], [/^of\s/, "of"], [/^yield\b/, "yield"], [/^async\s/, "async"], [/^await\s/, "await"], [/^\=\>/, "arrow"], [/^\@/, "at"], [/^\=\=/, "double_eq"], [/^\!\=/, "not_eq"], [/^\!/, "bang"], [/^\=/, "eq"], [/^def\b/, "def"], [/^\{/, "open_b"], [/^\}/, "close_b"], [/^\(/, "open_p"], [/^\)/, "close_p"], [/^\|/, "pipe_bar"], [/^[\-\+]?(\d+\.)?\d+n/, "bigint"], [/^[\-\+]?(\d+\.)?\d+/, "num"], [/^\.\.\./, "dot_dot_dot"], [/^\.\./, "dot_dot"], [/^\./, "dot"], [/^\/.*\/[a-z]?/, "regex_lit"], [/^\>\=/, "gt_eq"], [/^\<\=/, "lt_eq"], [/^\>/, "gt"], [/^\</, "lt"], [/^\+/, "plus"], [/^\%/, "mod"], [/^\-/, "minus"], [/^\*\*/, "pow"], [/^\*/, "times"], [/^\//, "div"], [/^\[/, "open_sq"], [/^\]/, "close_sq"], [/^\"([^\\\"]|\\.)*\"/s, "string_lit"], [/^[a-zA-Z_\?\!\$0-9]+/, "id"], [/^\:[a-zA-Z_\?\!\$0-9]+/, "keyword"], [/^\:/, "colon"]]);
export default tokenize;
