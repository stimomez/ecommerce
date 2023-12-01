import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCategoriesThunk,
  getCategoriesThunk,
  getNewsThunk,
  setNews,
} from "../redux/actions";
import "../styles/home.css";
import { urlAPI } from "../api/request";
const Home = () => {
  const dispatch = useDispatch();

  const [productsToFilter, setproductsToFilter] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [isText, setIsText] = useState("");

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

  const filterProducts = (e) => {
    e.preventDefault();
    dispatch(setNews({ status: "success", products: searchProducts }));
  };
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const filterProductsRequest = (e) => {
    urlAPI
      .get("/products", getConfig())
      .then((res) => setproductsToFilter(res.data.products))
      .catch(() => alert("Error"));
  };

  const handleChangeInput = (e) => {
    setIsText(e.target.value);
    const products = productsToFilter.filter((product) => {
      const title = product.title.toLowerCase();
      return title.includes(e.target.value.toLowerCase());
    });
    setSearchProducts(products);
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
        <form onSubmit={filterProducts}>
          <input
            type="text"
            placeholder="What are you looking for"
            onClick={filterProductsRequest}
            onChange={(e) => {
              handleChangeInput(e);
            }}
          />
          <button disabled={!isText.trim()}>
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
