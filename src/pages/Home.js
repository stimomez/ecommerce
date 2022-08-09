import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCategoriesThunk,
  getCategoriesThunk,
  getNewsThunk,
  filterSearchThunk,
} from "../redux/actions";
import "../styles/home.css";
const Home = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [isText, setIsText] = useState(false);

  const products = useSelector((state) => state.news);
  const categories = useSelector((state) => state.categories);
  const productsActives = [];
  const activeCategories = [];

  products.products?.forEach((product) => {
    if (product.status === "active") {
      productsActives.push(product);
    }
  });

  categories.categories?.forEach((category) => {
    if (category.status === "active") {
      activeCategories.push(category);
    }
  });

  useEffect(() => {
    dispatch(getNewsThunk());
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  const searchProducts = (e) => {
    e.preventDefault();
    dispatch(filterSearchThunk(search));
    setSearch("");
    setIsText(false)

  };

  return (
    <div className="container-home">
      <h1>HOME</h1>

      <div className="categories-products">
        <h1 className="categories-title">
          Category{" "}
          <label htmlFor="categories">
            {" "}
            <span>
              <i className="icon-categories fa-solid fa-bars"></i>
            </span>
          </label>{" "}
        </h1>
        <input type="checkbox" id="categories" />
        <ul className="categories-list">
          {activeCategories?.map((category) => (
            <li className="categories-items" key={category.id}>
              <button
                onClick={() => dispatch(filterCategoriesThunk(category.id))}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="search-products">
        <form onSubmit={searchProducts}>
          <input
            type="text"
            placeholder="What are you looking for"
            onChange={(e) => {
              setIsText(true);
              setSearch(e.target.value);
              
            }}
          />
          <button disabled={!isText}>
            <i className="icon-search fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <ul className="product-card">
          {products.products?.length === 0 ? (
            <li>No search results found</li>
          ) : (
            productsActives?.map((product) => (
              <li className="products-list" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    className="over"
                    src={product.productImgs?.[1]?.imgUrl}
                    height="200px"
                    width="200px"
                    alt=""
                  />
                  <img
                    className="image-main"
                    src={product.productImgs?.[0]?.imgUrl}
                    height="200px"
                    width="200px"
                    alt=""
                  />
                  <div className="info">
                    <h2 className="info-title">{product.title}</h2>

                    <p className="title-price">Price</p>
                    <h2 className="price">$ {product.price}</h2>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
