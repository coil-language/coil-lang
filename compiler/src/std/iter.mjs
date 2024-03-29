import Algebra from "./algebra.mjs";
import { ObjectLiteral } from "./globals.mjs";
import Meta from "./meta.mjs";

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
  take: Symbol("std/iter/Iter:take"),
  until: Symbol("std/iter/Iter:until"),
  skip: Symbol("std/iter/Iter:skip"),
  find: Symbol("std/iter/Iter:find"),
  find_map: Symbol("std/iter/Iter:find_map"),
  zip: Symbol("std/iter/Iter:zip"),
  reduce: Symbol("std/iter/Iter:reduce"),
  map: Symbol("std/iter/Iter:map"),
  flat_map: Symbol("std/iter/Iter:flat_map"),
  each: Symbol("std/iter/Iter:each"),
  filter: Symbol("std/iter/Iter:filter"),
  filter_map: Symbol("std/iter/Iter:filter_map"),
  reject: Symbol("std/iter/Iter:reject"),
  "all?": Symbol("std/iter/Iter:all?"),
  "any?": Symbol("std/iter/Iter:any?"),
  split: Symbol("std/iter/Iter:split"),
  compact: Symbol("std/iter/Iter:compact"),
  join: Symbol("std/iter/Iter:join"),
  into: Symbol("std/iter/into"),
  collect: Symbol("std/iter/collect"),
  count: Symbol("std/iter/count"),
});

Object.prototype[Iter.take] = function* take(n) {
  let i = 0;
  for (let elem of this) {
    if (i++ == n) {
      break;
    } else {
      yield elem;
    }
  }
};

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

Object.prototype[Iter.find_map] = function (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    let val = f(elem);
    if (val[Meta.as_bool]()) {
      return val;
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

Object.prototype[Iter.filter_map] = function* (...fns) {
  let f = compose(...fns);
  for (let elem of this) {
    let result = f(elem);
    if (result[Meta.as_bool]()) {
      yield result;
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

Object.prototype[Iter.count] = function () {
  let count = 0;
  for (let _ of this) {
    count++;
  }
  return count;
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

export const {
  take,
  until,
  skip,
  find,
  find_map,
  zip,
  reduce,
  map,
  flat_map,
  each,
  filter,
  filter_map,
  reject,
  "all?": all__q,
  "any?": any__q,
  split,
  compact,
  join,
  into,
  consume,
  count,
} = Iter;
