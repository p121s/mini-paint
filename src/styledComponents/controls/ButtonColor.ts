import styled from "styled-components";

interface BtnColor {
    readonly color: string;
}

export const ButtonColor = styled.button<BtnColor>`
    background-color: ${(props) => props.color};
`;
