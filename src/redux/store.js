import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './authDuck';
import categoryReducer from "./ducks/categoryDuck";
import productReducer from './ducks/productDuck';
import cartReducer from './ducks/cartDuck';

const rootReducer = combineReducers({
    clientSession: authReducer,
    categoryReducer,
    productReducer,
    cartReducer
});

// To configure redux extension in devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}