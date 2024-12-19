import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import DevilordPage from "./view/DevilordPage";

const App: React.FC = () => {
  const isCursed = localStorage.getItem("Cursed") === "true";

  return (
    <Router basename="/Phantomlike">
      <div style={{ marginTop: "0", padding: "20px", backgroundColor: "black" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {!isCursed && <Route path="/devilord" element={<DevilordPage />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
