import { CodeBlock } from '../../components/CodeBlock'
import { ExamHeader } from '../../components/ExamHeader'
import { materializeExam } from '../../services/examGenerator'
import { adminGetExamByExamId } from '../../services/examApi'
import { resolveSharedExam } from '../../services/examResolver'
import { examSharePath } from '../../utils/examLinks'
import { optionLetter } from '../../utils/format'
import type { GeneratedExam } from '../../types/exam'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

export function AnswerKeyPage() {
  const { examId = '' } = useParams()
  const [searchParams] = useSearchParams()
  const studentName = searchParams.get('n')
  const version = searchParams.get('v')
  const autoPrint = searchParams.get('print') === '1'
  const [exam, setExam] = useState<GeneratedExam | null>(
    () => resolveSharedExam(examId, studentName, version) ?? null,
  )
  const [loading, setLoading] = useState(!exam)

  useEffect(() => {
    if (exam) return undefined
    let active = true
    void adminGetExamByExamId(examId)
      .then((row) => {
        if (active && row?.generated_questions) setExam(row.generated_questions)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [exam, examId])

  const materialized = useMemo(() => (exam ? materializeExam(exam) : null), [exam])

  useEffect(() => {
    if (autoPrint && materialized) {
      const id = window.setTimeout(() => window.print(), 400)
      return () => window.clearTimeout(id)
    }
    return undefined
  }, [autoPrint, materialized])

  if (loading && !materialized) {
    return (
      <div className="page-narrow">
        <h1>Loading answer key</h1>
      </div>
    )
  }

  if (!materialized) {
    return (
      <div className="page-narrow">
        <h1>Answer key not found</h1>
        <Link to="/admin">Back to instructor page</Link>
      </div>
    )
  }

  const { meta, mcq, explain, problem } = materialized

  return (
    <div className="exam-sheet answer-key" data-exam-id={meta.examId}>
      <div className="preview-banner no-print">Instructor answer key — do not share this page with students.</div>
      <div className="no-print toolbar">
        <Link to="/admin" className="btn btn-ghost">
          Instructor page
        </Link>
        <Link to={examSharePath(meta, { preview: '1' })} className="btn btn-ghost">
          Preview student paper
        </Link>
        <button type="button" className="btn btn-primary" onClick={() => window.print()}>
          Print answer key
        </button>
      </div>

      <ExamHeader studentName={meta.studentName} examId={meta.examId} date="" />
      <p className="notice">
        Answer key for version {meta.version}. Total: 30 + 40 + 30 = 100 marks.
      </p>

      <section>
        <h2>Section A — MCQ answer key (30 marks)</h2>
        {mcq.map((item, index) => {
          const correctText = item.question.options[item.question.correctAnswer]
          const displayIndex = item.optionOrder.indexOf(item.question.correctAnswer)
          return (
            <article key={item.question.id} className="question-card">
              <h3>
                A{index + 1}. {item.question.question}
              </h3>
              {item.question.code ? <CodeBlock code={item.question.code} /> : null}
              <p>
                <strong>Correct answer:</strong> {optionLetter(displayIndex)} — {correctText}
              </p>
              <p>
                <strong>Explanation:</strong> {item.question.explanation}
              </p>
            </article>
          )
        })}
      </section>

      <section>
        <h2>Section B — Explain / Debug / Analyze (40 marks)</h2>
        {explain.map((question, index) => (
          <article key={question.id} className="question-card">
            <h3>
              B{index + 1}. {question.question}
            </h3>
            {question.code ? <CodeBlock code={question.code} /> : null}
            <h4>Expected points</h4>
            <ul>
              {question.expectedPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <h4>Rubric (10 marks)</h4>
            <ul>
              {question.rubric.map((item) => (
                <li key={item.point}>
                  {item.point} — <strong>{item.marks} marks</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section>
        <h2>Section C — Problem Solving (30 marks)</h2>
        <article className="question-card">
          <h3>
            C1. {problem.title}
          </h3>
          <p>{problem.description}</p>
          <h4>Recommended approach</h4>
          <p>{problem.approach}</p>
          <h4>JavaScript solution</h4>
          <CodeBlock code={problem.solution} />
          <p>
            <strong>Time complexity:</strong> {problem.timeComplexity}
          </p>
          <p>
            <strong>Space complexity:</strong> {problem.spaceComplexity}
          </p>
          <h4>Important edge cases</h4>
          <ul>
            {problem.edgeCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{problem.explanation}</p>
          <h4>Suggested grading rubric (30 marks)</h4>
          <ul>
            {problem.rubric.map((item) => (
              <li key={item.criterion}>
                {item.criterion} — <strong>{item.marks} marks</strong>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <footer className="exam-footer">
        Instructor answer key · {meta.studentName} · {meta.examId}
      </footer>
    </div>
  )
}
