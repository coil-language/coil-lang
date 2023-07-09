import * as ReactDOM from "react-dom/client";

import * as React from "react";
export default ReactDOM;

export class Atom {
  constructor(state, setState) {
    this.val = state;
    this.setState = setState;
    this["update!"] = this["update!"].bind(this);
    this["set!"] = this["set!"].bind(this);
  }
  ["update!"](...fns) {
    this.setState(compose(...fns));
  }
  ["set!"](val) {
    this.setState(val);
  }
}

export function use_state(initial) {
  let [state, setState] = React.useState(initial);

  return new Atom(state, setState);
}