import * as ReactDOM from "react-dom/client";

import * as React from "react";
export default ReactDOM;

export function use_state(initial) {
  let [state, setState] = React.useState(initial);

  return {
    val: state,
    update(f) {
      return setState(globalThis["call"].bind(f));
    },
    set(val) {
      return setState(val);
    },
  };
}
