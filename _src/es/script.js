let sample = "aa";

class Person {
  constructor(name, mt) {
    this.name = name;
    this.mt = mt;
  }
  climb() {
    console.log(`${this.name} is climbing ${this.mt}`);
  }
}

let kokona = new Person('CCCCC', 'BBB');
kokona.climb();
