import "../styles/About.css";

function About() {
  return (
    <section className="about">
      <h1>About SecureGPT</h1>

      <p className="about-subtitle">
  SecureGPT is an AI-powered cybersecurity platform designed to help users
  detect cyber threats, strengthen password security, identify phishing
  websites, and receive AI-based cybersecurity guidance in real time.
</p>

     <div className="about-cards">

  <div className="about-card">
    <h3>🤖 AI Assistant</h3>
    <p>
      Get instant cybersecurity guidance powered by Artificial Intelligence.
    </p>
  </div>

  <div className="about-card">
    <h3>🔐 Password Security</h3>
    <p>
      Analyze password strength and improve account security.
    </p>
  </div>

  <div className="about-card">
    <h3>🎣 Phishing Detection</h3>
    <p>
      Identify suspicious URLs and protect yourself from phishing attacks.
    </p>
  </div>

  <div className="about-card">
    <h3>🛡️ Secure Browsing</h3>
    <p>
      Learn safe browsing practices and protect yourself against online scams,
      malicious websites, and cyber attacks.
    </p>
  </div>

</div>
      
      <div className="tech-stack">
  <h2>Technologies Used</h2>

  <p>
    React.js • Vite • Google Gemini AI • JavaScript • HTML • CSS
  </p>
</div>
    </section>
  );
}

export default About;