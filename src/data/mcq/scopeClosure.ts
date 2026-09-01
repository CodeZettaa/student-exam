import type { MCQQuestion } from '../../types/exam'

export const mcqScopeClosure: MCQQuestion[] = [
  {
    id: 'mcq-scope-01',
    category: 'scope-closure',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `function outer() {
  var x = 1;
  function inner() {
    console.log(x);
  }
  return inner;
}
const fn = outer();
fn();`,
    options: ['1', 'undefined', 'null', 'ReferenceError'],
    correctAnswer: 0,
    explanation:
      'inner closes over outer’s x. After outer returns, the lexical environment still holds x = 1, so fn() logs 1.',
  },
  {
    id: 'mcq-scope-02',
    category: 'scope-closure',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `console.log(a);
var a = 5;`,
    options: ['5', 'undefined', 'ReferenceError', 'null'],
    correctAnswer: 1,
    explanation:
      'var declarations are hoisted and initialized to undefined. The assignment a = 5 happens after the log, so the value is undefined.',
  },
  {
    id: 'mcq-scope-03',
    category: 'scope-closure',
    difficulty: 'easy',
    question: 'What happens?',
    code: `console.log(b);
let b = 5;`,
    options: [
      'It logs 5',
      'It logs undefined',
      'It throws a ReferenceError',
      'It logs null',
    ],
    correctAnswer: 2,
    explanation:
      'let is hoisted but stays in the temporal dead zone until the declaration is evaluated. Accessing b before initialization throws ReferenceError.',
  },
  {
    id: 'mcq-scope-04',
    category: 'scope-closure',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `var x = 10;
{
  var x = 20;
}
console.log(x);`,
    options: ['10', '20', 'undefined', 'ReferenceError'],
    correctAnswer: 1,
    explanation:
      'var is function-scoped, not block-scoped. The inner var x = 20 reassigns the same binding, so the outer log prints 20.',
  },
  {
    id: 'mcq-scope-05',
    category: 'scope-closure',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `let x = 10;
{
  let x = 20;
}
console.log(x);`,
    options: ['10', '20', 'undefined', 'ReferenceError'],
    correctAnswer: 0,
    explanation:
      'let is block-scoped. The inner x shadows the outer x only inside the block, so the outer log still prints 10.',
  },
  {
    id: 'mcq-scope-06',
    category: 'scope-closure',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `for (var i = 0; i < 3; i++) {}
console.log(i);`,
    options: ['2', '3', 'undefined', 'ReferenceError'],
    correctAnswer: 1,
    explanation:
      'var i leaks out of the for loop. The loop ends when i becomes 3, so console.log(i) prints 3.',
  },
  {
    id: 'mcq-scope-07',
    category: 'scope-closure',
    difficulty: 'medium',
    question: 'What is logged after the timeouts run?',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ['0 1 2', '1 2 3', '3 3 3', '0 0 0'],
    correctAnswer: 2,
    explanation:
      'Each callback closes over the same var i. By the time the timers run, the loop has finished and i is 3, so all three logs are 3.',
  },
  {
    id: 'mcq-scope-08',
    category: 'scope-closure',
    difficulty: 'medium',
    question: 'What is logged after the timeouts run?',
    code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: ['0 1 2', '1 2 3', '3 3 3', '0 0 0'],
    correctAnswer: 0,
    explanation:
      'let creates a new binding per iteration. Each timeout closes over that iteration’s i, so the logs are 0, 1, and 2.',
  },
  {
    id: 'mcq-scope-09',
    category: 'scope-closure',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `function make() {
  const fns = [];
  for (var i = 0; i < 3; i++) {
    fns.push(function () {
      return i;
    });
  }
  return fns.map((fn) => fn());
}
console.log(make());`,
    options: ['[0, 1, 2]', '[1, 2, 3]', '[3, 3, 3]', '[undefined, undefined, undefined]'],
    correctAnswer: 2,
    explanation:
      'All three functions close over one var i. After the loop, i is 3, so every call returns 3.',
  },
  {
    id: 'mcq-scope-10',
    category: 'scope-closure',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `function createCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
const c1 = createCounter();
const c2 = createCounter();
console.log(c1());
console.log(c1());
console.log(c2());`,
    options: ['1 2 3', '1 2 1', '0 1 0', '1 1 1'],
    correctAnswer: 1,
    explanation:
      'Each call to createCounter() creates a separate lexical environment. c1 and c2 do not share count, so the logs are 1, 2, then 1.',
  },
  {
    id: 'mcq-scope-11',
    category: 'scope-closure',
    difficulty: 'medium',
    question: 'What happens in strict mode / ES modules?',
    code: `const obj = {
  n: 1,
  getN() {
    return this.n;
  },
};
const fn = obj.getN;
console.log(obj.getN());
console.log(fn());`,
    options: [
      'It logs 1 then 1',
      'It logs 1 then undefined',
      'It logs 1, then throws TypeError',
      'It throws TypeError on the first call',
    ],
    correctAnswer: 2,
    explanation:
      'obj.getN() sets this to obj and logs 1. Extracting the method loses that binding. In strict mode, fn() uses this === undefined, and reading undefined.n throws TypeError.',
  },
  {
    id: 'mcq-scope-12',
    category: 'scope-closure',
    difficulty: 'hard',
    question: 'What is logged?',
    code: `function foo() {
  console.log(a);
  var a = 1;
  console.log(b);
  let b = 2;
}
foo();`,
    options: [
      'undefined then 2',
      'undefined then ReferenceError',
      'ReferenceError then ReferenceError',
      '1 then 2',
    ],
    correctAnswer: 1,
    explanation:
      'var a is hoisted as undefined. let b is in the TDZ when first accessed, so the second log throws ReferenceError.',
  },
  {
    id: 'mcq-scope-13',
    category: 'scope-closure',
    difficulty: 'hard',
    question: 'What is logged?',
    code: `function mystery() {
  return function inner() {
    return this === inner;
  };
}
const fn = mystery();
console.log(fn());
console.log(fn.call(fn));`,
    options: [
      'true then true',
      'false then true',
      'false then false',
      'true then false',
    ],
    correctAnswer: 1,
    explanation:
      'A normal call in strict mode / modules uses this === undefined, so the first result is false. fn.call(fn) sets this to fn, and fn is the inner function, so this === inner is true.',
  },
  {
    id: 'mcq-scope-14',
    category: 'scope-closure',
    difficulty: 'hard',
    question: 'What is logged?',
    code: `const add = (x) => (y) => x + y;
const add5 = add(5);
console.log(add5(10));
x = 100;
console.log(add5(10));`,
    options: ['15 then 15', '15 then 110', '15 then ReferenceError', 'It throws before logging'],
    correctAnswer: 0,
    explanation:
      'add5 closes over the parameter x = 5. Assigning a global x does not change that closed-over binding, so both calls return 15.',
  },
]
