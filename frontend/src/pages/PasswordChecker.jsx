import { useState } from "react";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const hasUpper = /[A-Z]/.test(password);
const hasLower = /[a-z]/.test(password);
const hasNumber = /[0-9]/.test(password);
const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const checkStrength = () => {
    if (password.length < 6) return "Weak 🔴";
    if (password.length < 10) return "Medium 🟡";
    return "Strong 🟢";
  };

  const getScore = () => {
  let score = 0;

  if (password.length >= 8) score += 20;
  if (hasUpper) score += 20;
  if (hasLower) score += 20;
  if (hasNumber) score += 20;
  if (hasSpecial) score += 20;

  return score;
};

  return (
    <div style={{ padding: "50px" }}>
      <h1>🔐 AI Password Strength Checker</h1>

<p style={{ color: "#666", marginTop: "10px" }}>
  Analyze your password using multiple security rules.
</p>

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "12px",
          width: "300px",
          fontSize: "16px",
        }}
      />

       <button
  onClick={() => setShowPassword(!showPassword)}
  style={{
    marginLeft: "10px",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
  }}
>
  {showPassword ? "🙈 Hide" : "👁 Show"}
</button>


      <div
  style={{
    display: "flex",
    gap: "30px",
    marginTop: "35px",
    alignItems: "stretch",
  }}
>
  {/* Left Side */}
  
  <div
  style={{
    flex: 1,
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "15px",
    padding: "25px",
    minHeight: "330px",
  }}
>
 
    <h3>💡 Suggestions</h3>
    
    <ul style={{ lineHeight: "2", marginTop: "15px" }}>
      {!hasUpper && <li>Add at least one Uppercase Letter.</li>}
      {!hasLower && <li>Add at least one Lowercase Letter.</li>}
      {!hasNumber && <li>Add at least one Number.</li>}
      {!hasSpecial && <li>Add at least one Special Character.</li>}
      {password.length < 8 && <li>Use at least 8 Characters.</li>}
    </ul>
  </div>

  {/* Right Side */}
  <div
    style={{
      flex: 1,
      minHeight: "330px",
      background: "#fdf2f8",
border: "1px solid #fbcfe8",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,.08)",
    }}
  >
    <h3>
      Strength: {checkStrength()}
    </h3>

    <p
      style={{
        color: "#2563eb",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      Password Score: {getScore()} / 100
    </p>

    <div style={{ lineHeight: "2", marginTop: "15px" }}>
      <p>{hasUpper ? "✅" : "❌"} Uppercase Letter</p>
      <p>{hasLower ? "✅" : "❌"} Lowercase Letter</p>
      <p>{hasNumber ? "✅" : "❌"} Number</p>
      <p>{hasSpecial ? "✅" : "❌"} Special Character</p>
      <p>{password.length >= 8 ? "✅" : "❌"} Minimum 8 Characters</p>
    </div>

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
          width: `${getScore()}%`,
          height: "100%",
          borderRadius: "10px",
          background:
            getScore() < 40
              ? "#ef4444"
              : getScore() < 80
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
      {getScore()}%
    </p>
  </div>
</div>
    </div>
    
  );
}

export default PasswordChecker;