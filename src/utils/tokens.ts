export function createAccessToken(): string {
  const bytes = new Uint8Array(18)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function isFinalStatus(status: string | undefined): boolean {
  return status === 'submitted' || status === 'graded'
}
