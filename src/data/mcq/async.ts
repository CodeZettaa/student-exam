import type { MCQQuestion } from '../../types/exam'

export const mcqAsync: MCQQuestion[] = [
  {
    id: 'mcq-async-01',
    category: 'async',
    difficulty: 'easy',
    question: 'What is the output order?',
    code: `console.log("A");
setTimeout(() => {
  console.log("B");
}, 0);
Promise.resolve().then(() => {
  console.log("C");
});
console.log("D");`,
    options: ['A B C D', 'A D C B', 'A C D B', 'D A C B'],
    correctAnswer: 1,
    explanation:
      'A and D run synchronously. Promise callbacks are microtasks and run before macrotasks, so C runs before the setTimeout callback B. The order is A, D, C, B.',
  },
  {
    id: 'mcq-async-02',
    category: 'async',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `Promise.resolve(2)
  .then((n) => n * 2)
  .then((n) => console.log(n));`,
    options: ['2', '4', 'undefined', 'The promise rejects'],
    correctAnswer: 1,
    explanation: 'Each then receives the previous fulfilled value. 2 * 2 is 4, which is logged.',
  },
  {
    id: 'mcq-async-03',
    category: 'async',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `async function run() {
  return 1;
}
run().then(console.log);`,
    options: ['1', 'Promise { 1 }', 'undefined', 'It throws because async must use await'],
    correctAnswer: 0,
    explanation:
      'async functions always return a Promise. Returning 1 is equivalent to resolving with 1, so then logs 1.',
  },
  {
    id: 'mcq-async-04',
    category: 'async',
    difficulty: 'easy',
    question: 'Which statement about the event loop is correct?',
    options: [
      'JavaScript can run many call stacks in parallel on one thread',
      'The call stack runs synchronous code; Web APIs schedule callbacks; the event loop pushes ready callbacks onto the stack',
      'setTimeout(fn, 0) runs fn before the current function returns',
      'Promises wait for the next animation frame before resolving',
    ],
    correctAnswer: 1,
    explanation:
      'JavaScript has one call stack. Timers, DOM, and network work go through Web APIs. The event loop moves completed callbacks onto the stack. setTimeout(0) is still asynchronous.',
  },
  {
    id: 'mcq-async-05',
    category: 'async',
    difficulty: 'medium',
    question: 'What is the output order?',
    code: `console.log("1");
queueMicrotask(() => console.log("2"));
setTimeout(() => console.log("3"), 0);
Promise.resolve().then(() => console.log("4"));
console.log("5");`,
    options: ['1 2 4 5 3', '1 5 2 4 3', '1 5 3 2 4', '1 2 5 4 3'],
    correctAnswer: 1,
    explanation:
      'Synchronous logs are 1 then 5. Microtasks (queueMicrotask and Promise.then) then print 2 and 4. The timer is a macrotask, so 3 is last.',
  },
  {
    id: 'mcq-async-06',
    category: 'async',
    difficulty: 'medium',
    question: 'What is the output order?',
    code: `async function f() {
  console.log("A");
  await null;
  console.log("B");
}
console.log("C");
f();
console.log("D");`,
    options: ['C A B D', 'C A D B', 'A C D B', 'C D A B'],
    correctAnswer: 1,
    explanation:
      'f() runs synchronously until await, so the order starts C, A, D. Code after await is a microtask, so B runs after D.',
  },
  {
    id: 'mcq-async-07',
    category: 'async',
    difficulty: 'medium',
    question: 'What is the output order?',
    code: `Promise.resolve()
  .then(() => {
    console.log("A");
    return Promise.resolve("B");
  })
  .then((v) => console.log(v));
queueMicrotask(() => console.log("C"));`,
    options: ['A B C', 'A C B', 'C A B', 'B A C'],
    correctAnswer: 1,
    explanation:
      'The first then logs A and returns a promise, which takes an extra microtask to unwrap. C is already queued and runs next, so the order is A, C, B.',
  },
  {
    id: 'mcq-async-08',
    category: 'async',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `Promise.reject(new Error("fail"))
  .then(() => console.log("then"))
  .catch((err) => console.log("catch", err.message))
  .then(() => console.log("after"));`,
    options: [
      'then',
      'catch fail',
      'catch fail then after',
      'An unhandled rejection is thrown',
    ],
    correctAnswer: 2,
    explanation:
      'The first then is skipped. catch logs "catch fail" and recovers. The following then therefore runs and logs "after".',
  },
  {
    id: 'mcq-async-09',
    category: 'async',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `async function load() {
  try {
    await Promise.reject("broken");
    return "ok";
  } catch (e) {
    return "handled";
  }
}
load().then(console.log);`,
    options: ['ok', 'handled', 'broken', 'The promise rejects with "broken"'],
    correctAnswer: 1,
    explanation:
      'await on a rejected promise throws into the async function. try/catch handles it and returns "handled", so the returned promise fulfills with "handled".',
  },
  {
    id: 'mcq-async-10',
    category: 'async',
    difficulty: 'medium',
    question: 'What is the output order?',
    code: `setTimeout(() => console.log("timeout"), 0);
Promise.resolve()
  .then(() => console.log("p1"))
  .then(() => console.log("p2"));
console.log("sync");`,
    options: [
      'timeout p1 p2 sync',
      'sync p1 p2 timeout',
      'sync timeout p1 p2',
      'sync p1 timeout p2',
    ],
    correctAnswer: 1,
    explanation:
      'sync runs first. Both promise then callbacks are microtasks and run before the timeout macrotask, so p1 and p2 print before timeout.',
  },
  {
    id: 'mcq-async-11',
    category: 'async',
    difficulty: 'medium',
    question: 'What is the output order?',
    code: `const p = Promise.resolve("A");
p.then((v) => {
  console.log(v);
  throw new Error("X");
}).catch((e) => console.log(e.message));
p.then((v) => console.log(v + "2"));`,
    options: ['A then X then A2', 'A then A2 then X', 'A2 then A then X', 'A then X'],
    correctAnswer: 1,
    explanation:
      'Both then callbacks attach to the same fulfilled promise and run in order. The first logs A and rejects its derived chain. The second still logs A2. The catch then logs X. Order: A, A2, X.',
  },
  {
    id: 'mcq-async-12',
    category: 'async',
    difficulty: 'hard',
    question: 'What is the output order?',
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
    options: ['1 6 4 2 3 5', '1 6 2 3 4 5', '1 6 4 2 5 3', '1 4 6 2 3 5'],
    correctAnswer: 0,
    explanation:
      'Synchronous code logs 1 then 6. The microtask logs 4 and schedules timeout 5. The first timeout logs 2 and queues microtask 3, which runs before the next macrotask 5. Order: 1 6 4 2 3 5.',
  },
  {
    id: 'mcq-async-13',
    category: 'async',
    difficulty: 'hard',
    question: 'What is logged?',
    code: `async function g() {
  throw new Error("boom");
}
async function f() {
  g();
  return "done";
}
f().then(console.log).catch((e) => console.log("err", e.message));`,
    options: ['done', 'err boom', 'done then err boom', 'Nothing is logged'],
    correctAnswer: 0,
    explanation:
      'g() is called without await, so its rejection is not tied to f. f returns "done" and fulfills. The rejection from g is a separate unhandled rejection and does not change f’s result.',
  },
  {
    id: 'mcq-async-14',
    category: 'async',
    difficulty: 'hard',
    question: 'What is the output order?',
    code: `Promise.resolve()
  .then(() => {
    console.log("A");
    Promise.resolve().then(() => console.log("B"));
  })
  .then(() => console.log("C"));`,
    options: ['A B C', 'A C B', 'B A C', 'A B then C never runs'],
    correctAnswer: 0,
    explanation:
      'The first then logs A and immediately queues B via Promise.resolve().then. After that handler returns undefined, C is queued. B was already in the microtask queue, so the order is A, B, C.',
  },
]
