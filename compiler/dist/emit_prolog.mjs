"use strict";
import { ObjectLiteral, Nil, nil, Keyword, dot, raise__b, panic__b } from '../src/std/globals.mjs'
import Meta, {
  nil__q, is_a__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe
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
import tokenize from "./tokenizer.mjs";
import parse from "./parser.mjs";
import emit from "./emit.mjs";
import {str, CollectionView} from "./shared.mjs";
let nid_count = (0);
let nid = function () {
let __coil_temp;
nid_count = nid_count[Algebra["+"]]((1));
return str[invoke]("nid_", nid_count);};
let line_and_col = function (pos, Ctx) {
pos ??= nil;
Ctx ??= nil;let __coil_temp;
return str[invoke]("line_and_col(", Ctx, ", ", dot(pos, 'line'), ", ", dot(pos, 'col'), ").");};
let emit_assign_expr = function (node, Parent) {
node ??= nil;
Parent ??= nil;let __coil_temp;
return dot(node, pipe)[invoke](Keyword.for("type"), Map[Meta.from_entries]([[Keyword.for("id_assign"), function ({'name': name, 'pos': pos}) {
name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "id_assign(", name, ", ", Self, ", ", Parent, ").\n");}], [Keyword.for("array_deconstruction"), function ({'entries': entries}) {
entries ??= nil;let __coil_temp;
return dot(dot(dot(entries, zip)[invoke](new ExclusiveRangeNoMaximum((0))), map)[invoke](([node, idx]) => {
node ??= nil;
idx ??= nil;
let __coil_temp;
let Var = nid[invoke]();
return str[invoke](emit_assign_expr[invoke](node, Var), "\n", "array_deconstruction(", Var, ", ", idx, ", ", Parent, ").");}), join)[invoke]("\n");}]]))[invoke](node);};
let emit_let = function ({'assign_expr': assign_expr, 'rhs': rhs, 'pos': pos}, Parent) {
assign_expr ??= nil;
rhs ??= nil;
pos ??= nil;
Parent ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("let(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_assign_expr[invoke](assign_expr, Self), "\n", emit_node[invoke](rhs, Self));};
let emit_array = function ({'elements': elements, 'pos': pos}, Parent) {
elements ??= nil;
pos ??= nil;
Parent ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("line_and_col(", Self, ", ", dot(pos, 'line'), ", ", dot(pos, 'col'), ").\n", "array_node(", Self, ", ", Parent, ").\n", dot(dot(dot(elements, zip)[invoke](new ExclusiveRangeNoMaximum((0))), map)[invoke](([expr, idx]) => {
expr ??= nil;
idx ??= nil;
let __coil_temp;
let V2 = nid[invoke]();
return str[invoke](emit_node[invoke](expr, V2), "\n", "array_element(", V2, ", ", idx, ", ", Self, ").");}), join)[invoke]("\n"));};
let emit_name_expr = function (node, Parent) {
node ??= nil;
Parent ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("name_expr(", Self, ", ", Parent, ").\n", emit_node[invoke](node, Self));};
let emit_args = function (args, Parent) {
args ??= nil;
Parent ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("fn_args(", Self, ", ", Parent, ").\n", dot(dot(args, map)[invoke]((node) => {
node ??= nil;return emit_assign_expr[invoke](node, Self);}), join)[invoke]("\n"));};
let emit_record_entry = function (node, Parent) {
node ??= nil;
Parent ??= nil;let __coil_temp;
return dot(node, pipe)[invoke](Keyword.for("type"), Map[Meta.from_entries]([[Keyword.for("regular_record_entry"), function ({'key_expr': key_expr, 'value_expr': value_expr, 'pos': pos}) {
key_expr ??= nil;
value_expr ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Key, Value] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke](line_and_col[invoke](pos, Self), "\n", "regular_record_entry(", Self, ", ", Parent, ").\n", "key_expr(", Key, ", ", Self, ").\n", emit_node[invoke](key_expr, Key), "\n", "value_expr(", Value, ", ", Self, ").\n", emit_node[invoke](value_expr, Value));}], [Keyword.for("keyword_record_entry"), function ({'name': name, 'expr': expr, 'pos': pos}) {
name ??= nil;
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "keyword_record_entry(", name, ", ", Self, ", ", Parent, ").\n", emit_node[invoke](expr, Self));}]]))[invoke](node, Parent);};
let emit_node = function (node, Parent) {
node ??= nil;
Parent ??= nil;let __coil_temp;
return dot(dot(node, pipe)[invoke](Keyword.for("type"), Map[Meta.from_entries]([[Keyword.for("let"), emit_let], [Keyword.for("array"), emit_array], [Keyword.for("id_lookup"), function ({'name': name, 'pos': pos}) {
name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "id_lookup(", name, ", ", Self, ", ", Parent, ").\n");}], [Keyword.for("num"), function ({'value': value, 'pos': pos}) {
value ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "num(", value, ", ", Self, ", ", Parent, ").");}], [Keyword.for("keyword"), function ({'value': value, 'pos': pos}) {
value ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "keyword(", value, ", ", Self, ", ", Parent, ").");}], [Keyword.for("str"), function ({'value': value, 'pos': pos}) {
value ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "str(", value, ", ", Self, ", ", Parent, ").");}], [Keyword.for("object_literal"), function ({'entries': entries}) {
entries ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("object_literal(", Self, ", ", Parent, ").\n", dot(dot(entries, map)[invoke]((node) => {
node ??= nil;return emit_record_entry[invoke](node, Self);}), join)[invoke]("\n"));}], [Keyword.for("return"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("return(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("fn"), function ({'args': args, 'name_expr': name_expr, 'body': body, 'pos': pos}) {
args ??= nil;
name_expr ??= nil;
body ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](emit_name_expr[invoke](name_expr, Self), "\n", line_and_col[invoke](pos, Self), "\n", "fn(", Self, ", ", Parent, ").\n", emit_args[invoke](args, Self), "\n", emit_ast[invoke](body, Self), "\n");}], [Keyword.for("snd_assign"), function ({'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
lhs ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Lhs, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("snd_assign(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ",", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", "rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs), "\n");}], [Keyword.for("direct_import"), function ({'path': path, 'pos': pos}) {
path ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("direct_import(", path, ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n");}], [Keyword.for("export_default"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("export_default(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("export"), function ({'statement': statement, 'pos': pos}) {
statement ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("export(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](statement, Self));}], [Keyword.for("import"), function ({'assign_expr': assign_expr, 'path': path, 'pos': pos}) {
assign_expr ??= nil;
path ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Assign] = [nid[invoke](), nid[invoke]()];
return str[invoke]("import(", dot(path, 'value'), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "assign_expr(", Assign, ", ", Self, ").\n", emit_assign_expr[invoke](assign_expr, Assign));}]])), pipe)[invoke]((f) => {
f ??= nil;
let __coil_temp;
if (f[Meta.as_bool]()) {
let __coil_temp;
return f[invoke](node, Parent);
} else {
let __coil_temp;
dot(console, 'error')[invoke](node);
};});};
let emit_ast = function (ast, Parent) {
ast ??= nil;
Parent ??= nil;let __coil_temp;
return dot(dot(dot(dot(dot(ast, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Parent);}), flat_map)[invoke]((statement) => {
statement ??= nil;return dot(statement, Keyword.for("split"))[invoke]("\n");}), into)[invoke]([]), Keyword.for("sort"))[invoke](), join)[invoke]("\n");};
let ast = dot(dot(tokenize[invoke](dot(Deno, 'readTextFileSync')[invoke]("./example.coil")), pipe)[invoke]((tokens) => {
tokens ??= nil;return CollectionView[Meta.create]([tokens, (0)]);}), pipe)[invoke](parse);
let prelude = dot(Deno, 'readTextFileSync')[invoke]("./prolog_prelude.pl");
let module_nid = nid[invoke]();
dot(dot(str[invoke](prelude, "module([main], ", module_nid, ").\n", emit_ast[invoke](ast, module_nid)), 'trim')[invoke](), log)[invoke]();
