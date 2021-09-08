import axios from 'axios';

// CONST
const initialState = {
    products: [],
}

// TYPES
const GET_IMAGE_BY_PRODUCT = 'GET_IMAGE_BY_PRODUCT';

// REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_IMAGE_BY_PRODUCT:
            return {...state, products: action.payload}
        default:
            return state;
    }
}

// ACTIONS
// Get Images by product
export const getImageByProductAction = (product_id) => async (dispatch) => {
    try {
        const resp = await axios.get(`/api/v1.0/product/images/${product_id}/`);
        console.log(resp.data);
    } catch (error) {
        console.log(error);
    }
}