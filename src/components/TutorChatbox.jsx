import React from "react";

const TutorChatbox = ({ isOpen, messages, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "80px",
        width: "320px",
        height: "400px",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #eee",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>🧑‍🏫 Tutor</strong>
        <button onClick={onClose} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
          ✖
        </button>
      </div>

      <div style={{ padding: "12px", overflowY: "auto", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ display: "flex" }}>
            <div
              style={{
                background: "#eef2ff",
                color: "#0f172a",
                padding: "10px 12px",
                borderRadius: "12px",
                maxWidth: "80%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                lineHeight: 1.4,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorChatbox;
