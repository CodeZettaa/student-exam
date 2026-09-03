import { CodeBlock } from '../../components/CodeBlock'
import { AdminLayout } from '../../components/AdminLayout'
import {
  adminGetExamByExamId,
  adminGetSubmission,
  adminSaveGrade,
  isSupabaseConfigured,
} from '../../services/examApi'
import { materializeExam } from '../../services/examGenerator'
import {
  calculateTotalScore,
  clampExplainMarks,
  clampProblemMarks,
  displayOptionLabel,
  emptyExplainGrades,
  gradeMcqSection,
} from '../../services/grading'
import type { ExamSubmissionRow } from '../../types/database'
import type { ExplainGrade, GeneratedExam } from '../../types/exam'
import { EXPLAIN_MARKS_EACH, PROBLEM_MARKS, SUBMISSION_STATUS_LABELS } from '../../types/exam'
import { answerKeyPath, examSharePath } from '../../utils/examLinks'
import { formatDateTime } from '../../utils/format'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function SubmissionDetailPage() {
  const { id = '' } = useParams()
  const [submission, setSubmission] = useState<ExamSubmissionRow | null>(null)
  const [exam, setExam] = useState<GeneratedExam | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [explainScores, setExplainScores] = useState<Record<string, ExplainGrade>>({})
  const [problemScore, setProblemScore] = useState(0)
  const [problemComment, setProblemComment] = useState('')
  const [instructorNotes, setInstructorNotes] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        if (!isSupabaseConfigured()) {
          setError('Configure Supabase to view submissions.')
          return
        }
        const row = await adminGetSubmission(id)
        if (!row) {
          setError('Submission not found.')
          return
        }
        const examRow = await adminGetExamByExamId(row.exam_id)
        if (!active) return
        setSubmission(row)
        setExam(examRow?.generated_questions ?? null)
        setExplainScores(row.explain_scores ?? {})
        setProblemScore(row.problem_score ?? 0)
        setProblemComment(row.problem_comment ?? '')
        setInstructorNotes(row.instructor_notes ?? '')
      } catch (loadError) {
        if (active) setError(loadError instanceof Error ? loadError.message : 'Could not load submission.')
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [id])

  const materialized = useMemo(() => (exam ? materializeExam(exam) : null), [exam])
  const mcqResult = useMemo(
    () => (materialized && submission ? gradeMcqSection(materialized, submission.answers) : null),
    [materialized, submission],
  )

  const filledExplain = useMemo(() => {
    if (!materialized) return explainScores
    return { ...emptyExplainGrades(materialized), ...explainScores }
  }, [explainScores, materialized])

  const totalScore = mcqResult ? calculateTotalScore(mcqResult.score, filledExplain, problemScore) : 0

  const handleSave = async () => {
    if (!submission || !mcqResult) return
    setSaving(true)
    setMessage('')
    try {
      await adminSaveGrade(submission.id, {
        mcqScore: mcqResult.score,
        explainScores: filledExplain,
        problemScore,
        problemComment,
        instructorNotes,
        totalScore,
      })
      setSubmission({
        ...submission,
        mcq_score: mcqResult.score,
        explain_scores: filledExplain,
        problem_score: problemScore,
        problem_comment: problemComment,
        instructor_notes: instructorNotes,
        total_score: totalScore,
        status: 'graded',
      })
      setMessage(`Grade saved. Final score ${totalScore} / 100.`)
    } catch (saveError) {
      setMessage(saveError instanceof Error ? saveError.message : 'Could not save grade.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="panel">
          <h1>Loading submission</h1>
        </div>
      </AdminLayout>
    )
  }

  if (error || !submission || !materialized || !mcqResult || !exam) {
    return (
      <AdminLayout>
        <div className="panel">
          <h1>Submission not found</h1>
          <p>{error || 'This submission could not be opened.'}</p>
          <Link to="/admin/submissions">Back to submissions</Link>
        </div>
      </AdminLayout>
    )
  }

  const { meta, mcq, explain, problem } = materialized
  const studentProblem = submission.answers.problem[problem.id] ?? Object.values(submission.answers.problem)[0] ?? ''

  return (
    <AdminLayout>
      <div className="exam-sheet submission-sheet" data-exam-id={meta.examId}>
        <div className="no-print toolbar">
          <Link to="/admin/submissions" className="btn btn-ghost">
            Back to submissions
          </Link>
          <div className="actions">
            <Link to={examSharePath(exam, { preview: '1' })} className="btn btn-ghost">
              View Exam
            </Link>
            <Link to={answerKeyPath(exam)} className="btn btn-ghost">
              View Answer Key
            </Link>
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>
              Print / Save PDF
            </button>
          </div>
        </div>

        <header className="print-masthead">
          <p className="exam-kicker">Student submission</p>
          <h1>{meta.studentName}</h1>
          <dl className="exam-meta">
            <div>
              <dt>Exam ID</dt>
              <dd className="exam-id">{meta.examId}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{SUBMISSION_STATUS_LABELS[submission.status]}</dd>
            </div>
            <div>
              <dt>Started</dt>
              <dd>{formatDateTime(submission.started_at)}</dd>
            </div>
            <div>
              <dt>Submitted</dt>
              <dd>{formatDateTime(submission.submitted_at)}</dd>
            </div>
            <div>
              <dt>Final score</dt>
              <dd>{totalScore} / 100</dd>
            </div>
          </dl>
          {submission.timed_out ? <p className="notice danger">Submitted because time expired.</p> : null}
        </header>

        <section>
          <h2>Section A — Multiple Choice ({mcqResult.score} / {mcqResult.max})</h2>
          <p className="section-meta">Automatically graded. Each question is worth 2 marks.</p>
          {mcq.map((item, index) => {
            const detail = mcqResult.details[index]
            if (!detail) return null
            return (
              <article key={item.question.id} className={`question-card ${detail.isCorrect ? 'mark-correct' : 'mark-wrong'}`}>
                <h3>
                  A{index + 1}. {item.question.question}
                  <span className="marks">{detail.marks} / 2</span>
                </h3>
                {item.question.code ? <CodeBlock code={item.question.code} /> : null}
                <p>
                  <strong>Student answer:</strong>{' '}
                  {displayOptionLabel(detail.selectedDisplayIndex, detail.selectedText)}
                </p>
                <p>
                  <strong>Correct answer:</strong>{' '}
                  {displayOptionLabel(detail.correctDisplayIndex, detail.correctText)}
                </p>
                <p>
                  <strong>Result:</strong> {detail.isCorrect ? 'Correct' : 'Incorrect'}
                </p>
              </article>
            )
          })}
        </section>

        <section>
          <h2>Section B — Explain / Debug / Analyze ({Object.values(filledExplain).reduce((sum, item) => sum + item.marks, 0)} / 40)</h2>
          {explain.map((question, index) => {
            const grade = filledExplain[question.id] ?? { marks: 0, comment: '' }
            return (
              <article key={question.id} className="question-card">
                <h3>
                  B{index + 1}. {question.question}
                  <span className="marks">{grade.marks} / {EXPLAIN_MARKS_EACH}</span>
                </h3>
                {question.code ? <CodeBlock code={question.code} /> : null}
                <h4>Student answer</h4>
                <div className="print-answer">{submission.answers.explain[question.id] || 'No answer'}</div>
                <h4>Expected answer / rubric</h4>
                <ul>
                  {question.expectedPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <ul>
                  {question.rubric.map((item) => (
                    <li key={item.point}>
                      {item.point} — <strong>{item.marks} marks</strong>
                    </li>
                  ))}
                </ul>
                <div className="grade-controls no-print">
                  <label>
                    Marks (0–{EXPLAIN_MARKS_EACH})
                    <input
                      type="number"
                      min={0}
                      max={EXPLAIN_MARKS_EACH}
                      value={grade.marks}
                      onChange={(event) =>
                        setExplainScores((current) => ({
                          ...current,
                          [question.id]: {
                            marks: clampExplainMarks(Number(event.target.value) || 0),
                            comment: current[question.id]?.comment ?? '',
                          },
                        }))
                      }
                    />
                  </label>
                  <label>
                    Instructor comment
                    <textarea
                      rows={3}
                      value={grade.comment}
                      onChange={(event) =>
                        setExplainScores((current) => ({
                          ...current,
                          [question.id]: {
                            marks: current[question.id]?.marks ?? 0,
                            comment: event.target.value,
                          },
                        }))
                      }
                    />
                  </label>
                </div>
                <div className="print-only">
                  <p>
                    <strong>Instructor comment:</strong> {grade.comment || '—'}
                  </p>
                </div>
              </article>
            )
          })}
        </section>

        <section>
          <h2>Section C — Problem Solving ({problemScore} / {PROBLEM_MARKS})</h2>
          <article className="question-card">
            <h3>
              C1. {problem.title}
              <span className="marks">{problemScore} / {PROBLEM_MARKS}</span>
            </h3>
            <p>{problem.description}</p>
            <h4>Student code</h4>
            <CodeBlock code={studentProblem || 'No answer'} />
            <h4>Instructor solution</h4>
            <CodeBlock code={problem.solution} />
            <p>
              <strong>Expected approach:</strong> {problem.approach}
            </p>
            <p>
              <strong>Time complexity:</strong> {problem.timeComplexity}
            </p>
            <p>
              <strong>Space complexity:</strong> {problem.spaceComplexity}
            </p>
            <h4>Rubric</h4>
            <ul>
              {problem.rubric.map((item) => (
                <li key={item.criterion}>
                  {item.criterion} — <strong>{item.marks} marks</strong>
                </li>
              ))}
            </ul>
            <div className="grade-controls no-print">
              <label>
                Score (0–{PROBLEM_MARKS})
                <input
                  type="number"
                  min={0}
                  max={PROBLEM_MARKS}
                  value={problemScore}
                  onChange={(event) => setProblemScore(clampProblemMarks(Number(event.target.value) || 0))}
                />
              </label>
              <label>
                Instructor comment
                <textarea rows={4} value={problemComment} onChange={(event) => setProblemComment(event.target.value)} />
              </label>
            </div>
            <div className="print-only">
              <p>
                <strong>Instructor comment:</strong> {problemComment || '—'}
              </p>
            </div>
          </article>
        </section>

        <section className="panel grade-summary">
          <h2>Final grade</h2>
          <p>
            MCQ {mcqResult.score} + Explain {Object.values(filledExplain).reduce((sum, item) => sum + item.marks, 0)} +
            Problem {problemScore} = <strong>{totalScore} / 100</strong>
          </p>
          <label className="no-print">
            Instructor notes
            <textarea rows={4} value={instructorNotes} onChange={(event) => setInstructorNotes(event.target.value)} />
          </label>
          <div className="print-only">
            <p>
              <strong>Instructor feedback:</strong> {instructorNotes || '—'}
            </p>
            <p>
              <strong>Final score:</strong> {totalScore} / 100
            </p>
          </div>
          <div className="no-print generate-actions">
            <button type="button" className="btn btn-primary" disabled={saving} onClick={() => void handleSave()}>
              {saving ? 'Saving…' : 'Save Grade'}
            </button>
          </div>
          {message ? <p className="notice">{message}</p> : null}
        </section>
      </div>
    </AdminLayout>
  )
}
