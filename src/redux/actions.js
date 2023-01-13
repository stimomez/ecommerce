import axios from "axios";

export const actions = {
  setNews: "SET_NEW",
  setIsLoanding: "SET_IS_LOANDING",
  setCategories: "SET_CATEGORIES",
  setCart: "SET_CART",
  setPurchases: "SET_PURCHASES",
};
//para enviar el token
const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const setNews = (news) => ({
  type: actions.setNews,
  payload: news,
});
export const setIsLoanding = (isLoanding) => ({
  type: actions.setIsLoanding,
  payload: isLoanding,
});
export const setCategories = (categories) => ({
  type: actions.setCategories,
  payload: categories,
});
export const setCart = (cart) => ({
  type: actions.setCart,
  payload: cart,
});
export const setPurchases = (purchase) => ({
  type: actions.setPurchases,
  payload: purchase,
});

export const getNewsThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    axios
      .get("https://web-production-6e40.up.railway.app/api/v1/products")
      .then((res) => dispatch(setNews(res.data)))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};
export const getCategoriesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    axios
      .get("https://web-production-6e40.up.railway.app/api/v1/products/categories")
      .then((res) => dispatch(setCategories(res.data)))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const filterCategoriesThunk = (id) => {
  return (dispatch) => {
    console.log(id);
    dispatch(setIsLoanding(true));
    axios
      .get(
        `https://web-production-6e40.up.railway.app/api/v1/products/category/${id}`
      )
      .then((res) => {
        console.log(res.data.category);
        dispatch(setNews(res.data.category));
      })
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const filterSearchThunk = (search) => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return axios
      .get(
        `https://web-production-6e40.up.railway.app/api/v1/products/filter/${search}`
      )
      .then((res) => dispatch(setNews(res.data)))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};
export const loginThunk = (credentials) => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return axios
      .post(
        "https://web-production-6e40.up.railway.app/api/v1/users/login",
        credentials
      )
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const addCartThunk = (productsToCart) => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));

    return axios
      .post(
        "https://web-production-6e40.up.railway.app/api/v1/cart/add-product",
        productsToCart,
        getConfig()
      )
      .then(() => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const getCartThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return axios
      .get(
        `https://web-production-6e40.up.railway.app/api/v1/cart/products-cart`,
        getConfig()
      )
      .then((res) => dispatch(setCart(res.data)))
      .catch((er) => {
        if (er.response.status === 404) {
          // console.log("El carro esta vacio");
          dispatch(setCart(""));
        }
      })
      .finally(() => dispatch(setIsLoanding(false)));
  };
};
export const deleteCartThunk = (productId) => {
  console.log(productId);
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return axios
      .delete(
        `https://web-production-6e40.up.railway.app/api/v1/cart/${productId}`,
        getConfig()
      )
      .then(() => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const checkoutThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return axios
      .post(
        `https://web-production-6e40.up.railway.app/api/v1/cart/purchase`,
        {},
        getConfig()
      )
      .finally(() => {
        dispatch(setIsLoanding(false));
        dispatch(getCartThunk());
      });
  };
};
export const getPurchasesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return axios
      .get(
        `https://web-production-6e40.up.railway.app/api/v1/users/orders`,
        getConfig()
      )
      .then((res) => dispatch(setPurchases(res.data)))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};
