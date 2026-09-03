import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider } from './auth/AuthProvider'
import { ProtectedAdmin } from './components/ProtectedAdmin'

const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage').then((mod) => ({ default: mod.AdminPage })))
const AdminLoginPage = lazy(() =>
  import('./pages/AdminLoginPage/AdminLoginPage').then((mod) => ({ default: mod.AdminLoginPage })),
)
const AnswerKeyPage = lazy(() =>
  import('./pages/AnswerKeyPage/AnswerKeyPage').then((mod) => ({ default: mod.AnswerKeyPage })),
)
const ExamPage = lazy(() => import('./pages/ExamPage/ExamPage').then((mod) => ({ default: mod.ExamPage })))
const SubmissionsPage = lazy(() =>
  import('./pages/SubmissionsPage/SubmissionsPage').then((mod) => ({ default: mod.SubmissionsPage })),
)
const SubmissionDetailPage = lazy(() =>
  import('./pages/SubmissionDetailPage/SubmissionDetailPage').then((mod) => ({ default: mod.SubmissionDetailPage })),
)

function RouteFallback() {
  return (
    <div className="page-narrow">
      <h1>Loading</h1>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdmin>
                  <AdminPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/submissions"
              element={
                <ProtectedAdmin>
                  <SubmissionsPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/submissions/:id"
              element={
                <ProtectedAdmin>
                  <SubmissionDetailPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/answer-key/:examId"
              element={
                <ProtectedAdmin>
                  <AnswerKeyPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/answer-key/:examId"
              element={
                <ProtectedAdmin>
                  <AnswerKeyPage />
                </ProtectedAdmin>
              }
            />
            <Route path="/exam/:examId" element={<ExamPage />} />
            <Route
              path="*"
              element={
                <div className="page-narrow">
                  <h1>Page not found</h1>
                  <p>If you are a student, open the full exam link your instructor sent, including the token.</p>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
