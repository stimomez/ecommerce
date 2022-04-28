import React, { useEffect, useState } from "react";
import { ProductDetailImages } from "../components";
import "../styles/productDetailCarrucel.css";

const ProductDetailCarrucel = ({ productsFound }) => {
  const arrayImages = productsFound?.productImgs;
  // console.log(productsFound)
  const productImgs = [];

  for (let i = 0; i < arrayImages?.length; i++) {
    productImgs.push({
      id: i,
      photo: arrayImages[i],
    });
  }

  const [position, setPosition] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (position === productImgs.length) {
        setPosition(1);
      } else {
        setPosition(position + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [position, productImgs.length]);

  const width = {
    width: productImgs.length * 100 + "%",
    transform: `translateX(-${((position - 1) * 100) / productImgs.length}%)`,
  };

  return (
    <div className="container-carrucel">
      <div className="flex" style={width}>
        {productImgs.map((image) => (
          <ProductDetailImages image={image} key={image.id} />
        ))}
      </div>
      <div>
        {productImgs.map((img) => {
          console.log(img);
          const id = img.id;
          return (
            <button
              key={id}
              className="button"
              onClick={() => setPosition(id + 1)}
            >
              <img
             
                className={`image-button-carrucel ${
                  position === id + 1 && "button-border"
                }`}
                src={img.photo}
                alt=""
               
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetailCarrucel;
