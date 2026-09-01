import {
  EXAM_DURATION_MINUTES,
  EXAM_TITLE,
  EXAM_TOTAL_MARKS,
} from '../types/exam'

interface ExamHeaderProps {
  studentName: string
  examId: string
  date: string
  onDateChange?: (value: string) => void
  dateEditable?: boolean
}

export function ExamHeader({
  studentName,
  examId,
  date,
  onDateChange,
  dateEditable = false,
}: ExamHeaderProps) {
  return (
    <header className="exam-masthead">
      <p className="exam-kicker">Diploma Assessment</p>
      <h1>{EXAM_TITLE}</h1>
      <dl className="exam-meta">
        <div>
          <dt>Student Name</dt>
          <dd>{studentName}</dd>
        </div>
        <div>
          <dt>Exam ID</dt>
          <dd className="exam-id">{examId}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{EXAM_DURATION_MINUTES} Minutes</dd>
        </div>
        <div>
          <dt>Total Marks</dt>
          <dd>{EXAM_TOTAL_MARKS}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>
            {dateEditable ? (
              <input
                type="date"
                value={date}
                onChange={(event) => onDateChange?.(event.target.value)}
                className="date-input"
              />
            ) : (
              date || '__________'
            )}
          </dd>
        </div>
      </dl>
    </header>
  )
}
