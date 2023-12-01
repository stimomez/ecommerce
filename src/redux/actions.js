
import { urlAPI } from "../api/request";

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
    urlAPI
      .get("/products")
      .then((res) => {dispatch(setNews(res.data))})
      .finally(() => dispatch(setIsLoanding(false)));
  };
};
export const getCategoriesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    urlAPI
      .get("/products/categories")
      .then((res) => dispatch(setCategories(res.data)))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const filterCategoriesThunk = (id) => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    urlAPI
      .get(`/products/category/${id}`)
      .then((res) => {
        dispatch(setNews(res.data.category));
      })
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const filterSearchThunk = (search) => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return urlAPI
      .get(`/products/filter/${search}`)
      .then((res) => dispatch(setNews(res.data)))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};
export const loginThunk = (credentials) => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return urlAPI
      .post("/users/login", credentials)
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const addCartThunk = (productsToCart) => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));

    return urlAPI
      .post("/cart/add-product", productsToCart, getConfig())
      .then(() => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const getCartThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return urlAPI
      .get(`/cart/products-cart`, getConfig())
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
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return urlAPI
      .delete(`/cart/${productId}`, getConfig())
      .then(() => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};

export const checkoutThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return urlAPI.post(`/cart/purchase`, {}, getConfig()).finally(() => {
      dispatch(setIsLoanding(false));
      dispatch(getCartThunk());
    });
  };
};
export const getPurchasesThunk = () => {
  return (dispatch) => {
    dispatch(setIsLoanding(true));
    return urlAPI
      .get(`/users/orders`, getConfig())
      .then((res) => dispatch(setPurchases(res.data)))
      .finally(() => dispatch(setIsLoanding(false)));
  };
};
