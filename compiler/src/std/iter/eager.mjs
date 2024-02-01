import Meta from "../meta.mjs";

const EagerIter = Object.freeze({
  take: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:take"),
  until: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:until"),
  skip: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:skip"),
  zip: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:zip"),
  map: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:map"),
  flat_map: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:flat_map"),
  filter: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:filter"),
  reject: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:reject"),
  split: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:split"),
  compact: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:compact"),
  join: Symbol("coil-lang@0.1.6/std/iter/eager/Iter:join"),
});

Object.prototype[EagerIter.take] = function (n) {
  let out = [];
  let i = 0;
  for (let elem of this) {
    if (i++ === n) {
      break;
    } else {
      out.push(elem);
    }
  }
  return out;
};

Object.prototype[EagerIter.until] = function (f) {
  let out = [];
  for (let elem of this) {
    if (f[Meta.invoke](elem)[Meta.as_bool]()) {
      break;
    } else {
      out.push(elem);
    }
  }
  return out;
};

Object.prototype[EagerIter.skip] = function (n) {
  let out = [];
  let i = 0;
  for (let elem of this) {
    if (i++ < n) {
      continue;
    } else {
      out.push(elem);
    }
  }
};

Object.prototype[EagerIter.zip] = function (...collections) {
  let generators = [this, ...collections].map((item) =>
    item[Symbol.iterator]()
  );
  let out = [];
  while (true) {
    let gen_states = generators.map((state) => state.next());
    if (gen_states.some((x) => x.done)) {
      break;
    } else {
      out.push(gen_states.map((x) => x.value));
    }
  }
  return out;
};

Object.prototype[EagerIter.map] = function (f) {
  let out = [];
  for (let elem of this) {
    out.push(f[Meta.invoke](elem));
  }
  return out;
};

Object.prototype[EagerIter.flat_map] = function* (f) {
  let out = [];
  for (let elem of this) {
    out.push(...f[Meta.invoke](elem));
  }
  return out;
};

Object.prototype[EagerIter.filter] = function (f) {
  let out = [];
  for (let elem of this) {
    if (f[Meta.invoke](elem)[Meta.as_bool]()) {
      out.push(elem);
    }
  }
  return out;
};

Object.prototype[EagerIter.reject] = function (f) {
  let out = [];
  for (let elem of this) {
    if (!f[Meta.invoke](elem)[Meta.as_bool]()) {
      out.push(elem);
    }
  }
  return out;
};

Object.prototype[EagerIter.split] = function (f) {
  let out = [];
  let chunk = [];
  for (let elem of this) {
    if (f[Meta.invoke](elem)[Meta.as_bool]()) {
      out.push(chunk);
      chunk = [];
    } else {
      chunk.push(elem);
    }
  }
  out.push(chunk);
  return out;
};

Object.prototype[EagerIter.compact] = function () {
  let out = [];
  for (let elem of this) {
    if (elem[Meta["nil?"]]()) {
      continue;
    } else {
      out.push(elem);
    }
  }
  return out;
};

export default EagerIter;

export const {
  take,
  until,
  skip,
  zip,
  reduce,
  map,
  flat_map,
  each,
  filter,
  reject,
  split,
  compact,
  join,
} = EagerIter;
