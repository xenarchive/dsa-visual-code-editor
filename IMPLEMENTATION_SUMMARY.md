# Pattern-Based Feedback System Implementation

## Overview
Your tutor now reacts to **meaningful code patterns** instead of generic triggers. This implementation locks to the **Two Sum problem** and provides smart, context-aware feedback.

## Changes Made

### 1. **App.jsx** - Problem Context State
✅ Added problem tracking:
```jsx
const [currentProblem, setCurrentProblem] = useState("two-sum");
const lastTutorRef = useRef(null);
```
- `currentProblem`: Tells the tutor which problem type to apply logic for
- `lastTutorRef`: Prevents spam by tracking the last message shown
- Passed `currentProblem` prop down to `CodeEditor`

### 2. **CodeEditor.jsx** - Pattern Detection Integration
✅ Replaced generic tutor logic with smart pattern detection:
```jsx
onChange={(value) => {
  setValue(value);
  
  // Pattern-based tutor logic for Two Sum
  if (!pushTutorMessage || currentProblem !== "two-sum") return;
  
  const patterns = detectPatterns(value);
  const feedback = generateTwoSumFeedback(patterns);
  
  if (feedback) {
    pushTutorMessage(feedback);
  }
}}
```

### 3. **New File: patternDetector.js** - Signal Extraction
✅ Created two core functions:

#### `detectPatterns(code)` - Extracts signals
Returns an object with detected patterns:
- `hasLoop`: Detects single loops (`for`/`while`)
- `hasNestedLoop`: Detects nested loops (advanced pattern)
- `hasMap`: Detects hash/dictionary data structures
- `hasHashSet`: Detects set data structures
- `hasFunction`: Detects function definitions
- `isEmpty`: Detects empty code

#### `generateTwoSumFeedback(patterns)` - Decision Logic
Routes to specific feedback based on pattern combinations:

| Pattern | Feedback |
|---------|----------|
| **Nested loops** | "You're checking all pairs. O(n²) brute force. Can you use a data structure?" |
| **Map + single loop** | "Nice! Hash data structure → O(n). This is the optimized approach!" |
| **Single loop only** | "Can you store previous values to avoid repeated checks?" |
| **Function but no loop** | "Great! Now think: all pairs or smarter strategy?" |
| **Just function** | "Implement your algorithm. Nested loops or data structure?" |

## How It Works

### Flow
```
User types code
    ↓
onChange fires
    ↓
detectPatterns(code) → extracts signals
    ↓
generateTwoSumFeedback(patterns) → generates message
    ↓
lastTutorRef prevents duplicate messages
    ↓
Tutor shows specific, contextual feedback
```

### Example Interactions
**User starts typing:**
```python
def two_sum(nums, target):
```
→ "Great! You're defining a function. Now think..."

**User adds nested loops:**
```python
def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
```
→ "You're checking all pairs. This works, but O(n²)..."

**User refactors with hashmap:**
```python
def two_sum(nums, target):
    seen = {}
    for num in nums:
        if target - num in seen:
```
→ "Nice! Using a hash data structure → O(n). Optimized!"

## Key Features

✨ **Smart Awareness**
- Tutor understands the problem context
- Feedback matches user's approach level
- Recognizes algorithmic patterns

🚫 **Anti-Spam**
- `lastTutorRef` prevents duplicate messages
- Only sends feedback when patterns change meaningfully

🔒 **Single-Problem Focus**
- Locked to Two Sum for now
- Clean, maintainable architecture
- Ready to scale to other problems later

📊 **Not AI**
- Simple pattern matching (regex + string includes)
- Deterministic and fast
- No external dependencies

## Next Steps (When Ready)

1. **Optional**: Connect to JSON hints
   ```jsx
   // Instead of hardcoded feedback:
   const feedback = problemData.hints[1];
   ```

2. **Scale**: Add second problem (Reverse Linked List)
   ```jsx
   if (currentProblem === "reverse-linked-list") {
     // Add detectLinkedListPatterns()
     // Add generateReverseLinkedListFeedback()
   }
   ```

3. **Polish**: Add visualization or execution feedback

4. **Advanced**: Only then consider AI enhancement

## Files Modified
- [App.jsx](src/App.jsx) - Problem state + anti-spam
- [CodeEditor.jsx](src/components/CodeEditor.jsx) - Pattern detection integration
- [patternDetector.js](src/utils/patternDetector.js) - NEW - Signal extraction + feedback logic

---

**Status**: ✅ COMPLETE
Your tutor now feels aware and intentional!
