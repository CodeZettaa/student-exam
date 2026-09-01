import { mcqAsync } from './mcq/async'
import { mcqDsa } from './mcq/dsa'
import { mcqEngineMemory } from './mcq/engineMemory'
import { mcqJavascriptCore } from './mcq/javascriptCore'
import { mcqModulesBundlers } from './mcq/modulesBundlers'
import { mcqOopPrototype } from './mcq/oopPrototype'
import { mcqScopeClosure } from './mcq/scopeClosure'
import type { MCQQuestion } from '../types/exam'

export const mcqQuestions: MCQQuestion[] = [
  ...mcqJavascriptCore,
  ...mcqScopeClosure,
  ...mcqOopPrototype,
  ...mcqAsync,
  ...mcqEngineMemory,
  ...mcqModulesBundlers,
  ...mcqDsa,
]
