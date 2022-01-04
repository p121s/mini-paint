import styled from "styled-components";
import img from "./images/p_12.jpg";

export const Body = styled.div`
    width: 100%;
    height: ${document.documentElement.clientHeight}px;
    background: url(${img}) center / cover no-repeat;
`;

export const Div = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    max-width: 500px;
    text-align: center;
    background-color: rgba(250, 250, 250, 0.9);
    padding: 20px;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
`;

export const DivPage = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

export const DivNavigation = styled.div`
    display: flex;
    flex-basaic: 50px;
`;

export const DivContent = styled.div`
    height: ${document.documentElement.clientHeight - 200}px;
    padding: 50px;

    @media screen and (max-width: 600px) {
        padding: 20px;
    }
`;
