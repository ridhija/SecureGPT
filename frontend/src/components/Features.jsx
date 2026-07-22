import "../styles/Features.css";

function Features() {
  return (
    <section className="features">

      <h2>Our Features</h2>

      <div className="feature-container">

        <div className="card">
          <h3>🤖 AI Cyber Assistant</h3>
          <p>
            Ask cybersecurity questions and get instant AI-powered guidance.
          </p>
        </div>

        <div className="card">
          <h3>🎣 Phishing Detection</h3>
          <p>
            Detect suspicious emails and malicious URLs using AI.
          </p>
        </div>

        <div className="card">
          <h3>🔐 Password Strength Checker</h3>
          <p>
            Check whether your password is strong and secure.
          </p>
        </div>

        <div className="card">
          <h3>☁️ Cloud Security Tips</h3>
          <p>
            Learn cloud security best practices with AI recommendations.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;