import { StudentTable } from '../../components/StudentTable'
import { generateExam } from '../../services/examGenerator'
import {
  getExamForStudent,
  listStudents,
  replaceExam,
  saveExam,
  studentKey,
} from '../../services/examStorage'
import type { GeneratedExam } from '../../types/exam'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function loadExamMap(students: string[]): Record<string, GeneratedExam> {
  const map: Record<string, GeneratedExam> = {}
  for (const name of students) {
    const exam = getExamForStudent(name)
    if (exam) map[name] = exam
  }
  return map
}

export function AdminPage() {
  const navigate = useNavigate()
  const [nameInput, setNameInput] = useState('')
  const [selected, setSelected] = useState('')
  const [students, setStudents] = useState(listStudents)
  const [exams, setExams] = useState(() => loadExamMap(listStudents()))
  const [message, setMessage] = useState('')

  const assignedCount = useMemo(
    () => students.filter((name) => exams[name]).length,
    [students, exams],
  )

  const refresh = () => {
    const nextStudents = listStudents()
    setStudents(nextStudents)
    setExams(loadExamMap(nextStudents))
  }

  const resolveName = () => nameInput.trim() || selected.trim()

  const handleGenerate = (name: string) => {
    const studentName = name.trim()
    if (!studentName) {
      setMessage('Enter or select a student name first.')
      return
    }
    if (getExamForStudent(studentName)) {
      setMessage(`${studentName} already has an exam. Use Regenerate to create a new version.`)
      refresh()
      return
    }
    const exam = generateExam(studentName, 1)
    saveExam(exam)
    setMessage(`Generated ${exam.examId} for ${studentName}.`)
    refresh()
  }

  const handleRegenerate = (name: string) => {
    const existing = getExamForStudent(name)
    if (!existing) {
      handleGenerate(name)
      return
    }
    const confirmed = window.confirm(
      `Regenerate a new exam for ${name}? The current exam ${existing.examId} and any saved answers will be replaced.`,
    )
    if (!confirmed) return
    const exam = generateExam(name, existing.version + 1)
    replaceExam(existing.examId, exam)
    setMessage(`Regenerated ${exam.examId} for ${name} (version ${exam.version}).`)
    refresh()
  }

  const activeName = resolveName()
  const activeExam = activeName ? exams[studentKey(activeName)] : undefined

  return (
    <div className="admin-shell">
      <header className="admin-hero">
        <div>
          <p className="exam-kicker">Instructor workspace</p>
          <h1>Advanced JavaScript Exam Generator</h1>
          <p className="lede">
            Create a unique 100-mark diploma exam for each student. Generated papers stay assigned
            until you explicitly regenerate them.
          </p>
        </div>
        <div className="stat-card">
          <span>{assignedCount}</span>
          <small>of {students.length} exams assigned</small>
        </div>
      </header>

      <section className="panel">
        <h2>Generate an exam</h2>
        <div className="generate-grid">
          <label>
            Student name
            <input
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="Type a name, or pick from the list"
            />
          </label>
          <label>
            Class list
            <select value={selected} onChange={(event) => setSelected(event.target.value)}>
              <option value="">Select a student</option>
              {students.map((name) => (
                <option key={name} value={name}>
                  {name}
                  {exams[name] ? ' — assigned' : ''}
                </option>
              ))}
            </select>
          </label>
          <div className="generate-actions">
            <button type="button" className="btn btn-primary" onClick={() => handleGenerate(resolveName())}>
              Generate Exam
            </button>
            {activeExam ? (
              <>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(`/exam/${activeExam.examId}?preview=1`)}
                >
                  Preview
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(`/exam/${activeExam.examId}`)}
                >
                  Open Student Exam View
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(`/answer-key/${activeExam.examId}`)}
                >
                  Answer Key
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(`/exam/${activeExam.examId}?preview=1&print=1`)}
                >
                  Print / Save PDF
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleRegenerate(activeName)}>
                  Regenerate Exam
                </button>
              </>
            ) : null}
          </div>
        </div>
        {activeExam ? (
          <p className="notice">
            Current exam for <strong>{activeExam.studentName}</strong>: <code>{activeExam.examId}</code>{' '}
            (version {activeExam.version})
          </p>
        ) : null}
        {message ? <p className="notice">{message}</p> : null}
        <p className="hint">
          Replace names in <code>src/data/students.ts</code> with your real roster. Custom names typed
          here are kept in this browser.
        </p>
      </section>

      <section className="panel">
        <h2>Class dashboard</h2>
        <StudentTable
          students={students}
          exams={exams}
          onGenerate={handleGenerate}
          onPreview={(examId) => navigate(`/exam/${examId}?preview=1`)}
          onOpenExam={(examId) => navigate(`/exam/${examId}`)}
          onAnswerKey={(examId) => navigate(`/answer-key/${examId}`)}
          onPrint={(examId) => navigate(`/exam/${examId}?preview=1&print=1`)}
          onRegenerate={handleRegenerate}
        />
      </section>
    </div>
  )
}
