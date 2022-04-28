import React from "react";

const ProductDetailImages = ({ image }) => {
  return (
    <div>
      <div className="quote">
        <img height="70%" width="100%" src={image.photo} alt="user" />
      </div>
    </div>
  );
};

export default ProductDetailImages;
