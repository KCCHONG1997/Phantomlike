import React from "react";
import { BannerContainer, BannerImage } from "./Banner.style";
import bannerImage from "../../assets/banner.png";

const Banner: React.FC = () => {
  return (
    <BannerContainer>
      <BannerImage src={bannerImage} alt="Banner" />
    </BannerContainer>
  );
};

export default Banner;
