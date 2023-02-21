function ObjectLiteral(obj) {
  Object.assign(this, obj);
}

function js_negate(val) {
  return !truthy(val);
}

function truthy(val) {
  return val !== null && val !== undefined && val !== false;
}

function js_and(a, b) {
  if (!truthy(a)) {
    return a;
  } else {
    return b();
  }
}

function js_object_delete(object, key) {
  delete object[key];
}

function js_or(a, b) {
  if (truthy(a)) {
    return a;
  } else {
    return b();
  }
}

function js_plus(a, b) {
  return a + b;
}

function js_minus(a, b) {
  return a - b;
}

function js_divide(a, b) {
  return a / b;
}

function js_times(a, b) {
  return a * b;
}

function js_exponent(a, b) {
  return a ** b;
}

function js_greater_than(a, b) {
  return a > b;
}

function js_less_than(a, b) {
  return a < b;
}

function js_greater_than_eq(a, b) {
  return a >= b;
}

function js_less_than_eq(a, b) {
  return a <= b;
}

function js_mod(a, b) {
  return a % b;
}

class AssertionError extends Error {}

function assert__b(cond, line, column, code_str, msg = "") {
  if (!cond) {
    throw new AssertionError(
      `Assertion Failed: ${msg}\n\n@ ${line}:${column} '${code_str}'`
    );
  }
}

function Keyword(value) {
  this.value = value;
}

Keyword.cache = new Map();

Keyword.for = function (name) {
  if (Keyword.cache.get(name)) {
    return Keyword.cache.get(name);
  } else {
    let kw = new Keyword(name);
    Keyword.cache.set(name, kw);
    return kw;
  }
};

Keyword.prototype.valueOf = function () {
  return this.value;
};
Keyword.prototype.toString = function () {
  return this.value;
};

function js_num_hash(num) {
  return num;
}

function js_str_hash(str) {
  let hash = 7n;
  for (let char of str) hash = hash * 31n + BigInt(char.charCodeAt());
  return hash;
}

