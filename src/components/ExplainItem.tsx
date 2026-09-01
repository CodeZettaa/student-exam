import { AnswerTextarea } from './AnswerTextarea'
import { CodeBlock } from './CodeBlock'
import type { ExplainQuestion } from '../types/exam'

interface ExplainItemProps {
  index: number
  question: ExplainQuestion
  value: string
  disabled: boolean
  onChange: (value: string) => void
}

export function ExplainItem({ index, question, value, disabled, onChange }: ExplainItemProps) {
  return (
    <article className="question-card">
      <h3>
        <span className="q-num">B{index + 1}.</span> {question.question}
        <span className="marks">(10 marks)</span>
      </h3>
      {question.code ? <CodeBlock code={question.code} /> : null}
      <label className="sr-only" htmlFor={question.id}>
        Answer for question B{index + 1}
      </label>
      <AnswerTextarea
        id={question.id}
        rows={10}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write your analysis here. Include output predictions, reasoning, and any requested fixes."
      />
      <div className="print-only print-answer">{value || ' '}</div>
    </article>
  )
}
