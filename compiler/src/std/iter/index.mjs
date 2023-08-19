import Algebra from "../algebra.mjs";
import { ObjectLiteral } from "../globals.mjs";
import Meta from "../meta.mjs";
import Async from "./async.mjs";
import Eager from "./eager.mjs";

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
  take: Symbol("coil-lang@0.1.0/std/iter/Iter:take"),
  until: Symbol("coil-lang@0.1.0/std/iter/Iter:until"),
  skip: Symbol("coil-lang@0.1.0/std/iter/Iter:skip"),
  find: Symbol("coil-lang@0.1.0/std/iter/Iter:find"),
  zip: Symbol("coil-lang@0.1.0/std/iter/Iter:zip"),
  reduce: Symbol("coil-lang@0.1.0/std/iter/Iter:reduce"),
  map: Symbol("coil-lang@0.1.0/std/iter/Iter:map"),
  flat_map: Symbol("coil-lang@0.1.0/std/iter/Iter:flat_map"),
  each: Symbol("coil-lang@0.1.0/std/iter/Iter:each"),
  filter: Symbol("coil-lang@0.1.0/std/iter/Iter:filter"),
  reject: Symbol("coil-lang@0.1.0/std/iter/Iter:reject"),
  "all?": Symbol("coil-lang@0.1.0/std/iter/Iter:all?"),
  "any?": Symbol("coil-lang@0.1.0/std/iter/Iter:any?"),
  split: Symbol("coil-lang@0.1.0/std/iter/Iter:split"),
  compact: Symbol("coil-lang@0.1.0/std/iter/Iter:compact"),
  join: Symbol("coil-lang@0.1.0/std/iter/Iter:join"),
  into: Symbol("coil-lang@0.1.0/std/iter/into"),
  collect: Symbol("coil-lang@0.1.0/std/iter/collect"),
});

let Impl = {
  *take(n) {
    let i = 0;
    for (let elem of this) {
      if (i++ == n) {
        break;
      } else {
        yield elem;
      }
    }
  },
};

Object.prototype[Iter.take] = Impl.take;

Object.prototype[Iter.until] = function* (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    if (f(elem)[Meta.as_bool]()) {
      break;
    } else {
      yield elem;
    }
  }
};

Object.prototype[Iter.skip] = function* (n) {
  let i = 0;
  for (let elem of this) {
    if (i++ < n) {
      continue;
    } else {
      yield elem;
    }
  }
};

Object.prototype[Iter.find] = function (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    if (f(elem)[Meta.as_bool]()) {
      return elem;
    }
  }
};

Object.prototype[Iter.zip] = function* (...collections) {
  let generators = [this, ...collections].map((item) =>
    item[Symbol.iterator]()
  );
  while (true) {
    let gen_states = generators.map((state) => state.next());
    if (gen_states.some((x) => x.done)) {
      break;
    } else {
      yield gen_states.map((x) => x.value);
    }
  }
};

Object.prototype[Iter.reduce] = function (f, start) {
  let accumulator = start;
  for (let elem of this) {
    accumulator = f[Meta.invoke](accumulator, elem);
  }
  return accumulator;
};

Object.prototype[Iter.map] = function* (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    yield f(elem);
  }
};

Object.prototype[Iter.flat_map] = function* (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    yield* f(elem);
  }
};

Object.prototype[Iter.each] = function (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    f(elem);
  }
};

Object.prototype[Iter.filter] = function* (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    if (f(elem)[Meta.as_bool]()) {
      yield elem;
    }
  }
};

Object.prototype[Iter.reject] = function* (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    if (!f(elem)[Meta.as_bool]()) {
      yield elem;
    }
  }
};

Object.prototype[Iter["all?"]] = function (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    if (!f(elem)) {
      return false;
    }
  }
  return true;
};

Object.prototype[Iter["any?"]] = function (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    if (f(elem)) {
      return true;
    }
  }
  return false;
};

