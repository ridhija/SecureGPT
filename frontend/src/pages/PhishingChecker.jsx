import { useState } from "react";

function PhishingChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
const checkURL = () => {
  if (!url.trim()) return "";

  if (!url.startsWith("https://")) {
    return "❌ Invalid URL";
  }

  if (
    url.includes("@") ||
    url.includes("bit.ly") ||
    url.includes("tinyurl")
  ) {
    return "⚠️ Suspicious URL";
  }

  return "✅ Looks Safe";
};
  
  const analyzeURL = () => {
  setResult(checkURL());
};

  const getRiskScore = () => {
  let score = 0;

  if (!url.startsWith("https://")) score += 30;
  if (url.includes("@")) score += 20;
  if (url.includes("bit.ly") || url.includes("tinyurl")) score += 30;
  if (url.includes("login") || url.includes("verify")) score += 20;

  return score;
};

const getRiskLevel = () => {
  const score = getRiskScore();

  if (score >= 60) return "🔴 High Risk";
  if (score >= 30) return "🟡 Medium Risk";
  return "🟢 Low Risk";
};

  return (
    <div
  style={{
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "30px 40px",
  }}
>
      <h1>🎣 Phishing URL Checker</h1>

      <p
  style={{
    color: "#64748b",
    marginTop: "10px",
    marginBottom: "25px",
    fontSize: "18px",
  }}
>
  Analyze suspicious URLs and detect potential phishing attacks instantly.
</p>
<div
  style={{
    display: "flex",
justifyContent: "space-between",
alignItems: "flex-start",
gap: "20px",
marginBottom: "20px",
  }}
>
     
  <div
  style={{
    flex: 1,
    maxWidth: "760px",
  }}
>
    <input
      type="text"
      placeholder="Enter Website URL"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      style={{
        width: "500px",
        padding: "14px",
        fontSize: "16px",
        borderRadius: "10px",
        border: "1px solid #cbd5e1",
      }}
    />

    <button
      onClick={analyzeURL}
      style={{
        marginLeft: "10px",
        padding: "14px 20px",
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      🔍 Analyze URL
    </button>
  </div>

  {/* Safety Tips */}
  <div
    style={{
  width: "500px",
flexShrink: 0,
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: "12px",
  padding: "20px",
}}
  >
    <h3>💡 Safety Tips</h3>

    <ul style={{ lineHeight: "2", marginTop: "10px" }}>
      <li>Always use <b>HTTPS</b>.</li>
      <li>Avoid shortened URLs.</li>
      <li>Verify the website domain.</li>
      <li>Never enter passwords on unknown websites.</li>
    </ul>
  </div>
</div>

<div
  style={{
    display: "flex",
    gap: "15px",
    marginTop: "15px",
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() => setUrl("https://google.com")}
    style={{
      padding: "10px 16px",
      borderRadius: "20px",
      border: "none",
      background: "#22c55e",
      color: "white",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    ✅ Safe URL
  </button>

  <button
    onClick={() => setUrl("http://login-facebook.com")}
    style={{
      padding: "10px 16px",
      borderRadius: "20px",
      border: "none",
      background: "#f59e0b",
      color: "white",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    ⚠️ Login URL
  </button>

  <button
    onClick={() => setUrl("https://bit.ly/test123")}
    style={{
      padding: "10px 16px",
      borderRadius: "20px",
      border: "none",
      background: "#ef4444",
      color: "white",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    🚨 Short URL
  </button>
</div>

<div
  style={{
    display: "flex",
    gap: "20px",
marginTop: "20px",
alignItems: "stretch",
  }}
>
  {/* Left Card */}
  <div
    style={{
      flex: 1,
      background: "#eff6ff",
      border: "1px solid #bfdbfe",
      borderRadius: "15px",
      padding: "25px",
    }}
  >
    <h3>🛡 Security Checks</h3>

    <div style={{ lineHeight: "2", marginTop: "15px" }}>
      {!url.startsWith("https://") && <p>❌ HTTPS not detected</p>}

      {url.includes("@") && <p>❌ '@' symbol found</p>}

      {(url.includes("bit.ly") || url.includes("tinyurl")) && (
        <p>❌ Shortened URL detected</p>
      )}

      {(url.includes("login") || url.includes("verify")) && (
        <p>⚠️ Login/Verify keyword detected</p>
      )}

      {getRiskScore() === 0 && (
        <p>✅ No suspicious indicators found</p>
      )}
    </div>
  </div>

  {/* Right Card */}
  <div
    style={{
      flex: 1,
      background: "#ffffff",
      borderRadius: "15px",
      padding: "25px",
      boxShadow: "0 8px 20px rgba(0,0,0,.08)",
    }}
  >
    <h3>Result: {result}</h3>
    <h3>{getRiskLevel()}</h3>

    <p
      style={{
        color: "#2563eb",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      Risk Score : {getRiskScore()} / 100
    </p>
 
 <button
  onClick={() => {
  navigator.clipboard.writeText(
    `URL: ${url}
    Result: ${result}
Risk Level: ${getRiskLevel()}
Risk Score: ${getRiskScore()}/100`
  );

  alert("✅ Result Copied Successfully!");
}}
  style={{
    marginTop: "15px",
    marginBottom: "15px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  📋 Copy Result
</button>

    <div
      style={{
        width: "100%",
        height: "12px",
        background: "#ddd",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          width: `${getRiskScore()}%`,
          height: "100%",
          borderRadius: "10px",
          background:
            getRiskScore() >= 60
              ? "#ef4444"
              : getRiskScore() >= 30
              ? "#f59e0b"
              : "#22c55e",
          transition: "0.3s",
         }}
      ></div>
    </div>
    

    <p
      style={{
        textAlign: "right",
        marginTop: "10px",
        fontWeight: "bold",
      }}
    >
      {getRiskScore()}%
    </p>
  </div>
 </div>
</div>
    
  );
}

export default PhishingChecker;