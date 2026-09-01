import { explainQuestions } from '../data/explainQuestions'
import { mcqQuestions } from '../data/mcqQuestions'
import { problemQuestions } from '../data/problemQuestions'
import { PREDEFINED_STUDENTS } from '../data/students'
import { generateExam, getExamMarksBreakdown, materializeExam } from '../services/examGenerator'

function uniqueIds(ids: string[], label: string): string[] {
  const seen = new Set<string>()
  const duplicates: string[] = []
  for (const id of ids) {
    if (seen.has(id)) duplicates.push(id)
    seen.add(id)
  }
  if (duplicates.length) {
    throw new Error(`${label} duplicate ids: ${duplicates.join(', ')}`)
  }
  return ids
}

export function validateQuestionBank(): string[] {
  const logs: string[] = []
  uniqueIds(mcqQuestions.map((q) => q.id), 'MCQ')
  uniqueIds(explainQuestions.map((q) => q.id), 'Explain')
  uniqueIds(problemQuestions.map((q) => q.id), 'Problem')
  uniqueIds(
    mcqQuestions.map((q) => `${q.question}\n${q.code ?? ''}`),
    'MCQ text',
  )
  uniqueIds(
    explainQuestions.map((q) => `${q.question}\n${q.code ?? ''}`),
    'Explain text',
  )
  uniqueIds(
    problemQuestions.map((q) => q.title),
    'Problem titles',
  )

  if (mcqQuestions.length < 80) throw new Error(`Need at least 80 MCQs, found ${mcqQuestions.length}`)
  if (explainQuestions.length < 30) throw new Error(`Need at least 30 explain questions, found ${explainQuestions.length}`)
  if (problemQuestions.length < 25) throw new Error(`Need at least 25 problems, found ${problemQuestions.length}`)

  for (const question of mcqQuestions) {
    if (question.options.length < 4) throw new Error(`${question.id} needs 4 options`)
    if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
      throw new Error(`${question.id} has an invalid correctAnswer`)
    }
  }

  for (const question of explainQuestions) {
    const total = question.rubric.reduce((sum, item) => sum + item.marks, 0)
    if (total !== 10) throw new Error(`${question.id} rubric totals ${total}, expected 10`)
  }

  for (const question of problemQuestions) {
    const total = question.rubric.reduce((sum, item) => sum + item.marks, 0)
    if (total !== 30) throw new Error(`${question.id} rubric totals ${total}, expected 30`)
  }

  const marks = getExamMarksBreakdown()
  if (marks.total !== 100) throw new Error(`Marks total ${marks.total}`)

  logs.push(`MCQ bank: ${mcqQuestions.length}`)
  logs.push(`Explain bank: ${explainQuestions.length}`)
  logs.push(`Problem bank: ${problemQuestions.length}`)
  logs.push(`Marks: ${marks.mcq} + ${marks.explain} + ${marks.problem} = ${marks.total}`)
  return logs
}

export function validateGeneratedClass(): string[] {
  const logs = validateQuestionBank()
  const signatures = new Set<string>()
  const examIds = new Set<string>()
  const overlaps: number[] = []

  const exams = PREDEFINED_STUDENTS.map((name) => generateExam(name, 1))
  const materialized = exams.map(materializeExam)

  for (const exam of materialized) {
    if (exam.mcq.length !== 15) throw new Error(`${exam.meta.studentName} MCQ count ${exam.mcq.length}`)
    if (exam.explain.length !== 4) throw new Error(`${exam.meta.studentName} explain count ${exam.explain.length}`)
    if (!exam.problem) throw new Error(`${exam.meta.studentName} missing problem`)

    const easy = exam.mcq.filter((item) => item.question.difficulty === 'easy').length
    const medium = exam.mcq.filter((item) => item.question.difficulty === 'medium').length
    const hard = exam.mcq.filter((item) => item.question.difficulty === 'hard').length
    if (easy !== 5 || medium !== 7 || hard !== 3) {
      throw new Error(`${exam.meta.studentName} MCQ difficulty ${easy}/${medium}/${hard}`)
    }

    const explainHard = exam.explain.filter((item) => item.difficulty === 'hard').length
    const explainMedium = exam.explain.filter((item) => item.difficulty === 'medium').length
    const explainEasy = exam.explain.filter((item) => item.difficulty === 'easy').length
    if (explainHard !== 1 || explainEasy + explainMedium !== 3 || explainMedium < 2) {
      throw new Error(
        `${exam.meta.studentName} explain difficulty easy=${explainEasy} medium=${explainMedium} hard=${explainHard}`,
      )
    }

    const categories = new Set(exam.mcq.map((item) => item.question.category))
    if (categories.size < 5) {
      throw new Error(`${exam.meta.studentName} only ${categories.size} MCQ categories`)
    }

    const signature = [...exam.mcq.map((item) => item.question.id), ...exam.explain.map((item) => item.id), exam.problem.id].join('|')
    signatures.add(signature)
    examIds.add(exam.meta.examId)

    const again = generateExam(exam.meta.studentName, 1)
    if (again.mcq.map((item) => item.id).join() !== exam.meta.mcq.map((item) => item.id).join()) {
      throw new Error(`${exam.meta.studentName} is not deterministic`)
    }
    const regenerated = generateExam(exam.meta.studentName, 2)
    if (regenerated.mcq.map((item) => item.id).join() === exam.meta.mcq.map((item) => item.id).join()) {
      throw new Error(`${exam.meta.studentName} regenerate produced the same MCQ set`)
    }
  }

  if (signatures.size !== PREDEFINED_STUDENTS.length) {
    throw new Error('Two students received identical question sets')
  }
  if (examIds.size !== PREDEFINED_STUDENTS.length) {
    throw new Error('Exam ID collision in the class list')
  }

  for (let i = 0; i < materialized.length; i += 1) {
    const a = new Set(materialized[i]!.mcq.map((item) => item.question.id))
    for (let j = i + 1; j < materialized.length; j += 1) {
      const b = materialized[j]!.mcq.map((item) => item.question.id)
      const shared = b.filter((id) => a.has(id)).length
      overlaps.push(shared / 15)
    }
  }

  const avgOverlap = overlaps.reduce((sum, n) => sum + n, 0) / overlaps.length
  logs.push(`20 student exams generated with unique question sets`)
  logs.push(`Average MCQ overlap between students: ${(avgOverlap * 100).toFixed(1)}%`)
  logs.push(`Unique exam IDs: ${examIds.size}`)
  return logs
}