Object.prototype[Iter.split] = function* (...fns) {
  let f = compose(...fns);
  let chunk = [];
  for (let elem of this) {
    if (f(elem)) {
      yield chunk;
      chunk = [];
    } else {
      chunk.push(elem);
    }
  }
  yield chunk;
};

Object.prototype[Iter.compact] = function* () {
  for (let elem of this) {
    if (elem[Meta["nil?"]]()) {
      continue;
    } else {
      yield elem;
    }
  }
};

Object.prototype[Iter.join] = function (separator) {
  let iter = this[Symbol.iterator]();
  let out = iter.next().value;
  for (let elem of iter) {
    out = out[Algebra["+"]](separator)[Algebra["+"]](elem);
  }
  return out;
};

Object.prototype[Iter.into] = function (collector) {
  return collector[Iter.collect](this);
};

Array.prototype[Iter.collect] = function (iterable) {
  return [...this, ...iterable];
};

Map.prototype[Iter.collect] = function (iterable) {
  return new Map([...this, ...iterable]);
};

Set.prototype[Iter.collect] = function (iterable) {
  return new Set([...this, ...iterable]);
};

String.prototype[Iter.collect] = function (iterable) {
  return this[Algebra["+"]](
    iterable[reduce]((acc, cur) => acc[Algebra["+"]](cur), "")
  );
};

ObjectLiteral.prototype[Iter.collect] = function (entries) {
  return new ObjectLiteral([...this[Symbol.iterator](), ...entries]);
};

export default Iter;

Object.prototype[Iter.take].async = Object.prototype[Async.take];
Object.prototype[Iter.until].async = Object.prototype[Async.until];
Object.prototype[Iter.skip].async = Object.prototype[Async.skip];
Object.prototype[Iter.find].async = Object.prototype[Async.find];
Object.prototype[Iter.zip].async = Object.prototype[Async.zip];
Object.prototype[Iter.reduce].async = Object.prototype[Async.reduce];
Object.prototype[Iter.map].async = Object.prototype[Async.map];
Object.prototype[Iter.flat_map].async = Object.prototype[Async.flat_map];
Object.prototype[Iter.each].async = Object.prototype[Async.each];
Object.prototype[Iter.filter].async = Object.prototype[Async.filter];
Object.prototype[Iter.reject].async = Object.prototype[Async.reject];
Object.prototype[Iter["all?"]].async = Object.prototype[Async["all?"]];
Object.prototype[Iter["any?"]].async = Object.prototype[Async["any"]];
Object.prototype[Iter.split].async = Object.prototype[Async.split];
Object.prototype[Iter.compact].async = Object.prototype[Async.compact];
Object.prototype[Iter.join].async = Object.prototype[Async.join];

Object.prototype[Iter.take].eager = Object.prototype[Eager.take];
Object.prototype[Iter.until].eager = Object.prototype[Eager.until];
Object.prototype[Iter.skip].eager = Object.prototype[Eager.skip];
Object.prototype[Iter.find].eager = Object.prototype[Eager.find];
Object.prototype[Iter.zip].eager = Object.prototype[Eager.zip];
Object.prototype[Iter.reduce].eager = Object.prototype[Eager.reduce];
Object.prototype[Iter.map].eager = Object.prototype[Eager.map];
Object.prototype[Iter.flat_map].eager = Object.prototype[Eager.flat_map];
Object.prototype[Iter.each].eager = Object.prototype[Eager.each];
Object.prototype[Iter.filter].eager = Object.prototype[Eager.filter];
Object.prototype[Iter.reject].eager = Object.prototype[Eager.reject];
Object.prototype[Iter["all?"]].eager = Object.prototype[Eager["all?"]];
Object.prototype[Iter["any?"]].eager = Object.prototype[Eager["any"]];
Object.prototype[Iter.split].eager = Object.prototype[Eager.split];
Object.prototype[Iter.compact].eager = Object.prototype[Eager.compact];
Object.prototype[Iter.join].eager = Object.prototype[Eager.join];

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
  consume,
} = Iter;
