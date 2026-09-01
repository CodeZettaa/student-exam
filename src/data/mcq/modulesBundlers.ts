import type { MCQQuestion } from '../../types/exam'

export const mcqModulesBundlers: MCQQuestion[] = [
  {
    id: 'mcq-mod-01',
    category: 'modules-bundlers',
    difficulty: 'easy',
    question: 'Which statement about ES modules is correct?',
    options: [
      'import/export is evaluated lazily only when a function runs',
      'ES modules are static, always strict, and have their own top-level scope',
      'ES modules share the same this as a classic script’s global object in browsers',
      'export default can be used in CommonJS without a bundler in every browser',
    ],
    correctAnswer: 1,
    explanation:
      'ES modules are statically analyzable, run in strict mode, and do not share var/function bindings with other modules. Top-level this is undefined.',
  },
  {
    id: 'mcq-mod-02',
    category: 'modules-bundlers',
    difficulty: 'easy',
    question: 'What is tree shaking?',
    options: [
      'Deleting node_modules before every build',
      'A bundler removing unused exports when the module graph is statically analyzable',
      'Minifying CSS class names',
      'Shuffling import order for cache busting',
    ],
    correctAnswer: 1,
    explanation:
      'Tree shaking is dead-code elimination on ES module exports. If an export is never imported, a bundler can omit it from the bundle.',
  },
  {
    id: 'mcq-mod-03',
    category: 'modules-bundlers',
    difficulty: 'medium',
    question: 'Why can this module be tree-shaken more easily than a side-effect-heavy file?',
    code: `export function add(a, b) {
  return a + b;
}
export function unused() {
  return 123;
}`,
    options: [
      'Because unused is async',
      'Because the exports are static and unused() has no required side effects',
      'Because add mutates the global object',
      'Because bundlers never keep named exports',
    ],
    correctAnswer: 1,
    explanation:
      'Named ES exports with no top-level side effects can be dropped if nothing imports unused(). Files that mutate globals on import are harder to shake.',
  },
  {
    id: 'mcq-mod-04',
    category: 'modules-bundlers',
    difficulty: 'medium',
    question: 'What is code splitting?',
    options: [
      'Splitting a string with .split()',
      'Producing multiple bundles/chunks so some code loads later, often via dynamic import()',
      'Running unit tests in parallel',
      'Separating HTML from CSS',
    ],
    correctAnswer: 1,
    explanation:
      'Code splitting creates separate chunks. Dynamic import("./heavy.js") loads that module on demand instead of putting everything in one initial bundle.',
  },
  {
    id: 'mcq-mod-05',
    category: 'modules-bundlers',
    difficulty: 'medium',
    question: 'Which import loads the module lazily?',
    code: `import { util } from "./util.js";
const later = () => import("./heavy.js");`,
    options: [
      'Both imports are fully static and eager',
      'util is static/eager; import("./heavy.js") returns a Promise and loads later',
      'import("./heavy.js") is hoisted and runs before util',
      'Dynamic import is illegal in JavaScript',
    ],
    correctAnswer: 1,
    explanation:
      'Static import is resolved at load time. import() is a runtime function returning a Promise, which enables on-demand loading and extra chunks.',
  },
  {
    id: 'mcq-mod-06',
    category: 'modules-bundlers',
    difficulty: 'medium',
    question: 'Which Webpack concept matches this description: a graph of modules bundled into one or more output files?',
    options: [
      'Hot Module Replacement only',
      'The dependency graph and compilation producing bundles/chunks',
      'The event loop',
      'Garbage collection roots',
    ],
    correctAnswer: 1,
    explanation:
      'Webpack starts from entry points, walks imports, and emits bundles. HMR is a separate development feature, not the core bundling model.',
  },
  {
    id: 'mcq-mod-07',
    category: 'modules-bundlers',
    difficulty: 'medium',
    question: 'Which statement about Vite in development is most accurate?',
    options: [
      'Vite always bundles the entire app with Webpack before the first page load',
      'Vite serves native ES modules and prebundles dependencies, using a bundler (Rollup) for production builds',
      'Vite cannot use ES modules',
      'Vite replaces the JavaScript engine',
    ],
    correctAnswer: 1,
    explanation:
      'In dev, Vite uses native ESM and prebundles node_modules (typically with esbuild). Production builds use Rollup for a bundled, optimized output.',
  },
  {
    id: 'mcq-mod-08',
    category: 'modules-bundlers',
    difficulty: 'hard',
    question: 'Which pattern most reliably prevents tree shaking of multiply?',
    code: `export function multiply(a, b) {
  return a * b;
}`,
    options: [
      'import { multiply } from "./math.js" and never calling it',
      'A module that does import "./math.js" for side effects only, while math.js also writes to window on load',
      'Using a named export instead of default',
      'Putting multiply in a different file',
    ],
    correctAnswer: 1,
    explanation:
      'Side-effect imports and top-level mutations make it unsafe for bundlers to drop the module. Unused named imports of a pure module can still be shaken.',
  },
]
