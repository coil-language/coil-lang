protocol Iter

impl Iter for Object = {
  fn each(f) = Object.entries(this).forEach(fn ([k, v]) = f(k, v))
  fn map(f) = Object.fromEntries(Object.entries(this).map(fn ([k, v]) = f(k, v)))
  fn filter(f) = Object.fromEntries(Object.entries(this).filter(fn ([k, v]) = f(k, v)))
  fn reduce(f, start) = Object.entries(this).reduce(f, start)
  fn insert(key, value) = Object.assign(this, {[key]: value})
  fn sum() = Object.entries(this).map(fn ([_, v]) = v).reduce(fn (acc, x) = acc + x, 0)
  fn some?(f) = Object.fromEntries(Object.entries(this).some(fn([k, v]) = f(k, v)))
  fn every?(f) = Object.fromEntries(Object.entries(this).every(fn([k, v]) = f(k, v)))
}

impl Iter for Array = {
  fn each(f) = this.forEach(f)
  fn map(f) = this.map(f)
  fn filter(f) = this.filter(f)
  fn reduce(f, start) = this.reduce(f, start)
  fn insert(value) = [...this, value]
  fn sum() = this.reduce(fn (acc, x) = acc + x, 0)
  fn some?(f) = this.some(f)
  fn every?(f) = this.every(f)
}

impl Iter for Set = {
  fn each(f) {
    for let elem of this {
      f(elem)
    }
  }
  fn map(f) {
    let out = new Set([])
    for let elem of this {
      out.add(f(elem))
    }
    return out
  }
  fn reduce(f, start) {
    let acc = start
    for let elem of this {
      acc = f(acc, elem)
    }
    return acc
  }
  fn filter(f) {
    let out = new Set([])
    for let elem of this {
      if f(elem) {
        out.add(elem)
      }
    }
    return out
  }
  fn insert(elem) = new Set(a).add(elem)
  fn sum() = Array.from(this).reduce(fn (acc, x) = acc + x, 0)
  fn some?(f) {
    for let elem of this {
      if f(elem) {
        return true
      }
    }
    return false
  }
  fn every?(f) {
    for let elem of this {
      if !f(elem) {
        return false
      }
    }
    return true
  }
}


fn iter() = this::protocol_for(Iter)

fn each(f) = this::iter().each(f::call)
fn map(f) = this::iter().map(f::call)
fn filter(f) = this::iter().filter(f::call)
fn reduce(f, start) = this::iter().reduce(f::call, start)
fn insert(...args) = this::iter().insert(...args)
fn sum() = this::iter().sum()
fn some?(f) = this::iter().some(f::call)
fn every?(f) = this::iter().every(f::call)
