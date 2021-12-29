import styled from "styled-components";
import img from "../../images/p_12.jpg";

export const Body = styled.div`
    width: 100%;
    height: ${document.documentElement.clientHeight}px;
    background: url(${img}) center / cover no-repeat;
`;
