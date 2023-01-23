function truthy(val: any) {
  return val !== null && val !== undefined && val !== false;
}

function call(...args) {
  if (typeof this === "function") {
    return this(...args);
  } else if (this instanceof Set) {
    return this.has(...args);
  }
}

function filter(callable) {
  let output: any[] = [];
  for (let elem of this) {
    if (call.bind(callable)(elem)) {
      output.push(elem);
    }
  }
  return output;
}


console.log(filter.bind([1, 2, 3])(new Set([1, 3])))