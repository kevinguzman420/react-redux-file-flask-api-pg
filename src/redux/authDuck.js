import { toast } from 'react-toastify';
import axios from 'axios';

// const
const initialState = {
    client: {},
    clientLogged: false
}

// types
const GET_USER_LOGGED_SUCCESS = 'GET_USER_LOGGED_SUCCESS';
const LOGIN_USER_SUCCESS = 'GET_USER_LOGGER_SUCCESS';
const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_LOGGED_SUCCESS:
            return {...state, client: action.payload.client, clientLogged: action.payload.clientLogged}
        case LOGIN_USER_SUCCESS:
            return {
                    ...state,
                    client: action.payload.client,
                    clientLogged: action.payload.clientLogged
                }
        case USER_LOGOUT_SUCCESS:
            return {...state, client: action.payload.client, clientLogged: action.payload.clientLogged}
        default:
            return state;
    }
}

// ACTION
// Signup User, in Signup.jsx.
// get user logged
export const getUserLoggedAction = () => async (dispatch, getState) => {
    // if (Object.keys(getState().clientSession.client) === 0) {
        try {
            const response = await axios.get("/api/v1.0/logged/");
            // console.log(Object.keys(response.data).length)
            dispatch({
                type: GET_USER_LOGGED_SUCCESS,
                payload: {
                    client: response.data,
                    clientLogged: Object.keys(response.data).length === 0 ? false : true
                }
            })
        } catch (error) {
            console.error(error);
        }
    // }
}
// login user
export const loginUserAction = (email, password) => async (dispatch, getState) => {
    try {
        const response = await axios.post('/api/v1.0/auth/', {
            email: email,
            password: password
        });
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: {
                client: response.data,
                clientLogged: Object.keys(response.data).length === 0 ? false : true
            }
        })
        const { name, lastname } = getState().clientSession.client;
        const messageToast = Object.keys(response.data).length === 0 ?
                                    "Email or password are invalid" :
                                    `Hello ${name} ${lastname}, you're welcome!`
        toast(messageToast, {
            type: Object.keys(response.data).length === 0 ? "error" : "success",
        });
        if (Object.keys(response.data).length > 0) {
            return {
                login: true,
                user: response.data
            }
        } else {
            return {
                loggin: false
            }
        } // true if there is an user from backend
    } catch (error) {
        console.error(error);
        return false;
    }
}
// Logout user
export const logoutUserAction = () => async (dispatch, getState) => {
    try {
        const { name, lastname } = getState().clientSession.client;
        const response = await axios.get("/api/v1.0/auth/");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: {
                client: {},
                clientLogged: !response.data,
            }
        })
        let toastMessage = response.data ?
                        `${name} ${lastname}, see you soon.` :
                        "There is an error, please try again.";
        toast(toastMessage, {
            type: response.data ? "success" : "error"
        })
        return response.data;
    } catch (error) {
        console.error(error);
    }
}