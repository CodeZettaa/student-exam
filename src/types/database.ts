import type {
  ExplainGrade,
  GeneratedExam,
  SubmissionAnswers,
  SubmissionStatus,
} from './exam'

export interface ExamRow {
  id: string
  exam_id: string
  student_name: string
  exam_version: number
  generated_questions: GeneratedExam
  access_token: string
  created_at: string
}

export interface ExamSubmissionRow {
  id: string
  exam_id: string
  student_name: string
  answers: SubmissionAnswers
  started_at: string | null
  submitted_at: string | null
  duration_seconds: number | null
  status: SubmissionStatus
  total_score: number | null
  instructor_notes: string | null
  mcq_score: number | null
  explain_scores: Record<string, ExplainGrade> | null
  problem_score: number | null
  problem_comment: string | null
  timed_out: boolean
  updated_at: string
}

export interface StudentExamPayload {
  id: string
  exam_id: string
  student_name: string
  exam_version: number
  generated_questions: GeneratedExam
  created_at: string
}

export interface StudentSubmissionPayload {
  id: string
  exam_id: string
  student_name: string
  answers: SubmissionAnswers
  started_at: string | null
  submitted_at: string | null
  duration_seconds: number | null
  status: SubmissionStatus
  timed_out: boolean
}

export interface GradePayload {
  mcqScore: number
  explainScores: Record<string, ExplainGrade>
  problemScore: number
  problemComment: string
  instructorNotes: string
  totalScore: number
}
