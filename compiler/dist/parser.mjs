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
let expect_token__b = function (tokens, kw) {
tokens ??= nil;
kw ??= nil;let __coil_temp;
if ((dot(dot(tokens, first)[invoke](), at)[invoke]("type")[Meta["!="]](kw))[Meta.as_bool]()) {
let __coil_temp;
raise__b[invoke](ParseError[Meta.create]([kw, dot(tokens, first)[invoke]()]));
} else {
let __coil_temp;
return tokens;
};};
let verify_exists__b = function (expr, parser) {
expr ??= nil;
parser ??= nil;let __coil_temp;
if ((dot(expr, nil__q)[invoke]())[Meta.as_bool]()) {
let __coil_temp;
dot(parser, log)[invoke]();
panic__b[invoke]("Parser Failed");
} else {
let __coil_temp;
return expr;
};};
const parse = Symbol("parse");
let line_and_col = function ({'line': line, 'col': col}) {
line ??= nil;
col ??= nil;let __coil_temp;
return ObjectLiteral[Meta.from_entries]([["line", line], ["col", col]]);};
let Init = function (expr) {
this['expr'] = expr;
expr ??= nil;let __coil_temp;
};
Init['prototype'][parse] = function ([_expr, tokens]) {
_expr ??= nil;
tokens ??= nil;let __coil_temp;
return [ObjectLiteral[Meta.from_entries]([...dot(this, 'expr'), ["pos", line_and_col[invoke](dot(tokens, first)[invoke]())]]), tokens];};
let One = function (kw, as) {
this['kw'] = kw;
this['as'] = as;
kw ??= nil;
as ??= nil;let __coil_temp;
};
One['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
let {'value': value, 'type': type} = dot(expect_token__b[invoke](tokens, dot(this, 'kw')), first)[invoke]();
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'as'), value]]), dot(tokens, 'skip')[invoke]((1))];};
const can_parse__q = Symbol("can_parse?");
String['prototype'][can_parse__q] = function ([{'type': type}]) {
type ??= nil;let __coil_temp;
return this[Meta["=="]](type);};
Set['prototype'][can_parse__q] = function (tokens) {
tokens ??= nil;let __coil_temp;
return dot(this, any__q)[invoke]((cond) => {
cond ??= nil;return dot(cond, can_parse__q)[invoke](tokens);});};
_[can_parse__q] = function ([]) {
let __coil_temp;
return true;};
Array['prototype'][can_parse__q] = function (tokens) {
tokens ??= nil;let __coil_temp;
if ((dot(this, len)[invoke]()[Algebra[">"]](dot(tokens, len)[invoke]()))[Meta.as_bool]()) {
let __coil_temp;
return false;
} else {
let __coil_temp;
return dot(dot(this, zip)[invoke](tokens), all__q)[invoke](([pattern, token]) => {
pattern ??= nil;
token ??= nil;return dot(pattern, can_parse__q)[invoke]([token]);});
};};
let Optional = function (parse_cond, parse_fn, as) {
this['parse_cond'] = parse_cond;
this['parse_fn'] = parse_fn;
this['as'] = as;
parse_cond ??= nil;
parse_fn ??= nil;
as ??= nil;let __coil_temp;
};
Optional['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
if ((dot(tokens, empty__q)[invoke]())[Meta.as_bool]()) {
let __coil_temp;
return [expr, tokens];
} else if ((dot(dot(this, 'parse_cond'), can_parse__q)[invoke](tokens))[Meta.as_bool]()) {
let __coil_temp;
return dot(Then[Meta.create]([dot(this, 'parse_fn'), dot(this, 'as')]), parse)[invoke]([expr, tokens]);
} else {
let __coil_temp;
return [expr, tokens];
};};
Function['prototype'][parse] = function ([_expr, tokens]) {
_expr ??= nil;
tokens ??= nil;let __coil_temp;
return this[invoke](tokens);};
let Chomp = function (...kws) {
this['kws'] = kws;
kws ??= nil;let __coil_temp;
};
Chomp['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
let i = (0);
for  (let kw of dot(this, 'kws')) {
let __coil_temp;
expect_token__b[invoke](dot(tokens, 'skip')[invoke](i), kw);
i = i[Algebra["+"]]((1));
};
return [expr, dot(tokens, 'skip')[invoke](i)];};
let Then = function (parser, kw) {
this['parser'] = parser;
this['kw'] = kw;
parser ??= nil;
kw ??= nil;let __coil_temp;
};
Then['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
var __coil_if_let_temp = dot(this, 'parser')[invoke](tokens) ?? nil;
if (__coil_if_let_temp[Meta.as_bool]()) {
let [new_expr, new_tokens] = __coil_if_let_temp;
let __coil_temp;
if ((dot(this, 'kw'))[Meta.as_bool]()) {
let __coil_temp;
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), new_expr]]), new_tokens];
} else {
let __coil_temp;
return [new_expr, new_tokens];
};
} else {
let __coil_temp;
return [expr, tokens];
};};
let FMap = function (f) {
this['f'] = f;
f ??= nil;let __coil_temp;
};
FMap['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
return [dot(this, 'f')[invoke](expr), tokens];};
let Until = function (end_kw, parser, kw) {
this['end_kw'] = end_kw;
this['parser'] = parser;
this['kw'] = kw;
end_kw ??= nil;
parser ??= nil;
kw ??= nil;let __coil_temp;
};
Until['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
let exprs = [];
while ((dot(dot(tokens, first)[invoke](), at)[invoke]("type")[Meta["!="]](dot(this, 'end_kw')))[Meta.as_bool]()) {
let __coil_temp;
let [expr, new_tokens] = verify_exists__b[invoke](dot(this, 'parser')[invoke](tokens), this);
dot(exprs, "push")[invoke](expr);
tokens = new_tokens;
};
if ((dot(this, 'kw'))[Meta.as_bool]()) {
let __coil_temp;
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), exprs]]), tokens];
} else {
let __coil_temp;
return [exprs, tokens];
};};
let UntilEither = function (set, parser, kw) {
this['set'] = set;
this['parser'] = parser;
this['kw'] = kw;
set ??= nil;
parser ??= nil;
kw ??= nil;let __coil_temp;
};
UntilEither['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
let exprs = [];
while ((dot(dot(dot(tokens, first)[invoke](), at)[invoke]("type"), pipe)[invoke](dot(this, 'set'))[Bool.negate]())[Meta.as_bool]()) {
let __coil_temp;
let [expr, new_tokens] = verify_exists__b[invoke](dot(this, 'parser')[invoke](tokens), this);
dot(exprs, 'push')[invoke](expr);
tokens = new_tokens;
};
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), exprs]]), tokens];};
let Case = function (parse_map, kw) {
this['parse_map'] = parse_map;
this['kw'] = kw;
parse_map ??= nil;
kw ??= nil;let __coil_temp;
};
Case['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
var __coil_if_let_temp = dot(this, 'parse_map')[invoke](tokens) ?? nil;
if (__coil_if_let_temp[Meta.as_bool]()) {
let [new_expr, new_tokens] = __coil_if_let_temp;
let __coil_temp;
if ((dot(this, 'kw'))[Meta.as_bool]()) {
let __coil_temp;
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), new_expr]]), new_tokens];
} else {
let __coil_temp;
return [new_expr, new_tokens];
};
} else {
let __coil_temp;
dot(console, log)[invoke](dot(dot(this, 'tokens'), first)[invoke](), dot(this, 'parse_map'));
panic__b[invoke]("Case Parse Failed");
};};
let Either = function (set, kw) {
this['set'] = set;
this['kw'] = kw;
set ??= nil;
kw ??= nil;let __coil_temp;
};
Either['prototype'][parse] = function ([expr, tokens]) {
expr ??= nil;
tokens ??= nil;let __coil_temp;
let op = verify_exists__b[invoke](dot(this, 'set')[invoke](dot(dot(tokens, first)[invoke](), at)[invoke]("type")), dot(this, 'set'));
let [new_expr, rest] = [dot(tokens, first)[invoke](), dot(tokens, 'skip')[invoke]((1))];
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), dot(new_expr, at)[invoke]("value")]]), rest];};
let Parser = function (...instructions) {
this['instructions'] = instructions;
instructions ??= nil;let __coil_temp;
};
Parser['prototype'][invoke] = function (tokens) {
tokens ??= nil;let __coil_temp;
return dot(this, parse)[invoke]([nil, tokens]);};
let AbortIf = function (cond_fn) {
this['cond_fn'] = cond_fn;
cond_fn ??= nil;let __coil_temp;
};
Parser['prototype'][parse] = function (result) {
result ??= nil;let __coil_temp;
for  (let instruction of dot(this, 'instructions')) {
let __coil_temp;
if (((instruction instanceof AbortIf))[Meta.as_bool]()) {
let __coil_temp;
if ((dot(instruction, 'cond_fn')[invoke](result))[Meta.as_bool]()) {
let __coil_temp;
return;
} else {
let __coil_temp;
continue;
};
};
result = dot(instruction, parse)[invoke](result);
};
return result;};
let ParseMap = function (entries) {
this['entries'] = entries;
entries ??= nil;let __coil_temp;
};
ParseMap['prototype'][(dot(Record, 'keys'))] = function () {
let __coil_temp;
return dot(dot(dot(this, 'entries'), map)[invoke](([pattern, _ignore_me_]) => {
pattern ??= nil;
_ ??= nil;return pattern;}), into)[invoke](Set[Meta.create]([]));};
ParseMap['prototype'][invoke] = function (tokens, ...args) {
tokens ??= nil;
args ??= nil;let __coil_temp;
if ((dot(tokens, empty__q)[invoke]())[Meta.as_bool]()) {
let __coil_temp;
return;
} else {
let __coil_temp;
for  (let [pattern, parser] of dot(this, 'entries')) {
let __coil_temp;
if ((dot(pattern, can_parse__q)[invoke](tokens))[Meta.as_bool]()) {
let __coil_temp;
return parser[invoke](tokens, ...args);
};
};
};};
let algebra_ops = Set[Meta.create](["mod", "plus", "minus", "times", "pow", "div", "lt", "gt", "lt_eq", "gt_eq"]);
let parse_dot = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "dot"], ["lhs", lhs]])]), Chomp[Meta.create](["dot"]), Then[Meta.create]([parse_single_expr, "rhs"])])[invoke](tokens);};
let parse_keyword_lookup = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "keyword_lookup"], ["lhs", lhs]])]), One[Meta.create](["keyword", "property"]), FMap[Meta.create]([({'lhs': lhs, 'type': type, 'property': property, 'pos': pos}) => {
lhs ??= nil;
type ??= nil;
property ??= nil;
pos ??= nil;return (ObjectLiteral[Meta.from_entries]([["lhs", lhs], ["type", type], ["property", dot(property, 'slice')[invoke]((1))], ["pos", pos]]));}])])[invoke](tokens);};
let not_adjacent__q = function ([_expr, tokens]) {
_expr ??= nil;
tokens ??= nil;let __coil_temp;
let current = dot(tokens, first)[invoke]();
let previous = dot(tokens, at)[invoke]((-1));
if ((dot(current, 'line')[Meta["!="]](dot(previous, 'line')))[Meta.as_bool]()) {
let __coil_temp;
return true;
} else {
let __coil_temp;
let end_of_prev_token = dot(previous, 'col')[Algebra["+"]](dot(dot(previous, 'value'), 'length'));
return (dot(current, 'col')[Algebra["-"]](end_of_prev_token))[Algebra[">="]]((1));
};};
let parse_adjacent_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Then[Meta.create]([parse_expr])])[invoke](tokens);};
let parse_inclusive_range = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "inclusive_range"], ["lhs", lhs]])]), Chomp[Meta.create](["dot_dot", "eq"]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_adjacent_expr, "rhs"])])[invoke](tokens);};
let parse_exclusive_range = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "exclusive_range"], ["lhs", lhs]])]), Chomp[Meta.create](["dot_dot"]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_adjacent_expr, "rhs"])])[invoke](tokens);};
let parse_fn_call = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "fn_call"], ["lhs", lhs]])]), Chomp[Meta.create](["open_p"]), Until[Meta.create](["close_p", parse_expr, "args"]), Chomp[Meta.create](["close_p"])])[invoke](tokens);};
let parse_meta_from_entries = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "meta_from_entries"], ["lhs", lhs]])]), Chomp[Meta.create](["open_b"]), Until[Meta.create](["close_b", parse_record_entry, "entries"]), Chomp[Meta.create](["close_b"])])[invoke](tokens, lhs);};
let parse_meta_create = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "meta_create"], ["lhs", lhs]])]), Chomp[Meta.create](["open_sq"]), Until[Meta.create](["close_sq", parse_expr, "entries"]), Chomp[Meta.create](["close_sq"])])[invoke](tokens, lhs);};
let parse_snd_assign = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "snd_assign"], ["lhs", lhs]])]), Chomp[Meta.create](["eq"]), Then[Meta.create]([parse_expr, "rhs"])])[invoke](tokens);};
let PARSE_SND_EXPR_STEP_MAP = ParseMap[Meta.from_entries]([["open_p", parse_fn_call], ["open_b", parse_meta_from_entries], ["open_sq", parse_meta_create], ["dot", parse_dot], ["keyword", parse_keyword_lookup], [["dot_dot", "eq"], parse_inclusive_range], ["dot_dot", parse_exclusive_range]]);
let parse_snd_expr_step = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return PARSE_SND_EXPR_STEP_MAP[invoke](tokens, lhs);};
let parse_snd_expr = function ([lhs, tokens]) {
lhs ??= nil;
tokens ??= nil;let __coil_temp;
var __coil_while_let_temp = parse_snd_expr_step[invoke](tokens, lhs) ?? nil;
while (__coil_while_let_temp[Meta.as_bool]()) {
let [new_lhs, rest] = __coil_while_let_temp;
let __coil_temp;
lhs = new_lhs;
tokens = rest;
__coil_while_let_temp = parse_snd_expr_step[invoke](tokens, lhs) ?? nil;
};
return [lhs, tokens];};
let parse_algebra_op = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "algebra_op"], ["lhs", lhs]])]), Either[Meta.create]([algebra_ops, "op"]), Then[Meta.create]([parse_1_2_expr, "rhs"])])[invoke](tokens);};
let parse_instanceof = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "instanceof"], ["lhs", lhs]])]), Chomp[Meta.create](["instanceof"]), Then[Meta.create]([parse_1_2_expr, "rhs"])])[invoke](tokens);};
let parse_third_expr_step = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([["eq", parse_snd_assign], ["instanceof", parse_instanceof], [algebra_ops, parse_algebra_op]])[invoke](tokens, lhs);};
let parse_third_expr = function ([lhs, tokens]) {
lhs ??= nil;
tokens ??= nil;let __coil_temp;
var __coil_while_let_temp = parse_third_expr_step[invoke](tokens, lhs) ?? nil;
while (__coil_while_let_temp[Meta.as_bool]()) {
let [new_lhs, rest] = __coil_while_let_temp;
let __coil_temp;
lhs = new_lhs;
tokens = rest;
__coil_while_let_temp = parse_third_expr_step[invoke](tokens, lhs) ?? nil;
};
return [lhs, tokens];};
let equality_ops = Set[Meta.create](["double_eq", "not_eq"]);
let parse_eq_op = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "equality_op"], ["lhs", lhs]])]), Either[Meta.create]([equality_ops, "op"]), Then[Meta.create]([parse_1_2_3_expr, "rhs"])])[invoke](tokens);};
let parse_fourth_expr_step = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([[equality_ops, parse_eq_op]])[invoke](tokens, lhs);};
let parse_fourth_expr = function ([lhs, tokens]) {
lhs ??= nil;
tokens ??= nil;let __coil_temp;
var __coil_while_let_temp = parse_fourth_expr_step[invoke](tokens, lhs) ?? nil;
while (__coil_while_let_temp[Meta.as_bool]()) {
let [new_lhs, rest] = __coil_while_let_temp;
let __coil_temp;
lhs = new_lhs;
tokens = rest;
__coil_while_let_temp = parse_fourth_expr_step[invoke](tokens, lhs) ?? nil;
};
return [lhs, tokens];};
let parse_and = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "and"], ["lhs", lhs]])]), Chomp[Meta.create](["and"]), Then[Meta.create]([parse_1_2_3_4_expr, "rhs"])])[invoke](tokens);};
let parse_or = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "or"], ["lhs", lhs]])]), Chomp[Meta.create](["or"]), Then[Meta.create]([parse_1_2_3_4_expr, "rhs"])])[invoke](tokens);};
let parse_fifth_expr_step = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([["and", parse_and], ["or", parse_or]])[invoke](tokens, lhs);};
let parse_fifth_expr = function ([lhs, tokens]) {
lhs ??= nil;
tokens ??= nil;let __coil_temp;
var __coil_while_let_temp = parse_fifth_expr_step[invoke](tokens, lhs) ?? nil;
while (__coil_while_let_temp[Meta.as_bool]()) {
let [new_lhs, rest] = __coil_while_let_temp;
let __coil_temp;
lhs = new_lhs;
tokens = rest;
__coil_while_let_temp = parse_fifth_expr_step[invoke](tokens, lhs) ?? nil;
};
return [lhs, tokens];};
let parse_regex = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "regex_lit"]])]), One[Meta.create](["regex_lit", "value"])]);
let parse_str = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "str"]])]), One[Meta.create](["string_lit", "value"])]);
let valid_ids_in_all_contexts = Set[Meta.create](["id", "from"]);
let parse_id = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "id_lookup"]])]), Either[Meta.create]([Set[Meta.create]([...valid_ids_in_all_contexts, "import"]), "name"])]);
let parse_obj = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "object_literal"]])]), Chomp[Meta.create](["open_b"]), Until[Meta.create](["close_b", parse_record_entry, "entries"]), Chomp[Meta.create](["close_b"])])[invoke](tokens);};
let parse_spread_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "spread_assign"]])]), Chomp[Meta.create](["dot_dot_dot"]), Either[Meta.create]([valid_ids_in_all_contexts, "name"])]);
let parse_assign_id = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "id_assign"]])]), Either[Meta.create]([valid_ids_in_all_contexts, "name"])]);
let parse_assign_array = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "array_deconstruction"]])]), Chomp[Meta.create](["open_sq"]), Until[Meta.create](["close_sq", parse_assign_expr, "entries"]), Chomp[Meta.create](["close_sq"])])[invoke](tokens);};
let parse_obj_entry_rename = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "obj_entry_rename"]])]), Either[Meta.create]([valid_ids_in_all_contexts, "old_name"]), Chomp[Meta.create](["colon"]), Either[Meta.create]([valid_ids_in_all_contexts, "new_name"])]);
let parse_regular_obj_assign_entry = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "obj_reg_entry"]])]), Either[Meta.create]([valid_ids_in_all_contexts, "name"])]);
let parse_obj_entry_destructure = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "obj_assign_expr"]])]), Either[Meta.create]([valid_ids_in_all_contexts, "property"]), Chomp[Meta.create](["colon"]), Then[Meta.create]([parse_assign_expr, "assign_expr"])])[invoke](tokens);};
let parse_obj_assign_entry = ParseMap[Meta.from_entries]([[["id", "colon", "id"], parse_obj_entry_rename], [["id", "colon"], parse_obj_entry_destructure], ["id", parse_regular_obj_assign_entry], ["dot_dot_dot", parse_spread_assign]]);
let parse_assign_obj = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "object_deconstruction"]])]), Chomp[Meta.create](["open_b"]), Until[Meta.create](["close_b", parse_obj_assign_entry, "entries"]), Chomp[Meta.create](["close_b"])]);
let parse_this_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "this_assign"]])]), Chomp[Meta.create](["at"]), Either[Meta.create]([valid_ids_in_all_contexts, "name"])]);
let parse_this_spread_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "this_spread_assign"]])]), Chomp[Meta.create](["dot_dot_dot", "at"]), One[Meta.create](["id", "name"])]);
let parse_assign_expr = ParseMap[Meta.from_entries]([["id", parse_assign_id], ["open_sq", parse_assign_array], ["open_b", parse_assign_obj], ["at", parse_this_assign], [["dot_dot_dot", "at"], parse_this_spread_assign], ["dot_dot_dot", parse_spread_assign]]);
let parse_paren_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "paren_expr"]])]), Chomp[Meta.create](["open_p"]), Then[Meta.create]([parse_expr, "expr"]), Chomp[Meta.create](["close_p"])])[invoke](tokens);};
let parse_yield = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "yield"]])]), Chomp[Meta.create](["yield"]), Optional[Meta.create](["times", (tokens) => {
tokens ??= nil;return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([])]), Chomp[Meta.create](["times"])])[invoke](tokens);}, "star?"]), Then[Meta.create]([parse_expr, "expr"])])[invoke](tokens);};
let parse_await = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "await"]])]), Chomp[Meta.create](["await"]), Then[Meta.create]([parse_expr, "expr"])])[invoke](tokens);};
let parse_num = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "num"]])]), One[Meta.create](["num", "value"])]);
let parse_array = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "array"]])]), Chomp[Meta.create](["open_sq"]), Until[Meta.create](["close_sq", parse_expr, "elements"]), Chomp[Meta.create](["close_sq"])])[invoke](tokens);};
let parse_spread = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "spread"]])]), Chomp[Meta.create](["dot_dot_dot"]), Then[Meta.create]([parse_expr, "expr"])])[invoke](tokens);};
let parse_not = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "not"]])]), Chomp[Meta.create](["bang"]), Then[Meta.create]([parse_expr, "expr"])])[invoke](tokens);};
let parse_async_modifier = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([])]), Chomp[Meta.create](["async"])]);
let parse_gen_modifier = Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([])]), Chomp[Meta.create](["times"])]);
let parse_fn_expr_body = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "return"]])]), Chomp[Meta.create](["eq"]), Then[Meta.create]([parse_expr, "expr"]), FMap[Meta.create]([(node) => {
node ??= nil;return [node];}])])[invoke](tokens);};
let parse_args_def = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Chomp[Meta.create](["open_p"]), Until[Meta.create](["close_p", parse_assign_expr]), Chomp[Meta.create](["close_p"])])[invoke](tokens);};
let parse_name_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
var __coil_if_let_temp = parse_single_expr[invoke](tokens) ?? nil;
if (__coil_if_let_temp[Meta.as_bool]()) {
let [expr, tokens] = __coil_if_let_temp;
let __coil_temp;
let parse_map = ParseMap[Meta.from_entries]([["dot", parse_dot], ["keyword", parse_keyword_lookup]]);
var __coil_while_let_temp = parse_map[invoke](tokens, expr) ?? nil;
while (__coil_while_let_temp[Meta.as_bool]()) {
let [new_expr, new_tokens] = __coil_while_let_temp;
let __coil_temp;
expr = new_expr;
tokens = new_tokens;
__coil_while_let_temp = parse_map[invoke](tokens, expr) ?? nil;
};
return [expr, tokens];
};};
let parse_def = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "fn"]])]), Optional[Meta.create](["async", parse_async_modifier, "is_async?"]), Chomp[Meta.create](["def"]), Optional[Meta.create](["times", parse_gen_modifier, "generator?"]), Then[Meta.create]([parse_name_expr, "name_expr"]), Optional[Meta.create](["open_p", parse_args_def, "args"]), Case[Meta.create]([ParseMap[Meta.from_entries]([["eq", parse_fn_expr_body], [_, block[invoke]()]]), "body"])])[invoke](tokens);};
let parse_id_shorthand_record_entry = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "id_shorthand_record_entry"]])]), One[Meta.create](["id", "name"])]);
let parse_keyword_record_entry = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "keyword_record_entry"]])]), One[Meta.create](["id", "name"]), Chomp[Meta.create](["colon"]), Then[Meta.create]([parse_expr, "expr"])])[invoke](tokens);};
let parse_regular_record_entry = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "regular_record_entry"]])]), Then[Meta.create]([parse_expr, "key_expr"]), Chomp[Meta.create](["arrow"]), Then[Meta.create]([parse_expr, "value_expr"])])[invoke](tokens);};
let parse_record_entry = ParseMap[Meta.from_entries]([["dot_dot_dot", parse_spread], [["id", "colon"], parse_keyword_record_entry], [["id", "arrow"], parse_regular_record_entry], ["def", parse_def], [["async", "def"], parse_def], [["id", dot(PARSE_SND_EXPR_STEP_MAP, keys)[invoke]()], parse_regular_record_entry], ["id", parse_id_shorthand_record_entry], [_, parse_regular_record_entry]]);
let parse_prefix_inclusive_range = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "prefix_inclusive_range"]])]), Chomp[Meta.create](["dot_dot", "eq"]), Then[Meta.create]([parse_expr, "expr"])])[invoke](tokens);};
let parse_prefix_exclusive_range = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "prefix_exclusive_range"]])]), Chomp[Meta.create](["dot_dot"]), Then[Meta.create]([parse_expr, "expr"])])[invoke](tokens);};
let parse_keyword = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "keyword"]])]), One[Meta.create](["keyword", "value"]), FMap[Meta.create]([({'type': type, 'value': value, 'pos': pos}) => {
type ??= nil;
value ??= nil;
pos ??= nil;return (ObjectLiteral[Meta.from_entries]([["type", type], ["value", dot(value, 'slice')[invoke]((1))], ["pos", pos]]));}])])[invoke](tokens);};
let parse_anon_fn_body = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "brace_body"]])]), Chomp[Meta.create](["open_b"]), Until[Meta.create](["close_b", parse_statement, "body"]), Chomp[Meta.create](["close_b"])])[invoke](tokens);};
let parse_anon_fn = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "anon_fn"]])]), Chomp[Meta.create](["pipe_bar"]), Until[Meta.create](["pipe_bar", parse_assign_expr, "args"]), Chomp[Meta.create](["pipe_bar"]), Then[Meta.create]([ParseMap[Meta.from_entries]([["open_b", parse_anon_fn_body], [_, parse_expr]]), "return_node"])])[invoke](tokens);};
let parse_anon_gen_fn = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "anon_gen_fn"]])]), Chomp[Meta.create](["times"]), Chomp[Meta.create](["pipe_bar"]), Until[Meta.create](["pipe_bar", parse_assign_expr, "args"]), Chomp[Meta.create](["pipe_bar"]), Then[Meta.create]([ParseMap[Meta.from_entries]([["open_b", parse_anon_fn_body], [_, parse_expr]]), "return_node"])])[invoke](tokens);};
let parse_unapplied_algebra_op = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "unapplied_algebra_op"]])]), Either[Meta.create]([algebra_ops, "op"])]);
let parse_unapplied_equality_op = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "unapplied_equality_op"]])]), Either[Meta.create]([equality_ops, "op"])]);
let SINGLE_EXPR_PARSE_MAP = ParseMap[Meta.from_entries]([["string_lit", parse_str], ["regex_lit", parse_regex], ["keyword", parse_keyword], ["open_p", parse_paren_expr], ["await", parse_await], ["num", parse_num], ["open_sq", parse_array], ["dot_dot_dot", parse_spread], ["bang", parse_not], ["open_b", parse_obj], ["pipe_bar", parse_anon_fn], ["def", parse_def], ["yield", parse_yield], [["times", "pipe_bar"], parse_anon_gen_fn], [["dot_dot", "eq"], parse_prefix_inclusive_range], ["dot_dot", parse_prefix_exclusive_range], [Set[Meta.create]([...valid_ids_in_all_contexts, "import"]), parse_id], [["async", "def"], parse_def], [equality_ops, parse_unapplied_equality_op], [algebra_ops, parse_unapplied_algebra_op]]);
let parse_single_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
return SINGLE_EXPR_PARSE_MAP[invoke](tokens);};
let parse_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
return parse_fifth_expr[invoke](parse_fourth_expr[invoke](parse_third_expr[invoke](parse_snd_expr[invoke](parse_single_expr[invoke](tokens)))));};
let parse_1_2_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
return parse_snd_expr[invoke](parse_single_expr[invoke](tokens));};
let parse_1_2_3_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
return parse_third_expr[invoke](parse_snd_expr[invoke](parse_single_expr[invoke](tokens)));};
let parse_1_2_3_4_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
return parse_fourth_expr[invoke](parse_third_expr[invoke](parse_snd_expr[invoke](parse_single_expr[invoke](tokens))));};
let parse_else_branch = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "else"]])]), Chomp[Meta.create](["else"]), UntilEither[Meta.create]([Set[Meta.create](["else", "end"]), parse_statement, "body"])])[invoke](tokens);};
let parse_else_if_branch = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "else_if"]])]), Chomp[Meta.create](["else", "if"]), Then[Meta.create]([parse_expr, "expr"]), UntilEither[Meta.create]([Set[Meta.create](["else", "end"]), parse_statement, "pass"]), Optional[Meta.create](["else", parse_if_branch, "fail"])])[invoke](tokens);};
let parse_else_if_let_branch = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "else_if_let"]])]), Chomp[Meta.create](["else", "if", "let"]), Then[Meta.create]([parse_assign_expr, "assign_expr"]), Chomp[Meta.create](["eq"]), Then[Meta.create]([parse_expr, "expr"]), UntilEither[Meta.create]([Set[Meta.create](["else", "end"]), parse_statement, "pass"]), Optional[Meta.create](["else", parse_if_branch, "fail"])])[invoke](tokens);};
let parse_if_branch = ParseMap[Meta.from_entries]([[["else", "if", "let"], parse_else_if_let_branch], [["else", "if"], parse_else_if_branch], ["else", parse_else_branch]]);
let parse_if = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "if"]])]), Chomp[Meta.create](["if"]), Then[Meta.create]([parse_expr, "expr"]), UntilEither[Meta.create]([Set[Meta.create](["else", "end"]), parse_statement, "pass"]), Optional[Meta.create](["else", parse_if_branch, "fail"]), Chomp[Meta.create](["end"])])[invoke](tokens);};
let parse_let = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "let"]])]), Chomp[Meta.create](["let"]), Then[Meta.create]([parse_assign_expr, "assign_expr"]), Chomp[Meta.create](["eq"]), Then[Meta.create]([parse_expr, "rhs"])]);
let parse_if_let = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "if_let"]])]), Chomp[Meta.create](["if", "let"]), Then[Meta.create]([parse_assign_expr, "assign_expr"]), Chomp[Meta.create](["eq"]), Then[Meta.create]([parse_expr, "expr"]), UntilEither[Meta.create]([Set[Meta.create](["else", "end"]), parse_statement, "pass"]), Optional[Meta.create](["else", parse_if_branch, "fail"]), Chomp[Meta.create](["end"])])[invoke](tokens);};
let parse_protocol_methods = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "protocol_method"]])]), Chomp[Meta.create](["open_b"]), Until[Meta.create](["close_b", parse_id, "names"]), Chomp[Meta.create](["close_b"])]);
let parse_protocol = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "protocol_def"]])]), Chomp[Meta.create](["protocol"]), One[Meta.create](["id", "name"]), Optional[Meta.create](["open_b", parse_protocol_methods, "methods"])]);
let parse_return = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "return"]])]), Chomp[Meta.create](["return"]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_expr, "expr"])]);
let parse_await_modifier = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([])]), Chomp[Meta.create](["await"])]);
let parse_for_loop = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "for_loop"]])]), Chomp[Meta.create](["for"]), Optional[Meta.create](["await", parse_await_modifier, "is_await?"]), Then[Meta.create]([parse_assign_expr, "assign_expr"]), Chomp[Meta.create](["of"]), Then[Meta.create]([parse_expr, "iterable_expr"]), block[invoke]("body")])[invoke](tokens);};
let parse_loop = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "loop"]])]), Chomp[Meta.create](["loop"]), block[invoke]("body")])[invoke](tokens);};
let parse_while_loop = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "while_loop"]])]), Chomp[Meta.create](["while"]), Then[Meta.create]([parse_expr, "test_expr"]), block[invoke]("body")])[invoke](tokens);};
let parse_while_let_loop = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "while_let_loop"]])]), Chomp[Meta.create](["while", "let"]), Then[Meta.create]([parse_assign_expr, "assign_expr"]), Chomp[Meta.create](["eq"]), Then[Meta.create]([parse_expr, "test_expr"]), block[invoke]("body")])[invoke](tokens);};
let parse_continue = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "continue"]])]), Chomp[Meta.create](["continue"])])[invoke](tokens);};
let parse_break = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "break"]])]), Chomp[Meta.create](["break"])])[invoke](tokens);};
let parse_catch = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "catch"]])]), Chomp[Meta.create](["catch"]), One[Meta.create](["id", "name"]), block[invoke]("body")])[invoke](tokens);};
let parse_finally = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "finally"]])]), Chomp[Meta.create](["finally"]), block[invoke]("body")])[invoke](tokens);};
let parse_try = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "try"]])]), Chomp[Meta.create](["try"]), block[invoke]("body"), Optional[Meta.create](["catch", parse_catch, "catch"]), Optional[Meta.create](["finally", parse_finally, "finally"])])[invoke](tokens);};
let parse_import = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "import"]])]), Chomp[Meta.create](["import"]), Then[Meta.create]([parse_assign_expr, "assign_expr"]), Chomp[Meta.create](["from"]), Then[Meta.create]([parse_str, "path"])])[invoke](tokens);};
let parse_export = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "export"]])]), Chomp[Meta.create](["export"]), Then[Meta.create]([parse_statement, "statement"])])[invoke](tokens);};
let parse_export_default = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "export_default"]])]), Chomp[Meta.create](["export", "default"]), Then[Meta.create]([parse_expr, "expr"])])[invoke](tokens);};
let parse_direct_import = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([["type", "direct_import"]])]), Chomp[Meta.create](["import"]), One[Meta.create](["string_lit", "path"])]);
let parse_statement = function (tokens) {
tokens ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([["let", parse_let], ["for", parse_for_loop], ["try", parse_try], ["protocol", parse_protocol], ["return", parse_return], ["continue", parse_continue], ["break", parse_break], ["loop", parse_loop], [["import", "string_lit"], parse_direct_import], ["import", parse_import], [["export", "default"], parse_export_default], ["export", parse_export], [["while", "let"], parse_while_let_loop], ["while", parse_while_loop], [["if", "let"], parse_if_let], ["if", parse_if], [_, parse_expr]])[invoke](tokens);};
let block = function (name) {
name ??= nil;let __coil_temp;
return Parser[Meta.create]([Until[Meta.create](["end", parse_statement, name]), Chomp[Meta.create](["end"])]);};
let parse_tokens = function (tokens) {
tokens ??= nil;let __coil_temp;
let ast = [];
var __coil_while_let_temp = parse_statement[invoke](tokens) ?? nil;
while (__coil_while_let_temp[Meta.as_bool]()) {
let [statement_or_expr, rest] = __coil_while_let_temp;
let __coil_temp;
dot(ast, 'push')[invoke](statement_or_expr);
tokens = rest;
__coil_while_let_temp = parse_statement[invoke](tokens) ?? nil;
};
return ast;};
export default parse_tokens;
