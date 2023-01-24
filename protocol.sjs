protocol Iterator

impl Iterator for Object = {
  fn each(f) = Object.entries(this).forEach(fn ([k, v]) = f(k, v))
  fn map(f) = Object.fromEntries(Object.entries(this).map(fn ([k, v]) = f(k, v))
  fn filter(f) = Object.fromEntries(Object.entires(this).filter(fn ([k, v]) = f(k, v))
}

impl Iterator for Array = {
  fn each(f) = this.forEach(f)
  fn map(f) = this.map(f)
  fn filter(f) = this.filter(f)
}

fn each(f) = this[Iterator].each(f)
fn map(f) = this[Iterator].map(f)
fn filter(f) = this[Iterator].filter(f)

{ a: 10, b: 20 }::filter(fn(k, v) = v > 10)
[1, 2]::filter(fn(x) = x > 1)
