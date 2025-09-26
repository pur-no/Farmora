import React, { useState } from "react";
import "../styles/ChatBot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const faqAnswers = {
    "hi": "Hello! How can I assist you today?",
    "what is the delivery charge": "Inside Dhaka 100 Taka and outside Dhaka 200 Taka.",
    "how much time it will take": "Inside Dhaka 2 to 3 days and outside Dhaka 5 to 7 days.",
    "what payment methods are available": "Cash on delivery and bKash.",
    "do you deliver on weekends": "Yes, we deliver 7 days a week.",

  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    const lowerMsg = userMsg.toLowerCase();

    let botReply =
      Object.keys(faqAnswers).find((q) => lowerMsg.includes(q)) !== undefined
        ? faqAnswers[Object.keys(faqAnswers).find((q) => lowerMsg.includes(q))]
        : "An admin will answer your question as soon as possible or contact +880 17********";

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }, { sender: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h4>Farmora Chatbot</h4>
            <button onClick={toggleChat}>✖</button>
          </div>
          <div className="chatbox-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>
    </div>
  );
};

export default ChatBot;
