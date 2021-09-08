import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../redux/authDuck';

import { AuthContainer, theme, Title, SignupFormContainer, FormStyled, FormGroup,
    InputGroup, Label, Input, ErrorText, Button, Parraph} from './styled/styles';

function Signin() {
    const dispatch = useDispatch();
    const clientLogged = useSelector(store => store.clientSession.clientLogged);
    const client = useSelector(store => store.clientSession.client);
    const history = useHistory();

    return (
        <AuthContainer>
            <SignupFormContainer>
                <ToastContainer />
                <ThemeProvider theme={theme}>
                    <Title>
                        Sign In
                    </Title>
                </ThemeProvider>
                <Formik
                    initialValues={{email:"", password:""}}
                    validationSchema={
                        Yup.object().shape({
                            email: Yup.string()
                            .required("* Enter an email please")
                            .email("* Enter a valid email please"),
                            password: Yup.string()
                            .required("* Enter a password please")
                            .min(4, "* Password must be longer than 4 characteres")
                        })
                    }
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                            const response = await dispatch(loginUserAction(values.email, values.password));
                            console.log("response.user.is_admin", response.user.is_admin);
                            if (response.login) {
                                if (response.user.is_admin) {
                                    console.log("is_admin")
                                    history.push("/dashboard/");
                                } else {
                                    console.log("not_is_admin")
                                    history.push('/');
                                }
                            }
                            setSubmitting(false);
                            resetForm({});
                        }

                    }
                >
                {
                    ({values, handleSubmit, handleChange}) => {
                        return (
                            <FormStyled name="signin_form" onSubmit={handleSubmit}>
                                <FormGroup>
                                    <InputGroup>
                                        <Label>Email:</Label>
                                        <Input
                                            type="text"
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
                                    <Button type="submit">
                                        Sign In
                                    </Button>
                                </ThemeProvider>
                                <Parraph>SIGNUP</Parraph>
                            </FormStyled>
                        )
                    }
                }
                </Formik>
            </SignupFormContainer>
        </AuthContainer>
    )
}

export default Signin;