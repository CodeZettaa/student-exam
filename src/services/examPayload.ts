import type { GeneratedExam, GeneratedMcqItem } from '../types/exam'

export function parseRpcJson<T>(data: unknown): T | null {
  if (data == null) return null
  if (typeof data === 'string') {
    const trimmed = data.trim()
    if (!trimmed || trimmed === 'null') return null
    try {
      return parseRpcJson<T>(JSON.parse(trimmed) as unknown)
    } catch {
      return null
    }
  }
  if (typeof data === 'object') return data as T
  return null
}

export function normalizeGeneratedExam(
  value: unknown,
  fallbackExamId?: string,
  fallbackStudentName?: string,
  fallbackVersion?: number,
): GeneratedExam | null {
  const record = parseRpcJson<Record<string, unknown>>(value)
  if (!record) return null

  const examId = String(record.examId ?? record.exam_id ?? fallbackExamId ?? '')
  const studentName = String(record.studentName ?? record.student_name ?? fallbackStudentName ?? '')
  const version = Number(record.version ?? record.exam_version ?? fallbackVersion ?? 1)
  const mcq = record.mcq
  const explainIds = record.explainIds ?? record.explain_ids
  const problemId = record.problemId ?? record.problem_id

  if (!examId || !studentName || !Array.isArray(mcq) || !Array.isArray(explainIds) || !problemId) {
    return null
  }

  return {
    examId,
    studentName,
    version: Number.isInteger(version) && version >= 1 ? version : 1,
    generatedAt: String(record.generatedAt ?? record.generated_at ?? new Date().toISOString()),
    seed: String(record.seed ?? `${studentName.toLowerCase()}::v${version}`),
    mcq: mcq as GeneratedMcqItem[],
    explainIds: explainIds.filter((id): id is string => typeof id === 'string'),
    problemId: String(problemId),
    accessToken:
      typeof record.accessToken === 'string'
        ? record.accessToken
        : typeof record.access_token === 'string'
          ? record.access_token
          : undefined,
  }
}
