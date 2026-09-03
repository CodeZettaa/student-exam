import type { ExamAnswers, SubmissionAnswers } from '../types/exam'

export function emptySubmissionAnswers(): SubmissionAnswers {
  return { mcq: {}, explain: {}, problem: {} }
}

export function toSubmissionAnswers(local: ExamAnswers, problemId: string): SubmissionAnswers {
  return {
    mcq: { ...local.mcq },
    explain: { ...local.explain },
    problem: local.problem ? { [problemId]: local.problem } : {},
  }
}

export function fromSubmissionAnswers(
  examId: string,
  problemId: string,
  answers: SubmissionAnswers | null | undefined,
): ExamAnswers {
  const problem = answers?.problem?.[problemId] ?? Object.values(answers?.problem ?? {})[0] ?? ''
  return {
    examId,
    mcq: answers?.mcq ?? {},
    explain: answers?.explain ?? {},
    problem,
    date: '',
    updatedAt: new Date().toISOString(),
  }
}
