import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { CreateCategoryAction } from "../../../redux/ducks/categoryDuck";

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

const FormCategory = () => {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{name:""}}
            validationSchema={
                Yup.object().shape({
                    name: Yup.string()
                    .required("* Enter a category name please.")
                })
            }
            onSubmit={async (values, {setSubmitting, resetForm}) => {
                    const resp = await dispatch(CreateCategoryAction(values.name, values.price));
                    toast(resp.response, {
                        type: resp.flag ? "success" : "warning"
                    })
                    setSubmitting(false);
                    resetForm({});
                }
            }
        >
        {
            ({values, handleChange, handleSubmit}) => {
                return (
                    <Form name="form-category" onSubmit={handleSubmit}>
                        <GroupContainer>
                            <InputContainer>
                                <Label>Category Name:</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={values.name}
                                />
                            </InputContainer>
                            <ErrorMessage name="name">
                                {(msg) => <ErrorText>{msg}</ErrorText>}
                            </ErrorMessage>
                        </GroupContainer>
                        <CreateCategoryBtn type="submit">Create Category</CreateCategoryBtn>
                    </Form>
                )
            }
        }
        </Formik>
    )
}

export default FormCategory;