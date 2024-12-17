import React, { useEffect } from 'react';
import styled from 'styled-components';
import Countdown from '../components/Countdown';

const CountdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  background: black;
  color: white;
`;

const CountdownText = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const CountdownPage: React.FC<{ onCountdownFinish: () => void }> = ({ onCountdownFinish }) => {
    useEffect(() => {
        const targetDate = new Date('December 24, 2024 00:00:00').getTime();
        // const targetDate = new Date('December 15, 2024 16:43:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            if (now >= targetDate) {
                onCountdownFinish();
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [onCountdownFinish]);

    return (
        <CountdownContainer>
            <CountdownText>Countdown:</CountdownText>
            <Countdown targetDate="December 24, 2024 00:00:00" />
        </CountdownContainer>
    );
};

export default CountdownPage;
