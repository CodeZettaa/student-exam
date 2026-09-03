import { generateExam } from './examGenerator'
import { getExamById, saveExam } from './examStorage'
import type { GeneratedExam } from '../types/exam'

export function resolveSharedExam(
  examId: string,
  studentName: string | null,
  versionParam: string | null,
): GeneratedExam | undefined {
  const stored = getExamById(examId)
  if (stored) return stored

  const name = studentName?.trim()
  const version = Number(versionParam)
  if (!name || !Number.isInteger(version) || version < 1) return undefined

  const generated = generateExam(name, version)
  if (generated.examId !== examId) return undefined
  saveExam(generated)
  return generated
}
