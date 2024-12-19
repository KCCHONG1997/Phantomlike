import React, { useState, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import ParagraphSection from "./ParagraphSection";
import CardGameSection from "./CardGameSection";
import GravitySection from "./GravitySection";
import devilLogo from "../assets/DEVIL_white.png";
import devillordLogo from "../assets/DEVILORD_white.png";
import hordeLogo from "../assets/HORDE_white.png";

const cardData = [
    { id: "devil", title: "Devil", imgSrc: devilLogo },
    { id: "devillord", title: "Devillord", imgSrc: devillordLogo },
    { id: "horde", title: "Horde", imgSrc: hordeLogo },
];

const Home: React.FC = () => {
    // Shuffle the cards initially
    const [cards, setCards] = useState(() =>
        [...cardData].sort(() => Math.random() - 0.5)
    );
    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [found, setFound] = useState(false);
    const [showJumpscare, setShowJumpscare] = useState(false);
    const [cursed, setCursed] = useState(false);

    useEffect(() => {
        const savedCursed = localStorage.getItem("Cursed");
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
        // const drop = document.createElement("div");
        // drop.style.position = "absolute";
        // drop.style.width = "8px";
        // drop.style.height = "8px";
        // drop.style.backgroundColor = "#780606";
        // drop.style.borderRadius = "50%";
        // drop.style.top = `${e.clientY + window.scrollY}px`;
        // drop.style.left = `${e.clientX + window.scrollX}px`;
        // drop.style.pointerEvents = "none";
        // drop.style.opacity = "0.7";
        // drop.style.transition = "all 0.5s ease-out";
        // document.body.appendChild(drop);

        // setTimeout(() => {
        //     drop.style.opacity = "0";
        //     drop.style.transform = "translateY(10px)";
        //     setTimeout(() => drop.remove(), 500);
        // }, 50);
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

    return (
        <div style={{ padding: "20px", color: "#FAEBD7", textAlign: "center" }}>
            <h1 style={{ fontFamily: "Times New Roman, Times, serif" }}>#1 - INTRO</h1>
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
                    <hr/>
                    <ParagraphSection cursed={cursed} />
                    <hr/>
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
                        <><GravitySection />
                        <hr /></>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
