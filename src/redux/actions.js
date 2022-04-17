import axios from "axios"

export const actions = {
    setNews: "SET_NEW",
    setIsLoanding: "SET_IS_LOANDING",
    setCategories: "SET_CATEGORIES",
    setCart: "SET_CART",
    setPurchases: "SET_PURCHASES"
}
//para enviar el token
const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const setNews = news => ({
    type: actions.setNews,
    payload: news
})
export const setIsLoanding = isLoanding => ({
    type: actions.setIsLoanding,
    payload: isLoanding
})
export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})
export const setCart = cart => ({
    type: actions.setCart,
    payload: cart
})
export const setPurchases = purchase => ({
    type: actions.setPurchases,
    payload: purchase
})

export const getNewsThunk = () => {
    return dispatch => {
        dispatch(setIsLoanding(true))
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products ')
        .then(res => dispatch(setNews(res.data.data)))
        .finally(() =>dispatch(setIsLoanding(false)))
    }
}
export const getCategoriesThunk = () => {
     return dispatch => {
        dispatch(setIsLoanding(true))
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
        .then(res => dispatch(setCategories(res.data.data)))
        .finally(() =>dispatch(setIsLoanding(false)))
     }
}

export const filterCategoriesThunk = id => {
 
    
    return dispatch => {
        dispatch(setIsLoanding(true))
         axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`)
        .then(res => dispatch(setNews(res.data.data)))
        .finally(() =>dispatch(setIsLoanding(false)))
        
    }
}

export const filterSearchThunk = search => {
    return dispatch =>{
        dispatch(setIsLoanding(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${search}`)
        .then(res => dispatch(setNews(res.data.data)))
        .finally(() =>dispatch(setIsLoanding(false)))
    }
}
export const loginThunk = credentials => {
    return dispatch =>{
        dispatch(setIsLoanding(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login',credentials)
        .finally(() =>dispatch(setIsLoanding(false)))
    }

}

export const addCartThunk = productsToCart => {
    return dispatch => {
        dispatch(setIsLoanding(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart',productsToCart, getConfig())
        .then(res => dispatch(getCartThunk()))
        .finally(() =>dispatch(setIsLoanding(false)))
    }
    
}

export const getCartThunk = () => {
    return dispatch => {
        dispatch(setIsLoanding(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`,getConfig())
        .then(res => dispatch(setCart(res.data.data)))
        .catch(er => {
            if (er.response.status === 404) {
                console.log('El carro esta vacio')
            }
        })
        .finally(() =>dispatch(setIsLoanding(false)))
        
    }
}
export const deleteCartThunk = id => {
    return dispatch => {
        dispatch(setIsLoanding(true))
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() =>dispatch(setIsLoanding(false)))
        
    }
}

export const checkoutThunk = () => {
    return dispatch => {
        dispatch(setIsLoanding(true))
        return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`,{}, getConfig())
        .then(() => dispatch(getCartThunk()))
        .finally(() =>dispatch(setIsLoanding(false)))
        
    }
}
export const getPurchasesThunk = () => {
    return dispatch => {
        dispatch(setIsLoanding(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`,getConfig())
        .then(res => dispatch(setPurchases(res.data.data)))
        .finally(() =>dispatch(setIsLoanding(false)))
        
    }
}