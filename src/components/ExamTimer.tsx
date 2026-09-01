import { EXAM_DURATION_MINUTES } from '../types/exam'
import { formatDuration } from '../utils/format'
import { getTimer, startTimer } from '../services/examStorage'
import { useEffect, useState } from 'react'

const DURATION_MS = EXAM_DURATION_MINUTES * 60 * 1000

interface ExamTimerProps {
  examId: string
  onExpiredChange: (expired: boolean) => void
  started: boolean
  onStarted: () => void
}

export function ExamTimer({ examId, onExpiredChange, started, onStarted }: ExamTimerProps) {
  const [remainingMs, setRemainingMs] = useState(() => {
    const timer = getTimer(examId)
    if (!timer) return DURATION_MS
    return Math.max(0, DURATION_MS - (Date.now() - timer.startedAt))
  })

  useEffect(() => {
    if (!started) return undefined
    const tick = () => {
      const timer = getTimer(examId)
      if (!timer) return
      const next = Math.max(0, DURATION_MS - (Date.now() - timer.startedAt))
      setRemainingMs(next)
    }
    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [examId, started])

  const expired = started && remainingMs <= 0
  const remainingMinutes = remainingMs / 60000

  useEffect(() => {
    onExpiredChange(expired)
  }, [expired, onExpiredChange])

  const warning = started && remainingMinutes <= 15 && remainingMinutes > 5
  const strongWarning = started && remainingMinutes <= 5 && remainingMs > 0

  const handleStart = () => {
    startTimer(examId)
    onStarted()
  }

  return (
    <div
      className={`timer-bar no-print ${warning ? 'timer-warn' : ''} ${strongWarning ? 'timer-danger' : ''} ${expired ? 'timer-expired' : ''}`}
    >
      <div>
        <p className="timer-label">Exam timer</p>
        <p className="timer-value">{formatDuration(remainingMs / 1000)}</p>
      </div>
      {!started ? (
        <button type="button" className="btn btn-primary" onClick={handleStart}>
          Start Exam
        </button>
      ) : expired ? (
        <p className="timer-over">Time is over.</p>
      ) : strongWarning ? (
        <p className="timer-over">5 minutes remaining.</p>
      ) : warning ? (
        <p>15 minutes remaining.</p>
      ) : (
        <p>Timer is running. Refreshing will not reset it.</p>
      )}
    </div>
  )
}
