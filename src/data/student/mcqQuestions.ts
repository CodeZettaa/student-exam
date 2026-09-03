// Auto-generated student-facing question data. Instructor answers are not included.
// Regenerate with: npm run split:bank

import type { StudentMCQQuestion } from '../../types/exam'

export const studentMcqQuestions: StudentMCQQuestion[] = [
  {
    "id": "mcq-core-01",
    "category": "javascript-core",
    "difficulty": "easy",
    "question": "What happens when this code runs in strict mode?",
    "code": "const n = 3;\nn = 5;\nconsole.log(n);",
    "options": [
      "It logs 5",
      "It logs 3",
      "It throws a TypeError",
      "It throws a SyntaxError"
    ]
  },
  {
    "id": "mcq-core-02",
    "category": "javascript-core",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "console.log(typeof null);\nconsole.log(typeof undefined);\nconsole.log(typeof []);",
    "options": [
      "object, undefined, object",
      "null, undefined, array",
      "object, undefined, array",
      "null, object, object"
    ]
  },
  {
    "id": "mcq-core-03",
    "category": "javascript-core",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "const a = [1, 2];\nconst b = [...a, 3];\na.push(4);\nconsole.log(b);",
    "options": [
      "[1, 2, 3]",
      "[1, 2, 3, 4]",
      "[1, 2, 4]",
      "[1, 2]"
    ]
  },
  {
    "id": "mcq-core-04",
    "category": "javascript-core",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "const obj = { x: 1 };\nconsole.log(`${obj}`);\nconsole.log(`${JSON.stringify(obj)}`);",
    "options": [
      "[object Object] then {\"x\":1}",
      "{x:1} then {\"x\":1}",
      "[object Object] then [object Object]",
      "It throws a TypeError"
    ]
  },
  {
    "id": "mcq-core-05",
    "category": "javascript-core",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "console.log([] == false);\nconsole.log([] === false);\nconsole.log(\"0\" == 0);\nconsole.log(\"0\" === 0);",
    "options": [
      "true, false, true, false",
      "false, false, true, false",
      "true, true, true, false",
      "true, false, false, false"
    ]
  },
  {
    "id": "mcq-core-06",
    "category": "javascript-core",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "console.log(NaN === NaN);\nconsole.log(Number.isNaN(NaN));\nconsole.log(Number.isNaN(\"NaN\"));",
    "options": [
      "false, true, false",
      "true, true, false",
      "false, true, true",
      "false, false, false"
    ]
  },
  {
    "id": "mcq-core-07",
    "category": "javascript-core",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "function f(a = 1, b = a + 1) {\n  return [a, b];\n}\nconsole.log(f());\nconsole.log(f(5));\nconsole.log(f(undefined, 10));",
    "options": [
      "[1, 2], [5, 6], [1, 10]",
      "[1, 2], [5, 6], [undefined, 10]",
      "[1, 2], [5, 6], [undefined, 11]",
      "It throws a ReferenceError"
    ]
  },
  {
    "id": "mcq-core-08",
    "category": "javascript-core",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "const { a = 1, b = 2 } = { a: undefined, b: null };\nconsole.log(a, b);",
    "options": [
      "1 null",
      "undefined null",
      "1 2",
      "1 undefined"
    ]
  },
  {
    "id": "mcq-core-09",
    "category": "javascript-core",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "console.log(0 || \"A\");\nconsole.log(0 ?? \"A\");\nconsole.log(\"\" || \"B\");\nconsole.log(\"\" ?? \"B\");",
    "options": [
      "\"A\", 0, \"B\", \"\"",
      "\"A\", \"A\", \"B\", \"B\"",
      "0, 0, \"\", \"\"",
      "\"A\", 0, \"B\", \"B\""
    ]
  },
  {
    "id": "mcq-core-10",
    "category": "javascript-core",
    "difficulty": "hard",
    "question": "What happens when test() is called?",
    "code": "function test(x = y, y = 2) {\n  return [x, y];\n}\ntest();",
    "options": [
      "It returns [2, 2]",
      "It returns [undefined, 2]",
      "It throws a ReferenceError",
      "It returns [undefined, undefined]"
    ]
  },
  {
    "id": "mcq-core-11",
    "category": "javascript-core",
    "difficulty": "hard",
    "question": "In strict mode, what happens?",
    "code": "const obj = Object.freeze({ a: 1, nested: { b: 2 } });\nobj.a = 10;\nobj.nested.b = 20;\nconsole.log(obj.a, obj.nested.b);",
    "options": [
      "It logs 1 20",
      "It logs 10 20",
      "It logs 1 2",
      "It throws a TypeError"
    ]
  },
  {
    "id": "mcq-core-12",
    "category": "javascript-core",
    "difficulty": "hard",
    "question": "What is logged?",
    "code": "const user = { profile: { age: 0 } };\nconsole.log(user.profile?.age ?? 18);\nconsole.log(user.profile?.name ?? \"anon\");\nconsole.log(user.settings?.theme ?? \"light\");",
    "options": [
      "0, \"anon\", \"light\"",
      "18, \"anon\", \"light\"",
      "0, undefined, \"light\"",
      "18, \"anon\", undefined"
    ]
  },
  {
    "id": "mcq-scope-01",
    "category": "scope-closure",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "function outer() {\n  var x = 1;\n  function inner() {\n    console.log(x);\n  }\n  return inner;\n}\nconst fn = outer();\nfn();",
    "options": [
      "1",
      "undefined",
      "null",
      "ReferenceError"
    ]
  },
  {
    "id": "mcq-scope-02",
    "category": "scope-closure",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "console.log(a);\nvar a = 5;",
    "options": [
      "5",
      "undefined",
      "ReferenceError",
      "null"
    ]
  },
  {
    "id": "mcq-scope-03",
    "category": "scope-closure",
    "difficulty": "easy",
    "question": "What happens?",
    "code": "console.log(b);\nlet b = 5;",
    "options": [
      "It logs 5",
      "It logs undefined",
      "It throws a ReferenceError",
      "It logs null"
    ]
  },
  {
    "id": "mcq-scope-04",
    "category": "scope-closure",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "var x = 10;\n{\n  var x = 20;\n}\nconsole.log(x);",
    "options": [
      "10",
      "20",
      "undefined",
      "ReferenceError"
    ]
  },
  {
    "id": "mcq-scope-05",
    "category": "scope-closure",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "let x = 10;\n{\n  let x = 20;\n}\nconsole.log(x);",
    "options": [
      "10",
      "20",
      "undefined",
      "ReferenceError"
    ]
  },
  {
    "id": "mcq-scope-06",
    "category": "scope-closure",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "for (var i = 0; i < 3; i++) {}\nconsole.log(i);",
    "options": [
      "2",
      "3",
      "undefined",
      "ReferenceError"
    ]
  },
  {
    "id": "mcq-scope-07",
    "category": "scope-closure",
    "difficulty": "medium",
    "question": "What is logged after the timeouts run?",
    "code": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    "options": [
      "0 1 2",
      "1 2 3",
      "3 3 3",
      "0 0 0"
    ]
  },
  {
    "id": "mcq-scope-08",
    "category": "scope-closure",
    "difficulty": "medium",
    "question": "What is logged after the timeouts run?",
    "code": "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
    "options": [
      "0 1 2",
      "1 2 3",
      "3 3 3",
      "0 0 0"
    ]
  },
  {
    "id": "mcq-scope-09",
    "category": "scope-closure",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "function make() {\n  const fns = [];\n  for (var i = 0; i < 3; i++) {\n    fns.push(function () {\n      return i;\n    });\n  }\n  return fns.map((fn) => fn());\n}\nconsole.log(make());",
    "options": [
      "[0, 1, 2]",
      "[1, 2, 3]",
      "[3, 3, 3]",
      "[undefined, undefined, undefined]"
    ]
  },
  {
    "id": "mcq-scope-10",
    "category": "scope-closure",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "function createCounter() {\n  let count = 0;\n  return function () {\n    return ++count;\n  };\n}\nconst c1 = createCounter();\nconst c2 = createCounter();\nconsole.log(c1());\nconsole.log(c1());\nconsole.log(c2());",
    "options": [
      "1 2 3",
      "1 2 1",
      "0 1 0",
      "1 1 1"
    ]
  },
  {
    "id": "mcq-scope-11",
    "category": "scope-closure",
    "difficulty": "medium",
    "question": "What happens in strict mode / ES modules?",
    "code": "const obj = {\n  n: 1,\n  getN() {\n    return this.n;\n  },\n};\nconst fn = obj.getN;\nconsole.log(obj.getN());\nconsole.log(fn());",
    "options": [
      "It logs 1 then 1",
      "It logs 1 then undefined",
      "It logs 1, then throws TypeError",
      "It throws TypeError on the first call"
    ]
  },
  {
    "id": "mcq-scope-12",
    "category": "scope-closure",
    "difficulty": "hard",
    "question": "What is logged?",
    "code": "function foo() {\n  console.log(a);\n  var a = 1;\n  console.log(b);\n  let b = 2;\n}\nfoo();",
    "options": [
      "undefined then 2",
      "undefined then ReferenceError",
      "ReferenceError then ReferenceError",
      "1 then 2"
    ]
  },
  {
    "id": "mcq-scope-13",
    "category": "scope-closure",
    "difficulty": "hard",
    "question": "What is logged?",
    "code": "function mystery() {\n  return function inner() {\n    return this === inner;\n  };\n}\nconst fn = mystery();\nconsole.log(fn());\nconsole.log(fn.call(fn));",
    "options": [
      "true then true",
      "false then true",
      "false then false",
      "true then false"
    ]
  },
  {
    "id": "mcq-scope-14",
    "category": "scope-closure",
    "difficulty": "hard",
    "question": "What is logged?",
    "code": "const add = (x) => (y) => x + y;\nconst add5 = add(5);\nconsole.log(add5(10));\nx = 100;\nconsole.log(add5(10));",
    "options": [
      "15 then 15",
      "15 then 110",
      "15 then ReferenceError",
      "It throws before logging"
    ]
  },
  {
    "id": "mcq-oop-01",
    "category": "oop-prototype",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return \"Hi \" + this.name;\n};\nconst p = new Person(\"Ali\");\nconsole.log(p.greet());",
    "options": [
      "Hi Ali",
      "Hi undefined",
      "TypeError",
      "ReferenceError"
    ]
  },
  {
    "id": "mcq-oop-02",
    "category": "oop-prototype",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "const a = { x: 1 };\nconst b = Object.create(a);\nconsole.log(b.x);\nconsole.log(b.hasOwnProperty(\"x\"));",
    "options": [
      "1 then true",
      "1 then false",
      "undefined then false",
      "undefined then true"
    ]
  },
  {
    "id": "mcq-oop-03",
    "category": "oop-prototype",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "class User {\n  constructor(name) {\n    this.name = name;\n  }\n  say() {\n    return this.name;\n  }\n}\nconst u = new User(\"Noor\");\nconsole.log(typeof User);\nconsole.log(u.say());",
    "options": [
      "\"class\" then \"Noor\"",
      "\"function\" then \"Noor\"",
      "\"object\" then \"Noor\"",
      "\"function\" then undefined"
    ]
  },
  {
    "id": "mcq-oop-04",
    "category": "oop-prototype",
    "difficulty": "easy",
    "question": "What happens?",
    "code": "class Animal {}\nconst a = Animal();",
    "options": [
      "a is an Animal instance",
      "a is undefined",
      "It throws a TypeError",
      "It throws a ReferenceError"
    ]
  },
  {
    "id": "mcq-oop-05",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "function Foo() {}\nFoo.prototype.n = 1;\nconst a = new Foo();\nconst b = new Foo();\na.n = 2;\nconsole.log(a.n, b.n, Foo.prototype.n);",
    "options": [
      "2 2 2",
      "2 1 1",
      "2 1 2",
      "1 1 1"
    ]
  },
  {
    "id": "mcq-oop-06",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "class A {\n  constructor() {\n    this.kind = \"A\";\n  }\n  getKind() {\n    return this.kind;\n  }\n}\nclass B extends A {\n  constructor() {\n    super();\n    this.kind = \"B\";\n  }\n}\nconst b = new B();\nconsole.log(b.getKind());\nconsole.log(b instanceof A);\nconsole.log(b instanceof B);",
    "options": [
      "\"A\", true, true",
      "\"B\", true, true",
      "\"B\", false, true",
      "\"A\", false, true"
    ]
  },
  {
    "id": "mcq-oop-07",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "What happens in an ES module?",
    "code": "const obj = {\n  n: 1,\n  getN: () => this.n,\n};\nconsole.log(obj.getN());",
    "options": [
      "It logs 1",
      "It logs undefined",
      "It throws a ReferenceError",
      "It throws a TypeError"
    ]
  },
  {
    "id": "mcq-oop-08",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "function greet() {\n  return this.role;\n}\nconst user = { role: \"admin\" };\nconsole.log(greet.call(user));\nconsole.log(greet.apply(user));\nconst bound = greet.bind(user);\nconsole.log(bound());",
    "options": [
      "\"admin\" \"admin\" \"admin\"",
      "undefined \"admin\" \"admin\"",
      "\"admin\" \"admin\" undefined",
      "TypeError"
    ]
  },
  {
    "id": "mcq-oop-09",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "Which statement best describes composition vs inheritance in JavaScript?",
    "code": "const canFly = (o) => ({ ...o, fly() { return \"flying\"; } });\nconst canSwim = (o) => ({ ...o, swim() { return \"swimming\"; } });\nconst duck = canSwim(canFly({ name: \"duck\" }));",
    "options": [
      "Composition builds behavior by combining functions/objects instead of a rigid class hierarchy",
      "Composition requires class and extends",
      "This pattern is invalid because objects cannot mix methods",
      "duck.fly will be lost after canSwim runs"
    ]
  },
  {
    "id": "mcq-oop-10",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "class Counter {\n  #n = 0;\n  inc() {\n    this.#n += 1;\n    return this.#n;\n  }\n}\nconst c = new Counter();\nconsole.log(c.inc());\nconsole.log(c.n);\nconsole.log(c[\"#n\"]);",
    "options": [
      "1 then 1 then 1",
      "1 then undefined then undefined",
      "1 then 0 then 0",
      "It throws when reading c.n"
    ]
  },
  {
    "id": "mcq-oop-11",
    "category": "oop-prototype",
    "difficulty": "hard",
    "question": "What happens?",
    "code": "class Parent {\n  constructor() {\n    this.value = 1;\n  }\n}\nclass Child extends Parent {\n  constructor() {\n    this.value = 2;\n    super();\n  }\n}\nnew Child();",
    "options": [
      "The instance has value 2",
      "The instance has value 1",
      "It throws a ReferenceError",
      "It throws a TypeError because super is optional"
    ]
  },
  {
    "id": "mcq-oop-12",
    "category": "oop-prototype",
    "difficulty": "hard",
    "question": "What is logged?",
    "code": "function Animal(name) {\n  this.name = name;\n}\nfunction Dog(name) {\n  Animal.call(this, name);\n  this.bark = function () {\n    return this.name + \" barks\";\n  };\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nconst d = new Dog(\"Rex\");\nconsole.log(d instanceof Dog);\nconsole.log(d instanceof Animal);\nconsole.log(d.bark());",
    "options": [
      "true true \"Rex barks\"",
      "true false \"Rex barks\"",
      "false true \"Rex barks\"",
      "true true TypeError"
    ]
  },
  {
    "id": "mcq-async-01",
    "category": "async",
    "difficulty": "easy",
    "question": "What is the output order?",
    "code": "console.log(\"A\");\nsetTimeout(() => {\n  console.log(\"B\");\n}, 0);\nPromise.resolve().then(() => {\n  console.log(\"C\");\n});\nconsole.log(\"D\");",
    "options": [
      "A B C D",
      "A D C B",
      "A C D B",
      "D A C B"
    ]
  },
  {
    "id": "mcq-async-02",
    "category": "async",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "Promise.resolve(2)\n  .then((n) => n * 2)\n  .then((n) => console.log(n));",
    "options": [
      "2",
      "4",
      "undefined",
      "The promise rejects"
    ]
  },
  {
    "id": "mcq-async-03",
    "category": "async",
    "difficulty": "easy",
    "question": "What is logged?",
    "code": "async function run() {\n  return 1;\n}\nrun().then(console.log);",
    "options": [
      "1",
      "Promise { 1 }",
      "undefined",
      "It throws because async must use await"
    ]
  },
  {
    "id": "mcq-async-04",
    "category": "async",
    "difficulty": "easy",
    "question": "Which statement about the event loop is correct?",
    "options": [
      "JavaScript can run many call stacks in parallel on one thread",
      "The call stack runs synchronous code; Web APIs schedule callbacks; the event loop pushes ready callbacks onto the stack",
      "setTimeout(fn, 0) runs fn before the current function returns",
      "Promises wait for the next animation frame before resolving"
    ]
  },
  {
    "id": "mcq-async-05",
    "category": "async",
    "difficulty": "medium",
    "question": "What is the output order?",
    "code": "console.log(\"1\");\nqueueMicrotask(() => console.log(\"2\"));\nsetTimeout(() => console.log(\"3\"), 0);\nPromise.resolve().then(() => console.log(\"4\"));\nconsole.log(\"5\");",
    "options": [
      "1 2 4 5 3",
      "1 5 2 4 3",
      "1 5 3 2 4",
      "1 2 5 4 3"
    ]
  },
  {
    "id": "mcq-async-06",
    "category": "async",
    "difficulty": "medium",
    "question": "What is the output order?",
    "code": "async function f() {\n  console.log(\"A\");\n  await null;\n  console.log(\"B\");\n}\nconsole.log(\"C\");\nf();\nconsole.log(\"D\");",
    "options": [
      "C A B D",
      "C A D B",
      "A C D B",
      "C D A B"
    ]
  },
  {
    "id": "mcq-async-07",
    "category": "async",
    "difficulty": "medium",
    "question": "What is the output order?",
    "code": "Promise.resolve()\n  .then(() => {\n    console.log(\"A\");\n    return Promise.resolve(\"B\");\n  })\n  .then((v) => console.log(v));\nqueueMicrotask(() => console.log(\"C\"));",
    "options": [
      "A B C",
      "A C B",
      "C A B",
      "B A C"
    ]
  },
  {
    "id": "mcq-async-08",
    "category": "async",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "Promise.reject(new Error(\"fail\"))\n  .then(() => console.log(\"then\"))\n  .catch((err) => console.log(\"catch\", err.message))\n  .then(() => console.log(\"after\"));",
    "options": [
      "then",
      "catch fail",
      "catch fail then after",
      "An unhandled rejection is thrown"
    ]
  },
  {
    "id": "mcq-async-09",
    "category": "async",
    "difficulty": "medium",
    "question": "What is logged?",
    "code": "async function load() {\n  try {\n    await Promise.reject(\"broken\");\n    return \"ok\";\n  } catch (e) {\n    return \"handled\";\n  }\n}\nload().then(console.log);",
    "options": [
      "ok",
      "handled",
      "broken",
      "The promise rejects with \"broken\""
    ]
  },
  {
    "id": "mcq-async-10",
    "category": "async",
    "difficulty": "medium",
    "question": "What is the output order?",
    "code": "setTimeout(() => console.log(\"timeout\"), 0);\nPromise.resolve()\n  .then(() => console.log(\"p1\"))\n  .then(() => console.log(\"p2\"));\nconsole.log(\"sync\");",
    "options": [
      "timeout p1 p2 sync",
      "sync p1 p2 timeout",
      "sync timeout p1 p2",
      "sync p1 timeout p2"
    ]
  },
  {
    "id": "mcq-async-11",
    "category": "async",
    "difficulty": "medium",
    "question": "What is the output order?",
    "code": "const p = Promise.resolve(\"A\");\np.then((v) => {\n  console.log(v);\n  throw new Error(\"X\");\n}).catch((e) => console.log(e.message));\np.then((v) => console.log(v + \"2\"));",
    "options": [
      "A then X then A2",
      "A then A2 then X",
      "A2 then A then X",
      "A then X"
    ]
  },
  {
    "id": "mcq-async-12",
    "category": "async",
    "difficulty": "hard",
    "question": "What is the output order?",
    "code": "console.log(\"1\");\nsetTimeout(() => {\n  console.log(\"2\");\n  Promise.resolve().then(() => console.log(\"3\"));\n}, 0);\nPromise.resolve().then(() => {\n  console.log(\"4\");\n  setTimeout(() => console.log(\"5\"), 0);\n});\nconsole.log(\"6\");",
    "options": [
      "1 6 4 2 3 5",
      "1 6 2 3 4 5",
      "1 6 4 2 5 3",
      "1 4 6 2 3 5"
    ]
  },
  {
    "id": "mcq-async-13",
    "category": "async",
    "difficulty": "hard",
    "question": "What is logged?",
    "code": "async function g() {\n  throw new Error(\"boom\");\n}\nasync function f() {\n  g();\n  return \"done\";\n}\nf().then(console.log).catch((e) => console.log(\"err\", e.message));",
    "options": [
      "done",
      "err boom",
      "done then err boom",
      "Nothing is logged"
    ]
  },
  {
    "id": "mcq-async-14",
    "category": "async",
    "difficulty": "hard",
    "question": "What is the output order?",
    "code": "Promise.resolve()\n  .then(() => {\n    console.log(\"A\");\n    Promise.resolve().then(() => console.log(\"B\"));\n  })\n  .then(() => console.log(\"C\"));",
    "options": [
      "A B C",
      "A C B",
      "B A C",
      "A B then C never runs"
    ]
  },
  {
    "id": "mcq-engine-01",
    "category": "engine-memory",
    "difficulty": "easy",
    "question": "Which sequence best describes how a JavaScript engine runs source code?",
    "options": [
      "JIT → parse → garbage collect → AST",
      "Parse to AST → bytecode/interpreter → JIT-compile hot code",
      "Compile to machine code first, then parse",
      "Send source to the GPU, then interpret it"
    ]
  },
  {
    "id": "mcq-engine-02",
    "category": "engine-memory",
    "difficulty": "easy",
    "question": "What is an AST in a JavaScript engine?",
    "options": [
      "A list of running timers",
      "A tree representation of program structure produced by the parser",
      "The call stack snapshot used by garbage collection",
      "A binary executable stored in localStorage"
    ]
  },
  {
    "id": "mcq-engine-03",
    "category": "engine-memory",
    "difficulty": "easy",
    "question": "When can a JavaScript value typically be garbage collected?",
    "options": [
      "As soon as a function that created it returns, always",
      "When it is no longer reachable from roots such as the stack, globals, or closures",
      "Only when the programmer calls delete",
      "Never; JS does not reclaim memory"
    ]
  },
  {
    "id": "mcq-engine-04",
    "category": "engine-memory",
    "difficulty": "medium",
    "question": "Which code is most likely to keep a large object in memory longer than intended?",
    "code": "let cache = { data: new Array(1e6).fill(\"x\") };\nfunction keep() {\n  return function () {\n    console.log(cache.data.length);\n  };\n}\nconst leak = keep();",
    "options": [
      "None; returning from keep() always frees cache",
      "The closure leak still reads cache, so the large array stays reachable",
      "fill(\"x\") is automatically interned and freed",
      "Arrays of strings are stored on the stack and disappear immediately"
    ]
  },
  {
    "id": "mcq-engine-05",
    "category": "engine-memory",
    "difficulty": "medium",
    "question": "What does JIT compilation do in engines such as V8?",
    "options": [
      "It always compiles every file to native code before any line runs",
      "It watches for hot functions and compiles them to faster machine code, sometimes deoptimizing later",
      "It replaces garbage collection",
      "It only minifies source text"
    ]
  },
  {
    "id": "mcq-engine-06",
    "category": "engine-memory",
    "difficulty": "medium",
    "question": "Why can hidden classes / shapes make property access faster?",
    "code": "function Point(x, y) {\n  this.x = x;\n  this.y = y;\n}\nconst a = new Point(1, 2);\nconst b = new Point(3, 4);",
    "options": [
      "Because objects with the same property layout can share optimized access paths",
      "Because all objects are converted to arrays",
      "Because Point is frozen automatically",
      "Because x and y become private fields"
    ]
  },
  {
    "id": "mcq-engine-07",
    "category": "engine-memory",
    "difficulty": "medium",
    "question": "Which statement about memory management is correct?",
    "options": [
      "Circular references can never be collected in modern JavaScript engines",
      "Mark-and-sweep style collectors can reclaim cycles if the cycle is not reachable from roots",
      "Only primitive values are garbage collected",
      "Setting a variable to null always immediately returns memory to the OS"
    ]
  },
  {
    "id": "mcq-engine-08",
    "category": "engine-memory",
    "difficulty": "medium",
    "question": "What is bytecode in this pipeline?",
    "options": [
      "The original .js file saved in UTF-16",
      "An intermediate instruction format the interpreter can execute before JIT kicks in",
      "CSS parsed by the JS engine",
      "A guaranteed portable binary format identical on every engine"
    ]
  },
  {
    "id": "mcq-engine-09",
    "category": "engine-memory",
    "difficulty": "hard",
    "question": "In V8-style engines, which object pattern is more likely to stay optimized?",
    "code": "function makeA() {\n  return { a: 1, b: 2 };\n}\nfunction makeB() {\n  const o = {};\n  o.b = 2;\n  o.a = 1;\n  return o;\n}",
    "options": [
      "makeA and makeB always produce identical hidden classes",
      "makeA’s consistent property creation order is more optimizer-friendly than adding properties in a different order",
      "makeB is always faster because it starts empty",
      "Property order never matters to the engine"
    ]
  },
  {
    "id": "mcq-engine-10",
    "category": "engine-memory",
    "difficulty": "hard",
    "question": "A function closes over a huge unused array. Which change best allows that array to be collected?",
    "code": "function build() {\n  const huge = new Array(1e6).fill(0);\n  const small = 42;\n  return function () {\n    return small;\n  };\n}",
    "options": [
      "Nothing; huge is always kept because it is in the same scope",
      "Returning a function that only uses small lets engines (and developers) keep only what is referenced; do not capture huge",
      "Calling delete huge inside the inner function",
      "Converting huge to a string"
    ]
  },
  {
    "id": "mcq-mod-01",
    "category": "modules-bundlers",
    "difficulty": "easy",
    "question": "Which statement about ES modules is correct?",
    "options": [
      "import/export is evaluated lazily only when a function runs",
      "ES modules are static, always strict, and have their own top-level scope",
      "ES modules share the same this as a classic script’s global object in browsers",
      "export default can be used in CommonJS without a bundler in every browser"
    ]
  },
  {
    "id": "mcq-mod-02",
    "category": "modules-bundlers",
    "difficulty": "easy",
    "question": "What is tree shaking?",
    "options": [
      "Deleting node_modules before every build",
      "A bundler removing unused exports when the module graph is statically analyzable",
      "Minifying CSS class names",
      "Shuffling import order for cache busting"
    ]
  },
  {
    "id": "mcq-mod-03",
    "category": "modules-bundlers",
    "difficulty": "medium",
    "question": "Why can this module be tree-shaken more easily than a side-effect-heavy file?",
    "code": "export function add(a, b) {\n  return a + b;\n}\nexport function unused() {\n  return 123;\n}",
    "options": [
      "Because unused is async",
      "Because the exports are static and unused() has no required side effects",
      "Because add mutates the global object",
      "Because bundlers never keep named exports"
    ]
  },
  {
    "id": "mcq-mod-04",
    "category": "modules-bundlers",
    "difficulty": "medium",
    "question": "What is code splitting?",
    "options": [
      "Splitting a string with .split()",
      "Producing multiple bundles/chunks so some code loads later, often via dynamic import()",
      "Running unit tests in parallel",
      "Separating HTML from CSS"
    ]
  },
  {
    "id": "mcq-mod-05",
    "category": "modules-bundlers",
    "difficulty": "medium",
    "question": "Which import loads the module lazily?",
    "code": "import { util } from \"./util.js\";\nconst later = () => import(\"./heavy.js\");",
    "options": [
      "Both imports are fully static and eager",
      "util is static/eager; import(\"./heavy.js\") returns a Promise and loads later",
      "import(\"./heavy.js\") is hoisted and runs before util",
      "Dynamic import is illegal in JavaScript"
    ]
  },
  {
    "id": "mcq-mod-06",
    "category": "modules-bundlers",
    "difficulty": "medium",
    "question": "Which Webpack concept matches this description: a graph of modules bundled into one or more output files?",
    "options": [
      "Hot Module Replacement only",
      "The dependency graph and compilation producing bundles/chunks",
      "The event loop",
      "Garbage collection roots"
    ]
  },
  {
    "id": "mcq-mod-07",
    "category": "modules-bundlers",
    "difficulty": "medium",
    "question": "Which statement about Vite in development is most accurate?",
    "options": [
      "Vite always bundles the entire app with Webpack before the first page load",
      "Vite serves native ES modules and prebundles dependencies, using a bundler (Rollup) for production builds",
      "Vite cannot use ES modules",
      "Vite replaces the JavaScript engine"
    ]
  },
  {
    "id": "mcq-mod-08",
    "category": "modules-bundlers",
    "difficulty": "hard",
    "question": "Which pattern most reliably prevents tree shaking of multiply?",
    "code": "export function multiply(a, b) {\n  return a * b;\n}",
    "options": [
      "import { multiply } from \"./math.js\" and never calling it",
      "A module that does import \"./math.js\" for side effects only, while math.js also writes to window on load",
      "Using a named export instead of default",
      "Putting multiply in a different file"
    ]
  },
  {
    "id": "mcq-dsa-01",
    "category": "dsa",
    "difficulty": "easy",
    "question": "What is the typical time complexity of accessing arr[i] on a JavaScript array used as a dense list?",
    "options": [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n log n)"
    ]
  },
  {
    "id": "mcq-dsa-02",
    "category": "dsa",
    "difficulty": "easy",
    "question": "What is the time complexity of this function?",
    "code": "function contains(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return true;\n  }\n  return false;\n}",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ]
  },
  {
    "id": "mcq-dsa-03",
    "category": "dsa",
    "difficulty": "easy",
    "question": "Which structure is LIFO?",
    "options": [
      "Queue",
      "Stack",
      "Hash table only",
      "Binary search tree only"
    ]
  },
  {
    "id": "mcq-dsa-04",
    "category": "dsa",
    "difficulty": "medium",
    "question": "What is the time complexity of this nested loop?",
    "code": "function countPairs(arr) {\n  let count = 0;\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length; j++) {\n      if (arr[i] + arr[j] === 10) count++;\n    }\n  }\n  return count;\n}",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(2^n)"
    ]
  },
  {
    "id": "mcq-dsa-05",
    "category": "dsa",
    "difficulty": "medium",
    "question": "Which implementation best matches a queue?",
    "code": "// A\nconst q = [];\nq.push(1);\nq.pop();\n\n// B\nconst q = [];\nq.push(1);\nq.shift();",
    "options": [
      "A, because pop removes from the back",
      "B, because push adds at the back and shift removes from the front (FIFO)",
      "Both are queues",
      "Neither; JavaScript cannot implement a queue"
    ]
  },
  {
    "id": "mcq-dsa-06",
    "category": "dsa",
    "difficulty": "medium",
    "question": "Average-case lookup in a well-implemented hash table is:",
    "options": [
      "O(n)",
      "O(1)",
      "O(n log n)",
      "O(n^2)"
    ]
  },
  {
    "id": "mcq-dsa-07",
    "category": "dsa",
    "difficulty": "medium",
    "question": "What does this linked-list traversal miss if head is the first node?",
    "code": "function find(head, target) {\n  let cur = head.next;\n  while (cur) {\n    if (cur.value === target) return true;\n    cur = cur.next;\n  }\n  return false;\n}",
    "options": [
      "It never terminates",
      "It skips the head node, so it can miss a match stored at head",
      "It always returns true",
      "It sorts the list first"
    ]
  },
  {
    "id": "mcq-dsa-08",
    "category": "dsa",
    "difficulty": "medium",
    "question": "Which Big-O best describes binary search on a sorted array?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(n^2)",
      "O(1) always"
    ]
  },
  {
    "id": "mcq-dsa-09",
    "category": "dsa",
    "difficulty": "medium",
    "question": "Which graph traversal uses a queue?",
    "options": [
      "Depth-first search (typically stack/recursion)",
      "Breadth-first search",
      "Binary search",
      "Insertion sort"
    ]
  },
  {
    "id": "mcq-dsa-10",
    "category": "dsa",
    "difficulty": "hard",
    "question": "What is the time complexity of this Map-based two-sum?",
    "code": "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n}",
    "options": [
      "O(n^2) time, O(1) space",
      "O(n) time, O(n) space",
      "O(n log n) time, O(1) space",
      "O(n) time, O(1) space"
    ]
  }
]
