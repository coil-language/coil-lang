protocol Callable

impl Callable for Function = {
  fn call(...args) = this(...args)
}
impl Callable for Set = {
  fn call(key) = this.has(key)
}
impl Callable for Object = {
  fn call(key) = this[key]
}
// impl get for Object & make this object[get](this)
impl Callable for String = {
  fn call(object) = object[this]
}
impl Callable for Array = {
  fn call(index) = this.at(index)
}

fn call(...args) = this::(this[Callable].call)(...args)
