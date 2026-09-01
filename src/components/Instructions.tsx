const INSTRUCTIONS = [
  'Answer all questions.',
  'The exam duration is 30 minutes.',
  'Explain your reasoning where requested.',
  'Use JavaScript for the coding question.',
  'Do not use external libraries.',
  'Write readable code.',
  'Mention the time complexity of your Problem Solving solution.',
  'Type your written answers. Copy and paste are disabled.',
  'Review your answers before submitting.',
]

export function Instructions() {
  return (
    <section className="instructions">
      <h2>Instructions</h2>
      <ul>
        {INSTRUCTIONS.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </section>
  )
}
