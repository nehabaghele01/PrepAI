import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import "../styles/aiAssistant.css";

function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    try {
      setLoading(true);
      setReply("");

      const res = await api.post(
        "/ai/chat",
        {
          message: question,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setReply(res.data.reply);
    } catch (error) {
      toast.error("Failed to get AI response");

      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const prompts = [
    "Generate a 30 Day DSA Roadmap",
    "Top HR Interview Questions",
    "Resume Improvement Tips",
    "DBMS Important Topics",
    "Operating System Revision",
    "How should I prepare Aptitude?",
  ];
  return (
    <div className="tracker-page">
      <div className="ai-wrapper">
        <h1 className="ai-title">🤖 Ask PrepAI</h1>

        <p className="ai-subtitle">
          Your AI Placement Coach for DSA, Aptitude, Resume, Interview &
          Projects.
        </p>

        <div className="ai-prompts">
          <h3>💡 Quick Prompts</h3>

          <div className="ai-prompt-grid">
            {prompts.map((item, index) => (
              <button
                key={index}
                className="ai-chip"
                onClick={() => setQuestion(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="ai-chat-card">
          <textarea
            className="ai-textarea"
            rows="6"
            placeholder="Ask anything... Example: Generate a 30 Day DSA Roadmap"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button className="ai-send-btn" onClick={askAI} disabled={loading}>
            {loading ? "Thinking..." : "Ask PrepAI"}
          </button>
        </div>

        {reply && (
          <div className="ai-answer-card">
            <div className="ai-answer-header">🤖 PrepAI</div>

            <div className="ai-answer-body">
              <ReactMarkdown>{reply}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAssistant;
