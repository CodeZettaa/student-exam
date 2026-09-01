import { CodeBlock } from './CodeBlock'
import { optionLetter } from '../utils/format'
import type { MaterializedMcq } from '../services/examGenerator'

interface McqItemProps {
  index: number
  item: MaterializedMcq
  selectedOriginalIndex: number | undefined
  disabled: boolean
  onChange: (originalIndex: number) => void
}

export function McqItem({ index, item, selectedOriginalIndex, disabled, onChange }: McqItemProps) {
  const selectedDisplay =
    selectedOriginalIndex === undefined ? -1 : item.optionOrder.indexOf(selectedOriginalIndex)

  return (
    <article className="question-card">
      <h3>
        <span className="q-num">A{index + 1}.</span> {item.question.question}
        <span className="marks">(2 marks)</span>
      </h3>
      {item.question.code ? <CodeBlock code={item.question.code} /> : null}
      <div className="option-list" role="radiogroup" aria-label={`Question A${index + 1}`}>
        {item.options.map((option, displayIndex) => {
          const originalIndex = item.optionOrder[displayIndex] ?? displayIndex
          const id = `${item.question.id}-${displayIndex}`
          return (
            <label key={id} className={`option ${selectedDisplay === displayIndex ? 'selected' : ''}`}>
              <input
                type="radio"
                name={item.question.id}
                checked={selectedDisplay === displayIndex}
                disabled={disabled}
                onChange={() => onChange(originalIndex)}
              />
              <span>
                <strong>{optionLetter(displayIndex)}.</strong> {option}
              </span>
            </label>
          )
        })}
      </div>
    </article>
  )
}
