import type { GeneratedExam } from '../types/exam'

export function examSharePath(exam: GeneratedExam, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams()
  params.set('n', exam.studentName)
  params.set('v', String(exam.version))
  for (const [key, value] of Object.entries(extra)) {
    if (value) params.set(key, value)
  }
  return `/exam/${exam.examId}?${params.toString()}`
}

export function examShareUrl(exam: GeneratedExam): string {
  return `${window.location.origin}${examSharePath(exam)}`
}

export function answerKeyPath(exam: GeneratedExam): string {
  const params = new URLSearchParams({
    n: exam.studentName,
    v: String(exam.version),
  })
  return `/answer-key/${exam.examId}?${params.toString()}`
}
