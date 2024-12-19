import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eyeImage from "../assets/eye.jpg";

const RemoveCursePage: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [showJumpscare, setShowJumpscare] = useState(false);
    const [jumpscareMessage, setJumpscareMessage] = useState("");
    const navigate = useNavigate();

    const jumpscareMessages = [
        "I see you...",
        "I know who you are...",
        "It's too late now.",
    ];

    const handleRemoveCurse = () => {
        if (password === "d3viLrEpell3nt") {
            localStorage.removeItem("Cursed");
            alert("Cursed lifted");
            navigate("/"); // Redirect to Home page
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts > 3) {
                // Show jumpscare with the image
                setShowJumpscare(true);
                setTimeout(() => setShowJumpscare(false), 5000); // Jumpscare lasts for 5 seconds
            } else {
                // Cycle through the messages sequentially
                const currentMessageIndex = attempts % jumpscareMessages.length;
                setJumpscareMessage(jumpscareMessages[currentMessageIndex]);
                setShowJumpscare(true);
                setTimeout(() => setShowJumpscare(false), 800); // Message lasts for 0.8 seconds
            }
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
            {showJumpscare ? (
                attempts > 3 ? (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#000",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 1000,
                        }}
                    >
                        <img
                            src={eyeImage}
                            alt="Jumpscare Eye"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#000",
                            color: "#780606",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "3rem",
                            fontFamily: "Times New Roman, Times, serif",
                            zIndex: 1000,
                        }}
                    >
                        <p>{jumpscareMessage}</p>
                    </div>
                )
            ) : (
                <>
                    <h1
                        style={{
                            color: attempts > 3 ? "#780606" : "#FAEBD7",
                            fontFamily: "Times New Roman, Times, serif",
                        }}
                    >
                        {attempts > 3 ? "ɎØɄ ₵₳₦'₮ Ɇ₴₵₳₱Ɇ" : "Remove the Curse"}
                    </h1>
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
                </>
            )}
        </div>
    );
};

export default RemoveCursePage;
