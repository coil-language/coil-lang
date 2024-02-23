"use strict";
import {ObjectLiteral, Nil, nil, Keyword, dot, raise__b, panic__b, type_of, str, from_js} from '../src/std/globals.mjs'
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
let resolve_name = function (name) {
name ??= nil;let __coil_temp;
if ((name)[Meta.as_bool]()) {
let __coil_temp;
return dot(dot(dot(dot(name, Keyword.for("replaceAll"))[invoke]("?", "__q"), Keyword.for("replaceAll"))[invoke]("!", "__b"), Keyword.for("replaceAll"))[invoke](">", "_lt_"), Keyword.for("replaceAll"))[invoke]("-", "_");
} else {
let __coil_temp;
return name;
};};
let eval_if_branch = function (branch) {
branch ??= nil;let __coil_temp;
if ((dot(branch, nil__q)[invoke]())[Meta.as_bool]()) {
let __coil_temp;
return "";
} else if (dot(branch, Keyword.for("type"))[Meta["=="]](Keyword.for("else"))) {
let __coil_temp;
return str[invoke](" else {\n", eval_ast[invoke]((__coil_temp = {left: dot(branch, Keyword.for("body"))}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : [])), "\n}");
} else if (dot(branch, Keyword.for("type"))[Meta["=="]](Keyword.for("else_if_let"))) {
let __coil_temp;
return str[invoke](" else {\n", eval_if_let[invoke](branch), "\n}");
} else if (dot(branch, Keyword.for("type"))[Meta["=="]](Keyword.for("else_if"))) {
let __coil_temp;
return str[invoke](" else if (", eval_expr[invoke](dot(branch, at)[invoke](Keyword.for("expr"))), ") {\n", eval_ast[invoke]((__coil_temp = {left: dot(branch, at)[invoke](Keyword.for("pass"))}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : [])), "\n}", eval_if_branch[invoke](dot(branch, at)[invoke](Keyword.for("fail"))));
} else {
let __coil_temp;
panic__b[invoke]("Expected else if");
};};
let eval_if = function ({'expr': expr, 'pass': pass, 'fail': fail}) {
expr ??= nil;
pass ??= nil;
fail ??= nil;let __coil_temp;
return str[invoke]("if ((", eval_expr[invoke](expr), ")[Meta.as_bool]()) {\n", eval_ast[invoke](pass), "\n", "}", eval_if_branch[invoke](fail));};
let eval_str = function ({'value': value}) {
value ??= nil;let __coil_temp;
value = dot(value, Keyword.for("slice"))[invoke]((1), (-1));
if ((dot(value, Keyword.for("includes"))[invoke]("\n"))[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("`", dot(value, 'replaceAll')[invoke]("`", "\\`"), "`");
} else {
let __coil_temp;
return str[invoke]("\"", value, "\"");
};};
let eval_fn_call = function ({'lhs': lhs, 'args': args}) {
lhs ??= nil;
args ??= nil;let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[invoke](", dot(dot(args, map)[invoke](eval_expr), join)[invoke](", "), ")");};
let eval_id_assign_name = function ({'name': name}) {
name ??= nil;let __coil_temp;
if ((name[Meta["=="]]("_"))[Meta.as_bool]()) {
let __coil_temp;
return "_ignore_me_";
} else {
let __coil_temp;
return resolve_name[invoke](name);
};};
let eval_spread_assign = function ({'name': name}) {
name ??= nil;let __coil_temp;
return str[invoke]("...", resolve_name[invoke](name));};
let eval_array_deconstruction_entry = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("array_deconstruction"), eval_array_deconstruction_names], [Keyword.for("object_deconstruction"), eval_object_deconstruction_names]]))[invoke](node);};
let eval_array_deconstruction_names = function ({'entries': entries}) {
entries ??= nil;let __coil_temp;
return str[invoke]("[", dot(dot(entries, map)[invoke](eval_array_deconstruction_entry), join)[invoke](", "), "]");};
let eval_obj_reg_entry = function ({'name': name}) {
name ??= nil;let __coil_temp;
return str[invoke]("'", name, "': ", resolve_name[invoke](name));};
let eval_obj_entry_rename = function ({'old_name': old_name, 'new_name': new_name}) {
old_name ??= nil;
new_name ??= nil;let __coil_temp;
return str[invoke]("'", old_name, "': ", resolve_name[invoke](new_name));};
let eval_obj_assign_expr = function ({'property': property, 'assign_expr': assign_expr}) {
property ??= nil;
assign_expr ??= nil;let __coil_temp;
return str[invoke]("'", property, "': ", eval_assign_expr[invoke](assign_expr));};
let eval_obj_deconstruction_entry = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("obj_reg_entry"), eval_obj_reg_entry], [Keyword.for("obj_assign_expr"), eval_obj_assign_expr], [Keyword.for("obj_entry_rename"), eval_obj_entry_rename], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("object_deconstruction"), eval_object_deconstruction_names]]))[invoke](node);};
let eval_object_deconstruction_names = function ({'entries': entries}) {
entries ??= nil;let __coil_temp;
return str[invoke]("{", dot(dot(entries, map)[invoke](eval_obj_deconstruction_entry), join)[invoke](", "), "}");};
let eval_this_assign = function ({'name': name}) {
name ??= nil;let __coil_temp;
return resolve_name[invoke](name);};
let eval_this_spread_assign = function ({'name': name}) {
name ??= nil;let __coil_temp;
return str[invoke]("...", resolve_name[invoke](name));};
let eval_assign_all_as = function ({'name': name}) {
name ??= nil;let __coil_temp;
return str[invoke]("* as ", name);};
let eval_assign_expr = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("array_deconstruction"), eval_array_deconstruction_names], [Keyword.for("object_deconstruction"), eval_object_deconstruction_names], [Keyword.for("this_assign"), eval_this_assign], [Keyword.for("this_spread_assign"), eval_spread_assign]]))[invoke](node);};
let eval_while_let_loop = function ({'test_expr': test_expr, 'assign_expr': assign_expr, 'body': body}) {
test_expr ??= nil;
assign_expr ??= nil;
body ??= nil;let __coil_temp;
return str[invoke]("var __coil_while_let_temp = ", eval_expr[invoke](test_expr), " ?? nil;\n", "while (__coil_while_let_temp[Meta.as_bool]()) {\n", "let ", eval_assign_expr[invoke](assign_expr), " = __coil_while_let_temp;\n", eval_ast[invoke](body), "\n", "__coil_while_let_temp = ", eval_expr[invoke](test_expr), " ?? nil;\n", "}");};
let eval_if_let = function ({'expr': expr, 'assign_expr': assign_expr, 'pass': pass, 'fail': fail}) {
expr ??= nil;
assign_expr ??= nil;
pass ??= nil;
fail ??= nil;let __coil_temp;
return str[invoke]("var __coil_if_let_temp = ", eval_expr[invoke](expr), " ?? nil;\n", "if (__coil_if_let_temp[Meta.as_bool]()) {\n", "let ", eval_assign_expr[invoke](assign_expr), " = __coil_if_let_temp;\n", eval_ast[invoke](pass), "\n", "}", eval_if_branch[invoke](fail));};
let eval_spread = function ({'expr': expr}) {
expr ??= nil;let __coil_temp;
return str[invoke]("...", eval_expr[invoke](expr));};
let eval_let = function ({'assign_expr': assign_expr, 'rhs': rhs}) {
assign_expr ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke]("let ", eval_assign_expr[invoke](assign_expr), " = ", eval_expr[invoke](rhs));};
let eval_array = function ({'elements': elements}) {
elements ??= nil;let __coil_temp;
return str[invoke]("[", dot(dot(elements, map)[invoke](eval_expr), join)[invoke](", "), "]");};
let eval_this_assignments = function (args) {
args ??= nil;let __coil_temp;
return dot(dot(dot(args, filter)[invoke](Keyword.for("type"), Set[Meta.create]([Keyword.for("this_assign"), Keyword.for("this_spread_assign")])), map)[invoke](({'name': name}) => {
name ??= nil;return str[invoke]("this['", name, "'] = ", resolve_name[invoke](name), ";\n");}), into)[invoke]("");};
let eval_name_expr = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("dot"), function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke](eval_name_expr[invoke](lhs), "[", eval_name_expr[invoke](rhs), "]");}], [Keyword.for("keyword_lookup"), function ({'lhs': lhs, 'property': property}) {
lhs ??= nil;
property ??= nil;let __coil_temp;
return str[invoke](eval_name_expr[invoke](lhs), "['", property, "']");}]]), (eval_fn) => {
eval_fn ??= nil;return (__coil_temp = {left: eval_fn}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : eval_expr);})[invoke](node);};
let entries_arg_names = function ({'entries': entries}) {
entries ??= nil;let __coil_temp;
return dot(entries, 'flatMap')[invoke](arg_names);};
let arg_names = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("array_deconstruction"), entries_arg_names], [Keyword.for("object_deconstruction"), entries_arg_names], [Keyword.for("id_assign"), function ({'name': name}) {
name ??= nil;let __coil_temp;
return [name];}], [Keyword.for("obj_reg_entry"), function ({'name': name}) {
name ??= nil;let __coil_temp;
return [name];}], [Keyword.for("obj_entry_rename"), function ({'new_name': new_name}) {
new_name ??= nil;let __coil_temp;
return [new_name];}], [Keyword.for("spread_assign"), function ({'name': name}) {
name ??= nil;let __coil_temp;
return [name];}], [Keyword.for("obj_str_rename_entry"), function ({'new_name': new_name}) {
new_name ??= nil;let __coil_temp;
return [new_name];}], [Keyword.for("this_assign"), function ({'name': name}) {
name ??= nil;let __coil_temp;
return [name];}], [Keyword.for("this_spread_assign"), function ({'name': name}) {
name ??= nil;let __coil_temp;
return [name];}]]))[invoke](node);};
let eval_nil_destructure_args = function (args) {
args ??= nil;let __coil_temp;
if ((args)[Meta.as_bool]()) {
let __coil_temp;
return dot(dot(dot(args, 'flatMap')[invoke](arg_names), map)[invoke]((name) => {
name ??= nil;return str[invoke](resolve_name[invoke](name), " ??= nil;");}), join)[invoke]("\n");
} else {
let __coil_temp;
return "";
};};
let eval_fn_expr = function ({'is_async?': is_async__q, 'generator?': generator__q, 'args': args, 'body': body}) {
is_async__q ??= nil;
generator__q ??= nil;
args ??= nil;
body ??= nil;let __coil_temp;
return str[invoke](((__coil_temp = {left: is_async__q}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = "async ", __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right)), "function ", ((__coil_temp = {left: generator__q}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = "*", __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right)), "(", dot(dot(((__coil_temp = {left: args}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : [])), map)[invoke](eval_assign_expr), join)[invoke](", "), ") {\n", eval_this_assignments[invoke]((__coil_temp = {left: args}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : [])), eval_nil_destructure_args[invoke]((__coil_temp = {left: args}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : [])), eval_ast[invoke](body), "}");};
let eval_fn = function (node) {
node ??= nil;let __coil_temp;
return str[invoke]((__coil_temp = {left: ((__coil_temp = {left: dot(dot(node, 'name_expr'), 'type')[Meta["=="]](Keyword.for("id_lookup"))}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = "let ", __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right))}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : ""), eval_name_expr[invoke](dot(node, 'name_expr')), " = ", eval_fn_expr[invoke](node));};
let eval_obj_fn = function ({'name': name, 'generator?': generator__q, 'is_async?': is_async__q, 'args': args, 'body': body}) {
name ??= nil;
generator__q ??= nil;
is_async__q ??= nil;
args ??= nil;
body ??= nil;let __coil_temp;
return str[invoke](((__coil_temp = {left: is_async__q}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = "async ", __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right)), ((__coil_temp = {left: generator__q}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = "*", __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right)), "['", name, "'](", dot(dot(args, map)[invoke](eval_assign_expr), join)[invoke](", "), ") {\n", eval_ast[invoke](body), "\n}");};
let eval_id_lookup = function ({'name': name}) {
name ??= nil;let __coil_temp;
return resolve_name[invoke](name);};
let eval_num = function ({'value': value}) {
value ??= nil;let __coil_temp;
return str[invoke]("(", value, ")");};
let eval_double_equals = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Equal['==']](", eval_expr[invoke](rhs), ")");};
let eval_not_equals = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Equal['!=']](", eval_expr[invoke](rhs), ")");};
let eval_not = function ({'expr': expr}) {
expr ??= nil;let __coil_temp;
return str[invoke](eval_expr[invoke](expr), "[Bool.negate]()");};
let eval_meta_from_entries = function ({'lhs': lhs, 'entries': entries}) {
lhs ??= nil;
entries ??= nil;let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Meta.from_entries]([", dot(dot(entries, map)[invoke](eval_record_entry), join)[invoke](", "), "])");};
let eval_meta_create = function ({'lhs': lhs, 'entries': entries}) {
lhs ??= nil;
entries ??= nil;let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Meta.create]([", dot(dot(entries, map)[invoke](eval_expr), join)[invoke](", "), "])");};
let eval_await = function ({'expr': expr}) {
expr ??= nil;let __coil_temp;
return str[invoke]("await ", eval_expr[invoke](expr));};
let eval_yield = function ({'star?': star__q, 'expr': expr}) {
star__q ??= nil;
expr ??= nil;let __coil_temp;
return str[invoke]("(yield", ((__coil_temp = {left: star__q}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = "*", __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right)), " ", eval_expr[invoke](expr), ")");};
let eval_paren_expr = function ({'expr': expr}) {
expr ??= nil;let __coil_temp;
return str[invoke]("(", eval_expr[invoke](expr), ")");};
let eval_keyword = function ({'value': value}) {
value ??= nil;let __coil_temp;
return str[invoke]("Keyword.for(\"", value, "\")");};
let eval_regular_record_entry = function ({'key_expr': key_expr, 'value_expr': value_expr}) {
key_expr ??= nil;
value_expr ??= nil;let __coil_temp;
return str[invoke]("[", eval_expr[invoke](key_expr), ", ", eval_expr[invoke](value_expr), "]");};
let eval_keyword_record_entry = function ({'name': name, 'expr': expr}) {
name ??= nil;
expr ??= nil;let __coil_temp;
return str[invoke]("[", eval_keyword[invoke](ObjectLiteral[Meta.from_entries]([[Keyword.for("value"), name]])), ", ", eval_expr[invoke](expr), "]");};
let eval_fn_record_entry = function (fn_node) {
fn_node ??= nil;let __coil_temp;
return str[invoke]("[", eval_expr[invoke](dot(fn_node, 'name_expr')), ", ", eval_fn_expr[invoke](fn_node), "]");};
let eval_id_shorthand_record_entry = function ({'name': name}) {
name ??= nil;let __coil_temp;
return str[invoke]("[", eval_keyword[invoke](ObjectLiteral[Meta.from_entries]([[Keyword.for("value"), name]])), ", ", resolve_name[invoke](name), "]");};
let eval_record_entry = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("regular_record_entry"), eval_regular_record_entry], [Keyword.for("keyword_record_entry"), eval_keyword_record_entry], [Keyword.for("id_shorthand_record_entry"), eval_id_shorthand_record_entry], [Keyword.for("spread"), eval_spread], [Keyword.for("fn"), eval_fn_record_entry]]))[invoke](node);};
let eval_inclusive_range = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
if ((rhs)[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("new InclusiveRange(", eval_expr[invoke](lhs), ", ", eval_expr[invoke](rhs), ")");
} else {
let __coil_temp;
return str[invoke]("new InclusiveRangeNoMaximum(", eval_expr[invoke](lhs), ")");
};};
let eval_exclusive_range = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
if ((rhs)[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("new ExclusiveRange(", eval_expr[invoke](lhs), ", ", eval_expr[invoke](rhs), ")");
} else {
let __coil_temp;
return str[invoke]("new ExclusiveRangeNoMaximum(", eval_expr[invoke](lhs), ")");
};};
let eval_regex_lit = function ({'value': value}) {
value ??= nil;let __coil_temp;
return value;};
let eval_prefix_exclusive_range = function ({'expr': expr}) {
expr ??= nil;let __coil_temp;
return str[invoke]("new ExclusiveRangeNoMinimum(", eval_expr[invoke](expr), ")");};
let eval_prefix_inclusive_range = function ({'expr': expr}) {
expr ??= nil;let __coil_temp;
return str[invoke]("new InclusiveRangeNoMinimum(", eval_expr[invoke](expr), ")");};
let eval_dot = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke]("dot(", eval_expr[invoke](lhs), ", ", eval_expr[invoke](rhs), ")");};
let eval_keyword_lookup = function ({'lhs': lhs, 'property': property}) {
lhs ??= nil;
property ??= nil;let __coil_temp;
return str[invoke]("dot(", eval_expr[invoke](lhs), ", '", property, "')");};
let eval_object_literal = function ({'entries': entries}) {
entries ??= nil;let __coil_temp;
return str[invoke]("ObjectLiteral[Meta.from_entries]([", dot(dot(entries, map)[invoke](eval_record_entry), join)[invoke](", "), "])");};
let eval_anon_fn_body = function (node) {
node ??= nil;let __coil_temp;
if ((dot(node, 'type')[Meta["=="]](Keyword.for("brace_body")))[Meta.as_bool]()) {
let __coil_temp;
return eval_ast[invoke](dot(node, 'body'));
} else {
let __coil_temp;
return str[invoke]("return ", eval_expr[invoke](node), ";");
};};
let eval_anon_fn = function ({'args': args, 'return_node': return_node}) {
args ??= nil;
return_node ??= nil;let __coil_temp;
return str[invoke]("(", dot(dot(args, map)[invoke](eval_assign_expr), join)[invoke](", "), ") => {\n", eval_nil_destructure_args[invoke](args), eval_anon_fn_body[invoke](return_node), "}");};
let eval_anon_gen_fn = function ({'args': args, 'return_node': return_node}) {
args ??= nil;
return_node ??= nil;let __coil_temp;
return str[invoke]("function *(", dot(dot(args, map)[invoke](eval_assign_expr), join)[invoke](", "), ") {\n", eval_nil_destructure_args[invoke](args), eval_anon_fn_body[invoke](return_node), "}.bind(this)");};
let eval_anon_body_fn = function ({'args': args, 'body': body}) {
args ??= nil;
body ??= nil;let __coil_temp;
return str[invoke]("(", dot(dot(args, map)[invoke](eval_assign_expr), join)[invoke](", "), ") => {\n", eval_nil_destructure_args[invoke](args), "\n", eval_ast[invoke](body), "}");};
let eval_algebra_op = function ({'lhs': lhs, 'op': op, 'rhs': rhs}) {
lhs ??= nil;
op ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Algebra[\"", op, "\"]](", eval_expr[invoke](rhs), ")");};
let eval_equality_op = function ({'lhs': lhs, 'op': op, 'rhs': rhs}) {
lhs ??= nil;
op ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke](eval_expr[invoke](lhs), "[Meta[\"", op, "\"]](", eval_expr[invoke](rhs), ")");};
let eval_instanceof = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke]("(", eval_expr[invoke](lhs), " instanceof ", eval_expr[invoke](rhs), ")");};
let eval_and = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke]("(__coil_temp = {left: ", eval_expr[invoke](lhs), "}", ", __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left", " : (__coil_temp.right = ", eval_expr[invoke](rhs), ", __coil_temp.right[Meta.as_bool]() === true) ", " ? __coil_temp.right : __coil_temp.right)");};
let eval_or = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke]("(__coil_temp = {left: ", eval_expr[invoke](lhs), "}", ", __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : ", eval_expr[invoke](rhs), ")");};
let eval_unapplied_algebra_op = function ({'op': op}) {
op ??= nil;let __coil_temp;
return str[invoke]("Algebra['", op, "']");};
let eval_unapplied_equality_op = function ({'op': op}) {
op ??= nil;let __coil_temp;
return str[invoke]("Meta['", op, "']");};
let eval_snd_assign = function ({'lhs': lhs, 'rhs': rhs}) {
lhs ??= nil;
rhs ??= nil;let __coil_temp;
return str[invoke](eval_name_expr[invoke](lhs), " = ", eval_expr[invoke](rhs));};
let eval_expr = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("algebra_op"), eval_algebra_op], [Keyword.for("unapplied_algebra_op"), eval_unapplied_algebra_op], [Keyword.for("unapplied_equality_op"), eval_unapplied_equality_op], [Keyword.for("equality_op"), eval_equality_op], [Keyword.for("and"), eval_and], [Keyword.for("or"), eval_or], [Keyword.for("instanceof"), eval_instanceof], [Keyword.for("str"), eval_str], [Keyword.for("dot"), eval_dot], [Keyword.for("snd_assign"), eval_snd_assign], [Keyword.for("keyword_lookup"), eval_keyword_lookup], [Keyword.for("object_literal"), eval_object_literal], [Keyword.for("regex_lit"), eval_regex_lit], [Keyword.for("keyword"), eval_keyword], [Keyword.for("prefix_exclusive_range"), eval_prefix_exclusive_range], [Keyword.for("prefix_inclusive_range"), eval_prefix_inclusive_range], [Keyword.for("id_lookup"), eval_id_lookup], [Keyword.for("fn_call"), eval_fn_call], [Keyword.for("num"), eval_num], [Keyword.for("array"), eval_array], [Keyword.for("double_equals"), eval_double_equals], [Keyword.for("not_equals"), eval_not_equals], [Keyword.for("not"), eval_not], [Keyword.for("fn"), eval_fn], [Keyword.for("meta_from_entries"), eval_meta_from_entries], [Keyword.for("meta_create"), eval_meta_create], [Keyword.for("spread"), eval_spread], [Keyword.for("await"), eval_await], [Keyword.for("yield"), eval_yield], [Keyword.for("paren_expr"), eval_paren_expr], [Keyword.for("inclusive_range"), eval_inclusive_range], [Keyword.for("exclusive_range"), eval_exclusive_range], [Keyword.for("anon_fn"), eval_anon_fn], [Keyword.for("anon_gen_fn"), eval_anon_gen_fn], [Keyword.for("anon_body_fn"), eval_anon_body_fn]]))[invoke](node);};
let eval_return = function ({'expr': expr}) {
expr ??= nil;let __coil_temp;
if ((expr)[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("return ", eval_expr[invoke](expr));
} else {
let __coil_temp;
return "return";
};};
let eval_protocol = function ({'name': name, 'methods': methods}) {
name ??= nil;
methods ??= nil;let __coil_temp;
if ((methods)[Meta.as_bool]()) {
let __coil_temp;
return str[invoke]("const ", name, " = Object.freeze({", dot(dot(dot(methods, 'names'), map)[invoke]((method) => {
method ??= nil;return str[invoke]("\"", dot(method, 'name'), "\": Symbol(\"", name, ":", dot(method, 'name'), "\")");}), join)[invoke](",\n"), "})");
} else {
let __coil_temp;
return str[invoke]("const ", resolve_name[invoke](name), " = Symbol(\"", name, "\")");
};};
let eval_for_loop = function ({'is_await?': is_await__q, 'assign_expr': assign_expr, 'iterable_expr': iterable_expr, 'body': body}) {
is_await__q ??= nil;
assign_expr ??= nil;
iterable_expr ??= nil;
body ??= nil;let __coil_temp;
return str[invoke]("for ", ((__coil_temp = {left: is_await__q}, __coil_temp.left[Meta.as_bool]() === false ? __coil_temp.left : (__coil_temp.right = "await ", __coil_temp.right[Meta.as_bool]() === true)  ? __coil_temp.right : __coil_temp.right)), " (let ", eval_assign_expr[invoke](assign_expr), " of ", eval_expr[invoke](iterable_expr), ") {\n", eval_ast[invoke](body), "\n", "}");};
let eval_id_assign = function ({'name': name, 'expr': expr}) {
name ??= nil;
expr ??= nil;let __coil_temp;
return str[invoke](resolve_name[invoke](name), " = ", eval_expr[invoke](expr));};
let eval_while_loop = function ({'test_expr': test_expr, 'body': body}) {
test_expr ??= nil;
body ??= nil;let __coil_temp;
return str[invoke]("while ((", eval_expr[invoke](test_expr), ")[Meta.as_bool]()) {\n", eval_ast[invoke](body), "\n}");};
let eval_loop = function ({'body': body}) {
body ??= nil;let __coil_temp;
return str[invoke]("while (true) {\n", eval_ast[invoke](body), "\n}");};
let eval_continue = function () {
let __coil_temp;
return "continue";};
let eval_break = function () {
let __coil_temp;
return "break";};
let eval_try = function (node) {
node ??= nil;let __coil_temp;
let body_js = dot(dot(node, at)[invoke](Keyword.for("body")), pipe)[invoke](eval_ast);
let catch_js = "";
let finally_js = "";
if ((dot(node, has__q)[invoke](Keyword.for("catch")))[Meta.as_bool]()) {
let __coil_temp;
let {'name': name, 'body': body} = dot(node, at)[invoke](Keyword.for("catch"));
catch_js = str[invoke](" catch (", name, ") {\n", eval_ast[invoke](body), "\n}");
};
if ((dot(node, has__q)[invoke](Keyword.for("finally")))[Meta.as_bool]()) {
let __coil_temp;
let {'body': body} = dot(node, at)[invoke](Keyword.for("finally"));
finally_js = str[invoke](" finally {\n", eval_ast[invoke](body), "\n}");
};
return str[invoke]("try {\n", body_js, "\n", "}", catch_js, finally_js);};
let get_deconstructed_obj_entry_name = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(Map[Meta.from_entries]([[Keyword.for("obj_reg_entry"), Keyword.for("name")], [Keyword.for("obj_entry_rename"), Keyword.for("old_name")]]), at)[invoke](dot(node, at)[invoke](Keyword.for("type"))), pipe)[invoke](node);};
let get_deconstructed_array_entry_name = function (node) {
node ??= nil;let __coil_temp;
return dot(dot(Map[Meta.from_entries]([[Keyword.for("id_assign"), Keyword.for("name")]]), at)[invoke](dot(node, at)[invoke](Keyword.for("type"))), pipe)[invoke](node);};
let eval_import_deconstruction_entry = function (node) {
node ??= nil;let __coil_temp;
return dot(node, pipe)[invoke](Keyword.for("type"), Map[Meta.from_entries]([[Keyword.for("obj_reg_entry"), function ({'name': name}) {
name ??= nil;let __coil_temp;
return resolve_name[invoke](name);}], [Keyword.for("obj_entry_rename"), function ({'old_name': old_name, 'new_name': new_name}) {
old_name ??= nil;
new_name ??= nil;let __coil_temp;
return str[invoke](resolve_name[invoke](old_name), " as ", resolve_name[invoke](new_name));}]]))[invoke](node);};
let eval_import_deconstruction_expr = function ({'entries': entries}) {
entries ??= nil;let __coil_temp;
return str[invoke]("{", dot(dot(entries, map)[invoke](eval_import_deconstruction_entry), join)[invoke](", "), "}");};
let eval_import_assign_exprs = function (node) {
node ??= nil;let __coil_temp;
return dot(node, pipe)[invoke](Keyword.for("type"), Map[Meta.from_entries]([[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("object_deconstruction"), eval_import_deconstruction_expr], [Keyword.for("assign_all_as"), eval_assign_all_as]]))[invoke](node);};
let eval_import = function ({'assign_expr': assign_expr, 'path': path}) {
assign_expr ??= nil;
path ??= nil;let __coil_temp;
return str[invoke]("import ", eval_import_assign_exprs[invoke](assign_expr), " from \"", dot(dot(path, 'value'), 'slice')[invoke]((1), (-1)), "\"");};
let eval_export = function ({'statement': statement}) {
statement ??= nil;let __coil_temp;
return str[invoke]("export ", eval_statement[invoke](statement));};
let eval_export_default = function ({'expr': expr}) {
expr ??= nil;let __coil_temp;
return str[invoke]("export default ", eval_expr[invoke](expr));};
let eval_direct_import = function ({'path': path}) {
path ??= nil;let __coil_temp;
return str[invoke]("import ", path);};
let eval_statement = function (node) {
node ??= nil;let __coil_temp;
let eval_fn = dot(dot(node, at)[invoke](Keyword.for("type")), pipe)[invoke](Map[Meta.from_entries]([[Keyword.for("if"), eval_if], [Keyword.for("direct_import"), eval_direct_import], [Keyword.for("import"), eval_import], [Keyword.for("export"), eval_export], [Keyword.for("export_default"), eval_export_default], [Keyword.for("let"), eval_let], [Keyword.for("if_let"), eval_if_let], [Keyword.for("return"), eval_return], [Keyword.for("protocol_def"), eval_protocol], [Keyword.for("for_loop"), eval_for_loop], [Keyword.for("id_assign"), eval_id_assign], [Keyword.for("while_loop"), eval_while_loop], [Keyword.for("loop"), eval_loop], [Keyword.for("while_let_loop"), eval_while_let_loop], [Keyword.for("continue"), eval_continue], [Keyword.for("break"), eval_break], [Keyword.for("try"), eval_try]]));
return ((__coil_temp = {left: eval_fn}, __coil_temp.left[Meta.as_bool]() ? __coil_temp.left : eval_expr))[invoke](node)[Algebra["+"]](";");};
let eval_ast = function (ast) {
ast ??= nil;let __coil_temp;
return str[invoke]("let __coil_temp;\n", dot(dot(ast, map)[invoke](eval_statement), join)[invoke]("\n"));};
export default eval_ast;
