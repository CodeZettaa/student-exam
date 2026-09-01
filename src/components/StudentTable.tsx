import type { GeneratedExam } from '../types/exam'

interface StudentTableProps {
  students: string[]
  exams: Record<string, GeneratedExam>
  onGenerate: (name: string) => void
  onOpenExam: (examId: string) => void
  onPreview: (examId: string) => void
  onAnswerKey: (examId: string) => void
  onRegenerate: (name: string) => void
  onPrint: (examId: string) => void
}

export function StudentTable({
  students,
  exams,
  onGenerate,
  onOpenExam,
  onPreview,
  onAnswerKey,
  onRegenerate,
  onPrint,
}: StudentTableProps) {
  return (
    <div className="table-wrap">
      <table className="students-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Exam ID</th>
            <th>Generated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((name) => {
            const exam = exams[name]
            return (
              <tr key={name} className={exam ? 'has-exam' : ''}>
                <td>
                  <strong>{name}</strong>
                  {exam ? <span className="badge">Assigned</span> : <span className="badge muted">Not generated</span>}
                </td>
                <td>{exam ? <code>{exam.examId}</code> : '—'}</td>
                <td>{exam ? new Date(exam.generatedAt).toLocaleString() : '—'}</td>
                <td className="actions">
                  {exam ? (
                    <>
                      <button type="button" className="btn btn-ghost" onClick={() => onPreview(exam.examId)}>
                        Preview
                      </button>
                      <button type="button" className="btn btn-ghost" onClick={() => onOpenExam(exam.examId)}>
                        Open Exam
                      </button>
                      <button type="button" className="btn btn-ghost" onClick={() => onAnswerKey(exam.examId)}>
                        Answer Key
                      </button>
                      <button type="button" className="btn btn-ghost" onClick={() => onPrint(exam.examId)}>
                        Print
                      </button>
                      <button type="button" className="btn btn-danger" onClick={() => onRegenerate(name)}>
                        Regenerate
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn btn-primary" onClick={() => onGenerate(name)}>
                      Generate
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
