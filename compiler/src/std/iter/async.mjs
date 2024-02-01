import Algebra from "../algebra.mjs";
import { ObjectLiteral } from "../globals.mjs";
import Meta from "../meta.mjs";

export function compose(...fns) {
  return (arg) => {
    let out = arg;
    for (let f of fns) {
      out = f[Meta.invoke](out);
    }
    return out ?? nil;
  };
}

const Iter = Object.freeze({
  take: Symbol("coil-lang@0.1.6/std/iter/async/Iter:take"),
  until: Symbol("coil-lang@0.1.6/std/iter/async/Iter:until"),
  skip: Symbol("coil-lang@0.1.6/std/iter/async/Iter:skip"),
  find: Symbol("coil-lang@0.1.6/std/iter/async/Iter:find"),
  zip: Symbol("coil-lang@0.1.6/std/iter/async/Iter:zip"),
  reduce: Symbol("coil-lang@0.1.6/std/iter/async/Iter:reduce"),
  map: Symbol("coil-lang@0.1.6/std/iter/async/Iter:map"),
  flat_map: Symbol("coil-lang@0.1.6/std/iter/async/Iter:flat_map"),
  each: Symbol("coil-lang@0.1.6/std/iter/async/Iter:each"),
  filter: Symbol("coil-lang@0.1.6/std/iter/async/Iter:filter"),
  reject: Symbol("coil-lang@0.1.6/std/iter/async/Iter:reject"),
  "all?": Symbol("coil-lang@0.1.6/std/iter/async/Iter:all?"),
  "any?": Symbol("coil-lang@0.1.6/std/iter/async/Iter:any?"),
  split: Symbol("coil-lang@0.1.6/std/iter/async/Iter:split"),
  compact: Symbol("coil-lang@0.1.6/std/iter/async/Iter:compact"),
  join: Symbol("coil-lang@0.1.6/std/iter/async/Iter:join"),
});

Object.prototype[Iter.take] = async function* (n) {
  let i = 0;
  for await (let elem of this) {
    if (i++ == n) {
      break;
    } else {
      yield elem;
    }
  }
};

Object.prototype[Iter.until] = async function* (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    if (f(elem)[Meta.as_bool]()) {
      break;
    } else {
      yield elem;
    }
  }
};

Object.prototype[Iter.skip] = async function* (n) {
  let i = 0;
  for await (let elem of this) {
    if (i++ < n) {
      continue;
    } else {
      yield elem;
    }
  }
};

Object.prototype[Iter.find] = async function (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    if (f(elem)[Meta.as_bool]()) {
      return elem;
    }
  }
};

Object.prototype[Iter.zip] = async function* (...collections) {
  let generators = [this, ...collections].map((item) =>
    item[Symbol.iterator]()
  );
  while (true) {
    let gen_states = await Promise.all(generators.map((state) => state.next()));
    if (gen_states.some((x) => x.done)) {
      break;
    } else {
      yield gen_states.map((x) => x.value);
    }
  }
};

Object.prototype[Iter.reduce] = async function (f, start) {
  let accumulator = start;
  for await (let elem of this) {
    accumulator = f[Meta.invoke](accumulator, elem);
  }
  return accumulator;
};

Object.prototype[Iter.map] = async function* (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    yield f(elem);
  }
};

Object.prototype[Iter.flat_map] = async function* (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    yield* f(elem);
  }
};

Object.prototype[Iter.each] = async function (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    f(elem);
  }
};

Object.prototype[Iter.filter] = async function* (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    if (f(elem)[Meta.as_bool]()) {
      yield elem;
    }
  }
};

Object.prototype[Iter.reject] = async function* (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    if (!f(elem)[Meta.as_bool]()) {
      yield elem;
    }
  }
};

Object.prototype[Iter["all?"]] = async function (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    if (!f(elem)) {
      return false;
    }
  }
  return true;
};

Object.prototype[Iter["any?"]] = async function (...fns) {
  let f = compose(...fns);
  for await (let elem of this) {
    if (f(elem)) {
      return true;
    }
  }
  return false;
};

Object.prototype[Iter.split] = async function* (...fns) {
  let f = compose(...fns);
  let chunk = [];
  for await (let elem of this) {
    if (f(elem)) {
      yield chunk;
      chunk = [];
    } else {
      chunk.push(elem);
    }
  }
  yield chunk;
};

Object.prototype[Iter.compact] = async function* () {
  for await (let elem of this) {
    if (elem[Meta["nil?"]]()) {
      continue;
    } else {
      yield elem;
    }
  }
};

Object.prototype[Iter.join] = async function (separator) {
  let iter = this[Symbol.asyncIterator]();
  let out = (await iter.next()).value;
  for await (let elem of iter) {
    out = out[Algebra["+"]](separator)[Algebra["+"]](elem);
  }
  return out;
};

export default Iter;

export const {
  take,
  until,
  skip,
  find,
  zip,
  reduce,
  map,
  flat_map,
  each,
  filter,
  reject,
  "all?": all__q,
  "any?": any__q,
  split,
  compact,
  join,
  into,
} = Iter;
