import { detectPatterns, generateTwoSumFeedback } from '../src/utils/patternDetector.js';

const samples = [
  {
    name: 'bruteforce-js',
    code: `for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) return [i, j];
  }
}`,
  },
  {
    name: 'hashmap-js',
    code: `const map = new Map();
for (let i = 0; i < nums.length; i++) {
  const comp = target - nums[i];
  if (map.has(comp)) return [map.get(comp), i];
  map.set(nums[i], i);
}`,
  },
  {
    name: 'python-dict',
    code: `def twoSum(nums, target):
    d = {}
    for i, v in enumerate(nums):
        if target - v in d:
            return [d[target-v], i]
        d[v] = i
`,
  },
];

for (const s of samples) {
  const detection = detectPatterns(s.code);
  const feedback0 = generateTwoSumFeedback(detection, 0);
  const feedback2 = generateTwoSumFeedback(detection, 2);
  console.log('---', s.name, '---');
  console.log('detection:', JSON.stringify(detection, null, 2));
  console.log('feedback (hintLevel=0):', feedback0);
  console.log('feedback (hintLevel=2):', feedback2);
  console.log('\n');
}
