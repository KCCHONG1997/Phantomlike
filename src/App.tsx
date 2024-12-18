import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MainRoutes from "./routes/MainRoutes";
import Home from "./view/Home";

const App: React.FC = () => {
  return (
    // <Router>
    //   <NavBar />
    //   <div style={{ marginTop: "60px", padding: "20px" , backgroundColor: "#111",}}>
    //     <MainRoutes />
    //   </div>
    // </Router>
    <>
      <div style={{ marginTop: "0", padding: "20px", backgroundColor: "#111", }}>
        <Home />
      </div>
    </>
  );
};

export default App;
