export type Difficulty = 'easy' | 'medium' | 'hard'

export type QuestionCategory =
  | 'javascript-core'
  | 'scope-closure'
  | 'oop-prototype'
  | 'async'
  | 'engine-memory'
  | 'modules-bundlers'
  | 'dsa'

export interface StudentMCQQuestion {
  id: string
  category: QuestionCategory
  difficulty: Difficulty
  question: string
  code?: string
  options: string[]
}

export interface MCQQuestion extends StudentMCQQuestion {
  correctAnswer: number
  explanation: string
}

export interface ExplainRubricItem {
  point: string
  marks: number
}

export interface StudentExplainQuestion {
  id: string
  category: QuestionCategory
  difficulty: Difficulty
  question: string
  code?: string
}

export interface ExplainQuestion extends StudentExplainQuestion {
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

export interface StudentProblemQuestion {
  id: string
  category: QuestionCategory
  difficulty: Difficulty
  title: string
  description: string
  functionSignature?: string
  examples: ProblemExample[]
  constraints: string[]
  edgeCases: string[]
}

export interface ProblemQuestion extends StudentProblemQuestion {
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
  accessToken?: string
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

export type SubmissionStatus = 'not_started' | 'in_progress' | 'submitted' | 'graded'
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export interface SubmissionAnswers {
  mcq: Record<string, number>
  explain: Record<string, string>
  problem: Record<string, string>
}

export interface ExplainGrade {
  marks: number
  comment: string
}

export interface ProblemGrade {
  marks: number
  comment: string
}

export interface LocalSubmissionState {
  examId: string
  status: SubmissionStatus
  startedAt?: string
  submittedAt?: string
  timedOut?: boolean
}

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  submitted: 'Submitted',
  graded: 'Graded',
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
