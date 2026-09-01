import { explainQuestions } from '../data/explainQuestions'
import { mcqQuestions } from '../data/mcqQuestions'
import { problemQuestions } from '../data/problemQuestions'
import type {
  Difficulty,
  ExplainQuestion,
  GeneratedExam,
  MCQQuestion,
  ProblemQuestion,
  QuestionCategory,
} from '../types/exam'
import { MCQ_COUNT, EXPLAIN_COUNT, PROBLEM_COUNT } from '../types/exam'
import { createSeededRng, makeExamId, range, shuffledCopy, type Rng } from '../utils/rng'

const MCQ_DIFFICULTY_PLAN: Record<Difficulty, number> = {
  easy: 5,
  medium: 7,
  hard: 3,
}

const EXPLAIN_HARD_COUNT = 1
const EXPLAIN_MEDIUM_COUNT = 2
const EXPLAIN_EASY_OR_MEDIUM_COUNT = 1

const MAX_MCQ_PER_CATEGORY = 3
const MAX_EXPLAIN_PER_CATEGORY = 1

export interface MaterializedMcq {
  question: MCQQuestion
  options: string[]
  optionOrder: number[]
}

export interface MaterializedExam {
  meta: GeneratedExam
  mcq: MaterializedMcq[]
  explain: ExplainQuestion[]
  problem: ProblemQuestion
}

function indexById<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]))
}

const mcqById = indexById(mcqQuestions)
const explainById = indexById(explainQuestions)
const problemById = indexById(problemQuestions)

function pickWithCategoryCap<T extends { id: string; category: QuestionCategory }>(
  candidates: T[],
  count: number,
  rng: Rng,
  usedIds: Set<string>,
  categoryCounts: Map<QuestionCategory, number>,
  maxPerCategory: number,
): T[] {
  const shuffled = shuffledCopy(
    candidates.filter((item) => !usedIds.has(item.id)),
    rng,
  )
  const picked: T[] = []

  const take = (maxCategory: number) => {
    for (const item of shuffled) {
      if (picked.length >= count) break
      if (usedIds.has(item.id)) continue
      const current = categoryCounts.get(item.category) ?? 0
      if (current >= maxCategory) continue
      picked.push(item)
      usedIds.add(item.id)
      categoryCounts.set(item.category, current + 1)
    }
  }

  take(maxPerCategory)
  if (picked.length < count) take(Number.POSITIVE_INFINITY)
  return picked
}

function pickMcq(rng: Rng): MCQQuestion[] {
  const usedIds = new Set<string>()
  const categoryCounts = new Map<QuestionCategory, number>()
  const selected: MCQQuestion[] = []

  for (const difficulty of ['easy', 'medium', 'hard'] as const) {
    const needed = MCQ_DIFFICULTY_PLAN[difficulty]
    const pool = mcqQuestions.filter((question) => question.difficulty === difficulty)
    selected.push(
      ...pickWithCategoryCap(pool, needed, rng, usedIds, categoryCounts, MAX_MCQ_PER_CATEGORY),
    )
  }

  if (selected.length !== MCQ_COUNT) {
    throw new Error(`MCQ selection produced ${selected.length} questions, expected ${MCQ_COUNT}`)
  }

  return shuffledCopy(selected, rng)
}

function pickExplain(rng: Rng): ExplainQuestion[] {
  const usedIds = new Set<string>()
  const categoryCounts = new Map<QuestionCategory, number>()
  const easy = explainQuestions.filter((question) => question.difficulty === 'easy')
  const medium = explainQuestions.filter((question) => question.difficulty === 'medium')
  const hard = explainQuestions.filter((question) => question.difficulty === 'hard')

  const firstSlot = pickWithCategoryCap(
    easy,
    EXPLAIN_EASY_OR_MEDIUM_COUNT,
    rng,
    usedIds,
    categoryCounts,
    MAX_EXPLAIN_PER_CATEGORY,
  )

  if (firstSlot.length < EXPLAIN_EASY_OR_MEDIUM_COUNT) {
    firstSlot.push(
      ...pickWithCategoryCap(
        medium,
        EXPLAIN_EASY_OR_MEDIUM_COUNT - firstSlot.length,
        rng,
        usedIds,
        categoryCounts,
        MAX_EXPLAIN_PER_CATEGORY,
      ),
    )
  }

  const mediumPicks = pickWithCategoryCap(
    medium,
    EXPLAIN_MEDIUM_COUNT,
    rng,
    usedIds,
    categoryCounts,
    MAX_EXPLAIN_PER_CATEGORY,
  )
  const hardPicks = pickWithCategoryCap(
    hard,
    EXPLAIN_HARD_COUNT,
    rng,
    usedIds,
    categoryCounts,
    MAX_EXPLAIN_PER_CATEGORY,
  )

  const selected = [...firstSlot, ...mediumPicks, ...hardPicks]
  if (selected.length !== EXPLAIN_COUNT) {
    throw new Error(`Explain selection produced ${selected.length} questions, expected ${EXPLAIN_COUNT}`)
  }

  return shuffledCopy(selected, rng)
}

function pickProblem(rng: Rng): ProblemQuestion {
  const medium = problemQuestions.filter((question) => question.difficulty === 'medium')
  const pool = medium.length > 0 ? medium : problemQuestions
  const chosen = shuffledCopy(pool, rng)[0]
  if (!chosen) throw new Error('Problem bank is empty')
  return chosen
}

function shuffleOptions(question: MCQQuestion, rng: Rng): number[] {
  return shuffledCopy(range(question.options.length), rng)
}

export function generateExam(studentName: string, version: number): GeneratedExam {
  const name = studentName.trim()
  const seed = `${name.toLowerCase()}::v${version}`
  const rng = createSeededRng(seed)
  const mcq = pickMcq(rng)
  const explain = pickExplain(rng)
  const problem = pickProblem(rng)

  return {
    examId: makeExamId(name, version),
    studentName: name,
    version,
    generatedAt: new Date().toISOString(),
    seed,
    mcq: mcq.map((question) => ({
      id: question.id,
      optionOrder: shuffleOptions(question, rng),
    })),
    explainIds: explain.map((question) => question.id),
    problemId: problem.id,
  }
}

export function materializeExam(exam: GeneratedExam): MaterializedExam {
  const mcq = exam.mcq.map((item) => {
    const question = mcqById.get(item.id)
    if (!question) throw new Error(`Missing MCQ ${item.id}`)
    return {
      question,
      optionOrder: item.optionOrder,
      options: item.optionOrder.map((index) => question.options[index] ?? ''),
    }
  })

  const explain = exam.explainIds.map((id) => {
    const question = explainById.get(id)
    if (!question) throw new Error(`Missing explain question ${id}`)
    return question
  })

  const problem = problemById.get(exam.problemId)
  if (!problem) throw new Error(`Missing problem ${exam.problemId}`)

  if (mcq.length !== MCQ_COUNT || explain.length !== EXPLAIN_COUNT || PROBLEM_COUNT !== 1) {
    throw new Error('Materialized exam does not match required structure')
  }

  return { meta: exam, mcq, explain, problem }
}

export function getExamMarksBreakdown() {
  return {
    mcq: MCQ_COUNT * 2,
    explain: EXPLAIN_COUNT * 10,
    problem: 30,
    total: MCQ_COUNT * 2 + EXPLAIN_COUNT * 10 + 30,
  }
}
