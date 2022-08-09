import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkoutThunk, deleteCartThunk } from "../redux/actions";
import "../styles/cart.css";
import CardCart from "./CardCart";

const Cart = ({ isOpen }) => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalCartArray = [];

  cart.productsInCart?.forEach((product) => {
    const total = product.product.price * product.quantity;

    totalCartArray.push(total);
  });

  const initialValue = 0;
  const totalCart = totalCartArray.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return (
    <div className={` cart-modal ${isOpen ? "open" : ""}`}>
      <h3>Shopping cart</h3>

      {cart.productsInCart?.map((cartProduct) => (
        <li key={cartProduct.id}>
          <CardCart
            cartProduct={cartProduct}
            navigate={navigate}
            dispatch={dispatch}
            deleteCartThunk={deleteCartThunk}
          />
        </li>
      ))}
      <div className="checkout">
        <span>Total: </span> <strong> $ {totalCart}</strong>
        <button
          onClick={() => dispatch(checkoutThunk())}
          disabled={totalCart <= 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
