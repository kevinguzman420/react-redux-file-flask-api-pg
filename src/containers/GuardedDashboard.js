import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';


const GuardedRoute = ({ component: Component, ...rest }) => {
    const clientLogged = useSelector(store => store.clientSession.clientLogged);
    const clientIsAdmin = useSelector(store => store.clientSession.client.is_admin);


    return (
        <Route {...rest} render={(props) => (
                clientLogged && clientIsAdmin
                ? <Component {...props} />
                : <Redirect to="/" />
            )}
        />
    )
}

export default GuardedRoute;
