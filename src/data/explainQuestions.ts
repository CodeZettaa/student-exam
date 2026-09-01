import type { ExplainQuestion } from '../types/exam'

export const explainQuestions: ExplainQuestion[] = [
  {
    id: 'exp-01',
    category: 'scope-closure',
    difficulty: 'easy',
    question:
      'Predict the output of both console.log calls. Then explain why count is still accessible after createCounter has returned, name the concept involved, and describe what happens to count in memory.',
    code: `function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());`,
    expectedPoints: [
      'Output is 1 then 2.',
      'count lives in the lexical environment of createCounter and remains reachable through the returned function.',
      'The concept is a closure.',
      'count is heap-allocated as part of that environment and is not collected while counter exists.',
    ],
    rubric: [
      { point: 'Correct output: 1 then 2', marks: 3 },
      { point: 'Explains that the inner function retains access to count', marks: 3 },
      { point: 'Names closure (and lexical environment / scope)', marks: 2 },
      { point: 'Memory: count stays reachable until the closure is released', marks: 2 },
    ],
  },
  {
    id: 'exp-02',
    category: 'oop-prototype',
    difficulty: 'easy',
    question:
      'What will happen when user.greet() runs? Why? Fix the code so it logs "Ali", and explain why your fix works.',
    code: `const user = {
  name: "Ali",
  greet: () => {
    console.log(this.name);
  }
};

user.greet();`,
    expectedPoints: [
      'In an ES module / strict mode this is undefined, so this.name throws TypeError (or is not user.name).',
      'Arrow functions do not bind this from the calling object.',
      'Fix: use a method greet() { console.log(this.name); } or greet() { console.log(user.name); }.',
      'A regular method receives this = user when called as user.greet().',
    ],
    rubric: [
      { point: 'Correctly predicts TypeError / wrong this (not "Ali")', marks: 3 },
      { point: 'Explains lexical this of arrow functions', marks: 3 },
      { point: 'Provides a working fix', marks: 2 },
      { point: 'Explains why the fix binds this or avoids this', marks: 2 },
    ],
  },
  {
    id: 'exp-03',
    category: 'javascript-core',
    difficulty: 'easy',
    question:
      'Predict the three logged values. Explain the difference between var, let, and const in this snippet, including why one line throws.',
    code: `var a = 1;
let b = 2;
const c = 3;
a = 10;
b = 20;
c = 30;
console.log(a, b, c);`,
    expectedPoints: [
      'c = 30 throws TypeError; console.log does not run.',
      'var and let bindings can be reassigned; const cannot.',
      'const prevents reassignment of the binding, not deep immutability of objects.',
    ],
    rubric: [
      { point: 'Identifies TypeError on const reassignment', marks: 3 },
      { point: 'States a and b could be reassigned', marks: 3 },
      { point: 'Notes console.log never runs', marks: 2 },
      { point: 'Clarifies const vs object mutability if relevant', marks: 2 },
    ],
  },
  {
    id: 'exp-04',
    category: 'scope-closure',
    difficulty: 'easy',
    question:
      'What is logged? Explain hoisting and the temporal dead zone using this code. How would the result change if let were var?',
    code: `console.log(x);
let x = 5;`,
    expectedPoints: [
      'Throws ReferenceError.',
      'let is hoisted but uninitialized (TDZ) until the declaration line.',
      'With var, it would log undefined because var is initialized to undefined when hoisted.',
    ],
    rubric: [
      { point: 'Correct result: ReferenceError', marks: 3 },
      { point: 'Explains TDZ / uninitialized hoisting of let', marks: 3 },
      { point: 'Contrasts with var → undefined', marks: 2 },
      { point: 'Clear reasoning about order of access vs initialization', marks: 2 },
    ],
  },
  {
    id: 'exp-05',
    category: 'javascript-core',
    difficulty: 'easy',
    question:
      'Predict the output. Explain why the default for a applies but the default for b does not. What JavaScript rule is this demonstrating?',
    code: `const { a = 1, b = 2 } = { a: undefined, b: null };
console.log(a, b);`,
    expectedPoints: [
      'Logs 1 and null.',
      'Defaults apply only when the value is undefined, not null.',
      'This is the undefined-vs-null / default initialization rule (also used by function parameters).',
    ],
    rubric: [
      { point: 'Correct output: 1 null', marks: 3 },
      { point: 'Default only for undefined', marks: 3 },
      { point: 'null is a defined value', marks: 2 },
      { point: 'Connects to parameter defaults or nullish vs falsy', marks: 2 },
    ],
  },
  {
    id: 'exp-06',
    category: 'async',
    difficulty: 'easy',
    question:
      'Predict the output order. Classify each log as synchronous, microtask, or macrotask. Why does C run before B?',
    code: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
    expectedPoints: [
      'Order: A, D, C, B.',
      'A and D are synchronous call-stack work.',
      'C is a microtask (Promise then); B is a macrotask (timer).',
      'After the stack empties, the engine drains microtasks before the next timer task.',
    ],
    rubric: [
      { point: 'Correct order A D C B', marks: 3 },
      { point: 'Labels sync vs micro vs macro correctly', marks: 3 },
      { point: 'Explains microtasks before timers', marks: 2 },
      { point: 'Mentions call stack must empty first', marks: 2 },
    ],
  },
  {
    id: 'exp-07',
    category: 'oop-prototype',
    difficulty: 'easy',
    question:
      'Predict both logs. Explain how the prototype chain is used for greet. What would happen if greet were assigned only on p1, not on Person.prototype?',
    code: `function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return "Hi " + this.name;
};
const p1 = new Person("Sara");
const p2 = new Person("Omar");
console.log(p1.greet());
console.log(p2.hasOwnProperty("greet"));`,
    expectedPoints: [
      'Logs "Hi Sara" and false.',
      'greet is found by walking [[Prototype]] to Person.prototype.',
      'this inside greet is p1 because of the method call pattern.',
      'If greet were only on p1, p2.greet would be undefined / throw when called.',
    ],
    rubric: [
      { point: 'Correct output', marks: 3 },
      { point: 'Explains prototype lookup', marks: 3 },
      { point: 'hasOwnProperty false because greet is inherited', marks: 2 },
      { point: 'Shared vs own method consequence', marks: 2 },
    ],
  },
  {
    id: 'exp-08',
    category: 'dsa',
    difficulty: 'easy',
    question:
      'What is the time complexity of linearSearch? Explain best, average, and worst cases. Why is this worse than binary search on a sorted array?',
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    expectedPoints: [
      'Time complexity is O(n).',
      'Best case O(1) if the target is first; worst case O(n) if missing or last.',
      'Binary search is O(log n) but requires sorted data.',
    ],
    rubric: [
      { point: 'States O(n)', marks: 3 },
      { point: 'Best vs worst case', marks: 3 },
      { point: 'Compares to binary search O(log n)', marks: 2 },
      { point: 'Mentions sorted-array requirement for binary search', marks: 2 },
    ],
  },
  {
    id: 'exp-09',
    category: 'scope-closure',
    difficulty: 'medium',
    question:
      'What is printed after the timeouts run? Explain why. Rewrite the loop so it prints 0 1 2, and explain why your rewrite works. Mention at least two valid techniques.',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    expectedPoints: [
      'Prints 3 3 3.',
      'var i is one function-scoped binding; callbacks run after the loop with i === 3.',
      'Fixes: for (let i = ...), or an IIFE/closure capturing the current i, or setTimeout(fn, 0, i).',
    ],
    rubric: [
      { point: 'Correct output 3 3 3', marks: 3 },
      { point: 'Explains shared var binding / async timing', marks: 3 },
      { point: 'Working fix with let or capture', marks: 2 },
      { point: 'Second valid technique or clear memory/scope detail', marks: 2 },
    ],
  },
  {
    id: 'exp-10',
    category: 'oop-prototype',
    difficulty: 'medium',
    question:
      'Predict all three logs. Explain call, apply, and bind. Then explain why bound() still returns "admin" even if called as a bare function.',
    code: `function greet() {
  return this.role;
}
const user = { role: "admin" };
console.log(greet.call(user));
console.log(greet.apply(user));
const bound = greet.bind(user);
console.log(bound());`,
    expectedPoints: [
      'All three log "admin".',
      'call/apply invoke immediately with a given this (apply passes args as an array).',
      'bind returns a new function with this permanently set to user.',
    ],
    rubric: [
      { point: 'Correct outputs', marks: 3 },
      { point: 'call vs apply', marks: 2 },
      { point: 'bind creates a bound function', marks: 3 },
      { point: 'Bound this is not lost on a later bare call', marks: 2 },
    ],
  },
  {
    id: 'exp-11',
    category: 'async',
    difficulty: 'medium',
    question:
      'Predict the output order. Explain what await does to the rest of f, and why B is not logged between A and D.',
    code: `async function f() {
  console.log("A");
  await null;
  console.log("B");
}
console.log("C");
f();
console.log("D");`,
    expectedPoints: [
      'Order: C, A, D, B.',
      'f runs synchronously until await.',
      'The remainder is scheduled as a microtask; D runs first because it is still on the current stack.',
    ],
    rubric: [
      { point: 'Correct order C A D B', marks: 4 },
      { point: 'await yields; continuation is async', marks: 3 },
      { point: 'D is still synchronous after f() is called', marks: 3 },
    ],
  },
  {
    id: 'exp-12',
    category: 'javascript-core',
    difficulty: 'medium',
    question:
      'Predict each log. Explain || vs ?? and why 0 and "" are treated differently. When should you prefer ?? in real code?',
    code: `console.log(0 || "A");
console.log(0 ?? "A");
console.log("" || "B");
console.log("" ?? "B");`,
    expectedPoints: [
      'A, 0, B, "".',
      '|| treats any falsy value as missing; ?? only treats null/undefined as missing.',
      'Prefer ?? when 0, false, or "" are valid data.',
    ],
    rubric: [
      { point: 'Correct four outputs', marks: 4 },
      { point: 'Falsy vs nullish explanation', marks: 4 },
      { point: 'Practical preference for ??', marks: 2 },
    ],
  },
  {
    id: 'exp-13',
    category: 'oop-prototype',
    difficulty: 'medium',
    question:
      'Predict the logs. Explain why a.n is 2 while b.n stays 1. Is this polymorphism, shadowing, or mutating the prototype? How would you change n for every instance?',
    code: `function Foo() {}
Foo.prototype.n = 1;
const a = new Foo();
const b = new Foo();
a.n = 2;
console.log(a.n, b.n, Foo.prototype.n);`,
    expectedPoints: [
      'Logs 2, 1, 1.',
      'a.n = 2 creates an own property that shadows the prototype.',
      'The prototype value is unchanged; b still inherits 1.',
      'To update all instances without own properties, set Foo.prototype.n.',
    ],
    rubric: [
      { point: 'Correct output 2 1 1', marks: 3 },
      { point: 'Own-property shadowing', marks: 3 },
      { point: 'Prototype not mutated by a.n = 2', marks: 2 },
      { point: 'How to change the shared value', marks: 2 },
    ],
  },
  {
    id: 'exp-14',
    category: 'async',
    difficulty: 'medium',
    question:
      'Predict the logs. Does catch recover the chain? Why does "after" still run? What would change if catch rethrew?',
    code: `Promise.reject(new Error("fail"))
  .then(() => console.log("then"))
  .catch((err) => console.log("catch", err.message))
  .then(() => console.log("after"));`,
    expectedPoints: [
      'Logs "catch fail" then "after". The first then is skipped.',
      'catch handles the rejection and returns a fulfillment (undefined).',
      'If catch rethrew, the following then would be skipped and a later catch would be needed.',
    ],
    rubric: [
      { point: 'Correct logs and skipped then', marks: 4 },
      { point: 'Recovery / fulfilled continuation', marks: 3 },
      { point: 'Rethrow consequence', marks: 3 },
    ],
  },
  {
    id: 'exp-15',
    category: 'engine-memory',
    difficulty: 'medium',
    question:
      'Will huge stay in memory after build() returns? Why? How would you change the code so the large array can be garbage collected while still returning small?',
    code: `function build() {
  const huge = new Array(1e6).fill(0);
  const small = 42;
  return function () {
    return small + huge.length;
  };
}
const fn = build();`,
    expectedPoints: [
      'Yes while fn exists, because the inner function references huge.',
      'Closures keep referenced bindings reachable.',
      'Fix: compute huge.length into a number, then return a function that only uses small and that number, never huge.',
    ],
    rubric: [
      { point: 'Identifies that huge is retained', marks: 3 },
      { point: 'Reachability / closure explanation', marks: 3 },
      { point: 'Valid fix that drops the reference', marks: 3 },
      { point: 'Mentions GC eligibility after unreachability', marks: 1 },
    ],
  },
  {
    id: 'exp-16',
    category: 'modules-bundlers',
    difficulty: 'medium',
    question:
      'Explain which export a bundler can most likely tree-shake if the app only imports add. What would make unused impossible to drop? Relate this to ES modules vs side effects.',
    code: `export function add(a, b) {
  return a + b;
}
export function unused() {
  return 123;
}
console.log("module loaded");`,
    expectedPoints: [
      'unused can be shaken if nothing imports it and the bundler trusts the module graph.',
      'The console.log is a side effect; some bundlers still keep the module or the log.',
      'Side effects on import, dynamic export assignment, or /*#__PURE__*/ absence can block shaking.',
    ],
    rubric: [
      { point: 'unused is the candidate for removal', marks: 3 },
      { point: 'Side-effect log complicates dropping the whole file', marks: 3 },
      { point: 'Static ES exports enable analysis', marks: 2 },
      { point: 'Example of what blocks tree shaking', marks: 2 },
    ],
  },
  {
    id: 'exp-17',
    category: 'dsa',
    difficulty: 'medium',
    question:
      'What are the time and space complexities? Why is this better than a nested-loop two-sum? Name an important edge case this implementation must consider.',
    code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}`,
    expectedPoints: [
      'O(n) time, O(n) space.',
      'Nested loops are O(n^2); a hash map trades space for faster lookup.',
      'Edge cases: no pair, duplicates, same element used twice (this version uses a previous index, so it does not use i twice).',
    ],
    rubric: [
      { point: 'O(n) time and O(n) space', marks: 3 },
      { point: 'Comparison to O(n^2)', marks: 3 },
      { point: 'Valid edge case (duplicates / no answer / self-pair)', marks: 2 },
      { point: 'Explains Map lookup', marks: 2 },
    ],
  },
  {
    id: 'exp-18',
    category: 'javascript-core',
    difficulty: 'medium',
    question:
      'Predict the logs. Explain Object.freeze in strict mode, including that it is shallow. How would you freeze nested as well?',
    code: `const obj = Object.freeze({ a: 1, nested: { b: 2 } });
obj.a = 10;
obj.nested.b = 20;`,
    expectedPoints: [
      'obj.a = 10 throws TypeError in strict mode; nested assignment may not run.',
      'If the first assignment were skipped, nested.b could still change because freeze is shallow.',
      'Deep freeze recursively freezes nested objects.',
    ],
    rubric: [
      { point: 'Strict-mode TypeError on frozen own property', marks: 3 },
      { point: 'Shallow freeze explanation', marks: 3 },
      { point: 'nested remains mutable if freeze did not throw first', marks: 2 },
      { point: 'Deep-freeze approach', marks: 2 },
    ],
  },
  {
    id: 'exp-19',
    category: 'oop-prototype',
    difficulty: 'medium',
    question:
      'What happens when new Child() runs? Explain why this cannot be used before super() in a subclass. Fix the constructor and state the final value of kind.',
    code: `class Parent {
  constructor() {
    this.kind = "A";
  }
}
class Child extends Parent {
  constructor() {
    this.kind = "B";
    super();
  }
}
new Child();`,
    expectedPoints: [
      'Throws ReferenceError because this is uninitialized before super().',
      'Derived constructors must call super() before using this.',
      'Fix: call super() first, then this.kind = "B"; final kind is "B".',
    ],
    rubric: [
      { point: 'Identifies ReferenceError', marks: 3 },
      { point: 'this before super explanation', marks: 3 },
      { point: 'Correct constructor order', marks: 2 },
      { point: 'Final kind "B"', marks: 2 },
    ],
  },
  {
    id: 'exp-20',
    category: 'javascript-core',
    difficulty: 'medium',
    question:
      'Is addTax a pure function? Why or why not? Rewrite it to be pure and immutable. Explain why mutating the input is a problem in larger programs.',
    code: `function addTax(order) {
  order.total = order.total * 1.15;
  return order;
}
const o = { total: 100 };
addTax(o);
console.log(o.total);`,
    expectedPoints: [
      'Not pure: it mutates the input and depends on/changes shared state.',
      'Pure version returns { ...order, total: order.total * 1.15 } without changing o.',
      'Mutations cause surprising bugs when the same object is used elsewhere.',
    ],
    rubric: [
      { point: 'Identifies impurity / mutation', marks: 3 },
      { point: 'Logs 115 for the original object', marks: 2 },
      { point: 'Pure immutable rewrite', marks: 3 },
      { point: 'Explains why immutability helps', marks: 2 },
    ],
  },
  {
    id: 'exp-21',
    category: 'dsa',
    difficulty: 'medium',
    question:
      'Find the bug. What input would fail? Explain stack vs queue. Rewrite using a queue-like approach (FIFO) and state the time complexity of enqueue/dequeue with a JS array shift.',
    code: `function createQueue() {
  const data = [];
  return {
    enqueue(x) { data.push(x); },
    dequeue() { return data.pop(); },
  };
}`,
    expectedPoints: [
      'dequeue uses pop, which is LIFO (stack), not FIFO.',
      'enqueue 1 then 2, dequeue should return 1 but returns 2.',
      'Fix: dequeue with shift() (or use a linked list / head index).',
      'Array shift is O(n); push/pop are O(1).',
    ],
    rubric: [
      { point: 'Identifies stack vs queue bug', marks: 3 },
      { point: 'Concrete failing example', marks: 2 },
      { point: 'Correct FIFO fix', marks: 3 },
      { point: 'Complexity of shift vs better structure', marks: 2 },
    ],
  },
  {
    id: 'exp-22',
    category: 'engine-memory',
    difficulty: 'medium',
    question:
      'Describe parsing, AST, bytecode, and JIT in order. Why might a function run slower the first times and faster later? What is deoptimization?',
    expectedPoints: [
      'Parse source → AST → interpret bytecode → JIT compile hot functions.',
      'Warm-up: interpreter first, then optimized native code.',
      'Deoptimization happens when JIT assumptions fail (e.g. type changes).',
    ],
    rubric: [
      { point: 'Correct pipeline order', marks: 4 },
      { point: 'Hot code / warm-up', marks: 3 },
      { point: 'Deoptimization meaning', marks: 3 },
    ],
  },
  {
    id: 'exp-23',
    category: 'modules-bundlers',
    difficulty: 'medium',
    question:
      'Explain the difference between the static import and the dynamic import. When would you use each in a production app? How does this relate to code splitting in Vite or Webpack?',
    code: `import { util } from "./util.js";
export async function loadHeavy() {
  const mod = await import("./heavy.js");
  return mod.default;
}`,
    expectedPoints: [
      'Static import is resolved at load time and included in the initial graph.',
      'import() returns a Promise and can create a separate chunk.',
      'Use dynamic import for routes, large libraries, or rarely used features.',
    ],
    rubric: [
      { point: 'Static vs dynamic behavior', marks: 4 },
      { point: 'Code splitting / extra chunk', marks: 3 },
      { point: 'Practical use case', marks: 3 },
    ],
  },
  {
    id: 'exp-24',
    category: 'scope-closure',
    difficulty: 'medium',
    question:
      'Predict the three logs. Explain whether c1 and c2 share memory. What would change if count were a global variable instead of a let inside createCounter?',
    code: `function createCounter() {
  let count = 0;
  return () => ++count;
}
const c1 = createCounter();
const c2 = createCounter();
console.log(c1(), c1(), c2());`,
    expectedPoints: [
      'Logs 1, 2, 1.',
      'Each createCounter() call has its own lexical environment.',
      'A global count would be shared: 1, 2, 3.',
    ],
    rubric: [
      { point: 'Correct output 1 2 1', marks: 3 },
      { point: 'Separate closures / environments', marks: 4 },
      { point: 'Global would share state', marks: 3 },
    ],
  },
  {
    id: 'exp-25',
    category: 'async',
    difficulty: 'hard',
    question:
      'Predict the full output order. Walk through the call stack, microtask queue, and macrotask queue after each step. Why does 3 run before 5?',
    code: `console.log("1");
setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => console.log("3"));
}, 0);
Promise.resolve().then(() => {
  console.log("4");
  setTimeout(() => console.log("5"), 0);
});
console.log("6");`,
    expectedPoints: [
      'Order: 1 6 4 2 3 5.',
      'Sync: 1, 6. Microtask: 4 (schedules timeout 5). Macrotask timeout logs 2 and queues microtask 3, which runs before timeout 5.',
    ],
    rubric: [
      { point: 'Correct order 1 6 4 2 3 5', marks: 4 },
      { point: 'Sync vs first microtask 4', marks: 2 },
      { point: 'Microtask 3 inside first timeout before next timer', marks: 3 },
      { point: 'Clear queue walkthrough', marks: 1 },
    ],
  },
  {
    id: 'exp-26',
    category: 'oop-prototype',
    difficulty: 'hard',
    question:
      'Debug this inheritance setup. Predict instanceof results and bark(). Identify two common mistakes in constructor inheritance and explain why constructor is reassigned.',
    code: `function Animal(name) {
  this.name = name;
}
function Dog(name) {
  Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function () {
  return this.name + " barks";
};
const d = new Dog("Rex");
console.log(d instanceof Dog, d instanceof Animal, d.bark());`,
    expectedPoints: [
      'true true "Rex barks".',
      'Animal.call(this, name) initializes instance fields; Object.create sets the prototype chain.',
      'Mistakes: new Animal() as prototype (shared state), forgetting call/apply, overwriting prototype after adding methods.',
      'constructor is restored for debugging and libraries that inspect constructor.',
    ],
    rubric: [
      { point: 'Correct logs', marks: 3 },
      { point: 'Explains call + Object.create', marks: 3 },
      { point: 'Names real pitfalls', marks: 2 },
      { point: 'constructor reset purpose', marks: 2 },
    ],
  },
  {
    id: 'exp-27',
    category: 'scope-closure',
    difficulty: 'hard',
    question:
      'Predict what happens. Explain parameter default evaluation order and the temporal dead zone. How can you rewrite the signature to avoid the error while still defaulting x from y?',
    code: `function test(x = y, y = 2) {
  return [x, y];
}
test();`,
    expectedPoints: [
      'Throws ReferenceError.',
      'Defaults are evaluated left to right; y is in the TDZ when x = y runs.',
      'Rewrite: test(x, y = 2) { x = x === undefined ? y : x; } or put y first: (y = 2, x = y).',
    ],
    rubric: [
      { point: 'ReferenceError', marks: 3 },
      { point: 'Left-to-right defaults + TDZ', marks: 4 },
      { point: 'Valid rewrite', marks: 3 },
    ],
  },
  {
    id: 'exp-28',
    category: 'async',
    difficulty: 'hard',
    question:
      'Predict what is logged to the console from then/catch. Is there an additional problem? Explain why f can fulfill with "done" even though g throws. How should this be written?',
    code: `async function g() {
  throw new Error("boom");
}
async function f() {
  g();
  return "done";
}
f().then(console.log).catch((e) => console.log("err", e.message));`,
    expectedPoints: [
      'then logs "done". catch does not run for boom.',
      'g() is not awaited, so its rejection is not part of f’s promise (unhandled rejection).',
      'Fix: await g() inside f, or return g().then(() => "done").',
    ],
    rubric: [
      { point: 'Logs done; catch not used for boom', marks: 3 },
      { point: 'Missing await / floating promise', marks: 4 },
      { point: 'Correct fix with await or chaining', marks: 3 },
    ],
  },
  {
    id: 'exp-29',
    category: 'engine-memory',
    difficulty: 'hard',
    question:
      'Why can makeA and makeB produce different hidden classes / shapes? How can that affect JIT performance? Recommend a construction style for objects created in a hot loop.',
    code: `function makeA() {
  return { a: 1, b: 2 };
}
function makeB() {
  const o = {};
  o.b = 2;
  o.a = 1;
  return o;
}`,
    expectedPoints: [
      'Hidden classes depend on property addition order.',
      'Mismatched shapes prevent sharing optimized property access.',
      'In hot paths, construct objects with a consistent set of properties in a consistent order (or a class/constructor).',
    ],
    rubric: [
      { point: 'Property order / hidden classes', marks: 4 },
      { point: 'Performance / megamorphic access', marks: 3 },
      { point: 'Practical recommendation', marks: 3 },
    ],
  },
  {
    id: 'exp-30',
    category: 'dsa',
    difficulty: 'hard',
    question:
      'This function is supposed to detect a cycle in a linked list. Find the bug, explain Floyd’s algorithm, give a failing case, and state time/space complexity of a correct solution.',
    code: `function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    expectedPoints: [
      'fast only moves one step (fast.next), so it does not run twice as fast; the meeting condition is wrong for Floyd.',
      'Correct: fast = fast.next.next. If they meet, there is a cycle.',
      'Failing case: 1 → 2 → 3 → 2 (cycle); this version may never meet correctly or may compare incorrectly.',
      'Correct solution is O(n) time, O(1) space.',
    ],
    rubric: [
      { point: 'Identifies fast pointer not moving two steps', marks: 4 },
      { point: 'Explains tortoise and hare', marks: 2 },
      { point: 'Failing cyclic example', marks: 2 },
      { point: 'O(n) time O(1) space', marks: 2 },
    ],
  },
]