function raise(err) {
  console.log(err);
  throw err;
}
const HashCode = Symbol("HashCode");
String.prototype[HashCode] = function () {
return js_str_hash(this);};
Number.prototype[HashCode] = function () {
return this;};
Keyword.prototype[HashCode] = function () {
return (hash.bind((plus.call("____coil_keyword:",this.value))))();};
Array.prototype[HashCode] = function () {
return reduce.bind(this)(function (value, elem, idx) {
return plus.call((times.call(value,31n)),(hash.bind(elem))());}, 7n);};
ObjectLiteral.prototype[HashCode] = function () {
return reduce.bind(this)(function (value, entry) {
return plus.call((times.call(value,31n)),(hash.bind(entry))());}, 7n);};
Map.prototype[HashCode] = function () {
return reduce.bind(this)(function (hash_value, key, value) {
return plus.call((times.call(hash_value,31n)),(hash.bind([key, value]))());}, 7n);};
function hash() {
return this[HashCode]();}
function Hash(entries) {
this.raw_entries = entries
this.map = new Map(entries.map(function ([key, value]) {
return [(hash.bind(key))(), value];}))}
Hash.prototype[HashCode] = function () {
return (hash.bind(this.map))();};
const Stepable = Symbol("Stepable");
Number.prototype[Stepable] = new ObjectLiteral({inc() {
return plus.call(this,(1));
}, dec() {
return minus.call(this,(1));
}});
BigInt.prototype[Stepable] = new ObjectLiteral({inc() {
return plus.call(this,1n);
}, dec() {
return minus.call(this,1n);
}});
function inc() {
return this[Stepable].inc.call(this);}
function dec() {
return this[Stepable].dec.call(this);}
function Range(start, end, exclusive__q) {
assert__b(Number.isInteger(start), 42, 11, `Number.isInteger(start)`,);
assert__b(Number.isInteger(end), 43, 11, `Number.isInteger(end)`,);
this.start = start
this.end = end
this.exclusive__q = truthy(exclusive__q)}
Range.prototype[Symbol.iterator] = function *() {
let i = this.start;
let end = this.end;
if (truthy(this.exclusive__q)) {
end = (dec.bind(end))()
} else {

};
while (less_than_eq.call(i,end)) {
yield i
i = (inc.bind(i))()
};};
const Record = Symbol("Record");
Map[Record] = function (entries) {
return new Map(entries);};
ObjectLiteral[Record] = function (entries) {
return (from_entries.bind(entries))();};
Hash[Record] = function (entries) {
return new Hash(entries);};
function truthy__q() {
return truthy(this);}
function record__q() {
return (truthy__q.bind(this.constructor[Record]))();}
function construct_record(entries) {
return this[Record](entries);}
const Vector = Symbol("Vector");
Array[Vector] = function (entries) {
return entries;};
function construct_vector(entries) {
return this[Vector](entries);}
const Deconstruct = Symbol("Deconstruct");
Map.prototype[Deconstruct] = function () {
return (from_entries.bind(this.entries()))();};
ObjectLiteral.prototype[Deconstruct] = function () {
return this;};
Hash.prototype[Deconstruct] = function () {
return (from_entries.bind(this.raw_entries))();};
Array.prototype[Deconstruct] = function () {
return this;};
function deconstruct() {
return this[Deconstruct]();}
function deconstruct_this(f) {
return function () {
return f.bind(this)((deconstruct.bind(this))());};}
function deconstruct_args(f) {
return function (...args) {
return f.bind(this)(...(map.bind(args))((...__args) => (deconstruct.bind(__args[0]))()));};}
const Call = Symbol("Call");
Function.prototype[Call] = function (...args) {
return this(...args);};
Set.prototype[Call] = function (key) {
return this.has(key);};
Map.prototype[Call] = function (key) {
return this.get(key);};
ObjectLiteral.prototype[Call] = function (key) {
return this[key];};
Array.prototype[Call] = function (index) {
return this.at(index);};
Hash.prototype[Call] = function (key) {
return (at.bind(this))(key);};
String.prototype[Call] = function (collection) {
if (truthy(or.call(typeof(collection) === "string", () => collection instanceof Keyword))) {
return collection[this];
} else {
return (call.bind(collection))(this);
};};
Number.prototype[Call] = function (collection) {
if (truthy(collection instanceof Keyword)) {
return this[collection];
} else {
return (call.bind(collection))(this);
};};
Keyword.prototype[Call] = function (collection) {
if (truthy(or.call((collection instanceof Keyword), () => typeof(collection) === "string"))) {
return collection[this];
} else {
return (call.bind(collection))(this);
};};
Range.prototype[Call] = function (value) {
if (truthy(this.exclusive__q)) {
return and.call(greater_than_eq.call(value,this.start), () => less_than.call(value,this.end));
} else {
return and.call(greater_than_eq.call(value,this.start), () => less_than_eq.call(value,this.end));
};};
function call(...args) {
return this?.[Call](...args);}
Set.prototype[Keyword.for("bind")] = function (val) {
return function () {
return (call.bind(this))(val);}.bind(this);};
const Pipe = Symbol("Pipe");
Object.prototype[Pipe] = function (callable) {
return (call.bind(callable))(this);};
function freeze() {
return Object.freeze(this);}
let nil__q = (freeze.bind(new Set([undefined, null])))();
function pipe(callable) {
return this?.[Pipe]((call.bind(callable)));}
function compose(first_fn, ...fns) {
return function (...args) {
return (reduce.bind(fns))(function (result, f) {
return (call.bind(f))(result);}, (call.bind(first_fn))(...args));};}
function impl_callable(f) {
f[Call] = function (first, ...rest) {
return (f.bind(first))(...rest);};
return f;}
const Equal = Symbol("Equal");
function strict_eq__q(other) {
return this === other;}
Number.prototype[Equal] = strict_eq__q;
String.prototype[Equal] = strict_eq__q;
BigInt.prototype[Equal] = strict_eq__q;
Boolean.prototype[Equal] = strict_eq__q;
Keyword.prototype[Equal] = strict_eq__q;
Function.prototype[Equal] = strict_eq__q;
function vector_eq__q(other) {
if (truthy(negate.call(eq__q.call((len.bind(this))(), (len.bind(other))())))) {
return false;
} else {

};
return (every__q.bind((zip.bind(this))(other)))(function ([a, b]) {
return eq__q.call(a, b);});}
function record_eq__q(other) {
if (truthy(negate.call((record__q.bind(other))()))) {
return false;
} else {

};
if (truthy(negate.call(eq__q.call((len.bind(this))(), (len.bind(other))())))) {
return false;
} else {

};
return (every__q.bind(this))(function (key, value) {
return eq__q.call((at.bind(other))(key), value);});}
Set.prototype[Equal] = vector_eq__q;
Array.prototype[Equal] = vector_eq__q;
Map.prototype[Equal] = record_eq__q;
ObjectLiteral.prototype[Equal] = record_eq__q;
Hash.prototype[Equal] = record_eq__q;
let eq__q = impl_callable(function eq__q(other) {
if (truthy((nil__q.bind(this))())) {
return this === other;
} else {
return this[Equal](other);
};})
const Clone = Symbol("Clone");
Range.prototype[Clone] = new ObjectLiteral({clone() {
return new Range(this.start, this.end, this.exclusive__q);
}, deep_clone() {
return new Range((clone.bind(this.start))(), (clone.bind(this.end))(), this.exclusive__q);
}});
ObjectLiteral.prototype[Clone] = new ObjectLiteral({clone() {
return new ObjectLiteral({...this});
}, deep_clone() {
return (map.bind(this))(function (k, v) {
return [k, (deep_clone.bind(v))()];});
}});
Hash.prototype[Clone] = new ObjectLiteral({clone() {
return new Hash(this.raw_entries.slice());
}, deep_clone() {
return (map.bind(this))(function (k, v) {
return [k, (deep_clone.bind(v))()];});
}});
Array.prototype[Clone] = new ObjectLiteral({clone() {
return this.slice();
}, deep_clone() {
return (map.bind(this))(deep_clone);
}});
Map.prototype[Clone] = new ObjectLiteral({clone() {
return new Map(this);
}, deep_clone() {
return (map.bind(this))(deep_clone);
}});
Set.prototype[Clone] = new ObjectLiteral({clone() {
return new Set(this);
}, deep_clone() {
return (map.bind(this))(deep_clone);
}});
let clone = impl_callable(function clone() {
return this[Clone].clone.call(this);})
let deep_clone = impl_callable(function deep_clone() {
return this[Clone].deep_clone.call(this);})
const Identity = Symbol("Identity");
Number.prototype[Identity] = (0);
BigInt.prototype[Identity] = 0n;
String.prototype[Identity] = "";
Array.prototype[Identity] = [];
ObjectLiteral.prototype[Identity] = new ObjectLiteral({});
Map.prototype[Identity] = construct_record.call(Map, []);
Hash.prototype[Identity] = construct_record.call(Hash, []);
Set.prototype[Identity] = new Set([]);
function identity() {
if (truthy((nil__q.bind(this))())) {
return this;
} else {
return this[Identity];
};}
const Collection = Symbol("Collection");
function entries() {
return Object.entries(this);}
function from_entries() {
return new ObjectLiteral(Object.fromEntries(this));}
function values() {
return Object.values(this);}
ObjectLiteral.prototype[Collection] = new ObjectLiteral({at(key) {
return this[key];
}, sample() {
return (values.bind(this))()[(0)];
}, each(f) {
return (entries.bind(this))().forEach(function ([k, v]) {
return f(k, v);});
}, find(f) {
return (entries.bind(this))().find(function ([k, v]) {
return (pipe.bind(f(k, v)))(truthy);});
}, map(f) {
return (from_entries.bind((entries.bind(this))().map(function ([k, v]) {
return f(k, v);})))();
}, flat_map(f) {
return (from_entries.bind((entries.bind(this))().map(function ([k, v]) {
return (entries.bind(f(k, v)))();}).flat()))();
}, filter(f) {
return (from_entries.bind((entries.bind(this))().filter(function ([k, v]) {
return (pipe.bind(f(k, v)))(truthy);})))();
}, some__q(f) {
return (entries.bind(this))().some(function ([k, v]) {
return (pipe.bind(f(k, v)))(truthy);});
}, every__q(f) {
return (entries.bind(this))().every(function ([k, v]) {
return (pipe.bind(f(k, v)))(truthy);});
}, reduce(f, start) {
return (entries.bind(this))().reduce(f, start);
}, insert(key, value) {
return new ObjectLiteral({...this, [key]: value});
}, concat(other) {
return new ObjectLiteral({...this, ...other});
}, update(key, update_fn) {
return (insert.bind(this))(key, (call.bind(update_fn))((at.bind(this))(key)));
}, empty__q() {
return eq__q.call((len.bind(this))(), (0));
}, has__q(key) {
return (truthy__q.bind(this[key]))();
}, len() {
return Object.keys(this).length;
}, remove(key) {
let obj = (clone.bind(this))();
js_object_delete(obj, key)
return obj;
}});
Array.prototype[Collection] = new ObjectLiteral({at(idx) {
return this.at(idx);
}, sample() {
return this[(0)];
}, each(f) {
return this.forEach(f);
}, find(f) {
return this.find(compose(f, truthy));
}, map(f) {
return this.map(f);
}, flat_map(f) {
return (map.bind(this))(f).flat();
}, filter(f) {
return this.filter(compose(f, truthy));
}, some__q(f) {
return this.some(compose(f, truthy));
}, every__q(f) {
return this.every(compose(f, truthy));
}, reduce(f, start) {
return this.reduce(f, start);
}, insert(value) {
return [...this, value];
}, concat(other) {
return [...this, ...other];
}, update(val, update_fn) {
return (map.bind(this))(function (v) {
if (truthy(eq__q.call(val, v))) {
return (call.bind(update_fn))(val);
} else {
return v;
};});
}, empty__q() {
return eq__q.call(this.length, (0));
}, has__q(val) {
return or.call(this.includes(val), () => (some__q.bind(this))(function (v) {
return eq__q.call(v, val);}));
}, len() {
return this.length;
}, remove(val) {
return (filter.bind(this))(function (v) {
return negate.call(eq__q.call(v, val));});
}});
Hash.prototype[Collection] = new ObjectLiteral({at(key) {
return this.map.get((hash.bind(key))());
}, sample() {
return this.raw_entries[(0)];
}, each(f) {
for  (let [k, v] of this.raw_entries) {
f(k, v)
};
}, map(f) {
let new_hash = new Hash([]);
for  (let [k, v] of this.raw_entries) {
new_hash = (insert.bind(new_hash))(...f(k, v))
};
return new_hash;
}, find(f) {
for  (let [k, v] of this.raw_entries) {
if (truthy(f(k, v))) {
return v;
} else {

};
};
}, flat_map(f) {
let new_hash = new Hash([]);
for  (let [k, v] of this) {
for  (let [_k, _v] of f(k, v)) {
new_hash = (insert.bind(new_hash))(k, f(v))
};
};
return new_hash;
}, filter(f) {
let new_hash = new Hash([]);
for  (let [k, v] of this.raw_entries) {
if (truthy(f(k, v))) {
new_hash = (insert.bind(new_hash))(k, f(v))
} else {

};
};
return new_hash;
}, some__q(f) {
for  (let [k, v] of this.raw_entries) {
if (truthy(f(k, v))) {
return true;
} else {

};
};
return false;
}, every__q(f) {
for  (let [k, v] of this.raw_entries) {
if (truthy(negate.call(f(k, v)))) {
return false;
} else {

};
};
return true;
}, reduce(f, start) {
let acc = start;
for  (let [k, v] of this.raw_entries) {
acc = f(acc, k, v)
};
return acc;
}, insert(k, v) {
return new Hash([...this.raw_entries, [k, v]]);
}, concat(other) {
let new_hash = (clone.bind(this))();
for  (let [k, v] of other) {
new_hash = (insert.bind(new_hash))(k, v)
};
return new_hash;
}, update(key, update_fn) {
return (insert.bind(this))(key, (call.bind(update_fn))((at.bind(this))(key)));
}, empty__q() {
return eq__q.call(this.raw_entries.length, (0));
}, has__q(key) {
return (truthy__q.bind((at.bind(this))(key)))();
}, len() {
return this.raw_entries.length;
}, remove(key) {
return (filter.bind(this))(function (k, v) {
return negate.call(eq__q.call(k, key));});
}});
Map.prototype[Collection] = new ObjectLiteral({at(key) {
return this.get(key);
}, sample() {
return this.values().next().value;
}, each(f) {
for  (let [k, v] of this) {
f(k, v)
};
}, map(f) {
let new_map = new Map([]);
for  (let [k, v] of this) {
new_map.set(k, f(v))
};
return new_map;
}, find(f) {
for  (let [k, v] of this) {
if (truthy(f(k, v))) {
return v;
} else {

};
};
}, flat_map(f) {
let new_map = new Map([]);
for  (let [k, v] of this) {
for  (let [_k, _v] of f(k, v)) {
new_map.set(k, f(v))
};
};
return new_map;
}, filter(f) {
let new_map = new Map([]);
for  (let [k, v] of this) {
if (truthy(f(k, v))) {
new_map.set(k, f(v))
} else {

};
};
return new_map;
}, some__q(f) {
for  (let [k, v] of this) {
if (truthy(f(k, v))) {
return true;
} else {

};
};
return false;
}, every__q(f) {
for  (let [k, v] of this) {
if (truthy(negate.call(f(k, v)))) {
return false;
} else {

};
};
return true;
}, reduce(f, start) {
let acc = start;
for  (let [k, v] of this) {
acc = f(acc, k, v)
};
return acc;
}, insert(k, v) {
return (clone.bind(this))().set(k, v);
}, concat(other) {
let new_map = (clone.bind(this))();
for  (let [k, v] of other) {
new_map.set(k, v)
};
return new_map;
}, update(key, update_fn) {
return (insert.bind(this))(key, (call.bind(update_fn))((at.bind(this))(key)));
}, empty__q() {
return eq__q.call(this.size, (0));
}, has__q(key) {
return (truthy__q.bind((at.bind(this))(key)))();
}, len() {
return this.size;
}, remove(key) {
let map = (clone.bind(this))();
map.remove(key)
return map;
}});
Set.prototype[Collection] = new ObjectLiteral({at(val) {
if (truthy(this.has(val))) {
return val;
} else {

};
}, sample() {
return this.values().next().value;
}, each(f) {
for  (let elem of this) {
f(elem)
};
}, map(f) {
let out = new Set([]);
for  (let elem of this) {
out.add(f(elem))
};
return out;
}, find(f) {
for  (let elem of this) {
if (truthy(f(elem))) {
return elem;
} else {

};
};
}, flat_map(f) {
let out = new Set([]);
for  (let elem of this) {
for  (let x of f(elem)) {
out.add(x)
};
};
return out;
}, reduce(f, start) {
let acc = start;
for  (let elem of this) {
acc = f(acc, elem)
};
return acc;
}, filter(f) {
let out = new Set([]);
for  (let elem of this) {
if (truthy(f(elem))) {
out.add(elem)
} else {

};
};
return out;
}, some__q(f) {
for  (let elem of this) {
if (truthy(f(elem))) {
return true;
} else {

};
};
return false;
}, every__q(f) {
for  (let elem of this) {
if (truthy(negate.call(f(elem)))) {
return false;
} else {

};
};
return true;
}, insert(elem) {
return (clone.bind(this))().add(elem);
}, concat(other) {
let new_set = (clone.bind(this))();
for  (let item of other) {
new_set.add(item)
};
return new_set;
}, update(key, update_fn) {
let new_set = (clone.bind(this))();
new_set.remove(key)
new_set.add((call.bind(update_fn))(key))
return new_set;
}, empty__q() {
return eq__q.call(this.size, (0));
}, has__q(val) {
return this.has(val);
}, len() {
return this.size;
}, remove(key) {
let set = (clone.bind(this))();
set.remove(key)
return set;
}});
String.prototype[Collection] = new ObjectLiteral({at(idx) {
return this.at(idx);
}, sample() {
return this[(0)];
}, each(f) {
for  (let char of this) {
f(char)
};
}, map(f) {
let out = "";
for  (let char of this) {
out = plus.call(out,f(char))
};
return out;
}, flat_map(f) {
let out = "";
for  (let char of this) {
out = plus.call(out,f(char))
};
return out;
}, find(f) {
for  (let char of this) {
if (truthy(f(char))) {
return char;
} else {

};
};
}, filter(f) {
let out = "";
for  (let char of this) {
if (truthy(f(char))) {
out = plus.call(out,char)
} else {

};
};
}, some__q(f) {
for  (let char of this) {
if (truthy(f(char))) {
return true;
} else {

};
};
return false;
}, every__q(f) {
for  (let char of this) {
if (truthy(negate.call(f(char)))) {
return false;
} else {

};
};
return true;
}, reduce(f, start) {
let out = start;
for  (let char of this) {
out = f(out, char)
};
return out;
}, insert(char) {
return plus.call(this,char);
}, concat(str) {
return plus.call(this,str);
}, update(idx, update_fn) {
let [before, after] = [this.slice((0), idx), this.slice(idx, (-1))];
return plus.call(before,plus.call((call.bind(update_fn))((at.bind(this))(idx)),after));
}, empty__q() {
return eq__q.call(this.length, (0));
}, has__q(substr) {
return this.includes(substr);
}, len() {
return this.length;
}, remove(substr) {
let idx = this.indexOf(substr);
return plus.call(this.slice((0), idx),this.slice(plus.call(idx,(len.bind(substr))())));
}});
function zip(other) {
return (map_with_index.bind(this))(function (val, i) {
return [val, (at.bind(other))(i)];});}
function at(key_or_idx) {
return this[Collection].at.call(this, key_or_idx);}
function sample() {
return this[Collection].sample.call(this);}
function each(f) {
return this[Collection].each.call(this, (call.bind(f)));}
function map(...fns) {
return this[Collection].map.call(this, compose(...fns));}
function map_with_index(...fns) {
return (map.bind(this))(...fns);}
function flat_map(...fns) {
return this[Collection].flat_map.call(this, compose(...fns));}
function find(f) {
return this[Collection].find.call(this, (call.bind(f)));}
function filter(f) {
return this[Collection].filter.call(this, (call.bind(f)));}
function some__q(...fns) {
return this[Collection].some__q.call(this, compose(...fns));}
function every__q(...fns) {
return this[Collection].every__q.call(this, compose(...fns));}
function reduce(f, start) {
if (truthy((nil__q.bind(start))())) {
start = (identity.bind((sample.bind(this))()))()
} else {

};
return this[Collection].reduce.call(this, (call.bind(f)), start);}
function insert(...args) {
return this[Collection].insert.call(this, ...args);}
function concat(other) {
return this[Collection].concat.call(this, other);}
function merge(other) {
return (concat.bind(this))(other);}
function update(key, update_fn) {
return this[Collection].update.call(this, key, update_fn);}
function empty__q() {
return this[Collection].empty__q.call(this);}
function not_empty__q() {
return negate.call((empty__q.bind(this))());}
function has__q(key_or_value) {
return this[Collection].has__q.call(this, key_or_value);}
function len() {
return this[Collection].len.call(this);}
function remove(key_or_val) {
return this[Collection].remove.call(this, key_or_val);}
function keep(callable) {
return (filter.bind(this))(callable);}
function discard(callable) {
return (filter.bind(this))(compose(callable, negate.call(_)));}
const OrderedCollection = Symbol("OrderedCollection");
Array.prototype[OrderedCollection] = new ObjectLiteral({first() {
return this[(0)];
}, last() {
return this.at((-1));
}, skip(n) {
return this.slice(n);
}, take_last(n) {
return this.slice(minus.call((-1),n), (-1));
}, take(n) {
return this.slice((0), n);
}, sort(f) {
return (clone.bind(this))().sort(f);
}, reverse() {
return (clone.bind(this))().reverse();
}});
String.prototype[OrderedCollection] = new ObjectLiteral({first() {
return this[(0)];
}, last() {
return this.at((-1));
}, skip(n) {
return this.slice(n);
}, take_last(n) {
return this.slice(minus.call((-1),n), (-1));
}, take(n) {
return this.slice((0), n);
}, sort(f) {
return Array.from(this).sort(f).join("");
}, reverse() {
return Array.from(this).reverse().join("");
}});
Map.prototype[OrderedCollection] = new ObjectLiteral({first() {
return this.entries().next().value;
}, last() {
return Array.from(this).at((-1));
}, skip(n) {
return new Map(Array.from(this).slice(n));
}, take_last() {
return new Map(Array.from(this).slice(minus.call((-1),n), (-1)));
}, take() {
return new Map(Array.from(this).slice((0), n));
}, sort() {
return new Map(Array.from(this).sort(function ([_k1, v1], [_k2, v2]) {
return minus.call(v2,v1);}));
}, reverse() {
return new Map(Array.from(this).reverse());
}});
function first() {
return this[OrderedCollection].first.call(this);}
function last() {
return this[OrderedCollection].last.call(this);}
function skip(n) {
return this[OrderedCollection].skip.call(this, n);}
function take_last(n) {
return this[OrderedCollection].take_last.call(this, n);}
function take(n) {
return this[OrderedCollection].take.call(this, n);}
function sort() {
return this[OrderedCollection].sort.call(this);}
function reverse() {
return this[OrderedCollection].reverse.call(this);}
const Plus = Symbol("Plus");
const Negate = Symbol("Negate");
const Minus = Symbol("Minus");
const Times = Symbol("Times");
const Divide = Symbol("Divide");
const Exponent = Symbol("Exponent");
const Mod = Symbol("Mod");
const Comparable = Symbol("Comparable");
const LessThan = Symbol("LessThan");
const And = Symbol("And");
const Or = Symbol("Or");
Object.prototype[Negate] = function () {
return js_negate(this);};
Object.prototype[And] = function (thunk) {
return js_and(this, thunk);};
Object.prototype[Or] = function (thunk) {
return js_or(this, thunk);};
Number.prototype[Plus] = function (other) {
assert__b(typeof(other) === "number", 751, 11, `typeof(other) === "number"`,);
return js_plus(this, other);};
Number.prototype[Minus] = function (other) {
assert__b(typeof(other) === "number", 756, 11, `typeof(other) === "number"`,);
return js_minus(this, other);};
Number.prototype[Times] = function (other) {
assert__b(typeof(other) === "number", 761, 11, `typeof(other) === "number"`,);
return js_times(this, other);};
Number.prototype[Divide] = function (other) {
assert__b(typeof(other) === "number", 766, 11, `typeof(other) === "number"`,);
return js_divide(this, other);};
Number.prototype[Exponent] = function (other) {
assert__b(typeof(other) === "number", 771, 11, `typeof(other) === "number"`,);
return js_exponent(this, other);};
Number.prototype[Mod] = function (other) {
assert__b(typeof(other) === "number", 776, 11, `typeof(other) === "number"`,);
return js_mod(this, other);};
BigInt.prototype[Plus] = function (other) {
assert__b(typeof(other) === "bigint", 781, 11, `typeof(other) === "bigint"`,);
return js_plus(this, other);};
BigInt.prototype[Minus] = function (other) {
assert__b(typeof(other) === "bigint", 786, 11, `typeof(other) === "bigint"`,);
return js_minus(this, other);};
BigInt.prototype[Times] = function (other) {
assert__b(typeof(other) === "bigint", 791, 11, `typeof(other) === "bigint"`,);
return js_times(this, other);};
BigInt.prototype[Divide] = function (other) {
assert__b(typeof(other) === "bigint", 796, 11, `typeof(other) === "bigint"`,);
return js_divide(this, other);};
BigInt.prototype[Exponent] = function (other) {
assert__b(typeof(other) === "bigint", 801, 11, `typeof(other) === "bigint"`,);
return js_exponent(this, other);};
BigInt.prototype[Mod] = function (other) {
assert__b(typeof(other) === "bigint", 806, 11, `typeof(other) === "bigint"`,);
return js_mod(this, other);};
let ComparableMixin = new ObjectLiteral({greater_than_eq(other) {
return or.call((greater_than.bind(this))(other), () => (eq__q.call(this, other)));
}, less_than_eq(other) {
return or.call((less_than.bind(this))(other), () => (eq__q.call(this, other)));
}});
Number.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {
assert__b(typeof(other) === "number", 818, 13, `typeof(other) === "number"`,);
return js_greater_than(this, other);
}, less_than(other) {
assert__b(typeof(other) === "number", 822, 13, `typeof(other) === "number"`,);
return js_less_than(this, other);
}});
BigInt.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {
assert__b(typeof(other) === "bigint", 830, 13, `typeof(other) === "bigint"`,);
return js_greater_than(this, other);
}, less_than(other) {
assert__b(typeof(other) === "bigint", 834, 13, `typeof(other) === "bigint"`,);
return js_less_than(this, other);
}});
String.prototype[Plus] = function (other) {
assert__b(typeof(other) === "string", 840, 11, `typeof(other) === "string"`,);
return js_plus(this, other);};
String.prototype[Times] = function (amount) {
assert__b(typeof(amount) === "number", 845, 11, `typeof(amount) === "number"`,);
return this.repeat(amount);};
String.prototype[Comparable] = new ObjectLiteral({...ComparableMixin, greater_than(other) {
assert__b(typeof(other) === "string", 852, 13, `typeof(other) === "string"`,);
return js_greater_than(this, other);
}, less_than(other) {
assert__b(typeof(other) === "string", 856, 13, `typeof(other) === "string"`,);
return js_less_than(this, other);
}});
let plus = impl_callable(function plus(other) {
return (call.bind((find.bind(construct_record.call(Map, [[Plus, function () {
return this[Plus](other);}.bind(this)], [Collection, function () {
return (concat.bind(this))(other);}.bind(this)]])))(function (proto, f) {
return this[proto];}.bind(this))))();})
let negate = impl_callable(function negate() {
if (truthy((nil__q.bind(this))())) {
return true;
} else {
return this[Negate]();
};})
let minus = impl_callable(function minus(other) {
return this[Minus](other);})
let times = impl_callable(function times(other) {
return this[Times](other);})
let divide_by = impl_callable(function divide_by(other) {
return this[Divide](other);})
let exponent = impl_callable(function exponent(other) {
return this[Exponent](other);})
let mod = impl_callable(function mod(other) {
return this[Mod](other);})
let greater_than = impl_callable(function greater_than(other) {
return this[Comparable].greater_than.call(this, other);})
let greater_than_eq = impl_callable(function greater_than_eq(other) {
return this[Comparable].greater_than_eq.call(this, other);})
let less_than = impl_callable(function less_than(other) {
return this[Comparable].less_than.call(this, other);})
let less_than_eq = impl_callable(function less_than_eq(other) {
return this[Comparable].less_than_eq.call(this, other);})
let and = impl_callable(function and(thunk) {
if (truthy((nil__q.bind(this))())) {
return this;
} else {
return this[And](thunk);
};})
let or = impl_callable(function or(thunk) {
if (truthy((nil__q.bind(this))())) {
return thunk();
} else {
return this[Or](thunk);
};})
const Printable = Symbol("Printable");
function _resolve_keyword_str(kw) {
return kw.replaceAll("__q", "?").replaceAll("__b", "!");}
ObjectLiteral.prototype[Printable] = function () {
return (map.bind(this))(function (k, v) {
return [_resolve_keyword_str(k), (printable.bind(v))()];});};
Hash.prototype[Printable] = function () {
return (pipe.bind((map.bind(this))(function (k, v) {
return [(printable.bind(k))(), (printable.bind(v))()];}).raw_entries))((...__args) => new Map(__args[0]));};
Array.prototype[Printable] = function () {
return (map.bind(this))(printable);};
Set.prototype[Printable] = function () {
return plus.call("#{",plus.call(Array.from((map.bind(this))(printable)).join(", "),"}"));};
function print_for_generic_clone_object() {
let out = (clone.bind(this))();
for  (let [key, value] of (entries.bind(this))()) {
let new_key = _resolve_keyword_str(key);
out[new_key] = value
if (truthy(negate.call(eq__q.call(new_key, key)))) {
js_object_delete(out, key)
} else {

};
};
return out;}
Keyword.prototype[Printable] = function () {
return plus.call(":",_resolve_keyword_str(this.value));};
Boolean.prototype[Printable] = function () {
return this;};
String.prototype[Printable] = function () {
return this;};
function when(cond, f) {
if (truthy(cond(this))) {
return f(this);
} else {
return this;
};}
function otherwise(val) {
return or.call(this, () => val);}
let printable = impl_callable(function printable() {
if (truthy((nil__q.bind(this))())) {
return this;
} else {
return (otherwise.bind((call.bind((find.bind(construct_record.call(Map, [[Printable, function () {
return this[Printable]();}.bind(this)], [Clone, print_for_generic_clone_object.bind(this)]])))(function (proto) {
return this[proto];}.bind(this))))()))(this);
};})
function log(...args) {
console.log(...args, (printable.bind(this))())
return this;}
function str(...args) {
return args.join("");}
let int__q = impl_callable(function int__q() {
return Number.isInteger(this);})
let bigint__q = impl_callable(function bigint__q() {
return typeof(this) === "bigint";})
let float__q = impl_callable(function float__q() {
return and.call(typeof(this) === "number", () => negate.call(int__q(this)));})
let even__q = impl_callable(function even__q() {
return (mod.call(this,(2))) === (0);})
let pos__q = impl_callable(function pos__q() {
return greater_than_eq.call(this,(identity.bind(this))());})
let nan__q = impl_callable(function nan__q() {
return Number.isNaN(this);})
let to_f = impl_callable(function to_f() {
return Number(this);})
let to_i = impl_callable(function to_i() {
return (pipe.bind((to_f.bind(this))()))(Math.floor);})
let to_s = impl_callable(function to_s() {
return this.toString();})
let str__q = impl_callable(function str__q() {
return eq__q.call(typeof(this), "string");})
let to_b = impl_callable(function to_b() {
return truthy(this);})
let exists__q = impl_callable(function exists__q() {
return (to_b.bind((or.call(this, () => (eq__q.call(this, false))))))();})
let finite__q = impl_callable(function finite__q() {
return or.call((bigint__q.bind(this))(), () => Number.isFinite(this));})
let inf__q = impl_callable(function inf__q() {
return negate.call((finite__q.bind(this))());})
let to_lowercase = impl_callable(function to_lowercase() {
return this.toLowerCase();})
let as_set = impl_callable(function as_set() {
return new Set(this);})
let as_keyword = impl_callable(function as_keyword() {
return Keyword["for"](this.toString());})
let error__q = impl_callable(function error__q() {
return this instanceof Error;})
Set.prototype[Negate] = function () {
return (...__args) => negate.call(this.has(__args[0]));};
function pre(...args) {
let cond_fns = args.slice((0), (-1));
let f = args.at((-1));
return function (...args) {
assert__b((every__q.bind(cond_fns))(function (f) {
return (call.bind(f))(...args);}), 1043, 13, `(every__q.bind(cond_fns))(function (f) {
return (call.bind(f))(...args);})`,);
return f(...args);};}
function Args(schemas) {
this.schemas = schemas}
Args[Vector] = function (schemas) {
return new Args(schemas);};
Args.prototype[Call] = function (...args) {
return (every__q.bind(this.schemas))(function (schema, i) {
return (call.bind(schema))(args[i]);});};
Args.prototype[Negate] = function () {
return function (...args) {
return negate.call((call.bind(this))(...args));}.bind(this);};
function Schema(entries) {
this.entries = new Map(entries)}
Schema[Record] = function (entries) {
return new Schema(entries);};
Schema.prototype[Call] = function (record) {
return and.call((record__q.bind(record))(), () => (every__q.bind(this.entries))(function (k, schema) {
return (call.bind(schema))((at.bind(record))(k));}));};
Schema.prototype[Negate] = function () {
return function (record) {
return negate.call((call.bind(this))(record));}.bind(this);};
Schema.prototype[And] = function (thunk) {
return new Schema([...this.entries.entries(), ...thunk().entries.entries()]);};
Schema.prototype[Or] = function (thunk) {
return function (record) {
return (to_b.bind((or.call((call.bind(this))(record), () => (call.bind(thunk()))(record)))))();}.bind(this);};
function Underscore(transforms) {
this.transforms = transforms}
let _ = new Underscore([function (x) {
return x;}]);
_[HashCode] = function () {
return 2n;};
Underscore.prototype[Call] = function (value) {
return (call.bind(compose(...this.transforms)))(value);};
Underscore.prototype[Comparable] = new ObjectLiteral({less_than(val) {
return new Underscore([...this.transforms, function (my_value) {
return less_than.call(my_value,val);}]);
}, greater_than(val) {
return new Underscore([...this.transforms, function (my_value) {
return greater_than.call(my_value,val);}]);
}, less_than_eq(val) {
return new Underscore([...this.transforms, function (my_value) {
return less_than_eq.call(my_value,val);}]);
}, greater_than_eq(val) {
return new Underscore([...this.transforms, function (my_value) {
return greater_than_eq.call(my_value,val);}]);
}});
Underscore.prototype[Negate] = function () {
return function (val) {
return negate.call((call.bind(this))(val));}.bind(this);};
Underscore.prototype[Equal] = function (other) {
return new Underscore([...this.transforms, function (my_value) {
return eq__q.call(my_value, other);}]);};
Underscore.prototype[Collection] = new ObjectLiteral({at(idx) {
return new Underscore([...this.transforms, function (self) {
return (at.bind(self))(idx);}]);
}, sample() {
return new Underscore([...this.transforms, function (self) {
return (sample.bind(self))();}]);
}, each(f) {
return new Underscore([...this.transforms, function (self) {
return (each.bind(self))(f);}]);
}, find(f) {
return new Underscore([...this.transforms, function (self) {
return (find.bind(self))(f);}]);
}, map(f) {
return new Underscore([...this.transforms, function (self) {
return (map.bind(self))(f);}]);
}, flat_map(f) {
return new Underscore([...this.transforms, function (self) {
return (flat_map.bind(self))(f);}]);
}, filter(f) {
return new Underscore([...this.transforms, function (self) {
return (filter.bind(self))(f);}]);
}, some__q(f) {
return new Underscore([...this.transforms, function (self) {
return (some__q.bind(self))(f);}]);
}, every__q(f) {
return new Underscore([...this.transforms, function (self) {
return (every__q.bind(self))(f);}]);
}, reduce(f, start) {
return new Underscore([...this.transforms, function (self) {
return (reduce.bind(self))(f, start);}]);
}, insert(...args) {
return new Underscore([...this.transforms, function (self) {
return (insert.bind(self))(...args);}]);
}, concat(other) {
return new Underscore([...this.transforms, function (self) {
return (concat.bind(self))(other);}]);
}, update(key, update_fn) {
return new Underscore([...this.transforms, function (self) {
return (update.bind(self))(key, update_fn);}]);
}, empty__q() {
return new Underscore([...this.transforms, function (self) {
return (empty__q.bind(self))();}]);
}, has__q(k) {
return new Underscore([...this.transforms, function (self) {
return (has__q.bind(self))(k);}]);
}, len() {
return new Underscore([...this.transforms, function (self) {
return (len.bind(self))();}]);
}, remove(key_or_val) {
return new Underscore([...this.transforms, function (self) {
return (remove.bind(self))(key_or_val);}]);
}});
Underscore.prototype[Pipe] = function (f) {
return new Underscore([...this.transforms, f]);};
Underscore.prototype[And] = function (other) {
return function (value) {
return and.call((call.bind(this))(value), () => (call.bind(other))(value));}.bind(this);};
Underscore.prototype[Or] = function (other) {
return function (value) {
return or.call((call.bind(this))(value), () => (call.bind(other))(value));}.bind(this);};
Underscore.prototype[Plus] = function (other) {
return new Underscore([...this.transforms, function (my_value) {
return plus.call(my_value,other);}]);};
Underscore.prototype[Minus] = function (other) {
return new Underscore([...this.transforms, function (my_value) {
return minus.call(my_value,other);}]);};
Underscore.prototype[Times] = function (other) {
return new Underscore([...this.transforms, function (my_value) {
return times.call(my_value,other);}]);};
Underscore.prototype[Divide] = function (other) {
return new Underscore([...this.transforms, function (my_value) {
return divide_by.call(my_value,other);}]);};
Underscore.prototype[Exponent] = function (other) {
return new Underscore([...this.transforms, function (my_value) {
return exponent.call(my_value,other);}]);};
Underscore.prototype[Mod] = function (other) {
return new Underscore([...this.transforms, function (my_value) {
return mod.call(my_value,other);}]);};
function All(conds) {
this.conds = conds}
All[Vector] = function (conds) {
return new All(conds);};
All.prototype[Call] = function (val) {
return (every__q.bind(this.conds))(function (f) {
return (call.bind(f))(val);});};
function Any(conds) {
this.conds = conds}
Any[Vector] = function (conds) {
return new Any(conds);};
Any.prototype[Call] = function (val) {
return (some__q.bind(this.conds))(function (f) {
return (call.bind(f))(val);});};
const Effect = Symbol("Effect");
function run_effect() {
if (truthy(this[Effect])) {
return this[Effect]();
} else {
console.log("No effect found for", this)
raise(this)
};}
async function spawn(generator_fn) {
let generator = generator_fn();
let state = new ObjectLiteral({done: false});
let yield_result = null;
let effects = [];
while (negate.call(state.done)) {
state = await generator.next(yield_result)
if (truthy(state.done)) {
break;
} else {

};
let effect = state.value;
try {
yield_result = await (run_effect.bind(effect))()
} catch (error) {
state = await generator.throw(error)
yield_result = await (run_effect.bind(state.value))()
effects.push(state.value)};
effects.push(effect)
};
return new ObjectLiteral({effects, value: state.value});}
async function run(generator_fn) {
return (at.bind((await spawn(generator_fn))))(Keyword.for("value"));}
function CallEffectWith(effect, ...args) {
this.effect = effect
this.args = args}
function __coil_with(...args) {
return new CallEffectWith(this, ...args);}
CallEffectWith.prototype[Effect] = function () {
return this.effect[Effect](...this.args);};
function intern_vec(klass) {
if (truthy(negate.call(klass.cache))) {
klass.cache = construct_record.call(Map, [])
klass[Vector] = function (args) {
let hash_value = (hash.bind(args))();
let __coil_if_let_temp = klass.cache.get(hash_value);
if (truthy(__coil_if_let_temp)) {
let obj = __coil_if_let_temp;
return obj;
} else {
let obj = new klass(...args);
klass.cache.set(hash_value, obj)
return obj;
};};
} else {

};
return klass;}
let Fetch = intern_vec(function Fetch(method, url, status) {
this.method = method
this.url = url
this.status = status})
let Eff = intern_vec(function Eff(...descriptors) {
this.descriptors = descriptors
for  (let i of new Range((0), descriptors.length)) {

};})
function HttpError(code, message) {
this.name = "HttpError"
this.message = message
this.stack = (new Error()).stack
this.code = (as_keyword.bind(code))()}
HttpError.prototype = new Error()
function JSONRequest(url) {
this.url = url}
JSONRequest.prototype[Effect] = function () {
return fetch(this.url).then(async function (res) {
if (truthy(negate.call(res.ok))) {
let text = await res.text();
return Promise.reject(new HttpError(res.status, text));
} else {

};
return res.json();});};
function json_req(url) {
return new JSONRequest(url);}
let http = new ObjectLiteral({async*get(url) {
if (truthy(Effect in construct_vector.call(Fetch, [Keyword.for("get"), url, Keyword.for("init")]))) {
yield construct_vector.call(Fetch, [Keyword.for("get"), url, Keyword.for("init")])
} else {

};
if (truthy(Effect in construct_vector.call(Fetch, [Keyword.for("get"), url, Keyword.for("loading")]))) {
yield construct_vector.call(Fetch, [Keyword.for("get"), url, Keyword.for("loading")])
} else {

};
try {
return yield json_req(url);
} catch (error) {
if (truthy(Effect in construct_vector.call(Fetch, [Keyword.for("get"), url, error.code]))) {
yield (__coil_with.bind(construct_vector.call(Fetch, [Keyword.for("get"), url, error.code])))(error)
} else {
yield (__coil_with.bind(construct_vector.call(Fetch, [Keyword.for("get"), url, Keyword.for("error")])))(error)
};
return error;};
}});
function Exec() {
}
Exec[Vector] = function ([map_fn, _for, collection, ...rest]) {
assert__b(eq__q.call(_for, Keyword.for("for")), 1305, 11, `eq__q.call(_for, Keyword.for("for"))`,);
assert__b(Call in map_fn, 1306, 11, `Call in map_fn`,);
let result = collection;
if (truthy(eq__q.call((first.bind(rest))(), Keyword.for("if")))) {
let [_if, filter_fn, ..._rest] = rest;
rest = _rest
assert__b(Call in filter_fn, 1312, 13, `Call in filter_fn`,);
result = (filter.bind(result))(filter_fn)
} else {

};
result = (map.bind(result))(map_fn)
if (truthy(eq__q.call((first.bind(rest))(), Keyword.for("verify")))) {
let [_verify, verify_fn, ..._rest] = rest;
assert__b((every__q.bind(result))(verify_fn), 1320, 13, `(every__q.bind(result))(verify_fn)`,);
} else {

};
return result;};
function CollectionView(collection, idx) {
this.collection = collection
this.idx = idx}
CollectionView.prototype[OrderedCollection] = new ObjectLiteral({first() {
return (at.bind(this.collection))(this.idx);
}, last() {
return (last.bind(this.collection))();
}, skip(n) {
return new CollectionView(this.collection, plus.call(this.idx,n));
}});
CollectionView.prototype[Collection] = new ObjectLiteral({at(idx) {
return (at.bind(this.collection))(plus.call(this.idx,idx));
}, len() {
return minus.call((len.bind(this.collection))(),this.idx);
}, empty__q() {
return eq__q.call((len.bind(this))(), (0));
}});
CollectionView.prototype[Printable] = function () {
return (skip.bind(this.collection))(this.idx);};
function DefVector() {
}
DefVector[Vector] = function (properties) {
let Constructor = null;
if (truthy(eq__q.call((first.bind(properties))(), _))) {
let kw = (at.bind(properties))((1));
Constructor = function (...args) {
this[kw] = args}
} else {
Constructor = function (...args) {
for  (let [key, arg] of (zip.bind(properties))(args)) {
this[key] = arg
};}
};
Constructor[Vector] = function (args) {
return new Constructor(...args);};
return Constructor;};
function DefRecord() {
}
DefRecord[Vector] = function (property_name) {
let Constructor = function (entries) {
this[property_name] = entries};
Constructor[Record] = function (entries) {
return new Constructor(entries);};
return Constructor;};let input = Deno.readTextFileSync("./aoc/q1.txt");
(log.bind((reduce.bind((take_last.bind((sort.bind((map.bind(input.split("\n\n")))((...__args) => __args[0].split("\n"), (...__args) => (map.bind(__args[0]))(to_i), (...__args) => (reduce.bind(__args[0]))(plus))))()))((3))))(plus)))()