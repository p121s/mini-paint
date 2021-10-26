import styled from 'styled-components';

interface IsWidthBrushBlock {
  readonly isBlock: boolean;
}

export const WidthBrushBlock = styled.div<IsWidthBrushBlock>`
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({isBlock}) => isBlock ? 'block' : 'none'};
  padding: 50px;
  background-color: rgb(240, 240, 240);
  text-align: center;
  border: 1px solid lightgray;
`;