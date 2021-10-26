import styled from "styled-components";

export const DivContent = styled.div`
    height: ${document.documentElement.clientHeight - 200}px;
    padding: 50px;

    @media screen and (max-width: 600px) {
        padding: 20px;
    }
`;