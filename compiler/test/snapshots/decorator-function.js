;
function deconstruct_this(f) {
;
return function () {
;
return f((deconstruct.bind(this))())
}
};
let my_name = deconstruct_this(function my_name({name}) {
;
return name
});
(log.bind((my_name.bind(construct_record.bind(Hash)([[Keyword.for("name"), (10)]])))()))()