/**
 * Pattern detection for Two Sum problem
 * Detects code patterns and returns structured signal for feedback
 */

export const detectPatterns = (code) => {
  return {
    hasLoop: code.includes("for") || code.includes("while"),
    hasNestedLoop: !!(code.match(/for[\s\S]*for/) || code.match(/while[\s\S]*while/)),
    hasMap:
      code.includes("unordered_map") ||
      code.includes("map<") ||
      code.includes("HashMap") ||
      code.includes("{") ||
      code.includes("[") ||
      code.includes("dict") ||
      code.includes("set"),
    hasHashSet:
      code.includes("unordered_set") ||
      code.includes("set<") ||
      code.includes("HashSet") ||
      code.includes("set("),
    hasFunction:
      code.includes("def ") ||
      code.includes("function") ||
      code.includes("=>"),
    isEmpty: code.trim().length === 0,
  };
};

/**
 * Generate feedback for Two Sum problem based on detected patterns
 * Can optionally use hints from problemData
 */
export const generateTwoSumFeedback = (patterns, problemData = null) => {
  if (patterns.isEmpty) {
    return null;
  }

  // Nested loop detected - brute force approach
  if (patterns.hasNestedLoop) {
    // Could use: problemData?.hints[0] if available
    return "You're checking all pairs. This works, but the time complexity is O(n²). Can you remember previous values to avoid repeated checks?";
  }

  // HashMap/dict detected - optimized approach
  if (patterns.hasMap && !patterns.hasNestedLoop && patterns.hasLoop) {
    // Could use: problemData?.hints[2] if available
    return "Nice! Using a hash data structure helps reduce the time complexity to O(n). This is the optimized approach!";
  }

  // Only has a loop (single)
  if (patterns.hasLoop && !patterns.hasNestedLoop && !patterns.hasMap) {
    // Could use: problemData?.hints[1] if available
    return "You're iterating through the array. Can you store previous values in a hash data structure to avoid repeated checks?";
  }

  // Has function but no implementation yet
  if (patterns.hasFunction && !patterns.hasLoop) {
    return "Great! You're defining a function. Now think about the approach: should you check all pairs or use a smarter strategy?";
  }

  // Generic code started
  if (patterns.hasFunction) {
    return "Good start! Now implement your algorithm. Think about: do you need nested loops or can you use a data structure to speed things up?";
  }

  return null;
};
