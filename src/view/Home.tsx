import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import Banner from "../components/Banner/Banner";
import ParagraphSection from "./ParagraphSection";
import CardGameSection from "./CardGameSection";
import GravitySection from "./GravitySection";
import DONOTCOMEBACK from "./Dncb";
import devilLogo from "../assets/DEVIL_white.png";
import devillordLogo from "../assets/DEVILORD_white.png";
import hordeLogo from "../assets/HORDE_white.png";

const cardData = [
    { id: "devil", title: "Devil", imgSrc: devilLogo },
    { id: "devillord", title: "Devillord", imgSrc: devillordLogo },
    { id: "horde", title: "Horde", imgSrc: hordeLogo },
];

const Home: React.FC = () => {
    const navigate = useNavigate(); // For navigation
    const [cards, setCards] = useState(() =>
        [...cardData].sort(() => Math.random() - 0.5)
    );
    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [found, setFound] = useState(false);
    const [showJumpscare, setShowJumpscare] = useState(false);
    const [cursed, setCursed] = useState(false);
    const [devilord, setDevilord] = useState(false);

    useEffect(() => {
        const savedCursed = localStorage.getItem("Cursed");
        const metDevilord = localStorage.getItem("Devilord");
        if (metDevilord === "true") {
            setDevilord(true);
        }

        if (savedCursed === "true") {
            setCursed(true);
            document.addEventListener("mousemove", createBloodTrail);
        }

        return () => {
            document.removeEventListener("mousemove", createBloodTrail);
        };
    }, []);

    useEffect(() => {
        if (cursed) {
            localStorage.setItem("Cursed", "true");
            document.addEventListener("mousemove", createBloodTrail);
        } else {
            localStorage.removeItem("Cursed");
            document.removeEventListener("mousemove", createBloodTrail);
        }
    }, [cursed]);

    const createBloodTrail = (e: MouseEvent) => {
        // Optional blood trail logic
    };

    const handleCardClick = (id: string) => {
        if (flippedCards.includes(id) || found || cursed) return;

        setFlippedCards([...flippedCards, id]);

        if (id === "devil") {
            setFound(true);
            triggerJumpscare();
        }
    };

    const triggerJumpscare = () => {
        setShowJumpscare(true);
        setTimeout(() => {
            setShowJumpscare(false);
            setCursed(true);
        }, 800);
    };

    const devilordRoute = () => {
        navigate("/devilord"); // Navigate to DevilordPage
    };
    const phantomlikeRoute = () => {
        navigate("/phantomlikeHaven"); // Navigate to Phantomlike Page
    };

    return (
        <div style={{ padding: "20px", color: "#FAEBD7", textAlign: "center" }}>
            {devilord ? (
                <DONOTCOMEBACK />
            ) : (
                <>
                    <h1 style={{ fontFamily: "Times New Roman, Times, serif" }}>
                        #1 - INTRO
                    </h1>
                    {showJumpscare ? (
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
                            <p>I found you.</p>
                        </div>
                    ) : (
                        <>
                            <Banner />
                            <hr />
                            <ParagraphSection cursed={cursed} />
                            <hr />
                            <div style={{ fontFamily: "Times New Roman, Times, serif" }}>
                                {cursed ? (
                                    <h2 style={{ color: "#780606" }}>I am here</h2>
                                ) : (
                                    <h2>Devil's Trick</h2>
                                )}
                                {cursed ? (
                                    <p style={{ color: "#780606" }}>
                                        You found me, but who found you?
                                    </p>
                                ) : (
                                    <p>Flip the card to find the Devil</p>
                                )}
                            </div>
                            {!cursed ? (
                                <CardGameSection
                                    cards={cards}
                                    flippedCards={flippedCards}
                                    handleCardClick={handleCardClick}
                                />
                            ) : (
                                <>
                                    <GravitySection />
                                    <hr />
                                </>
                            )}
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            {/* Hidden button logic */}
                            {cursed ? (
                                <div
                                    onClick={phantomlikeRoute}
                                    style={{
                                        position: "absolute",
                                        bottom: "50px",
                                        right: "100px",
                                        width: "150px",
                                        height: "30px",
                                        backgroundColor: "transparent",
                                        color: "#FAEBD7",
                                        textAlign: "center",
                                        verticalAlign: "center",
                                        border: "1px solid #FAEBD7",
                                        cursor: "help",
                                        transition: "opacity 0.3s",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontFamily: "Times New Roman, Times, serif",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.border = "1px solid #780606";
                                        e.currentTarget.style.color = " #780606";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.border = "1px solid #FAEBD7";
                                        e.currentTarget.style.color = "#FAEBD7";
                                    }}
                                >
                                    Run Away
                                </div>
                            ) : (
                                <div
                                    onClick={devilordRoute}
                                    style={{
                                        position: "fixed",
                                        bottom: "20px",
                                        right: "20px",
                                        width: "250px",
                                        height: "30px",
                                        backgroundColor: "transparent",
                                        color: "#FAEBD7",
                                        textAlign: "center",
                                        verticalAlign: "center",
                                        border: "1px solid #FAEBD7",
                                        cursor: "help",
                                        opacity: 0,
                                        transition: "opacity 0.3s",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontFamily: "Times New Roman, Times, serif",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = "1";
                                        e.currentTarget.textContent =
                                            "Don't fall into the tricks";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = "0";
                                        e.currentTarget.textContent = "";
                                    }}
                                ></div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
