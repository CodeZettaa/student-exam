import { studentExplainQuestions } from '../data/student/explainQuestions'
import { studentMcqQuestions } from '../data/student/mcqQuestions'
import { studentProblemQuestions } from '../data/student/problemQuestions'
import type {
  GeneratedExam,
  StudentExplainQuestion,
  StudentMCQQuestion,
  StudentProblemQuestion,
} from '../types/exam'
import { EXPLAIN_COUNT, MCQ_COUNT, PROBLEM_COUNT } from '../types/exam'

export interface StudentMaterializedMcq {
  question: StudentMCQQuestion
  options: string[]
  optionOrder: number[]
}

export interface StudentMaterializedExam {
  meta: GeneratedExam
  mcq: StudentMaterializedMcq[]
  explain: StudentExplainQuestion[]
  problem: StudentProblemQuestion
}

function indexById<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.id, item]))
}

const mcqById = indexById(studentMcqQuestions)
const explainById = indexById(studentExplainQuestions)
const problemById = indexById(studentProblemQuestions)

export function materializeStudentExam(exam: GeneratedExam): StudentMaterializedExam {
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
