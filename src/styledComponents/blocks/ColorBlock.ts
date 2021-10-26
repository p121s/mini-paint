import styled from 'styled-components';

interface IsColorBlock {
  readonly isBlock: boolean;
}

export const ColorBlock = styled.div<IsColorBlock>`
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({isBlock}) => isBlock ? 'block' : 'none'};
  background-color: rgb(240, 240, 240);
  border: 1px solid lightgray;
  padding: 50px;
  text-align: center;
`;