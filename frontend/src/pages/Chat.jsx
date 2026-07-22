import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

function Chat() {
    const [message, setMessage] = useState("");
    const [copiedIndex, setCopiedIndex] = useState(null);

const [chat, setChat] = useState([
  {
    user: "",
    bot: "👋 Welcome! I'm SecureGPT. Ask me anything about Cybersecurity."
  }
]);

const [isTyping, setIsTyping] = useState(false);

const inputRef = useRef(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
  if (chat.length > 1) {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }
}, [chat]);

  const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const downloadChat = () => {
  const content = chat
    .map(
      (item) =>
        `You: ${item.user}\n\nSecureGPT: ${item.bot}\n\n----------------------------\n`
    )
    .join("");

  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });

  element.href = URL.createObjectURL(file);
  element.download = "SecureGPT_Chat.txt";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

 const sendMessage = async () => {
  if (message.trim() === "") return;

  const userMessage = message;
  setIsTyping(true);

  setChat((prev) => [
    ...prev,
    
        {
  user: userMessage,
  bot: "⏳ SecureGPT is thinking...",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
}   
  ]);

  setMessage("");

  setTimeout(() => {
  inputRef.current?.focus();
}, 100);

  try {
 const response = await ai.models.generateContent({
  model: "gemini-3.1-flash-lite",
  contents: `
You are SecureGPT, an AI Cybersecurity Assistant.

Rules:
- Answer ONLY cybersecurity-related questions.
- If the question is unrelated, reply:
"I am SecureGPT and I can only answer cybersecurity-related questions."

- Always answer in proper Markdown.
- Use headings (##).
- Use bullet points where needed.
- Highlight important keywords in **bold**.
- Keep answers easy to understand.
- End every answer with a short "Security Tip" section.

User Question:
${userMessage}
`,
});
  

  const aiReply = response.text;

  if (!aiReply) {
  throw new Error("Empty AI response");
}

  setChat((prev) => {
    const updated = [...prev];
    updated[updated.length - 1].bot = aiReply;
    setIsTyping(false);
    return [...updated];
  });

} catch (error) {
  console.error("FULL ERROR:", error);

  setChat((prev) => {
    const updated = [...prev];
    updated[updated.length - 1].bot =
      "Error: Unable to connect to Gemini AI.";
      setIsTyping(false);
    return [...updated];
  });

  
} 
};

  return (
    <div
  style={{
    padding: "30px",
    maxWidth: "800px",
    margin: "auto",
    minHeight: "calc(100vh - 90px)",
    display: "flex",
    flexDirection: "column",
  }}
>
        <h1
style={{
fontSize:"42px",
fontWeight:"700",
color:"#0f172a"
}}
>
🛡️ SecureGPT AI Cybersecurity Assistant
</h1>

<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "15px",
  }}
>
  <button
    onClick={() =>
      setChat([
        {
          user: "",
          bot: "👋 Welcome! I'm SecureGPT. Ask me anything about Cybersecurity."
        }
      ])
    }
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    🗑 Clear Chat
  </button>

  <button
  onClick={downloadChat}
  style={{
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "10px",
  }}
>
  ⬇ Download Chat
</button>

</div>

<p style={{ color: "#64748b", marginTop: "10px", marginBottom: "25px" }}>
  Ask cybersecurity questions and receive AI-powered guidance instantly.
</p>
      
     <div
  style={{
    borderRadius: "16px",
    height: "60vh",
minHeight: "380px",
maxHeight: "650px",
    overflowY: "auto",
    padding: "20px",
    marginTop: "20px",
    background: "#ffffff",
    boxShadow: "0 12px 30px rgba(59,130,246,0.15)",
    border: "1px solid #dbeafe",
  }}
