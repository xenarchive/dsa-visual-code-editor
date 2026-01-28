import { useState } from "react";

export default function QuestionInput({ onAnalyze }) {
  const [question, setQuestion] = useState("");

  return (
    <div>
      <textarea
        placeholder="Paste your DSA question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={() => onAnalyze(question)}>
        Analyze Question
      </button>
    </div>
  );
}
