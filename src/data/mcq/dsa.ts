import type { MCQQuestion } from '../../types/exam'

export const mcqDsa: MCQQuestion[] = [
  {
    id: 'mcq-dsa-01',
    category: 'dsa',
    difficulty: 'easy',
    question: 'What is the typical time complexity of accessing arr[i] on a JavaScript array used as a dense list?',
    options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
    correctAnswer: 1,
    explanation:
      'Index access on a dense array is constant time. The engine can compute the location of the element without scanning the whole list.',
  },
  {
    id: 'mcq-dsa-02',
    category: 'dsa',
    difficulty: 'easy',
    question: 'What is the time complexity of this function?',
    code: `function contains(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return true;
  }
  return false;
}`,
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correctAnswer: 2,
    explanation:
      'This is linear search. In the worst case it inspects every element, so it is O(n).',
  },
  {
    id: 'mcq-dsa-03',
    category: 'dsa',
    difficulty: 'easy',
    question: 'Which structure is LIFO?',
    options: ['Queue', 'Stack', 'Hash table only', 'Binary search tree only'],
    correctAnswer: 1,
    explanation:
      'A stack is Last-In, First-Out. A queue is FIFO. Hash tables and trees are not defined by LIFO order.',
  },
  {
    id: 'mcq-dsa-04',
    category: 'dsa',
    difficulty: 'medium',
    question: 'What is the time complexity of this nested loop?',
    code: `function countPairs(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] + arr[j] === 10) count++;
    }
  }
  return count;
}`,
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)'],
    correctAnswer: 2,
    explanation:
      'The inner loop runs n times for each of n outer iterations, so the work is quadratic: O(n^2).',
  },
  {
    id: 'mcq-dsa-05',
    category: 'dsa',
    difficulty: 'medium',
    question: 'Which implementation best matches a queue?',
    code: `// A
const q = [];
q.push(1);
q.pop();

// B
const q = [];
q.push(1);
q.shift();`,
    options: [
      'A, because pop removes from the back',
      'B, because push adds at the back and shift removes from the front (FIFO)',
      'Both are queues',
      'Neither; JavaScript cannot implement a queue',
    ],
    correctAnswer: 1,
    explanation:
      'FIFO needs enqueue at one end and dequeue at the other. push + shift (or unshift + pop) models a queue. push + pop is a stack.',
  },
  {
    id: 'mcq-dsa-06',
    category: 'dsa',
    difficulty: 'medium',
    question: 'Average-case lookup in a well-implemented hash table is:',
    options: ['O(n)', 'O(1)', 'O(n log n)', 'O(n^2)'],
    correctAnswer: 1,
    explanation:
      'A hash table maps a key to a bucket in expected constant time. Worst case can degrade to O(n) with collisions, but average case is O(1).',
  },
  {
    id: 'mcq-dsa-07',
    category: 'dsa',
    difficulty: 'medium',
    question: 'What does this linked-list traversal miss if head is the first node?',
    code: `function find(head, target) {
  let cur = head.next;
  while (cur) {
    if (cur.value === target) return true;
    cur = cur.next;
  }
  return false;
}`,
    options: [
      'It never terminates',
      'It skips the head node, so it can miss a match stored at head',
      'It always returns true',
      'It sorts the list first',
    ],
    correctAnswer: 1,
    explanation:
      'Starting at head.next ignores the first node. If the target is at the head, the function incorrectly returns false.',
  },
  {
    id: 'mcq-dsa-08',
    category: 'dsa',
    difficulty: 'medium',
    question: 'Which Big-O best describes binary search on a sorted array?',
    options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1) always'],
    correctAnswer: 1,
    explanation:
      'Binary search halves the remaining range each step, which is logarithmic: O(log n). The array must be sorted.',
  },
  {
    id: 'mcq-dsa-09',
    category: 'dsa',
    difficulty: 'medium',
    question: 'Which graph traversal uses a queue?',
    options: [
      'Depth-first search (typically stack/recursion)',
      'Breadth-first search',
      'Binary search',
      'Insertion sort',
    ],
    correctAnswer: 1,
    explanation:
      'BFS explores level by level and therefore uses a queue. DFS uses a stack or the call stack. Binary search and insertion sort are not graph traversals.',
  },
  {
    id: 'mcq-dsa-10',
    category: 'dsa',
    difficulty: 'hard',
    question: 'What is the time complexity of this Map-based two-sum?',
    code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}`,
    options: ['O(n^2) time, O(1) space', 'O(n) time, O(n) space', 'O(n log n) time, O(1) space', 'O(n) time, O(1) space'],
    correctAnswer: 1,
    explanation:
      'One pass does a constant-time Map lookup/insert per element, so time is O(n). The Map may store up to n entries, so space is O(n).',
  },
]
