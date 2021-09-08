import axios from 'axios';

// CONST
const initialState = {
    categories: []
}

// TYPES
const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';

// REDUCER
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORY_SUCCESS:
            return {...state, categories: action.payload}
        default:
            return state;
    }
}

// ACTIONS
// Get categories
export const GetCategoriesAction = () => async (dispatch) => {
    try {
        const categories = await axios.get("/api/v1.0/category/");
        // console.log(categories.data);
        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: categories.data
        })
    } catch (error) {
        console.log(error);
    }
}
// Create category
export const CreateCategoryAction = (name, price) => async (dispatch) => {
    try {
        const response = await axios.post('/api/v1.0/category/', {
            name: name,
            price: price,
        });
        // dispatch({
        //     type: GET_CATEGORY_SUCCESS,
        //     payload: 
        // })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}