import React from 'react';

const ProductDetailImages = ({image}) => {
    return (
        <div>
            <div className="quote">
        <img src={image.photo} alt="user"/>
        <h3>{image.name}</h3>
        
      </div>
        </div>
    );
};

export default ProductDetailImages;