import type { FormEvent, KeyboardEvent, TextareaHTMLAttributes } from 'react'

type AnswerTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onPaste' | 'onDrop' | 'onDragOver' | 'onCopy' | 'onCut'
>

function isPasteKey(event: KeyboardEvent<HTMLTextAreaElement>): boolean {
  const key = event.key.toLowerCase()
  const modifier = event.metaKey || event.ctrlKey
  return (modifier && (key === 'v' || key === 'insert')) || (event.shiftKey && key === 'insert')
}

function block(event: { preventDefault: () => void }) {
  event.preventDefault()
}

export function AnswerTextarea({ className = '', ...props }: AnswerTextareaProps) {
  const handleBeforeInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const inputType = (event.nativeEvent as InputEvent).inputType
    if (
      inputType === 'insertFromPaste' ||
      inputType === 'insertFromPasteAsQuotation' ||
      inputType === 'insertFromDrop'
    ) {
      event.preventDefault()
    }
  }

  return (
    <>
      <textarea
        {...props}
        className={`answer-area no-print ${className}`.trim()}
        autoComplete="off"
        autoCorrect="off"
        spellCheck
        onCopy={block}
        onCut={block}
        onPaste={block}
        onDrop={block}
        onDragOver={block}
        onBeforeInput={handleBeforeInput}
        onKeyDown={(event) => {
          if (isPasteKey(event)) event.preventDefault()
        }}
      />
      <p className="paste-hint no-print">Typing only. Copy and paste are disabled in this box.</p>
    </>
  )
}
