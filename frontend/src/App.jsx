import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import PasswordChecker from "./pages/PasswordChecker";
import PhishingChecker from "./pages/PhishingChecker";
import About from "./pages/About";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/password" element={<PasswordChecker />} />
        <Route path="/phishing" element={<PhishingChecker />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {location.pathname !== "/chat" && <Footer />}
    </>
  );
}

export default App;