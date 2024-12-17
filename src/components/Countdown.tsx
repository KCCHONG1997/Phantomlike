import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CountdownWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
  color: #ff69b4;
`;

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("Time's up! 🎉");
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  return <CountdownWrapper>{timeLeft}</CountdownWrapper>;
};

export default Countdown;
