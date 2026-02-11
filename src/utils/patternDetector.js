/**
 * Pattern detection for Two Sum problem
 * Detects code patterns and returns structured signal for feedback
 */

export const detectPatterns = (code) => {
  const patterns = {
    hasLoop: code.includes("for") || code.includes("while"),
    hasNestedLoop: !!(code.match(/for[\s\S]*for/) || code.match(/while[\s\S]*while/)),
    hasMap:
      code.includes("unordered_map") ||
      code.includes("std::unordered_map") ||
      code.includes("map<") ||
      code.includes("HashMap") ||
      code.includes("new Map") ||
      code.includes("Map(") ||
      code.includes("dict") ||
      code.includes("Dict"),
    hasHashSet:
      code.includes("unordered_set") ||
      code.includes("std::unordered_set") ||
      code.includes("set<") ||
      code.includes("HashSet") ||
      code.includes("set(") ||
      code.includes("new Set") ||
      code.includes("Set(") ||
      code.includes(".has(") ||
      code.includes(".add(") ||
      code.includes(".find(") ||
      code.includes("->find(") ||
      code.includes(".insert(") ||
      code.includes("->insert(") ||
      code.includes(".count(") ||
      code.includes("->count(") ||
      code.includes(".emplace(") ||
      code.includes("->emplace("),
    hasFunction:
      code.includes("def ") ||
      code.includes("function") ||
      code.includes("=>"),
    isEmpty: code.trim().length === 0,
  };

  // Explicit keyword checks for higher-confidence detection
  const explicitHashKeywords = [
    "unordered_map",
    "unordered_set",
    "HashMap",
    "HashSet",
    "new Map",
    "Map(",
    "new Set",
    "Set(",
    ".add(",
    ".set(",
    ".has(",
    "dict(",
    "dict ",
  ];

  const hasExplicitHash = explicitHashKeywords.some((k) => code.includes(k));

  const detectedStrategy = (patterns.hasMap || patterns.hasHashSet)
    ? "hashmap"
    : patterns.hasNestedLoop
    ? "bruteforce"
    : patterns.hasLoop
    ? "linear"
    : "unknown";

  const shouldVisualize = detectedStrategy === "hashmap";

  const confidence =
    detectedStrategy === "hashmap" ? (hasExplicitHash ? "high" : "low") : detectedStrategy === "bruteforce" ? "high" : "low";

  return {
    patterns,
    detectedStrategy,
    shouldVisualize,
    confidence,
  };
};

/**
 * Generate feedback for Two Sum problem based on detected patterns
 * Can optionally use hints from problemData
 */
export const generateTwoSumFeedback = (detection, hintLevel = 0, problemData = null) => {
  const { patterns, detectedStrategy, confidence: detectedConfidence } = detection;
  if (!patterns || patterns.isEmpty) return null;

  // Strategy-specific messages that escalate with hint level and respect confidence
  if (detectedStrategy === "bruteforce") {
    if (hintLevel === 0) {
      return "This approach checks all pairs. What does that mean for performance?";
    } else if (hintLevel === 1) {
      return "Can you avoid rechecking numbers you've already seen?";
    } else {
      return "Try storing visited numbers in a hashmap while iterating.";
    }
  }

  if (detectedStrategy === "hashmap") {
    // If we have high confidence (explicit keywords), praise and explain.
    if (detectedConfidence === "high") {
      return "Nice — storing previously seen values lets you do O(1) lookups and reduces overall time complexity to O(n).";
    }
    // Low confidence: be suggestive rather than praising.
    return "It looks like you might be using a hash-based structure. If not, consider storing seen values to avoid repeated checks.";
  }

  if (detectedStrategy === "linear") {
    if (hintLevel === 0) {
      return "You're iterating through the array. Think about whether you can remember previous values to speed up lookups.";
    }
    return "Consider storing seen numbers in a hash to look up complements in O(1).";
  }

  if (detectedStrategy === "unknown") {
    return "I'm not fully sure about your approach yet. Can you explain what you're trying?";
  }

  return null;
};
