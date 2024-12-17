import React, { useState, useEffect } from "react";
import LogoCard from "../components/LogoCard/LogoCard";
import devilLogo from "../assets/DEVIL_white.png";
import devillordLogo from "../assets/DEVILORD_white.png";
import hordeLogo from "../assets/HORDE_white.png";
import Banner from "../components/Banner/Banner";

const cardData = [
    { id: "devil", title: "Devil", imgSrc: devilLogo },
    { id: "devillord", title: "Devillord", imgSrc: devillordLogo },
    { id: "horde", title: "Horde", imgSrc: hordeLogo },
];

const Home: React.FC = () => {
    const [cards, setCards] = useState(cardData);
    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [found, setFound] = useState(false);
    const [showJumpscare, setShowJumpscare] = useState(false);
    const [cursed, setCursed] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (cursed) {
                alert("You can't escape the cursed."); // Missing semicolon fixed
                e.preventDefault();
                e.returnValue = ""; // Required to trigger confirmation dialog
            }
        };

        // Attach the listener
        window.addEventListener("beforeunload", handleBeforeUnload);

        const savedCursed = localStorage.getItem("Cursed");
        if (savedCursed === "true") {
            setCursed(true);
            document.addEventListener("mousemove", createBloodTrail);
        } else {
            shuffleCards();
        }

        // Cleanup
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.removeEventListener("mousemove", createBloodTrail);
        };
    }, []);

    const shuffleCards = () => {
        const shuffled = [...cardData].sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setFlippedCards([]);
        setFound(false);
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

    const createBloodTrail = (e: MouseEvent) => {
        const drop = document.createElement("div");
        drop.style.position = "absolute";
        drop.style.width = "8px";
        drop.style.height = "8px";
        drop.style.backgroundColor = "#780606";
        drop.style.borderRadius = "50%";
        drop.style.top = `${e.clientY + window.scrollY}px`;
        drop.style.left = `${e.clientX + window.scrollX}px`;
        drop.style.pointerEvents = "none";
        drop.style.opacity = "0.7";
        drop.style.transition = "all 0.5s ease-out";
        document.body.appendChild(drop);

        setTimeout(() => {
            drop.style.opacity = "0";
            drop.style.transform = "translateY(10px)";
            setTimeout(() => drop.remove(), 500);
        }, 50);
    };

    return (
        <div style={{ padding: "20px", color: "#FAEBD7", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
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
                    {/* Banner Section */}
                    <Banner />

                    {/* Paragraph Section */}
                    <section style={{ marginBottom: "40px", fontFamily: "Times New Roman, Times, serif" }}>
                        <h1>Welcome to PHANTOMLIKE</h1>
                        <p style={{ maxWidth: "600px", textAlign: "justify", margin: "0 auto", lineHeight: "1.8" }}>
                            It all started 100 years ago, when the cube-like meteor fell onto our world. It tore through the skies and
                            shattered the land, leaving nothing but devastation in its wake. And yet, humanity still appears. How is
                            this possible?
                        </p>
                    </section>

                    <hr style={{opacity:"0.2"}}/>

                    {/* Card Section */}
                    <section style={{ height: "500px", fontFamily: "Times New Roman, Times, serif" }}>
                        {!cursed ? (
                            <>
                                <h2>Devil's Trick</h2>
                                <p>Flip the card to find the Devil</p>
                            </>
                        ) : (
                            <>
                                <h2 style={{ color: "#780606" }}>I̴ ̷a̴m̷ ̶h̵e̵r̵e̵</h2>
                                <p style={{ color: "#780606" }}>You found me, but who found you?</p>
                            </>
                        )}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                gap: "20px",
                                marginTop: "30px",
                            }}
                        >
                            {cards.map((card) => (
                                <LogoCard
                                    key={card.id}
                                    title={card.title}
                                    imgSrc={card.imgSrc}
                                    isBack={!flippedCards.includes(card.id)}
                                    onClick={() => handleCardClick(card.id)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* New Section Revealed When Cursed */}
                    {cursed && (
                        <>
                            <hr style={{opacity:"0.2"}}/>
                            <section
                                style={{
                                    marginTop: "40px",
                                    padding: "20px",
                                    backgroundColor: "#111",
                                    color: "#780606",
                                    border: "2px solid #780606",
                                    borderRadius: "8px",
                                    textAlign: "center",
                                }}
                            >

                                <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>The Cursed Revelation</h2>
                                <p style={{ lineHeight: "1.8" }}>
                                    You have been marked. <br />
                                    The whispers grow louder. <br />
                                    The Devil watches your every move...
                                </p>
                                <p style={{ marginTop: "20px", fontSize: "1.2rem", fontStyle: "italic" }}>
                                    "You can't escape. Not now. Not ever."
                                </p>
                            </section>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Home;
