import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import DevilordPage from "./view/DevilordPage";
import DevilordPageCursed from "./view/DevilordPageCursed";

const App: React.FC = () => {
  const isCursed = localStorage.getItem("Cursed") === "true";
  // const [cursed,setCursed] = useState(isCursed);
  useEffect(()=> {
    
  })

  
  return (
      <div style={{ marginTop: "0", padding: "20px", backgroundColor: "black" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {isCursed?<Route path="/devilord" element={<DevilordPageCursed />}/> :<Route path="/devilord" element={<DevilordPage />}/>}
        </Routes>
      </div>
  );
};

export default App;
