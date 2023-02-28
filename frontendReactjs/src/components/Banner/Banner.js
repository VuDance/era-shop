import React from "react";
import "./Banner.css";
import video from "../../assets/video.mp4";

const Banner = () => {
  return (
    <div className="banner">
      <video loop autoPlay muted src={video} />
      <div className="banner-text">
        <h1>ERA-SHOP</h1>
        <h5>
          A place where you can find all your favorite authors and characters
        </h5>
      </div>
    </div>
  );
};

export default Banner;
