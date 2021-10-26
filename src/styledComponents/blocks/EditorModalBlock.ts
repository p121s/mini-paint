import styled from 'styled-components';

interface isEditorModalBlock {
  readonly isBlock: boolean;
}

export const EditorModalBlock = styled.div<isEditorModalBlock>`
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