// Interface segregation principle
// (ті класи які наслідуються від базовго класу якщо вони не використовують методи базового класу то вони не повинні від них залежати)

/* class Animal {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log(this.name, "can walk");
  }
  swim() {
    console.log(this.name, "can swim");
  }
  fly() {
    console.log(this.name, "can fly");
  }
}

class Dog extends Animal {
  fly() {
    return null;
  }
}

class Eagle extends Animal {
  swim() {
    return null;
  }
}

class Whale extends Animal {
  fly() {
    return null;
  }
  walk() {
    return null;
  }
}

const dog = new Dog("Rex");
const eagle = new Eagle("Mark");
const whale = new Whale("Big Bob");

dog.swim();
dog.fly(); // error !!!!
dog.walk();
 */

class Animal {
  constructor(name) {
    this.name = name;
  }
}
const swimmer = {
  swim() {
    console.log(this.name, "can swim");
  }
};
const flier = {
  fly() {
    console.log(this.name, "can fly");
  }
};
const walker = {
  walk() {
    console.log(this.name, "can walk");
  }
};

class Dog extends Animal {}
class Eagle extends Animal {}
class Whale extends Animal {}

Object.assign(Dog, swimmer, walker);
Object.assign(Eagle, flier, walker);
Object.assign(Whale, flier);

const dog = new Dog("Rex");
const eagle = new Eagle("Mark");
const whale = new Whale("Big Bob");

dog.swim();
dog.walk();
