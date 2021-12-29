import styled from "styled-components";

export const PasswordInput = styled.input.attrs(() => ({
    type: "password",
}))`
    width: 90%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #565656;
`;
