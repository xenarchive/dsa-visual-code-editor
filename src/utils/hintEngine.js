export function getHint(hints, index) {
  if (!hints || !Array.isArray(hints)) {
    return "Try implementing the optimized approach.";
  }
  if (index < hints.length) {
    return hints[index];
  }
  return "Try implementing the optimized approach.";
}
