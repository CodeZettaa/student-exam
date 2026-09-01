export type Rng = () => number

export function hashString(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function mulberry32(seed: number): Rng {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function createSeededRng(seed: string): Rng {
  return mulberry32(hashString(seed))
}

export function shuffleInPlace<T>(items: T[], rng: Rng): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    const current = items[i]!
    items[i] = items[j]!
    items[j] = current
  }
  return items
}

export function shuffledCopy<T>(items: readonly T[], rng: Rng): T[] {
  return shuffleInPlace([...items], rng)
}

export function range(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index)
}

export function makeExamId(studentName: string, version: number): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seed = `${studentName.trim().toLowerCase()}::v${version}`
  let a = hashString(seed)
  let b = hashString(`id:${seed}:${seed.length}`)
  let code = ''
  for (let i = 0; i < 4; i += 1) {
    const mixed = (a ^ b ^ Math.imul(i + 1, 2654435761)) >>> 0
    code += alphabet[mixed % alphabet.length]!
    a = (Math.imul(a, 1664525) + 1013904223) >>> 0
    b = Math.imul(b ^ a, 16777619) >>> 0
  }
  return `JS-${code}`
}
