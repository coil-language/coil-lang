"use strict";
import { ObjectLiteral, Nil, nil, Keyword, dot, raise__b, panic__b, type_of, str } from '../src/std/globals.mjs'
import Meta, { nil__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe } from '../src/std/meta.mjs';
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
let expect_token__b = function (tokens, kw) {
tokens ??= nil;
kw ??= nil;let __coil_temp;
if (dot(dot(tokens, first)[invoke](), at)[invoke](Keyword.for("type"))[Meta["!="]](kw)[Meta.as_bool]()) {
let __coil_temp;
raise__b[invoke](ParseError[Meta.create]([kw, dot(tokens, first)[invoke]()]));
} else {
let __coil_temp;
return tokens;
};};
let verify_exists__b = function (expr, parser) {
expr ??= nil;
parser ??= nil;let __coil_temp;
if (dot(expr, nil__q)[invoke]()[Meta.as_bool]()) {
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
return ObjectLiteral[Meta.from_entries]([[Keyword.for("line"), line], [Keyword.for("col"), col]]);};
let Init = function (expr) {
this['expr'] = expr;
expr ??= nil;let __coil_temp;
};
Init['prototype'][parse] = function ([_expr, tokens]) {
_expr ??= nil;
tokens ??= nil;let __coil_temp;
return [ObjectLiteral[Meta.from_entries]([...dot(this, 'expr'), [Keyword.for("pos"), line_and_col[invoke](dot(tokens, first)[invoke]())]]), tokens];};
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
Keyword['prototype'][can_parse__q] = function ([{'type': type}]) {
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
if (dot(this, len)[invoke]()[Algebra[">"]](dot(tokens, len)[invoke]())[Meta.as_bool]()) {
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
if (dot(tokens, empty__q)[invoke]()[Meta.as_bool]()) {
let __coil_temp;
return [expr, tokens];
} else if (dot(dot(this, 'parse_cond'), can_parse__q)[invoke](tokens)) {
let __coil_temp;
return dot(Then[Meta.create]([dot(this, Keyword.for("parse_fn")), dot(this, Keyword.for("as"))]), parse)[invoke]([expr, tokens]);
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
if (dot(this, 'kw')[Meta.as_bool]()) {
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
while (dot(dot(tokens, first)[invoke](), at)[invoke](Keyword.for("type"))[Meta["!="]](dot(this, 'end_kw'))[Meta.as_bool]()) {
let __coil_temp;
let [expr, new_tokens] = verify_exists__b[invoke](dot(this, 'parser')[invoke](tokens), this);
dot(exprs, Keyword.for("push"))[invoke](expr);
tokens = new_tokens;
};
if (dot(this, 'kw')[Meta.as_bool]()) {
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
while (dot(dot(dot(tokens, first)[invoke](), at)[invoke](Keyword.for("type")), pipe)[invoke](dot(this, 'set'))[Bool.negate]()[Meta.as_bool]()) {
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
if (dot(this, 'kw')[Meta.as_bool]()) {
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
let op = verify_exists__b[invoke](dot(this, 'set')[invoke](dot(dot(tokens, first)[invoke](), at)[invoke](Keyword.for("type"))), dot(this, 'set'));
let [new_expr, rest] = [dot(tokens, first)[invoke](), dot(tokens, 'skip')[invoke]((1))];
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), dot(new_expr, at)[invoke](Keyword.for("value"))]]), rest];};
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
if ((instruction instanceof AbortIf)[Meta.as_bool]()) {
let __coil_temp;
if (dot(instruction, 'cond_fn')[invoke](result)[Meta.as_bool]()) {
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
return dot(dot(dot(this, 'entries'), map)[invoke](([pattern, _]) => {
pattern ??= nil;
_ ??= nil;return pattern;}), into)[invoke](Set[Meta.create]([]));};
ParseMap['prototype'][invoke] = function (tokens, ...args) {
tokens ??= nil;
args ??= nil;let __coil_temp;
if (dot(tokens, empty__q)[invoke]()[Meta.as_bool]()) {
let __coil_temp;
return;
} else {
let __coil_temp;
for  (let [pattern, parser] of dot(this, 'entries')) {
let __coil_temp;
if (dot(pattern, can_parse__q)[invoke](tokens)[Meta.as_bool]()) {
let __coil_temp;
return parser[invoke](tokens, ...args);
};
};
};};
let algebra_ops = Set[Meta.create]([Keyword.for("mod"), Keyword.for("plus"), Keyword.for("minus"), Keyword.for("times"), Keyword.for("pow"), Keyword.for("div"), Keyword.for("lt"), Keyword.for("gt"), Keyword.for("lt_eq"), Keyword.for("gt_eq")]);
let parse_dot = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("dot")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("dot")]), Then[Meta.create]([parse_single_expr, Keyword.for("rhs")])])[invoke](tokens);};
let parse_keyword_lookup = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("keyword_lookup")], [Keyword.for("lhs"), lhs]])]), One[Meta.create]([Keyword.for("keyword"), Keyword.for("property")]), FMap[Meta.create]([({'lhs': lhs, 'type': type, 'property': property, 'pos': pos}) => {
lhs ??= nil;
type ??= nil;
property ??= nil;
pos ??= nil;return (ObjectLiteral[Meta.from_entries]([[Keyword.for("lhs"), lhs], [Keyword.for("type"), type], [Keyword.for("property"), dot(property, 'slice')[invoke]((1))], [Keyword.for("pos"), pos]]));}])])[invoke](tokens);};
let not_adjacent__q = function ([_expr, tokens]) {
_expr ??= nil;
tokens ??= nil;let __coil_temp;
let current = dot(tokens, first)[invoke]();
let previous = dot(tokens, at)[invoke]((-1));
if (dot(current, 'line')[Meta["!="]](dot(previous, 'line'))[Meta.as_bool]()) {
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
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("inclusive_range")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("dot_dot"), Keyword.for("eq")]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_adjacent_expr, Keyword.for("rhs")])])[invoke](tokens);};
let parse_exclusive_range = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("exclusive_range")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("dot_dot")]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_adjacent_expr, Keyword.for("rhs")])])[invoke](tokens);};
let parse_fn_call = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("fn_call")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("open_p")]), Until[Meta.create]([Keyword.for("close_p"), parse_expr, Keyword.for("args")]), Chomp[Meta.create]([Keyword.for("close_p")])])[invoke](tokens);};
let parse_meta_from_entries = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("meta_from_entries")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_record_entry, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_b")])])[invoke](tokens, lhs);};
let parse_meta_create = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("meta_create")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("open_sq")]), Until[Meta.create]([Keyword.for("close_sq"), parse_expr, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_sq")])])[invoke](tokens, lhs);};
let parse_snd_assign = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("snd_assign")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("rhs")])])[invoke](tokens);};
let parse_snd_expr_step = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("open_p"), parse_fn_call], [Keyword.for("open_b"), parse_meta_from_entries], [Keyword.for("open_sq"), parse_meta_create], [Keyword.for("dot"), parse_dot], [Keyword.for("keyword"), parse_keyword_lookup], [[Keyword.for("dot_dot"), Keyword.for("eq")], parse_inclusive_range], [Keyword.for("dot_dot"), parse_exclusive_range]])[invoke](tokens, lhs);};
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
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("algebra_op")], [Keyword.for("lhs"), lhs]])]), Either[Meta.create]([algebra_ops, Keyword.for("op")]), Then[Meta.create]([parse_1_2_expr, Keyword.for("rhs")])])[invoke](tokens);};
let parse_instanceof = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("instanceof")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("instanceof")]), Then[Meta.create]([parse_1_2_expr, Keyword.for("rhs")])])[invoke](tokens);};
let parse_third_expr_step = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("eq"), parse_snd_assign], [Keyword.for("instanceof"), parse_instanceof], [algebra_ops, parse_algebra_op]])[invoke](tokens, lhs);};
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
let equality_ops = Set[Meta.create]([Keyword.for("double_eq"), Keyword.for("not_eq")]);
let parse_eq_op = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("equality_op")], [Keyword.for("lhs"), lhs]])]), Either[Meta.create]([equality_ops, Keyword.for("op")]), Then[Meta.create]([parse_1_2_3_expr, Keyword.for("rhs")])])[invoke](tokens);};
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
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("and")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("and")]), Then[Meta.create]([parse_1_2_3_4_expr, Keyword.for("rhs")])])[invoke](tokens);};
let parse_or = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("or")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("or")]), Then[Meta.create]([parse_1_2_3_4_expr, Keyword.for("rhs")])])[invoke](tokens);};
let parse_fifth_expr_step = function (tokens, lhs) {
tokens ??= nil;
lhs ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("and"), parse_and], [Keyword.for("or"), parse_or]])[invoke](tokens, lhs);};
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
let parse_regex = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("regex_lit")]])]), One[Meta.create]([Keyword.for("regex_lit"), Keyword.for("value")])]);
let parse_str = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("str")]])]), One[Meta.create]([Keyword.for("string_lit"), Keyword.for("value")])]);
let valid_ids_in_all_contexts = Set[Meta.create]([Keyword.for("id"), Keyword.for("from")]);
let parse_id = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("id_lookup")]])]), Either[Meta.create]([Set[Meta.create]([...valid_ids_in_all_contexts, Keyword.for("import")]), Keyword.for("name")])]);
let parse_obj = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("object_literal")]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_record_entry, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_b")])])[invoke](tokens);};
let parse_spread_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("spread_assign")]])]), Chomp[Meta.create]([Keyword.for("dot_dot_dot")]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("name")])]);
let parse_assign_id = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("id_assign")]])]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("name")])]);
let parse_assign_array = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("array_deconstruction")]])]), Chomp[Meta.create]([Keyword.for("open_sq")]), Until[Meta.create]([Keyword.for("close_sq"), parse_assign_expr, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_sq")])])[invoke](tokens);};
let parse_obj_entry_rename = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("obj_entry_rename")]])]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("old_name")]), Chomp[Meta.create]([Keyword.for("colon")]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("new_name")])]);
let parse_regular_obj_assign_entry = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("obj_reg_entry")]])]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("name")])]);
let parse_obj_entry_destructure = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("obj_assign_expr")]])]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("property")]), Chomp[Meta.create]([Keyword.for("colon")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")])])[invoke](tokens);};
let parse_obj_assign_entry = ParseMap[Meta.from_entries]([[[Keyword.for("id"), Keyword.for("colon"), Keyword.for("id")], parse_obj_entry_rename], [[Keyword.for("id"), Keyword.for("colon")], parse_obj_entry_destructure], [Keyword.for("id"), parse_regular_obj_assign_entry], [Keyword.for("dot_dot_dot"), parse_spread_assign]]);
let parse_assign_obj = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("object_deconstruction")]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_obj_assign_entry, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_b")])]);
let parse_this_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("this_assign")]])]), Chomp[Meta.create]([Keyword.for("at")]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("name")])]);
let parse_this_spread_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("this_spread_assign")]])]), Chomp[Meta.create]([Keyword.for("dot_dot_dot"), Keyword.for("at")]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")])]);
let parse_assign_expr = ParseMap[Meta.from_entries]([[Keyword.for("id"), parse_assign_id], [Keyword.for("open_sq"), parse_assign_array], [Keyword.for("open_b"), parse_assign_obj], [Keyword.for("at"), parse_this_assign], [[Keyword.for("dot_dot_dot"), Keyword.for("at")], parse_this_spread_assign], [Keyword.for("dot_dot_dot"), parse_spread_assign]]);
let parse_paren_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("paren_expr")]])]), Chomp[Meta.create]([Keyword.for("open_p")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), Chomp[Meta.create]([Keyword.for("close_p")])])[invoke](tokens);};
let parse_yield = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("yield")]])]), Chomp[Meta.create]([Keyword.for("yield")]), Optional[Meta.create]([Keyword.for("times"), parse_gen_modifier, Keyword.for("star?")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);};
let parse_await = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("await")]])]), Chomp[Meta.create]([Keyword.for("await")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);};
let parse_num = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("num")]])]), One[Meta.create]([Keyword.for("num"), Keyword.for("value")])]);
let parse_array = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("array")]])]), Chomp[Meta.create]([Keyword.for("open_sq")]), Until[Meta.create]([Keyword.for("close_sq"), parse_expr, Keyword.for("elements")]), Chomp[Meta.create]([Keyword.for("close_sq")])])[invoke](tokens);};
let parse_spread = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("spread")]])]), Chomp[Meta.create]([Keyword.for("dot_dot_dot")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);};
let parse_not = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("not")]])]), Chomp[Meta.create]([Keyword.for("bang")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);};
let parse_async_modifier = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([])]), Chomp[Meta.create]([Keyword.for("async")])]);
let parse_gen_modifier = Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([])]), Chomp[Meta.create]([Keyword.for("times")])]);
let parse_fn_expr_body = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("return")]])]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), FMap[Meta.create]([(node) => {
node ??= nil;return [node];}])])[invoke](tokens);};
let parse_args_def = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Chomp[Meta.create]([Keyword.for("open_p")]), Until[Meta.create]([Keyword.for("close_p"), parse_assign_expr]), Chomp[Meta.create]([Keyword.for("close_p")])])[invoke](tokens);};
let parse_name_expr = function (tokens) {
tokens ??= nil;let __coil_temp;
var __coil_if_let_temp = parse_single_expr[invoke](tokens) ?? nil;
if (__coil_if_let_temp[Meta.as_bool]()) {
let [expr, tokens] = __coil_if_let_temp;
let __coil_temp;
let parse_map = ParseMap[Meta.from_entries]([[Keyword.for("dot"), parse_dot], [Keyword.for("keyword"), parse_keyword_lookup]]);
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
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("fn")]])]), Optional[Meta.create]([Keyword.for("async"), parse_async_modifier, Keyword.for("is_async?")]), Chomp[Meta.create]([Keyword.for("def")]), Optional[Meta.create]([Keyword.for("times"), parse_gen_modifier, Keyword.for("generator?")]), Then[Meta.create]([parse_name_expr, Keyword.for("name_expr")]), Optional[Meta.create]([Keyword.for("open_p"), parse_args_def, Keyword.for("args")]), Case[Meta.create]([ParseMap[Meta.from_entries]([[Keyword.for("eq"), parse_fn_expr_body], [_, block[invoke]()]]), Keyword.for("body")])])[invoke](tokens);};
let parse_keyword_record_entry = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("keyword_record_entry")]])]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")]), Chomp[Meta.create]([Keyword.for("colon")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);};
let parse_regular_record_entry = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("regular_record_entry")]])]), Then[Meta.create]([parse_expr, Keyword.for("key_expr")]), Chomp[Meta.create]([Keyword.for("arrow")]), Then[Meta.create]([parse_expr, Keyword.for("value_expr")])])[invoke](tokens);};
let parse_record_entry = function (tokens) {
tokens ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("dot_dot_dot"), parse_spread], [[Keyword.for("id"), Keyword.for("colon")], parse_keyword_record_entry], [[Keyword.for("id"), Keyword.for("arrow")], parse_regular_record_entry], [Keyword.for("def"), parse_def], [[Keyword.for("async"), Keyword.for("def")], parse_def], [_, parse_regular_record_entry]])[invoke](tokens);};
let parse_prefix_inclusive_range = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("prefix_inclusive_range")]])]), Chomp[Meta.create]([Keyword.for("dot_dot"), Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);};
let parse_prefix_exclusive_range = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("prefix_exclusive_range")]])]), Chomp[Meta.create]([Keyword.for("dot_dot")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);};
let parse_keyword = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("keyword")]])]), One[Meta.create]([Keyword.for("keyword"), Keyword.for("value")]), FMap[Meta.create]([({'type': type, 'value': value, 'pos': pos}) => {
type ??= nil;
value ??= nil;
pos ??= nil;return (ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), type], [Keyword.for("value"), dot(value, 'slice')[invoke]((1))], [Keyword.for("pos"), pos]]));}])])[invoke](tokens);};
let parse_anon_fn_body = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("brace_body")]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_statement, Keyword.for("body")]), Chomp[Meta.create]([Keyword.for("close_b")])])[invoke](tokens);};
let parse_anon_fn = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("anon_fn")]])]), Chomp[Meta.create]([Keyword.for("pipe_bar")]), Until[Meta.create]([Keyword.for("pipe_bar"), parse_assign_expr, Keyword.for("args")]), Chomp[Meta.create]([Keyword.for("pipe_bar")]), Then[Meta.create]([ParseMap[Meta.from_entries]([[Keyword.for("open_b"), parse_anon_fn_body], [_, parse_expr]]), Keyword.for("return_node")])])[invoke](tokens);};
let parse_unapplied_algebra_op = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("unapplied_algebra_op")]])]), Either[Meta.create]([algebra_ops, Keyword.for("op")])]);
let parse_unapplied_equality_op = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("unapplied_equality_op")]])]), Either[Meta.create]([equality_ops, Keyword.for("op")])]);
let SINGLE_EXPR_PARSE_MAP = ParseMap[Meta.from_entries]([[Keyword.for("string_lit"), parse_str], [Keyword.for("regex_lit"), parse_regex], [Keyword.for("keyword"), parse_keyword], [Keyword.for("open_p"), parse_paren_expr], [Keyword.for("yield"), parse_yield], [Keyword.for("await"), parse_await], [Keyword.for("num"), parse_num], [Keyword.for("open_sq"), parse_array], [Keyword.for("dot_dot_dot"), parse_spread], [Keyword.for("bang"), parse_not], [Keyword.for("open_b"), parse_obj], [Keyword.for("pipe_bar"), parse_anon_fn], [[Keyword.for("dot_dot"), Keyword.for("eq")], parse_prefix_inclusive_range], [Keyword.for("dot_dot"), parse_prefix_exclusive_range], [Set[Meta.create]([...valid_ids_in_all_contexts, Keyword.for("import")]), parse_id], [[Keyword.for("async"), Keyword.for("def")], parse_def], [Keyword.for("def"), parse_def], [equality_ops, parse_unapplied_equality_op], [algebra_ops, parse_unapplied_algebra_op]]);
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
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("else")]])]), Chomp[Meta.create]([Keyword.for("else")]), UntilEither[Meta.create]([Set[Meta.create]([Keyword.for("else"), Keyword.for("end")]), parse_statement, Keyword.for("body")])])[invoke](tokens);};
let parse_else_if_branch = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("else_if")]])]), Chomp[Meta.create]([Keyword.for("else"), Keyword.for("if")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), UntilEither[Meta.create]([Set[Meta.create]([Keyword.for("else"), Keyword.for("end")]), parse_statement, Keyword.for("pass")]), Optional[Meta.create]([Keyword.for("else"), parse_if_branch, Keyword.for("fail")])])[invoke](tokens);};
let parse_if_branch = ParseMap[Meta.from_entries]([[[Keyword.for("else"), Keyword.for("if")], parse_else_if_branch], [Keyword.for("else"), parse_else_branch]]);
let parse_if = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("if")]])]), Chomp[Meta.create]([Keyword.for("if")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), UntilEither[Meta.create]([Set[Meta.create]([Keyword.for("else"), Keyword.for("end")]), parse_statement, Keyword.for("pass")]), Optional[Meta.create]([Keyword.for("else"), parse_if_branch, Keyword.for("fail")]), Chomp[Meta.create]([Keyword.for("end")])])[invoke](tokens);};
let parse_let = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("let")]])]), Chomp[Meta.create]([Keyword.for("let")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("rhs")])]);
let parse_if_let = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("if_let")]])]), Chomp[Meta.create]([Keyword.for("if"), Keyword.for("let")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), UntilEither[Meta.create]([Set[Meta.create]([Keyword.for("else"), Keyword.for("end")]), parse_statement, Keyword.for("pass")]), Optional[Meta.create]([Keyword.for("else"), parse_else_branch, Keyword.for("fail")]), Chomp[Meta.create]([Keyword.for("end")])])[invoke](tokens);};
let parse_protocol_methods = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("protocol_method")]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_id, Keyword.for("names")]), Chomp[Meta.create]([Keyword.for("close_b")])]);
let parse_protocol = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("protocol_def")]])]), Chomp[Meta.create]([Keyword.for("protocol")]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")]), Optional[Meta.create]([Keyword.for("open_b"), parse_protocol_methods, Keyword.for("methods")])]);
let parse_return = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("return")]])]), Chomp[Meta.create]([Keyword.for("return")]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_expr, Keyword.for("expr")])]);
let parse_await_modifier = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([])]), Chomp[Meta.create]([Keyword.for("await")])]);
let parse_for_loop = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("for_loop")]])]), Chomp[Meta.create]([Keyword.for("for")]), Optional[Meta.create]([Keyword.for("await"), parse_await_modifier, Keyword.for("is_await?")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("of")]), Then[Meta.create]([parse_expr, Keyword.for("iterable_expr")]), block[invoke](Keyword.for("body"))])[invoke](tokens);};
let parse_loop = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("loop")]])]), Chomp[Meta.create]([Keyword.for("loop")]), block[invoke](Keyword.for("body"))])[invoke](tokens);};
let parse_while_loop = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("while_loop")]])]), Chomp[Meta.create]([Keyword.for("while")]), Then[Meta.create]([parse_expr, Keyword.for("test_expr")]), block[invoke](Keyword.for("body"))])[invoke](tokens);};
let parse_while_let_loop = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("while_let_loop")]])]), Chomp[Meta.create]([Keyword.for("while"), Keyword.for("let")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("test_expr")]), block[invoke](Keyword.for("body"))])[invoke](tokens);};
let parse_continue = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("continue")]])]), Chomp[Meta.create]([Keyword.for("continue")])])[invoke](tokens);};
let parse_break = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("break")]])]), Chomp[Meta.create]([Keyword.for("break")])])[invoke](tokens);};
let parse_catch = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("catch")]])]), Chomp[Meta.create]([Keyword.for("catch")]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")]), block[invoke](Keyword.for("body"))])[invoke](tokens);};
let parse_finally = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("finally")]])]), Chomp[Meta.create]([Keyword.for("finally")]), block[invoke](Keyword.for("body"))])[invoke](tokens);};
let parse_try = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("try")]])]), Chomp[Meta.create]([Keyword.for("try")]), block[invoke](Keyword.for("body")), Optional[Meta.create]([Keyword.for("catch"), parse_catch, Keyword.for("catch")]), Optional[Meta.create]([Keyword.for("finally"), parse_finally, Keyword.for("finally")])])[invoke](tokens);};
let parse_import = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("import")]])]), Chomp[Meta.create]([Keyword.for("import")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("from")]), Then[Meta.create]([parse_str, Keyword.for("path")])])[invoke](tokens);};
let parse_export = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("export")]])]), Chomp[Meta.create]([Keyword.for("export")]), Then[Meta.create]([parse_statement, Keyword.for("statement")])])[invoke](tokens);};
let parse_export_default = function (tokens) {
tokens ??= nil;let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("export_default")]])]), Chomp[Meta.create]([Keyword.for("export"), Keyword.for("default")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);};
let parse_direct_import = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("direct_import")]])]), Chomp[Meta.create]([Keyword.for("import")]), One[Meta.create]([Keyword.for("string_lit"), Keyword.for("path")])]);
let parse_statement = function (tokens) {
tokens ??= nil;let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("let"), parse_let], [Keyword.for("for"), parse_for_loop], [Keyword.for("try"), parse_try], [Keyword.for("protocol"), parse_protocol], [Keyword.for("return"), parse_return], [Keyword.for("continue"), parse_continue], [Keyword.for("break"), parse_break], [Keyword.for("loop"), parse_loop], [[Keyword.for("import"), Keyword.for("string_lit")], parse_direct_import], [Keyword.for("import"), parse_import], [[Keyword.for("export"), Keyword.for("default")], parse_export_default], [Keyword.for("export"), parse_export], [[Keyword.for("while"), Keyword.for("let")], parse_while_let_loop], [Keyword.for("while"), parse_while_loop], [[Keyword.for("if"), Keyword.for("let")], parse_if_let], [Keyword.for("if"), parse_if], [_, parse_expr]])[invoke](tokens);};
let block = function (name) {
name ??= nil;let __coil_temp;
return Parser[Meta.create]([Until[Meta.create]([Keyword.for("end"), parse_statement, name]), Chomp[Meta.create]([Keyword.for("end")])]);};
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
