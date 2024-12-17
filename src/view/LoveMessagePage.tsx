import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "🎂🐡💖",
  "Happy Birthday My Pufferfish!",
  "I just want to let you know, I love you",
  "You're the best thing that ever happened to me",
  "Forever and always, my love💖",
  "That's all :D",
  "Why you still clicking?",
  "Stop?",
  "That's all!",
  "Ok too much emoji",
  "STAAAAPPPP",
  "OK I LOVE YOU!",
  "Is that enough?",
  "Still going???",
  "I'll disable the button now.",
  "Wait you still able to click?!",
  "STOP STOP STOP",
  "ACTIVATE RUNNING BUTTON"
];

const emojis = ["🎂", "❤️", "🐡"];

// Global style for the entire page
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #fde8e8;
    color: #4e6e58;
    overflow: hidden;
  }
`;

// Styled emoji container
const RandomEmoji = styled(motion.div)`
  position: absolute;
  font-size: 24px;
  opacity: 0.5;
  z-index: -2;
  user-select: none;
`;

// Message component with a background
const ThemedMessage = styled.div`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 20px auto;
  padding: 10px 20px;
  max-width: 80%;
  color: #4e6e58;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  user-select: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Moving button
const MovingButton = styled.button<{ x: number; y: number }>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  transform: translate(-50%, -50%);
  background:rgb(219, 185, 181);
  color: #4e6e58;
  border: 3px solid #4e6e58;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: #c98c87;
  }
`;

const LoveMessagePage: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [hearts, setHearts] = useState<{ x: number; y: number; scale: number; emoji: string }[]>([]);
  const [buttonPosition, setButtonPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight - 100 });

  // Handle button movement based on mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (messageIndex === messages.length - 1) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const dx = mouseX - buttonPosition.x;
      const dy = mouseY - buttonPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const threshold = 100; // Threshold to trigger button movement
      if (distance < threshold) {
        // Calculate new random position
        const offsetX = Math.random() * 200 - 100;
        const offsetY = Math.random() * 200 - 100;
        const newX = Math.min(Math.max(buttonPosition.x + offsetX, 50), window.innerWidth - 50);
        const newY = Math.min(Math.max(buttonPosition.y + offsetY, 50), window.innerHeight - 50);

        setButtonPosition({ x: newX, y: newY });
      }
    }
  };

  const handleButtonClick = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    setHearts((prevHearts) => {
      const newHearts = Array.from({ length: 5 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 1,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }));

      const updatedHearts = prevHearts.map((heart) => ({
        ...heart,
        scale: heart.scale + 0.5
      }));

      return [...updatedHearts, ...newHearts];
    });
  }, [messageIndex]);

  return (
    <>
      <GlobalStyle />
      <div onMouseMove={handleMouseMove}>
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThemedMessage>{messages[messageIndex]}</ThemedMessage>
          </motion.div>
        </AnimatePresence>

        {hearts.map((heart, index) => (
          <RandomEmoji
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.7, scale: heart.scale }}
            transition={{ duration: 1 }}
            style={{ left: heart.x, top: heart.y }}
          >
            {heart.emoji}
          </RandomEmoji>
        ))}

        <MovingButton
          onClick={handleButtonClick}
          x={buttonPosition.x}
          y={buttonPosition.y}
        >
          {messageIndex < messages.length - 1 ? "Next Message" : "Don't Touch Me!"}
        </MovingButton>
      </div>
    </>
  );
};

export default LoveMessagePage;
