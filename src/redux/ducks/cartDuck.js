import axios from 'axios';

// CONST
const initialState = {
    totalCartItem:  JSON.parse(localStorage.getItem("cartItems")) !== null ?
                    JSON.parse(localStorage.getItem("cartItems")).length: 0,
    detailCart: JSON.parse(localStorage.getItem("cartItems")) || []
}

// TYPES
const ADD_PRODUCTS_CART = 'GET_PRODUCTS_CART';
const REMOVE_PRODUCTS_CART = 'REMOVE_PRODUCTS_CART';

// REDUCER
export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_PRODUCTS_CART:
            return {
                ...state,
                totalCartItem: action.payload.totalCartItem,
                detailCart: action.payload.detailCart
                // detailCart: [...state.detailCart, action.payload.detailCart]
            }
        case REMOVE_PRODUCTS_CART:
            return {
                ...state,
                totalCartItem: action.payload.totalCartItem,
                detailCart: action.payload.detailCart
            }
        default:
            return state;
    }
}

// ACTIONS
// Add item to cart
export const addProductsCart = (productId, productName, productPrice, productDescription, quantity) => async (dispatch, getState) => {
    try {
        console.log(quantity);
        const payload = [productId, productName, productPrice, productDescription];

        if (localStorage.getItem("cartItems") !== null) {
            const tempCartItems = JSON.parse(localStorage.getItem("cartItems"));
            const cartItems = [...tempCartItems, payload];
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

        } else {
            const cartItems = [...getState().cartReducer.detailCart, payload]
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }

        dispatch({
            type: ADD_PRODUCTS_CART,
            payload: {
                totalCartItem: JSON.parse(localStorage.getItem("cartItems")).length,
                detailCart: JSON.parse(localStorage.getItem("cartItems"))
            }
        })
    } catch (error) {
        console.log(error);
    }
}
// Remove item of cart
export const removeProductsCart = (product_id) => async (dispatch) => {
    try {
        let totalCartItem = 0;
        if (localStorage.getItem("cartItems") !== null) {
            const tempCartItems = JSON.parse(localStorage.getItem("cartItems"));
            const cartItems = [...tempCartItems.filter(item => item[0] !== product_id)];
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
        // Take cart total
        JSON.parse(localStorage.getItem("cartItems")).forEach(item => {
            totalCartItem += parseInt(item[2])
        });

        dispatch({
            type: REMOVE_PRODUCTS_CART,
            payload: {
                totalCartItem: JSON.parse(localStorage.getItem("cartItems")).length,
                detailCart: JSON.parse(localStorage.getItem("cartItems"))
            }
        })
    } catch (error) {
        console.log(error);
    }
}
// Send cart to bd
export const createCart = (cartItems) => async (dispatch) => {
    try {
        const resp = await axios.post("/api/v1.0/cart/", {
            cartItems
        });
        console.log(cartItems);
        console.log(resp.data);
    } catch (error) {
        console.log(error);
    }
}