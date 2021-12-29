import styled from "styled-components";

export const CustomInputFile = styled.label`
    text-align: center;
    flex-basic: content;
    height: 70px;
    justify-content: center;
    background: rgb(240, 240, 240);
    border: none;
    flex-grow: 1;
    border-left: 2px solid rgb(247, 247, 247);
    border-right: 2px solid rgb(220, 220, 220);

    span {
        position: relative;
        top: 28%;
        font-size: 20px;
    }

    &:hover {
        background: lightblue;
        cursor: pointer;
        border-left: 2px solid rgb(220, 220, 220);
        border-right: 2px solid rgb(247, 247, 247);
    }
`;
