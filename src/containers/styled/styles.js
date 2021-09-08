import { Form, Field } from 'formik';
import styled from 'styled-components';

export const theme = {
    primary: "#048ad1"
}
export const AuthContainer = styled.div`
    grid-area: body;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 50px);
`
export const SignupFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 500px;

    border: 1px solid rgba(0, 0, 0, .5);
    background: rgba(0, 0, 0, .5);
    box-shadow: 0px 0 20px black;
`
export const Title = styled.h1`
    color: #081983; /* ${props => props.theme.primary}; */
    margin: 0;
`
export const FormStyled = styled(Form)`
    width: 80%;
`
export const FormGroup = styled.div`
    /* border: 1px solid blue; */
    width: 100%;
    height: auto;
    margin: 2em 0;
`
export const InputGroup = styled.div`
    /* border: 1px solid red; */
    display: flex;
    justify-content: space-between;
`
export const Label = styled.label`
    color: #048ad1;
    display: flex;
    align-items: center;
`
export const Input = styled(Field)`
    color: blue;
    width: 100%;
    height: 2em;
    border: 1px solid #048ad1;
    margin-left: .5em;
`
export const ErrorText = styled.p`
    color: red;
`
export const Button = styled.button`
    color: ${props => props.theme.primary};
    border: none;
    color: #fff;
    background: ${props => props.theme.primary};
    padding: .8em 3em;
    cursor: pointer;
    width: 100%;

    &:hover {
        background: #081983;
    }
`
export const Parraph = styled.p`
    color: ${props => props.theme.primary};
    color: #081983;
    font-size: .9em;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
`