# Protocol Methods

In coil the primary technique of polymorphism is called protocol methods. 

In its most basic form, its just a protocol and a function.

```
protocol Speak
fn speak = this[Speak]()
```

`speak` is a protocol method, as it is a function that looks up a protocol on `this`.

Let's take a look at some examples:

```
fn Dog(@name) {}
fn Cat(@name) {}

impl Speak for Dog = fn = str(this.name " says ruff")
impl Speak for Cat = fn = str(this.name " says meow")

new Dog("junior")::speak() // "junior says ruff"
new Cat("fluffy")::speak() // "fluffy says meow"
```

# Working with Protocol Objects

Now sometimes a protocol has more than 1 method, this is called protocol objects, we need to do a little more work to define the protocol methods.

```
protocol Storage

fn Bank(@user->amount) {}

impl Storage for Bank = {
  fn get_item(user_id) = this.user->amount.get(user_id)
  fn store_item(user_id amount) = this.user->amount.set(user_id amount)
}

fn get_item(key) = this[Storage].get_item.call(this key)
fn store_item(key value) = this[Storage].store_item.call(this key)

let bank = new Bank(Map{marcelle: 100000000000})

bank::get_item(:marcelle) // 100000000000
bank::store_item(:marcelle 0)
bank::get_item(:marcelle) // 0
```
