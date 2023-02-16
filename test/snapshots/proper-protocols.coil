protocol Iterator

fn split(f) = fn(arr) = f(arr[0], arr[1])

impl Iterator for Object = {
  fn each(f) = Object.entries(this).forEach(split(f)),
  fn map(f) = Object.fromEntries(Object.entries(this).map(split(f))),
  fn filter(f) = Object.fromEntries(Object.entries(this).filter(split(f))),
}

impl Iterator for Array = {
  fn each(f) = this.forEach(f)
  fn map(f) = this.map(f)
  fn filter(f) = this.filter(f)
}

fn get_protocol(sym) {
  let proto = this[sym]
  let self = this
  return new Proxy(proto, {
    fn get(target, method) = target[method].bind(self)
  })
}

fn iter() = this::get_protocol(Iterator)

fn each(f) = this::iter().each(f)
fn map(f) = this::iter().map(f)
fn filter(f) = this::iter().filter(f)

console.log({ a: 10, b: 20 }::filter(fn(k, v) = v > 10))
console.log([1, 2, 3]::filter(fn(x) = x > 1))
