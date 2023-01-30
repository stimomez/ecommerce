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

  const productsActives = [];

  const products = useSelector((state) => state.news);

  const [productsFiltered, setProductsFiltered] = useState([]);

  productsFiltered.category?.products.forEach((product) => {
    if (product.status === "active") {
      productsActives.push(product);
    }
  });

  //para controlar la cantidad del carrito
  const [units, setUnits] = useState(1);
  useEffect(() => {
    dispatch(getNewsThunk());
  }, [dispatch]);

  const productsFound = products?.products?.find(
    (productsItem) => productsItem.id === Number(id)
  );

  const categoryId = productsFound?.categoryId;

  useEffect(() => {
    if (productsFound) {
      axios
        .get(
          `https://web-production-6e40.up.railway.app/api/v1/products/category/${categoryId}`
        )
        .then((res) => setProductsFiltered(res.data));
    }
  }, [categoryId, productsFound]);

  const addCart = () => {
    const productsToCart = {
      productId: Number(id),
      quantity: Number(units),
    };

    dispatch(addCartThunk(productsToCart));
    setUnits(1);
  };

  const goUp = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="container">
        <div className="container-carrucel-products">
          <ProductDetailCarrucel productsFound={productsFound} />
        </div>

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
          <button onClick={() => addCart()}>Add to cart</button>
        </div>
      </div>
      <div className="related-products">
        <p className="subtitle">Discover similar items</p>

        <ul className="related-product-card">
          {productsActives?.map((productsItem) => (
            <li className="related-products-list" key={productsItem.id}>

              <img
                className="related-over"
                src={productsItem.productImgs[0]?.imgUrl}
                height="250px"
                width="250px"
                alt=""
              />
              <img
                className="related-image-main"
                src={productsItem.productImgs[1]?.imgUrl}
                height="250px"
                width="250px"
                alt=""
              />
              <div className="related-info">
                <Link
                  to={`/products/${productsItem.id}`}
                  onClick={() => goUp()}
                >
                  {" "}
                  <h2 className="related-info-title">{productsItem.title} </h2>
                </Link>
                <br />
                <p className="related-title-price">Price</p>
                <p className="related-price">$ {productsItem.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsDetail;
