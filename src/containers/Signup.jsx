import React from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { AuthContainer, theme, Title, SignupFormContainer, FormStyled, FormGroup,
        InputGroup, Label, Input, ErrorText, Button, Parraph} from './styled/styles';

function Signup() {
    const history = useHistory();

    return (
        <AuthContainer>
            <SignupFormContainer>
            <ThemeProvider theme={theme}>
                <Title>
                    Sign Up
                </Title>
            </ThemeProvider>
                <Formik
                    initialValues={{name:"", lastname:"",email:"",password:""}}
                    validationSchema={
                        Yup.object().shape({
                            name: Yup.string()
                            .required("* Enter an name please."),
                            lastname: Yup.string()
                            .required("* Enter a lastname."),
                            email: Yup.string()
                            .email("* Enter a email valid please.")
                            .required("* Enter an email please."),
                            password: Yup.string()
                            .required("* Enter a password for the account please.")
                            .min(4, "* Password must be longer than 4 characteres.")
                        })
                    }
                    onSubmit={ async (values, { setSubmitting, resetForm }) => {
                            const response = await axios.post("/api/v1.0/signup/", {
                                name: values.name,
                                lastname: values.lastname,
                                email: values.email,
                                password: values.password
                            });
                            if (!response.data) {
                                toast(`The email ${values.email} already is registered.`, {
                                    type: "warning"
                                })
                            }
                            else if (Object.keys(response.data).length > 0) {
                                toast("User created successfully", {
                                    type: "success"
                                })
                            } else {
                                toast("Has been an error, please try again.", {
                                    type: "error"
                                })
                            }
                            setSubmitting(false);
                            resetForm({});
                            history.push("/signin/")
                        }
                    }
                >
                {
                    ({values, errors, touched, handleSubmit, handleChange }) => {
                        return (
                            <FormStyled name="signup" onSubmit={handleSubmit}>
                                <FormGroup>
                                    <InputGroup>
                                        <Label>Name:</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            onChange={handleChange}
                                            value={values.name}
                                        />
                                    </InputGroup>
                                    <ErrorMessage name="name">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Label>Lastname:</Label>
                                        <Input
                                            type="text"
                                            name="lastname"
                                            onChange={handleChange}
                                            value={values.lastname}
                                        />
                                    </InputGroup>
                                    <ErrorMessage name="lastname">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Label>Email:</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            value={values.email}
                                        />
                                    </InputGroup>
                                    <ErrorMessage name="email">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <Label>Password:</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            value={values.password}
                                        />
                                    </InputGroup>
                                    <ErrorMessage name="password">
                                        {(msg) => <ErrorText>{msg}</ErrorText>}
                                    </ErrorMessage>
                                </FormGroup>
                                <ThemeProvider theme={theme}>
                                    <FormGroup>
                                        <Button type="submit">Signup</Button>
                                    </FormGroup>
                                </ThemeProvider>
                                <ThemeProvider theme={theme}>
                                    <Parraph>LOGIN</Parraph>
                                </ThemeProvider>
                            </FormStyled>
                        )
                    }
                }
                </Formik>
            </SignupFormContainer>
        </AuthContainer>
    )
}

export default Signup


