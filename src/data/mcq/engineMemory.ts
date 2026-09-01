import type { MCQQuestion } from '../../types/exam'

export const mcqEngineMemory: MCQQuestion[] = [
  {
    id: 'mcq-engine-01',
    category: 'engine-memory',
    difficulty: 'easy',
    question: 'Which sequence best describes how a JavaScript engine runs source code?',
    options: [
      'JIT → parse → garbage collect → AST',
      'Parse to AST → bytecode/interpreter → JIT-compile hot code',
      'Compile to machine code first, then parse',
      'Send source to the GPU, then interpret it',
    ],
    correctAnswer: 1,
    explanation:
      'Engines parse source into an AST, typically generate bytecode for an interpreter, then JIT-compile hot functions to optimized machine code.',
  },
  {
    id: 'mcq-engine-02',
    category: 'engine-memory',
    difficulty: 'easy',
    question: 'What is an AST in a JavaScript engine?',
    options: [
      'A list of running timers',
      'A tree representation of program structure produced by the parser',
      'The call stack snapshot used by garbage collection',
      'A binary executable stored in localStorage',
    ],
    correctAnswer: 1,
    explanation:
      'The parser turns source text into an Abstract Syntax Tree: a structured tree of nodes such as functions, expressions, and statements.',
  },
  {
    id: 'mcq-engine-03',
    category: 'engine-memory',
    difficulty: 'easy',
    question: 'When can a JavaScript value typically be garbage collected?',
    options: [
      'As soon as a function that created it returns, always',
      'When it is no longer reachable from roots such as the stack, globals, or closures',
      'Only when the programmer calls delete',
      'Never; JS does not reclaim memory',
    ],
    correctAnswer: 1,
    explanation:
      'Modern engines use reachability. If nothing can access an object through the graph of references, it is eligible for garbage collection. Closures can keep values alive.',
  },
  {
    id: 'mcq-engine-04',
    category: 'engine-memory',
    difficulty: 'medium',
    question: 'Which code is most likely to keep a large object in memory longer than intended?',
    code: `let cache = { data: new Array(1e6).fill("x") };
function keep() {
  return function () {
    console.log(cache.data.length);
  };
}
const leak = keep();`,
    options: [
      'None; returning from keep() always frees cache',
      'The closure leak still reads cache, so the large array stays reachable',
      'fill("x") is automatically interned and freed',
      'Arrays of strings are stored on the stack and disappear immediately',
    ],
    correctAnswer: 1,
    explanation:
      'leak closes over cache. As long as leak exists, cache.data remains reachable and cannot be collected.',
  },
  {
    id: 'mcq-engine-05',
    category: 'engine-memory',
    difficulty: 'medium',
    question: 'What does JIT compilation do in engines such as V8?',
    options: [
      'It always compiles every file to native code before any line runs',
      'It watches for hot functions and compiles them to faster machine code, sometimes deoptimizing later',
      'It replaces garbage collection',
      'It only minifies source text',
    ],
    correctAnswer: 1,
    explanation:
      'JIT compilers optimize functions that run often. If assumptions fail (for example, a variable changes type), the engine can deoptimize back to slower code.',
  },
  {
    id: 'mcq-engine-06',
    category: 'engine-memory',
    difficulty: 'medium',
    question: 'Why can hidden classes / shapes make property access faster?',
    code: `function Point(x, y) {
  this.x = x;
  this.y = y;
}
const a = new Point(1, 2);
const b = new Point(3, 4);`,
    options: [
      'Because objects with the same property layout can share optimized access paths',
      'Because all objects are converted to arrays',
      'Because Point is frozen automatically',
      'Because x and y become private fields',
    ],
    correctAnswer: 0,
    explanation:
      'When objects are constructed with the same properties in the same order, engines can assign them the same hidden class and optimize property loads.',
  },
  {
    id: 'mcq-engine-07',
    category: 'engine-memory',
    difficulty: 'medium',
    question: 'Which statement about memory management is correct?',
    options: [
      'Circular references can never be collected in modern JavaScript engines',
      'Mark-and-sweep style collectors can reclaim cycles if the cycle is not reachable from roots',
      'Only primitive values are garbage collected',
      'Setting a variable to null always immediately returns memory to the OS',
    ],
    correctAnswer: 1,
    explanation:
      'Reachability-based collectors can collect cycles. If A and B only reference each other and nothing else can reach them, both can be freed. Releasing a JS reference does not guarantee an immediate OS-level free.',
  },
  {
    id: 'mcq-engine-08',
    category: 'engine-memory',
    difficulty: 'medium',
    question: 'What is bytecode in this pipeline?',
    options: [
      'The original .js file saved in UTF-16',
      'An intermediate instruction format the interpreter can execute before JIT kicks in',
      'CSS parsed by the JS engine',
      'A guaranteed portable binary format identical on every engine',
    ],
    correctAnswer: 1,
    explanation:
      'After parsing, engines often generate bytecode for a fast interpreter. Hot code may later be JIT-compiled. Bytecode formats are engine-specific.',
  },
  {
    id: 'mcq-engine-09',
    category: 'engine-memory',
    difficulty: 'hard',
    question: 'In V8-style engines, which object pattern is more likely to stay optimized?',
    code: `function makeA() {
  return { a: 1, b: 2 };
}
function makeB() {
  const o = {};
  o.b = 2;
  o.a = 1;
  return o;
}`,
    options: [
      'makeA and makeB always produce identical hidden classes',
      'makeA’s consistent property creation order is more optimizer-friendly than adding properties in a different order',
      'makeB is always faster because it starts empty',
      'Property order never matters to the engine',
    ],
    correctAnswer: 1,
    explanation:
      'Hidden classes depend on the order properties are added. { a, b } and adding b then a can produce different shapes, which can reduce optimization.',
  },
  {
    id: 'mcq-engine-10',
    category: 'engine-memory',
    difficulty: 'hard',
    question: 'A function closes over a huge unused array. Which change best allows that array to be collected?',
    code: `function build() {
  const huge = new Array(1e6).fill(0);
  const small = 42;
  return function () {
    return small;
  };
}`,
    options: [
      'Nothing; huge is always kept because it is in the same scope',
      'Returning a function that only uses small lets engines (and developers) keep only what is referenced; do not capture huge',
      'Calling delete huge inside the inner function',
      'Converting huge to a string',
    ],
    correctAnswer: 1,
    explanation:
      'Closures retain referenced bindings. If the inner function never uses huge, optimized engines may not keep it; the robust approach is not to close over large unused data.',
  },
]
