import styled from "styled-components";

export const CardContainer = styled.div`
  width: 120px;
  height: 200px;
  position: relative;
  perspective: 1000px; 
  cursor: pointer;
  user-select: none;
`;

export const CardFace = styled.div<{ isFront: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #FAEBD7;
  border-radius: 8px;
  backface-visibility: hidden;
  transform: ${(props) => (props.isFront ? "rotateY(0deg)" : "rotateY(180deg)")};
  pointer-events: none;
`;

export const LogoImage = styled.img`
  width: 80%;
  height: 100%;
  object-fit: cover; 
  user-select: none;
  pointer-events: none;
`;
