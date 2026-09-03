// Auto-generated student-facing question data. Instructor answers are not included.
// Regenerate with: npm run split:bank

import type { StudentProblemQuestion } from '../../types/exam'

export const studentProblemQuestions: StudentProblemQuestion[] = [
  {
    "id": "prob-01",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Anagram Checker",
    "description": "Write a function areAnagrams(a, b) that returns true if the two strings contain the same characters with the same frequencies. Ignore spaces and letter case. Do not use Array.prototype.sort in the required solution (you may mention a sort-based approach as an alternative).",
    "functionSignature": "function areAnagrams(a, b) { /* ... */ }",
    "examples": [
      {
        "input": "areAnagrams(\"listen\", \"silent\")",
        "output": "true"
      },
      {
        "input": "areAnagrams(\"hello\", \"world\")",
        "output": "false"
      },
      {
        "input": "areAnagrams(\"Dormitory\", \"dirty room\")",
        "output": "true"
      }
    ],
    "constraints": [
      "Inputs are strings (may contain spaces and mixed case).",
      "Only alphabetic characters need to match; ignore spaces.",
      "Empty strings: two empty strings (or only spaces) are anagrams."
    ],
    "edgeCases": [
      "Different lengths after removing spaces",
      "Repeated letters (e.g. \"aab\" vs \"aba\")",
      "All spaces"
    ]
  },
  {
    "id": "prob-02",
    "category": "dsa",
    "difficulty": "medium",
    "title": "First Non-Repeating Character",
    "description": "Return the first character that appears exactly once in the string. If every character repeats, return null.",
    "functionSignature": "function firstNonRepeatingChar(s) { /* ... */ }",
    "examples": [
      {
        "input": "firstNonRepeatingChar(\"aabbcddee\")",
        "output": "\"c\""
      },
      {
        "input": "firstNonRepeatingChar(\"aabb\")",
        "output": "null"
      },
      {
        "input": "firstNonRepeatingChar(\"javascript\")",
        "output": "\"j\""
      }
    ],
    "constraints": [
      "s is a string of printable characters.",
      "Comparison is case-sensitive."
    ],
    "edgeCases": [
      "Empty string → null",
      "Single character",
      "All unique (return the first char)"
    ]
  },
  {
    "id": "prob-03",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Most Frequent Element",
    "description": "Given an array of primitives, return the element that appears most often. If there is a tie, return the one that appears first in the array.",
    "functionSignature": "function mostFrequent(arr) { /* ... */ }",
    "examples": [
      {
        "input": "mostFrequent([1, 3, 1, 3, 2, 1])",
        "output": "1"
      },
      {
        "input": "mostFrequent([\"a\", \"b\", \"b\", \"a\"])",
        "output": "\"a\""
      }
    ],
    "constraints": [
      "arr length is at least 1.",
      "Elements are comparable with ===."
    ],
    "edgeCases": [
      "All unique → first element",
      "Tie between two values"
    ]
  },
  {
    "id": "prob-04",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Group Values by Frequency",
    "description": "Return an object (or Map) grouping array values by how many times they occur. Keys are frequencies (as numbers); values are arrays of unique items that have that frequency, in first-seen order.",
    "functionSignature": "function groupByFrequency(arr) { /* ... */ }",
    "examples": [
      {
        "input": "groupByFrequency([\"a\", \"b\", \"a\", \"c\", \"b\", \"a\"])",
        "output": "{ 3: [\"a\"], 2: [\"b\"], 1: [\"c\"] }"
      }
    ],
    "constraints": [
      "arr may be empty (return {}).",
      "Use === for identity."
    ],
    "edgeCases": [
      "Empty array",
      "All items unique",
      "One item repeated"
    ]
  },
  {
    "id": "prob-05",
    "category": "javascript-core",
    "difficulty": "medium",
    "title": "Flatten Nested Arrays",
    "description": "Implement flatten(arr) that recursively flattens nested arrays to any depth. Do not use Array.prototype.flat.",
    "functionSignature": "function flatten(arr) { /* ... */ }",
    "examples": [
      {
        "input": "flatten([1, [2, [3, 4], 5]])",
        "output": "[1, 2, 3, 4, 5]"
      },
      {
        "input": "flatten([[[\"a\"]]])",
        "output": "[\"a\"]"
      }
    ],
    "constraints": [
      "Only arrays should be flattened; other values stay as elements.",
      "Depth is finite."
    ],
    "edgeCases": [
      "Empty arrays",
      "Already flat arrays",
      "Holes can be ignored or skipped"
    ]
  },
  {
    "id": "prob-06",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Remove Duplicates Without Set",
    "description": "Return a new array with duplicates removed, keeping first occurrences. Do not use Set.",
    "functionSignature": "function unique(arr) { /* ... */ }",
    "examples": [
      {
        "input": "unique([1, 2, 1, 3, 2])",
        "output": "[1, 2, 3]"
      },
      {
        "input": "unique([\"x\", \"x\", \"y\"])",
        "output": "[\"x\", \"y\"]"
      }
    ],
    "constraints": [
      "Do not mutate the original array.",
      "Use === comparison."
    ],
    "edgeCases": [
      "Empty array",
      "No duplicates",
      "All duplicates"
    ]
  },
  {
    "id": "prob-07",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Valid Parentheses",
    "description": "Given a string containing only (), {}, and [], return whether it is valid: every opener is closed by the matching type in the correct order.",
    "functionSignature": "function isValidParentheses(s) { /* ... */ }",
    "examples": [
      {
        "input": "isValidParentheses(\"()[]{}\")",
        "output": "true"
      },
      {
        "input": "isValidParentheses(\"(]\")",
        "output": "false"
      },
      {
        "input": "isValidParentheses(\"({[]})\")",
        "output": "true"
      }
    ],
    "constraints": [
      "s contains only the six bracket characters or is empty.",
      "Empty string is valid."
    ],
    "edgeCases": [
      "Only closers",
      "Extra opener at the end",
      "Wrong nesting \"([)]\""
    ]
  },
  {
    "id": "prob-08",
    "category": "javascript-core",
    "difficulty": "medium",
    "title": "Reverse Words",
    "description": "Reverse the order of words in a sentence. Words are separated by spaces. Collapse multiple spaces into one and trim the result.",
    "functionSignature": "function reverseWords(s) { /* ... */ }",
    "examples": [
      {
        "input": "reverseWords(\"the sky is blue\")",
        "output": "\"blue is sky the\""
      },
      {
        "input": "reverseWords(\"  hello   world  \")",
        "output": "\"world hello\""
      }
    ],
    "constraints": [
      "s is a string.",
      "Words contain no spaces."
    ],
    "edgeCases": [
      "Leading/trailing spaces",
      "Single word",
      "Empty / all spaces → \"\""
    ]
  },
  {
    "id": "prob-09",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Character Frequency",
    "description": "Return an object mapping each character in the string to its count. Ignore spaces. Treat uppercase and lowercase as the same character.",
    "functionSignature": "function charFrequency(s) { /* ... */ }",
    "examples": [
      {
        "input": "charFrequency(\"Hello World\")",
        "output": "{ h:1, e:1, l:3, o:2, w:1, r:1, d:1 }"
      }
    ],
    "constraints": [
      "Count letters after lowercasing.",
      "You may ignore non-letters or count them; state your choice. Preferred: letters only."
    ],
    "edgeCases": [
      "Empty string",
      "Only spaces",
      "Repeated same letter"
    ]
  },
  {
    "id": "prob-10",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Array Intersection",
    "description": "Return the unique values that appear in both arrays, in the order they first appear in arrA. Use a hash map / object, not nested loops as the main strategy.",
    "functionSignature": "function intersection(arrA, arrB) { /* ... */ }",
    "examples": [
      {
        "input": "intersection([1, 2, 2, 3], [2, 4, 2])",
        "output": "[2]"
      },
      {
        "input": "intersection([\"a\", \"b\"], [\"b\", \"c\", \"a\"])",
        "output": "[\"a\", \"b\"]"
      }
    ],
    "constraints": [
      "Values comparable with ===.",
      "Result must not contain duplicates."
    ],
    "edgeCases": [
      "No overlap",
      "Empty input",
      "Duplicates in both arrays"
    ]
  },
  {
    "id": "prob-11",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Find Missing Number",
    "description": "nums contains n distinct integers taken from 0 to n inclusive, missing exactly one number. Return the missing number.",
    "functionSignature": "function missingNumber(nums) { /* ... */ }",
    "examples": [
      {
        "input": "missingNumber([3, 0, 1])",
        "output": "2"
      },
      {
        "input": "missingNumber([0, 1])",
        "output": "2"
      }
    ],
    "constraints": [
      "nums.length is n.",
      "Values are unique and in [0, n]."
    ],
    "edgeCases": [
      "Missing 0",
      "Missing n",
      "n = 1"
    ]
  },
  {
    "id": "prob-12",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Merge Sorted Arrays",
    "description": "Merge two arrays that are already sorted in non-decreasing order into one sorted array. Do not use Array.prototype.sort.",
    "functionSignature": "function mergeSorted(a, b) { /* ... */ }",
    "examples": [
      {
        "input": "mergeSorted([1, 3, 5], [2, 4, 6])",
        "output": "[1, 2, 3, 4, 5, 6]"
      },
      {
        "input": "mergeSorted([], [1, 2])",
        "output": "[1, 2]"
      }
    ],
    "constraints": [
      "Inputs are sorted.",
      "Stable merge is not required."
    ],
    "edgeCases": [
      "One array empty",
      "Duplicates across arrays",
      "All a smaller than all b"
    ]
  },
  {
    "id": "prob-13",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Implement a Stack",
    "description": "Implement a Stack class or factory with push, pop, peek, and size. pop/peek on empty should return undefined (do not throw).",
    "functionSignature": "function createStack() { return { push, pop, peek, size }; }",
    "examples": [
      {
        "input": "s.push(1); s.push(2); s.pop(); s.peek();",
        "output": "pop → 2, peek → 1, size → 1"
      }
    ],
    "constraints": [
      "LIFO behavior required.",
      "Use an array or linked list internally."
    ],
    "edgeCases": [
      "pop on empty",
      "peek on empty",
      "size after mixed operations"
    ]
  },
  {
    "id": "prob-14",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Implement a Queue",
    "description": "Implement a Queue with enqueue, dequeue, peek, and size. FIFO. dequeue/peek on empty return undefined.",
    "functionSignature": "function createQueue() { return { enqueue, dequeue, peek, size }; }",
    "examples": [
      {
        "input": "q.enqueue(\"a\"); q.enqueue(\"b\"); q.dequeue();",
        "output": "\"a\" (FIFO)"
      }
    ],
    "constraints": [
      "Must not behave like a stack.",
      "You may use an array; mention shift cost if you use it."
    ],
    "edgeCases": [
      "dequeue empty",
      "single element",
      "interleaved enqueue/dequeue"
    ]
  },
  {
    "id": "prob-15",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Detect Duplicate Values",
    "description": "Return true if any value appears more than once in the array, otherwise false.",
    "functionSignature": "function hasDuplicate(arr) { /* ... */ }",
    "examples": [
      {
        "input": "hasDuplicate([1, 2, 3, 1])",
        "output": "true"
      },
      {
        "input": "hasDuplicate([1, 2, 3])",
        "output": "false"
      }
    ],
    "constraints": [
      "Use a hash map or similar; nested O(n^2) is not the expected solution."
    ],
    "edgeCases": [
      "Empty array → false",
      "Two identical items",
      "Objects compared by === (reference)"
    ]
  },
  {
    "id": "prob-16",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Two Sum",
    "description": "Return the indices of two numbers that add up to target. Each input has exactly one solution. You may not use the same element twice.",
    "functionSignature": "function twoSum(nums, target) { /* ... */ }",
    "examples": [
      {
        "input": "twoSum([2, 7, 11, 15], 9)",
        "output": "[0, 1]"
      },
      {
        "input": "twoSum([3, 2, 4], 6)",
        "output": "[1, 2]"
      }
    ],
    "constraints": [
      "Exactly one pair.",
      "Return any order of the two indices unless specified; preferred: earlier index first."
    ],
    "edgeCases": [
      "Target uses a duplicate value at two indices",
      "Negative numbers"
    ]
  },
  {
    "id": "prob-17",
    "category": "javascript-core",
    "difficulty": "medium",
    "title": "Longest Word",
    "description": "Return the longest word in a sentence. Words are separated by spaces. If there is a tie, return the first longest word. Ignore punctuation attached to words by stripping , . ! ? from the ends.",
    "functionSignature": "function longestWord(s) { /* ... */ }",
    "examples": [
      {
        "input": "longestWord(\"I love JavaScript\")",
        "output": "\"JavaScript\""
      },
      {
        "input": "longestWord(\"a bb cc\")",
        "output": "\"bb\""
      }
    ],
    "constraints": [
      "Return \"\" for empty / whitespace-only strings."
    ],
    "edgeCases": [
      "Tie",
      "Punctuation \"hello,\"",
      "Single word"
    ]
  },
  {
    "id": "prob-18",
    "category": "javascript-core",
    "difficulty": "medium",
    "title": "Chunk Array",
    "description": "Split an array into chunks of length size. The last chunk may be shorter. If size is less than 1, throw a RangeError.",
    "functionSignature": "function chunk(arr, size) { /* ... */ }",
    "examples": [
      {
        "input": "chunk([1, 2, 3, 4, 5], 2)",
        "output": "[[1, 2], [3, 4], [5]]"
      },
      {
        "input": "chunk([1, 2, 3], 5)",
        "output": "[[1, 2, 3]]"
      }
    ],
    "constraints": [
      "Do not mutate the original array.",
      "size is an integer."
    ],
    "edgeCases": [
      "Empty arr",
      "size === 1",
      "size invalid"
    ]
  },
  {
    "id": "prob-19",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Rotate Array",
    "description": "Rotate the array to the right by k steps. Return a new array (do not mutate the input). k may be larger than the length.",
    "functionSignature": "function rotateRight(arr, k) { /* ... */ }",
    "examples": [
      {
        "input": "rotateRight([1, 2, 3, 4, 5], 2)",
        "output": "[4, 5, 1, 2, 3]"
      },
      {
        "input": "rotateRight([1, 2], 5)",
        "output": "[2, 1]"
      }
    ],
    "constraints": [
      "k is a non-negative integer.",
      "Empty array returns []."
    ],
    "edgeCases": [
      "k = 0",
      "k multiple of length",
      "k > length"
    ]
  },
  {
    "id": "prob-20",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Find First Duplicate",
    "description": "Return the first value that has already appeared earlier in the array. If all values are unique, return null.",
    "functionSignature": "function firstDuplicate(arr) { /* ... */ }",
    "examples": [
      {
        "input": "firstDuplicate([2, 1, 3, 5, 3, 2])",
        "output": "3"
      },
      {
        "input": "firstDuplicate([1, 2, 3])",
        "output": "null"
      }
    ],
    "constraints": [
      "\"First duplicate\" means the duplicate whose second occurrence has the smallest index."
    ],
    "edgeCases": [
      "Duplicate at the beginning pattern [1,1]",
      "No duplicates",
      "Multiple duplicate pairs"
    ]
  },
  {
    "id": "prob-21",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Balanced Brackets with Extra Text",
    "description": "A string may contain letters and digits as well as (), [], {}. Ignore non-brackets. Return true if the remaining brackets are balanced and correctly nested.",
    "functionSignature": "function bracketsBalanced(s) { /* ... */ }",
    "examples": [
      {
        "input": "bracketsBalanced(\"a(b[c]{d}e)f\")",
        "output": "true"
      },
      {
        "input": "bracketsBalanced(\"a(b[c)d]\")",
        "output": "false"
      }
    ],
    "constraints": [
      "Non-bracket characters must not affect the result."
    ],
    "edgeCases": [
      "No brackets → true",
      "Unmatched closer among letters",
      "Nested mixed types"
    ]
  },
  {
    "id": "prob-22",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Simple Graph BFS",
    "description": "The graph is an adjacency list object: { A: [\"B\", \"C\"], B: [\"D\"], C: [], D: [] }. Return the BFS visit order starting from start. Neighbors are visited in the array order given. Do not visit a node twice.",
    "functionSignature": "function bfs(graph, start) { /* ... */ }",
    "examples": [
      {
        "input": "bfs({ A: [\"B\", \"C\"], B: [\"D\"], C: [], D: [] }, \"A\")",
        "output": "[\"A\", \"B\", \"C\", \"D\"]"
      }
    ],
    "constraints": [
      "Graph is finite and may contain cycles.",
      "start is always a key in graph."
    ],
    "edgeCases": [
      "Disconnected nodes not reachable from start should not appear",
      "Self-loop",
      "Single node"
    ]
  },
  {
    "id": "prob-23",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Count Pairs with Target Sum",
    "description": "Count the number of unique index pairs (i, j) with i < j and nums[i] + nums[j] === target. Use a hash map, not O(n^2) nested loops as the required solution.",
    "functionSignature": "function countPairs(nums, target) { /* ... */ }",
    "examples": [
      {
        "input": "countPairs([1, 5, 3, 3, 3], 6)",
        "output": "4",
        "explanation": "1+5 and three pairs of 3+3"
      }
    ],
    "constraints": [
      "nums contains integers.",
      "Pairs are unordered index pairs counted once."
    ],
    "edgeCases": [
      "No pairs",
      "Many duplicates",
      "Negatives"
    ]
  },
  {
    "id": "prob-24",
    "category": "javascript-core",
    "difficulty": "medium",
    "title": "Deep Clone (JSON-safe values)",
    "description": "Implement deepClone(value) for JSON-safe data: objects, arrays, strings, numbers, booleans, and null. Nested objects/arrays must not share references with the input. You may not use structuredClone or JSON.parse(JSON.stringify). Functions and undefined may be ignored or copied by reference; document your choice. Preferred: skip keys whose value is undefined; clone null as null.",
    "functionSignature": "function deepClone(value) { /* ... */ }",
    "examples": [
      {
        "input": "const a = { n: 1, nested: { ok: true }, list: [1, 2] }; const b = deepClone(a); b.nested.ok = false;",
        "output": "a.nested.ok stays true"
      }
    ],
    "constraints": [
      "No circular references in the input.",
      "Do not mutate the original."
    ],
    "edgeCases": [
      "null vs {}",
      "Empty array",
      "Nested arrays of objects"
    ]
  },
  {
    "id": "prob-25",
    "category": "dsa",
    "difficulty": "medium",
    "title": "Binary Search",
    "description": "Implement binarySearch(arr, target) on a sorted array in non-decreasing order. Return the index of target, or -1 if it is missing. If duplicates exist, return any valid index. Do not use indexOf or a linear scan as the main algorithm.",
    "functionSignature": "function binarySearch(arr, target) { /* ... */ }",
    "examples": [
      {
        "input": "binarySearch([1, 3, 5, 7, 9], 7)",
        "output": "3"
      },
      {
        "input": "binarySearch([1, 3, 5, 7, 9], 2)",
        "output": "-1"
      }
    ],
    "constraints": [
      "arr is sorted ascending.",
      "n can be 0."
    ],
    "edgeCases": [
      "Empty array",
      "Target is first or last",
      "All equal values"
    ]
  }
]
