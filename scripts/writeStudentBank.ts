import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { explainQuestions } from '../src/data/explainQuestions.ts'
import { mcqQuestions } from '../src/data/mcqQuestions.ts'
import { problemQuestions } from '../src/data/problemQuestions.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src/data/student')
mkdirSync(outDir, { recursive: true })

const header = `// Auto-generated student-facing question data. Instructor answers are not included.
// Regenerate with: npm run split:bank

`

function writeFile(name: string, typeName: string, exportName: string, data: unknown) {
  writeFileSync(
    join(outDir, name),
    `${header}import type { ${typeName} } from '../../types/exam'\n\nexport const ${exportName}: ${typeName}[] = ${JSON.stringify(data, null, 2)}\n`,
  )
}

writeFile(
  'mcqQuestions.ts',
  'StudentMCQQuestion',
  'studentMcqQuestions',
  mcqQuestions.map(({ correctAnswer: _correctAnswer, explanation: _explanation, ...rest }) => rest),
)

writeFile(
  'explainQuestions.ts',
  'StudentExplainQuestion',
  'studentExplainQuestions',
  explainQuestions.map(({ expectedPoints: _expectedPoints, rubric: _rubric, ...rest }) => rest),
)

writeFile(
  'problemQuestions.ts',
  'StudentProblemQuestion',
  'studentProblemQuestions',
  problemQuestions.map(
    ({
      solution: _solution,
      explanation: _explanation,
      timeComplexity: _timeComplexity,
      spaceComplexity: _spaceComplexity,
      approach: _approach,
      rubric: _rubric,
      ...rest
    }) => rest,
  ),
)

console.log(`Wrote student question bank to ${outDir}`)
