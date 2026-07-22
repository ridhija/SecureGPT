import "../styles/Hero.css";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          AI Powered <span>Cyber Security</span> Assistant
        </h1>

        <p>
          Protect yourself from phishing attacks, password leaks,
          malware and cyber threats using Artificial Intelligence.
        </p>

        <div className="hero-buttons">
  <Link to="/chat" className="primary-btn">
    Try SecureGPT
  </Link>

  <Link to="/about" className="secondary-btn">
    Learn More
  </Link>
</div>
        
      </div>

      <div className="hero-right">
        <img src={hero} alt="Cyber Security" />
      </div>
    </section>
  );
}

export default Hero;