import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { GetCategoriesAction } from '../../../redux/ducks/categoryDuck';
import { createProductAction } from '../../../redux/ducks/productDuck';
import { toast } from 'react-toastify';

const ProductWrapper = styled.div`
    /* border: 1px solid black; */
    width: 80%;
    margin: 0 auto;
`;
const FormContainer = styled.nav`
    border: 1px solid #000;
    border-radius: 5px;
    width: 90%;
    height: auto;
    margin: 2em auto;
    padding: 1em 2em;

`;
const Selected = styled.select`
    width: 100%;
    height: 35px;
    background: #fff;
    color: #00f;
    font-size: 14px;
    border: none;
    padding: 0;
    margin: .5em 0;
    /* padding-left: 5px; */
    /* margin-left: 10px; */
    option {
        color: black;
        background: white;
        display: flex;
        white-space: pre;
        min-height: 20px;
        padding: 0px 2px 1px;
    }
`;
const GroupContainer = styled.div`
    margin: 2em 0;
    width: 100%;
    height: auto;
`
const InputContainer = styled.div`
    width: 100%;
`
const Label = styled.label`
    color: #fff;
    display: block;
`
const Input = styled(Field)`
    color: blue;
    width: 100%;
    margin-top: .5em;
    border: none;
    border-radius: 5px;
    padding: .5em 0;
`
const TextArea = styled.textarea`
    color: blue;
    width: 100%;
    margin-top: .5em;
    border: none;
    border-radius: 5px;
    padding: .5em 0;
`
const ErrorText = styled.p`
    color: yellow;
`
const CreateCategoryBtn = styled.button`
    color: #00f;
    background: #fff;
    border: none;
    border-radius: 5px;
    width: 250px;
    padding: .5em 0;
    cursor: pointer;

    &:hover {
        background: transparent;
        color: #fff;
        border: 1px solid #fff;
    }
`;


const Products = () => {
    const dispatch = useDispatch();

    const categories = useSelector(store => store.categoryReducer.categories);

    useEffect(() => {
        const getCategories = () => {
            dispatch(GetCategoriesAction())
        }
        getCategories();

    }, [dispatch])

    return (
        <ProductWrapper>
        <FormContainer>
            <Formik
                initialValues={{
                    name: "Antivirus",
                    price: "380",
                    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id voluptatum hic ad quisquam exercitationem",
                    file: null,
                    category: ""
                }}
                validationSchema={
                    Yup.object().shape({
                        category: Yup.string()
                        .required("* Select a category please."),
                        name: Yup.string()
                        .required("* Enter a product name please."),
                        price: Yup.string("* Enter a price for the product please."),
                        description: Yup.string("* Enter a description for a product please."),
                        file: Yup.mixed()
                        .required("Select a file please.")
                    })
                }
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                            console.log(values);
                            if (values.file.length <= 4) {
                                const resp = await dispatch(createProductAction(values));
                                console.log(resp.response);
                                toast(resp.response, {
                                    type: resp.flag ? "success" : "warning"
                                })
                            } else {
                                alert("Only four images are allowed.")
                            }
                    }
                }
            >
                {
                    ({values, handleChange, handleSubmit, setFieldValue}) => {
                        return (
                            <Form name="product-form" onSubmit={handleSubmit} encType="multipart/form-data">
                                <GroupContainer>
                                    <InputContainer>
                                        <Label>Select Category:</Label>
                                        <Selected
                                            name="category"
                                            onChange={event => {
                                                setFieldValue("category", event.currentTarget.value)
                                            }}
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
                                    </InputContainer>
                                    <ErrorMessage name="category">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </GroupContainer>
                                <GroupContainer>
                                    <InputContainer>
                                        <Label>Product Name:</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            handleChange={handleChange}
                                            value={values.name}
                                        />
                                    </InputContainer>
                                    <ErrorMessage name="name">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </GroupContainer>
                                <GroupContainer>
                                    <InputContainer>
                                        <Label>Product Price:</Label>
                                        <Input
                                            type="text"
                                            name="price"
                                            onChange={handleChange}
                                            value={values.price}
                                        />
                                    </InputContainer>
                                    <ErrorMessage name="price">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </GroupContainer>
                                <GroupContainer>
                                    <InputContainer>
                                        <Label>Product Description:</Label>
                                        <TextArea
                                            name="description"
                                            rows="3"
                                            onChange={handleChange}
                                            value={values.description}
                                        />
                                    </InputContainer>
                                    <ErrorMessage name="description">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </GroupContainer>
                                <GroupContainer>
                                    <InputContainer>
                                        <Label>Select Image For The Product:</Label>
                                        <Field
                                            type="file"
                                            name="product-image"
                                            onChange={(event) => {
                                                setFieldValue("file", event.currentTarget.files);
                                            }}
                                            // onChange={(event) => {
                                            //     setFieldValue("file", event.currentTarget.files[0]);
                                            // }}
                                            multiple={true}
                                            accept=".jpg, .png, .jpeg"
                                        />
                                    </InputContainer>
                                    <ErrorMessage name="file">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </GroupContainer>
                                <CreateCategoryBtn type="submit">
                                    Create ProducT
                                </CreateCategoryBtn>
                            </Form>
                        )
                    }
                }
            </Formik>

        </FormContainer>
        </ProductWrapper>
    )
}

export default Products;