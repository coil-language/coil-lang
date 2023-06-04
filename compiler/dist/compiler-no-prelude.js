function CollectionView(collection, idx) {
this.collection = collection;
this.idx = idx;
}
CollectionView.prototype[Collection] = new ObjectLiteral({['len']() {
return minus.call(len.bind(this['collection'])(),this['idx']);
}, ['empty?']() {
return equals__q.call(len.bind(this)(), (0));
}, ['at'](idx) {
return at.bind(this['collection'])(plus.call(this['idx'],idx));
}});
CollectionView.prototype[OrderedSequence] = new ObjectLiteral({['first']() {
return at.bind(this['collection'])(this['idx']);
}, ['last']() {
return last.bind(this['collection'])();
}});
CollectionView.prototype[Keyword.for("skip")] = function (n) {
return CollectionView[Meta]['[]'].call(CollectionView, this['collection'], plus.call(this['idx'],n));};
CollectionView.prototype[Symbol['iterator']] = function *() {
for  (let i of new IRange(this['idx'], len.bind(this['collection'])())) {
yield this['collection'][Meta]['[]'].call(this['collection'], i)
};};
function Lexer(entries) {
this.entries = entries;
}
function pass() {
}
function newline() {
}
Lexer.prototype[Call] = function (str) {
let tokens = [];
let index = (0);
function rest_of_string() {
return str['slice'](index);}
function scan() {
let result = rest_of_string()['match'](this);
if (truthy(or.call(negate.call(result), () => negate.call(equals__q.call(result['index'], (0)))))) {
return false;
};
index = plus.call(index,result[Meta]['[]'].call(result, (0))['length'])
return result[Meta]['[]'].call(result, (0));}
let line = (1);
let col = (1);
while (negate.call(equals__q.call(rest_of_string(), ""))) {
let found = false;
for  (let [pattern, type] of this['entries']) {
let __coil_if_let_temp = scan.bind(pattern)();
if (truthy(__coil_if_let_temp)) {
let value = __coil_if_let_temp;
if (truthy(equals__q.call(type, newline))) {
line = plus.call(line,(1))
col = (1)
} else if (negate.call(equals__q.call(type, pass))) {
tokens['push'](new ObjectLiteral({'type':type, 'value':value, 'line':line, 'col':col}))
col = plus.call(col,len.bind(value)())
} else {
col = plus.call(col,len.bind(value)())
};
found = true
break;
};
};
if (truthy(negate.call(found))) {
raise__b(Error[Meta]['[]'].call(Error, "No token matched."))
};
};
return tokens;};
let lexer = Lexer[Meta]['{}'].call(Lexer, [[/^\n/, newline], [/^\s+/, pass], [/^\/\/.*/, pass], [/^\,/, pass], [/^\;/, pass], [/^if\b/, Keyword.for("if")], [/^is\b/, Keyword.for("is")], [/^else\b/, Keyword.for("else")], [/^return\b/, Keyword.for("return")], [/^import\b/, Keyword.for("import")], [/^export\b/, Keyword.for("export")], [/^default\b/, Keyword.for("default")], [/^from\b/, Keyword.for("from")], [/^let\b/, Keyword.for("let")], [/^protocol\b/, Keyword.for("protocol")], [/^for\b/, Keyword.for("for")], [/^try\b/, Keyword.for("try")], [/^catch\b/, Keyword.for("catch")], [/^finally\b/, Keyword.for("finally")], [/^while\b/, Keyword.for("while")], [/^loop\b/, Keyword.for("loop")], [/^continue\b/, Keyword.for("continue")], [/^break\b/, Keyword.for("break")], [/^of\b/, Keyword.for("of")], [/^impl\b/, Keyword.for("impl")], [/^define\b/, Keyword.for("define")], [/^yield\b/, Keyword.for("yield")], [/^async\b/, Keyword.for("async")], [/^await\b/, Keyword.for("await")], [/^as\b/, Keyword.for("as")], [/^\=\>/, Keyword.for("arrow")], [/^\@/, Keyword.for("at")], [/^\&\&/, Keyword.for("and_and")], [/^\|\|/, Keyword.for("or_or")], [/^\?\?/, Keyword.for("nullish")], [/^\=\=\=/, Keyword.for("triple_eq")], [/^\!\=\=/, Keyword.for("triple_not_eq")], [/^\=\=/, Keyword.for("double_eq")], [/^\!\=/, Keyword.for("not_eq")], [/^\!/, Keyword.for("bang")], [/^\=/, Keyword.for("eq")], [/^fn\b/, Keyword.for("fn")], [/^\{/, Keyword.for("open_b")], [/^\}/, Keyword.for("close_b")], [/^\(/, Keyword.for("open_p")], [/^\)/, Keyword.for("close_p")], [/^[\-\+]?(\d*\.)?\d+[a-zA-Z]+/, Keyword.for("custom_number_literal")], [/^[\-\+]?(\d*\.)?\d+/, Keyword.for("num")], [/^\.\.\./, Keyword.for("dot_dot_dot")], [/^\.\./, Keyword.for("dot_dot")], [/^\./, Keyword.for("dot")], [/^\/.*\/[a-z]?/, Keyword.for("regex_lit")], [/^\>\=/, Keyword.for("gt_eq")], [/^\<\=/, Keyword.for("lt_eq")], [/^\>/, Keyword.for("gt")], [/^\</, Keyword.for("lt")], [/^\+/, Keyword.for("plus")], [/^\%/, Keyword.for("mod")], [/^\-/, Keyword.for("minus")], [/^\*\*/, Keyword.for("pow")], [/^\*/, Keyword.for("times")], [/^\&/, Keyword.for("single_and")], [/^\:\:/, Keyword.for("double_colon")], [/^\:[a-zA-Z_\?\!\$0-9\/\.]+/, Keyword.for("keyword")], [/^\:/, Keyword.for("colon")], [/^\//, Keyword.for("div")], [/^\[/, Keyword.for("open_sq")], [/^\]/, Keyword.for("close_sq")], [/^\"([^\\\"]|\\.)*\"/s, Keyword.for("string_lit")], [/^[a-zA-Z_\?\!\$0-9\>\-]+/, Keyword.for("id")]]);
function ParseError(expected_token_type, actual_token) {
this['stack'] = Error[Meta]['[]'].call(Error, )['stack']
this['message'] = str("Expected: ", expected_token_type, " got ", at.bind(actual_token)(Keyword.for("type")), " @ ", as_str.bind(at.bind(actual_token)(Keyword.for("line")))(), ":", as_str.bind(at.bind(actual_token)(Keyword.for("col")))())}
ParseError['prototype'] = Error[Meta]['[]'].call(Error, )
function expect_token__b(kw) {
if (truthy(negate.call(equals__q.call(at.bind(first.bind(this)())(Keyword.for("type")), kw)))) {
raise__b(ParseError[Meta]['[]'].call(ParseError, kw, first.bind(this)()))
} else {
return this;
};}
function verify_exists__b(parser) {
if (truthy(nil__q.bind(this)())) {
raise__b(Error[Meta]['[]'].call(Error, plus.call("Parser Failed - Expected ",parser)))
} else {
return this;
};}
const ParseInstruction = Symbol("ParseInstruction");
function line_and_col({'line': line, 'col': col}) {
return new ObjectLiteral({'line':line, 'col':col});}
function Init(expr) {
this.expr = expr;
}
Init.prototype[ParseInstruction] = function ([_expr, tokens]) {
return [new ObjectLiteral({...this['expr'], 'pos': line_and_col(first.bind(tokens)())}), tokens];};
function One(kw, as) {
this.kw = kw;
this.as = as;
}
One.prototype[ParseInstruction] = function ([expr, tokens]) {
let {'value': value, 'type': type} = first.bind(expect_token__b.bind(tokens)(this['kw']))();
return [merge.bind(expr)(new ObjectLiteral({[this['as']]: value})), tokens['skip']((1))];};
function Optional(set_or_kw, parse_fn, as) {
this.set_or_kw = set_or_kw;
this.parse_fn = parse_fn;
this.as = as;
}
Optional.prototype[ParseInstruction] = function ([expr, tokens]) {
if (truthy(empty__q.bind(tokens)())) {
return [expr, tokens];
};
function check_set(type) {
return any__q.bind(this)(function (val) {
if (truthy(equals__q.call(val, type))) {
return true;
} else if (val[Vector]) {
return has__q.bind(val)(type);
};});}
let {'type': type} = first.bind(tokens)();
if (truthy(and.call(this['set_or_kw'] instanceof Keyword, () => equals__q.call(type, this['set_or_kw'])))) {
return parse_step.bind(Then[Meta]['[]'].call(Then, this['parse_fn'], this['as']))([expr, tokens]);
} else if (and.call(this['set_or_kw'] instanceof Set, () => check_set.bind(this['set_or_kw'])(type))) {
return parse_step.bind(Then[Meta]['[]'].call(Then, this['parse_fn'], this['as']))([expr, tokens]);
} else {
return [expr, tokens];
};};
Function.prototype[ParseInstruction] = function ([_expr, tokens]) {
return this(tokens);};
function Chomp(...kws) {
this['kws'] = kws}
Chomp.prototype[ParseInstruction] = function ([expr, tokens]) {
let i = (0);
for  (let kw of this['kws']) {
expect_token__b.bind(tokens['skip'](i))(kw)
i = plus.call(i,(1))
};
return [expr, tokens['skip'](i)];};
function Then(parser, kw) {
this.parser = parser;
this.kw = kw;
}
Then.prototype[ParseInstruction] = function ([expr, tokens]) {
let result = call.bind(this['parser'])(tokens);
if (truthy(nil__q.bind(result)())) {
return [expr, tokens];
};
let [new_expr, new_tokens] = result;
if (truthy(this['kw'])) {
return [merge.bind(expr)(new ObjectLiteral({[this['kw']]: new_expr})), new_tokens];
} else {
return [new_expr, new_tokens];
};};
function FMap(f) {
this.f = f;
}
FMap.prototype[ParseInstruction] = function ([expr, tokens]) {
return [call.bind(this['f'])(expr), tokens];};
function Until(end_kw, parser, kw) {
this.end_kw = end_kw;
this.parser = parser;
this.kw = kw;
}
Until.prototype[ParseInstruction] = function ([expr, tokens]) {
let exprs = [];
while (negate.call(equals__q.call(at.bind(first.bind(tokens)())(Keyword.for("type")), this['end_kw']))) {
let [expr, new_tokens] = verify_exists__b.bind(call.bind(this['parser'])(tokens))(this);
exprs['push'](expr)
tokens = new_tokens
};
if (truthy(this['kw'])) {
return [merge.bind(expr)(new ObjectLiteral({[this['kw']]: exprs})), tokens];
} else {
return [exprs, tokens];
};};
function Case(parse_map, kw) {
this.parse_map = parse_map;
this.kw = kw;
}
Case.prototype[ParseInstruction] = function ([expr, tokens]) {
let __coil_if_let_temp = call.bind(this['parse_map'])(tokens);
if (truthy(__coil_if_let_temp)) {
let [new_expr, new_tokens] = __coil_if_let_temp;
if (truthy(this['kw'])) {
return [merge.bind(expr)(new ObjectLiteral({[this['kw']]: new_expr})), new_tokens];
} else {
return [new_expr, new_tokens];
};
} else {
console['log'](first.bind(this['tokens'])(), this['parse_map'])
raise__b(Error[Meta]['[]'].call(Error, "Case Parse Failed"))
};};
function Either(set, kw) {
this.set = set;
this.kw = kw;
}
Either.prototype[ParseInstruction] = function ([expr, tokens]) {
let op = verify_exists__b.bind(call.bind(this['set'])(at.bind(first.bind(tokens)())(Keyword.for("type"))))(this['set']);
let [new_expr, rest] = [first.bind(tokens)(), tokens['skip']((1))];
return [merge.bind(expr)(new ObjectLiteral({[this['kw']]: at.bind(new_expr)(Keyword.for("value"))})), rest];};
function parse_step(result) {
return this[Meta]['[]'].call(this, ParseInstruction)(result);}
function Parser(...instructions) {
this['instructions'] = instructions}
Parser.prototype[Call] = function (tokens) {
return parse_step.bind(this)([null, tokens]);};
function AbortIf(cond_fn) {
this.cond_fn = cond_fn;
}
Parser.prototype[ParseInstruction] = function (result) {
for  (let instruction of this['instructions']) {
if (truthy(instruction instanceof AbortIf)) {
if (truthy(call.bind(instruction['cond_fn'])(result))) {
return;
} else {
continue;
};
};
result = parse_step.bind(instruction)(result)
};
return result;};
function ParseMap(entries) {
this.entries = entries;
}
ParseMap.prototype[Record] = new ObjectLiteral({['keys']() {
return into.bind(map.bind(this['entries'])(first))(Set[Meta]['[]'].call(Set, ));
}});
ParseMap.prototype[Call] = function (tokens, ...args) {
if (truthy(empty__q.bind(tokens)())) {
return;
};
for  (let [pattern, parser] of this['entries']) {
if (truthy(equals__q.call(pattern, _))) {
return call.bind(parser)(tokens, ...args);
};
if (truthy(and.call(pattern instanceof Set, () => call.bind(pattern)(at.bind(first.bind(tokens)())(Keyword.for("type")))))) {
return call.bind(parser)(tokens, ...args);
};
if (truthy(and.call(pattern instanceof Array, () => all__q.bind(zip.bind(pattern)(tokens))(function ([p, token]) {
let __coil_if_let_temp = token;
if (truthy(__coil_if_let_temp)) {
let {'type': type} = __coil_if_let_temp;
if (truthy(p instanceof Keyword)) {
return equals__q.call(p, type);
};
if (truthy(p instanceof Set)) {
return has__q.bind(p)(type);
};
} else {
return false;
};})))) {
return call.bind(parser)(tokens, ...args);
};
if (truthy(and.call(pattern instanceof Keyword, () => equals__q.call(pattern, at.bind(first.bind(tokens)())(Keyword.for("type")))))) {
return call.bind(parser)(tokens, ...args);
};
};};
let math_ops = Set[Meta]['[]'].call(Set, Keyword.for("mod"), Keyword.for("plus"), Keyword.for("minus"), Keyword.for("times"), Keyword.for("pow"), Keyword.for("div"));
let comparison_ops = Set[Meta]['[]'].call(Set, Keyword.for("lt"), Keyword.for("gt"), Keyword.for("lt_eq"), Keyword.for("gt_eq"));
let all_math_ops = concat.bind(math_ops)(comparison_ops);
function parse_double_eq(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("double_equals"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("double_eq")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_not_eq(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("not_equals"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("not_eq")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_triple_eq(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("triple_equals"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("triple_eq")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_triple_not_eq(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("triple_not_equals"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("triple_not_eq")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_and_and(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("and_and"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("and_and")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("rhs"))))(tokens);}
function parse_or_or(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("or_or"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("or_or")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("rhs"))))(tokens);}
function parse_nullish(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("nullish"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("nullish")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("rhs"))))(tokens);}
function parse_comparison_op(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("math_op"), 'lhs':lhs})), Either[Meta]['[]'].call(Either, comparison_ops, Keyword.for("op")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_third_expr_step(tokens, lhs) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("double_eq"), parse_double_eq], [Keyword.for("triple_eq"), parse_triple_eq], [Keyword.for("triple_not_eq"), parse_triple_not_eq], [Keyword.for("not_eq"), parse_not_eq], [Keyword.for("and_and"), parse_and_and], [Keyword.for("or_or"), parse_or_or], [Keyword.for("nullish"), parse_nullish], [comparison_ops, parse_comparison_op]]))(tokens, lhs);}
function parse_third_expr([lhs, tokens]) {
let __coil_while_let_temp = parse_third_expr_step(tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
lhs = new_lhs
tokens = rest
__coil_while_let_temp = parse_third_expr_step(tokens, lhs);
};
return [lhs, tokens];}
function parse_partial_obj_dyn_access(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("partial_obj_dyn_access")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_sq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq"))))(tokens);}
function parse_partial_fn_call(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("partial_fn_call")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_p")), Until[Meta]['[]'].call(Until, Keyword.for("close_p"), parse_expr, Keyword.for("args")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_p"))))(tokens);}
function parse_and_dot(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("and_dot"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("single_and"), Keyword.for("dot")), Case[Meta]['[]'].call(Case, ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("id"), parse_id], [Keyword.for("open_sq"), parse_partial_obj_dyn_access], [Keyword.for("open_p"), parse_partial_fn_call]]), Keyword.for("rhs"))))(tokens);}
function parse_dot(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("property_lookup"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot")), Either[Meta]['[]'].call(Either, Set[Meta]['[]'].call(Set, Keyword.for("id"), Keyword.for("from")), Keyword.for("property"))))(tokens);}
function parse_infix_bind(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("bind"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("double_colon")), Case[Meta]['[]'].call(Case, ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("id"), parse_id], [Keyword.for("fn"), parse_fn], [all_math_ops, parse_unapplied_math_op], [Keyword.for("open_p"), parse_paren_expr]]), Keyword.for("expr"))))(tokens);}
function parse_is(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("is"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("is")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_snd_assign(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("snd_assign"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("rhs"))))(tokens);}
function parse_math_op(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("math_op"), 'lhs':lhs})), Either[Meta]['[]'].call(Either, math_ops, Keyword.for("op")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("rhs"))))(tokens);}
function not_adjacent__q([_expr, tokens]) {
let current = first.bind(tokens)();
let previous = at.bind(tokens['collection'])(minus.call(tokens['idx'],(1)));
if (truthy(negate.call(equals__q.call(current['line'], previous['line'])))) {
return true;
};
let end_of_prev_token = plus.call(previous['col'],previous['value']['length']);
return greater_than_eq.call((minus.call(current['col'],end_of_prev_token)),(1));}
function parse_adjacent_1_2_expr(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Then[Meta]['[]'].call(Then, parse_1_2_expr)))(tokens);}
function parse_inclusive_range(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("inclusive_range"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot"), Keyword.for("eq")), Optional[Meta]['[]'].call(Optional, keys.bind(SINGLE_EXPR_PARSE_MAP)(), parse_adjacent_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_exclusive_range(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("exclusive_range"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot")), Optional[Meta]['[]'].call(Optional, keys.bind(SINGLE_EXPR_PARSE_MAP)(), parse_adjacent_1_2_expr, Keyword.for("rhs"))))(tokens);}
function parse_fn_call(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("fn_call"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_p")), Until[Meta]['[]'].call(Until, Keyword.for("close_p"), parse_expr, Keyword.for("args")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_p"))))(tokens);}
function parse_record_lookup(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("record_lookup"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_record_entry, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b"))))(tokens, lhs);}
function parse_dynamic_access(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("dynamic_access"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_sq")), Until[Meta]['[]'].call(Until, Keyword.for("close_sq"), parse_expr, Keyword.for("exprs")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq"))))(tokens);}
let assignable_ops = concat.bind(math_ops)([Keyword.for("or_or"), Keyword.for("and_and")]);
function parse_op_eq(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("op_eq"), 'lhs':lhs})), Either[Meta]['[]'].call(Either, assignable_ops, Keyword.for("op")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("rhs"))))(tokens);}
function parse_raw_dynamic_access(tokens, lhs) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("raw_dynamic_access"), 'lhs':lhs})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot"), Keyword.for("open_sq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq"))))(tokens);}
function parse_snd_expr_step(tokens, lhs) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("open_p"), parse_fn_call], [Keyword.for("double_colon"), parse_infix_bind], [Keyword.for("open_sq"), parse_dynamic_access], [Keyword.for("open_b"), parse_record_lookup], [Keyword.for("is"), parse_is], [Keyword.for("eq"), parse_snd_assign], [[Keyword.for("dot"), Keyword.for("open_sq")], parse_raw_dynamic_access], [Keyword.for("dot"), parse_dot], [[Keyword.for("single_and"), Keyword.for("dot")], parse_and_dot], [[Keyword.for("dot_dot"), Keyword.for("eq")], parse_inclusive_range], [Keyword.for("dot_dot"), parse_exclusive_range], [[assignable_ops, Keyword.for("eq")], parse_op_eq], [math_ops, parse_math_op]]))(tokens, lhs);}
function parse_snd_expr([lhs, tokens]) {
let __coil_while_let_temp = parse_snd_expr_step(tokens, lhs);
while (__coil_while_let_temp) {
let [new_lhs, rest] = __coil_while_let_temp;
lhs = new_lhs
tokens = rest
__coil_while_let_temp = parse_snd_expr_step(tokens, lhs);
};
return [lhs, tokens];}
function parse_call_expr(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_p")), Until[Meta]['[]'].call(Until, Keyword.for("close_p"), parse_expr), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_p"))))(tokens);}
function parse_decorator_expr(tokens) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("id"), parse_expr]]))(tokens);}
function parse_multi_decorator(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("multi_decorator")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("at"), Keyword.for("open_sq")), Until[Meta]['[]'].call(Until, Keyword.for("close_sq"), parse_decorator_expr, Keyword.for("decorators")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq")), Then[Meta]['[]'].call(Then, parse_fn, Keyword.for("fn_def"))))(tokens);}
function parse_decorator(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("decorator")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("at")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")), Optional[Meta]['[]'].call(Optional, Keyword.for("open_p"), parse_call_expr, Keyword.for("args")), Then[Meta]['[]'].call(Then, parse_fn, Keyword.for("fn_def"))))(tokens);}
let parse_regex = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("regex_lit")})), One[Meta]['[]'].call(One, Keyword.for("regex_lit"), Keyword.for("value")));
let parse_str = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("str")})), One[Meta]['[]'].call(One, Keyword.for("string_lit"), Keyword.for("value")));
let valid_ids_in_all_contexts = Set[Meta]['[]'].call(Set, Keyword.for("id"), Keyword.for("from"), Keyword.for("as"));
let parse_id = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("id_lookup")})), Either[Meta]['[]'].call(Either, push.bind(valid_ids_in_all_contexts)(Keyword.for("import")), Keyword.for("name")));
function parse_reg_obj_entry(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("reg_obj_entry")})), Either[Meta]['[]'].call(Either, Set[Meta]['[]'].call(Set, Keyword.for("id"), Keyword.for("num")), Keyword.for("key")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("value"))))(tokens);}
let parse_obj_shorthand_entry = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("obj_shorthand_entry")})), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("id")));
function parse_dynamic_obj_entry(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("dynamic_obj_entry")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_sq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("key_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq"), Keyword.for("colon")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("value"))))(tokens);}
function parse_spread_obj_entry(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("spread_obj_entry")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot_dot")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_obj_entry(tokens) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("open_sq"), parse_dynamic_obj_entry], [Keyword.for("dot_dot_dot"), parse_spread_obj_entry], [Keyword.for("fn"), parse_fn], [[Keyword.for("async"), Keyword.for("fn")], parse_fn], [[Keyword.for("id"), Keyword.for("colon")], parse_reg_obj_entry], [[Keyword.for("num"), Keyword.for("colon")], parse_reg_obj_entry], [Keyword.for("id"), parse_obj_shorthand_entry]]))(tokens);}
function parse_obj(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("obj_lit")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_obj_entry, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b"))))(tokens);}
let parse_spread_assign = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("spread_assign")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot_dot")), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("name")));
let parse_assign_id = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("id_assign")})), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("name")));
function parse_assign_array_entry(tokens) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("id"), parse_assign_id], [Keyword.for("open_sq"), parse_assign_array], [Keyword.for("dot_dot_dot"), parse_spread_assign]]))(tokens);}
let parse_assign_array = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("array_deconstruction")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_sq")), Until[Meta]['[]'].call(Until, Keyword.for("close_sq"), parse_assign_array_entry, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq")));
let parse_obj_entry_rename = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("obj_entry_rename")})), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("old_name")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("new_name")));
let parse_regular_obj_assign_entry = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("obj_reg_entry")})), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("name")));
let parse_string_obj_assign_entry = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("obj_str_rename_entry")})), One[Meta]['[]'].call(One, Keyword.for("string_lit"), Keyword.for("old_name")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("new_name")));
let parse_obj_assign_entry = ParseMap[Meta]['{}'].call(ParseMap, [[[Keyword.for("id"), Keyword.for("colon")], parse_obj_entry_rename], [Keyword.for("id"), parse_regular_obj_assign_entry], [Keyword.for("string_lit"), parse_string_obj_assign_entry], [Keyword.for("dot_dot_dot"), parse_spread_assign]]);
let parse_assign_obj = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("object_deconstruction")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_obj_assign_entry, Keyword.for("entries")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b")));
let parse_this_assign = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("this_assign")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("at")), Either[Meta]['[]'].call(Either, valid_ids_in_all_contexts, Keyword.for("name")));
let parse_assign_expr = ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("id"), parse_assign_id], [Keyword.for("open_sq"), parse_assign_array], [Keyword.for("open_b"), parse_assign_obj], [Keyword.for("dot_dot_dot"), parse_spread_assign], [Keyword.for("at"), parse_this_assign]]);
let parse_keyword = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("keyword")})), One[Meta]['[]'].call(One, Keyword.for("keyword"), Keyword.for("value")));
function parse_paren_expr(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("paren_expr")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_p")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_p"))))(tokens);}
function parse_yield(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("yield")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("yield")), Optional[Meta]['[]'].call(Optional, Keyword.for("times"), parse_gen_modifier, Keyword.for("star?")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_await(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("await")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("await")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
let parse_num = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("num")})), One[Meta]['[]'].call(One, Keyword.for("num"), Keyword.for("value")));
let parse_custom_number_literal = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("custom_number_literal")})), One[Meta]['[]'].call(One, Keyword.for("custom_number_literal"), Keyword.for("value")));
function parse_array(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("array")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_sq")), Until[Meta]['[]'].call(Until, Keyword.for("close_sq"), parse_expr, Keyword.for("elements")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_sq"))))(tokens);}
function parse_spread(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("spread")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot_dot")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
let parse_unapplied_math_op = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("unapplied_math_op")})), Either[Meta]['[]'].call(Either, all_math_ops, Keyword.for("op")));
function parse_bind_this(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("bind_this")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("double_colon")), Case[Meta]['[]'].call(Case, ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("id"), parse_id], [Keyword.for("fn"), parse_fn], [all_math_ops, parse_unapplied_math_op], [Keyword.for("open_p"), parse_paren_expr]]), Keyword.for("expr"))))(tokens);}
function parse_not(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("not")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("bang")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("expr"))))(tokens);}
function parse_num_raw(tokens) {
return pipe.bind(call.bind(parse_num)(tokens))(function ([expr, tokens]) {
return [as_num.bind(at.bind(expr)(Keyword.for("value")))(), tokens];});}
let parse_adjacent_num_raw = Parser[Meta]['[]'].call(Parser, AbortIf[Meta]['[]'].call(AbortIf, not_adjacent__q), Then[Meta]['[]'].call(Then, parse_num_raw));
let parse_unapplied_and_and = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("unapplied_and_and")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("and_and")));
let parse_unapplied_or_or = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("unapplied_or_or")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("or_or")));
let parse_async_modifier = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, true), Chomp[Meta]['[]'].call(Chomp, Keyword.for("async")));
let parse_unapplied_nullish = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("unapplied_nullish")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("nullish")));
let parse_gen_modifier = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, true), Chomp[Meta]['[]'].call(Chomp, Keyword.for("times")));
function parse_fn_expr_body(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("return")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), FMap[Meta]['[]'].call(FMap, function (node) {
return [node];})))(tokens);}
function parse_args_def(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_p")), Until[Meta]['[]'].call(Until, Keyword.for("close_p"), parse_assign_expr), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_p"))))(tokens);}
function parse_fn_name(tokens) {
return pipe.bind(call.bind(parse_id)(tokens))(function ([expr, tokens]) {
return [at.bind(expr)(Keyword.for("name")), tokens];});}
function parse_fn(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("fn")})), Optional[Meta]['[]'].call(Optional, Keyword.for("async"), parse_async_modifier, Keyword.for("is_async?")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("fn")), Optional[Meta]['[]'].call(Optional, Keyword.for("times"), parse_gen_modifier, Keyword.for("generator?")), Optional[Meta]['[]'].call(Optional, Keyword.for("id"), parse_fn_name, Keyword.for("name")), Optional[Meta]['[]'].call(Optional, Keyword.for("open_p"), parse_args_def, Keyword.for("args")), Case[Meta]['[]'].call(Case, ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("eq"), parse_fn_expr_body], [Keyword.for("open_b"), block()]]), Keyword.for("body"))))(tokens);}
function parse_keyword_record_entry(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("keyword_record_entry")})), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_regular_record_entry(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("regular_record_entry")})), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("key_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("arrow")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("value_expr"))))(tokens);}
function parse_record_entry(tokens) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("dot_dot_dot"), parse_spread], [[Keyword.for("id"), Keyword.for("colon")], parse_keyword_record_entry], [_, parse_regular_record_entry]]))(tokens);}
function parse_prefix_exclusive_range(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("prefix_exclusive_range")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("dot_dot")), Then[Meta]['[]'].call(Then, parse_1_2_expr, Keyword.for("expr"))))(tokens);}
let SINGLE_EXPR_PARSE_MAP = ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("string_lit"), parse_str], [Keyword.for("regex_lit"), parse_regex], [Keyword.for("keyword"), parse_keyword], [Keyword.for("open_p"), parse_paren_expr], [Keyword.for("yield"), parse_yield], [Keyword.for("await"), parse_await], [Keyword.for("num"), parse_num], [Keyword.for("custom_number_literal"), parse_custom_number_literal], [Keyword.for("open_sq"), parse_array], [Keyword.for("dot_dot_dot"), parse_spread], [Keyword.for("double_colon"), parse_bind_this], [Keyword.for("bang"), parse_not], [Keyword.for("open_b"), parse_obj], [Keyword.for("and_and"), parse_unapplied_and_and], [Keyword.for("or_or"), parse_unapplied_or_or], [Keyword.for("nullish"), parse_unapplied_nullish], [Keyword.for("dot_dot"), parse_prefix_exclusive_range], [push.bind(valid_ids_in_all_contexts)(Keyword.for("import")), parse_id], [[Keyword.for("at"), Keyword.for("open_sq")], parse_multi_decorator], [Keyword.for("at"), parse_decorator], [[Keyword.for("async"), Keyword.for("fn")], parse_fn], [Keyword.for("fn"), parse_fn], [all_math_ops, parse_unapplied_math_op]]);
function parse_single_expr(tokens) {
return call.bind(SINGLE_EXPR_PARSE_MAP)(tokens);}
function parse_1_2_expr(tokens) {
return pipe.bind(parse_single_expr(tokens))(parse_snd_expr);}
function parse_expr(tokens) {
return pipe.bind(pipe.bind(parse_single_expr(tokens))(parse_snd_expr))(parse_third_expr);}
function parse_else_branch(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("else")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("else")), block(Keyword.for("body"))))(tokens);}
function parse_else_if_branch(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("else_if")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("else"), Keyword.for("if")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), block(Keyword.for("pass")), Optional[Meta]['[]'].call(Optional, Keyword.for("else"), parse_if_branch, Keyword.for("fail"))))(tokens);}
function parse_if_branch(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Case[Meta]['[]'].call(Case, ParseMap[Meta]['{}'].call(ParseMap, [[[Keyword.for("else"), Keyword.for("if")], parse_else_if_branch], [Keyword.for("else"), parse_else_branch]]))))(tokens);}
function parse_if(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("if")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("if")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), block(Keyword.for("pass")), Optional[Meta]['[]'].call(Optional, Keyword.for("else"), parse_if_branch, Keyword.for("fail"))))(tokens);}
let parse_let = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("let")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("let")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("rhs")));
function parse_if_let(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("if_let")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("if"), Keyword.for("let")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_statement, Keyword.for("pass")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b")), Optional[Meta]['[]'].call(Optional, Keyword.for("else"), parse_else_branch, Keyword.for("fail"))))(tokens);}
let parse_impl_for = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("impl_for")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("impl")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("proto_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("for")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("constructor")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")));
let parse_define = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("define_for")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("define")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("proto_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("for")), Then[Meta]['[]'].call(Then, parse_single_expr, Keyword.for("src_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")));
let parse_protocol = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("protocol_def")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("protocol")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")));
let parse_return = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("return")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("return")), Optional[Meta]['[]'].call(Optional, keys.bind(SINGLE_EXPR_PARSE_MAP)(), parse_expr, Keyword.for("expr")));
let parse_await_modifier = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, true), Chomp[Meta]['[]'].call(Chomp, Keyword.for("await")));
function parse_for_loop(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("for_loop")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("for")), Optional[Meta]['[]'].call(Optional, Keyword.for("await"), parse_await_modifier, Keyword.for("is_await?")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("of")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("iterable_expr")), block(Keyword.for("body"))))(tokens);}
function parse_loop(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("loop")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("loop")), block(Keyword.for("body"))))(tokens);}
function parse_while_loop(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("while_loop")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("while")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("test_expr")), block(Keyword.for("body"))))(tokens);}
function parse_while_let_loop(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("while_let_loop")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("while"), Keyword.for("let")), Then[Meta]['[]'].call(Then, parse_assign_expr, Keyword.for("assign_expr")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("test_expr")), block(Keyword.for("body"))))(tokens);}
function parse_continue(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("continue")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("continue"))))(tokens);}
function parse_break(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("break")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("break"))))(tokens);}
function parse_catch(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("catch")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("catch")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")), block(Keyword.for("body"))))(tokens);}
function parse_finally(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("finally")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("finally")), block(Keyword.for("body"))))(tokens);}
function parse_try(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("try")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("try")), block(Keyword.for("body")), Optional[Meta]['[]'].call(Optional, Keyword.for("catch"), parse_catch, Keyword.for("catch")), Optional[Meta]['[]'].call(Optional, Keyword.for("finally"), parse_finally, Keyword.for("finally"))))(tokens);}
let parse_impl_object = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("impl_object")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("impl")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("constructor")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("eq")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr")));
let parse_assign_all_as = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("assign_all_as")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("times"), Keyword.for("as")), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("name")));
function parse_import_assign_expr(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Case[Meta]['[]'].call(Case, ParseMap[Meta]['{}'].call(ParseMap, [[[Keyword.for("times"), Keyword.for("as")], parse_assign_all_as], [_, parse_assign_expr]]))))(tokens);}
function parse_import(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("import")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("import")), Until[Meta]['[]'].call(Until, Keyword.for("from"), parse_import_assign_expr, Keyword.for("assign_exprs")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("from")), Then[Meta]['[]'].call(Then, parse_str, Keyword.for("path"))))(tokens);}
function parse_export(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("export")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("export")), Then[Meta]['[]'].call(Then, parse_statement, Keyword.for("statement"))))(tokens);}
let parse_export_all = Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("export_all")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("export"), Keyword.for("times"), Keyword.for("from")), One[Meta]['[]'].call(One, Keyword.for("string_lit"), Keyword.for("path")));
function parse_export_default(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("export_default")})), Chomp[Meta]['[]'].call(Chomp, Keyword.for("export"), Keyword.for("default")), Then[Meta]['[]'].call(Then, parse_expr, Keyword.for("expr"))))(tokens);}
function parse_label(tokens) {
return call.bind(Parser[Meta]['[]'].call(Parser, Init[Meta]['[]'].call(Init, new ObjectLiteral({'type': Keyword.for("label")})), One[Meta]['[]'].call(One, Keyword.for("id"), Keyword.for("label_name")), Chomp[Meta]['[]'].call(Chomp, Keyword.for("colon")), Then[Meta]['[]'].call(Then, parse_statement, Keyword.for("statement"))))(tokens);}
function parse_statement(tokens) {
return call.bind(ParseMap[Meta]['{}'].call(ParseMap, [[Keyword.for("let"), parse_let], [Keyword.for("for"), parse_for_loop], [Keyword.for("define"), parse_define], [Keyword.for("try"), parse_try], [Keyword.for("protocol"), parse_protocol], [Keyword.for("return"), parse_return], [Keyword.for("continue"), parse_continue], [Keyword.for("break"), parse_break], [Keyword.for("loop"), parse_loop], [Keyword.for("import"), parse_import], [[Keyword.for("export"), Keyword.for("default")], parse_export_default], [[Keyword.for("export"), Keyword.for("times")], parse_export_all], [Keyword.for("export"), parse_export], [[Keyword.for("impl"), Keyword.for("id"), Keyword.for("eq")], parse_impl_object], [Keyword.for("impl"), parse_impl_for], [[Keyword.for("while"), Keyword.for("let")], parse_while_let_loop], [Keyword.for("while"), parse_while_loop], [[Keyword.for("if"), Keyword.for("let")], parse_if_let], [Keyword.for("if"), parse_if], [[Keyword.for("id"), Keyword.for("colon")], parse_label], [_, parse_expr]]))(tokens);}
function block(name) {
return Parser[Meta]['[]'].call(Parser, Chomp[Meta]['[]'].call(Chomp, Keyword.for("open_b")), Until[Meta]['[]'].call(Until, Keyword.for("close_b"), parse_statement, name), Chomp[Meta]['[]'].call(Chomp, Keyword.for("close_b")));}
function parse(tokens) {
let ast = [];
let __coil_while_let_temp = call.bind(parse_statement)(tokens);
while (__coil_while_let_temp) {
let [statement_or_expr, rest] = __coil_while_let_temp;
ast['push'](statement_or_expr)
tokens = rest
__coil_while_let_temp = call.bind(parse_statement)(tokens);
};
return ast;}
function map_join(f, separator) {
return reduce.bind(map.bind(this)(f))(function (acc, cur) {
if (truthy(empty__q.bind(acc)())) {
return cur;
} else {
return plus.call(acc,plus.call(separator,cur));
};}, "");}
function resolve_name(name) {
if (truthy(name)) {
return name['replaceAll']("?", "__q")['replaceAll']("!", "__b")['replaceAll'](">", "_lt_")['replaceAll']("-", "_");
};
return name;}
function eval_if_branch(branch) {
if (truthy(nil__q.bind(branch)())) {
return "";
} else if (equals__q.call(at.bind(branch)(Keyword.for("type")), Keyword.for("else"))) {
return str(" else {\n", eval_ast(or.call(at.bind(branch)(Keyword.for("body")), () => [])), "\n}");
} else {
if (truthy(equals__q.call(at.bind(branch)(Keyword.for("type")), Keyword.for("else_if")))) {
return str(" else if (", eval_expr(at.bind(branch)(Keyword.for("expr"))), ") {\n", eval_ast(or.call(at.bind(branch)(Keyword.for("pass")), () => [])), "\n}", eval_if_branch(at.bind(branch)(Keyword.for("fail"))));
} else {
raise__b(Error[Meta]['[]'].call(Error, "Expected else if"))
};
};}
function eval_if({'expr': expr, 'pass': pass, 'fail': fail}) {
return str("if (truthy(", eval_expr(expr), ")) {\n", eval_ast(pass), "\n", "}", eval_if_branch(fail));}
function eval_str({'value': value}) {
value = value['slice']((1), (-1))
if (truthy(value['includes']("\n"))) {
return str("`", value, "`");
} else {
return str("\"", value, "\"");
};}
let RESERVED_IDS = Set[Meta]['[]'].call(Set, "import");
function eval_property_lookup({'lhs': lhs, 'property': property}) {
let lhs_js = eval_expr(lhs);
if (truthy(has__q.bind(RESERVED_IDS)(lhs_js))) {
return str(lhs_js, ".", property);
} else {
return str(lhs_js, "['", property, "']");
};}
function eval_fn_call({'lhs': lhs, 'args': args}) {
return str(eval_expr(lhs), "(", map_join.bind(args)(eval_expr, ", "), ")");}
function eval_id_assign_name({'name': name}) {
return resolve_name(name);}
function eval_spread_assign({'name': name}) {
return str("...", resolve_name(name));}
function eval_array_deconstruction_entry(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("array_deconstruction"), eval_array_deconstruction_names]])))(node);}
function eval_array_deconstruction_names({'entries': entries}) {
return str("[", map_join.bind(entries)(eval_array_deconstruction_entry, ", "), "]");}
function eval_obj_reg_entry({'name': name}) {
return str("'", name, "': ", resolve_name(name));}
function eval_obj_entry_rename({'old_name': old_name, 'new_name': new_name}) {
return str("'", old_name, "': ", resolve_name(new_name));}
function eval_obj_deconstruction_entry(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("obj_reg_entry"), eval_obj_reg_entry], [Keyword.for("obj_entry_rename"), eval_obj_entry_rename], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("obj_str_rename_entry"), function ({'old_name': old_name, 'new_name': new_name}) {
return str(old_name, ": ", resolve_name(new_name));}]])))(node);}
function eval_object_deconstruction_names({'entries': entries}) {
return str("{", map_join.bind(entries)(eval_obj_deconstruction_entry, ", "), "}");}
function eval_this_assign({'name': name}) {
return name;}
function eval_assign_all_as({'name': name}) {
return str("* as ", name);}
function eval_assign_expr(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("spread_assign"), eval_spread_assign], [Keyword.for("array_deconstruction"), eval_array_deconstruction_names], [Keyword.for("object_deconstruction"), eval_object_deconstruction_names], [Keyword.for("this_assign"), eval_this_assign]])))(node);}
function eval_while_let_loop({'assign_expr': assign_expr, 'test_expr': test_expr, 'body': body}) {
return str("let __coil_while_let_temp = ", eval_expr(test_expr), ";\n", "while (__coil_while_let_temp) {\n", "let ", eval_assign_expr(assign_expr), " = __coil_while_let_temp;\n", eval_ast(body), "\n", "__coil_while_let_temp = ", eval_expr(test_expr), ";\n", "}");}
function eval_if_let({'assign_expr': assign_expr, 'expr': expr, 'pass': pass, 'fail': fail}) {
return str("let __coil_if_let_temp = ", eval_expr(expr), ";\n", "if (truthy(__coil_if_let_temp)) {\n", "let ", eval_assign_expr(assign_expr), " = __coil_if_let_temp;\n", eval_ast(pass), "\n", "}", eval_if_branch(fail));}
function eval_spread({'expr': expr}) {
return str("...", eval_expr(expr));}
function eval_let({'assign_expr': assign_expr, 'rhs': rhs}) {
return str("let ", eval_assign_expr(assign_expr), " = ", eval_expr(rhs));}
function eval_array({'elements': elements}) {
return str("[", map_join.bind(elements)(eval_expr, ", "), "]");}
let math_op_to_method = Map[Meta]['{}'].call(Map, [[">", "greater_than"], ["<", "less_than"], [">=", "greater_than_eq"], ["<=", "less_than_eq"], ["*", "times"], ["**", "exponent"], ["/", "divide_by"], ["+", "plus"], ["-", "minus"], ["%", "mod"]]);
function eval_math_op({'lhs': lhs, 'op': op, 'rhs': rhs}) {
return str(call.bind(math_op_to_method)(op), ".call(", eval_expr(lhs), ",", eval_expr(rhs), ")");}
function eval_this_assignments(args) {
return into.bind(map.bind(keep.bind(args)(equals__q.call(at.bind(_)(Keyword.for("type")), Keyword.for("this_assign"))))(function ({'name': name}) {
return str("this.", name, " = ", name, ";\n");}))("");}
function eval_fn({'is_async?': is_async__q, 'generator?': generator__q, 'name': name, 'args': args, 'body': body}) {
return str((and.call(is_async__q, () => "async ")), "function ", (and.call(generator__q, () => "*")), resolve_name(name), "(", map_join.bind(args)(eval_assign_expr, ", "), ") {\n", eval_this_assignments(args), eval_ast(body), "}");}
function eval_bind({'lhs': lhs, 'expr': expr}) {
return str(eval_expr(expr), ".bind(", eval_expr(lhs), ")");}
function eval_reg_obj_entry({'key': key, 'value': value}) {
return str("'", key, "': ", eval_expr(value));}
function eval_obj_shorthand_entry({'id': id}) {
return str("'", id, "':", resolve_name(id));}
function eval_dynamic_obj_entry({'key_expr': key_expr, 'value': value}) {
return str("[", eval_expr(key_expr), "]: ", eval_expr(value));}
function eval_obj_fn({'name': name, 'generator?': generator__q, 'is_async?': is_async__q, 'args': args, 'body': body}) {
return str((and.call(is_async__q, () => "async ")), (and.call(generator__q, () => "*")), "['", name, "'](", map_join.bind(args)(eval_assign_expr, ", "), ") {\n", eval_ast(body), "\n}");}
function eval_obj_entry(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("reg_obj_entry"), eval_reg_obj_entry], [Keyword.for("obj_shorthand_entry"), eval_obj_shorthand_entry], [Keyword.for("dynamic_obj_entry"), eval_dynamic_obj_entry], [Keyword.for("spread_obj_entry"), eval_spread], [Keyword.for("fn"), eval_obj_fn]])))(node);}
function eval_obj_lit({'entries': entries}) {
return str("new ObjectLiteral({", map_join.bind(entries)(eval_obj_entry, ", "), "})");}
function eval_bind_this({'expr': expr}) {
return str(eval_expr(expr), ".bind(this)");}
function eval_id_lookup({'name': name}) {
return resolve_name(name);}
function eval_num({'value': value}) {
return str("(", value, ")");}
function eval_custom_number_literal({'value': value}) {
let [num] = value['split'](/[a-zA-Z]+/);
let modifier = value['slice'](num['length']);
return str("Keyword.for(\"custom_number_literal/", modifier, "\")[CustomNumberLiteral](", num, ")");}
function eval_double_equals({'lhs': lhs, 'rhs': rhs}) {
return str(resolve_name("equals?"), ".call(", eval_expr(lhs), ", ", eval_expr(rhs), ")");}
function eval_not_equals(node) {
return str("negate.call(", eval_double_equals(node), ")");}
function eval_not({'expr': expr}) {
return str("negate.call(", eval_expr(expr), ")");}
function eval_dynamic_access({'lhs': lhs, 'exprs': exprs}) {
let lhs_js = eval_expr(lhs);
return str(lhs_js, "[Meta]['[]'].call(", lhs_js, ", ", map_join.bind(exprs)(eval_expr, ", "), ")");}
function eval_record_lookup({'lhs': lhs, 'entries': entries}) {
let lhs_js = eval_expr(lhs);
let entries_js = map_join.bind(entries)(eval_record_entry, ", ");
return str(lhs_js, "[Meta]['{}'].call(", lhs_js, ", [", entries_js, "])");}
function eval_triple_equals({'lhs': lhs, 'rhs': rhs}) {
return str(eval_expr(lhs), " === ", eval_expr(rhs));}
function eval_triple_not_equals({'lhs': lhs, 'rhs': rhs}) {
return str(eval_expr(lhs), " !== ", eval_expr(rhs));}
function eval_is({'lhs': lhs, 'rhs': rhs}) {
return str(eval_expr(lhs), " instanceof ", eval_expr(rhs));}
function eval_and_and({'lhs': lhs, 'rhs': rhs}) {
return str("and.call(", eval_expr(lhs), ", () => ", eval_expr(rhs), ")");}
function eval_or_or({'lhs': lhs, 'rhs': rhs}) {
return str("or.call(", eval_expr(lhs), ", () => ", eval_expr(rhs), ")");}
function eval_nullish({'lhs': lhs, 'rhs': rhs}) {
return str("nullish.call(", eval_expr(lhs), ", () => ", eval_expr(rhs), ")");}
function eval_dynamic_access_assign({'lhs': lhs, 'rhs': rhs}) {
let {'lhs': obj, 'exprs': exprs} = lhs;
let obj_js = eval_expr(obj);
return str(obj_js, "[Meta]['[]='].call(", obj_js, ", [", map_join.bind(exprs)(eval_expr, ", "), "], ", eval_expr(rhs), ")");}
function eval_general_snd_assign({'lhs': lhs, 'rhs': rhs}) {
return str(eval_expr(lhs), " = ", eval_expr(rhs));}
function eval_snd_assign(node) {
return call.bind(pipe.bind(node)(Keyword.for("lhs"), Keyword.for("type"), Map[Meta]['{}'].call(Map, [[Keyword.for("dynamic_access"), eval_dynamic_access_assign], [Keyword.for("id_lookup"), eval_general_snd_assign], [Keyword.for("property_lookup"), eval_general_snd_assign], [Keyword.for("raw_dynamic_access"), eval_general_snd_assign]])))(node);}
function eval_await({'expr': expr}) {
return str("await ", eval_expr(expr));}
function eval_yield({'star?': star__q, 'expr': expr}) {
return str("yield", (and.call(star__q, () => "*")), " ", eval_expr(expr));}
function eval_paren_expr({'expr': expr}) {
return str("(", eval_expr(expr), ")");}
function eval_unapplied_math_op({'op': op}) {
return call.bind(math_op_to_method)(op);}
function eval_unapplied_and_and() {
return "and";}
function eval_unapplied_or_or() {
return "or";}
function eval_unapplied_nullish() {
return "nullish";}
function eval_keyword({'value': value}) {
return str("Keyword.for(\"", value['slice']((1)), "\")");}
function eval_regular_record_entry({'key_expr': key_expr, 'value_expr': value_expr}) {
return str("[", eval_expr(key_expr), ", ", eval_expr(value_expr), "]");}
function eval_keyword_record_entry({'name': name, 'expr': expr}) {
return str("[", eval_keyword(new ObjectLiteral({'value': str(":", name)})), ", ", eval_expr(expr), "]");}
function eval_record_entry(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("regular_record_entry"), eval_regular_record_entry], [Keyword.for("keyword_record_entry"), eval_keyword_record_entry], [Keyword.for("spread"), eval_spread]])))(node);}
function eval_inclusive_range({'lhs': lhs, 'rhs': rhs}) {
if (truthy(rhs)) {
return str("new IRange(", eval_expr(lhs), ", ", eval_expr(rhs), ")");
} else {
return str("new IRangeNoMax(", eval_expr(lhs), ")");
};}
function eval_exclusive_range({'lhs': lhs, 'rhs': rhs}) {
if (truthy(rhs)) {
return str("new ERange(", eval_expr(lhs), ", ", eval_expr(rhs), ")");
} else {
return str("new ERangeNoMax(", eval_expr(lhs), ")");
};}
function eval_multi_decorator({'decorators': decorators, 'fn_def': fn_def}) {
let fn_name = pipe.bind(fn_def)(Keyword.for("name"), resolve_name);
let decorator_fn_js = pipe.bind(join.bind(map.bind(decorators)(function (node) {
if (truthy(pipe.bind(node)(Keyword.for("type"), Set[Meta]['[]'].call(Set, Keyword.for("id_lookup"))))) {
return pipe.bind(node)(Keyword.for("name"), resolve_name);
} else {
let {'lhs': lhs, 'args': args} = node;
return str("F => ", eval_expr(lhs), "(F", pipe.bind(len.bind(args)())(Map[Meta]['{}'].call(Map, [[(0), ""]]), or.call(_, () => ", ")), map_join.bind(args)(eval_expr, ", "), ")");
};}))(", "))(function (decorators) {
return str("compose(", decorators, ")");});
return str("let ", fn_name, " = ", decorator_fn_js, "(", eval_expr(fn_def), ")");}
function eval_decorator({'name': decorator_name, 'fn_def': fn_def, 'args': args}) {
let fn_name = pipe.bind(fn_def)(Keyword.for("name"), resolve_name);
let fn_def_js = eval_fn(fn_def);
if (truthy(empty__q.bind(args)())) {
return str("let ", fn_name, " = ", decorator_name, "(", fn_def_js, ");");
} else {
return str("let ", fn_name, " = ", decorator_name, "(", fn_def_js, ", ", map_join.bind(args)(eval_expr, ", "), ");");
};}
function eval_and_dot({'lhs': lhs, 'rhs': rhs}) {
return str(eval_expr(lhs), "?.", eval_expr(rhs));}
function eval_partial_fn_call({'args': args}) {
return str("(", map_join.bind(args)(eval_expr, ", "), ")");}
function eval_partial_obj_dyn_access({'expr': expr}) {
return str("[", eval_expr(expr), "]");}
function eval_regex_lit({'value': value}) {
return value;}
let logic_ops = Map[Meta]['{}'].call(Map, [["||", "or"], ["&&", "and"]]);
let all_ops_to_method = merge.bind(math_op_to_method)(logic_ops);
function eval_rhs_based_on_op(op, rhs) {
if (truthy(has__q.bind(logic_ops)(op))) {
return str("() => ", eval_expr(rhs));
} else {
return eval_expr(rhs);
};}
function eval_op_eq({'lhs': lhs, 'op': op, 'rhs': rhs}) {
return str(eval_expr(lhs), " = ", call.bind(all_ops_to_method)(op), ".call(", eval_expr(lhs), ", ", eval_rhs_based_on_op(op, rhs), ")");}
function eval_prefix_exclusive_range({'expr': expr}) {
return str("new ERangeNoMin(", eval_expr(expr), ")");}
function eval_raw_dynamic_access({'lhs': lhs, 'expr': expr}) {
return str(eval_expr(lhs), "[", eval_expr(expr), "]");}
function eval_expr(node) {
return call.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("str"), eval_str], [Keyword.for("regex_lit"), eval_regex_lit], [Keyword.for("decorator"), eval_decorator], [Keyword.for("multi_decorator"), eval_multi_decorator], [Keyword.for("keyword"), eval_keyword], [Keyword.for("and_dot"), eval_and_dot], [Keyword.for("raw_dynamic_access"), eval_raw_dynamic_access], [Keyword.for("prefix_exclusive_range"), eval_prefix_exclusive_range], [Keyword.for("partial_fn_call"), eval_partial_fn_call], [Keyword.for("partial_obj_dyn_access"), eval_partial_obj_dyn_access], [Keyword.for("property_lookup"), eval_property_lookup], [Keyword.for("id_lookup"), eval_id_lookup], [Keyword.for("fn_call"), eval_fn_call], [Keyword.for("num"), eval_num], [Keyword.for("custom_number_literal"), eval_custom_number_literal], [Keyword.for("array"), eval_array], [Keyword.for("math_op"), eval_math_op], [Keyword.for("double_equals"), eval_double_equals], [Keyword.for("not_equals"), eval_not_equals], [Keyword.for("not"), eval_not], [Keyword.for("fn"), eval_fn], [Keyword.for("bind"), eval_bind], [Keyword.for("obj_lit"), eval_obj_lit], [Keyword.for("bind_this"), eval_bind_this], [Keyword.for("dynamic_access"), eval_dynamic_access], [Keyword.for("record_lookup"), eval_record_lookup], [Keyword.for("triple_equals"), eval_triple_equals], [Keyword.for("triple_not_equals"), eval_triple_not_equals], [Keyword.for("spread"), eval_spread], [Keyword.for("is"), eval_is], [Keyword.for("and_and"), eval_and_and], [Keyword.for("or_or"), eval_or_or], [Keyword.for("nullish"), eval_nullish], [Keyword.for("snd_assign"), eval_snd_assign], [Keyword.for("await"), eval_await], [Keyword.for("yield"), eval_yield], [Keyword.for("paren_expr"), eval_paren_expr], [Keyword.for("unapplied_math_op"), eval_unapplied_math_op], [Keyword.for("unapplied_and_and"), eval_unapplied_and_and], [Keyword.for("unapplied_or_or"), eval_unapplied_or_or], [Keyword.for("unapplied_nullish"), eval_unapplied_nullish], [Keyword.for("inclusive_range"), eval_inclusive_range], [Keyword.for("exclusive_range"), eval_exclusive_range], [Keyword.for("op_eq"), eval_op_eq]])))(node);}
function eval_return({'expr': expr}) {
if (truthy(expr)) {
return str("return ", eval_expr(expr));
} else {
return "return";
};}
function eval_protocol({'name': name}) {
return str("const ", resolve_name(name), " = Symbol(\"", name, "\")");}
function eval_impl_for({'proto_expr': proto_expr, 'constructor': constructor, 'expr': expr}) {
return str(constructor, ".prototype[", eval_expr(proto_expr), "] = ", eval_expr(expr));}
function eval_impl_object({'constructor': constructor, 'expr': expr}) {
return str(constructor, ".prototype = ", eval_expr(expr));}
function eval_define_for({'proto_expr': proto_expr, 'src_expr': src_expr, 'expr': expr}) {
return str(eval_expr(src_expr), "[", eval_expr(proto_expr), "] = ", eval_expr(expr));}
function eval_for_loop({'is_await?': is_await__q, 'assign_expr': assign_expr, 'iterable_expr': iterable_expr, 'body': body}) {
return str("for ", (and.call(is_await__q, () => "await ")), " (let ", eval_assign_expr(assign_expr), " of ", eval_expr(iterable_expr), ") {\n", eval_ast(body), "\n", "}");}
function eval_id_assign({'name': name, 'expr': expr}) {
return str(resolve_name(name), " = ", eval_expr(expr));}
function eval_while_loop({'test_expr': test_expr, 'body': body}) {
return str("while (", eval_expr(test_expr), ") {\n", eval_ast(body), "\n", "}");}
function eval_loop({'body': body}) {
return str("while (true) {\n", eval_ast(body), "\n", "}");}
function eval_continue() {
return "continue";}
function eval_break() {
return "break";}
function eval_try(node) {
let body_js = pipe.bind(at.bind(node)(Keyword.for("body")))(eval_ast);
let catch_js = "";
let finally_js = "";
if (truthy(has__q.bind(node)(Keyword.for("catch")))) {
let {'name': name, 'body': body} = at.bind(node)(Keyword.for("catch"));
catch_js = str(" catch (", name, ") {\n", eval_ast(body), "\n}")
};
if (truthy(has__q.bind(node)(Keyword.for("finally")))) {
let {'body': body} = at.bind(node)(Keyword.for("finally"));
finally_js = str(" finally {\n", eval_ast(body), "\n}")
};
return str("try {\n", body_js, "\n", "}", catch_js, finally_js);}
function get_deconstructed_obj_entry_name(node) {
return pipe.bind(at.bind(Map[Meta]['{}'].call(Map, [[Keyword.for("obj_reg_entry"), Keyword.for("name")], [Keyword.for("obj_entry_rename"), Keyword.for("old_name")]]))(at.bind(node)(Keyword.for("type"))))(node);}
function get_deconstructed_array_entry_name(node) {
return pipe.bind(at.bind(Map[Meta]['{}'].call(Map, [[Keyword.for("id_assign"), Keyword.for("name")]]))(at.bind(node)(Keyword.for("type"))))(node);}
function eval_import_deconstruction_entry(node) {
return call.bind(pipe.bind(node)(Keyword.for("type"), Map[Meta]['{}'].call(Map, [[Keyword.for("obj_reg_entry"), pipe.bind(_)(Keyword.for("name"), resolve_name)], [Keyword.for("obj_entry_rename"), function ({'old_name': old_name, 'new_name': new_name}) {
return str(resolve_name(old_name), " as ", resolve_name(new_name));}]])))(node);}
function eval_import_deconstruction_expr({'entries': entries}) {
return str("{", map_join.bind(entries)(eval_import_deconstruction_entry, ", "), "}");}
function eval_import_assign_exprs(node) {
return call.bind(pipe.bind(node)(Keyword.for("type"), Map[Meta]['{}'].call(Map, [[Keyword.for("id_assign"), eval_id_assign_name], [Keyword.for("object_deconstruction"), eval_import_deconstruction_expr], [Keyword.for("assign_all_as"), eval_assign_all_as]])))(node);}
function eval_import({'assign_exprs': assign_exprs, 'path': path}) {
return str("import ", map_join.bind(assign_exprs)(eval_import_assign_exprs, ", "), " from \"", path['value']['slice']((1), (-1)), "\"");}
function eval_export({'statement': statement}) {
return str("export ", eval_statement(statement));}
function eval_export_default({'expr': expr}) {
return str("export default ", eval_expr(expr));}
function eval_export_all({'path': path}) {
return str("export * from ", path);}
function eval_label({'label_name': label_name, 'statement': statement}) {
return str(label_name, ": ", eval_statement(statement));}
function eval_statement(node) {
return call.bind(pipe.bind(pipe.bind(at.bind(node)(Keyword.for("type")))(Map[Meta]['{}'].call(Map, [[Keyword.for("label"), eval_label], [Keyword.for("if"), eval_if], [Keyword.for("import"), eval_import], [Keyword.for("export"), eval_export], [Keyword.for("export_default"), eval_export_default], [Keyword.for("export_all"), eval_export_all], [Keyword.for("let"), eval_let], [Keyword.for("if_let"), eval_if_let], [Keyword.for("return"), eval_return], [Keyword.for("protocol_def"), eval_protocol], [Keyword.for("impl_for"), eval_impl_for], [Keyword.for("impl_object"), eval_impl_object], [Keyword.for("define_for"), eval_define_for], [Keyword.for("for_loop"), eval_for_loop], [Keyword.for("id_assign"), eval_id_assign], [Keyword.for("while_loop"), eval_while_loop], [Keyword.for("loop"), eval_loop], [Keyword.for("while_let_loop"), eval_while_let_loop], [Keyword.for("continue"), eval_continue], [Keyword.for("break"), eval_break], [Keyword.for("try"), eval_try]])))(function (f) {
if (truthy(f)) {
return compose(f, plus.call(_,";"));
} else {
return eval_expr;
};}))(node);}
export function eval_ast(ast) {
return map_join.bind(ast)(eval_statement, "\n");};
export function lex_and_parse(string) {
return pipe.bind(pipe.bind(call.bind(lexer)(string))(function (tokens) {
return CollectionView[Meta]['[]'].call(CollectionView, tokens, (0));}))(parse);};
export function compile(string) {
return pipe.bind(pipe.bind(pipe.bind(call.bind(lexer)(string))(function (tokens) {
return CollectionView[Meta]['[]'].call(CollectionView, tokens, (0));}))(parse))(eval_ast);};
function compile_file(src_file_name, out_name) {
let src = Deno['readTextFileSync'](src_file_name);
Deno['writeTextFile'](out_name, compile(src))}
function compile_file_and_prelude(src_file_name, out_name, prelude_src) {
let prelude = Deno['readTextFileSync']("./src/std/js_prelude.js");
prelude = plus.call(prelude,compile(Deno['readTextFileSync'](prelude_src)))
let src = Deno['readTextFileSync'](src_file_name);
Deno['writeTextFile'](out_name, plus.call(prelude,compile(src)))}
if (truthy(and.call(globalThis['Deno'], () => not_empty__q.bind(Deno['args'])()))) {
let src_file_name = Deno['args'][Meta]['[]'].call(Deno['args'], (0));
let out_name = Deno['args'][Meta]['[]'].call(Deno['args'], (1));
let prelude_src = "./src/std/prelude.coil";
if (truthy(equals__q.call(Deno['args'][Meta]['[]'].call(Deno['args'], (2)), "-w"))) {
let watcher = Deno['watchFs']([src_file_name, prelude_src]);
for await  (let event of watcher) {
if (truthy(negate.call(equals__q.call(event['kind'], "modify")))) {
continue;
};
console['log']("Rebuilding...")
try {
compile_file_and_prelude(src_file_name, out_name, prelude_src)
} catch (e) {
console['error']("Compile Failed", e)
};
};
} else if (equals__q.call(Deno['args'][Meta]['[]'].call(Deno['args'], (2)), "-no-prelude")) {
compile_file(src_file_name, out_name)
} else {
compile_file_and_prelude(src_file_name, out_name, prelude_src)
};
};