import { ExamHeader } from '../../components/ExamHeader'
import { ExamTimer } from '../../components/ExamTimer'
import { ExplainItem } from '../../components/ExplainItem'
import { Instructions } from '../../components/Instructions'
import { McqItem } from '../../components/McqItem'
import { ProblemItem } from '../../components/ProblemItem'
import { materializeExam } from '../../services/examGenerator'
import { getAnswers, getTimer, resolveSharedExam, saveAnswers } from '../../services/examStorage'
import type { ExamAnswers } from '../../types/exam'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

export function ExamPage() {
  const { examId = '' } = useParams()
  const [searchParams] = useSearchParams()
  return <ExamView key={`${examId}:${searchParams.get('n')}:${searchParams.get('v')}`} examId={examId} />
}

function ExamView({ examId }: { examId: string }) {
  const [searchParams] = useSearchParams()
  const preview = searchParams.get('preview') === '1'
  const autoPrint = searchParams.get('print') === '1'
  const studentName = searchParams.get('n')
  const version = searchParams.get('v')
  const exam = useMemo(
    () => resolveSharedExam(examId, studentName, version),
    [examId, studentName, version],
  )
  const materialized = useMemo(() => (exam ? materializeExam(exam) : null), [exam])
  const [answers, setAnswers] = useState<ExamAnswers>(() => getAnswers(examId))
  const [started, setStarted] = useState(() => Boolean(getTimer(examId)))
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (autoPrint && materialized) {
      const id = window.setTimeout(() => window.print(), 400)
      return () => window.clearTimeout(id)
    }
    return undefined
  }, [autoPrint, materialized])

  const persist = useCallback((next: ExamAnswers) => {
    setAnswers(next)
    saveAnswers(next)
  }, [])

  const editingEnabled = !preview && started && !expired

  if (!materialized) {
    return (
      <div className="page-narrow">
        <h1>Exam not found</h1>
        <p>This exam link is missing or invalid. Ask your instructor for the full student URL.</p>
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
          onStarted={() => setStarted(true)}
          onExpiredChange={setExpired}
        />
      ) : (
        <div className="preview-banner no-print">
          Instructor preview — answers are disabled. The answer key is not included on this page.
        </div>
      )}

      <div className="no-print toolbar">
        {preview ? (
          <Link to="/" className="btn btn-ghost">
            Instructor page
          </Link>
        ) : (
          <span />
        )}
        <button type="button" className="btn btn-primary" onClick={() => window.print()}>
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

      {!preview && !started ? (
        <p className="notice">Click Start Exam to enable answering. The 30-minute timer will begin.</p>
      ) : null}
      {expired ? <p className="notice danger">Time is over. Editing is disabled.</p> : null}

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

      <footer className="exam-footer">
        End of exam · {meta.studentName} · {meta.examId}
      </footer>
    </div>
  )
}
