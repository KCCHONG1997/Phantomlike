import React from "react";
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
      <div style={{ marginTop: "0", padding: "20px", backgroundColor: "black", }}>
        <Home />
      </div>
    </>
  );
};

export default App;
