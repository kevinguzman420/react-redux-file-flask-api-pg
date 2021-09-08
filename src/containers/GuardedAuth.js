import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


const GuardedRoute = ({ component: Component, ...rest }) => {
    const clientLogged = useSelector(store => store.clientSession.clientLogged);
    console.log("from guardComponent", clientLogged);
    return (
        <Route {...rest} render={(props) => (
                clientLogged
                ? <Redirect to="/" />
                : <Component {...props} />
            )}
        />
    )
}

export default GuardedRoute;