function Atom(val, set_val) {
  this.val = val;
  this.set_val = set_val;
}
Atom.prototype[Keyword.for("update!")] = function (...fns) {
  return this["set_val"](compose(...fns));
};
Atom.prototype[Keyword.for("set!")] = function (val) {
  return this["set_val"](val);
};
Atom.prototype[Pipe] = function (...fns) {
  return compose(...fns)(this["val"]);
};
function use_state(initial) {
  let [val, set_val] = React["useState"](initial);
  return new Atom(val, set_val);
}
const ToReactChild = Symbol("ToReactChild");
Atom.prototype[ToReactChild] = function () {
  return this["val"];
};
Object.prototype[ToReactChild] = function () {
  return this;
};
let to_react_child = def_call(function to_react_child() {
  return this?.[ToReactChild]();
});
function Elem(ctor, attrs, children) {
  this.ctor = ctor;
  this.attrs = attrs;
  this.children = children;
}
Elem.prototype[Into] = function (children) {
  return new Elem(
    this["ctor"],
    this["attrs"],
    plus.call(this["children"], children)
  );
};
Elem.prototype[ToReactChild] = function () {
  if (truthy(this["children"] instanceof Array)) {
    return React["createElement"](
      this["ctor"],
      this["attrs"],
      ...map.bind(this["children"])(to_react_child)
    );
  } else {
    return React["createElement"](
      this["ctor"],
      this["attrs"],
      to_react_child.bind(this["children"])()
    );
  }
};
Keyword.prototype["[]"] = function (...children) {
  let str = this["value"];
  let [elem_name, ...classes] = str["split"](".");
  return new Elem(
    elem_name,
    new ObjectLiteral({ className: classes["join"](" ") }),
    children
  );
};
Keyword.prototype["{}"] = function (attrs) {
  attrs = into.bind(
    map.bind(attrs)(function ([key, val]) {
      if (
        truthy(
          and.call(
            as_str.bind(key)()["startsWith"]("data-"),
            () => val instanceof Atom
          )
        )
      ) {
        return [key, val["val"]];
      } else {
        return [key, val];
      }
    })
  )(new ObjectLiteral({}));
  let str = this["value"];
  let [elem_name, className] = str["split"](".");
  return new Elem(
    elem_name,
    new ObjectLiteral({ className: className, ...attrs }),
    at.bind(attrs)(Keyword.for("children"))
  );
};
function component(Component) {
  let ReactComponent = function (...args) {
    return to_react_child.bind(Component(...args))();
  };
  ReactComponent[Record] = function (attrs) {
    attrs = into.bind(attrs)(new ObjectLiteral({}));
    return React["createElement"](
      ReactComponent,
      attrs,
      at.bind(attrs)(Keyword.for("children"))
    );
  };
  ReactComponent[Vector] = function (children) {
    return React["createElement"](
      ReactComponent,
      null,
      ...map.bind(children)(to_react_child)
    );
  };
  ReactComponent[Into] = function (iterable) {
    return React["createElement"](ReactComponent, null, [
      ...map.bind(iterable)(to_react_child),
    ]);
  };
  return ReactComponent;
}
