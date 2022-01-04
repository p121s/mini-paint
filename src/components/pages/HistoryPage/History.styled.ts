import styled from "styled-components";

export const DivSelect = styled.div`
    position: relative;
    top: -34px;
    text-align: right;

    @media screen and (max-width: 600px) {
        &{
            position: relative;
            top: -35px;
            text-align: right;
        }
`;

export const Select = styled.select`
    width: 300px;

    @media screen and (max-width: 600px) {
        &{
            width: 105px;
        }
`;