import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #ff69b4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  z-index:10;

  &:hover {
    background-color: #ff85c0;
  }

  &:active {
    background-color: #ff4081;
  }
`;

const Button: React.FC<React.PropsWithChildren<{ onClick: () => void }>> = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

export default Button;
