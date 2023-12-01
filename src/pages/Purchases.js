
import { useSelector } from "react-redux";
import CardPurchases from "../components/CardPurchases";
import { Link } from "react-router-dom";
import "../styles/purchases.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPurchasesThunk } from "../redux/actions";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="purchases">
        <h1 className="purchases-title"> My purchases</h1>
        {purchases.orderWithYourProducts?.map((purchase) => (
          <ul className="cart-purchases" key={purchase.order.id}>
            <div>
              <CardPurchases datePurchase={purchase.order.createdAt} />

              <ul className="cart-purchases-description">
                {purchase.productInCart?.map((product) => (
                  <li key={product.id}>
                    <Link to={`/products/${product.product.id}`}>
                      <strong className="product-purchases-title">
                        {product.product.title}
                      </strong>{" "}
                      <strong className="quantity-purchases">
                        {" "}
                        {product.quantity}{" "}
                      </strong>{" "}
                      <strong className="price-purchases">
                        ${product.quantity * product.product.price}
                      </strong>
                    </Link>
                  </li>
                ))}

                <strong className="cart-purchases-total">
                  Total: $ {purchase.order.totalPrice}
                </strong>
              </ul>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Purchases;
