import axios from 'axios';
import FormData from 'form-data';

// CONST
const initialState = {
    products: []
}

// TYPES
const GET_PRODUCT_BY_CATEGORY = 'GET_PRODUCT_BY_CATEGORY';

// REDUCER
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCT_BY_CATEGORY:
            return {...state, products: action.payload}
        default:
            return state;
    }
}


// ACTIONS
export const createProductAction = (values) => async (dispatch) => {
    try {
        let data = new FormData();
        let message = null;

        data.append("image1", values.file[0]);
        data.append("image2", values.file[1]);
        data.append("image3", values.file[2]);
        data.append("image4", values.file[3]);

        const resp = await axios.post("/api/v1.0/product/", {
            name: values.name,
            price: values.price,
            description: values.description,
            category_id: values.category
        })
        message = resp.data;
        if (resp.data.flag) {
            const image = await axios.post("/api/v1.0/product/images/", data, {
                headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    }
                })
            message = image.data;
        }
        return message;
    } catch (error) {
        console.log(error);
    }
}
// Get products by category
export const getProductsByCategoryAction = (category_id) => async (dispatch) => {
    try {
        // Get products by category
        const productIdList = [];
        const resp = await axios.get(`/api/v1.0/product/${category_id}/`)
        resp.data.map(product => {
            productIdList.push(product.id);
        })
        // console.log(productIdList);
        // Get images by product
        const resp2 = await axios.post(`/api/v1.0/images/product/`, {
                payload: productIdList
        });
        // console.log(resp2.data);
        dispatch({
            type: GET_PRODUCT_BY_CATEGORY,
            payload: resp2.data
        })
    } catch (error) {
        console.log(error);
    }
}