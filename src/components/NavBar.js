import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Cart } from ".";

import { getCartThunk, getPurchasesThunk, loginThunk } from "../redux/actions";
import "../styles/navbar.css";

const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openCart = () => {
    if (localStorage.getItem("token")) {
      setIsCartOpen(!isCartOpen);
      dispatch(getCartThunk());
    } else {
      console.log("estoy cerrado");
      setIsLoginOpen(!isLoginOpen);
    }
  };
  const openPurchases = () => {
    if (localStorage.getItem("token")) {
      dispatch(getPurchasesThunk());
      navigate("/purchases");
      console.log("entre");
    } else {
      console.log("estoy cerrado");
      setIsLoginOpen(!isLoginOpen);
    }
  };

  const login = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    dispatch(loginThunk(credentials))
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setLoginError("");
        setIsLoginOpen(false);
        setEmail("");
        setPassword("");
      })
      .catch((er) => setLoginError(er.response.data.message));

    //console.log(localStorage.getItem("token"))
  };
  return (
    <div className="header">
      <nav className="navbar">
        <Link to={"/#/"}>
          <strong className="navbar-title">e-commerce</strong>
        </Link>
        <div className="buttons">
          <div className="header-buttons">
            <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
              <i className="btn-login fa-solid fa-right-to-bracket"></i>
            </button>
          </div>
          <div className="header-buttons">
            <button onClick={() => openCart()}>
              <i className="btn-cart fas fa-shopping-cart"></i>
            </button>
          </div>

          <div className="header-buttons">
            <button
              onClick={() => openPurchases()}
              disabled={!localStorage.getItem("token")}
            >
              <i className="btn-purchases fas fa-money-check"></i>
            </button>
          </div>
        </div>
      </nav>

      <form
        onSubmit={login}
        className={`form-login ${isLoginOpen ? "open" : ""}`}
      >
        {localStorage.getItem("token") ? (
          <>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBMLgeAVCyTvVd96An7ec4XKwiJs7uULpDVNUPksggWmY3sBuLcEK0kgwcuMJ84_gs4Kk&usqp=CAU"
              alt=""
            />
            <br />
            <button
              onClick={() => {
                localStorage.setItem("token", "");
                setIsLoginOpen(false);
              }}
              type="button"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBMLgeAVCyTvVd96An7ec4XKwiJs7uULpDVNUPksggWmY3sBuLcEK0kgwcuMJ84_gs4Kk&usqp=CAU"
              alt=""
            />
            <div className="test-data">
              <h4>Test data</h4>
              <div className="test-email">
                <i className="icon-mail fa-solid fa-envelope"></i>
                
              </div>

              <div className="test-password">
                <i className="icon-mail fa-solid fa-lock"></i>
                
              </div>
            </div>
            <br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p>{loginError}</p>
            <button>Login</button>
          </>
        )}
      </form>

      <Cart isOpen={isCartOpen} />
    </div>
  );
};

export default NavBar;
