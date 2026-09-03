import { AnswerTextarea } from './AnswerTextarea'
import type { StudentProblemQuestion } from '../types/exam'

interface ProblemItemProps {
  question: StudentProblemQuestion
  value: string
  disabled: boolean
  onChange: (value: string) => void
}

export function ProblemItem({ question, value, disabled, onChange }: ProblemItemProps) {
  return (
    <article className="question-card">
      <h3>
        <span className="q-num">C1.</span> {question.title}
        <span className="marks">(30 marks)</span>
      </h3>
      <p>{question.description}</p>
      {question.functionSignature ? (
        <p>
          Implement: <code>{question.functionSignature}</code>
        </p>
      ) : null}

      <h4>Examples</h4>
      <ul className="plain-list">
        {question.examples.map((example) => (
          <li key={example.input}>
            <code>{example.input}</code> → <code>{example.output}</code>
            {example.explanation ? ` — ${example.explanation}` : ''}
          </li>
        ))}
      </ul>

      <h4>Constraints</h4>
      <ul>
        {question.constraints.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h4>Edge cases to consider</h4>
      <ul>
        {question.edgeCases.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <label className="sr-only" htmlFor="problem-answer">
        Problem solving answer
      </label>
      <AnswerTextarea
        id="problem-answer"
        className="code-area"
        rows={18}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write your JavaScript solution here. Include time complexity."
      />
      <div className="print-only print-answer code-print">{value || ' '}</div>
    </article>
  )
}
