import { EXAM_DURATION_MINUTES } from '../types/exam'
import { formatDuration } from '../utils/format'
import { getTimer, startTimer } from '../services/examStorage'
import { useEffect, useRef, useState } from 'react'

const DURATION_MS = EXAM_DURATION_MINUTES * 60 * 1000

interface ExamTimerProps {
  examId: string
  onExpiredChange: (expired: boolean) => void
  started: boolean
  onStarted: () => void
  stopped?: boolean
  startedAt?: number | null
  onExpire?: () => void
}

export function ExamTimer({
  examId,
  onExpiredChange,
  started,
  onStarted,
  stopped = false,
  startedAt = null,
  onExpire,
}: ExamTimerProps) {
  const [remainingMs, setRemainingMs] = useState(() => remainingFrom(examId, startedAt))
  const expireFired = useRef(false)

  useEffect(() => {
    if (!started || stopped) return undefined
    const tick = () => setRemainingMs(remainingFrom(examId, startedAt))
    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [examId, started, startedAt, stopped])

  const expired = started && remainingMs <= 0
  const remainingMinutes = remainingMs / 60000

  useEffect(() => {
    onExpiredChange(expired)
  }, [expired, onExpiredChange])

  useEffect(() => {
    if (expired && !stopped && !expireFired.current) {
      expireFired.current = true
      onExpire?.()
    }
  }, [expired, onExpire, stopped])

  const warning = started && !stopped && remainingMinutes <= 15 && remainingMinutes > 5
  const strongWarning = started && !stopped && remainingMinutes <= 5 && remainingMs > 0

  const handleStart = () => {
    startTimer(examId, startedAt ?? Date.now())
    onStarted()
  }

  return (
    <div
      className={`timer-bar no-print ${warning ? 'timer-warn' : ''} ${strongWarning ? 'timer-danger' : ''} ${expired || stopped ? 'timer-expired' : ''}`}
    >
      <div>
        <p className="timer-label">Exam timer</p>
        <p className="timer-value">{formatDuration(remainingMs / 1000)}</p>
      </div>
      {stopped ? (
        <p className="timer-over">Exam submitted. Timer stopped.</p>
      ) : !started ? (
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

function remainingFrom(examId: string, startedAt: number | null): number {
  const timer = startedAt ? { startedAt } : getTimer(examId)
  if (!timer) return DURATION_MS
  return Math.max(0, DURATION_MS - (Date.now() - timer.startedAt))
}
