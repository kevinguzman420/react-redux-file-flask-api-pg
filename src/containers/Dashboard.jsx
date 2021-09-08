import React, { useState } from 'react';
import styled from 'styled-components';

import FormCategory from './components/dashboard/FormCategory';
import Products from './components/dashboard/Products';

const ProductContainer = styled.div`
    /* border: 1px solid red; */
    width: 90%;
    height: 115vh;
`
const Title = styled.h1`
    color: #fff;
    text-align: center;
    text-transform: uppercase;
`
const Nav = styled.nav`
    border-bottom: 1px solid #fff;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding-bottom: 1em;
`
const Actions = styled.button`
    border: 1px solid #fff;
    border-radius: 5px;
    background: transparent;
    color: #fff;
    padding: .5em 2em;
    margin: 0 1em;
    cursor: pointer;

    &:hover {
        background: #fff;
        color: blue;
    }
`
const FormWrapper = styled.div`
    /* border: 1px solid black; */
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2em;
`
const FormContainer = styled.div`
    /* border: 1px solid #000; */
    border-radius: 5px;
    width: 50%;
    height: auto;
    margin: 2em auto;
    padding: 1em 2em;
`

const Dashboard = () => {
    const [menu, setMenu] = useState(``);
    const [title, setTitle] = useState('create products');
    const [flag, setFlag] = useState(false);

    const showCreateCategory = () => {
        setTitle("create category");
        setMenu(<FormCategory />);
        setFlag(true);
    }

    const showProducts = () => {
        setTitle("create products");
        setMenu(<Products />);
        setFlag(false);
    }

    return (
        <ProductContainer>
            <Title>{title}</Title>
            <Nav>
                <Actions onClick={showCreateCategory}>Create Category</Actions>
                <Actions onClick={showProducts}>Create Products</Actions>
            </Nav>
            {flag
            ?
            <FormWrapper>
                <FormContainer>
                    {menu}
                </FormContainer>
            </FormWrapper>
            : menu
            }
        </ProductContainer>
    )
}

export default Dashboard;