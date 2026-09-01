import type { MCQQuestion } from '../../types/exam'

export const mcqJavascriptCore: MCQQuestion[] = [
  {
    id: 'mcq-core-01',
    category: 'javascript-core',
    difficulty: 'easy',
    question: 'What happens when this code runs in strict mode?',
    code: `const n = 3;
n = 5;
console.log(n);`,
    options: [
      'It logs 5',
      'It logs 3',
      'It throws a TypeError',
      'It throws a SyntaxError',
    ],
    correctAnswer: 2,
    explanation:
      'const bindings cannot be reassigned. In strict mode (including ES modules), the assignment throws TypeError and console.log never runs.',
  },
  {
    id: 'mcq-core-02',
    category: 'javascript-core',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `console.log(typeof null);
console.log(typeof undefined);
console.log(typeof []);`,
    options: [
      'object, undefined, object',
      'null, undefined, array',
      'object, undefined, array',
      'null, object, object',
    ],
    correctAnswer: 0,
    explanation:
      'typeof null is the well-known historical bug and returns "object". typeof undefined is "undefined". Arrays are objects, so typeof [] is "object".',
  },
  {
    id: 'mcq-core-03',
    category: 'javascript-core',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `const a = [1, 2];
const b = [...a, 3];
a.push(4);
console.log(b);`,
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[1, 2, 4]', '[1, 2]'],
    correctAnswer: 0,
    explanation:
      'Spread copies a’s elements into a new array. Later mutating a does not change b, so b remains [1, 2, 3].',
  },
  {
    id: 'mcq-core-04',
    category: 'javascript-core',
    difficulty: 'easy',
    question: 'What is logged?',
    code: `const obj = { x: 1 };
console.log(\`\${obj}\`);
console.log(\`\${JSON.stringify(obj)}\`);`,
    options: [
      '[object Object] then {"x":1}',
      '{x:1} then {"x":1}',
      '[object Object] then [object Object]',
      'It throws a TypeError',
    ],
    correctAnswer: 0,
    explanation:
      'Template interpolation calls ToString. A plain object becomes "[object Object]". JSON.stringify produces the JSON text {"x":1}.',
  },
  {
    id: 'mcq-core-05',
    category: 'javascript-core',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `console.log([] == false);
console.log([] === false);
console.log("0" == 0);
console.log("0" === 0);`,
    options: [
      'true, false, true, false',
      'false, false, true, false',
      'true, true, true, false',
      'true, false, false, false',
    ],
    correctAnswer: 0,
    explanation:
      '== allows coercion: [] ToPrimitive becomes "", then 0, and false becomes 0, so [] == false is true. === never coerces, so [] === false and "0" === 0 are false. "0" == 0 is true because the string is coerced to 0.',
  },
  {
    id: 'mcq-core-06',
    category: 'javascript-core',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `console.log(NaN === NaN);
console.log(Number.isNaN(NaN));
console.log(Number.isNaN("NaN"));`,
    options: [
      'false, true, false',
      'true, true, false',
      'false, true, true',
      'false, false, false',
    ],
    correctAnswer: 0,
    explanation:
      'NaN is not equal to itself under ===. Number.isNaN(NaN) is true and does not coerce, so Number.isNaN("NaN") is false.',
  },
  {
    id: 'mcq-core-07',
    category: 'javascript-core',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `function f(a = 1, b = a + 1) {
  return [a, b];
}
console.log(f());
console.log(f(5));
console.log(f(undefined, 10));`,
    options: [
      '[1, 2], [5, 6], [1, 10]',
      '[1, 2], [5, 6], [undefined, 10]',
      '[1, 2], [5, 6], [undefined, 11]',
      'It throws a ReferenceError',
    ],
    correctAnswer: 0,
    explanation:
      'Missing arguments and explicit undefined both trigger defaults. f() uses a=1, b=2. f(5) uses a=5, b=6. f(undefined, 10) defaults a to 1 and uses the provided b=10.',
  },
  {
    id: 'mcq-core-08',
    category: 'javascript-core',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `const { a = 1, b = 2 } = { a: undefined, b: null };
console.log(a, b);`,
    options: ['1 null', 'undefined null', '1 2', '1 undefined'],
    correctAnswer: 0,
    explanation:
      'Destructuring defaults apply only when the value is undefined. a is undefined so it becomes 1. b is null, which is a defined value, so the default is not used.',
  },
  {
    id: 'mcq-core-09',
    category: 'javascript-core',
    difficulty: 'medium',
    question: 'What is logged?',
    code: `console.log(0 || "A");
console.log(0 ?? "A");
console.log("" || "B");
console.log("" ?? "B");`,
    options: [
      '"A", 0, "B", ""',
      '"A", "A", "B", "B"',
      '0, 0, "", ""',
      '"A", 0, "B", "B"',
    ],
    correctAnswer: 0,
    explanation:
      '|| substitutes for any falsy value, so 0 and "" become "A" and "B". ?? substitutes only for null or undefined, so 0 and "" are kept.',
  },
  {
    id: 'mcq-core-10',
    category: 'javascript-core',
    difficulty: 'hard',
    question: 'What happens when test() is called?',
    code: `function test(x = y, y = 2) {
  return [x, y];
}
test();`,
    options: [
      'It returns [2, 2]',
      'It returns [undefined, 2]',
      'It throws a ReferenceError',
      'It returns [undefined, undefined]',
    ],
    correctAnswer: 2,
    explanation:
      'Parameters are in a temporal dead zone until initialized. Evaluating the default x = y reads y before y is initialized, which throws ReferenceError.',
  },
  {
    id: 'mcq-core-11',
    category: 'javascript-core',
    difficulty: 'hard',
    question: 'In strict mode, what happens?',
    code: `const obj = Object.freeze({ a: 1, nested: { b: 2 } });
obj.a = 10;
obj.nested.b = 20;
console.log(obj.a, obj.nested.b);`,
    options: [
      'It logs 1 20',
      'It logs 10 20',
      'It logs 1 2',
      'It throws a TypeError',
    ],
    correctAnswer: 3,
    explanation:
      'Object.freeze is shallow. Assigning to a frozen own property in strict mode throws TypeError, so obj.a = 10 fails before nested.b is changed.',
  },
  {
    id: 'mcq-core-12',
    category: 'javascript-core',
    difficulty: 'hard',
    question: 'What is logged?',
    code: `const user = { profile: { age: 0 } };
console.log(user.profile?.age ?? 18);
console.log(user.profile?.name ?? "anon");
console.log(user.settings?.theme ?? "light");`,
    options: [
      '0, "anon", "light"',
      '18, "anon", "light"',
      '0, undefined, "light"',
      '18, "anon", undefined',
    ],
    correctAnswer: 0,
    explanation:
      '0 is not nullish, so age ?? 18 yields 0. Missing name is undefined, so the fallback "anon" is used. Missing settings makes optional chaining yield undefined, then "light".',
  },
]
