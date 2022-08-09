import React from "react";

const CardCart = ({ cartProduct, navigate, dispatch, deleteCartThunk }) => {
  const total = cartProduct.quantity * cartProduct.product.price;
  const totalCart = [];
  totalCart.push(total);


  return (
    <div className="card-cart">
      <strong >
        <p>{cartProduct.brand}</p>
        <span>
          <button
            onClick={() => dispatch(deleteCartThunk(cartProduct.productId))}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </span>
        <h2> {cartProduct.product.title} </h2>
      </strong>
      <p>{cartProduct.quantity}</p>
      <span>
        Total: <strong> $ {total}</strong>
      </span>
    </div>
  );
};

export default CardCart;
