import React from "react";
import { useSelector } from "react-redux";
import CardPurchases from "../components/CardPurchases";
import { Link } from "react-router-dom";
import "../styles/purchases.css";

const Purchases = () => {
  const purchases = useSelector((state) => state.purchases);

  return (
    <div>
      <div className="purchases">
        <h1 className="purchases-title"> My purchases</h1>
        {purchases.purchases?.map((purchase) => (
          <ul className="cart-purchases" key={purchase.id}>
            <CardPurchases datePurchase={purchase.createdAt} />

            <ul className="cart-purchases-description">
              {purchase.cart?.products.map((product) => (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <strong className="product-purchases-title">
                      {product.title}
                    </strong>{" "}
                    <strong className="quantity-purchases">
                      {" "}
                      {product.productsInCart.quantity}{" "}
                    </strong>{" "}
                    <strong className="price-purchases">
                      ${product.price}
                    </strong>
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Purchases;
