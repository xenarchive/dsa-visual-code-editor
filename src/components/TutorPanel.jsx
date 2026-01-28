const TutorPanel = ({ observation, hint }) => {
  return (
    <div
      style={{
        width: "320px",
        height: "100vh",
        padding: "16px",
        borderLeft: "1px solid #ddd",
        backgroundColor: "#fafafa",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>🧑‍🏫 AI Tutor</h3>

      <div style={{ marginBottom: "16px" }}>
        <strong>👀 Observation</strong>
        <p style={{ fontSize: "14px", marginTop: "6px" }}>
          {observation || "Waiting for you to start coding..."}
        </p>
      </div>

      <div>
        <strong>💡 Hint</strong>
        <p style={{ fontSize: "14px", marginTop: "6px" }}>
          {hint || "I'll guide you as you write code."}
        </p>
      </div>
    </div>
  );
};

export default TutorPanel;
