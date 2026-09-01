import { PREDEFINED_STUDENTS } from '../data/students'
import type { ExamAnswers, ExamTimerState, GeneratedExam } from '../types/exam'

const STORAGE_KEY = 'js-diploma-exam-generator:v1'

interface ExamStore {
  examsByStudent: Record<string, GeneratedExam>
  extraStudents: string[]
  answersByExamId: Record<string, ExamAnswers>
  timersByExamId: Record<string, ExamTimerState>
}

const emptyStore = (): ExamStore => ({
  examsByStudent: {},
  extraStudents: [],
  answersByExamId: {},
  timersByExamId: {},
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

export function startTimer(examId: string): ExamTimerState {
  const store = readStore()
  const existing = store.timersByExamId[examId]
  if (existing) return existing
  const timer = { examId, startedAt: Date.now() }
  store.timersByExamId[examId] = timer
  writeStore(store)
  return timer
}
