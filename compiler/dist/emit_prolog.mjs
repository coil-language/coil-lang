"use strict";
import { ObjectLiteral, Nil, nil, Keyword, dot, raise__b, panic__b, type_of, str, from_js } from '../src/std/globals.mjs'
import Meta, { nil__q, create, from_entries, as_num, exists__q, as_bool, log, invoke, pipe, as_kw } from '../src/std/meta.mjs';
import Iter, {
  take, until, skip, find, find_map, zip, reduce, map, flat_map, each, count,
  filter, filter_map, reject, all__q, any__q, split, compact, join, into, compose
} from '../src/std/iter.mjs';
import Algebra from '../src/std/algebra.mjs';
import Bool, { negate } from '../src/std/bool.mjs';
import Collection, { at, len, empty__q, has__q, delete__b } from '../src/std/collection.mjs';
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
let quote = function (s) {
s ??= nil;let __coil_temp;
return str[invoke]("\"", s, "\"");};
let line_and_col = function (pos, Ctx) {
pos ??= nil;
Ctx ??= nil;let __coil_temp;
return str[invoke]("line_and_col(", Ctx, ", ", dot(pos, 'line'), ", ", dot(pos, 'col'), ").");};
let emit_args = function (args, Parent) {
args ??= nil;
Parent ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("fn_args(", Self, ", ", Parent, ").\n", dot(dot(args, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Self);}), join)[invoke]("\n"));};
let emit_node = function (node, Parent) {
node ??= nil;
Parent ??= nil;let __coil_temp;
return dot(dot(node, pipe)[invoke](Keyword.for("type"), Map[Meta.from_entries]([[Keyword.for("let"), function ({'assign_expr': assign_expr, 'rhs': rhs, 'pos': pos}) {
assign_expr ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Assign, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("let(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "assign_expr(", Assign, ", ", Self, ").\n", emit_node[invoke](assign_expr, Self), "\n", "rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs));}], [Keyword.for("array"), function ({'elements': elements, 'pos': pos}) {
elements ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("line_and_col(", Self, ", ", dot(pos, 'line'), ", ", dot(pos, 'col'), ").\n", "array_node(", Self, ", ", Parent, ").\n", dot(dot(dot(elements, zip)[invoke](new ExclusiveRangeNoMaximum((0))), map)[invoke](([expr, idx]) => {
expr ??= nil;
idx ??= nil;let __coil_temp;
let V2 = nid[invoke]();
return str[invoke](emit_node[invoke](expr, V2), "\n", "array_element(", V2, ", ", idx, ", ", Self, ").");}), join)[invoke]("\n"));}], [Keyword.for("regular_record_entry"), function ({'key_expr': key_expr, 'value_expr': value_expr, 'pos': pos}) {
key_expr ??= nil;
value_expr ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Key, Value] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke](line_and_col[invoke](pos, Self), "\n", "regular_record_entry(", Self, ", ", Parent, ").\n", "key_expr(", Key, ", ", Self, ").\n", emit_node[invoke](key_expr, Key), "\n", "value_expr(", Value, ", ", Self, ").\n", emit_node[invoke](value_expr, Value));}], [Keyword.for("keyword_record_entry"), function ({'name': name, 'expr': expr, 'pos': pos}) {
name ??= nil;
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "keyword_record_entry(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n", emit_node[invoke](expr, Self));}], [Keyword.for("id_assign"), function ({'name': name, 'pos': pos}) {
name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "id_assign(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n");}], [Keyword.for("array_deconstruction"), function ({'entries': entries}) {
entries ??= nil;let __coil_temp;
return dot(dot(dot(entries, zip)[invoke](new ExclusiveRangeNoMaximum((0))), map)[invoke](([node, idx]) => {
node ??= nil;
idx ??= nil;let __coil_temp;
let Var = nid[invoke]();
return str[invoke](emit_node[invoke](node, Var), "\n", line_and_col[invoke](dot(node, 'pos'), Var), "\n", "array_deconstruction(", Var, ", ", idx, ", ", Parent, ").");}), join)[invoke]("\n");}], [Keyword.for("id_lookup"), function ({'name': name, 'pos': pos}) {
name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "id_lookup(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n");}], [Keyword.for("num"), function ({'value': value, 'pos': pos}) {
value ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "num(", value, ", ", Self, ", ", Parent, ").");}], [Keyword.for("keyword"), function ({'value': value, 'pos': pos}) {
value ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "keyword(", quote[invoke](value), ", ", Self, ", ", Parent, ").");}], [Keyword.for("str"), function ({'value': value, 'pos': pos}) {
value ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke](line_and_col[invoke](pos, Self), "\n", "str(", dot(value, 'replaceAll')[invoke]("\n", "\\n"), ", ", Self, ", ", Parent, ").");}], [Keyword.for("object_literal"), function ({'entries': entries, 'pos': pos}) {
entries ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("object_literal(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", dot(dot(entries, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Self);}), join)[invoke]("\n"));}], [Keyword.for("return"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("return(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("fn"), function ({'args': args, 'name_expr': name_expr, 'body': body, 'pos': pos, 'is_async?': is_async__q, 'generator?': generator__q}) {
args ??= nil;
name_expr ??= nil;
body ??= nil;
pos ??= nil;
is_async__q ??= nil;
generator__q ??= nil;let __coil_temp;
let [Self, Name] = [nid[invoke](), nid[invoke]()];
return str[invoke]("fn(", Self, ", ", Parent, ").\n", "name_expr(", Name, ", ", Self, ").\n", emit_node[invoke](name_expr, Name), "\n", line_and_col[invoke](pos, Self), "\n", "is_async(", dot(is_async__q, as_bool)[invoke](), ", ", Self, ").\n", "generator(", dot(generator__q, as_bool)[invoke](), ", ", Self, ").\n", emit_args[invoke](args, Self), "\n", emit_ast[invoke](body, Self), "\n");}], [Keyword.for("snd_assign"), function ({'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
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
return str[invoke]("import(", dot(path, 'value'), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "assign_expr(", Assign, ", ", Self, ").\n", emit_node[invoke](assign_expr, Assign));}], [Keyword.for("break"), function ({'pos': pos}) {
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("break(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("continue"), function ({'pos': pos}) {
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("continue(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("try"), function (node) {
node ??= nil;let __coil_temp;
let [Self, Body] = [nid[invoke](), nid[invoke]()];
return str[invoke]("try(", Self, ", ", Parent, ").\n", line_and_col[invoke](dot(node, 'pos'), Self), "\n", "body(", Body, ", ", Self, ").\n", emit_ast[invoke](dot(node, 'body'), Body), "\n", (__coil_temp = {left: dot(node, 'catch')}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = emit_node[invoke](dot(node, 'catch'), Self), __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right), (__coil_temp = {left: dot(node, 'finally')}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = emit_node[invoke](dot(node, 'finally'), Self), __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right));}], [Keyword.for("finally"), function ({'body': body, 'pos': pos}) {
body ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Body] = [nid[invoke](), nid[invoke]()];
return str[invoke]("finally(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "body(", Body, ", ", Self, ").\n", emit_ast[invoke](body, Body));}], [Keyword.for("catch"), function ({'name': name, 'body': body, 'pos': pos}) {
name ??= nil;
body ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Body] = [nid[invoke](), nid[invoke]()];
return str[invoke]("catch(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "body(", Body, ", ", Self, ").\n", emit_ast[invoke](body, Body));}], [Keyword.for("while_let_loop"), function ({'assign_expr': assign_expr, 'test_expr': test_expr, 'body': body, 'pos': pos}) {
assign_expr ??= nil;
test_expr ??= nil;
body ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Assign, Test, Body] = [nid[invoke](), nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("while_let_loop(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "assign_expr(", Assign, ", ", Self, ").\n", emit_node[invoke](assign_expr, Assign), "\n", "test_expr(", Test, ", ", Self, ").\n", emit_node[invoke](test_expr, Test), "\n", "body(", Body, ", ", Self, ").\n", emit_ast[invoke](body, Body));}], [Keyword.for("while_loop"), function ({'body': body, 'test_expr': test_expr, 'pos': pos}) {
body ??= nil;
test_expr ??= nil;
pos ??= nil;let __coil_temp;
let [Self, TestExpr] = [nid[invoke](), nid[invoke]()];
return str[invoke]("while_loop(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "test_expr(", TestExpr, ", ", Self, ").\n", emit_node[invoke](test_expr, TestExpr), "\n", emit_ast[invoke](body, Self));}], [Keyword.for("loop"), function ({'body': body, 'pos': pos}) {
body ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("loop(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_ast[invoke](body, Self));}], [Keyword.for("for_loop"), function ({'is_await?': is_await__q, 'assign_expr': assign_expr, 'iterable_expr': iterable_expr, 'body': body, 'pos': pos}) {
is_await__q ??= nil;
assign_expr ??= nil;
iterable_expr ??= nil;
body ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Assign, Iterable] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("for_loop(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "is_await(", dot(is_await__q, as_bool)[invoke](), ", ", Self, ").\n", "assign_expr(", Assign, ", ", Self, ").\n", emit_node[invoke](assign_expr, Assign), "\n", "iterable_expr(", Iterable, ", ", Self, ").\n", emit_node[invoke](iterable_expr, Iterable), "\n", emit_ast[invoke](body, Self));}], [Keyword.for("protocol_method"), function ({'names': names}) {
names ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("protocol_method(", Self, ", ", Parent, ").\n", dot(dot(names, map)[invoke]((name) => {
name ??= nil;return str[invoke]("protocol_method_name(", quote[invoke](name), ", ", Self, ").");}), join)[invoke]("\n"));}], [Keyword.for("protocol_def"), function ({'name': name, 'methods': methods}) {
name ??= nil;
methods ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("protocol_def(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n", dot(dot(methods, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Self);}), join)[invoke]("\n"));}], [Keyword.for("if_let"), function ({'assign_expr': assign_expr, 'expr': expr, 'pass': pass, 'fail': fail, 'pos': pos}) {
assign_expr ??= nil;
expr ??= nil;
pass ??= nil;
fail ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Assign, Expr, Pass, Fail] = [nid[invoke](), nid[invoke](), nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("if_let(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "assign_expr(", Assign, ", ", Self, ").\n", emit_node[invoke](assign_expr, Assign), "\n", "expr(", Expr, ", ", Self, ").\n", emit_node[invoke](expr, Expr), "\n", "pass(", Pass, ", ", Self, ").\n", emit_ast[invoke](pass, Pass), "\n", (__coil_temp = {left: fail}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = str[invoke]("fail(", Fail, ", ", Self, ").\n", emit_node[invoke](fail, Fail)), __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right));}], [Keyword.for("if"), function ({'expr': expr, 'pass': pass, 'fail': fail, 'pos': pos}) {
expr ??= nil;
pass ??= nil;
fail ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Expr, Pass, Fail] = [nid[invoke](), nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("if(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "expr(", Expr, ", ", Self, ").\n", emit_node[invoke](expr, Expr), "\n", "pass(", Pass, ", ", Self, ").\n", emit_ast[invoke](pass, Pass), "\n", (__coil_temp = {left: fail}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = str[invoke]("fail(", Fail, ", ", Self, ").\n", emit_node[invoke](fail, Fail)), __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right));}], [Keyword.for("else_if"), function ({'expr': expr, 'pass': pass, 'fail': fail, 'pos': pos}) {
expr ??= nil;
pass ??= nil;
fail ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Expr, Pass, Fail] = [nid[invoke](), nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("else_if(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "expr(", Expr, ", ", Self, ").\n", emit_node[invoke](expr, Expr), "\n", "pass(", Pass, ", ", Self, ").\n", emit_ast[invoke](pass, Pass), "\n", (__coil_temp = {left: fail}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = str[invoke]("fail(", Fail, ", ", Self, ").\n", emit_node[invoke](fail, Fail)), __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right));}], [Keyword.for("else"), function ({'body': body, 'pos': pos}) {
body ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("else(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_ast[invoke](body, Self));}], [Keyword.for("unapplied_equality_op"), function ({'op': op, 'pos': pos}) {
op ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("unapplied_equality_op(", quote[invoke](op), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("unapplied_algebra_op"), function ({'op': op, 'pos': pos}) {
op ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("unapplied_algebra_op(", quote[invoke](op), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("anon_body_fn"), function ({'args': args, 'body': body, 'pos': pos}) {
args ??= nil;
body ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Body] = [nid[invoke](), nid[invoke]()];
return str[invoke]("anon_body_fn(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_args[invoke](args, Self), "\n", "body(", Body, ", ", Self, ").\n", emit_ast[invoke](body, Body));}], [Keyword.for("anon_fn"), function ({'args': args, 'return_expr': return_expr, 'pos': pos}) {
args ??= nil;
return_expr ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Return] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("anon_fn(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_args[invoke](args, Self), "\n", "return_expr(", Return, ", ", Self, ").\n", emit_node[invoke](return_expr, Return));}], [Keyword.for("prefix_exclusive_range"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("prefix_exclusive_range(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("prefix_inclusive_range"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("prefix_inclusive_range(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("not"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("not(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("spread"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("spread(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("await"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("await(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("yield"), function ({'star?': star__q, 'expr': expr, 'pos': pos}) {
star__q ??= nil;
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("yield(", dot(star__q, as_bool)[invoke](), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("paren_expr"), function ({'expr': expr, 'pos': pos}) {
expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("paren_expr(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](expr, Self));}], [Keyword.for("this_spread_assign"), function ({'name': name, 'pos': pos}) {
name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("this_spread_assign(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("this_assign"), function ({'name': name, 'pos': pos}) {
name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("this_assign(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("object_deconstruction"), function ({'entries': entries, 'pos': pos}) {
entries ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("object_deconstruction(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", dot(dot(entries, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Self);}), join)[invoke]("\n"));}], [Keyword.for("obj_assign_expr"), function ({'property': property, 'assign_expr': assign_expr, 'pos': pos}) {
property ??= nil;
assign_expr ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("obj_assign_expr(", quote[invoke](property), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](assign_expr, Self));}], [Keyword.for("obj_reg_entry"), function ({'name': name, 'pos': pos}) {
name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("obj_reg_entry(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("obj_entry_rename"), function ({'old_name': old_name, 'new_name': new_name, 'pos': pos}) {
old_name ??= nil;
new_name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("obj_entry_rename(", quote[invoke](old_name), ", ", quote[invoke](new_name), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("spread_assign"), function ({'name': name, 'pos': pos}) {
name ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("spread_assign(", quote[invoke](name), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("regex_lit"), function ({'value': value, 'pos': pos}) {
value ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
value = dot(dot(value, 'replaceAll')[invoke]("\\", "\\\\"), 'replaceAll')[invoke]("\"", "\\\"");
return str[invoke]("regex_lit(\"", value, "\", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self));}], [Keyword.for("or"), function ({'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
lhs ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Lhs, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("or(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", "rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs), "\n");}], [Keyword.for("and"), function ({'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
lhs ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Lhs, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("and(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", "rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs), "\n");}], [Keyword.for("equality_op"), function ({'op': op, 'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
op ??= nil;
lhs ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Lhs, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("equality_op(", quote[invoke](op), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", "rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs));}], [Keyword.for("algebra_op"), function ({'op': op, 'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
op ??= nil;
lhs ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Lhs, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("algebra_op(", quote[invoke](op), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", "rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs));}], [Keyword.for("meta_create"), function ({'lhs': lhs, 'entries': entries, 'pos': pos}) {
lhs ??= nil;
entries ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Entries, Lhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("meta_create(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", "entries(", Entries, ", ", Self, ").\n", dot(dot(entries, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Entries);}), join)[invoke]("\n"));}], [Keyword.for("meta_from_entries"), function ({'lhs': lhs, 'entries': entries, 'pos': pos}) {
lhs ??= nil;
entries ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Entries, Lhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("meta_from_entries(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", "entries(", Entries, ", ", Self, ").\n", dot(dot(entries, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Entries);}), join)[invoke]("\n"));}], [Keyword.for("fn_call"), function ({'lhs': lhs, 'args': args, 'pos': pos}) {
lhs ??= nil;
args ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Args, Lhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("fn_call(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", "args(", Args, ", ", Self, ").\n", dot(dot(args, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Args);}), join)[invoke]("\n"));}], [Keyword.for("exclusive_range"), function ({'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
lhs ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Lhs, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("exclusive_range(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", (__coil_temp = {left: rhs}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = str[invoke]("rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs)), __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right));}], [Keyword.for("inclusive_range"), function ({'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
lhs ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Lhs, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("inclusive_range(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", (__coil_temp = {left: rhs}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = str[invoke]("rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs)), __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right));}], [Keyword.for("keyword_lookup"), function ({'lhs': lhs, 'property': property, 'pos': pos}) {
lhs ??= nil;
property ??= nil;
pos ??= nil;let __coil_temp;
let Self = nid[invoke]();
return str[invoke]("keyword_lookup(", quote[invoke](property), ", ", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", emit_node[invoke](lhs, Self));}], [Keyword.for("dot"), function ({'lhs': lhs, 'rhs': rhs, 'pos': pos}) {
lhs ??= nil;
rhs ??= nil;
pos ??= nil;let __coil_temp;
let [Self, Lhs, Rhs] = [nid[invoke](), nid[invoke](), nid[invoke]()];
return str[invoke]("dot(", Self, ", ", Parent, ").\n", line_and_col[invoke](pos, Self), "\n", "lhs(", Lhs, ", ", Self, ").\n", emit_node[invoke](lhs, Lhs), "\n", "rhs(", Rhs, ", ", Self, ").\n", emit_node[invoke](rhs, Rhs), "\n");}]])), pipe)[invoke]((f) => {
f ??= nil;let __coil_temp;
if ((f)[Meta.as_bool]()) {
let __coil_temp;
return f[invoke](node, Parent);
} else {
let __coil_temp;
dot(console, 'error')[invoke]("unknown", node, dot(Error[Meta.create]([]), 'stack'));
};});};
let emit_ast = function (ast, Parent) {
ast ??= nil;
Parent ??= nil;let __coil_temp;
return dot(dot(dot(dot(dot(dot(ast, map)[invoke]((node) => {
node ??= nil;return emit_node[invoke](node, Parent);}), flat_map)[invoke]((statement) => {
statement ??= nil;return dot(statement, Keyword.for("split"))[invoke]("\n");}), filter)[invoke]((line) => {
line ??= nil;return dot(dot(line, 'trim')[invoke](), 'length')[Algebra[">"]]((0));}), into)[invoke]([]), Keyword.for("sort"))[invoke](), join)[invoke]("\n");};
let ast = dot(dot(tokenize[invoke](dot(Deno, 'readTextFileSync')[invoke]("./src/emit_prolog.coil")), pipe)[invoke]((tokens) => {
tokens ??= nil;return CollectionView[Meta.create]([tokens, (0)]);}), pipe)[invoke](parse);
let prelude = dot(Deno, 'readTextFileSync')[invoke]("./prolog_prelude.pl");
let module_nid = nid[invoke]();
dot(dot(str[invoke](prelude, "module([main], ", module_nid, ").\n", emit_ast[invoke](ast, module_nid)), 'trim')[invoke](), log)[invoke]();
