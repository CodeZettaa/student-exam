import { getStudentSupabase, getSupabase, isSupabaseConfigured } from '../lib/supabase'
import type {
  ExamRow,
  ExamSubmissionRow,
  GradePayload,
  StudentExamPayload,
  StudentSubmissionPayload,
} from '../types/database'
import type { GeneratedExam } from '../types/exam'
import { emptySubmissionAnswers } from './answerPayload'
import { normalizeGeneratedExam, parseRpcJson } from './examPayload'

function asPayload<T>(data: unknown): T | null {
  return parseRpcJson<T>(data)
}

export async function studentGetExam(token: string): Promise<StudentExamPayload | null> {
  const supabase = getStudentSupabase()
  if (!supabase) return null
  const { data, error } = await supabase.rpc('get_exam_by_token', { p_token: token })
  if (error) throw new Error(error.message)
  const payload = asPayload<StudentExamPayload>(data)
  if (!payload) return null
  const generated = normalizeGeneratedExam(
    payload.generated_questions,
    payload.exam_id,
    payload.student_name,
    payload.exam_version,
  )
  if (!generated) return null
  return {
    ...payload,
    generated_questions: generated,
  }
}

export async function studentGetSubmission(token: string): Promise<StudentSubmissionPayload | null> {
  const supabase = getStudentSupabase()
  if (!supabase) return null
  const { data, error } = await supabase.rpc('get_submission_by_token', { p_token: token })
  if (error) throw new Error(error.message)
  return asPayload<StudentSubmissionPayload>(data)
}

export async function studentStartExam(token: string): Promise<StudentSubmissionPayload> {
  const supabase = getStudentSupabase()
  if (!supabase) throw new Error('Supabase is not configured')
  const { data, error } = await supabase.rpc('start_exam', { p_token: token })
  if (error) throw new Error(error.message)
  const payload = asPayload<StudentSubmissionPayload>(data)
  if (!payload) throw new Error('Could not start the exam')
  return payload
}

export async function studentSaveDraft(
  token: string,
  answers: ReturnType<typeof emptySubmissionAnswers>,
): Promise<void> {
  const supabase = getStudentSupabase()
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.rpc('save_exam_draft', {
    p_token: token,
    p_answers: answers,
  })
  if (error) throw new Error(error.message)
}

export async function studentSubmitExam(
  token: string,
  answers: ReturnType<typeof emptySubmissionAnswers>,
  timedOut = false,
): Promise<StudentSubmissionPayload> {
  const supabase = getStudentSupabase()
  if (!supabase) throw new Error('Supabase is not configured')
  const { data, error } = await supabase.rpc('submit_exam', {
    p_token: token,
    p_answers: answers,
    p_timed_out: timedOut,
  })
  if (error) throw new Error(error.message)
  const payload = asPayload<StudentSubmissionPayload>(data)
  if (!payload) throw new Error('Could not submit the exam')
  return payload
}

export async function adminUpsertExam(exam: GeneratedExam): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) {
    throw new Error('Supabase is not configured. Student links will not work in a private window.')
  }
  if (!exam.accessToken) {
    throw new Error('This exam is missing an access token. Generate it again.')
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error('Sign in at /admin/login before generating. Student links only work after the exam is saved to Supabase.')
  }

  const { data, error: examError } = await supabase.rpc('admin_upsert_exam', {
    p_exam_id: exam.examId,
    p_student_name: exam.studentName,
    p_exam_version: exam.version,
    p_generated_questions: exam,
    p_access_token: exam.accessToken,
  })

  if (examError) {
    const missingFunction = /could not find the function|does not exist/i.test(examError.message)
    if (!missingFunction) {
      throw new Error(
        `${examError.message} Run supabase/fix-admin-rls.sql in the Supabase SQL editor, then try Copy student link again.`,
      )
    }
    const { data: row, error: fallbackError } = await supabase
      .from('exams')
      .upsert(
        {
          exam_id: exam.examId,
          student_name: exam.studentName,
          exam_version: exam.version,
          generated_questions: exam,
          access_token: exam.accessToken,
        },
        { onConflict: 'exam_id' },
      )
      .select('exam_id, access_token')
      .single()
    if (fallbackError || !row) {
      throw new Error(
        `Run supabase/fix-admin-rls.sql in the Supabase SQL editor, then try again. (${fallbackError?.message || examError.message})`,
      )
    }
    await supabase.from('exam_submissions').upsert(
      {
        exam_id: exam.examId,
        student_name: exam.studentName,
        answers: emptySubmissionAnswers(),
        status: 'not_started',
      },
      { onConflict: 'exam_id', ignoreDuplicates: true },
    )
  } else if (!parseRpcJson(data)) {
    throw new Error('Supabase did not save the exam. Re-run supabase/schema.sql, then generate again.')
  }

  const verified = await studentGetExam(exam.accessToken)
  if (!verified || verified.exam_id !== exam.examId) {
    throw new Error(
      'Saved in Admin, but the public student token lookup failed. Re-run supabase/schema.sql. If VITE_SUPABASE_ANON_KEY starts with sb_publishable_, also try the legacy anon JWT key that starts with eyJ from Project Settings → API.',
    )
  }
}

export async function adminReplaceExam(previousExamId: string, next: GeneratedExam): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) return
  const { error } = await supabase.from('exams').delete().eq('exam_id', previousExamId)
  if (error) throw new Error(error.message)
  await adminUpsertExam(next)
}

export async function adminListExams(): Promise<ExamRow[]> {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase.from('exams').select('*').order('created_at', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as ExamRow[]
}

export async function adminListSubmissions(): Promise<ExamSubmissionRow[]> {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('exam_submissions')
    .select('*')
    .order('student_name', { ascending: true })
  if (error) throw new Error(error.message)
  return (data ?? []) as ExamSubmissionRow[]
}

export async function adminGetSubmission(id: string): Promise<ExamSubmissionRow | null> {
  const supabase = getSupabase()
  if (!supabase) return null
  const { data, error } = await supabase.from('exam_submissions').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(error.message)
  return (data as ExamSubmissionRow | null) ?? null
}

export async function adminGetExamByExamId(examId: string): Promise<ExamRow | null> {
  const supabase = getSupabase()
  if (!supabase) return null
  const { data, error } = await supabase.from('exams').select('*').eq('exam_id', examId).maybeSingle()
  if (error) throw new Error(error.message)
  if (!data) return null
  const row = data as ExamRow
  const generated = normalizeGeneratedExam(row.generated_questions, row.exam_id, row.student_name, row.exam_version)
  if (!generated) return row
  return { ...row, generated_questions: generated }
}

export async function adminSaveGrade(submissionId: string, grade: GradePayload): Promise<void> {
  const supabase = getSupabase()
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase
    .from('exam_submissions')
    .update({
      mcq_score: grade.mcqScore,
      explain_scores: grade.explainScores,
      problem_score: grade.problemScore,
      problem_comment: grade.problemComment,
      instructor_notes: grade.instructorNotes,
      total_score: grade.totalScore,
      status: 'graded',
    })
    .eq('id', submissionId)
  if (error) throw new Error(error.message)
}

export { isSupabaseConfigured }
