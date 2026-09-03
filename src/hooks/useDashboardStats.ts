import { adminListSubmissions } from '../services/examApi'
import { getExamForStudent, getLocalSubmission, listStudents } from '../services/examStorage'
import type { ExamSubmissionRow } from '../types/database'
import type { SubmissionStatus } from '../types/exam'
import { isSupabaseConfigured } from '../lib/supabase'
import { useEffect, useMemo, useState } from 'react'

export interface DashboardStats {
  students: number
  started: number
  submitted: number
  graded: number
  pendingReview: number
}

function statusOf(row: { status: SubmissionStatus } | undefined): SubmissionStatus {
  return row?.status ?? 'not_started'
}

export function useDashboardStats(): { stats: DashboardStats; loading: boolean } {
  const [remote, setRemote] = useState<ExamSubmissionRow[] | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured())

  useEffect(() => {
    if (!isSupabaseConfigured()) return
    let active = true
    void adminListSubmissions()
      .then((rows) => {
        if (active) setRemote(rows)
      })
      .catch(() => {
        if (active) setRemote([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const stats = useMemo(() => {
    const students = listStudents()
    const assigned = students.filter((name) => getExamForStudent(name)).length
    const rows =
      remote ??
      students
        .map((name) => {
          const exam = getExamForStudent(name)
          if (!exam) return undefined
          return getLocalSubmission(exam.examId)
        })
        .filter((row): row is NonNullable<typeof row> => Boolean(row))
        .map((row) => ({ status: row.status }))

    const statuses = rows.map((row) => statusOf(row))
    const started = statuses.filter((status) => status !== 'not_started').length
    const submitted = statuses.filter((status) => status === 'submitted' || status === 'graded').length
    const graded = statuses.filter((status) => status === 'graded').length
    const pendingReview = statuses.filter((status) => status === 'submitted').length
    const studentCount = remote ? remote.length || assigned : assigned

    return {
      students: studentCount,
      started,
      submitted,
      graded,
      pendingReview,
    }
  }, [remote])

  return { stats, loading }
}
