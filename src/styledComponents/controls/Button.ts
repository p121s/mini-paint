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
