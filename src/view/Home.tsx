import React, { useState, useEffect } from "react";
import LogoCard from "../components/LogoCard/LogoCard";
import devilLogo from "../assets/DEVIL_white.png";
import devillordLogo from "../assets/DEVILORD_white.png";
import hordeLogo from "../assets/HORDE_white.png";

const cardData = [
    { id: "devil", title: "Devil", imgSrc: devilLogo },
    { id: "devillord", title: "Devillord", imgSrc: devillordLogo },
    { id: "horde", title: "Horde", imgSrc: hordeLogo },
];

const Home: React.FC = () => {
    const [cards, setCards] = useState(cardData);
    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [isShuffling, setIsShuffling] = useState(true);
    const [found, setFound] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        shuffleCards();
    }, []);

    const shuffleCards = () => {
        setIsShuffling(true);
        setFlippedCards([]);
        setFound(false);
        setMessage(null);

        setTimeout(() => {
            const shuffled = [...cards].sort(() => Math.random() - 0.5);
            setCards(shuffled);
            setIsShuffling(false);
        }, 1500);
    };

    const handleCardClick = (id: string) => {
        if (flippedCards.includes(id) || found) return;

        setFlippedCards([...flippedCards, id]);

        if (id === "devil") {
            setFound(true);
            setMessage("Found it!");
        } else {
            setMessage("Oops... its not here...");
        }
    };

    return (
        <div style={{ padding: "20px", color: "#FAEBD7", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
            {/* Paragraph Section */}
            <section style={{ marginBottom: "40px", fontFamily: "Times New Roman, Times, serif" }}>
                <h1 style={{ marginBottom: "20px", fontFamily: "Times New Roman, Times, serif" }}><u>Welcome to PHANTOMLIKE</u></h1>
                <p style={{
                    maxWidth: "600px",
                    textAlign: "justify",
                    margin: "0 auto",
                    lineHeight: "1.8",
                    fontFamily: "Times New Roman, Times, serif"
                }}>
                    A century has passed since the world fell into chaos.
                    It all began when a massive, cube-like meteor crashed onto Earth, shattering skies and ripping apart landscapes.
                    From the meteor emerged the Devil, otherworldly beings of terrifying power, and their tyrannical overlords, the Devillord.
                    But the worst was yet to come. The meteor unleashed a silent plague: the Phantom virus. No one knows how it spreads. No one can predict who will fall next. The infected roam the wastelands, their minds consumed and bodies twisted, now called the Horde.

                    Cities turned to ash. Governments crumbled. Those who survived retreated to hidden strongholds, living in constant fear of the unknown.
                    Now, 100 years later, in the ruins of civilization, the few who remain must fight to uncover the truth of the Phantom virus — and the dark forces that came with it.
                </p>
            </section>

            <hr style={{ opacity: "0.3" }} />
            {/* Card Section */}
            <section style={{ height: "420px" }}>
                <h2 style={{ marginBottom: "20px", fontFamily: "Times New Roman, Times, serif" }} >Where is the Devil?</h2>
                <p style={{ marginBottom: "20px", fontFamily: "Times New Roman, Times, serif" }} >Flip the card to find the Devil</p>

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

                {message && <p style={{ marginTop: "20px", fontFamily: "Times New Roman, Times, serif" }}>{message}</p>}

                {found && (
                    <button
                        onClick={shuffleCards}
                        style={{
                            marginTop: "8px",
                            padding: "10px 20px",
                            backgroundColor: "#444",
                            color: "#FAEBD7",
                            border: "none",
                            cursor: "pointer",
                            borderRadius: "5px",
                        }}
                    >
                        Play Again
                    </button>
                )}
            </section>

            <hr style={{ opacity: "0.3" }} />
        </div>
    );
};

export default Home;
