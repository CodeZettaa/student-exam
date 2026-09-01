import { validateGeneratedClass } from '../utils/validateBank'

const logs = validateGeneratedClass()
for (const line of logs) console.log(line)
console.log('Question bank and exam generation checks passed.')
