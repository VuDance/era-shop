import React, { useState } from "react";

export default function Slide({ data }) {
  const [indexs, setIndex] = useState(0);
  const thumbnailElement = [data.image1, data.image2, data.image3];

  return (
    <div className="product-container">
      <div className="image-container">
        <img src={thumbnailElement[indexs]} alt="product" />
      </div>
      <div className="thumbnail-container">
        {thumbnailElement.map((i, index) => (
          <img
            src={i}
            alt="product"
            onClick={() => setIndex(index)}
            className={index === indexs ? "current" : ""}
          />
        ))}
      </div>
    </div>
  );
}
