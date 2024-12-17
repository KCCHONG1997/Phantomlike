import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MainRoutes from "./routes/MainRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <div style={{ marginTop: "60px", padding: "20px" , backgroundColor: "#111",}}>
        <MainRoutes />
      </div>
    </Router>
  );
};

export default App;
