import { detectPatterns, generateTwoSumFeedback } from '../src/utils/patternDetector.js';
import fs from 'fs';
import { execSync } from 'child_process';

const code = `function twoSum(arr, target) {

    // Create a Set to store the elements
    let set = new Set();

    for (let num of arr) {
    
        // Calculate the complement that added to
        // num, equals the target
        let complement = target - num;

        // Check if the complement exists in the set
        if (set.has(complement)) {
            return true;
        }

        // Add the current element to the set
        set.add(num);
    }
    // If no pair is found
    return false;
}

// Driver Code
let arr = [0, -1, 2, -3, 1];
let target = -2;

if (twoSum(arr, target))
    console.log("true");
else 
    console.log("false");
`;

console.log('--- Running pattern detection ---');
const detection = detectPatterns(code);
console.log(JSON.stringify(detection, null, 2));

console.log('\n--- Feedback (hintLevel=0) ---');
console.log(generateTwoSumFeedback(detection, 0));

// Save code to a temp file and execute it with node
const tmpPath = './scripts/tmp_snippet_run.js';
fs.writeFileSync(tmpPath, code);
console.log('\n--- Executing snippet with node ---');
try {
  const out = execSync(`node ${tmpPath}`, { encoding: 'utf8' });
  console.log(out);
} catch (err) {
  console.error('Execution error:', err.stdout || err.message);
}
// cleanup
fs.unlinkSync(tmpPath);
