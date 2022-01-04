import styled from "styled-components";

export const Button = styled.button`
    flex-basic: content;
    height: 70px;
    justify-content: center;
    background: rgb(240, 240, 240);
    border: none;
    flex-grow: 1;
    color: #565656;
    font-size: 20px;
    border-left: 2px solid rgb(247, 247, 247);
    border-right: 2px solid rgb(220, 220, 220);

    &:hover {
        background: lightblue;
        cursor: pointer;
        border-left: 2px solid rgb(220, 220, 220);
        border-right: 2px solid rgb(247, 247, 247);
    }
`;

export const RegLogInButton = styled(Button)`
    width: 120px;
    background: lightblue;
    border-radius: 5px;
`;

export const Form = styled.form`
    width: 90%;
    padding: 20px;
`;

export const Input = styled.input`
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #565656;
`;

export const InputText = styled(Input).attrs(() => ({
    type: "text",
}))``;

export const InputEmail = styled(Input).attrs(() => ({
    type: "email",
}))``;

export const PasswordInput = styled(Input).attrs(() => ({
    type: "password",
}))``;
