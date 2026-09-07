import { StudentTable } from '../../components/StudentTable'
import { AdminLayout } from '../../components/AdminLayout'
import { AdminSummary } from '../../components/AdminSummary'
import { generateExam } from '../../services/examGenerator'
import { adminListExams, adminReplaceExam, adminUpsertExam } from '../../services/examApi'
import {
  getExamForStudent,
  listStudents,
  replaceExam,
  saveExam,
  studentKey,
} from '../../services/examStorage'
import { useDashboardStats } from '../../hooks/useDashboardStats'
import type { GeneratedExam } from '../../types/exam'
import { answerKeyPath, examSharePath, examShareUrl } from '../../utils/examLinks'
import { normalizeGeneratedExam } from '../../services/examPayload'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function loadExamMap(students: string[]): Record<string, GeneratedExam> {
  const map: Record<string, GeneratedExam> = {}
  for (const name of students) {
    const exam = getExamForStudent(name)
    if (exam) map[name] = exam
  }
  return map
}

async function hydrateAssignedExams(): Promise<void> {
  const rows = await adminListExams()
  for (const row of rows) {
    const generated = normalizeGeneratedExam(
      row.generated_questions,
      row.exam_id,
      row.student_name,
      row.exam_version,
    )
    if (!generated) continue
    if (getExamForStudent(generated.studentName)) continue
    saveExam({
      ...generated,
      accessToken: generated.accessToken ?? row.access_token,
    })
  }
}

