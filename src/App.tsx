import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import CountdownPage from './view/CountdownPage';
import LoveMessagePage from './view/LoveMessagePage';

const debugMode = false; // Set to `false` for production

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    overflow: hidden;
    background: ${(props: { countdownFinished: boolean }) =>
    props.countdownFinished ? 'linear-gradient(120deg, #ffd1dc, #ffe4e1)' : '#000'};
    color: ${(props: { countdownFinished: boolean }) =>
    props.countdownFinished ? '#ff69b4' : '#fff'};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const App: React.FC = () => {
  const [countdownFinished, setCountdownFinished] = useState(debugMode);

  return (
    <>
      {countdownFinished ? (
        <>
          <GlobalStyle countdownFinished />
          <LoveMessagePage />
        </>
      ) : (
        <>
          <GlobalStyle countdownFinished={false} />
          <CountdownPage onCountdownFinish={() => setCountdownFinished(true)} />
        </>
      )}


    </>
  );
};

export default App;
