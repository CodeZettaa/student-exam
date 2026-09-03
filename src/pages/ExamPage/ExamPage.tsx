import { ExamHeader } from '../../components/ExamHeader'
import { ExamTimer } from '../../components/ExamTimer'
import { ExplainItem } from '../../components/ExplainItem'
import { Instructions } from '../../components/Instructions'
import { McqItem } from '../../components/McqItem'
import { ProblemItem } from '../../components/ProblemItem'
import { SaveStatus } from '../../components/SaveStatus'
import {
  adminGetExamByExamId,
  studentGetExam,
  studentGetSubmission,
  studentSaveDraft,
  studentStartExam,
  studentSubmitExam,
} from '../../services/examApi'
import {
  getAnswers,
  getExamById,
  getExamByToken,
  getLocalSubmission,
  getTimer,
  isLocallySubmitted,
  markLocalStarted,
  markLocalSubmitted,
  mergeRemoteSubmissionStatus,
  saveAnswers,
  startTimer,
} from '../../services/examStorage'
import { fromSubmissionAnswers, toSubmissionAnswers } from '../../services/answerPayload'
import { materializeStudentExam, type StudentMaterializedExam } from '../../services/studentExam'
import type { ExamAnswers, GeneratedExam, SaveStatus as SaveStatusValue } from '../../types/exam'
import { isFinalStatus } from '../../utils/tokens'
import { isSupabaseConfigured } from '../../lib/supabase'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

const AUTOSAVE_MS = 25_000

export function ExamPage() {
  const { examId = '' } = useParams()
  const [searchParams] = useSearchParams()
  return (
    <ExamView
      key={`${examId}:${searchParams.get('token')}:${searchParams.get('preview')}`}
      examId={examId}
    />
  )
}

