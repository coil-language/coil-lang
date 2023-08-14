
"use strict";
import { ObjectLiteral, Nil, nil, Keyword, dot } from './src/std/globals.js'
import Meta, {
  nil__q, is_a__q, create, from_entries, __equals__,
  __not_equals__, exists__q, as_bool, log, invoke, pipe
} from './src/std/meta.js';
import Iter, {
  take, until, skip, find, zip, reduce, map, flat_map, each,
  filter, reject, all__q, any__q, split, compact, join, into
} from './src/std/iter/index.js';
import Algebra, {
  __plus__, __minus__, __divide__,
  __multiply__, __exponent__, __modulo__,
  __greater_than__, __greater_than_or_equal_to__,
  __less_than__, __less_than_or_equal_to__,
} from './src/std/algebra.js';
import Bool, { negate } from './src/std/bool.js';
import Collection, { at, len, empty__q, has__q } from './src/std/collection.js';
import OrderedSequence, { first, last } from './src/std/ordered_sequence.js';
import {
  inc, InclusiveRange, ExclusiveRange, InclusiveRangeNoMaximum,
  InclusiveRangeNoMinimum, ExclusiveRangeNoMaximum, ExclusiveRangeNoMinimum
} from './src/std/range.js';
import Record, { keys, values } from './src/std/record.js';
import Underscore, { _ } from './src/std/underscore.js';
import CondMap from './src/std/cond_map.js'
let __coil_temp;
let CollectionView = function (collection, idx) {
this['collection'] = collection;
this['idx'] = idx;
let __coil_temp;
}
CollectionView['prototype'][(dot(Collection, 'len'))] = function () {
let __coil_temp;
return dot(dot(this, 'collection'), len)[invoke]()[Algebra["-"]](dot(this, 'idx'));}
CollectionView['prototype'][(dot(Collection, 'empty?'))] = function () {
let __coil_temp;
return dot(this, len)[invoke]()[Meta["=="]]((0));}
CollectionView['prototype'][(dot(Collection, 'at'))] = function (idx) {
let __coil_temp;
return dot(dot(this, 'collection'), at)[invoke](dot(this, 'idx')[Algebra["+"]](idx));}
CollectionView['prototype'][(dot(OrderedSequence, 'first'))] = function () {
let __coil_temp;
return dot(dot(this, 'collection'), at)[invoke](dot(this, 'idx'));}
CollectionView['prototype'][(dot(OrderedSequence, 'last'))] = function () {
let __coil_temp;
return dot(dot(this, 'collection'), last)[invoke]();}
CollectionView['prototype']['skip'] = function (n) {
let __coil_temp;
return CollectionView[Meta.create]([dot(this, 'collection'), dot(this, 'idx')[Algebra["+"]](n)]);}
CollectionView['prototype'][(dot(Symbol, 'iterator'))] = function *() {
let __coil_temp;
for  (let i of new ExclusiveRange(dot(this, 'idx'), dot(dot(this, 'collection'), len)[invoke]())) {
let __coil_temp;
yield dot(dot(this, 'collection'), i)
};}
let Lexer = function (entries) {
this['entries'] = entries;
let __coil_temp;
}
let pass = function () {
let __coil_temp;
}
let newline = function () {
let __coil_temp;
}
Lexer['prototype'][invoke] = function (str) {
let __coil_temp;
let tokens = [];
let index = (0);
let rest_of_string = function () {
let __coil_temp;
return dot(str, 'slice')[invoke](index);}
let scan = function (pattern) {
let __coil_temp;
let result = dot(rest_of_string[invoke](), Keyword.for("match"))[invoke](pattern);
if ((__coil_temp = {left: result, right: dot(result, 'index')[Meta["!="]]((0))}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : __coil_temp.right)[Bool.negate]()[Meta.as_bool]()) {
let __coil_temp;
return false;
} else {
let __coil_temp;
(index = index[Algebra["+"]](dot(dot(result, (0)), Keyword.for("length"))))
return dot(result, (0));
};}
let line = (1);
let col = (1);
while (rest_of_string[invoke]()[Meta["!="]]("")[Meta.as_bool]()) {
let __coil_temp;
let found = false;
for  (let [pattern, type] of dot(this, 'entries')) {
let __coil_temp;
var __coil_if_let_temp = scan[invoke](pattern);
if (__coil_if_let_temp[Meta.as_bool]()) {
let value = __coil_if_let_temp;
let __coil_temp;
if (type[Meta["=="]](newline)[Meta.as_bool]()) {
let __coil_temp;
(line = line[Algebra["+"]]((1)))
(col = (1))
} else if (type[Meta["!="]](pass)) {
let __coil_temp;
dot(tokens, 'push')[invoke](ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), type], [Keyword.for("value"), value], [Keyword.for("line"), line], [Keyword.for("col"), col]]))
(col = col[Algebra["+"]](dot(value, len)[invoke]()))
} else {
let __coil_temp;
(col = col[Algebra["+"]](dot(value, len)[invoke]()))
};
(found = true)
break;
};
};
if (found[Bool.negate]()[Meta.as_bool]()) {
let __coil_temp;
raise__b[invoke](Error[Meta.create](["No token matched."]))
};
};
return tokens;}
let lexer = Lexer[Meta.from_entries]([[/^\n/, newline], [/^\s+/, pass], [/^\#.*/, pass], [/^\,/, pass], [/^\;/, pass], [/^if\s/, Keyword.for("if")], [/^else\s/, Keyword.for("else")], [/^return\s/, Keyword.for("return")], [/^import\s/, Keyword.for("import")], [/^export\s/, Keyword.for("export")], [/^default\s/, Keyword.for("default")], [/^from\s/, Keyword.for("from")], [/^let\s/, Keyword.for("let")], [/^protocol\s/, Keyword.for("protocol")], [/^for\s/, Keyword.for("for")], [/^try\s/, Keyword.for("try")], [/^catch\s/, Keyword.for("catch")], [/^finally\s/, Keyword.for("finally")], [/^end\s/, Keyword.for("end")], [/^while\s/, Keyword.for("while")], [/^loop\s/, Keyword.for("loop")], [/^and\s/, Keyword.for("and")], [/^or\s/, Keyword.for("or")], [/^continue\s/, Keyword.for("continue")], [/^break\s/, Keyword.for("break")], [/^of\s/, Keyword.for("of")], [/^yield\s/, Keyword.for("yield")], [/^async\s/, Keyword.for("async")], [/^await\s/, Keyword.for("await")], [/^\=\>/, Keyword.for("arrow")], [/^\@/, Keyword.for("at")], [/^\=\=/, Keyword.for("double_eq")], [/^\!\=/, Keyword.for("not_eq")], [/^\!/, Keyword.for("bang")], [/^\=/, Keyword.for("eq")], [/^fn\b/, Keyword.for("fn")], [/^\{/, Keyword.for("open_b")], [/^\}/, Keyword.for("close_b")], [/^\(/, Keyword.for("open_p")], [/^\)/, Keyword.for("close_p")], [/^\|/, Keyword.for("pipe_bar")], [/^[\-\+]?(\d+\.)?\d+n/, Keyword.for("bigint")], [/^[\-\+]?(\d+\.)?\d+/, Keyword.for("num")], [/^\.\.\./, Keyword.for("dot_dot_dot")], [/^\.\./, Keyword.for("dot_dot")], [/^\./, Keyword.for("dot")], [/^\/.*\/[a-z]?/, Keyword.for("regex_lit")], [/^\>\=/, Keyword.for("gt_eq")], [/^\<\=/, Keyword.for("lt_eq")], [/^\>/, Keyword.for("gt")], [/^\</, Keyword.for("lt")], [/^\+/, Keyword.for("plus")], [/^\%/, Keyword.for("mod")], [/^\-/, Keyword.for("minus")], [/^\*\*/, Keyword.for("pow")], [/^\*/, Keyword.for("times")], [/^\:/, Keyword.for("colon")], [/^\//, Keyword.for("div")], [/^\[/, Keyword.for("open_sq")], [/^\]/, Keyword.for("close_sq")], [/^\"([^\\\"]|\\.)*\"/s, Keyword.for("string_lit")], [/^[a-zA-Z_\?\!\$0-9]+/, Keyword.for("id")]]);
let expect_token__b = function (tokens, kw) {
let __coil_temp;
if (dot(dot(tokens, first)[invoke](), at)[invoke](Keyword.for("type"))[Meta["!="]](kw)[Meta.as_bool]()) {
let __coil_temp;
raise__b[invoke](ParseError[Meta.create]([kw, dot(tokens, first)[invoke]()]))
} else {
let __coil_temp;
return tokens;
};}
let verify_exists__b = function (expr, parser) {
let __coil_temp;
if (dot(expr, nil__q)[invoke]()[Meta.as_bool]()) {
let __coil_temp;
raise__b[invoke](Error[Meta.create](["Parser Failed - Expected "[Algebra["+"]](parser)]))
} else {
let __coil_temp;
return expr;
};}
const parse = Symbol("parse");
let line_and_col = function ({'line': line, 'col': col}) {
let __coil_temp;
return ObjectLiteral[Meta.from_entries]([[Keyword.for("line"), line], [Keyword.for("col"), col]]);}
let Init = function (expr) {
this['expr'] = expr;
let __coil_temp;
}
Init['prototype'][parse] = function ([_expr, tokens]) {
let __coil_temp;
return [ObjectLiteral[Meta.from_entries]([...dot(this, 'expr'), [Keyword.for("pos"), line_and_col[invoke](dot(tokens, first)[invoke]())]]), tokens];}
let One = function (kw, as) {
this['kw'] = kw;
this['as'] = as;
let __coil_temp;
}
One['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
let {'value': value, 'type': type} = dot(expect_token__b[invoke](tokens, dot(this, kw)), first)[invoke]();
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'as'), value]]), dot(tokens, 'skip')[invoke]((1))];}
const can_parse__q = Symbol("can_parse?");
Keyword['prototype'][can_parse__q] = function ([]) {
let __coil_temp;
return this[Meta["=="]](type);}
Set['prototype'][can_parse__q] = function ([]) {
let __coil_temp;
return dot(this, has__q)[invoke](type);}
_[can_parse__q] = function ([]) {
let __coil_temp;
return true;}
Array['prototype'][can_parse__q] = function (tokens) {
let __coil_temp;
return dot(dot(this, zip)[invoke](tokens), all__q)[invoke](([pattern, token]) => dot(pattern, can_parse__q)[invoke]([token]));}
let Optional = function (parse_cond, parse_fn, as) {
this['parse_cond'] = parse_cond;
this['parse_fn'] = parse_fn;
this['as'] = as;
let __coil_temp;
}
Optional['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
if (dot(tokens, empty__q)[invoke]()[Meta.as_bool]()) {
let __coil_temp;
return [expr, tokens];
} else if (dot(dot(this, 'parse_cond'), can_parse__q)[invoke](tokens)) {
let __coil_temp;
return dot(Then[Meta.create]([dot(this, Keyword.for("parse_fn")), dot(this, Keyword.for("as"))]), parse)[invoke]([expr, tokens]);
} else {
let __coil_temp;
return [expr, tokens];
};}
Function['prototype'][parse] = function ([_expr, tokens]) {
let __coil_temp;
return this[invoke](tokens);}
let Chomp = function (...kws) {
this['kws'] = kws;
let __coil_temp;
}
Chomp['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
let i = (0);
for  (let kw of dot(this, 'kws')) {
let __coil_temp;
expect_token__b[invoke](dot(tokens, 'skip')[invoke](i), kw)
(i = i[Algebra["+"]]((1)))
};
return [expr, dot(tokens, 'skip')[invoke](i)];}
let Then = function (parser, kw) {
this['parser'] = parser;
this['kw'] = kw;
let __coil_temp;
}
Then['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
var __coil_if_let_temp = dot(this, 'parser')[invoke](tokens);
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
};}
let FMap = function (f) {
this['f'] = f;
let __coil_temp;
}
FMap['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
return [dot(this, 'f')[invoke](expr), tokens];}
let Until = function (end_kw, parser, kw) {
this['end_kw'] = end_kw;
this['parser'] = parser;
this['kw'] = kw;
let __coil_temp;
}
Until['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
let exprs = [];
while (dot(dot(tokens, first)[invoke](), at)[invoke](Keyword.for("type"))[Meta["!="]](dot(this, end_kw))[Meta.as_bool]()) {
let __coil_temp;
let [expr, new_tokens] = verify_exists__b[invoke](dot(this, 'parser')[invoke](tokens), this);
dot(exprs, Keyword.for("push"))[invoke](expr)
(tokens = new_tokens)
};
if (dot(this, 'kw')[Meta.as_bool]()) {
let __coil_temp;
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), exprs]]), tokens];
} else {
let __coil_temp;
return [exprs, tokens];
};}
let UntilEither = function (set, parser, kw) {
this['set'] = set;
this['parser'] = parser;
this['kw'] = kw;
let __coil_temp;
}
UntilEither['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
let exprs = [];
while (dot(dot(dot(tokens, first)[invoke](), at)[invoke](Keyword.for("type")), pipe)[invoke](dot(this, 'set'))[Bool.negate]()[Meta.as_bool]()) {
let __coil_temp;
let [expr, new_tokens] = verify_exists__b[invoke](dot(this, 'parser')[invoke](tokens), this);
dot(exprs, 'push')[invoke](expr)
(tokens = new_tokens)
};
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), exprs]]), tokens];}
let Case = function (parse_map, kw) {
this['parse_map'] = parse_map;
this['kw'] = kw;
let __coil_temp;
}
Case['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
var __coil_if_let_temp = dot(this, 'parse_map')[invoke](tokens);
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
dot(console, log)[invoke](dot(dot(this, 'tokens'), first)[invoke](), dot(this, 'parse_map'))
raise__b[invoke](Error[Meta.create](["Case Parse Failed"]))
};}
let Either = function (set, kw) {
this['set'] = set;
this['kw'] = kw;
let __coil_temp;
}
Either['prototype'][parse] = function ([expr, tokens]) {
let __coil_temp;
let op = verify_exists__b[invoke](dot(this, 'set')[invoke](dot(dot(tokens, first)[invoke](), at)[invoke](Keyword.for("type"))), dot(this, 'set'));
let [new_expr, rest] = [dot(tokens, first)[invoke](), dot(tokens, 'skip')[invoke]((1))];
return [ObjectLiteral[Meta.from_entries]([...expr, [dot(this, 'kw'), dot(new_expr, at)[invoke](Keyword.for("value"))]]), rest];}
let Parser = function (...instructions) {
this['instructions'] = instructions;
let __coil_temp;
}
Parser['prototype'][invoke] = function (tokens) {
let __coil_temp;
return dot(this, parse)[invoke]([nil, tokens]);}
let AbortIf = function (cond_fn) {
this['cond_fn'] = cond_fn;
let __coil_temp;
}
Parser['prototype'][parse] = function (result) {
let __coil_temp;
for  (let instruction of dot(this, 'instructions')) {
let __coil_temp;
if (dot(instruction, is_a__q)[invoke](AbortIf)[Meta.as_bool]()) {
let __coil_temp;
if (dot(instruction, 'cond_fn')[invoke](result)[Meta.as_bool]()) {
let __coil_temp;
return;
} else {
let __coil_temp;
continue;
};
};
(result = dot(instruction, parse)[invoke](result))
};
return result;}
let ParseMap = function (entries) {
this['entries'] = entries;
let __coil_temp;
}
ParseMap['prototype'][(dot(Record, 'keys'))] = function () {
let __coil_temp;
return dot(dot(dot(this, 'entries'), map)[invoke](([pattern, _]) => pattern), into)[invoke](Set[Meta.create]([]));}
ParseMap['prototype'][invoke] = function (tokens, ...args) {
let __coil_temp;
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
};}
let algebra_ops = Set[Meta.create]([Keyword.for("mod"), Keyword.for("plus"), Keyword.for("minus"), Keyword.for("times"), Keyword.for("pow"), Keyword.for("div"), Keyword.for("lt"), Keyword.for("gt"), Keyword.for("lt_eq"), Keyword.for("gt_eq")]);
let parse_dot = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("dot")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("dot")]), Then[Meta.create]([parse_single_expr, Keyword.for("rhs")])])[invoke](tokens);}
let parse_keyword_lookup = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("keyword_lookup")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("colon")]), One[Meta.create]([Keyword.for("id"), Keyword.for("property")])])[invoke](tokens);}
let not_adjacent__q = function ([_expr, tokens]) {
let __coil_temp;
let current = dot(tokens, first)[invoke]();
let previous = dot(dot(tokens, 'collection'), at)[invoke](dot(tokens, 'idx')[Algebra["-"]]((1)));
if (dot(current, 'line')[Meta["!="]](dot(previous, 'line'))[Meta.as_bool]()) {
let __coil_temp;
return true;
} else {
let __coil_temp;
let end_of_prev_token = dot(previous, 'col')[Algebra["+"]](dot(dot(previous, 'value'), 'length'));
return (dot(current, 'col')[Algebra["-"]](end_of_prev_token))[Algebra[">="]]((1));
};}
let parse_adjacent_expr = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Then[Meta.create]([parse_expr])])[invoke](tokens);}
let parse_inclusive_range = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("inclusive_range")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("dot_dot"), Keyword.for("eq")]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_adjacent_expr, Keyword.for("rhs")])])[invoke](tokens);}
let parse_exclusive_range = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("exclusive_range")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("dot_dot")]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_adjacent_expr, Keyword.for("rhs")])])[invoke](tokens);}
let parse_fn_call = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("fn_call")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("open_p")]), Until[Meta.create]([Keyword.for("close_p"), parse_expr, Keyword.for("args")]), Chomp[Meta.create]([Keyword.for("close_p")])])[invoke](tokens);}
let parse_meta_from_entries = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("meta_from_entries")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_record_entry, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_b")])])[invoke](tokens, lhs);}
let parse_meta_create = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("meta_create")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("open_sq")]), Until[Meta.create]([Keyword.for("close_sq"), parse_expr, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_sq")])])[invoke](tokens, lhs);}
let parse_snd_expr_step = function (tokens, lhs) {
let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("open_p"), parse_fn_call], [Keyword.for("open_b"), parse_meta_from_entries], [Keyword.for("open_sq"), parse_meta_create], [Keyword.for("dot"), parse_dot], [Keyword.for("colon"), parse_keyword_lookup], [[Keyword.for("dot_dot"), Keyword.for("eq")], parse_inclusive_range], [Keyword.for("dot_dot"), parse_exclusive_range]])[invoke](tokens, lhs);}
let parse_snd_expr = function ([lhs, tokens]) {
let __coil_temp;
var __coil_while_let_temp = parse_snd_expr_step[invoke](tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
let __coil_temp;
(lhs = new_lhs)
(tokens = rest)
__coil_while_let_temp = parse_snd_expr_step[invoke](tokens, lhs);
};
return [lhs, tokens];}
let parse_algebra_op = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("algebra_op")], [Keyword.for("lhs"), lhs]])]), Either[Meta.create]([algebra_ops, Keyword.for("op")]), Then[Meta.create]([parse_1_2_expr, Keyword.for("rhs")])])[invoke](tokens);}
let parse_third_expr_step = function (tokens, lhs) {
let __coil_temp;
return ParseMap[Meta.from_entries]([[algebra_ops, parse_algebra_op]])[invoke](tokens, lhs);}
let parse_third_expr = function ([lhs, tokens]) {
let __coil_temp;
var __coil_while_let_temp = parse_third_expr_step[invoke](tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
let __coil_temp;
(lhs = new_lhs)
(tokens = rest)
__coil_while_let_temp = parse_third_expr_step[invoke](tokens, lhs);
};
return [lhs, tokens];}
let parse_eq_op = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("equality_op")], [Keyword.for("lhs"), lhs]])]), Either[Meta.create]([Set[Meta.create]([Keyword.for("double_eq"), Keyword.for("not_eq")]), Keyword.for("op")]), Then[Meta.create]([parse_1_2_3_expr, Keyword.for("rhs")])])[invoke](tokens);}
let parse_fourth_expr_step = function (tokens, lhs) {
let __coil_temp;
return ParseMap[Meta.from_entries]([[Set[Meta.create]([Keyword.for("double_eq"), Keyword.for("not_eq")]), parse_eq_op]])[invoke](tokens, lhs);}
let parse_fourth_expr = function ([lhs, tokens]) {
let __coil_temp;
var __coil_while_let_temp = parse_fourth_expr_step[invoke](tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
let __coil_temp;
(lhs = new_lhs)
(tokens = rest)
__coil_while_let_temp = parse_fourth_expr_step[invoke](tokens, lhs);
};
return [lhs, tokens];}
let parse_and = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("and")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("and")]), Then[Meta.create]([parse_1_2_3_4_expr, Keyword.for("rhs")])])[invoke](tokens);}
let parse_or = function (tokens, lhs) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("or")], [Keyword.for("lhs"), lhs]])]), Chomp[Meta.create]([Keyword.for("or")]), Then[Meta.create]([parse_1_2_3_4_expr, Keyword.for("rhs")])])[invoke](tokens);}
let parse_fifth_expr_step = function (tokens, lhs) {
let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("and"), parse_and], [Keyword.for("or"), parse_or]])[invoke](tokens, lhs);}
let parse_fifth_expr = function ([lhs, tokens]) {
let __coil_temp;
var __coil_while_let_temp = parse_fifth_expr_step[invoke](tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
let __coil_temp;
(lhs = new_lhs)
(tokens = rest)
__coil_while_let_temp = parse_fifth_expr_step[invoke](tokens, lhs);
};
return [lhs, tokens];}
let parse_regex = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("regex_lit")]])]), One[Meta.create]([Keyword.for("regex_lit"), Keyword.for("value")])]);
let parse_str = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("str")]])]), One[Meta.create]([Keyword.for("string_lit"), Keyword.for("value")])]);
let valid_ids_in_all_contexts = Set[Meta.create]([Keyword.for("id"), Keyword.for("from")]);
let parse_id = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("id_lookup")]])]), Either[Meta.create]([dot(valid_ids_in_all_contexts, push)[invoke](Keyword.for("import")), Keyword.for("name")])]);
let parse_obj = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("object_literal")]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_record_entry, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_b")])])[invoke](tokens);}
let parse_spread_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("spread_assign")]])]), Chomp[Meta.create]([Keyword.for("dot_dot_dot")]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("name")])]);
let parse_assign_id = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("id_assign")]])]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("name")])]);
let parse_assign_array = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("array_deconstruction")]])]), Chomp[Meta.create]([Keyword.for("open_sq")]), Until[Meta.create]([Keyword.for("close_sq"), parse_assign_expr, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_sq")])])[invoke](tokens);}
let parse_obj_entry_rename = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("obj_entry_rename")]])]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("old_name")]), Chomp[Meta.create]([Keyword.for("colon")]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("new_name")])]);
let parse_regular_obj_assign_entry = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("obj_reg_entry")]])]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("name")])]);
let parse_obj_entry_destructure = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("obj_assign_expr")]])]), One[Meta.create]([valid_ids_in_all_contexts, Keyword.for("property")]), Chomp[Meta.create]([Keyword.for("colon")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")])])[invoke](tokens);}
let parse_obj_assign_entry = ParseMap[Meta.from_entries]([[[Keyword.for("id"), Keyword.for("colon"), Keyword.for("id")], parse_obj_entry_rename], [[Keyword.for("id"), Keyword.for("colon")], parse_obj_entry_destructure], [Keyword.for("id"), parse_regular_obj_assign_entry], [Keyword.for("dot_dot_dot"), parse_spread_assign]]);
let parse_assign_obj = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("object_deconstruction")]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_obj_assign_entry, Keyword.for("entries")]), Chomp[Meta.create]([Keyword.for("close_b")])]);
let parse_this_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("this_assign")]])]), Chomp[Meta.create]([Keyword.for("at")]), Either[Meta.create]([valid_ids_in_all_contexts, Keyword.for("name")])]);
let parse_this_spread_assign = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("this_spread_assign")]])]), Chomp[Meta.create]([Keyword.for("dot_dot_dot"), Keyword.for("at")]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")])]);
let parse_assign_expr = ParseMap[Meta.from_entries]([[Keyword.for("id"), parse_assign_id], [Keyword.for("open_sq"), parse_assign_array], [Keyword.for("open_b"), parse_assign_obj], [Keyword.for("at"), parse_this_assign], [[Keyword.for("dot_dot_dot"), Keyword.for("at")], parse_this_spread_assign], [Keyword.for("dot_dot_dot"), parse_spread_assign]]);
let parse_paren_expr = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("paren_expr")]])]), Chomp[Meta.create]([Keyword.for("open_p")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), Chomp[Meta.create]([Keyword.for("close_p")])])[invoke](tokens);}
let parse_yield = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("yield")]])]), Chomp[Meta.create]([Keyword.for("yield")]), Optional[Meta.create]([Keyword.for("times"), parse_gen_modifier, Keyword.for("star?")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);}
let parse_await = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("await")]])]), Chomp[Meta.create]([Keyword.for("await")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);}
let parse_num = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("num")]])]), One[Meta.create]([Keyword.for("num"), Keyword.for("value")])]);
let parse_array = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("array")]])]), Chomp[Meta.create]([Keyword.for("open_sq")]), Until[Meta.create]([Keyword.for("close_sq"), parse_expr, Keyword.for("elements")]), Chomp[Meta.create]([Keyword.for("close_sq")])])[invoke](tokens);}
let parse_spread = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("spread")]])]), Chomp[Meta.create]([Keyword.for("dot_dot_dot")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);}
let parse_not = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("not")]])]), Chomp[Meta.create]([Keyword.for("bang")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);}
let parse_num_raw = function (tokens) {
let __coil_temp;
return dot(parse_num[invoke](tokens), pipe)[invoke](([expr, tokens]) => [dot(dot(expr, at)[invoke](Keyword.for("value")), as_num)[invoke](), tokens]);}
let parse_adjacent_num_raw = Parser[Meta.create]([AbortIf[Meta.create]([not_adjacent__q]), Then[Meta.create]([parse_num_raw])]);
let parse_async_modifier = Parser[Meta.create]([Init[Meta.create]([true]), Chomp[Meta.create]([Keyword.for("async")])]);
let parse_gen_modifier = Parser[Meta.create]([Init[Meta.create]([true]), Chomp[Meta.create]([Keyword.for("times")])]);
let parse_fn_expr_body = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("return")]])]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), FMap[Meta.create]([(node) => [node]])])[invoke](tokens);}
let parse_args_def = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Chomp[Meta.create]([Keyword.for("open_p")]), Until[Meta.create]([Keyword.for("close_p"), parse_assign_expr]), Chomp[Meta.create]([Keyword.for("close_p")])])[invoke](tokens);}
let parse_fn = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("fn")]])]), Optional[Meta.create]([Keyword.for("async"), parse_async_modifier, Keyword.for("is_async?")]), Chomp[Meta.create]([Keyword.for("fn")]), Optional[Meta.create]([Keyword.for("times"), parse_gen_modifier, Keyword.for("generator?")]), Then[Meta.create]([parse_expr, Keyword.for("name_expr")]), Optional[Meta.create]([Keyword.for("open_p"), parse_args_def, Keyword.for("args")]), Case[Meta.create]([ParseMap[Meta.from_entries]([[Keyword.for("eq"), parse_fn_expr_body], [_, block[invoke]()]]), Keyword.for("body")])])[invoke](tokens);}
let parse_keyword_record_entry = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("keyword_record_entry")]])]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")]), Chomp[Meta.create]([Keyword.for("colon")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);}
let parse_regular_record_entry = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("regular_record_entry")]])]), Then[Meta.create]([parse_expr, Keyword.for("key_expr")]), Chomp[Meta.create]([Keyword.for("arrow")]), Then[Meta.create]([parse_expr, Keyword.for("value_expr")])])[invoke](tokens);}
let parse_id_shorthand_record_entry = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("id_shorthand_record_entry")]])]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")])])[invoke](tokens);}
let parse_record_entry = function (tokens) {
let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("dot_dot_dot"), parse_spread], [[Keyword.for("id"), Keyword.for("colon")], parse_keyword_record_entry], [[Keyword.for("id"), Keyword.for("arrow")], parse_regular_record_entry], [Keyword.for("id"), parse_id_shorthand_record_entry], [Keyword.for("fn"), parse_fn], [[Keyword.for("async"), Keyword.for("fn")], parse_fn], [_, parse_regular_record_entry]])[invoke](tokens);}
let parse_prefix_exclusive_range = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("prefix_exclusive_range")]])]), Chomp[Meta.create]([Keyword.for("dot_dot")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);}
let parse_keyword = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("keyword")]])]), Chomp[Meta.create]([Keyword.for("colon")]), One[Meta.create]([Keyword.for("id"), Keyword.for("value")])]);
let parse_anon_fn = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("anon_fn")]])]), Chomp[Meta.create]([Keyword.for("pipe_bar")]), Until[Meta.create]([Keyword.for("pipe_bar"), parse_assign_expr, Keyword.for("args")]), Chomp[Meta.create]([Keyword.for("pipe_bar")]), Then[Meta.create]([parse_expr, Keyword.for("return_expr")])]);
let SINGLE_EXPR_PARSE_MAP = ParseMap[Meta.from_entries]([[Keyword.for("string_lit"), parse_str], [Keyword.for("regex_lit"), parse_regex], [Keyword.for("keyword"), parse_keyword], [Keyword.for("open_p"), parse_paren_expr], [Keyword.for("yield"), parse_yield], [Keyword.for("await"), parse_await], [Keyword.for("num"), parse_num], [Keyword.for("open_sq"), parse_array], [Keyword.for("dot_dot_dot"), parse_spread], [Keyword.for("bang"), parse_not], [Keyword.for("open_b"), parse_obj], [Keyword.for("pipe_bar"), parse_anon_fn], [Keyword.for("dot_dot"), parse_prefix_exclusive_range], [dot(valid_ids_in_all_contexts, push)[invoke](Keyword.for("import")), parse_id], [[Keyword.for("async"), Keyword.for("fn")], parse_fn], [Keyword.for("fn"), parse_fn], [[Keyword.for("colon"), Keyword.for("id")], parse_keyword]]);
let parse_single_expr = function (tokens) {
let __coil_temp;
return SINGLE_EXPR_PARSE_MAP[invoke](tokens);}
let parse_expr = function (tokens) {
let __coil_temp;
return parse_fifth_expr[invoke](parse_fourth_expr[invoke](parse_third_expr[invoke](parse_snd_expr[invoke](parse_single_expr[invoke](tokens)))));}
let parse_1_2_expr = function (tokens) {
let __coil_temp;
return parse_snd_expr[invoke](parse_single_expr[invoke](tokens));}
let parse_1_2_3_expr = function (tokens) {
let __coil_temp;
return parse_third_expr[invoke](parse_snd_expr[invoke](parse_single_expr[invoke](tokens)));}
let parse_1_2_3_4_expr = function (tokens) {
let __coil_temp;
return parse_fourth_expr[invoke](parse_third_expr[invoke](parse_snd_expr[invoke](parse_single_expr[invoke](tokens))));}
let parse_else_branch = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("else")]])]), Chomp[Meta.create]([Keyword.for("else")]), UntilEither[Meta.create]([Set[Meta.create]([Keyword.for("else"), Keyword.for("end")]), parse_statement, Keyword.for("body")])])[invoke](tokens);}
let parse_else_if_branch = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("else_if")]])]), Chomp[Meta.create]([Keyword.for("else"), Keyword.for("if")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), UntilEither[Meta.create]([Set[Meta.create]([Keyword.for("else"), Keyword.for("end")]), parse_statement, Keyword.for("pass")]), Optional[Meta.create]([Keyword.for("else"), parse_if_branch, Keyword.for("fail")])])[invoke](tokens);}
let parse_if_branch = ParseMap[Meta.from_entries]([[[Keyword.for("else"), Keyword.for("if")], parse_else_if_branch], [Keyword.for("else"), parse_else_branch]]);
let parse_if = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("if")]])]), Chomp[Meta.create]([Keyword.for("if")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), UntilEither[Meta.create]([Set[Meta.create]([Keyword.for("else"), Keyword.for("end")]), parse_statement, Keyword.for("pass")]), Optional[Meta.create]([Keyword.for("else"), parse_if_branch, Keyword.for("fail")]), Chomp[Meta.create]([Keyword.for("end")])])[invoke](tokens);}
let parse_let = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("let")]])]), Chomp[Meta.create]([Keyword.for("let")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("rhs")])]);
let parse_if_let = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("if_let")]])]), Chomp[Meta.create]([Keyword.for("if"), Keyword.for("let")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("expr")]), UntilEither[Meta.create]([Set[Meta.create]([Keyword.for("else"), Keyword.for("end")]), parse_statement, Keyword.for("pass")]), Optional[Meta.create]([Keyword.for("else"), parse_else_branch, Keyword.for("fail")]), Chomp[Meta.create]([Keyword.for("end")])])[invoke](tokens);}
let parse_protocol_methods = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("protocol_method")]])]), Chomp[Meta.create]([Keyword.for("open_b")]), Until[Meta.create]([Keyword.for("close_b"), parse_id, Keyword.for("names")]), Chomp[Meta.create]([Keyword.for("close_b")])]);
let parse_protocol = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("protocol_def")]])]), Chomp[Meta.create]([Keyword.for("protocol")]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")]), Optional[Meta.create]([Keyword.for("open_b"), parse_protocol_methods, Keyword.for("methods")])]);
let parse_return = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("return")]])]), Chomp[Meta.create]([Keyword.for("return")]), Optional[Meta.create]([dot(SINGLE_EXPR_PARSE_MAP, keys)[invoke](), parse_expr, Keyword.for("expr")])]);
let parse_await_modifier = Parser[Meta.create]([Init[Meta.create]([true]), Chomp[Meta.create]([Keyword.for("await")])]);
let parse_for_loop = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("for_loop")]])]), Chomp[Meta.create]([Keyword.for("for")]), Optional[Meta.create]([Keyword.for("await"), parse_await_modifier, Keyword.for("is_await?")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("of")]), Then[Meta.create]([parse_expr, Keyword.for("iterable_expr")]), block[invoke](Keyword.for("body"))])[invoke](tokens);}
let parse_loop = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("loop")]])]), Chomp[Meta.create]([Keyword.for("loop")]), block[invoke](Keyword.for("body"))])[invoke](tokens);}
let parse_while_loop = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("while_loop")]])]), Chomp[Meta.create]([Keyword.for("while")]), Then[Meta.create]([parse_expr, Keyword.for("test_expr")]), block[invoke](Keyword.for("body"))])[invoke](tokens);}
let parse_while_let_loop = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("while_let_loop")]])]), Chomp[Meta.create]([Keyword.for("while"), Keyword.for("let")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_expr")]), Chomp[Meta.create]([Keyword.for("eq")]), Then[Meta.create]([parse_expr, Keyword.for("test_expr")]), block[invoke](Keyword.for("body"))])[invoke](tokens);}
let parse_continue = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("continue")]])]), Chomp[Meta.create]([Keyword.for("continue")])])[invoke](tokens);}
let parse_break = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("break")]])]), Chomp[Meta.create]([Keyword.for("break")])])[invoke](tokens);}
let parse_catch = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("catch")]])]), Chomp[Meta.create]([Keyword.for("catch")]), One[Meta.create]([Keyword.for("id"), Keyword.for("name")]), block[invoke](Keyword.for("body"))])[invoke](tokens);}
let parse_finally = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("finally")]])]), Chomp[Meta.create]([Keyword.for("finally")]), block[invoke](Keyword.for("body"))])[invoke](tokens);}
let parse_try = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("try")]])]), Chomp[Meta.create]([Keyword.for("try")]), block[invoke](Keyword.for("body")), Optional[Meta.create]([Keyword.for("catch"), parse_catch, Keyword.for("catch")]), Optional[Meta.create]([Keyword.for("finally"), parse_finally, Keyword.for("finally")])])[invoke](tokens);}
let parse_import = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("import")]])]), Chomp[Meta.create]([Keyword.for("import")]), Then[Meta.create]([parse_assign_expr, Keyword.for("assign_exprs")]), Chomp[Meta.create]([Keyword.for("from")]), Then[Meta.create]([parse_str, Keyword.for("path")])])[invoke](tokens);}
let parse_export = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("export")]])]), Chomp[Meta.create]([Keyword.for("export")]), Then[Meta.create]([parse_statement, Keyword.for("statement")])])[invoke](tokens);}
let parse_export_default = function (tokens) {
let __coil_temp;
return Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("export_default")]])]), Chomp[Meta.create]([Keyword.for("export"), Keyword.for("default")]), Then[Meta.create]([parse_expr, Keyword.for("expr")])])[invoke](tokens);}
let parse_direct_import = Parser[Meta.create]([Init[Meta.create]([ObjectLiteral[Meta.from_entries]([[Keyword.for("type"), Keyword.for("direct_import")]])]), Chomp[Meta.create]([Keyword.for("import")]), One[Meta.create]([Keyword.for("string_lit"), Keyword.for("path")])]);
let parse_statement = function (tokens) {
let __coil_temp;
return ParseMap[Meta.from_entries]([[Keyword.for("let"), parse_let], [Keyword.for("for"), parse_for_loop], [Keyword.for("try"), parse_try], [Keyword.for("protocol"), parse_protocol], [Keyword.for("return"), parse_return], [Keyword.for("continue"), parse_continue], [Keyword.for("break"), parse_break], [Keyword.for("loop"), parse_loop], [[Keyword.for("import"), Keyword.for("string_lit")], parse_direct_import], [Keyword.for("import"), parse_import], [[Keyword.for("export"), Keyword.for("default")], parse_export_default], [Keyword.for("export"), parse_export], [[Keyword.for("while"), Keyword.for("let")], parse_while_let_loop], [Keyword.for("while"), parse_while_loop], [[Keyword.for("if"), Keyword.for("let")], parse_if_let], [Keyword.for("if"), parse_if], [_, parse_expr]])[invoke](tokens);}
let block = function (name) {
let __coil_temp;
return Parser[Meta.create]([Until[Meta.create]([Keyword.for("end"), parse_statement, name]), Chomp[Meta.create]([Keyword.for("end")])]);}
let parse_tokens = function (tokens) {
let __coil_temp;
let ast = [];
var __coil_while_let_temp = parse_statement[invoke](tokens);
while (__coil_while_let_temp) {
let [statement_or_expr, rest] = __coil_while_let_temp;
let __coil_temp;
dot(ast, 'push')[invoke](statement_or_expr)
(tokens = rest)
__coil_while_let_temp = parse_statement[invoke](tokens);
};
return ast;}
let resolve_name = function (name) {
let __coil_temp;
if (name[Meta.as_bool]()) {
let __coil_temp;
return dot(dot(dot(dot(name, Keyword.for("replaceAll"))[invoke]("?", "__q"), Keyword.for("replaceAll"))[invoke]("!", "__b"), Keyword.for("replaceAll"))[invoke](">", "_lt_"), Keyword.for("replaceAll"))[invoke]("-", "_");
} else {
let __coil_temp;
return name;
};}
let eval_if_branch = function (branch) {
let __coil_temp;
if (dot(branch, nil__q)[invoke]()[Meta.as_bool]()) {
let __coil_temp;
return "";
} else if (dot(branch, Keyword.for("type"))[Meta["=="]](Keyword.for("else"))) {
let __coil_temp;
return str[invoke](" else {\n", eval_ast[invoke]((__coil_temp = {left: dot(branch, Keyword.for("body")), right: []}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : __coil_temp.right)), "\n}");
} else if (dot(branch, Keyword.for("type"))[Meta["=="]](Keyword.for("else_if"))) {
let __coil_temp;
return str[invoke](" else if (", eval_expr[invoke](dot(branch, at)[invoke](Keyword.for("expr"))), ") {\n", eval_ast[invoke]((__coil_temp = {left: dot(branch, at)[invoke](Keyword.for("pass")), right: []}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : __coil_temp.right)), "\n}", eval_if_branch[invoke](dot(branch, at)[invoke](Keyword.for("fail"))));
} else {
let __coil_temp;
raise__b[invoke](Error[Meta.create](["Expected else if"]))
};}
let eval_if = function ({'expr': expr, 'pass': pass, 'fail': fail}) {
let __coil_temp;
return str[invoke]("if (", eval_expr[invoke](expr), "[Meta.as_bool]()) {\n", eval_ast[invoke](pass), "\n", "}", eval_if_branch[invoke](fail));}
let eval_str = function ({'value': value}) {
let __coil_temp;
(value = dot(value, Keyword.for("slice"))[invoke]((1), (-1)))
if (dot(value, Keyword.for("includes"))[invoke]("\n")[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("`", value, "`");
} else {
let __coil_temp;
return str[invoke]("\"", value, "\"");
};}
let eval_fn_call = function ({'lhs': lhs, 'args': args}) {
let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[invoke](", dot(dot(args, map)[invoke](eval_expr), join)[invoke](", "), ")");}
let eval_id_assign_name = function ({'name': name}) {
let __coil_temp;
return resolve_name[invoke](name);}
let eval_spread_assign = function ({'name': name}) {
let __coil_temp;
return str[invoke]("...", resolve_name[invoke](name));}
let eval_array_deconstruction_entry = function (node) {
let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("array_deconstruction"), eval_array_deconstruction_names]]))[invoke](node);}
let eval_array_deconstruction_names = function ({'entries': entries}) {
let __coil_temp;
return str[invoke]("[", dot(dot(entries, map)[invoke](eval_array_deconstruction_entry), join)[invoke](", "), "]");}
let eval_obj_reg_entry = function ({'name': name}) {
let __coil_temp;
return str[invoke]("'", name, "': ", resolve_name[invoke](name));}
let eval_obj_entry_rename = function ({'old_name': old_name, 'new_name': new_name}) {
let __coil_temp;
return str[invoke]("'", old_name, "': ", resolve_name[invoke](new_name));}
let eval_obj_deconstruction_entry = function (node) {
let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("obj_reg_entry"), eval_obj_reg_entry], [Keyword.for("obj_entry_rename"), eval_obj_entry_rename], [Keyword.for("spread_assign"), eval_spread_assign]]))[invoke](node);}
let eval_object_deconstruction_names = function ({'entries': entries}) {
let __coil_temp;
return str[invoke]("{", dot(dot(entries, map)[invoke](eval_obj_deconstruction_entry), join)[invoke](", "), "}");}
let eval_this_assign = function ({'name': name}) {
let __coil_temp;
return resolve_name[invoke](name);}
let eval_this_spread_assign = function ({'name': name}) {
let __coil_temp;
return str[invoke]("...", resolve_name[invoke](name));}
let eval_assign_all_as = function ({'name': name}) {
let __coil_temp;
return str[invoke]("* as ", name);}
let eval_assign_expr = function (node) {
let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("array_deconstruction"), eval_array_deconstruction_names], [Keyword.for("object_deconstruction"), eval_object_deconstruction_names], [Keyword.for("this_assign"), eval_this_assign], [Keyword.for("this_spread_assign"), eval_spread_assign]]))[invoke](node);}
let eval_while_let_loop = function ({'test_expr': test_expr, 'assign_expr': assign_expr, 'body': body}) {
let __coil_temp;
return str[invoke]("var __coil_while_let_temp = ", eval_expr[invoke](test_expr), ";\n", "while (__coil_while_let_temp) {\n", "let ", eval_assign_expr[invoke](assign_expr), " = __coil_while_let_temp;\n", eval_ast[invoke](body), "\n", "__coil_while_let_temp = ", eval_expr[invoke](test_expr), ";\n", "}");}
let eval_if_let = function ({'expr': expr, 'assign_expr': assign_expr, 'pass': pass, 'fail': fail}) {
let __coil_temp;
return str[invoke]("var __coil_if_let_temp = ", eval_expr[invoke](expr), ";\n", "if (truthy(__coil_if_let_temp)) {\n", "let ", eval_assign_expr[invoke](assign_expr), " = __coil_if_let_temp;\n", eval_ast[invoke](pass), "\n", "}", eval_if_branch[invoke](fail));}
let eval_spread = function ({'expr': expr}) {
let __coil_temp;
return str[invoke]("...", eval_expr[invoke](expr));}
let eval_let = function ({'assign_expr': assign_expr, 'rhs': rhs}) {
let __coil_temp;
return str[invoke]("let ", eval_assign_expr[invoke](assign_expr), " = ", eval_expr[invoke](rhs));}
let eval_array = function ({'elements': elements}) {
let __coil_temp;
return str[invoke]("[", dot(dot(elements, map)[invoke](eval_expr), join)[invoke](", "), "]");}
let eval_this_assignments = function (args) {
let __coil_temp;
return dot(dot(dot(args, filter)[invoke](Keyword.for("type"), Set[Meta.create]([Keyword.for("this_assign"), Keyword.for("this_spread_assign")])), map)[invoke](({'name': name}) => str[invoke]("this['", name, "'] = ", resolve_name[invoke](name), ";\n")), into)[invoke]("");}
let eval_name_expr = function (node) {
let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("dot"), ({'lhs': lhs, 'rhs': rhs}) => str[invoke](eval_name_expr[invoke](lhs), "[", eval_name_expr[invoke](rhs), "]")], [Keyword.for("keyword_lookup"), ({'lhs': lhs, 'property': property}) => str[invoke](eval_name_expr[invoke](lhs), "['", property, "']")]]), _, () => eval_expr)[invoke](node);}
let eval_fn = function ({'is_async?': is_async__q, 'generator?': generator__q, 'name_expr': name_expr, 'args': args, 'body': body}) {
let __coil_temp;
return str[invoke]((__coil_temp = {left: ((__coil_temp = {left: dot(name_expr, type)[Meta["=="]](Keyword.for("id_lookup")), right: "let "}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : __coil_temp.right[Meta.as_bool]() === true ? __coil_temp.right : __coil_temp.left)), right: ""}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : __coil_temp.right), eval_name_expr[invoke](name_expr), " = ", ((__coil_temp = {left: is_async__q, right: "async "}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : __coil_temp.right[Meta.as_bool]() === true ? __coil_temp.right : __coil_temp.left)), "function ", ((__coil_temp = {left: generator__q, right: "*"}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : __coil_temp.right[Meta.as_bool]() === true ? __coil_temp.right : __coil_temp.left)), "(", dot(dot(args, map)[invoke](eval_assign_expr), join)[invoke](", "), ") {\n", eval_this_assignments[invoke](args), eval_ast[invoke](body), "}");}
let eval_obj_fn = function ({'name': name, 'generator?': generator__q, 'is_async?': is_async__q, 'args': args, 'body': body}) {
let __coil_temp;
return str[invoke](((__coil_temp = {left: is_async__q, right: "async "}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : __coil_temp.right[Meta.as_bool]() === true ? __coil_temp.right : __coil_temp.left)), ((__coil_temp = {left: generator__q, right: "*"}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : __coil_temp.right[Meta.as_bool]() === true ? __coil_temp.right : __coil_temp.left)), "['", name, "'](", dot(dot(args, map)[invoke](eval_assign_expr), join)[invoke](", "), ") {\n", eval_ast[invoke](body), "\n}");}
let eval_id_lookup = function ({'name': name}) {
let __coil_temp;
return resolve_name[invoke](name);}
let eval_num = function ({'value': value}) {
let __coil_temp;
return str[invoke]("(", value, ")");}
let eval_double_equals = function ({'lhs': lhs, 'rhs': rhs}) {
let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Equal['==']](", eval_expr[invoke](rhs), ")");}
let eval_not_equals = function ({'lhs': lhs, 'rhs': rhs}) {
let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Equal['!=']](", eval_expr[invoke](rhs), ")");}
let eval_not = function ({'expr': expr}) {
let __coil_temp;
return str[invoke](eval_expr[invoke](expr), "[Bool.negate]]()");}
let eval_meta_from_entries = function ({'lhs': lhs, 'entries': entries}) {
let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Meta.from_entries]([", dot(dot(entries, map)[invoke](eval_record_entry), join)[invoke](", "), "])");}
let eval_meta_create = function ({'lhs': lhs, 'entries': entries}) {
let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Meta.create]([", dot(dot(entries, map)[invoke](eval_expr), join)[invoke](", "), "])");}
let eval_await = function ({'expr': expr}) {
let __coil_temp;
return str[invoke]("await ", eval_expr[invoke](expr));}
let eval_yield = function ({'star?': star__q, 'expr': expr}) {
let __coil_temp;
return str[invoke]("yield", ((__coil_temp = {left: star__q, right: "*"}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : __coil_temp.right[Meta.as_bool]() === true ? __coil_temp.right : __coil_temp.left)), " ", eval_expr[invoke](expr));}
let eval_paren_expr = function ({'expr': expr}) {
let __coil_temp;
return str[invoke]("(", eval_expr[invoke](expr), ")");}
let eval_keyword = function ({'value': value}) {
let __coil_temp;
return str[invoke]("Keyword.for(\"", value, "\")");}
let eval_regular_record_entry = function ({'key_expr': key_expr, 'value_expr': value_expr}) {
let __coil_temp;
return str[invoke]("[", eval_expr[invoke](key_expr), ", ", eval_expr[invoke](value_expr), "]");}
let eval_keyword_record_entry = function ({'name': name, 'expr': expr}) {
let __coil_temp;
return str[invoke]("[", eval_keyword[invoke](ObjectLiteral[Meta.from_entries]([[Keyword.for("value"), name]])), ", ", eval_expr[invoke](expr), "]");}
let eval_id_shorthand_record_entry = function ({'name': name}) {
let __coil_temp;
return str[invoke]("[", eval_keyword[invoke](ObjectLiteral[Meta.from_entries]([[Keyword.for("value"), name]])), ", ", name, "]");}
let eval_record_entry = function (node) {
let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("regular_record_entry"), eval_regular_record_entry], [Keyword.for("keyword_record_entry"), eval_keyword_record_entry], [Keyword.for("spread"), eval_spread], [Keyword.for("id_shorthand_record_entry"), eval_id_shorthand_record_entry]]))[invoke](node);}
let eval_inclusive_range = function ({'lhs': lhs, 'rhs': rhs}) {
let __coil_temp;
if (rhs[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("new IRange(", eval_expr[invoke](lhs), ", ", eval_expr[invoke](rhs), ")");
} else {
let __coil_temp;
return str[invoke]("new IRangeNoMax(", eval_expr[invoke](lhs), ")");
};}
let eval_exclusive_range = function ({'lhs': lhs, 'rhs': rhs}) {
let __coil_temp;
if (rhs[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("new ERange(", eval_expr[invoke](lhs), ", ", eval_expr[invoke](rhs), ")");
} else {
let __coil_temp;
return str[invoke]("new ERangeNoMax(", eval_expr[invoke](lhs), ")");
};}
let eval_regex_lit = function ({'value': value}) {
let __coil_temp;
return value;}
let eval_prefix_exclusive_range = function ({'expr': expr}) {
let __coil_temp;
return str[invoke]("new ERangeNoMin(", eval_expr[invoke](expr), ")");}
let eval_dot = function ({'lhs': lhs, 'rhs': rhs}) {
let __coil_temp;
return str[invoke]("dot(", eval_expr[invoke](lhs), ", ", eval_expr[invoke](rhs), ")");}
let eval_keyword_lookup = function ({'lhs': lhs, 'property': property}) {
let __coil_temp;
return str[invoke]("dot(", eval_expr[invoke](lhs), ", '", property, "')");}
let eval_object_literal = function ({'entries': entries}) {
let __coil_temp;
return str[invoke]("ObjectLiteral[Meta.from_entries]([", dot(dot(entries, map)[invoke](eval_record_entry), join)[invoke](", "), "])");}
let eval_anon_fn = function ({'args': args, 'return_expr': return_expr}) {
let __coil_temp;
return str[invoke]("(", dot(dot(args, map)[invoke](eval_assign_expr), join)[invoke](", "), ") => ", eval_expr[invoke](return_expr));}
let eval_algebra_op = function ({'lhs': lhs, 'op': op, 'rhs': rhs}) {
let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Algebra[\"", op, "\"]](", eval_expr[invoke](rhs), ")");}
let eval_equality_op = function ({'lhs': lhs, 'op': op, 'rhs': rhs}) {
let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Meta[\"", op, "\"]](", eval_expr[invoke](rhs), ")");}
let eval_and = function ({'lhs': lhs, 'rhs': rhs}) {
let __coil_temp;
return str[invoke]("(", eval_expr[invoke](lhs), ")[Meta.as_bool]() && (", eval_expr[invoke](rhs), ")[Meta.as_bool]()");}
let eval_or = function ({'lhs': lhs, 'rhs': rhs}) {
let __coil_temp;
return str[invoke]("(", eval_expr[invoke](lhs), ")[Meta.as_bool]() || (", eval_expr[invoke](rhs), ")[Meta.as_bool]()");}
let eval_expr = function (node) {
let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("algebra_op"), eval_algebra_op], [Keyword.for("equality_op"), eval_equality_op], [Keyword.for("and"), eval_and], [Keyword.for("or"), eval_or], [Keyword.for("str"), eval_str], [Keyword.for("dot"), eval_dot], [Keyword.for("keyword_lookup"), eval_keyword_lookup], [Keyword.for("object_literal"), eval_object_literal], [Keyword.for("regex_lit"), eval_regex_lit], [Keyword.for("keyword"), eval_keyword], [Keyword.for("prefix_exclusive_range"), eval_prefix_exclusive_range], [Keyword.for("id_lookup"), eval_id_lookup], [Keyword.for("fn_call"), eval_fn_call], [Keyword.for("num"), eval_num], [Keyword.for("array"), eval_array], [Keyword.for("double_equals"), eval_double_equals], [Keyword.for("not_equals"), eval_not_equals], [Keyword.for("not"), eval_not], [Keyword.for("fn"), eval_fn], [Keyword.for("meta_from_entries"), eval_meta_from_entries], [Keyword.for("meta_create"), eval_meta_create], [Keyword.for("spread"), eval_spread], [Keyword.for("await"), eval_await], [Keyword.for("yield"), eval_yield], [Keyword.for("paren_expr"), eval_paren_expr], [Keyword.for("inclusive_range"), eval_inclusive_range], [Keyword.for("exclusive_range"), eval_exclusive_range], [Keyword.for("anon_fn"), eval_anon_fn]]))[invoke](node);}
let eval_return = function ({'expr': expr}) {
let __coil_temp;
if (expr[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("return ", eval_expr[invoke](expr));
} else {
let __coil_temp;
return "return";
};}
let eval_protocol = function ({'name': name, 'methods': methods}) {
let __coil_temp;
if (methods[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("const ", name, " = Object.freeze({", dot(dot(dot(methods, names), map)[invoke]((method) => str[invoke]("\"", dot(method, 'name'), "\": Symbol(\"", name, ":", dot(method, 'name'), "\")")), join)[invoke](",\n"), "})");
} else {
let __coil_temp;
return str[invoke]("const ", resolve_name[invoke](name), " = Symbol(\"", name, "\")");
};}
let eval_for_loop = function ({'is_await?': is_await__q, 'assign_expr': assign_expr, 'iterable_expr': iterable_expr, 'body': body}) {
let __coil_temp;
return str[invoke]("for ", ((__coil_temp = {left: is_await__q, right: "await "}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : __coil_temp.right[Meta.as_bool]() === true ? __coil_temp.right : __coil_temp.left)), " (let ", eval_assign_expr[invoke](assign_expr), " of ", eval_expr[invoke](iterable_expr), ") {\n", eval_ast[invoke](body), "\n", "}");}
let eval_id_assign = function ({'name': name}) {
let __coil_temp;
return str[invoke](resolve_name[invoke](name), " = ", eval_expr[invoke](expr));}
let eval_while_loop = function ({'test_expr': test_expr, 'body': body}) {
let __coil_temp;
return str[invoke]("while (", eval_expr[invoke](test_expr), "[Meta.as_bool]()) {\n", eval_ast[invoke](body), "\n}");}
let eval_loop = function ({'body': body}) {
let __coil_temp;
return str[invoke]("while (true) {\n", eval_ast[invoke](body), "\n}");}
let eval_continue = function () {
let __coil_temp;
return "continue";}
let eval_break = function () {
let __coil_temp;
return "break";}
let eval_try = function (node) {
let __coil_temp;
let body_js = dot(dot(node, at)[invoke](Keyword.for("body")), pipe)[invoke](eval_ast);
let catch_js = "";
let finally_js = "";
if (dot(node, has__q)[invoke](Keyword.for("catch"))[Meta.as_bool]()) {
let __coil_temp;
let {'name': name, 'body': body} = dot(node, at)[invoke](Keyword.for("catch"));
(catch_js = str[invoke](" catch (", name, ") {\n", eval_ast[invoke](body), "\n}"))
};
if (dot(node, has__q)[invoke](Keyword.for("finally"))[Meta.as_bool]()) {
let __coil_temp;
let {'body': body} = dot(node, at)[invoke](Keyword.for("finally"));
(finally_js = str[invoke](" finally {\n", eval_ast[invoke](body), "\n}"))
};
return str[invoke]("try {\n", body_js, "\n", "}", catch_js, finally_js);}
let get_deconstructed_obj_entry_name = function (node) {
let __coil_temp;
return dot(dot(Map[Meta.from_entries]([[Keyword.for("obj_reg_entry"), Keyword.for("name")], [Keyword.for("obj_entry_rename"), Keyword.for("old_name")]]), at)[invoke](dot(node, at)[invoke](Keyword.for("type"))), pipe)[invoke](node);}
let get_deconstructed_array_entry_name = function (node) {
let __coil_temp;
return dot(dot(Map[Meta.from_entries]([[Keyword.for("id_assign"), Keyword.for("name")]]), at)[invoke](dot(node, at)[invoke](Keyword.for("type"))), pipe)[invoke](node);}
let eval_import_deconstruction_entry = function (node) {
let __coil_temp;
return dot(node, pipe)[invoke](Keyword.for("type"), Map[Meta.from_entries]([[Keyword.for("obj_reg_entry"), ({'name': name}) => resolve_name[invoke](name)], [Keyword.for("obj_entry_rename"), ({'old_name': old_name, 'new_name': new_name}) => str[invoke](resolve_name[invoke](old_name), " as ", resolve_name[invoke](new_name))]]))[invoke](node);}
let eval_import_deconstruction_expr = function ({'entries': entries}) {
let __coil_temp;
return str[invoke]("{", dot(dot(entries, map)[invoke](eval_import_deconstruction_entry), join)[invoke](", "), "}");}
let eval_import_assign_exprs = function (node) {
let __coil_temp;
return dot(node, pipe)[invoke](Keyword.for("type"), Map[Meta.from_entries]([[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("object_deconstruction"), eval_import_deconstruction_expr], [Keyword.for("assign_all_as"), eval_assign_all_as]]))[invoke](node);}
let eval_import = function ({'assign_exprs': assign_exprs, 'path': path}) {
let __coil_temp;
return str[invoke]("import ", dot(dot(assign_exprs, map)[invoke](eval_import_assign_exprs), join)[invoke](", "), " from \"", dot(dot(path, value), slice)[invoke]((1), (-1)), "\"");}
let eval_export = function ({'statement': statement}) {
let __coil_temp;
return str[invoke]("export ", eval_statement[invoke](statement));}
let eval_export_default = function ({'expr': expr}) {
let __coil_temp;
return str[invoke]("export default ", eval_expr[invoke](expr));}
let eval_direct_import = function ({'path': path}) {
let __coil_temp;
return str[invoke]("import ", path);}
let eval_statement = function (node) {
let __coil_temp;
return dot(dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("if"), eval_if], [Keyword.for("direct_import"), eval_direct_import], [Keyword.for("import"), eval_import], [Keyword.for("export"), eval_export], [Keyword.for("export_default"), eval_export_default], [Keyword.for("let"), eval_let], [Keyword.for("if_let"), eval_if_let], [Keyword.for("return"), eval_return], [Keyword.for("protocol_def"), eval_protocol], [Keyword.for("for_loop"), eval_for_loop], [Keyword.for("id_assign"), eval_id_assign], [Keyword.for("while_loop"), eval_while_loop], [Keyword.for("loop"), eval_loop], [Keyword.for("while_let_loop"), eval_while_let_loop], [Keyword.for("continue"), eval_continue], [Keyword.for("break"), eval_break], [Keyword.for("try"), eval_try]])), pipe)[invoke]((f) = function () {
let __coil_temp;
if (f[Meta.as_bool]()) {
let __coil_temp;
return compose[invoke](f, _[Algebra["+"]](";"));
} else {
let __coil_temp;
return eval_expr;
};})[invoke](node);}
export let eval_ast = function (ast) {
let __coil_temp;
return dot(dot(ast, map)[invoke](eval_statement), join)[invoke]("\n");};
export let lex = function (string) {
let __coil_temp;
return lexer[invoke](string);};
let coll_view = function (tokens) {
let __coil_temp;
return CollectionView[Meta.create]([tokens, (0)]);}
export let lex_and_parse = function (string) {
let __coil_temp;
return dot(string, pipe)[invoke](lexer, coll_view, parse_tokens);};
export let compile = function (string) {
let __coil_temp;
return dot(string, pipe)[invoke](lexer, coll_view, parse_tokens, eval_ast);};
let [src_file_name, out_name] = dot(Deno, 'args');
let prelude = dot(Deno, 'readTextFileSync')[invoke]("./src/std/js_prelude_v2.js");
let src = dot(Deno, 'readTextFileSync')[invoke](src_file_name);
dot(Deno, 'writeTextFile')[invoke](out_name, prelude[Algebra["+"]](compile[invoke](src))[Algebra["+"]]("\n"))
