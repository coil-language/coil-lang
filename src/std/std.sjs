fn protocol_for(sym) {
  let proto = this[sym]
  let self = this
  return new Proxy(proto, {
    fn get(target, method) = target[method].bind(self)
  })
}
