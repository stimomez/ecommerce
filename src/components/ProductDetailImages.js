import React from "react";

const ProductDetailImages = ({ image }) => {
  return (
    <div className="quote">
      <img  src={image.photo} alt="" />
      <p className="invisible-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quos cum facere recusandae dicta sunt, pariatur odio quis reprehenderit aliquam provident totam blanditiis molestiae maxime, facilis excepturi culpa perspiciatis! Recusandae.</p>
    </div>
  );
};

export default ProductDetailImages;
