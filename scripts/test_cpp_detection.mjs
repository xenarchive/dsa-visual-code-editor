import { detectPatterns, generateTwoSumFeedback } from '../src/utils/patternDetector.js';

const cppSample = `#include <bits/stdc++.h>
using namespace std;

bool findPair(vector<int>& arr, int target) {
  unordered_set<int> s;
  for (int x : arr) {
    if (s.find(target - x) != s.end()) return true;
    s.insert(x);
  }
  return false;
}

int main() {
  vector<int> arr = {0, -1, 2, -3, 1};
  cout << (findPair(arr, -2) ? "true" : "false") << endl;
}
`;

console.log('C++ sample detection:');
const detection = detectPatterns(cppSample);
console.log(JSON.stringify(detection, null, 2));
console.log('\nFeedback:', generateTwoSumFeedback(detection, 0));
