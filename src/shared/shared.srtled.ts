import styled from "styled-components";

export const DivScroll = styled.div`
    overflow: scroll;
    width: 100%;
    height: ${document.documentElement.clientHeight - 250}px;
`;

export const Image = styled.img`
    display: block;
    border: 1px solid lightgrey;
    margin: 50px auto;
    background-color: white;
    width: 80%;
    border-radius: 10px;
`;