>


        {chat.map((item, index) => (
  <div key={index} style={{ marginBottom: "25px" }}>

    <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "10px",
  }}
>
  <div
    style={{
      background: "#3b82f6",
      color: "white",
      padding: "12px 18px",
      borderRadius: "18px",
      maxWidth: "70%",
    }}
  >
    {item.user && item.user}

    {item.time && (
      <p
        style={{
          fontSize: "11px",
          color: "#dbeafe",
          marginTop: "5px",
        }}
      >
        {item.time}
      </p>
    )}
  </div>

  <div
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#2563eb",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "18px",
    }}
  >
    👤
  </div>
     
    </div>

      <div
  style={{
    background: "#eef6ff",
    color: "#111",
    padding: "12px 18px",
    borderRadius: "18px",
    maxWidth: "70%",
    border: "1px solid #dbeafe",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
marginTop: "10px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    }}
  >
    <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <div
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#0f172a",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    🤖
  </div>

  <strong>SecureGPT</strong>
</div>

    {item.bot !== "⏳ SecureGPT is thinking..." && (
  <button
    onClick={() => {
  navigator.clipboard.writeText(item.bot);
  setCopiedIndex(index);

  setTimeout(() => {
    setCopiedIndex(null);
  }, 2000);
}}
onMouseEnter={(e) =>
  (e.target.style.background =
    copiedIndex === index ? "#16a34a" : "#0ea5e9")
}

onMouseLeave={(e) =>
  (e.target.style.background =
    copiedIndex === index ? "#22c55e" : "#38bdf8")
}
    style={{
        background: copiedIndex === index ? "#22c55e" : "#38bdf8",
transition: "0.3s",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "4px 10px",
      cursor: "pointer",
      fontSize: "12px",
    }}
  >
    
    {copiedIndex === index ? "✅ Copied" : "📋 Copy"}
  </button>
  
)}
  </div>
  

  <div
  style={{
    lineHeight: "1.8",
  }}
>
  <ReactMarkdown>{item.bot}</ReactMarkdown>
  
    {item.time && (
  <p
    style={{
      fontSize: "11px",
      color: "#64748b",
      marginTop: "8px",
    }}
  >
    {item.time}
  </p>
)}
</div>
</div>
    

  </div>
))}

{isTyping && (
  <div
    style={{
      marginTop: "10px",
      color: "#3b82f6",
      fontWeight: "bold",
    }}
  >
    🤖 SecureGPT is typing...
  </div>
)}

<div ref={chatEndRef}></div>

      </div>

      <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
    <button
  onClick={() => {
    setMessage("What is phishing?");
    inputRef.current?.focus();
  }}
  style={{
    padding: "10px 18px",
    borderRadius: "25px",
    border: "none",
    background:"#38bdf8",
    transition: "0.3s",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  }}
  onMouseEnter={(e) =>
  (e.target.style.background = "#0ea5e9")
}

onMouseLeave={(e) =>
  (e.target.style.background = "#38bdf8")
}
>
  🎣 Phishing
</button>

  <button
    onClick={() => {
      setMessage("How to create a strong password?");
      inputRef.current?.focus();
    }}
    style={{
    padding: "10px 18px",
    borderRadius: "25px",
    border: "none",
    background:"#38bdf8",
    transition: "0.3s",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  }}
  onMouseEnter={(e) =>
  (e.target.style.background = "#0ea5e9")
}

onMouseLeave={(e) =>
  (e.target.style.background = "#38bdf8")
}
  >
    🔐 Password
  </button>

  <button
    onClick={() => {
      setMessage("Explain ransomware.");
      inputRef.current?.focus();
    }}
    style={{
    padding: "10px 18px",
    borderRadius: "25px",
    border: "none",
    background:"#38bdf8",
    transition: "0.3s",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  }}
  onMouseEnter={(e) =>
  (e.target.style.background = "#0ea5e9")
}

onMouseLeave={(e) =>
  (e.target.style.background = "#38bdf8")
}
  >
    🛡️ Ransomware
  </button>

  <button
    onClick={() => {
      setMessage("Cloud security best practices");
      inputRef.current?.focus();
    }}
    style={{
    padding: "10px 18px",
    borderRadius: "25px",
    border: "none",
    background:"#38bdf8",
    transition: "0.3s",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  }}
  onMouseEnter={(e) =>
  (e.target.style.background = "#0ea5e9")
}

onMouseLeave={(e) =>
  (e.target.style.background = "#38bdf8")
}
  >
    ☁️ Cloud Security
  </button>
</div>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  }}
>
  <input
    ref={inputRef}
    type="text"
    placeholder="Ask a cybersecurity question..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    onKeyDown={async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    await sendMessage();
  }
}}
    style={{
  flex: 1,
  padding: "16px 20px",
  fontSize: "16px",
  borderRadius: "30px",
  border: "1px solid #d1d5db",
  outline: "none",
  transition: "0.3s",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
}}
    />

  <button
  onClick={sendMessage}
  onMouseEnter={(e) =>
  (e.target.style.background = "#2563eb")
}
onMouseLeave={(e) =>
  (e.target.style.background = "#3b82f6")
}
  style={{
    padding: "16px 24px",
    borderRadius: "30px",
    boxShadow: "0 2px 8px rgba(59,130,246,0.3)",
    background: "#3b82f6",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  }}
>
    
  🚀 Send
</button>
</div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          transition: "0.3s",
        }}
      >
      </div>
    </div>
  );
}

export default Chat;