function ExamView({ examId }: { examId: string }) {
  const [searchParams] = useSearchParams()
  const preview = searchParams.get('preview') === '1'
  const autoPrint = searchParams.get('print') === '1'
  const token = searchParams.get('token')?.trim() ?? ''
  const [loading, setLoading] = useState(() => !(preview && Boolean(getExamById(examId))))
  const [error, setError] = useState('')
  const [exam, setExam] = useState<GeneratedExam | null>(() =>
    preview ? (getExamById(examId) ?? null) : token ? (getExamByToken(token) ?? null) : null,
  )
  const [materialized, setMaterialized] = useState<StudentMaterializedExam | null>(() =>
    exam ? materializeStudentExam(exam) : null,
  )
  const [answers, setAnswers] = useState<ExamAnswers>(() => getAnswers(examId))
  const [started, setStarted] = useState(() => Boolean(getTimer(examId) || getLocalSubmission(examId)?.startedAt))
  const [expired, setExpired] = useState(false)
  const [submitted, setSubmitted] = useState(() => isLocallySubmitted(examId))
  const [timedOut, setTimedOut] = useState(() => Boolean(getLocalSubmission(examId)?.timedOut))
  const [startedAtMs, setStartedAtMs] = useState<number | null>(() => getTimer(examId)?.startedAt ?? null)
  const [saveStatus, setSaveStatus] = useState<SaveStatusValue>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const answersRef = useRef(answers)
  const dirtyRef = useRef(false)
  const submittedRef = useRef(submitted)
  const submittingRef = useRef(false)
  const materializedRef = useRef(materialized)

  useEffect(() => {
    answersRef.current = answers
    submittedRef.current = submitted
    materializedRef.current = materialized
  }, [answers, materialized, submitted])

  useEffect(() => {
    let active = true
    const load = async () => {
      if (preview) {
        const local = getExamById(examId)
        if (local) {
          setExam(local)
          setMaterialized(materializeStudentExam(local))
          setLoading(false)
          return
        }
        if (isSupabaseConfigured()) {
          const remote = await adminGetExamByExamId(examId)
          if (!active) return
          if (remote?.generated_questions) {
            setExam(remote.generated_questions)
            setMaterialized(materializeStudentExam(remote.generated_questions))
            setLoading(false)
            return
          }
        }
        setError('Exam not found')
        setLoading(false)
        return
      }
      if (!token) {
        setError('This exam link is missing an access token. Ask your instructor for the unique student URL.')
        setLoading(false)
        return
      }

      try {
        const remoteExam = isSupabaseConfigured() ? await studentGetExam(token) : null
        const localExam =
          getExamByToken(token) ??
          (getExamById(examId)?.accessToken === token ? getExamById(examId) : undefined)
        const nextExam = remoteExam?.generated_questions ?? localExam ?? null
        if (!active) return
        const remoteExamId = remoteExam?.exam_id ?? nextExam?.examId
        if (!nextExam || remoteExamId !== examId) {
          setError(
            'This exam link is invalid or is not assigned yet. Ask your instructor for a new student link.',
          )
          setLoading(false)
          return
        }
        const nextMaterialized = materializeStudentExam(nextExam)
        setExam(nextExam)
        setMaterialized(nextMaterialized)

        const localAnswers = getAnswers(examId)
        const localSubmission = getLocalSubmission(examId)
        const remoteSubmission = isSupabaseConfigured() ? await studentGetSubmission(token) : null
        if (!active) return

        if (remoteSubmission) {
          mergeRemoteSubmissionStatus(
            examId,
            remoteSubmission.status,
            remoteSubmission.started_at,
            remoteSubmission.submitted_at,
            remoteSubmission.timed_out,
          )
          const remoteFinal = isFinalStatus(remoteSubmission.status)
          const remoteAnswers = fromSubmissionAnswers(examId, nextExam.problemId, remoteSubmission.answers)
          const localEmpty = !localAnswers.problem && Object.keys(localAnswers.mcq).length === 0 && Object.keys(localAnswers.explain).length === 0
          const nextAnswers = remoteFinal || localEmpty ? remoteAnswers : localAnswers
          setAnswers(nextAnswers)
          saveAnswers(nextAnswers)
          setSubmitted(remoteFinal)
          setTimedOut(Boolean(remoteSubmission.timed_out))
          if (remoteSubmission.started_at) {
            const startedMs = new Date(remoteSubmission.started_at).getTime()
            startTimer(examId, startedMs)
            setStartedAtMs(startedMs)
            setStarted(true)
          }
        } else if (localSubmission) {
          setSubmitted(isFinalStatus(localSubmission.status))
          setTimedOut(Boolean(localSubmission.timedOut))
          if (localSubmission.startedAt) {
            const startedMs = new Date(localSubmission.startedAt).getTime()
            startTimer(examId, startedMs)
            setStartedAtMs(startedMs)
            setStarted(true)
          }
        }
      } catch (loadError) {
        if (!active) return
        const local = getExamByToken(token)
        if (local && local.examId === examId) {
          setExam(local)
          setMaterialized(materializeStudentExam(local))
        } else {
          setError(loadError instanceof Error ? loadError.message : 'Could not load this exam.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [examId, preview, token])

  useEffect(() => {
    if (autoPrint && materialized) {
      const id = window.setTimeout(() => window.print(), 400)
      return () => window.clearTimeout(id)
    }
    return undefined
  }, [autoPrint, materialized])

  const persist = useCallback((next: ExamAnswers) => {
    if (submittedRef.current) return
    answersRef.current = next
    setAnswers(next)
    saveAnswers(next)
    dirtyRef.current = true
    setSaveStatus('idle')
  }, [])

  const flushDraft = useCallback(async () => {
    const current = materializedRef.current
    if (!current || !token || !isSupabaseConfigured() || submittedRef.current || !dirtyRef.current) return
    setSaveStatus('saving')
    try {
      await studentSaveDraft(token, toSubmissionAnswers(answersRef.current, current.problem.id))
      dirtyRef.current = false
      setSaveStatus('saved')
    } catch {
      setSaveStatus('error')
    }
  }, [token])

  useEffect(() => {
    if (preview || submitted || !started || !token) return undefined
    const id = window.setInterval(() => {
      void flushDraft()
    }, AUTOSAVE_MS)
    return () => window.clearInterval(id)
  }, [flushDraft, preview, started, submitted, token])

  const finalize = useCallback(
    async (timedOutSubmit: boolean) => {
      if (submittedRef.current || submittingRef.current || preview) return
      const current = materializedRef.current
      if (!current) return
      submittingRef.current = true
      const payload = toSubmissionAnswers(answersRef.current, current.problem.id)
      saveAnswers(answersRef.current)
      try {
        if (token && isSupabaseConfigured()) {
          await flushDraft().catch(() => undefined)
          const result = await studentSubmitExam(token, payload, timedOutSubmit)
          markLocalSubmitted(examId, result.timed_out, result.submitted_at ?? undefined)
          setTimedOut(result.timed_out)
        } else {
          markLocalSubmitted(examId, timedOutSubmit)
          setTimedOut(timedOutSubmit)
        }
        dirtyRef.current = false
        submittedRef.current = true
        setSubmitted(true)
        setSaveStatus('saved')
        setSubmitMessage(
          timedOutSubmit
            ? 'Time expired. Your latest answers were submitted automatically.'
            : 'Your exam has been submitted successfully.',
        )
      } catch (submitError) {
        setSubmitMessage(submitError instanceof Error ? submitError.message : 'Submit failed. Your answers are still saved locally.')
      } finally {
        submittingRef.current = false
      }
    },
    [examId, flushDraft, preview, token],
  )

  const handleStart = useCallback(async () => {
    if (submittedRef.current) return
    const local = markLocalStarted(examId)
    const startedMs = local.startedAt ? new Date(local.startedAt).getTime() : Date.now()
    startTimer(examId, startedMs)
    setStartedAtMs(startedMs)
    setStarted(true)
    if (token && isSupabaseConfigured()) {
      try {
        const remote = await studentStartExam(token)
        if (remote.started_at) {
          const remoteMs = new Date(remote.started_at).getTime()
          startTimer(examId, remoteMs)
          setStartedAtMs(remoteMs)
        }
        if (isFinalStatus(remote.status)) {
          mergeRemoteSubmissionStatus(
            examId,
            remote.status,
            remote.started_at,
            remote.submitted_at,
            remote.timed_out,
          )
          submittedRef.current = true
          setSubmitted(true)
        }
      } catch {
        setSaveStatus('error')
      }
    }
  }, [examId, token])

  const handleSubmitClick = () => {
    const confirmed = window.confirm(
      'Are you sure you want to submit your exam? You will not be able to edit your answers after submission.',
    )
    if (!confirmed) return
    void finalize(false)
  }

  const editingEnabled = !preview && started && !expired && !submitted

  if (loading) {
    return (
      <div className="page-narrow">
        <h1>Loading exam</h1>
        <p>Please wait…</p>
      </div>
    )
  }

  if (error || !materialized) {
    return (
      <div className="page-narrow">
        <h1>Exam not found</h1>
        <p>{error || 'This exam link is missing or invalid. Ask your instructor for the unique student URL.'}</p>
      </div>
    )
  }

  const { meta, mcq, explain, problem } = materialized

  return (
    <div className="exam-sheet" data-exam-id={meta.examId}>
      {!preview ? (
        <ExamTimer
          examId={meta.examId}
          started={started}
          stopped={submitted}
          startedAt={startedAtMs}
          onStarted={() => {
            void handleStart()
          }}
          onExpiredChange={setExpired}
          onExpire={() => {
            void finalize(true)
          }}
        />
      ) : (
        <div className="preview-banner no-print">
          Instructor preview — answers are disabled. The answer key is not included on this page.
        </div>
      )}

      <div className="no-print toolbar">
        {preview ? (
          <Link to="/admin" className="btn btn-ghost">
            Instructor page
          </Link>
        ) : (
          <SaveStatus status={saveStatus} submitted={submitted} />
        )}
        <button type="button" className="btn btn-ghost" onClick={() => window.print()}>
          Download / Print Answers
        </button>
      </div>

      <ExamHeader
        studentName={meta.studentName}
        examId={meta.examId}
        date={answers.date}
        dateEditable={editingEnabled || preview}
        onDateChange={(date) => persist({ ...answers, date })}
      />
      <Instructions />

      {!preview && !started && !submitted ? (
        <p className="notice">Click Start Exam to enable answering. The 30-minute timer will begin.</p>
      ) : null}
      {expired && !submitted ? <p className="notice danger">Time is over. Your answers are being submitted.</p> : null}
      {submitted ? (
        <p className="notice success">
          {submitMessage || 'Your exam has been submitted successfully.'}
          {timedOut ? ' This paper was submitted because time expired.' : ''}
        </p>
      ) : null}

      <section>
        <h2>Section A — Multiple Choice</h2>
        <p className="section-meta">15 questions × 2 marks = 30 marks</p>
        {mcq.map((item, index) => (
          <McqItem
            key={item.question.id}
            index={index}
            item={item}
            selectedOriginalIndex={answers.mcq[item.question.id]}
            disabled={!editingEnabled}
            onChange={(originalIndex) =>
              persist({
                ...answers,
                mcq: { ...answers.mcq, [item.question.id]: originalIndex },
              })
            }
          />
        ))}
      </section>

      <section>
        <h2>Section B — Explain / Debug / Analyze</h2>
        <p className="section-meta">4 questions × 10 marks = 40 marks</p>
        {explain.map((question, index) => (
          <ExplainItem
            key={question.id}
            index={index}
            question={question}
            value={answers.explain[question.id] ?? ''}
            disabled={!editingEnabled}
            onChange={(value) =>
              persist({
                ...answers,
                explain: { ...answers.explain, [question.id]: value },
              })
            }
          />
        ))}
      </section>

      <section>
        <h2>Section C — Problem Solving</h2>
        <p className="section-meta">1 question × 30 marks = 30 marks</p>
        <ProblemItem
          question={problem}
          value={answers.problem}
          disabled={!editingEnabled}
          onChange={(value) => persist({ ...answers, problem: value })}
        />
      </section>

      {!preview && started && !submitted ? (
        <div className="submit-bar no-print">
          <button type="button" className="btn btn-primary" onClick={handleSubmitClick}>
            Submit Exam
          </button>
          <p className="hint">You can change answers until you submit. Final submission cannot be undone.</p>
        </div>
      ) : null}

      <footer className="exam-footer">
        End of exam · {meta.studentName} · {meta.examId}
      </footer>
    </div>
  )
}
