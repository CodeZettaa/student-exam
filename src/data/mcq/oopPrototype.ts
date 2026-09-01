import type { MCQQuestion } from '../../types/exam'

export const mcqOopPrototype: MCQQuestion[] = [
  {
    id: 'mcq-oop-01',
    category: 'oop-prototype',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return "Hi " + this.name;
};
const p = new Person("Ali");
console.log(p.greet());`,
    options: ['Hi Ali', 'Hi undefined', 'TypeError', 'ReferenceError'],
    correctAnswer: 0,
    explanation:
      'new Person("Ali") sets p.name and links p.[[Prototype]] to Person.prototype. greet is found on the prototype and this is p, so it returns "Hi Ali".',
  },
  {
    id: 'mcq-oop-02',
    category: 'oop-prototype',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `const a = { x: 1 };
const b = Object.create(a);
console.log(b.x);
console.log(b.hasOwnProperty("x"));`,
    options: ['1 then true', '1 then false', 'undefined then false', 'undefined then true'],
    correctAnswer: 1,
    explanation:
      'b inherits x from a through the prototype chain, so b.x is 1, but x is not an own property of b.',
  },
  {
    id: 'mcq-oop-03',
    category: 'oop-prototype',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `class User {
  constructor(name) {
    this.name = name;
  }
  say() {
    return this.name;
  }
}
const u = new User("Noor");
console.log(typeof User);
console.log(u.say());`,
    options: ['"class" then "Noor"', '"function" then "Noor"', '"object" then "Noor"', '"function" then undefined'],
    correctAnswer: 1,
    explanation:
      'ES6 classes are functions. Instances created with new get constructor-initialized fields and methods from the prototype, so say() returns "Noor".',
  },
  {
    id: 'mcq-oop-04',
    category: 'oop-prototype',
    difficulty: 'easy',
    question: 'What happens?',
    code: `class Animal {}
const a = Animal();`,
    options: [
      'a is an Animal instance',
      'a is undefined',
      'It throws a TypeError',
      'It throws a ReferenceError',
    ],
    correctAnswer: 2,
    explanation:
      'Class constructors must be called with new. Calling Animal() without new throws TypeError.',
  },
  {
    id: 'mcq-oop-05',
    category: 'oop-prototype',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `function Foo() {}
Foo.prototype.n = 1;
const a = new Foo();
const b = new Foo();
a.n = 2;
console.log(a.n, b.n, Foo.prototype.n);`,
    options: ['2 2 2', '2 1 1', '2 1 2', '1 1 1'],
    correctAnswer: 1,
    explanation:
      'a.n = 2 creates an own property on a and shadows the prototype. b still reads Foo.prototype.n, which remains 1.',
  },
  {
    id: 'mcq-oop-06',
    category: 'oop-prototype',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `class A {
  constructor() {
    this.kind = "A";
  }
  getKind() {
    return this.kind;
  }
}
class B extends A {
  constructor() {
    super();
    this.kind = "B";
  }
}
const b = new B();
console.log(b.getKind());
console.log(b instanceof A);
console.log(b instanceof B);`,
    options: [
      '"A", true, true',
      '"B", true, true',
      '"B", false, true',
      '"A", false, true',
    ],
    correctAnswer: 1,
    explanation:
      'B calls super() then overwrites kind with "B". getKind is inherited and uses this.kind. Prototype-chain instanceof is true for both A and B.',
  },
  {
    id: 'mcq-oop-07',
    category: 'oop-prototype',
    difficulty: 'medium',
    question: 'What happens in an ES module?',
    code: `const obj = {
  n: 1,
  getN: () => this.n,
};
console.log(obj.getN());`,
    options: ['It logs 1', 'It logs undefined', 'It throws a ReferenceError', 'It throws a TypeError'],
    correctAnswer: 3,
    explanation:
      'Arrow functions do not bind this from the caller. In a module, lexical this is undefined, so evaluating this.n throws TypeError.',
  },
  {
    id: 'mcq-oop-08',
    category: 'oop-prototype',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `function greet() {
  return this.role;
}
const user = { role: "admin" };
console.log(greet.call(user));
console.log(greet.apply(user));
const bound = greet.bind(user);
console.log(bound());`,
    options: [
      '"admin" "admin" "admin"',
      'undefined "admin" "admin"',
      '"admin" "admin" undefined',
      'TypeError',
    ],
    correctAnswer: 0,
    explanation:
      'call and apply invoke the function immediately with this = user. bind returns a new function whose this is permanently user.',
  },
  {
    id: 'mcq-oop-09',
    category: 'oop-prototype',
    difficulty: 'medium',
    question: 'Which statement best describes composition vs inheritance in JavaScript?',
    code: `const canFly = (o) => ({ ...o, fly() { return "flying"; } });
const canSwim = (o) => ({ ...o, swim() { return "swimming"; } });
const duck = canSwim(canFly({ name: "duck" }));`,
    options: [
      'Composition builds behavior by combining functions/objects instead of a rigid class hierarchy',
      'Composition requires class and extends',
      'This pattern is invalid because objects cannot mix methods',
      'duck.fly will be lost after canSwim runs',
    ],
    correctAnswer: 0,
    explanation:
      'The example composes capabilities by returning new objects with additional methods. That is composition: behavior is combined without forcing a single inheritance tree.',
  },
  {
    id: 'mcq-oop-10',
    category: 'oop-prototype',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `class Counter {
  #n = 0;
  inc() {
    this.#n += 1;
    return this.#n;
  }
}
const c = new Counter();
console.log(c.inc());
console.log(c.n);
console.log(c["#n"]);`,
    options: ['1 then 1 then 1', '1 then undefined then undefined', '1 then 0 then 0', 'It throws when reading c.n'],
    correctAnswer: 1,
    explanation:
      'Private fields are truly encapsulated. inc() can read #n, but c.n and c["#n"] are ordinary public lookups and are undefined.',
  },
  {
    id: 'mcq-oop-11',
    category: 'oop-prototype',
    difficulty: 'hard',
    question: 'What happens?',
    code: `class Parent {
  constructor() {
    this.value = 1;
  }
}
class Child extends Parent {
  constructor() {
    this.value = 2;
    super();
  }
}
new Child();`,
    options: [
      'The instance has value 2',
      'The instance has value 1',
      'It throws a ReferenceError',
      'It throws a TypeError because super is optional',
    ],
    correctAnswer: 2,
    explanation:
      'In a derived class, this is uninitialized until super() returns. Accessing this before super() throws ReferenceError.',
  },
  {
    id: 'mcq-oop-12',
    category: 'oop-prototype',
    difficulty: 'hard',
    question: 'What is logged?',
    code: `function Animal(name) {
  this.name = name;
}
function Dog(name) {
  Animal.call(this, name);
  this.bark = function () {
    return this.name + " barks";
  };
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
const d = new Dog("Rex");
console.log(d instanceof Dog);
console.log(d instanceof Animal);
console.log(d.bark());`,
    options: [
      'true true "Rex barks"',
      'true false "Rex barks"',
      'false true "Rex barks"',
      'true true TypeError',
    ],
    correctAnswer: 0,
    explanation:
      'Object.create(Animal.prototype) sets up the prototype chain, so instanceof is true for both. Animal.call(this, name) initializes name on the instance, and bark uses that name.',
  },
]
