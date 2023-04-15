import * as ReactDOM from "react-dom/client";

import * as React from "react";
export default ReactDOM;

export class Atom {
  constructor(state, setState) {
    this.val = state;
    this.setState = setState;
  }
  update(f) {
    return this.setState(call.bind(f));
  }
  set(val) {
    return this.setState(val);
  }
}

export function use_state(initial) {
  let [state, setState] = React.useState(initial);

  return new Atom(state, setState);
}
