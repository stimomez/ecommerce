import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCartThunk, getNewsThunk } from "../redux/actions";
import { Link } from "react-router-dom";
import "../styles/products-detail.css";
import { ProductDetailCarrucel } from "../components";

const ProductsDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const products = useSelector((state) => state.news);

  const [productsFiltered, setProductsFiltered] = useState([]);
  //para controlar la cantidad del carrito
  const [units, setUnits] = useState(1);

  useEffect(() => {
    dispatch(getNewsThunk());
  }, [dispatch]);

  const productsFound = products?.products?.find(
    (productsItem) => productsItem.id === Number(id)
  );

  useEffect(() => {
    if (productsFound) {
      axios
        .get(
          `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productsFound?.category.id}`
        )
        .then((res) => setProductsFiltered(res.data.data));
    }
  }, [dispatch, productsFound]);

  const addCart = () => {
    const productsToCart = {
      id: Number(id),
      quantity: Number(units),
    };

    dispatch(addCartThunk(productsToCart));
    setUnits(1);
  };

  const goUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container">
      <ProductDetailCarrucel productsFound={productsFound} />

      <div className="description">
        <h2>{productsFound?.title}</h2>
        <p>{productsFound?.description}</p>
        <label htmlFor="units">Units</label>
        <br />
        <input
          type="number"
          id="units"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        />

        <p className="price-description">Price</p>
        <h3>$ {productsFound?.price}</h3>
        <button onClick={addCart}>Add to cart</button>
      </div>
      <div className="related-products">
        <p className="subtitle">Discover similar items</p>

        <ul className="product-card">
          {productsFiltered.products?.map((productsItem) => (
            <li className="products-list" key={productsItem.id}>
              <img
                className="over"
                src={productsItem.productImgs[0]}
                height="250px" width="250px" 
                alt=""
              />
              <img className="image-main" src={productsItem.productImgs[1]} height="250px" width="250px"   alt="" />
              <div className="info">
                <Link
                  to={`/products/${productsItem.id}`}
                  onClick={() => goUp()}
                >
                  {" "}
                  <h2 className="info-title">{productsItem.title} </h2>
                </Link>
                <br />
                <p className="title-price">Price</p>
                <p className="price">$ {productsItem.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsDetail;
