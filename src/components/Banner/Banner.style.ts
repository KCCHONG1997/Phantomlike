import styled from "styled-components";

export const BannerContainer = styled.div`
  width: 100%;
  height: 600px; /* Fixed height for the banner */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensure the image fits within the container without cropping */
`;
