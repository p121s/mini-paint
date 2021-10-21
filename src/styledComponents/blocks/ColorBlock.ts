import styled from 'styled-components';

interface IsColorBlock {
  readonly isBlock: boolean;
}

export const ColorBlock = styled.div<IsColorBlock>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({isBlock}) => isBlock ? 'block' : 'none'};
`;