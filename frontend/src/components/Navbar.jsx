import "../styles/Navbar.css";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
        <div className="logo">
  <span className="lock-icon">🔐</span>
  <span>SecureGPT</span>
</div>

      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
<li><NavLink to="/password">Password Checker</NavLink></li>
<li><NavLink to="/phishing">Phishing Checker</NavLink></li>
<li><NavLink to="/chat">AI Chat</NavLink></li>
<li><NavLink to="/about">About</NavLink></li>

      </ul>

      <button className="nav-btn">Get Started</button>
    </nav>
  );
}

export default Navbar;