import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Chat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
        const response = await axios.post("https://devaisha21-candidate-agent-backend.hf.space/ask", {
        question: question,
      });
      const botMessage = { role: "bot", text: response.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const botMessage = { role: "bot", text: "Error getting response. Try again." };
      setMessages((prev) => [...prev, botMessage]);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Aishwarya's Interview Agent</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>

      <div style={styles.chatBox}>
        {messages.length === 0 && (
          <p style={styles.placeholder}>Ask me anything about Aishwarya's profile!</p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.role === "user" ? styles.userMessage : styles.botMessage}
          >
            <strong>{msg.role === "user" ? "You" : "Aishwarya"}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div style={styles.botMessage}>Thinking...</div>}
      </div>

      <form onSubmit={handleAsk} style={styles.inputArea}>
        <input
          style={styles.input}
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button style={styles.sendBtn} type="submit">Send</button>
      </form>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", height: "100vh", background: "#f0f2f5" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#4CAF50", padding: "15px 20px" },
  headerTitle: { color: "white", margin: 0 },
  logoutBtn: { padding: "8px 15px", background: "white", color: "#4CAF50", border: "none", borderRadius: "5px", cursor: "pointer" },
  chatBox: { flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" },
  placeholder: { textAlign: "center", color: "#999", marginTop: "50px" },
  userMessage: { background: "#DCF8C6", padding: "10px 15px", borderRadius: "10px", alignSelf: "flex-end", maxWidth: "70%" },
  botMessage: { background: "white", padding: "10px 15px", borderRadius: "10px", alignSelf: "flex-start", maxWidth: "70%", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
  inputArea: { display: "flex", padding: "15px", background: "white", gap: "10px" },
  input: { flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ddd" },
  sendBtn: { padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }
};

export default Chat;
