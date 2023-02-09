;
const Viewable = Symbol("Viewable");
Keyword.for("success")[Viewable] = new ObjectLiteral({view() {
;
return "ay, we did it :)"
}});
Keyword.for("failure")[Viewable] = new ObjectLiteral({view() {
;
return "dang we did not do it"
}});
function view() {
;
return this[Viewable].view.call(this)
};
log.bind(view.bind(Keyword.for("success"))())();
log.bind(view.bind(Keyword.for("failure"))())()