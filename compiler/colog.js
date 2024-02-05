"use strict";
import {
  ObjectLiteral,
  Nil,
  nil,
  Keyword,
  dot,
  raise__b,
  panic__b,
} from "./src/std/globals.mjs";
import Meta, {
  nil__q,
  create,
  from_entries,
  as_num,
  exists__q,
  as_bool,
  log,
  invoke,
  pipe,
} from "./src/std/meta.mjs";
import Iter, {
  take,
  until,
  skip,
  find,
  zip,
  reduce,
  map,
  flat_map,
  each,
  count,
  filter,
  reject,
  all__q,
  any__q,
  split,
  compact,
  join,
  into,
  compose,
} from "./src/std/iter/index.mjs";
import Algebra from "./src/std/algebra.mjs";
import Bool, { negate } from "./src/std/bool.mjs";
import Collection, {
  at,
  len,
  empty__q,
  has__q,
} from "./src/std/collection.mjs";
import OrderedSequence, { first, last } from "./src/std/ordered_sequence.mjs";
import {
  inc,
  InclusiveRange,
  ExclusiveRange,
  InclusiveRangeNoMaximum,
  InclusiveRangeNoMinimum,
  ExclusiveRangeNoMaximum,
  ExclusiveRangeNoMinimum,
} from "./src/std/range.mjs";
import Record, { keys, values } from "./src/std/record.mjs";
import Underscore, { _ } from "./src/std/underscore.mjs";
import CondMap from "./src/std/cond_map.mjs";
let __coil_temp;
let str = function (...args) {
  args ??= nil;
  let __coil_temp;
  return dot(
    dot(args, map)[invoke]((arg) => {
      arg ??= nil;
      return dot(arg, "toString")[invoke]();
    }),
    join
  )[invoke]("");
};
const lex = Symbol("lex");
let pass = function () {
  let __coil_temp;
};
String["prototype"][lex] = function (string) {
  string ??= nil;
  let __coil_temp;
  if (dot(string, "startsWith")[invoke](this)[Meta.as_bool]()) {
    let __coil_temp;
    return this;
  }
};
RegExp["prototype"][lex] = function (string) {
  string ??= nil;
  let __coil_temp;
  var __coil_if_let_temp = dot(string, "match")[invoke](this) ?? nil;
  if (__coil_if_let_temp[Meta.as_bool]()) {
    let [value] = __coil_if_let_temp;
    let __coil_temp;
    return value;
  }
};
let Lexer = function (patterns) {
  this["patterns"] = patterns;
  patterns ??= nil;
  let __coil_temp;
};
Lexer["prototype"][invoke] = function (string) {
  string ??= nil;
  let __coil_temp;
  let idx = 0;
  let rest_of_string = function () {
    let __coil_temp;
    return dot(string, "slice")[invoke](idx);
  };
  let tokens = [];
  while (
    dot(rest_of_string[invoke](), "trim")
      [invoke]()
      [Meta["!="]]("")
      [Meta.as_bool]()
  ) {
    let __coil_temp;
    idx = idx[Algebra["+"]](
      dot(
        dot(rest_of_string[invoke](), until)[invoke](
          Set[Meta.create]([" ", "\n"]),
          _[Bool.negate]()
        ),
        count
      )[invoke]()
    );
    let found = false;
    for (let [pattern, kind] of dot(this, "patterns")) {
      let __coil_temp;
      var __coil_if_let_temp =
        dot(pattern, lex)[invoke](rest_of_string[invoke]()) ?? nil;
      if (__coil_if_let_temp[Meta.as_bool]()) {
        let value = __coil_if_let_temp;
        let __coil_temp;
        idx = idx[Algebra["+"]](dot(value, len)[invoke]());
        if (kind[Meta["!="]](pass)[Meta.as_bool]()) {
          let __coil_temp;
          dot(tokens, "push")[invoke](
            ObjectLiteral[Meta.from_entries]([
              [Keyword.for("kind"), kind],
              [Keyword.for("value"), value],
            ])
          );
        }
        found = true;
        break;
      }
    }
    if (
      ((__coil_temp = { left: found }),
      __coil_temp.left[Meta.as_bool]() === false
        ? __coil_temp.left
        : ((__coil_temp.right = dot(
            dot(rest_of_string[invoke](), "trim")[invoke](),
            "length"
          )[Algebra[">"]](0)),
          __coil_temp.right[Meta.as_bool]() === true)
        ? __coil_temp.right
        : __coil_temp.left)
        [Bool.negate]()
        [Meta.as_bool]()
    ) {
      let __coil_temp;
      dot(tokens, log)[invoke]();
      return dot(console, "error")[invoke]("NONE FOUND");
    }
  }
  return tokens;
};
let lexer = Lexer[Meta.from_entries]([
  ["fact", Keyword.for("fact")],
  ["?", Keyword.for("question_mark")],
  [".", Keyword.for("dot")],
  [",", pass],
  ["(", Keyword.for("open_p")],
  [")", Keyword.for("close_p")],
  ["{", Keyword.for("open_b")],
  ["}", Keyword.for("close_b")],
  ["=", Keyword.for("equal_sign")],
  [/^\"(.*)\"/, Keyword.for("string")],
  [/^[0-9]+/, Keyword.for("number")],
  [/^[a-zA-Z_0-9]+/, Keyword.for("id")],
  [/^:[a-zA-Z_0-9\+\-\*\!\@\#\$\%\^\&\<\>\=]+/, Keyword.for("id")],
]);
const parse = Symbol("parse");
let Parser = function (...instructions) {
  this["instructions"] = instructions;
  instructions ??= nil;
  let __coil_temp;
};
Parser["prototype"][parse] = function (parse_result) {
  parse_result ??= nil;
  let __coil_temp;
  return dot(dot(this, "instructions"), reduce)[invoke]((result, parser) => {
    result ??= nil;
    parser ??= nil;
    return dot(parser, parse)[invoke](result);
  }, parse_result);
};
let DefKind = function (kind) {
  this["kind"] = kind;
  kind ??= nil;
  let __coil_temp;
};
DefKind["prototype"][parse] = function ([tokens, _result]) {
  tokens ??= nil;
  _result ??= nil;
  let __coil_temp;
  return [
    tokens,
    ObjectLiteral[Meta.from_entries]([
      [Keyword.for("kind"), dot(this, "kind")],
    ]),
  ];
};
let Then = function (parser, name) {
  this["parser"] = parser;
  this["name"] = name;
  parser ??= nil;
  name ??= nil;
  let __coil_temp;
};
Then["prototype"][parse] = function ([tokens, result]) {
  tokens ??= nil;
  result ??= nil;
  let __coil_temp;
  let [new_tokens, new_result] = dot(dot(this, "parser"), parse)[invoke]([
    tokens,
    nil,
  ]);
  return [
    new_tokens,
    ObjectLiteral[Meta.from_entries]([
      ...result,
      [dot(this, "name"), new_result],
    ]),
  ];
};
let One = function (kind, name) {
  this["kind"] = kind;
  this["name"] = name;
  kind ??= nil;
  name ??= nil;
  let __coil_temp;
};
One["prototype"][parse] = function ([tokens, result]) {
  tokens ??= nil;
  result ??= nil;
  let __coil_temp;
  var __coil_if_let_temp = dot(tokens, first)[invoke]() ?? nil;
  if (__coil_if_let_temp[Meta.as_bool]()) {
    let token = __coil_if_let_temp;
    let __coil_temp;
    if (dot(token, "kind")[Meta["!="]](dot(this, "kind"))[Meta.as_bool]()) {
      let __coil_temp;
      panic__b[invoke](
        "Expected :",
        dot(this, "kind"),
        " got :",
        dot(token, "kind")
      );
    } else {
      let __coil_temp;
      return [
        dot(tokens, "slice")[invoke](1),
        ObjectLiteral[Meta.from_entries]([
          ...result,
          [dot(this, "name"), dot(token, "value")],
        ]),
      ];
    }
  }
};
let Chomp = function (...kinds) {
  this["kinds"] = kinds;
  kinds ??= nil;
  let __coil_temp;
};
Chomp["prototype"][parse] = function ([tokens, result]) {
  tokens ??= nil;
  result ??= nil;
  let __coil_temp;
  for (let [token, kind, i] of dot(tokens, zip)[invoke](
    dot(this, "kinds"),
    new ExclusiveRangeNoMaximum(0)
  )) {
    let __coil_temp;
    if (dot(token, "kind")[Meta["!="]](kind)[Meta.as_bool]()) {
      let __coil_temp;
      panic__b[invoke]("Expected :", kind, " got :", dot(token, "kind"));
    }
  }
  return [
    dot(tokens, "slice")[invoke](dot(dot(this, "kinds"), "length")),
    result,
  ];
};
let Until = function (end_token, parser, kind) {
  this["end_token"] = end_token;
  this["parser"] = parser;
  this["kind"] = kind;
  end_token ??= nil;
  parser ??= nil;
  kind ??= nil;
  let __coil_temp;
};
Until["prototype"][parse] = function ([tokens, result]) {
  tokens ??= nil;
  result ??= nil;
  let __coil_temp;
  let exprs = [];
  while (
    dot(dot(tokens, first)[invoke](), "kind")
      [Meta["!="]](dot(this, "end_token"))
      [Meta.as_bool]()
  ) {
    let __coil_temp;
    var __coil_if_let_temp =
      dot(dot(this, "parser"), parse)[invoke]([tokens, nil]) ?? nil;
    if (__coil_if_let_temp[Meta.as_bool]()) {
      let [new_tokens, expr] = __coil_if_let_temp;
      let __coil_temp;
      tokens = new_tokens;
      dot(exprs, "push")[invoke](expr);
    } else {
      let __coil_temp;
      break;
    }
  }
  return [
    tokens,
    ObjectLiteral[Meta.from_entries]([...result, [dot(this, "kind"), exprs]]),
  ];
};
Function["prototype"][parse] = function ([tokens, result]) {
  tokens ??= nil;
  result ??= nil;
  let __coil_temp;
  return this[invoke](tokens);
};
const can_parse__q = Symbol("can_parse?");
Keyword["prototype"][can_parse__q] = function ([{ kind: kind }]) {
  kind ??= nil;
  let __coil_temp;
  return this[Meta["=="]](kind);
};
Set["prototype"][can_parse__q] = function (tokens) {
  tokens ??= nil;
  let __coil_temp;
  return dot(this, any__q)[invoke]((cond) => {
    cond ??= nil;
    return dot(cond, can_parse__q)[invoke](tokens);
  });
};
_[can_parse__q] = function ([]) {
  let __coil_temp;
  return true;
};
Array["prototype"][can_parse__q] = function (tokens) {
  tokens ??= nil;
  let __coil_temp;
  if (
    dot(this, len)
      [invoke]()
      [Algebra[">"]](dot(tokens, len)[invoke]())
      [Meta.as_bool]()
  ) {
    let __coil_temp;
    return false;
  } else {
    let __coil_temp;
    return dot(dot(this, zip)[invoke](tokens), all__q)[invoke](
      ([pattern, token]) => {
        pattern ??= nil;
        token ??= nil;
        return dot(pattern, can_parse__q)[invoke]([token]);
      }
    );
  }
};
let ParseMap = function (entries) {
  this["entries"] = entries;
  entries ??= nil;
  let __coil_temp;
};
ParseMap["prototype"][dot(Symbol, "iterator")] = function () {
  let __coil_temp;
  return dot(dot(this, "entries"), dot(Symbol, "iterator"))[invoke]();
};
ParseMap["prototype"][parse] = function ([tokens, result]) {
  tokens ??= nil;
  result ??= nil;
  let __coil_temp;
  if (dot(tokens, empty__q)[invoke]()[Meta.as_bool]()) {
    let __coil_temp;
    return;
  } else {
    let __coil_temp;
    for (let [pattern, parser] of dot(this, "entries")) {
      let __coil_temp;
      if (dot(pattern, can_parse__q)[invoke](tokens)[Meta.as_bool]()) {
        let __coil_temp;
        return dot(parser, parse)[invoke]([tokens, nil]);
      }
    }
  }
};
let parse_keyword = Parser[Meta.create]([
  DefKind[Meta.create]([Keyword.for("keyword")]),
  One[Meta.create]([Keyword.for("id"), Keyword.for("name")]),
]);
let parse_string = Parser[Meta.create]([
  DefKind[Meta.create]([Keyword.for("string")]),
  One[Meta.create]([Keyword.for("string"), Keyword.for("value")]),
]);
let parse_number = Parser[Meta.create]([
  DefKind[Meta.create]([Keyword.for("number")]),
  One[Meta.create]([Keyword.for("number"), Keyword.for("value")]),
]);
let parse_variable = Parser[Meta.create]([
  DefKind[Meta.create]([Keyword.for("variable")]),
  Chomp[Meta.create]([Keyword.for("question_mark")]),
  One[Meta.create]([Keyword.for("id"), Keyword.for("name")]),
]);
let parse_key_value_entry = function (tokens) {
  tokens ??= nil;
  let __coil_temp;
  return dot(
    Parser[Meta.create]([
      DefKind[Meta.create]([Keyword.for("key_value_entry")]),
      One[Meta.create]([Keyword.for("id"), Keyword.for("key_name")]),
      Chomp[Meta.create]([Keyword.for("equal_sign")]),
      Then[Meta.create]([parse_datum, Keyword.for("value")]),
    ]),
    parse
  )[invoke]([tokens, nil]);
};
let parse_record_entry = ParseMap[Meta.from_entries]([
  [Keyword.for("id"), parse_key_value_entry],
  [Keyword.for("question_mark"), parse_variable],
]);
let parse_record = Parser[Meta.create]([
  DefKind[Meta.create]([Keyword.for("record")]),
  Chomp[Meta.create]([Keyword.for("open_b")]),
  Until[Meta.create]([
    Keyword.for("close_b"),
    parse_record_entry,
    Keyword.for("entries"),
  ]),
  Chomp[Meta.create]([Keyword.for("close_b")]),
]);
let parse_datum = ParseMap[Meta.from_entries]([
  [Keyword.for("id"), parse_keyword],
  [Keyword.for("string"), parse_string],
  [Keyword.for("number"), parse_number],
  [Keyword.for("question_mark"), parse_variable],
  [Keyword.for("open_b"), parse_record],
]);
let parse_fact = Parser[Meta.create]([
  DefKind[Meta.create]([Keyword.for("fact")]),
  Chomp[Meta.create]([Keyword.for("fact")]),
  One[Meta.create]([Keyword.for("id"), Keyword.for("name")]),
  Chomp[Meta.create]([Keyword.for("open_p")]),
  Until[Meta.create]([
    Keyword.for("close_p"),
    parse_datum,
    Keyword.for("args"),
  ]),
  Chomp[Meta.create]([Keyword.for("close_p"), Keyword.for("dot")]),
]);
let parse_query = Parser[Meta.create]([
  DefKind[Meta.create]([Keyword.for("query")]),
  Chomp[Meta.create]([Keyword.for("question_mark")]),
  One[Meta.create]([Keyword.for("id"), Keyword.for("fact_name")]),
  Chomp[Meta.create]([Keyword.for("open_p")]),
  Until[Meta.create]([
    Keyword.for("close_p"),
    parse_datum,
    Keyword.for("args"),
  ]),
  Chomp[Meta.create]([Keyword.for("close_p"), Keyword.for("dot")]),
]);
let parse_statement = ParseMap[Meta.from_entries]([
  [Keyword.for("fact"), parse_fact],
  [Keyword.for("question_mark"), parse_query],
]);
let parse_ast = function (tokens) {
  tokens ??= nil;
  let __coil_temp;
  let ast = [];
  while (dot(tokens, empty__q)[invoke]()[Bool.negate]()[Meta.as_bool]()) {
    let __coil_temp;
    let [new_tokens, node] = dot(parse_statement, parse)[invoke]([tokens, nil]);
    tokens = new_tokens;
    dot(ast, "push")[invoke](node);
  }
  return ast;
};
let Var = function (name) {
  this["name"] = name;
  name ??= nil;
  let __coil_temp;
};
let __q = Proxy[Meta.create]([
  ObjectLiteral[Meta.from_entries]([]),
  ObjectLiteral[Meta.from_entries]([
    [
      Keyword.for("get"),
      function (_, name) {
        _ ??= nil;
        name ??= nil;
        let __coil_temp;
        return Var[Meta.create]([name]);
      },
    ],
  ]),
]);
const encode_type = Symbol("encode_type");
ObjectLiteral["prototype"][encode_type] = function () {
  let __coil_temp;
  return dot(dot(this, "kind"), encode_type)[invoke](this);
};
Keyword.for("key_value_entry")[encode_type] = function ({
  key_name: key_name,
  value: value,
}) {
  key_name ??= nil;
  value ??= nil;
  let __coil_temp;
  return str[invoke](
    "[",
    key_name,
    "=",
    dot(value, encode_type)[invoke](),
    "]"
  );
};
Keyword.for("string")[encode_type] = function () {
  let __coil_temp;
  return "string";
};
Keyword.for("number")[encode_type] = function () {
  let __coil_temp;
  return "number";
};
Keyword.for("record")[encode_type] = function ({ entries: entries }) {
  entries ??= nil;
  let __coil_temp;
  return str[invoke](
    "record",
    dot(
      dot(
        dot(entries, Keyword.for("sort"))[invoke]((a, b) => {
          a ??= nil;
          b ??= nil;
          return dot(dot(a, "key_name"), "localeCompare")[invoke](
            dot(b, "key_name")
          );
        }),
        map
      )[invoke]((item) => {
        item ??= nil;
        return dot(item, encode_type)[invoke]();
      }),
      join
    )[invoke]("")
  );
};
Array["prototype"][encode_type] = function () {
  let __coil_temp;
  return str[invoke](
    "array[",
    dot(
      dot(this, map)[invoke]((item) => {
        item ??= nil;
        return dot(item, encode_type)[invoke]();
      }),
      join
    )[invoke](","),
    "]"
  );
};
const run = Symbol("run");
const val = Symbol("val");
ObjectLiteral["prototype"][run] = function (db) {
  db ??= nil;
  let __coil_temp;
  return dot(dot(this, "kind"), run)[invoke](db, this);
};
Array["prototype"][run] = function (db) {
  db ??= nil;
  let __coil_temp;
  for (let node of this) {
    let __coil_temp;
    db = dot(node, run)[invoke](db);
  }
  return db;
};
Keyword.for("fact")[run] = function (db, { name: name, args: args }) {
  db ??= nil;
  name ??= nil;
  args ??= nil;
  let __coil_temp;
  if (db[invoke](name)[Bool.negate]()[Meta.as_bool]()) {
    let __coil_temp;
    dot(db, "set")[invoke](name, Map[Meta.from_entries]([]));
  }
  let name_table = db[invoke](name);
  let args_type = dot(args, encode_type)[invoke]();
  var __coil_if_let_temp = name_table[invoke](args_type) ?? nil;
  if (__coil_if_let_temp[Meta.as_bool]()) {
    let coll = __coil_if_let_temp;
    let __coil_temp;
    dot(coll, "push")[invoke](
      dot(args, "map")[invoke]((item) => {
        item ??= nil;
        return dot(item, val)[invoke]();
      })
    );
  } else {
    let __coil_temp;
    dot(name_table, "set")[invoke](args_type, [
      dot(args, "map")[invoke]((item) => {
        item ??= nil;
        return dot(item, val)[invoke]();
      }),
    ]);
  }
  return db;
};
const match__q = Symbol("match?");
ObjectLiteral["prototype"][match__q] = function (fact) {
  fact ??= nil;
  let __coil_temp;
  return dot(dot(this, "kind"), match__q)[invoke](this, fact);
};
Keyword.for("variable")[match__q] = function (self, fact) {
  self ??= nil;
  fact ??= nil;
  let __coil_temp;
  return true;
};
Keyword.for("record")[match__q] = function ({ entries: entries }, fact) {
  entries ??= nil;
  fact ??= nil;
  let __coil_temp;
  if (
    dot(entries, len)
      [invoke]()
      [Meta["!="]](dot(fact, len)[invoke]())
      [Meta.as_bool]()
  ) {
    let __coil_temp;
    return false;
  } else {
    let __coil_temp;
    for (let [left, [key, val]] of dot(entries, zip)[invoke](fact)) {
      let __coil_temp;
      if (
        dot(left, "kind")[Meta["=="]](Keyword.for("variable"))[Meta.as_bool]()
      ) {
        let __coil_temp;
        if (dot(left, "name")[Meta["!="]](key)[Meta.as_bool]()) {
          let __coil_temp;
          return false;
        }
      } else if (
        dot(left, "kind")[Meta["=="]](Keyword.for("key_value_entry"))
      ) {
        let __coil_temp;
        if (dot(left, "key_name")[Meta["!="]](key)[Meta.as_bool]()) {
          let __coil_temp;
          return false;
        } else if (
          dot(dot(left, "value"), match__q)[invoke](val)[Bool.negate]()
        ) {
          let __coil_temp;
          return false;
        }
      }
    }
  }
};
Keyword.for("number")[match__q] = function ({ value: value }, fact) {
  value ??= nil;
  fact ??= nil;
  let __coil_temp;
  return Number[invoke](value)[Meta["=="]](fact);
};
const unify = Symbol("unify");
ObjectLiteral["prototype"][unify] = function (fact) {
  fact ??= nil;
  let __coil_temp;
  return dot(dot(this, "kind"), unify)[invoke](this, fact);
};
Keyword.for("variable")[unify] = function ({ name: name }, fact) {
  name ??= nil;
  fact ??= nil;
  let __coil_temp;
  return [name, fact];
};
Keyword.for("number")[unify] = function (self, fact) {
  self ??= nil;
  fact ??= nil;
  let __coil_temp;
  return nil;
};
Keyword.for("string")[unify] = function (self, fact) {
  self ??= nil;
  fact ??= nil;
  let __coil_temp;
  return nil;
};
Keyword.for("record")[unify] = function ({ entries: entries }, fact) {
  entries ??= nil;
  fact ??= nil;
  let __coil_temp;
  let out = [];
  for (let [entry, [key, val]] of dot(entries, zip)[invoke](fact)) {
    let __coil_temp;
  }
  return out;
};
Keyword.for("query")[run] = function (
  db,
  { fact_name: fact_name, args: args }
) {
  db ??= nil;
  fact_name ??= nil;
  args ??= nil;
  let __coil_temp;
  return dot(
    dot(
      dot(db, filter)[invoke](
        Keyword.for("name"),
        Set[Meta.create]([fact_name])
      ),
      filter
    )[invoke]((tuple) => {
      tuple ??= nil;
      return dot(dot(args, zip)[invoke](dot(tuple, "args")), all__q)[invoke](
        ([query, found]) => {
          query ??= nil;
          found ??= nil;
          return dot(query, match__q)[invoke](found);
        }
      );
    }),
    map
  )[invoke]((tuple) => {
    tuple ??= nil;
    return dot(
      dot(
        dot(dot(args, zip)[invoke](dot(tuple, "args")), flat_map)[invoke](
          ([query, found]) => {
            query ??= nil;
            found ??= nil;
            let __coil_temp;
            if (
              dot(query, "kind")
                [Meta["=="]](Keyword.for("variable"))
                [Meta.as_bool]()
            ) {
              let __coil_temp;
              return Map[Meta.from_entries]([[dot(query, "name"), found]]);
            }
          }
        ),
        compact
      )[invoke](),
      into
    )[invoke](Map[Meta.from_entries]([]));
  });
};
ObjectLiteral["prototype"][val] = function (db) {
  db ??= nil;
  let __coil_temp;
  return dot(dot(this, "kind"), val)[invoke](this);
};
Keyword.for("string")[val] = function ({ value: value }) {
  value ??= nil;
  let __coil_temp;
  return dot(value, "slice")[invoke](1, -1);
};
Keyword.for("number")[val] = function ({ value: value }) {
  value ??= nil;
  let __coil_temp;
  return Number[invoke](value);
};
Keyword.for("key_value_entry")[val] = function ({
  key_name: key_name,
  value: value,
}) {
  key_name ??= nil;
  value ??= nil;
  let __coil_temp;
  return [key_name, dot(value, val)[invoke]()];
};
Keyword.for("record")[val] = function ({ entries: entries }) {
  entries ??= nil;
  let __coil_temp;
  return dot(
    dot(entries, map)[invoke]((item) => {
      item ??= nil;
      return dot(item, val)[invoke]();
    }),
    into
  )[invoke](Map[Meta.create]([]));
};
dot(
  dot(dot(Deno, "readTextFileSync")[invoke]("./test.logi"), pipe)[invoke](
    lexer,
    parse_ast
  ),
  run
)[invoke](Map[Meta.from_entries]([]));
let CallMap = function (entries) {
  this["entries"] = entries;
  entries ??= nil;
  let __coil_temp;
};
CallMap["prototype"][dot(Symbol, "iterator")] = function () {
  let __coil_temp;
  return dot(dot(this, "entries"), dot(Symbol, "iterator"))[invoke]();
};
CallMap["prototype"][invoke] = function (item) {
  item ??= nil;
  let __coil_temp;
  return dot(
    dot(dot(this, "entries"), find)[invoke](([invokable]) => {
      invokable ??= nil;
      return invokable[invoke](item);
    }),
    pipe
  )[invoke](1);
};
let db = ObjectLiteral[Meta.from_entries]([
  [
    "person",
    ObjectLiteral[Meta.from_entries]([
      [
        "[{age,name}]",
        CallMap[Meta.from_entries]([
          [
            new ExclusiveRange(0, 50),
            CallMap[Meta.from_entries]([
              [
                dot(_, pipe)[invoke](
                  Keyword.for("length"),
                  new ExclusiveRange(0, 50)
                ),
                [
                  ObjectLiteral[Meta.from_entries]([
                    [Keyword.for("name"), "marcelle"],
                    [Keyword.for("age"), 10],
                  ]),
                  ObjectLiteral[Meta.from_entries]([
                    [Keyword.for("name"), "jack"],
                    [Keyword.for("age"), 11],
                  ]),
                ],
              ],
              [
                dot(_, pipe)[invoke](
                  Keyword.for("length"),
                  new ExclusiveRange(50, 100)
                ),
                [],
              ],
              [
                dot(_, pipe)[invoke](
                  Keyword.for("length"),
                  new ExclusiveRangeNoMaximum(100)
                ),
                [],
              ],
            ]),
          ],
          [
            new ExclusiveRange(50, 100),
            CallMap[Meta.from_entries]([
              [
                dot(_, pipe)[invoke](
                  Keyword.for("length"),
                  new ExclusiveRange(10, 50)
                ),
                [],
              ],
              [
                dot(_, pipe)[invoke](
                  Keyword.for("length"),
                  new ExclusiveRange(50, 100)
                ),
                [],
              ],
              [
                dot(_, pipe)[invoke](
                  Keyword.for("length"),
                  new ExclusiveRangeNoMaximum(100)
                ),
                [],
              ],
            ]),
          ],
          [new ExclusiveRangeNoMaximum(100), CallMap[Meta.from_entries]([])],
        ]),
      ],
    ]),
  ],
]);
let QueryImpl = function (tbl_name, entries) {
  this["tbl_name"] = tbl_name;
  this["entries"] = entries;
  tbl_name ??= nil;
  entries ??= nil;
  let __coil_temp;
};
let Query = Proxy[Meta.create]([
  ObjectLiteral[Meta.from_entries]([]),
  ObjectLiteral[Meta.from_entries]([
    [
      Keyword.for("get"),
      function (_, tbl_name) {
        _ ??= nil;
        tbl_name ??= nil;
        let __coil_temp;
        return ObjectLiteral[Meta.from_entries]([
          [
            dot(Meta, "from_entries"),
            function (entries) {
              entries ??= nil;
              let __coil_temp;
              return QueryImpl[Meta.create]([
                tbl_name,
                dot(entries, Keyword.for("sort"))[invoke](([a], [b]) => {
                  a ??= nil;
                  b ??= nil;
                  return dot(dot(a, "toString")[invoke](), "localeCompare")[
                    invoke
                  ](dot(b, "toString")[invoke]());
                }),
              ]);
            },
          ],
        ]);
      },
    ],
  ]),
]);
const match_extract = Symbol("match_extract");
CallMap["prototype"][Algebra["+"]] = function (call_map) {
  call_map ??= nil;
  let __coil_temp;
  return CallMap[Meta.from_entries]([...this, ...call_map]);
};
CallMap["prototype"][match_extract] = function (item) {
  item ??= nil;
  let __coil_temp;
  if (dot(item, is_a__q)[invoke](Var)[Meta.as_bool]()) {
    let __coil_temp;
    return dot(dot(dot(this, map)[invoke](1), skip)[invoke](1), reduce)[invoke](
      (acc, item) => {
        acc ??= nil;
        item ??= nil;
        return acc[Algebra["+"]](item);
      },
      dot(this, "entries")[invoke](0)[invoke](1)
    );
  } else {
    let __coil_temp;
    return this[invoke](item);
  }
};
QueryImpl["prototype"]["shape"] = function () {
  let __coil_temp;
  return dot(
    dot(
      dot(dot(this, "entries"), map)[invoke](0, (item) => {
        item ??= nil;
        return dot(item, "toString")[invoke]();
      }),
      join
    )[invoke](","),
    pipe
  )[invoke]((csv) => {
    csv ??= nil;
    return str[invoke]("[{", csv, "}]");
  });
};
Number["prototype"][match__q] = function (query) {
  query ??= nil;
  let __coil_temp;
  return (
    (__coil_temp = { left: dot(query, is_a__q)[invoke](Var) }),
    __coil_temp.left[Meta.as_bool]()
      ? __coil_temp.left
      : query[Meta["=="]](this)
  );
};
ObjectLiteral["prototype"][match__q] = function (query) {
  query ??= nil;
  let __coil_temp;
  for (let [key, sub_query] of dot(query, "entries")) {
    let __coil_temp;
    if (dot(this, has__q)[invoke](key)[Bool.negate]()[Meta.as_bool]()) {
      let __coil_temp;
      return false;
    } else if (dot(sub_query, is_a__q)[invoke](Var)) {
      let __coil_temp;
      continue;
    } else if (
      dot(dot(this, key), match__q)[invoke](sub_query)[Bool.negate]()
    ) {
      let __coil_temp;
      return false;
    }
  }
  return true;
};
let query = dot(Query, "person")[Meta.from_entries]([
  [Keyword.for("name"), dot(__q, "name")],
  [Keyword.for("age"), 11],
]);
let tbl = db[invoke](dot(query, "tbl_name"))[invoke](
  dot(query, "shape")[invoke]()
);
let bucket = dot(dot(query, "entries"), reduce)[invoke]((acc, [_k, val]) => {
  acc ??= nil;
  _k ??= nil;
  val ??= nil;
  return dot(acc, match_extract)[invoke](val);
}, tbl);
dot(
  dot(bucket, find)[invoke]((item) => {
    item ??= nil;
    return dot(item, match__q)[invoke](query);
  }),
  log
)[invoke]();
