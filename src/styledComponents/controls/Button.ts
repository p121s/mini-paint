import styled from 'styled-components';

export const Button = styled.button`
  flex-basic: content;
  height: 70px;
  justify-content: center;
  background: rgb(240, 240, 240);
  border: none;
  flex-grow: 1;
  color: #565656;
  font-size: 20px;

  &:hover {
    background: lightblue;
    cursor: pointer;
  }
`;