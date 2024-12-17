import React from "react";
import { CardContainer, LogoImage, CardFace } from "./LogoCard.style";
import { motion } from "framer-motion";
import cardBack from "../../assets/card_back.png";

type LogoCardProps = {
  title: string;
  imgSrc: string;
  isBack: boolean; // Show back face or front face
  onClick: () => void;
};

const LogoCard: React.FC<LogoCardProps> = ({ title, imgSrc, isBack, onClick }) => {
  return (
    <CardContainer
      as={motion.div}
      onClick={onClick}
      initial={false}
      animate={{ rotateY: isBack ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Front Face */}
      <CardFace isFront={!isBack}>
        <LogoImage src={imgSrc} alt={title} />
      </CardFace>

      {/* Back Face */}
      <CardFace isFront={isBack}>
        <LogoImage src={cardBack} alt="Back of the card" />
      </CardFace>
    </CardContainer>
  );
};

export default LogoCard;
