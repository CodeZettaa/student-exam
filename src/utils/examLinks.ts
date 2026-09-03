import type { GeneratedExam } from '../types/exam'

export function examSharePath(exam: GeneratedExam, extra: Record<string, string> = {}): string {
  const params = new URLSearchParams()
  if (exam.accessToken && extra.preview !== '1') {
    params.set('token', exam.accessToken)
  }
  for (const [key, value] of Object.entries(extra)) {
    if (value) params.set(key, value)
  }
  const query = params.toString()
  return query ? `/exam/${exam.examId}?${query}` : `/exam/${exam.examId}`
}

export function examShareUrl(exam: GeneratedExam): string {
  if (exam.accessToken) {
    return `${window.location.origin}/exam/${exam.examId}?token=${exam.accessToken}`
  }
  return `${window.location.origin}${examSharePath(exam)}`
}

export function answerKeyPath(exam: GeneratedExam): string {
  const params = new URLSearchParams({
    n: exam.studentName,
    v: String(exam.version),
  })
  return `/admin/answer-key/${exam.examId}?${params.toString()}`
}

export function submissionPath(submissionId: string): string {
  return `/admin/submissions/${submissionId}`
}
