import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Navbar from './Navbar';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import Dashboard from "./Dashboard";
import GuardedAuth from './GuardedAuth';
import GuardedDashboard from './GuardedDashboard';
import Cart from './Cart';

const Container = styled.div`
    display: grid;
    grid-template-areas: "navbar" "body";
    grid-template-rows: 50px ${props => props.products ? "auto" : "calc(100vh - 50px)"};
    grid-template-columns: 100vw;
    width: 100vw;
    height: 100%;
    margin: 0;
    padding: 0;

    background: rgb(2,0,36);
    background: linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 18%, rgba(0,212,255,1) 100%);
    color: white;
`;

function Entrypoint() {
    const products = useSelector(store => store.productReducer.products);

    return (
        <Container products={products.length > 0}>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <GuardedAuth exact path="/signup/" component={Signup} />
                    <GuardedAuth exact path="/signin/" component={Signin} />
                    <GuardedDashboard exact path="/dashboard/" component={Dashboard} />
                    <Route exact path="/cart/" component={Cart} />
                    <Route exact path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        </Container>
    );
}

export default Entrypoint;