export function AdminPage() {
  const navigate = useNavigate()
  const [nameInput, setNameInput] = useState('')
  const [selected, setSelected] = useState('')
  const [students, setStudents] = useState(listStudents)
  const [exams, setExams] = useState(() => loadExamMap(listStudents()))
  const [message, setMessage] = useState('')
  const [generatingRemaining, setGeneratingRemaining] = useState(false)
  const { stats, loading: statsLoading } = useDashboardStats()

  const assignedCount = useMemo(
    () => students.filter((name) => exams[name]).length,
    [students, exams],
  )
  const unassignedStudents = useMemo(
    () => students.filter((name) => !exams[name]),
    [students, exams],
  )

  const refresh = () => {
    const nextStudents = listStudents()
    setStudents(nextStudents)
    setExams(loadExamMap(nextStudents))
  }

  useEffect(() => {
    let active = true
    void hydrateAssignedExams()
      .then(() => {
        if (active) refresh()
      })
      .catch(() => {
        if (active) refresh()
      })
    return () => {
      active = false
    }
  }, [])

  const resolveName = () => nameInput.trim() || selected.trim()

  const handleGenerateRemaining = async () => {
    if (generatingRemaining) return
    const missing = students.filter((name) => !getExamForStudent(name))
    if (!missing.length) {
      setMessage('Every student on the list already has an exam. Existing papers were left unchanged.')
      return
    }
    setGeneratingRemaining(true)
    const saved: string[] = []
    const localOnly: string[] = []
    try {
      try {
        await hydrateAssignedExams()
      } catch {
        // Continue with locally assigned exams if Supabase is unavailable.
      }
      const currentStudents = listStudents()
      const alreadyAssigned = currentStudents.filter((name) => getExamForStudent(name)).length
      const remaining = currentStudents.filter((name) => !getExamForStudent(name))
      if (!remaining.length) {
        refresh()
        setMessage('Every student on the list already has an exam. Existing papers were left unchanged.')
        return
      }
      for (const name of remaining) {
        if (getExamForStudent(name)) continue
        const exam = generateExam(name, 1)
        saveExam(exam)
        try {
          await adminUpsertExam(exam)
          saved.push(name)
        } catch {
          localOnly.push(name)
        }
      }
      refresh()
      const created = saved.length + localOnly.length
      if (localOnly.length) {
        setMessage(
          `Created ${created} new exam${created === 1 ? '' : 's'} for unassigned students. Existing papers were not changed. ${localOnly.length} could not be saved to Supabase — do not send those links yet.`,
        )
        return
      }
      setMessage(
        `Created ${created} new exam${created === 1 ? '' : 's'} for unassigned students. The ${alreadyAssigned} existing paper${alreadyAssigned === 1 ? '' : 's'} were left unchanged.`,
      )
    } finally {
      setGeneratingRemaining(false)
    }
  }

  const handleGenerate = async (name: string) => {
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
    try {
      await adminUpsertExam(exam)
      setMessage(`Generated ${exam.examId} for ${studentName} and verified the student token. You can copy the student link.`)
    } catch (error) {
      setMessage(
        `Do not send this link yet. ${exam.examId} is only on this computer. Supabase save failed: ${error instanceof Error ? error.message : 'unknown error'}`,
      )
    }
    refresh()
  }

  const handleRegenerate = async (name: string) => {
    const existing = getExamForStudent(name)
    if (!existing) {
      await handleGenerate(name)
      return
    }
    const confirmed = window.confirm(
      `Regenerate a new exam for ${name}? The current exam ${existing.examId} and any saved answers will be replaced.`,
    )
    if (!confirmed) return
    const exam = generateExam(name, existing.version + 1)
    replaceExam(existing.examId, exam)
    try {
      await adminReplaceExam(existing.examId, exam)
      setMessage(`Regenerated ${exam.examId} for ${name} (version ${exam.version}) and verified the student token.`)
    } catch (error) {
      setMessage(
        `Do not send this link yet. ${exam.examId} is only on this computer. Supabase save failed: ${error instanceof Error ? error.message : 'unknown error'}`,
      )
    }
    refresh()
  }

  const handleCopyLink = async (exam: GeneratedExam) => {
    let saveError = ''
    try {
      await adminUpsertExam(exam)
    } catch (error) {
      saveError = error instanceof Error ? error.message : 'unknown error'
    }
    const url = examShareUrl(exam)
    const vercelHint =
      'This Vercel deploy has no Supabase keys. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables (anon JWT starting with eyJ), then Redeploy.'
    const localHint =
      'Copy .env.example to .env, add your project URL and anon JWT key (starts with eyJ), restart the app, then copy again before sending to another browser.'
    const setupHint = window.location.hostname.includes('vercel.app') ? vercelHint : localHint
    try {
      await navigator.clipboard.writeText(url)
      setMessage(
        saveError
          ? `Student link copied: ${url} Supabase is not saving yet (${saveError}). ${setupHint}`
          : `Student link copied and verified: ${url}`,
      )
    } catch {
      setMessage(
        saveError
          ? `Copy this student link: ${url} Save failed: ${saveError}`
          : `Copy this verified student link: ${url}`,
      )
    }
  }

  const activeName = resolveName()
  const activeExam = activeName ? exams[studentKey(activeName)] : undefined

  return (
    <AdminLayout>
      <header className="admin-hero">
        <div>
          <p className="exam-kicker">Instructor workspace</p>
          <h1>Advanced JavaScript Exam Generator</h1>
          <p className="lede">
            Create a unique 100-mark diploma exam for each student. Generated papers stay assigned
            until you explicitly regenerate them. Students submit through a unique token link.
          </p>
        </div>
        <div className="stat-card">
          <span>{assignedCount}</span>
          <small>of {students.length} exams assigned</small>
        </div>
      </header>

      <AdminSummary stats={stats} loading={statsLoading} />

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
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => void handleGenerate(resolveName())}
            >
              Generate Exam
            </button>
            {unassignedStudents.length ? (
              <button
                type="button"
                className="btn btn-ghost"
                disabled={generatingRemaining}
                onClick={() => void handleGenerateRemaining()}
              >
                {generatingRemaining
                  ? 'Generating remaining…'
                  : `Generate remaining (${unassignedStudents.length})`}
              </button>
            ) : null}
            {activeExam ? (
              <>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(examSharePath(activeExam, { preview: '1' }))}
                >
                  Preview
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(examSharePath(activeExam))}
                >
                  Open Student Exam View
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => void handleCopyLink(activeExam)}>
                  Copy student link
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(answerKeyPath(activeExam))}
                >
                  Answer Key
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate(examSharePath(activeExam, { preview: '1', print: '1' }))}
                >
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => void handleRegenerate(activeName)}
                >
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
        {message ? (
          <p className={`notice ${message.includes('not saving') || message.includes('Save failed') || message.includes('Do not send') ? 'danger' : 'success'}`}>
            {message}
          </p>
        ) : null}
        <p className="hint">
          Replace names in <code>src/data/students.ts</code> with your real roster. Custom names typed
          here are kept in this browser. Use <strong>Generate remaining</strong> to create papers only
          for students who do not have one yet — existing exams and student links stay unchanged. Use{' '}
          <strong>Copy student link</strong> to share the exam — the URL includes a unique token, not
          just the student name.
        </p>
      </section>

      <section className="panel">
        <h2>Class dashboard</h2>
        <StudentTable
          students={students}
          exams={exams}
          onGenerate={(name) => void handleGenerate(name)}
          onPreview={(exam) => navigate(examSharePath(exam, { preview: '1' }))}
          onOpenExam={(exam) => navigate(examSharePath(exam))}
          onCopyLink={(exam) => void handleCopyLink(exam)}
          onAnswerKey={(exam) => navigate(answerKeyPath(exam))}
          onPrint={(exam) => navigate(examSharePath(exam, { preview: '1', print: '1' }))}
          onRegenerate={(name) => void handleRegenerate(name)}
        />
      </section>
    </AdminLayout>
  )
}
