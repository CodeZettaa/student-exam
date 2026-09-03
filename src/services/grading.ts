import type { MaterializedExam } from './examGenerator'
import type { ExplainGrade, SubmissionAnswers } from '../types/exam'
import { EXPLAIN_MARKS_EACH, MCQ_MARKS_EACH, PROBLEM_MARKS } from '../types/exam'
import { optionLetter } from '../utils/format'

export interface McqGradeDetail {
  questionId: string
  selectedOriginalIndex: number | undefined
  correctOriginalIndex: number
  selectedDisplayIndex: number
  correctDisplayIndex: number
  selectedText: string
  correctText: string
  isCorrect: boolean
  marks: number
}

export interface GradedMcqResult {
  score: number
  max: number
  details: McqGradeDetail[]
}

export function gradeMcqSection(exam: MaterializedExam, answers: SubmissionAnswers): GradedMcqResult {
  const details = exam.mcq.map((item) => {
    const selectedOriginalIndex = answers.mcq[item.question.id]
    const correctOriginalIndex = item.question.correctAnswer
    const selectedDisplayIndex =
      selectedOriginalIndex === undefined ? -1 : item.optionOrder.indexOf(selectedOriginalIndex)
    const correctDisplayIndex = item.optionOrder.indexOf(correctOriginalIndex)
    const isCorrect = selectedOriginalIndex === correctOriginalIndex
    return {
      questionId: item.question.id,
      selectedOriginalIndex,
      correctOriginalIndex,
      selectedDisplayIndex,
      correctDisplayIndex,
      selectedText:
        selectedOriginalIndex === undefined
          ? 'No answer'
          : (item.question.options[selectedOriginalIndex] ?? 'No answer'),
      correctText: item.question.options[correctOriginalIndex] ?? '',
      isCorrect,
      marks: isCorrect ? MCQ_MARKS_EACH : 0,
    }
  })

  return {
    score: details.reduce((sum, item) => sum + item.marks, 0),
    max: exam.mcq.length * MCQ_MARKS_EACH,
    details,
  }
}

export function emptyExplainGrades(exam: MaterializedExam): Record<string, ExplainGrade> {
  return Object.fromEntries(
    exam.explain.map((question) => [question.id, { marks: 0, comment: '' }]),
  )
}

export function clampExplainMarks(value: number): number {
  return Math.min(EXPLAIN_MARKS_EACH, Math.max(0, value))
}

export function clampProblemMarks(value: number): number {
  return Math.min(PROBLEM_MARKS, Math.max(0, value))
}

export function sumExplainMarks(scores: Record<string, ExplainGrade> | null | undefined): number {
  return Object.values(scores ?? {}).reduce((sum, item) => sum + (Number(item.marks) || 0), 0)
}

export function calculateTotalScore(
  mcqScore: number,
  explainScores: Record<string, ExplainGrade>,
  problemScore: number,
): number {
  return mcqScore + sumExplainMarks(explainScores) + problemScore
}

export function displayOptionLabel(displayIndex: number, text: string): string {
  if (displayIndex < 0) return text
  return `${optionLetter(displayIndex)} — ${text}`
}
