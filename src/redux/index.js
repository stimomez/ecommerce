import { actions } from "./actions";

const INITIAL_STATE = {
    news: [],
    isLoading: false,
    categories: [],
    cart: [],
    purchases: []
}

const reducer = (state = INITIAL_STATE, action) => {
		switch(action.type){
            case actions.setNews:
                return {
                    ...state,
                    news: action.payload
                }
            case actions.setIsLoanding:
                return {
                    ...state,
                     isLoading: action.payload

                }   
            case actions.setCategories:
                return {
                    ...state,
                    categories: action.payload
                }
            case actions.setCart:
                return {
                    ...state,
                    cart: action.payload
                }
            case actions.setPurchases:
                return {
                    ...state,
                    purchases: action.payload
                }

        default:
            return state;
    }
}

export default reducer;