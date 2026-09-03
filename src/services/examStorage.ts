import { PREDEFINED_STUDENTS } from '../data/students'
import type {
  ExamAnswers,
  ExamTimerState,
  GeneratedExam,
  LocalSubmissionState,
  SubmissionStatus,
} from '../types/exam'

const STORAGE_KEY = 'js-diploma-exam-generator:v1'

interface ExamStore {
  examsByStudent: Record<string, GeneratedExam>
  extraStudents: string[]
  answersByExamId: Record<string, ExamAnswers>
  timersByExamId: Record<string, ExamTimerState>
  submissionsByExamId: Record<string, LocalSubmissionState>
}

const emptyStore = (): ExamStore => ({
  examsByStudent: {},
  extraStudents: [],
  answersByExamId: {},
  timersByExamId: {},
  submissionsByExamId: {},
})

function readStore(): ExamStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyStore()
    const parsed = JSON.parse(raw) as Partial<ExamStore>
    return {
      examsByStudent: parsed.examsByStudent ?? {},
      extraStudents: parsed.extraStudents ?? [],
      answersByExamId: parsed.answersByExamId ?? {},
      timersByExamId: parsed.timersByExamId ?? {},
      submissionsByExamId: parsed.submissionsByExamId ?? {},
    }
  } catch {
    return emptyStore()
  }
}

function writeStore(store: ExamStore): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function studentKey(name: string): string {
  return name.trim()
}

export function listStudents(): string[] {
  const store = readStore()
  const extras = store.extraStudents.filter(
    (name) => !PREDEFINED_STUDENTS.includes(name) && name.trim().length > 0,
  )
  return [...PREDEFINED_STUDENTS, ...extras]
}

export function getExamForStudent(name: string): GeneratedExam | undefined {
  return readStore().examsByStudent[studentKey(name)]
}

export function getExamById(examId: string): GeneratedExam | undefined {
  const store = readStore()
  return Object.values(store.examsByStudent).find((exam) => exam.examId === examId)
}

export function getExamByToken(token: string): GeneratedExam | undefined {
  if (!token) return undefined
  return Object.values(readStore().examsByStudent).find((exam) => exam.accessToken === token)
}

export function saveExam(exam: GeneratedExam): void {
  const store = readStore()
  const key = studentKey(exam.studentName)
  store.examsByStudent[key] = exam
  if (!PREDEFINED_STUDENTS.includes(exam.studentName) && !store.extraStudents.includes(exam.studentName)) {
    store.extraStudents.push(exam.studentName)
  }
  writeStore(store)
}

export function replaceExam(previousExamId: string, next: GeneratedExam): void {
  const store = readStore()
  const key = studentKey(next.studentName)
  delete store.answersByExamId[previousExamId]
  delete store.timersByExamId[previousExamId]
  delete store.submissionsByExamId[previousExamId]
  store.examsByStudent[key] = next
  if (!PREDEFINED_STUDENTS.includes(next.studentName) && !store.extraStudents.includes(next.studentName)) {
    store.extraStudents.push(next.studentName)
  }
  writeStore(store)
}

export function getAnswers(examId: string): ExamAnswers {
  return (
    readStore().answersByExamId[examId] ?? {
      examId,
      mcq: {},
      explain: {},
      problem: '',
      date: '',
      updatedAt: new Date().toISOString(),
    }
  )
}

export function saveAnswers(answers: ExamAnswers): void {
  const store = readStore()
  store.answersByExamId[answers.examId] = {
    ...answers,
    updatedAt: new Date().toISOString(),
  }
  writeStore(store)
}

export function getTimer(examId: string): ExamTimerState | undefined {
  return readStore().timersByExamId[examId]
}

export function startTimer(examId: string, startedAt = Date.now()): ExamTimerState {
  const store = readStore()
  const existing = store.timersByExamId[examId]
  if (existing) return existing
  const timer = { examId, startedAt }
  store.timersByExamId[examId] = timer
  writeStore(store)
  return timer
}

export function getLocalSubmission(examId: string): LocalSubmissionState | undefined {
  return readStore().submissionsByExamId[examId]
}

export function saveLocalSubmission(next: LocalSubmissionState): void {
  const store = readStore()
  store.submissionsByExamId[next.examId] = next
  writeStore(store)
}

export function markLocalStarted(examId: string, startedAt?: string): LocalSubmissionState {
  const current = getLocalSubmission(examId)
  if (current && (current.status === 'submitted' || current.status === 'graded')) return current
  const next: LocalSubmissionState = {
    examId,
    status: 'in_progress',
    startedAt: current?.startedAt ?? startedAt ?? new Date().toISOString(),
  }
  saveLocalSubmission(next)
  return next
}

export function markLocalSubmitted(
  examId: string,
  timedOut = false,
  submittedAt = new Date().toISOString(),
): LocalSubmissionState {
  const current = getLocalSubmission(examId)
  if (current && (current.status === 'submitted' || current.status === 'graded')) return current
  const next: LocalSubmissionState = {
    examId,
    status: 'submitted',
    startedAt: current?.startedAt,
    submittedAt: current?.submittedAt ?? submittedAt,
    timedOut: current?.timedOut || timedOut,
  }
  saveLocalSubmission(next)
  return next
}

export function isLocallySubmitted(examId: string): boolean {
  const status = getLocalSubmission(examId)?.status
  return status === 'submitted' || status === 'graded'
}

export function mergeRemoteSubmissionStatus(
  examId: string,
  status: SubmissionStatus,
  startedAt?: string | null,
  submittedAt?: string | null,
  timedOut?: boolean,
): void {
  saveLocalSubmission({
    examId,
    status,
    startedAt: startedAt ?? undefined,
    submittedAt: submittedAt ?? undefined,
    timedOut,
  })
}
