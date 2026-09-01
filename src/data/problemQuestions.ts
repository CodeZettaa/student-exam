import type { ProblemQuestion } from '../types/exam'

const STANDARD_RUBRIC = [
  { criterion: 'Correct approach', marks: 10 },
  { criterion: 'Correct implementation', marks: 10 },
  { criterion: 'Edge cases', marks: 4 },
  { criterion: 'Complexity explanation', marks: 3 },
  { criterion: 'Code quality / readability', marks: 3 },
] as const

export const problemQuestions: ProblemQuestion[] = [
  {
    id: 'prob-01',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Anagram Checker',
    description:
      'Write a function areAnagrams(a, b) that returns true if the two strings contain the same characters with the same frequencies. Ignore spaces and letter case. Do not use Array.prototype.sort in the required solution (you may mention a sort-based approach as an alternative).',
    functionSignature: 'function areAnagrams(a, b) { /* ... */ }',
    examples: [
      { input: 'areAnagrams("listen", "silent")', output: 'true' },
      { input: 'areAnagrams("hello", "world")', output: 'false' },
      { input: 'areAnagrams("Dormitory", "dirty room")', output: 'true' },
    ],
    constraints: [
      'Inputs are strings (may contain spaces and mixed case).',
      'Only alphabetic characters need to match; ignore spaces.',
      'Empty strings: two empty strings (or only spaces) are anagrams.',
    ],
    edgeCases: [
      'Different lengths after removing spaces',
      'Repeated letters (e.g. "aab" vs "aba")',
      'All spaces',
    ],
    approach:
      'Normalize both strings (lowercase, remove spaces). Count character frequencies with a Map or object. Compare counts. This is O(n) and avoids sorting.',
    solution: `function areAnagrams(a, b) {
  const normalize = (s) => s.toLowerCase().replace(/ /g, "");
  const x = normalize(a);
  const y = normalize(b);
  if (x.length !== y.length) return false;
  const counts = Object.create(null);
  for (const ch of x) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of y) {
    if (!counts[ch]) return false;
    counts[ch] -= 1;
  }
  return true;
}`,
    explanation:
      'Frequency counting proves the multisets of characters are equal. Sorting would also work but is O(n log n) and is disallowed for the required solution.',
    timeComplexity: 'O(n) where n is the length of the longer string',
    spaceComplexity: 'O(k) where k is the number of distinct characters (at most alphabet size)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-02',
    category: 'dsa',
    difficulty: 'medium',
    title: 'First Non-Repeating Character',
    description:
      'Return the first character that appears exactly once in the string. If every character repeats, return null.',
    functionSignature: 'function firstNonRepeatingChar(s) { /* ... */ }',
    examples: [
      { input: 'firstNonRepeatingChar("aabbcddee")', output: '"c"' },
      { input: 'firstNonRepeatingChar("aabb")', output: 'null' },
      { input: 'firstNonRepeatingChar("javascript")', output: '"j"' },
    ],
    constraints: ['s is a string of printable characters.', 'Comparison is case-sensitive.'],
    edgeCases: ['Empty string → null', 'Single character', 'All unique (return the first char)'],
    approach:
      'Count frequencies in one pass, then scan the string again and return the first character whose count is 1.',
    solution: `function firstNonRepeatingChar(s) {
  const counts = new Map();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);
  for (const ch of s) {
    if (counts.get(ch) === 1) return ch;
  }
  return null;
}`,
    explanation:
      'Two O(n) passes with a hash map preserve original order without nested scans.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) distinct characters',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-03',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Most Frequent Element',
    description:
      'Given an array of primitives, return the element that appears most often. If there is a tie, return the one that appears first in the array.',
    functionSignature: 'function mostFrequent(arr) { /* ... */ }',
    examples: [
      { input: 'mostFrequent([1, 3, 1, 3, 2, 1])', output: '1' },
      { input: 'mostFrequent(["a", "b", "b", "a"])', output: '"a"' },
    ],
    constraints: ['arr length is at least 1.', 'Elements are comparable with ===.'],
    edgeCases: ['All unique → first element', 'Tie between two values'],
    approach:
      'Count with a Map while tracking the current winner and its count. On a strict greater count, update the winner. Do not update on equal counts so the first winner stays.',
    solution: `function mostFrequent(arr) {
  const counts = new Map();
  let best = arr[0];
  let bestCount = 0;
  for (const value of arr) {
    const next = (counts.get(value) || 0) + 1;
    counts.set(value, next);
    if (next > bestCount) {
      best = value;
      bestCount = next;
    }
  }
  return best;
}`,
    explanation:
      'A single pass records frequencies and the first-mode because ties keep the existing best.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-04',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Group Values by Frequency',
    description:
      'Return an object (or Map) grouping array values by how many times they occur. Keys are frequencies (as numbers); values are arrays of unique items that have that frequency, in first-seen order.',
    functionSignature: 'function groupByFrequency(arr) { /* ... */ }',
    examples: [
      {
        input: 'groupByFrequency(["a", "b", "a", "c", "b", "a"])',
        output: '{ 3: ["a"], 2: ["b"], 1: ["c"] }',
      },
    ],
    constraints: ['arr may be empty (return {}).', 'Use === for identity.'],
    edgeCases: ['Empty array', 'All items unique', 'One item repeated'],
    approach:
      'Count frequencies while recording first-seen unique values, then bucket those uniques by their count.',
    solution: `function groupByFrequency(arr) {
  const counts = new Map();
  const order = [];
  for (const value of arr) {
    if (!counts.has(value)) order.push(value);
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  const groups = {};
  for (const value of order) {
    const n = counts.get(value);
    if (!groups[n]) groups[n] = [];
    groups[n].push(value);
  }
  return groups;
}`,
    explanation:
      'Separating counting from bucketing keeps first-seen order inside each frequency group.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-05',
    category: 'javascript-core',
    difficulty: 'medium',
    title: 'Flatten Nested Arrays',
    description:
      'Implement flatten(arr) that recursively flattens nested arrays to any depth. Do not use Array.prototype.flat.',
    functionSignature: 'function flatten(arr) { /* ... */ }',
    examples: [
      { input: 'flatten([1, [2, [3, 4], 5]])', output: '[1, 2, 3, 4, 5]' },
      { input: 'flatten([[["a"]]])', output: '["a"]' },
    ],
    constraints: ['Only arrays should be flattened; other values stay as elements.', 'Depth is finite.'],
    edgeCases: ['Empty arrays', 'Already flat arrays', 'Holes can be ignored or skipped'],
    approach:
      'Recursively walk the structure. If an item is an array, concat flatten(item); otherwise push the item.',
    solution: `function flatten(arr) {
  const out = [];
  for (const item of arr) {
    if (Array.isArray(item)) out.push(...flatten(item));
    else out.push(item);
  }
  return out;
}`,
    explanation:
      'Recursion follows nested arrays until primitives remain. Array.isArray avoids flattening objects.',
    timeComplexity: 'O(n) where n is the total number of primitive elements plus nested arrays visited',
    spaceComplexity: 'O(d) call stack for depth d, plus O(n) for the result',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-06',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Remove Duplicates Without Set',
    description:
      'Return a new array with duplicates removed, keeping first occurrences. Do not use Set.',
    functionSignature: 'function unique(arr) { /* ... */ }',
    examples: [
      { input: 'unique([1, 2, 1, 3, 2])', output: '[1, 2, 3]' },
      { input: 'unique(["x", "x", "y"])', output: '["x", "y"]' },
    ],
    constraints: ['Do not mutate the original array.', 'Use === comparison.'],
    edgeCases: ['Empty array', 'No duplicates', 'All duplicates'],
    approach: 'Track seen values with an object or Map (allowed) while building the result.',
    solution: `function unique(arr) {
  const seen = Object.create(null);
  const out = [];
  for (const value of arr) {
    const key = typeof value + ":" + String(value);
    if (seen[key]) continue;
    seen[key] = true;
    out.push(value);
  }
  return out;
}`,
    explanation:
      'A lookup table gives O(1) average checks. Prefixing typeof avoids colliding 1 and "1". A Map can store the raw values instead.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-07',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Valid Parentheses',
    description:
      'Given a string containing only (), {}, and [], return whether it is valid: every opener is closed by the matching type in the correct order.',
    functionSignature: 'function isValidParentheses(s) { /* ... */ }',
    examples: [
      { input: 'isValidParentheses("()[]{}")', output: 'true' },
      { input: 'isValidParentheses("(]")', output: 'false' },
      { input: 'isValidParentheses("({[]})")', output: 'true' },
    ],
    constraints: ['s contains only the six bracket characters or is empty.', 'Empty string is valid.'],
    edgeCases: ['Only closers', 'Extra opener at the end', 'Wrong nesting "([)]"'],
    approach:
      'Use a stack. Push openers. On a closer, pop and check the match. The string is valid if the stack is empty at the end.',
    solution: `function isValidParentheses(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}`,
    explanation:
      'A stack models nested structure. Wrong order or leftover openers fail the checks.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-08',
    category: 'javascript-core',
    difficulty: 'medium',
    title: 'Reverse Words',
    description:
      'Reverse the order of words in a sentence. Words are separated by spaces. Collapse multiple spaces into one and trim the result.',
    functionSignature: 'function reverseWords(s) { /* ... */ }',
    examples: [
      { input: 'reverseWords("the sky is blue")', output: '"blue is sky the"' },
      { input: 'reverseWords("  hello   world  ")', output: '"world hello"' },
    ],
    constraints: ['s is a string.', 'Words contain no spaces.'],
    edgeCases: ['Leading/trailing spaces', 'Single word', 'Empty / all spaces → ""'],
    approach: 'Trim, split on one or more spaces, reverse the words array, join with a single space.',
    solution: `function reverseWords(s) {
  return s.trim().split(/\\s+/).filter(Boolean).reverse().join(" ");
}`,
    explanation:
      'Splitting on whitespace tokens isolates words; reversing the token list reverses sentence order without reversing letters inside words.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-09',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Character Frequency',
    description:
      'Return an object mapping each character in the string to its count. Ignore spaces. Treat uppercase and lowercase as the same character.',
    functionSignature: 'function charFrequency(s) { /* ... */ }',
    examples: [
      { input: 'charFrequency("Hello World")', output: '{ h:1, e:1, l:3, o:2, w:1, r:1, d:1 }' },
    ],
    constraints: ['Count letters after lowercasing.', 'You may ignore non-letters or count them; state your choice. Preferred: letters only.'],
    edgeCases: ['Empty string', 'Only spaces', 'Repeated same letter'],
    approach: 'Normalize, skip spaces, increment a map for each remaining character.',
    solution: `function charFrequency(s) {
  const out = {};
  for (const ch of s.toLowerCase()) {
    if (ch === " ") continue;
    out[ch] = (out[ch] || 0) + 1;
  }
  return out;
}`,
    explanation: 'One pass builds histograms. Skipping spaces matches the spec.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-10',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Array Intersection',
    description:
      'Return the unique values that appear in both arrays, in the order they first appear in arrA. Use a hash map / object, not nested loops as the main strategy.',
    functionSignature: 'function intersection(arrA, arrB) { /* ... */ }',
    examples: [
      { input: 'intersection([1, 2, 2, 3], [2, 4, 2])', output: '[2]' },
      { input: 'intersection(["a", "b"], ["b", "c", "a"])', output: '["a", "b"]' },
    ],
    constraints: ['Values comparable with ===.', 'Result must not contain duplicates.'],
    edgeCases: ['No overlap', 'Empty input', 'Duplicates in both arrays'],
    approach: 'Put arrB into a Set/Map, then walk arrA and emit a value the first time it is seen and exists in arrB.',
    solution: `function intersection(arrA, arrB) {
  const inB = new Map();
  for (const v of arrB) inB.set(v, true);
  const used = new Map();
  const out = [];
  for (const v of arrA) {
    if (inB.has(v) && !used.has(v)) {
      used.set(v, true);
      out.push(v);
    }
  }
  return out;
}`,
    explanation:
      'Set membership is average O(1). Walking arrA preserves its first-seen order.',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-11',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Find Missing Number',
    description:
      'nums contains n distinct integers taken from 0 to n inclusive, missing exactly one number. Return the missing number.',
    functionSignature: 'function missingNumber(nums) { /* ... */ }',
    examples: [
      { input: 'missingNumber([3, 0, 1])', output: '2' },
      { input: 'missingNumber([0, 1])', output: '2' },
    ],
    constraints: ['nums.length is n.', 'Values are unique and in [0, n].'],
    edgeCases: ['Missing 0', 'Missing n', 'n = 1'],
    approach:
      'Expected sum of 0..n is n(n+1)/2. Subtract the actual sum. XOR of all indices and values also works.',
    solution: `function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  let actual = 0;
  for (const x of nums) actual += x;
  return expected - actual;
}`,
    explanation: 'The difference between the arithmetic series and the array sum is the missing value.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-12',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Merge Sorted Arrays',
    description:
      'Merge two arrays that are already sorted in non-decreasing order into one sorted array. Do not use Array.prototype.sort.',
    functionSignature: 'function mergeSorted(a, b) { /* ... */ }',
    examples: [
      { input: 'mergeSorted([1, 3, 5], [2, 4, 6])', output: '[1, 2, 3, 4, 5, 6]' },
      { input: 'mergeSorted([], [1, 2])', output: '[1, 2]' },
    ],
    constraints: ['Inputs are sorted.', 'Stable merge is not required.'],
    edgeCases: ['One array empty', 'Duplicates across arrays', 'All a smaller than all b'],
    approach: 'Two pointers: take the smaller current head, then append leftovers.',
    solution: `function mergeSorted(a, b) {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++]);
    else out.push(b[j++]);
  }
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}`,
    explanation: 'This is the merge step of merge sort and runs in linear time.',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-13',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Implement a Stack',
    description:
      'Implement a Stack class or factory with push, pop, peek, and size. pop/peek on empty should return undefined (do not throw).',
    functionSignature:
      'function createStack() { return { push, pop, peek, size }; }',
    examples: [
      {
        input: 's.push(1); s.push(2); s.pop(); s.peek();',
        output: 'pop → 2, peek → 1, size → 1',
      },
    ],
    constraints: ['LIFO behavior required.', 'Use an array or linked list internally.'],
    edgeCases: ['pop on empty', 'peek on empty', 'size after mixed operations'],
    approach: 'Array push/pop at the end is an efficient stack.',
    solution: `function createStack() {
  const data = [];
  return {
    push(value) { data.push(value); },
    pop() { return data.pop(); },
    peek() { return data[data.length - 1]; },
    size() { return data.length; },
  };
}`,
    explanation: 'The last index is the top of the stack, matching LIFO.',
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(n) for n pushed items still stored',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-14',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Implement a Queue',
    description:
      'Implement a Queue with enqueue, dequeue, peek, and size. FIFO. dequeue/peek on empty return undefined.',
    functionSignature: 'function createQueue() { return { enqueue, dequeue, peek, size }; }',
    examples: [
      {
        input: 'q.enqueue("a"); q.enqueue("b"); q.dequeue();',
        output: '"a" (FIFO)',
      },
    ],
    constraints: ['Must not behave like a stack.', 'You may use an array; mention shift cost if you use it.'],
    edgeCases: ['dequeue empty', 'single element', 'interleaved enqueue/dequeue'],
    approach:
      'Array + head index avoids O(n) shift: enqueue at the end, dequeue by incrementing head. Optionally compact when head grows.',
    solution: `function createQueue() {
  const data = [];
  let head = 0;
  return {
    enqueue(value) { data.push(value); },
    dequeue() {
      if (head >= data.length) return undefined;
      const value = data[head++];
      if (head > 8 && head * 2 >= data.length) {
        data.splice(0, head);
        head = 0;
      }
      return value;
    },
    peek() { return head < data.length ? data[head] : undefined; },
    size() { return data.length - head; },
  };
}`,
    explanation:
      'A head pointer makes dequeue amortized cheap. Using only shift is acceptable if the student explains O(n).',
    timeComplexity: 'Amortized O(1) enqueue/dequeue with a head index; O(n) if using shift each time',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-15',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Detect Duplicate Values',
    description:
      'Return true if any value appears more than once in the array, otherwise false.',
    functionSignature: 'function hasDuplicate(arr) { /* ... */ }',
    examples: [
      { input: 'hasDuplicate([1, 2, 3, 1])', output: 'true' },
      { input: 'hasDuplicate([1, 2, 3])', output: 'false' },
    ],
    constraints: ['Use a hash map or similar; nested O(n^2) is not the expected solution.'],
    edgeCases: ['Empty array → false', 'Two identical items', 'Objects compared by === (reference)'],
    approach: 'Record seen values in a Map; if has(value) already, return true.',
    solution: `function hasDuplicate(arr) {
  const seen = new Map();
  for (const value of arr) {
    if (seen.has(value)) return true;
    seen.set(value, true);
  }
  return false;
}`,
    explanation: 'Constant-time lookups detect a repeat on the second occurrence.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-16',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Two Sum',
    description:
      'Return the indices of two numbers that add up to target. Each input has exactly one solution. You may not use the same element twice.',
    functionSignature: 'function twoSum(nums, target) { /* ... */ }',
    examples: [
      { input: 'twoSum([2, 7, 11, 15], 9)', output: '[0, 1]' },
      { input: 'twoSum([3, 2, 4], 6)', output: '[1, 2]' },
    ],
    constraints: ['Exactly one pair.', 'Return any order of the two indices unless specified; preferred: earlier index first.'],
    edgeCases: ['Target uses a duplicate value at two indices', 'Negative numbers'],
    approach:
      'While iterating, look up target - nums[i] in a Map of previously seen values to their indices.',
    solution: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}`,
    explanation: 'The complement of the current number must already have been stored if the pair exists earlier.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-17',
    category: 'javascript-core',
    difficulty: 'medium',
    title: 'Longest Word',
    description:
      'Return the longest word in a sentence. Words are separated by spaces. If there is a tie, return the first longest word. Ignore punctuation attached to words by stripping , . ! ? from the ends.',
    functionSignature: 'function longestWord(s) { /* ... */ }',
    examples: [
      { input: 'longestWord("I love JavaScript")', output: '"JavaScript"' },
      { input: 'longestWord("a bb cc")', output: '"bb"' },
    ],
    constraints: ['Return "" for empty / whitespace-only strings.'],
    edgeCases: ['Tie', 'Punctuation "hello,"', 'Single word'],
    approach: 'Split on spaces, strip punctuation, track the max-length word seen first.',
    solution: `function longestWord(s) {
  const words = s.split(/\\s+/).filter(Boolean);
  let best = "";
  for (const raw of words) {
    const word = raw.replace(/^[.,!?]+|[.,!?]+$/g, "");
    if (word.length > best.length) best = word;
  }
  return best;
}`,
    explanation: 'A linear scan keeps the first maximum because the condition is strictly greater than.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n) for the split array (O(1) extra besides that)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-18',
    category: 'javascript-core',
    difficulty: 'medium',
    title: 'Chunk Array',
    description:
      'Split an array into chunks of length size. The last chunk may be shorter. If size is less than 1, throw a RangeError.',
    functionSignature: 'function chunk(arr, size) { /* ... */ }',
    examples: [
      { input: 'chunk([1, 2, 3, 4, 5], 2)', output: '[[1, 2], [3, 4], [5]]' },
      { input: 'chunk([1, 2, 3], 5)', output: '[[1, 2, 3]]' },
    ],
    constraints: ['Do not mutate the original array.', 'size is an integer.'],
    edgeCases: ['Empty arr', 'size === 1', 'size invalid'],
    approach: 'Loop with index i += size and slice(i, i + size).',
    solution: `function chunk(arr, size) {
  if (size < 1) throw new RangeError("size must be >= 1");
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}`,
    explanation: 'slice copies each window without sharing mutable references to the source positions.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-19',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Rotate Array',
    description:
      'Rotate the array to the right by k steps. Return a new array (do not mutate the input). k may be larger than the length.',
    functionSignature: 'function rotateRight(arr, k) { /* ... */ }',
    examples: [
      { input: 'rotateRight([1, 2, 3, 4, 5], 2)', output: '[4, 5, 1, 2, 3]' },
      { input: 'rotateRight([1, 2], 5)', output: '[2, 1]' },
    ],
    constraints: ['k is a non-negative integer.', 'Empty array returns [].'],
    edgeCases: ['k = 0', 'k multiple of length', 'k > length'],
    approach: 'Let r = k % n. Concatenate arr.slice(-r) with arr.slice(0, n - r) when r !== 0.',
    solution: `function rotateRight(arr, k) {
  const n = arr.length;
  if (n === 0) return [];
  const r = k % n;
  if (r === 0) return arr.slice();
  return arr.slice(n - r).concat(arr.slice(0, n - r));
}`,
    explanation: 'Modulo handles large k. slice copies so the input stays unchanged.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-20',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Find First Duplicate',
    description:
      'Return the first value that has already appeared earlier in the array. If all values are unique, return null.',
    functionSignature: 'function firstDuplicate(arr) { /* ... */ }',
    examples: [
      { input: 'firstDuplicate([2, 1, 3, 5, 3, 2])', output: '3' },
      { input: 'firstDuplicate([1, 2, 3])', output: 'null' },
    ],
    constraints: ['"First duplicate" means the duplicate whose second occurrence has the smallest index.'],
    edgeCases: ['Duplicate at the beginning pattern [1,1]', 'No duplicates', 'Multiple duplicate pairs'],
    approach: 'Scan left to right; if the value is already in a Map, return it; else record it.',
    solution: `function firstDuplicate(arr) {
  const seen = new Map();
  for (const value of arr) {
    if (seen.has(value)) return value;
    seen.set(value, true);
  }
  return null;
}`,
    explanation:
      'The first time a value is already in seen, that second occurrence is the leftmost duplicate.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-21',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Balanced Brackets with Extra Text',
    description:
      'A string may contain letters and digits as well as (), [], {}. Ignore non-brackets. Return true if the remaining brackets are balanced and correctly nested.',
    functionSignature: 'function bracketsBalanced(s) { /* ... */ }',
    examples: [
      { input: 'bracketsBalanced("a(b[c]{d}e)f")', output: 'true' },
      { input: 'bracketsBalanced("a(b[c)d]")', output: 'false' },
    ],
    constraints: ['Non-bracket characters must not affect the result.'],
    edgeCases: ['No brackets → true', 'Unmatched closer among letters', 'Nested mixed types'],
    approach: 'Same stack algorithm as valid parentheses, skipping characters that are not brackets.',
    solution: `function bracketsBalanced(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const open = new Set(["(", "[", "{"]);
  const stack = [];
  for (const ch of s) {
    if (open.has(ch)) stack.push(ch);
    else if (pairs[ch]) {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}`,
    explanation: 'Filtering non-brackets reduces the problem to classic stack matching.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-22',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Simple Graph BFS',
    description:
      'The graph is an adjacency list object: { A: ["B", "C"], B: ["D"], C: [], D: [] }. Return the BFS visit order starting from start. Neighbors are visited in the array order given. Do not visit a node twice.',
    functionSignature: 'function bfs(graph, start) { /* ... */ }',
    examples: [
      {
        input: 'bfs({ A: ["B", "C"], B: ["D"], C: [], D: [] }, "A")',
        output: '["A", "B", "C", "D"]',
      },
    ],
    constraints: ['Graph is finite and may contain cycles.', 'start is always a key in graph.'],
    edgeCases: ['Disconnected nodes not reachable from start should not appear', 'Self-loop', 'Single node'],
    approach:
      'Queue + visited set. Shift the front, append unvisited neighbors. Record order when a node is first taken/enqueued consistently.',
    solution: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of graph[node] || []) {
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}`,
    explanation:
      'Marking visited when enqueueing prevents the same node from being queued twice in cyclic graphs.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-23',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Count Pairs with Target Sum',
    description:
      'Count the number of unique index pairs (i, j) with i < j and nums[i] + nums[j] === target. Use a hash map, not O(n^2) nested loops as the required solution.',
    functionSignature: 'function countPairs(nums, target) { /* ... */ }',
    examples: [
      { input: 'countPairs([1, 5, 3, 3, 3], 6)', output: '4', explanation: '1+5 and three pairs of 3+3' },
    ],
    constraints: ['nums contains integers.', 'Pairs are unordered index pairs counted once.'],
    edgeCases: ['No pairs', 'Many duplicates', 'Negatives'],
    approach:
      'As you walk the array, add how many times (target - x) has already been seen, then increment the count of x.',
    solution: `function countPairs(nums, target) {
  const seen = new Map();
  let pairs = 0;
  for (const x of nums) {
    const need = target - x;
    pairs += seen.get(need) || 0;
    seen.set(x, (seen.get(x) || 0) + 1);
  }
  return pairs;
}`,
    explanation:
      'Each new value forms a pair with every previous complement, so duplicates are counted correctly.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-24',
    category: 'javascript-core',
    difficulty: 'medium',
    title: 'Deep Clone (JSON-safe values)',
    description:
      'Implement deepClone(value) for JSON-safe data: objects, arrays, strings, numbers, booleans, and null. Nested objects/arrays must not share references with the input. You may not use structuredClone or JSON.parse(JSON.stringify). Functions and undefined may be ignored or copied by reference; document your choice. Preferred: skip keys whose value is undefined; clone null as null.',
    functionSignature: 'function deepClone(value) { /* ... */ }',
    examples: [
      {
        input: 'const a = { n: 1, nested: { ok: true }, list: [1, 2] }; const b = deepClone(a); b.nested.ok = false;',
        output: 'a.nested.ok stays true',
      },
    ],
    constraints: ['No circular references in the input.', 'Do not mutate the original.'],
    edgeCases: ['null vs {}', 'Empty array', 'Nested arrays of objects'],
    approach:
      'If Array.isArray, map deepClone. If object and not null, copy keys recursively. Otherwise return primitives as-is.',
    solution: `function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item) => deepClone(item));
  const out = {};
  for (const key of Object.keys(value)) {
    if (value[key] === undefined) continue;
    out[key] = deepClone(value[key]);
  }
  return out;
}`,
    explanation:
      'Recursion creates new containers at every level so nested mutations do not leak back.',
    timeComplexity: 'O(n) nodes in the value tree',
    spaceComplexity: 'O(n) plus O(d) stack depth',
    rubric: [...STANDARD_RUBRIC],
  },
  {
    id: 'prob-25',
    category: 'dsa',
    difficulty: 'medium',
    title: 'Binary Search',
    description:
      'Implement binarySearch(arr, target) on a sorted array in non-decreasing order. Return the index of target, or -1 if it is missing. If duplicates exist, return any valid index. Do not use indexOf or a linear scan as the main algorithm.',
    functionSignature: 'function binarySearch(arr, target) { /* ... */ }',
    examples: [
      { input: 'binarySearch([1, 3, 5, 7, 9], 7)', output: '3' },
      { input: 'binarySearch([1, 3, 5, 7, 9], 2)', output: '-1' },
    ],
    constraints: ['arr is sorted ascending.', 'n can be 0.'],
    edgeCases: ['Empty array', 'Target is first or last', 'All equal values'],
    approach:
      'Maintain lo/hi inclusive bounds. Compare mid; if too small, lo = mid + 1; if too large, hi = mid - 1.',
    solution: `function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    explanation:
      'Each step discards half of the remaining range, which is logarithmic. Mid must be recomputed each iteration.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    rubric: [...STANDARD_RUBRIC],
  },
]
