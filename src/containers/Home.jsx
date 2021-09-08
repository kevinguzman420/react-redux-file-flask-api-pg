import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { GetCategoriesAction } from '../redux/ducks/categoryDuck';
import { getProductsByCategoryAction } from '../redux/ducks/productDuck';
import { addProductsCart } from '../redux/ducks/cartDuck';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

const HomeContainer = styled.div`
    grid-area: body;
    display: grid;
    grid-template-areas: "nav" "products";
    grid-template-rows: auto auto;
    grid-template-columns: 100%;
    height: auto;

    background: transparent;
`;
const SubMenu = styled.div`
    display: block;
    grid-area: nav;
    width: 90%;
    margin: 2em auto;
`
const Label = styled.label`
    display: block;

    text-transform: uppercase;
    font-size: .8em;
    font-weight: bold;
    color: rgba(256,256,256, .9);
`
const Selected = styled.select`
    width: 300px;
    height: 35px;
    padding: 0;
    margin: 1.5em 0 0 0;

    font-size: 14px;

    color: rgba(256,256,256, .9);
    background: #303030;
    border: none;

    option {
        display: flex;
        padding: 0px 2px 1px;
        min-height: 20px;

        color: black;
        background: white;
        white-space: pre;
    }
`;
const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 1.5em;
    justify-content: center;
    grid-area: products;
    min-width: 90%;
    height: 100%;
    margin: 0 auto;
    box-sizing: border-box;

    background-color: black;
`
const NoCategorySelected = styled.p`
    font-size: 2em;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    color: white;

`
const ProductContainer = styled.div`
    width: 100%;
    height: auto;
    padding: .5em;

    background-color: rgba(256,256,256,.05);
`
const ProductName = styled.p`
    color: white;
    font-size: 1em;
    text-transform: uppercase;
    margin: .5em 0;
    text-align: center;
`
const ProductPrice = styled.small`
    /* Positioning */
    /* Display & Box-model */
    display: block;
    margin-top: .3em;

    /* Typography */
    font-weight: bold;
    font-size: .8em;

    /* Visual */
    color: white;
    text-align: center;

    /* Miscelany */


    &::before {
        content: 'Q ';
    }
    &::after {
        content: '.00';
    }
`
const ProductDescription = styled.p`
    font-size: .9em;
    color: #343A40;
    text-align: center;
`
const AddSubtractProductContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: .5em;
`
const AddSubtractProductBtn = styled.button`
    display: block;
    text-align: center;
    text-transform: uppercase;
    width: 25%;
    padding: 0;

    font-size: 1.5em;

    border: none;
    color: white;
    background: transparent;
    border: 1px solid white;

    cursor: pointer;

    &:hover {
        background-color: white;
        color: black;
    }
`;
const QuatityProduct = styled.p`
    margin: 0;
    display: flex;
    align-items: center;
    font-size: .9em;
    font-weight: bold;
`;
const BtnShop = styled(AddSubtractProductBtn)`
    color: white;
    width: 100%;
    background: blue;
    display: block;
    text-align: center;
    padding: .7em 0;
    text-transform: uppercase;
    font-size: .7em;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: transparent;
        border: 1px solid blue;
    }
`

function Home() {
    const [quatityProducts, setQuatityProduct] = useState();

    const dispatch = useDispatch();
    const categories = useSelector(store => store.categoryReducer.categories);
    const products = useSelector(store => store.productReducer.products);

    const quatityProductFunc = (e, product_id) => {
        let quatityProducts = 0;
        const tag = document.getElementById(product_id);
        if (e.target.id === "addProduct") {
            quatityProducts = parseInt(tag.innerHTML) + 1;
            tag.innerHTML = quatityProducts;
        } else if (e.target.id === "substractProduct") {
            if (parseInt(tag.innerHTML) > 1) {
                quatityProducts = parseInt(tag.innerHTML) - 1;
                tag.innerHTML = quatityProducts;
            }
        }

    }

    useEffect(() => {
        const getCategories = () => {
            dispatch(GetCategoriesAction());
        }
        getCategories();
    }, [dispatch])

    return (
        <HomeContainer>
            <SubMenu>
                <Label>Select Products Category:</Label>
                <Selected
                    name="category"
                    onChange={(e) => dispatch(getProductsByCategoryAction(e.target.value))}
                >
                <option value="" selected disabled hidden>Select a category</option>
                    {
                        categories.map((category, index) =>
                            <option
                                key={index}
                                value={category.id}
                            >
                                {category.name.replace(/^\w/, (c) => c.toUpperCase())}
                            </option>
                        )
                    }
                </Selected>
            </SubMenu>
            { products.length > 0 ?
                <ProductsContainer>
                    { products.map((product, index) =>
                        <ProductContainer key={index}>
                            <AliceCarousel
                                autoPlay
                                infinite
                                autoPlayInterval="3000"
                                fadeOutAnimation={true}
                                disableAutoPlayOnAction={true}
                                disableButtonsControls={true}
                            >
                                <img src={require(`../media/img/categories/${product.image1.pathName}/${product.image1.imageName}`).default} className="sliderimg" width="200" height="300" />
                                <img src={require(`../media/img/categories/${product.image2.pathName}/${product.image2.imageName}`).default} className="sliderimg" width="200" height="300" />
                                <img src={require(`../media/img/categories/${product.image3.pathName}/${product.image3.imageName}`).default} className="sliderimg" width="200" height="300" />
                                <img src={require(`../media/img/categories/${product.image4.pathName}/${product.image4.imageName}`).default} className="sliderimg" width="200" height="300" />
                            </AliceCarousel>
                            <ProductName>
                                {product.productName.replace(/^\w/, (c) => c.toUpperCase())}
                            </ProductName>
                            <ProductPrice>
                                {product.productPrice}
                            </ProductPrice>
                            <ProductDescription>
                                {product.productDescription}
                            </ProductDescription>
                            <AddSubtractProductContainer>
                                <AddSubtractProductBtn
                                    type="button"
                                    id="substractProduct"
                                    onClick={(e) => quatityProductFunc(e, product.productId)}
                                >
                                    -
                                </AddSubtractProductBtn>
                                    <QuatityProduct id={product.productId}>
                                        1
                                    </QuatityProduct>
                                <AddSubtractProductBtn
                                    type="button"
                                    id="addProduct"
                                    onClick={(e) => quatityProductFunc(e, product.productId)}
                                >
                                    +
                                </AddSubtractProductBtn>
                            </AddSubtractProductContainer>
                            <BtnShop
                                onClick={() => dispatch(addProductsCart(
                                    product.productId,
                                    product.productName,
                                    product.productPrice,
                                    product.productDescription,
                                    document.getElementById(product.productId).innerHTML
                                ))}
                            >
                                add to cart
                            </BtnShop>
                        </ProductContainer>
                    )}
                </ProductsContainer>
                : <NoCategorySelected>select an category</NoCategorySelected>
                }
        </HomeContainer>
    )
}

export default Home;