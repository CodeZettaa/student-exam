export type Difficulty = 'easy' | 'medium' | 'hard'

export type QuestionCategory =
  | 'javascript-core'
  | 'scope-closure'
  | 'oop-prototype'
  | 'async'
  | 'engine-memory'
  | 'modules-bundlers'
  | 'dsa'

export interface MCQQuestion {
  id: string
  category: QuestionCategory
  difficulty: Difficulty
  question: string
  code?: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface ExplainRubricItem {
  point: string
  marks: number
}

export interface ExplainQuestion {
  id: string
  category: QuestionCategory
  difficulty: Difficulty
  question: string
  code?: string
  expectedPoints: string[]
  rubric: ExplainRubricItem[]
}

export interface ProblemExample {
  input: string
  output: string
  explanation?: string
}

export interface ProblemRubricItem {
  criterion: string
  marks: number
}

export interface ProblemQuestion {
  id: string
  category: QuestionCategory
  difficulty: Difficulty
  title: string
  description: string
  functionSignature?: string
  examples: ProblemExample[]
  constraints: string[]
  edgeCases: string[]
  solution: string
  explanation: string
  timeComplexity: string
  spaceComplexity: string
  approach: string
  rubric: ProblemRubricItem[]
}

export interface GeneratedMcqItem {
  id: string
  optionOrder: number[]
}

export interface GeneratedExam {
  examId: string
  studentName: string
  version: number
  generatedAt: string
  seed: string
  mcq: GeneratedMcqItem[]
  explainIds: string[]
  problemId: string
}

export interface ExamAnswers {
  examId: string
  mcq: Record<string, number>
  explain: Record<string, string>
  problem: string
  date: string
  updatedAt: string
}

export interface ExamTimerState {
  examId: string
  startedAt: number
}

export const EXAM_TITLE = 'Advanced JavaScript Diploma Assessment'
export const EXAM_DURATION_MINUTES = 30
export const EXAM_TOTAL_MARKS = 100
export const MCQ_COUNT = 15
export const MCQ_MARKS_EACH = 2
export const EXPLAIN_COUNT = 4
export const EXPLAIN_MARKS_EACH = 10
export const PROBLEM_COUNT = 1
export const PROBLEM_MARKS = 30

export const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  'javascript-core': 'JavaScript Core',
  'scope-closure': 'Scope / Closure',
  'oop-prototype': 'OOP / Prototype',
  async: 'Async / Event Loop',
  'engine-memory': 'JS Engine / Memory',
  'modules-bundlers': 'Modules / Bundlers',
  dsa: 'DSA / Complexity',
}
