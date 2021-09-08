import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { getUserLoggedAction, logoutUserAction } from '../redux/authDuck';

import 'react-toastify/dist/ReactToastify.css';

const NavbarContainer = styled.nav`
    position: fixed;
    z-index: 1;

    grid-area: navbar;
    display: grid;
    grid-template-areas: "logo menu";
    grid-template-columns: 25% 75%;
    width: 100%;
    height: 50px;

    background: #375a7f;
`;
const Logo = styled.figure`
    /* border-right: 1px solid blue; */
    margin: 0;
    height: 100%;

    grid-area: logo;
    display: flex;
    align-items: center;
`
const I = styled.i`
    font-size: 2em;
    margin-left: .5em;
    color: #fff;
`
const Menu = styled.ul`
    margin: 0;
    height: 100%;
    grid-area: menu;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const Items = styled.li`
    list-style: none;
    margin: 0;
`
const LinkItem = styled(Link)`
    color: rgba(255, 255, 255, 0.6);;
    text-decoration: none;
    margin: 0 2em;
`
const LinkItemCart = styled(LinkItem)`
    color: rgba(255, 255, 255, 1);;
    font-size: .8em;
    font-weight: bold;
`
const LinkLogout = styled.button`
    border: none;
    background: transparent;
    font-size: 1em;
    color: #f00;
    cursor: pointer;
    padding: 0;
    margin: 0;
`

function Navbar() {
    const clientLogged = useSelector(store => store.clientSession.clientLogged);
    const clientIsAdmin = useSelector(store => store.clientSession.client.is_admin);

    const totalCartItems = useSelector(store => store.cartReducer.totalCartItem);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getUserLoggedAction());
    });

    const logoutUser = async () => {
        const response = await dispatch(logoutUserAction());
        if (response) {
            history.push("/signin/");
        }
    }

    return (
        <NavbarContainer>
            <ToastContainer />
            <Logo>
                <I className="fas fa-shopping-cart"></I>
                <LinkItemCart to="/cart/">Total items: { totalCartItems }</LinkItemCart>
            </Logo>
            <Menu>
                <Items>
                    <LinkItem to="/">Home</LinkItem>
                </Items>
                {
                    clientLogged ?
                        <Items>
                            <LinkLogout
                                onClick={logoutUser}
                            >
                                Logout
                            </LinkLogout>
                            {
                                clientIsAdmin &&
                                    <LinkItem to="/dashboard/">
                                        Dashboard
                                    </LinkItem>
                            }
                        </Items> :
                        <>
                            <Items>
                                <LinkItem to="/signup/">Signup</LinkItem>
                            </Items>
                            <Items>
                                <LinkItem to="/signin/">Signin</LinkItem>
                            </Items>
                        </>
                }
            </Menu>
        </NavbarContainer>
    )
}

export default Navbar;