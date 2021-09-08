import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { removeProductsCart, createCart } from '../redux/ducks/cartDuck';


const TableContainer = styled.div`
    grid-area: body;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 50px);
`
const Title = styled.h1`
    margin: 0;
    margin-top: .5em;
`
const Table = styled.table`
    /* positioning */
    /* dipslay & box-model */
    width: 600px;
    margin: 2em 0;
    /* visual */
    border: 1px solid black;
    border-collapse: collapse;
    background: black;
    /* typography */
    /* miscelany */
`
const Thead = styled.thead`
    font-weight: bold;
    text-align: center;
`
const Tr = styled.tr`
    background: black;
`
const Td = styled.td`
    padding: 1em 0;
    text-align: center;
`
const DeleteItem = styled.button`
    padding: .3em 1em;
    border: none;

    font-size: .8em;
    text-transform: uppercase;

    color: #BA181B;

    border-radius: 5px;

    &:hover {
        background: red;
        color: white;

        cursor: pointer;
    }
`
const NoItems = styled.p`
    font-size: 2.5em;
    text-transform: uppercase;
`
const PayButton = styled.button`
    border: none;
    background: black;
    border: 1px solid black;
    padding: .5em 0;
    width: 300px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
        background: rgba(0,0,0, .3);
        color: black;
    }
`

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(store => store.cartReducer.detailCart);
    // const cartItems = JSON.parse(localStorage.getItem("cartItems")) || 0;

    console.log(cartItems);
    return (
        <TableContainer>
            <Title>PRODUCT LIST</Title>
            {
                cartItems.length > 0
                ? <Table>
                    <Thead>
                        <Tr>
                            <Td>#</Td>
                            <Td>Name</Td>
                            <Td>Price</Td>
                            <Td>Actions</Td>
                        </Tr>
                    </Thead>
                    <tbody>
                        {cartItems.map((item, index) =>
                            <Tr key={item[0]}>
                                <Td>{index + 1}</Td>
                                <Td>{item[1]}</Td>
                                <Td>{item[2]}</Td>
                                <Td>
                                    <DeleteItem
                                        onClick={() => dispatch(removeProductsCart(item[0], item[2]))}
                                    >
                                        Delete
                                    </DeleteItem>
                                </Td>
                            </Tr>
                        )}
                    </tbody>
                </Table>
                : <NoItems>no items</NoItems>
            }
            { cartItems.length > 0 &&
                <PayButton
                    onClick={() => dispatch(createCart(cartItems))}
                >
                    pay
                </PayButton>
            }
        </TableContainer>
    )
}

export default Cart;