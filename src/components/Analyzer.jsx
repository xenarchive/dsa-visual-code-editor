import twoSum from "../data/questions/twoSum.json";
import reverseLinkedList from "../data/questions/reverseLinkedList.json";

export function analyzeQuestion(questionText) {
  console.log("analyzeQuestion called with:", questionText);
  
  if (!questionText || questionText.trim() === "") {
    console.log("No question text provided");
    return null;
  }
  
  const lowerText = questionText.toLowerCase();
  
  // Two Sum detection - look for key phrases from the actual problem
  const twoSumKeywords = [
    { pattern: /two sum/i, weight: 3 },
    { pattern: /2sum/i, weight: 3 },
    { pattern: /indices.*add up to/i, weight: 2 },
    { pattern: /two numbers.*add up/i, weight: 2 },
    { pattern: /pair.*target/i, weight: 1 },
    { pattern: /array.*target.*indices/i, weight: 1 },
  ];
  
  // Reverse Linked List detection
  const reverseLinkedListKeywords = [
    { pattern: /reverse.*linked list/i, weight: 3 },
    { pattern: /reverse a linked list/i, weight: 3 },
    { pattern: /reverse the direction.*linked list/i, weight: 2 },
    { pattern: /reverse pointer/i, weight: 1 },
    { pattern: /linked list.*reverse/i, weight: 2 },
  ];
  
  // Calculate scores
  let twoSumScore = 0;
  let reverseLinkedListScore = 0;
  
  twoSumKeywords.forEach(({ pattern, weight }) => {
    if (pattern.test(questionText)) {
      twoSumScore += weight;
    }
  });
  
  reverseLinkedListKeywords.forEach(({ pattern, weight }) => {
    if (pattern.test(questionText)) {
      reverseLinkedListScore += weight;
    }
  });
  
  console.log("Scores - Two Sum:", twoSumScore, "Reverse Linked List:", reverseLinkedListScore);
  
  // Return based on highest score
  if (twoSumScore > reverseLinkedListScore && twoSumScore > 0) {
    console.log("Matched: Two Sum");
    return twoSum;
  } else if (reverseLinkedListScore > 0) {
    console.log("Matched: Reverse Linked List");
    return reverseLinkedList;
  }
  
  console.log("No match found for:", questionText);
  return null;
}

export default function Analyzer({ onQuestionReady }) {
  return null;
}
