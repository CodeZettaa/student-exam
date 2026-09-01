import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/AdminPage/AdminPage'
import { AnswerKeyPage } from './pages/AnswerKeyPage/AnswerKeyPage'
import { ExamPage } from './pages/ExamPage/ExamPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/exam/:examId" element={<ExamPage />} />
        <Route path="/answer-key/:examId" element={<AnswerKeyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
