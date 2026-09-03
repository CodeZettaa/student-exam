import { AdminLayout } from '../../components/AdminLayout'
import { AdminSummary } from '../../components/AdminSummary'
import { adminListExams, adminListSubmissions, isSupabaseConfigured } from '../../services/examApi'
import { useDashboardStats } from '../../hooks/useDashboardStats'
import type { ExamRow, ExamSubmissionRow } from '../../types/database'
import type { SubmissionStatus } from '../../types/exam'
import { SUBMISSION_STATUS_LABELS } from '../../types/exam'
import { answerKeyPath, examSharePath, submissionPath } from '../../utils/examLinks'
import { formatDateTime } from '../../utils/format'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FILTERS: Array<{ id: 'all' | SubmissionStatus; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'not_started', label: 'Not Started' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'submitted', label: 'Submitted' },
  { id: 'graded', label: 'Graded' },
]

export function SubmissionsPage() {
  const navigate = useNavigate()
  const { stats, loading: statsLoading } = useDashboardStats()
  const [submissions, setSubmissions] = useState<ExamSubmissionRow[]>([])
  const [exams, setExams] = useState<Record<string, ExamRow>>({})
  const [filter, setFilter] = useState<'all' | SubmissionStatus>('all')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        if (!isSupabaseConfigured()) {
          setError('Configure Supabase to load live submissions.')
          setLoading(false)
          return
        }
        const [rows, examRows] = await Promise.all([adminListSubmissions(), adminListExams()])
        if (!active) return
        setSubmissions(rows)
        setExams(Object.fromEntries(examRows.map((row) => [row.exam_id, row])))
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : 'Could not load submissions.')
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [])

  const visible = useMemo(
    () => (filter === 'all' ? submissions : submissions.filter((row) => row.status === filter)),
    [filter, submissions],
  )

  return (
    <AdminLayout>
      <header className="admin-hero">
        <div>
          <p className="exam-kicker">Instructor workspace</p>
          <h1>Submissions</h1>
          <p className="lede">Review student papers, grade written answers, and keep scores out of 100.</p>
        </div>
      </header>

      <AdminSummary stats={stats} loading={statsLoading} />

      <section className="panel">
        <div className="filter-row">
          <h2>Student submissions</h2>
          <label>
            Status
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value as 'all' | SubmissionStatus)}
            >
              {FILTERS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {error ? <p className="notice danger">{error}</p> : null}
        {loading ? <p className="notice">Loading submissions…</p> : null}
        <div className="table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam ID</th>
                <th>Status</th>
                <th>Started</th>
                <th>Submitted</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => {
                const exam = exams[row.exam_id]?.generated_questions
                return (
                  <tr key={row.id} className={row.status === 'submitted' ? 'needs-review' : ''}>
                    <td>
                      <strong>{row.student_name}</strong>
                      {row.timed_out ? <span className="badge muted">Timed out</span> : null}
                    </td>
                    <td>
                      <code>{row.exam_id}</code>
                    </td>
                    <td>
                      <span className={`badge status-${row.status}`}>
                        {SUBMISSION_STATUS_LABELS[row.status]}
                      </span>
                    </td>
                    <td>{formatDateTime(row.started_at)}</td>
                    <td>{formatDateTime(row.submitted_at)}</td>
                    <td>{row.total_score == null ? '—' : `${row.total_score} / 100`}</td>
                    <td className="actions">
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => navigate(submissionPath(row.id))}
                      >
                        View Submission
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(submissionPath(row.id))}
                        disabled={row.status === 'not_started'}
                      >
                        Grade
                      </button>
                      {exam ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => navigate(examSharePath(exam, { preview: '1' }))}
                          >
                            View Exam
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => navigate(answerKeyPath(exam))}
                          >
                            View Answer Key
                          </button>
                        </>
                      ) : null}
                    </td>
                  </tr>
                )
              })}
              {!loading && visible.length === 0 ? (
                <tr>
                  <td colSpan={7}>No submissions match this filter.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  )
}
