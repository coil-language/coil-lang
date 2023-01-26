protocol Equal

impl Equal for Number = {
  fn eq?(other) = this === other
}

impl Equal for String = {
  fn eq?(other) = this === other
}

impl Equal for BigInt = {
  fn eq?(other) = this === other
}

impl Equal for Array = {
  fn eq?(other) {
    if other is not Array {
      return false
    }
    if this.length !== other.length {
      return false
    }
    return this.every(fn(value, index) = value[Equal](other[index]))
  }
}

impl Equal for Map = {
  fn eq?(other) {
    if other is not Map {
      return false
    }
    if this.size !== other.size {
      return false
    }
    for let [key, value] of this.entries() {
      if !other.get(key)[Equal](value) {
        return false
      }
    }
    return true
  }
}
impl Equal for Object = {
  fn eq?(other) {
    for let [key, value] of Object.entries(this) {
      if !value[Equal](other[key]) {
        return false
      }
    }
    return true
  }
}

fn eq?(a, b) = a::(a[Equal].eq?)(b)
