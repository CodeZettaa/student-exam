// Auto-generated student-facing question data. Instructor answers are not included.
// Regenerate with: npm run split:bank

import type { StudentExplainQuestion } from '../../types/exam'

export const studentExplainQuestions: StudentExplainQuestion[] = [
  {
    "id": "exp-01",
    "category": "scope-closure",
    "difficulty": "easy",
    "question": "Predict the output of both console.log calls. Then explain why count is still accessible after createCounter has returned, name the concept involved, and describe what happens to count in memory.",
    "code": "function createCounter() {\n  let count = 0;\n  return function () {\n    return ++count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter());\nconsole.log(counter());"
  },
  {
    "id": "exp-02",
    "category": "oop-prototype",
    "difficulty": "easy",
    "question": "What will happen when user.greet() runs? Why? Fix the code so it logs \"Ali\", and explain why your fix works.",
    "code": "const user = {\n  name: \"Ali\",\n  greet: () => {\n    console.log(this.name);\n  }\n};\n\nuser.greet();"
  },
  {
    "id": "exp-03",
    "category": "javascript-core",
    "difficulty": "easy",
    "question": "Predict the three logged values. Explain the difference between var, let, and const in this snippet, including why one line throws.",
    "code": "var a = 1;\nlet b = 2;\nconst c = 3;\na = 10;\nb = 20;\nc = 30;\nconsole.log(a, b, c);"
  },
  {
    "id": "exp-04",
    "category": "scope-closure",
    "difficulty": "easy",
    "question": "What is logged? Explain hoisting and the temporal dead zone using this code. How would the result change if let were var?",
    "code": "console.log(x);\nlet x = 5;"
  },
  {
    "id": "exp-05",
    "category": "javascript-core",
    "difficulty": "easy",
    "question": "Predict the output. Explain why the default for a applies but the default for b does not. What JavaScript rule is this demonstrating?",
    "code": "const { a = 1, b = 2 } = { a: undefined, b: null };\nconsole.log(a, b);"
  },
  {
    "id": "exp-06",
    "category": "async",
    "difficulty": "easy",
    "question": "Predict the output order. Classify each log as synchronous, microtask, or macrotask. Why does C run before B?",
    "code": "console.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nPromise.resolve().then(() => console.log(\"C\"));\nconsole.log(\"D\");"
  },
  {
    "id": "exp-07",
    "category": "oop-prototype",
    "difficulty": "easy",
    "question": "Predict both logs. Explain how the prototype chain is used for greet. What would happen if greet were assigned only on p1, not on Person.prototype?",
    "code": "function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return \"Hi \" + this.name;\n};\nconst p1 = new Person(\"Sara\");\nconst p2 = new Person(\"Omar\");\nconsole.log(p1.greet());\nconsole.log(p2.hasOwnProperty(\"greet\"));"
  },
  {
    "id": "exp-08",
    "category": "dsa",
    "difficulty": "easy",
    "question": "What is the time complexity of linearSearch? Explain best, average, and worst cases. Why is this worse than binary search on a sorted array?",
    "code": "function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) return i;\n  }\n  return -1;\n}"
  },
  {
    "id": "exp-09",
    "category": "scope-closure",
    "difficulty": "medium",
    "question": "What is printed after the timeouts run? Explain why. Rewrite the loop so it prints 0 1 2, and explain why your rewrite works. Mention at least two valid techniques.",
    "code": "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}"
  },
  {
    "id": "exp-10",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "Predict all three logs. Explain call, apply, and bind. Then explain why bound() still returns \"admin\" even if called as a bare function.",
    "code": "function greet() {\n  return this.role;\n}\nconst user = { role: \"admin\" };\nconsole.log(greet.call(user));\nconsole.log(greet.apply(user));\nconst bound = greet.bind(user);\nconsole.log(bound());"
  },
  {
    "id": "exp-11",
    "category": "async",
    "difficulty": "medium",
    "question": "Predict the output order. Explain what await does to the rest of f, and why B is not logged between A and D.",
    "code": "async function f() {\n  console.log(\"A\");\n  await null;\n  console.log(\"B\");\n}\nconsole.log(\"C\");\nf();\nconsole.log(\"D\");"
  },
  {
    "id": "exp-12",
    "category": "javascript-core",
    "difficulty": "medium",
    "question": "Predict each log. Explain || vs ?? and why 0 and \"\" are treated differently. When should you prefer ?? in real code?",
    "code": "console.log(0 || \"A\");\nconsole.log(0 ?? \"A\");\nconsole.log(\"\" || \"B\");\nconsole.log(\"\" ?? \"B\");"
  },
  {
    "id": "exp-13",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "Predict the logs. Explain why a.n is 2 while b.n stays 1. Is this polymorphism, shadowing, or mutating the prototype? How would you change n for every instance?",
    "code": "function Foo() {}\nFoo.prototype.n = 1;\nconst a = new Foo();\nconst b = new Foo();\na.n = 2;\nconsole.log(a.n, b.n, Foo.prototype.n);"
  },
  {
    "id": "exp-14",
    "category": "async",
    "difficulty": "medium",
    "question": "Predict the logs. Does catch recover the chain? Why does \"after\" still run? What would change if catch rethrew?",
    "code": "Promise.reject(new Error(\"fail\"))\n  .then(() => console.log(\"then\"))\n  .catch((err) => console.log(\"catch\", err.message))\n  .then(() => console.log(\"after\"));"
  },
  {
    "id": "exp-15",
    "category": "engine-memory",
    "difficulty": "medium",
    "question": "Will huge stay in memory after build() returns? Why? How would you change the code so the large array can be garbage collected while still returning small?",
    "code": "function build() {\n  const huge = new Array(1e6).fill(0);\n  const small = 42;\n  return function () {\n    return small + huge.length;\n  };\n}\nconst fn = build();"
  },
  {
    "id": "exp-16",
    "category": "modules-bundlers",
    "difficulty": "medium",
    "question": "Explain which export a bundler can most likely tree-shake if the app only imports add. What would make unused impossible to drop? Relate this to ES modules vs side effects.",
    "code": "export function add(a, b) {\n  return a + b;\n}\nexport function unused() {\n  return 123;\n}\nconsole.log(\"module loaded\");"
  },
  {
    "id": "exp-17",
    "category": "dsa",
    "difficulty": "medium",
    "question": "What are the time and space complexities? Why is this better than a nested-loop two-sum? Name an important edge case this implementation must consider.",
    "code": "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n}"
  },
  {
    "id": "exp-18",
    "category": "javascript-core",
    "difficulty": "medium",
    "question": "Predict the logs. Explain Object.freeze in strict mode, including that it is shallow. How would you freeze nested as well?",
    "code": "const obj = Object.freeze({ a: 1, nested: { b: 2 } });\nobj.a = 10;\nobj.nested.b = 20;"
  },
  {
    "id": "exp-19",
    "category": "oop-prototype",
    "difficulty": "medium",
    "question": "What happens when new Child() runs? Explain why this cannot be used before super() in a subclass. Fix the constructor and state the final value of kind.",
    "code": "class Parent {\n  constructor() {\n    this.kind = \"A\";\n  }\n}\nclass Child extends Parent {\n  constructor() {\n    this.kind = \"B\";\n    super();\n  }\n}\nnew Child();"
  },
  {
    "id": "exp-20",
    "category": "javascript-core",
    "difficulty": "medium",
    "question": "Is addTax a pure function? Why or why not? Rewrite it to be pure and immutable. Explain why mutating the input is a problem in larger programs.",
    "code": "function addTax(order) {\n  order.total = order.total * 1.15;\n  return order;\n}\nconst o = { total: 100 };\naddTax(o);\nconsole.log(o.total);"
  },
  {
    "id": "exp-21",
    "category": "dsa",
    "difficulty": "medium",
    "question": "Find the bug. What input would fail? Explain stack vs queue. Rewrite using a queue-like approach (FIFO) and state the time complexity of enqueue/dequeue with a JS array shift.",
    "code": "function createQueue() {\n  const data = [];\n  return {\n    enqueue(x) { data.push(x); },\n    dequeue() { return data.pop(); },\n  };\n}"
  },
  {
    "id": "exp-22",
    "category": "engine-memory",
    "difficulty": "medium",
    "question": "Describe parsing, AST, bytecode, and JIT in order. Why might a function run slower the first times and faster later? What is deoptimization?"
  },
  {
    "id": "exp-23",
    "category": "modules-bundlers",
    "difficulty": "medium",
    "question": "Explain the difference between the static import and the dynamic import. When would you use each in a production app? How does this relate to code splitting in Vite or Webpack?",
    "code": "import { util } from \"./util.js\";\nexport async function loadHeavy() {\n  const mod = await import(\"./heavy.js\");\n  return mod.default;\n}"
  },
  {
    "id": "exp-24",
    "category": "scope-closure",
    "difficulty": "medium",
    "question": "Predict the three logs. Explain whether c1 and c2 share memory. What would change if count were a global variable instead of a let inside createCounter?",
    "code": "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst c1 = createCounter();\nconst c2 = createCounter();\nconsole.log(c1(), c1(), c2());"
  },
  {
    "id": "exp-25",
    "category": "async",
    "difficulty": "hard",
    "question": "Predict the full output order. Walk through the call stack, microtask queue, and macrotask queue after each step. Why does 3 run before 5?",
    "code": "console.log(\"1\");\nsetTimeout(() => {\n  console.log(\"2\");\n  Promise.resolve().then(() => console.log(\"3\"));\n}, 0);\nPromise.resolve().then(() => {\n  console.log(\"4\");\n  setTimeout(() => console.log(\"5\"), 0);\n});\nconsole.log(\"6\");"
  },
  {
    "id": "exp-26",
    "category": "oop-prototype",
    "difficulty": "hard",
    "question": "Debug this inheritance setup. Predict instanceof results and bark(). Identify two common mistakes in constructor inheritance and explain why constructor is reassigned.",
    "code": "function Animal(name) {\n  this.name = name;\n}\nfunction Dog(name) {\n  Animal.call(this, name);\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nDog.prototype.bark = function () {\n  return this.name + \" barks\";\n};\nconst d = new Dog(\"Rex\");\nconsole.log(d instanceof Dog, d instanceof Animal, d.bark());"
  },
  {
    "id": "exp-27",
    "category": "scope-closure",
    "difficulty": "hard",
    "question": "Predict what happens. Explain parameter default evaluation order and the temporal dead zone. How can you rewrite the signature to avoid the error while still defaulting x from y?",
    "code": "function test(x = y, y = 2) {\n  return [x, y];\n}\ntest();"
  },
  {
    "id": "exp-28",
    "category": "async",
    "difficulty": "hard",
    "question": "Predict what is logged to the console from then/catch. Is there an additional problem? Explain why f can fulfill with \"done\" even though g throws. How should this be written?",
    "code": "async function g() {\n  throw new Error(\"boom\");\n}\nasync function f() {\n  g();\n  return \"done\";\n}\nf().then(console.log).catch((e) => console.log(\"err\", e.message));"
  },
  {
    "id": "exp-29",
    "category": "engine-memory",
    "difficulty": "hard",
    "question": "Why can makeA and makeB produce different hidden classes / shapes? How can that affect JIT performance? Recommend a construction style for objects created in a hot loop.",
    "code": "function makeA() {\n  return { a: 1, b: 2 };\n}\nfunction makeB() {\n  const o = {};\n  o.b = 2;\n  o.a = 1;\n  return o;\n}"
  },
  {
    "id": "exp-30",
    "category": "dsa",
    "difficulty": "hard",
    "question": "This function is supposed to detect a cycle in a linked list. Find the bug, explain Floyd’s algorithm, give a failing case, and state time/space complexity of a correct solution.",
    "code": "function hasCycle(head) {\n  let slow = head;\n  let fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}"
  }
]
