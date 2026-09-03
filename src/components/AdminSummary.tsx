import type { DashboardStats } from '../hooks/useDashboardStats'

export function AdminSummary({ stats, loading = false }: { stats: DashboardStats; loading?: boolean }) {
  return (
    <section className="summary-grid" aria-label="Class submission summary">
      <article>
        <span>{loading ? '…' : stats.students}</span>
        <small>Students</small>
      </article>
      <article>
        <span>{loading ? '…' : stats.started}</span>
        <small>Started</small>
      </article>
      <article>
        <span>{loading ? '…' : stats.submitted}</span>
        <small>Submitted</small>
      </article>
      <article>
        <span>{loading ? '…' : stats.graded}</span>
        <small>Graded</small>
      </article>
      <article>
        <span>{loading ? '…' : stats.pendingReview}</span>
        <small>Pending Review</small>
      </article>
    </section>
  )
}
