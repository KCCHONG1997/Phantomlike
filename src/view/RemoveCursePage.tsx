import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router

const RemoveCursePage: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRemoveCurse = () => {
        if (password === "d3viLrEpell3nt") {
            localStorage.removeItem("Cursed");
            alert("Cursed lifted");
            navigate("/"); // Redirect to Home page
        } else {
            alert("What you trying to do? :) - Devil");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                color: "#FAEBD7",
                fontFamily: "Times New Roman, Times, serif",
                textAlign: "center",
            }}
        >
            <h1>Remove the Curse</h1>
            <p>Enter your name and the secret password to lift the curse.</p>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #FAEBD7",
                    width: "250px",
                }}
            />
            <input
                type="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    margin: "10px 0",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #FAEBD7",
                    width: "250px",
                }}
            />
            <button
                onClick={handleRemoveCurse}
                style={{
                    marginTop: "10px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#780606",
                    color: "#FAEBD7",
                    fontFamily: "Times New Roman, Times, serif",
                    cursor: "pointer",
                    fontSize: "16px",
                }}
            >
                Lift the Curse
            </button>
        </div>
    );
};

export default RemoveCursePage;
