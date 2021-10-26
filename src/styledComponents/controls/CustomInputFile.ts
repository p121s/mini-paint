import styled from "styled-components";

export const CustomInputFile = styled.label`
    text-align: center;
    flex-basic: content;
    height: 70px;
    justify-content: center;
    background: rgb(240, 240, 240);
    border: none;
    flex-grow: 1;

    span {
        position: relative;
        top: 32%;
        font-size: 13px;
    }

    &:hover {
    background: lightblue;
    cursor: pointer;
    }
`;