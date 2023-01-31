;
log.bind(some__q.bind([0])(function (x) {
;
return x
}))();
log.bind(pipe.bind(log.bind(pipe.bind(new ObjectLiteral({a: 10}))(Keyword.for("a")))())(new ObjectLiteral({10: 20})))()