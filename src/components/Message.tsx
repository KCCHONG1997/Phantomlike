import React from 'react';
import styled from 'styled-components';

const StyledMessage = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-shadow: 2px 2px #ffffff;
`;

const Message: React.FC<{ text: string }> = ({ text }) => <StyledMessage>{text}</StyledMessage>;

export default Message;
