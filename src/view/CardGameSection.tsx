import React from "react";
import LogoCard from "../components/LogoCard/LogoCard";

type CardGameSectionProps = {
    cards: { id: string; title: string; imgSrc: string }[];
    flippedCards: string[];
    handleCardClick: (id: string) => void;
};

const CardGameSection: React.FC<CardGameSectionProps> = ({
    cards,
    flippedCards,
    handleCardClick,
}) => {
    return (
        <section style={{ fontFamily: "Times New Roman, Times, serif" }}>
            <h2>Devil's Trick</h2>
            <p>Flip the card to find the Devil</p>
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
    );
};

export default CardGameSection;
